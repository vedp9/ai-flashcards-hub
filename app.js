document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // STATE MANAGEMENT
    // ==========================================
    const STATE_KEY = 'ai_flashcard_state_v3';
    let state = JSON.parse(localStorage.getItem(STATE_KEY)) || {
        progress: {}, // { id: 'mastered' | 'review' }
        streak: 0,
        selectedDifficulty: null,
        selectedCategory: null,
        customCollections: {},
        geminiApiKey: null
    };

    // Make sure customCollections exists for legacy state
    if (!state.customCollections) state.customCollections = {};

    const saveState = () => {
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
        updateGlobalProgress();
    };

    // DOM ELEMENTS
    const viewDifficulty = document.getElementById('view-difficulty');
    const viewTopics = document.getElementById('view-topics');
    const viewFlashcards = document.getElementById('view-flashcards');
    const viewQuiz = document.getElementById('view-quiz');
    const viewGlossary = document.getElementById('view-glossary');
    const viewCustomize = document.getElementById('view-customize');
    const viewProfile = document.getElementById('view-profile');
    
    const navTabsContainer = document.getElementById('nav-tabs');
    const navTabs = document.querySelectorAll('.nav-tab');
    const breadcrumbs = document.getElementById('breadcrumbs');
    const bcHome = document.getElementById('bc-home');
    const bcLevel = document.getElementById('bc-level');
    const bcSepTopic = document.getElementById('bc-sep-topic');
    const bcTopic = document.getElementById('bc-topic');
    const topAnchor = document.getElementById('top-anchor');

    // SCROLL REVEAL (Intersection Observer)
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const observeReveals = () => {
        document.querySelectorAll('.reveal-item').forEach(el => revealObserver.observe(el));
    }
    observeReveals();

    // TOP ANCHOR VISIBILITY
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 300) {
                    topAnchor.classList.add('visible');
                } else {
                    topAnchor.classList.remove('visible');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

    // GLOBAL PROGRESS UPDATE
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    const updateGlobalProgress = () => {
        let pool = [];
        if (appMode === 'built-in') {
            if (!state.selectedDifficulty) return;
            pool = flashcardsData.filter(c => c.difficulty === state.selectedDifficulty);
            if (state.selectedCategory && state.selectedCategory !== 'All') {
                pool = pool.filter(c => c.category === state.selectedCategory);
            }
        } else if (appMode === 'custom') {
            const collection = state.customCollections[currentCustomCollectionId];
            if (!collection || !customCurrentDiff) return;
            pool = collection.cards[customCurrentDiff.toLowerCase()] || [];
        }

        const total = pool.length;
        const mastered = pool.filter(c => state.progress[c.id] === 'mastered').length;
        const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;
        
        if (progressText) {
            progressText.textContent = `${mastered} / ${total} (${percent}%) Mastered`;
            progressBar.style.width = `${percent}%`;
        }
    };

    document.getElementById('reset-progress-btn')?.addEventListener('click', () => {
        if(confirm('Are you sure you want to reset all your progress and streak?')) {
            state.progress = {};
            state.streak = 0;
            saveState();
            initFlashcards();
            initQuiz();
        }
    });

    // ==========================================
    // NAVIGATION & ROUTING LOGIC
    // ==========================================
    let appMode = 'built-in'; // 'built-in' | 'custom'
    let currentCustomCollectionId = null;
    let customCurrentDiff = null;

    const hideAllViews = () => {
        [viewDifficulty, viewTopics, viewFlashcards, viewQuiz, viewGlossary, viewCustomize, viewProfile].forEach(v => {
            if (v) {
                v.classList.add('hidden');
                v.classList.remove('block');
            }
        });
    };

    const showDifficultyScreen = () => {
        appMode = 'built-in';
        hideAllViews();
        viewDifficulty.classList.remove('hidden');
        viewDifficulty.classList.add('block');
        breadcrumbs.classList.add('hidden');
        breadcrumbs.classList.remove('flex');
        navTabsContainer.classList.add('hidden');
        navTabsContainer.classList.remove('flex');
        
        state.selectedDifficulty = null;
        state.selectedCategory = null;
        saveState();
    };

    const showTopicsScreen = (difficulty) => {
        appMode = 'built-in';
        state.selectedDifficulty = difficulty;
        state.selectedCategory = null;
        saveState();

        hideAllViews();
        viewTopics.classList.remove('hidden');
        viewTopics.classList.add('block');
        
        breadcrumbs.classList.remove('hidden');
        breadcrumbs.classList.add('flex');
        bcLevel.textContent = difficulty;
        bcLevel.onclick = () => showTopicsScreen(difficulty);
        bcSepTopic.classList.add('hidden');
        bcTopic.classList.add('hidden');
        
        navTabsContainer.classList.add('hidden');
        navTabsContainer.classList.remove('flex');

        document.getElementById('topic-level-title').textContent = `${difficulty} Topics`;

        const topicsGrid = document.getElementById('topics-grid');
        topicsGrid.innerHTML = '';

        const diffCards = flashcardsData.filter(c => c.difficulty === difficulty);
        const categories = [...new Set(diffCards.map(c => c.category))];

        const allBtn = document.createElement('button');
        allBtn.className = 'apple-topic-card group';
        allBtn.innerHTML = `
            <div class="flex items-center gap-3 mb-2">
                <i class="ph-fill ph-lightning text-xl text-yellow-500"></i>
                <h3 class="apple-body-strong text-ink group-hover:text-primary transition-colors">All ${difficulty} Topics</h3>
            </div>
            <p class="text-muted apple-caption">${diffCards.length} Flashcards</p>
        `;
        allBtn.addEventListener('click', () => showAppMode('All'));
        topicsGrid.appendChild(allBtn);

        categories.forEach(cat => {
            const count = diffCards.filter(c => c.category === cat).length;
            const btn = document.createElement('button');
            btn.className = 'apple-topic-card group';
            btn.innerHTML = `
                <h3 class="apple-body-strong mb-2 text-ink group-hover:text-primary transition-colors">${cat}</h3>
                <p class="text-muted apple-caption">${count} Flashcards</p>
            `;
            btn.addEventListener('click', () => showAppMode(cat));
            topicsGrid.appendChild(btn);
        });
        observeReveals();
    };

    const showAppMode = (category) => {
        appMode = 'built-in';
        state.selectedCategory = category;
        saveState();

        bcSepTopic.classList.remove('hidden');
        bcTopic.classList.remove('hidden');
        bcTopic.textContent = category === 'All' ? `All ${state.selectedDifficulty}` : category;

        navTabsContainer.classList.remove('hidden');
        navTabsContainer.classList.add('flex');

        navTabs.forEach(t => t.classList.remove('active'));
        document.querySelector('[data-target="flashcards"]').classList.add('active');

        hideAllViews();
        viewFlashcards.classList.remove('hidden');
        viewFlashcards.classList.add('block');

        updateGlobalProgress();
        initFlashcards();
        initQuiz();
        initGlossaryFilters(); 
        renderGlossary(); 
        observeReveals();
    };

    const showCustomizeScreen = () => {
        hideAllViews();
        viewCustomize.classList.remove('hidden');
        viewCustomize.classList.add('block');
        breadcrumbs.classList.add('hidden');
        navTabsContainer.classList.add('hidden');
        navTabsContainer.classList.remove('flex');
    };

    const showProfileScreen = () => {
        hideAllViews();
        viewProfile.classList.remove('hidden');
        viewProfile.classList.add('block');
        breadcrumbs.classList.add('hidden');
        navTabsContainer.classList.add('hidden');
        navTabsContainer.classList.remove('flex');
        renderProfile();
    };

    const showCustomCollection = (id) => {
        appMode = 'custom';
        currentCustomCollectionId = id;
        const collection = state.customCollections[id];
        
        hideAllViews();
        viewTopics.classList.remove('hidden');
        viewTopics.classList.add('block');
        
        breadcrumbs.classList.remove('hidden');
        breadcrumbs.classList.add('flex');
        bcLevel.textContent = 'Profile';
        bcLevel.onclick = showProfileScreen;
        bcSepTopic.classList.add('hidden');
        bcTopic.classList.add('hidden');
        
        navTabsContainer.classList.add('hidden');
        navTabsContainer.classList.remove('flex');
        
        document.getElementById('topic-level-title').textContent = collection.title;
        
        const topicsGrid = document.getElementById('topics-grid');
        topicsGrid.innerHTML = '';
        
        ['Easy', 'Medium', 'Hard'].forEach(diff => {
            const count = (collection.cards[diff.toLowerCase()] || []).length;
            if (count > 0) {
                const btn = document.createElement('button');
                btn.className = 'apple-topic-card group';
                btn.innerHTML = `
                    <h3 class="apple-body-strong mb-2 text-ink group-hover:text-primary transition-colors">${diff}</h3>
                    <p class="text-muted apple-caption">${count} Flashcards</p>
                `;
                btn.addEventListener('click', () => showCustomFlashcards(diff));
                topicsGrid.appendChild(btn);
            }
        });
        
        // Add a delete collection button
        const delBtn = document.createElement('button');
        delBtn.className = 'apple-topic-card group border-danger/30 hover:border-danger/50 bg-danger/5';
        delBtn.innerHTML = `
            <div class="flex items-center gap-3 mb-2">
                <i class="ph-fill ph-trash text-xl text-danger"></i>
                <h3 class="apple-body-strong text-danger">Delete Collection</h3>
            </div>
            <p class="text-muted apple-caption">Permanently remove</p>
        `;
        delBtn.addEventListener('click', () => {
            if(confirm('Are you sure you want to delete this entire collection?')) {
                delete state.customCollections[id];
                saveState();
                showProfileScreen();
            }
        });
        topicsGrid.appendChild(delBtn);

        observeReveals();
    };

    const showCustomFlashcards = (diff) => {
        appMode = 'custom';
        customCurrentDiff = diff;
        
        bcSepTopic.classList.remove('hidden');
        bcTopic.classList.remove('hidden');
        bcTopic.textContent = diff;

        // Custom mode does not support quiz/glossary currently to keep it simple, 
        // so we hide nav tabs.
        navTabsContainer.classList.add('hidden');
        navTabsContainer.classList.remove('flex');

        hideAllViews();
        viewFlashcards.classList.remove('hidden');
        viewFlashcards.classList.add('block');

        updateGlobalProgress();
        initFlashcards();
        observeReveals();
    };

    // New Nav Buttons
    document.getElementById('nav-home-btn')?.addEventListener('click', showDifficultyScreen);
    document.getElementById('nav-customize-btn')?.addEventListener('click', showCustomizeScreen);
    document.getElementById('nav-profile-btn')?.addEventListener('click', showProfileScreen);
    document.getElementById('btn-profile-create')?.addEventListener('click', showCustomizeScreen);
    document.getElementById('btn-empty-create')?.addEventListener('click', showCustomizeScreen);

    // Old Nav Buttons
    bcHome.addEventListener('click', showDifficultyScreen);
    document.getElementById('nav-logo').addEventListener('click', showDifficultyScreen);
    
    document.querySelectorAll('.difficulty-card').forEach(card => {
        card.addEventListener('click', () => {
            showTopicsScreen(card.dataset.difficulty);
        });
    });

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            hideAllViews();
            const targetId = `view-${tab.dataset.target}`;
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('block');
            }
        });
    });

    // ==========================================
    // FLASHCARDS MODE
    // ==========================================
    let currentQueue = [];
    let currentIndex = 0;

    const cardCategoryEl = document.getElementById('card-category');
    const cardWordEl = document.getElementById('card-word');
    const cardSimpleDefEl = document.getElementById('card-simple-def');
    const cardScenarioEl = document.getElementById('card-scenario');
    const cardSourceEl = document.getElementById('card-source');
    const cardCounterEl = document.getElementById('card-counter');
    const flipCardEl = document.getElementById('flashcard');
    
    const btnEditCard = document.getElementById('btn-edit-card');
    const sepEdit = document.getElementById('sep-edit');

    const initFlashcards = () => {
        let pool = [];
        if (appMode === 'built-in') {
            if (!state.selectedDifficulty) return;
            pool = flashcardsData.filter(c => c.difficulty === state.selectedDifficulty);
            if (state.selectedCategory && state.selectedCategory !== 'All') {
                pool = pool.filter(c => c.category === state.selectedCategory);
            }
            if (btnEditCard) btnEditCard.classList.add('hidden');
            if (sepEdit) sepEdit.classList.add('hidden');
        } else if (appMode === 'custom') {
            const collection = state.customCollections[currentCustomCollectionId];
            if (!collection || !customCurrentDiff) return;
            pool = collection.cards[customCurrentDiff.toLowerCase()] || [];
            
            if (btnEditCard) btnEditCard.classList.remove('hidden');
            if (sepEdit) sepEdit.classList.remove('hidden');
        }
        
        currentQueue = [...pool];
        currentIndex = 0;
        if(flipCardEl) flipCardEl.classList.remove('flipped');
        renderCurrentCard();
    };

    const renderCurrentCard = () => {
        if (currentQueue.length === 0) {
            if(cardWordEl) cardWordEl.textContent = "No cards available.";
            if(cardSimpleDefEl) cardSimpleDefEl.textContent = "";
            if(cardScenarioEl) cardScenarioEl.textContent = "";
            if(btnEditCard) btnEditCard.classList.add('hidden');
            return;
        }
        
        if (appMode === 'custom' && btnEditCard) btnEditCard.classList.remove('hidden');

        const card = currentQueue[currentIndex];
        cardCategoryEl.textContent = card.category || (appMode === 'custom' ? customCurrentDiff : '');
        cardWordEl.textContent = card.word;
        cardSimpleDefEl.textContent = card.simple_def;
        cardScenarioEl.innerHTML = `<strong>Scenario:</strong> ${card.real_world_scenario}`;
        cardSourceEl.textContent = card.source || (appMode === 'custom' ? 'Custom Upload' : '');
        cardCounterEl.textContent = `${currentIndex + 1} / ${currentQueue.length}`;
        
        const status = state.progress[card.id];
        flipCardEl.firstElementChild.style.borderColor = 
            status === 'mastered' ? 'var(--color-success)' : 
            status === 'review' ? 'var(--color-danger)' : 'var(--color-divider)';
    };

    if(flipCardEl) {
        flipCardEl.addEventListener('click', () => {
            flipCardEl.classList.toggle('flipped');
        });
    }

    document.getElementById('btn-prev')?.addEventListener('click', () => {
        flipCardEl.classList.remove('flipped');
        setTimeout(() => {
            currentIndex = (currentIndex - 1 + currentQueue.length) % currentQueue.length;
            renderCurrentCard();
        }, 150);
    });

    document.getElementById('btn-next')?.addEventListener('click', () => {
        flipCardEl.classList.remove('flipped');
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % currentQueue.length;
            renderCurrentCard();
        }, 150);
    });

    document.getElementById('btn-shuffle')?.addEventListener('click', () => {
        currentQueue = currentQueue.sort(() => Math.random() - 0.5);
        currentIndex = 0;
        flipCardEl.classList.remove('flipped');
        renderCurrentCard();
    });

    const updateCardStatus = (status) => {
        if(currentQueue.length === 0) return;
        const cardId = currentQueue[currentIndex].id;
        state.progress[cardId] = status;
        saveState();
        
        flipCardEl.classList.remove('flipped');
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % currentQueue.length;
            renderCurrentCard();
        }, 300);
    };

    document.getElementById('btn-mastered')?.addEventListener('click', () => updateCardStatus('mastered'));
    document.getElementById('btn-review')?.addEventListener('click', () => updateCardStatus('review'));

    document.addEventListener('keydown', (e) => {
        if (viewFlashcards.classList.contains('hidden')) return;
        
        // Prevent keydown actions if a modal is open
        if (!document.getElementById('edit-card-modal').classList.contains('hidden') || 
            !document.getElementById('api-key-modal').classList.contains('hidden')) {
            return;
        }

        if (e.code === 'Space') {
            e.preventDefault();
            flipCardEl.classList.toggle('flipped');
        } else if (e.code === 'ArrowRight') {
            document.getElementById('btn-next')?.click();
        } else if (e.code === 'ArrowLeft') {
            document.getElementById('btn-prev')?.click();
        }
    });

    // ==========================================
    // QUIZ & GLOSSARY MODE (Built-in Only)
    // ==========================================
    const quizCategoryEl = document.getElementById('quiz-category');
    const quizQuestionEl = document.getElementById('quiz-question');
    const quizOptionsContainer = document.getElementById('quiz-options');
    const quizFeedbackEl = document.getElementById('quiz-feedback');
    const quizNextBtn = document.getElementById('btn-quiz-next');
    const quizStreakEl = document.getElementById('quiz-streak');

    let currentQuizCard = null;

    const initQuiz = () => {
        if (appMode !== 'built-in' || !state.selectedDifficulty) return;
        
        let pool = flashcardsData.filter(c => c.difficulty === state.selectedDifficulty);
        if (state.selectedCategory && state.selectedCategory !== 'All') {
            pool = pool.filter(c => c.category === state.selectedCategory);
        }

        if (pool.length === 0) return;

        quizStreakEl.textContent = state.streak;
        quizFeedbackEl.classList.add('hidden');
        quizNextBtn.classList.add('hidden');
        quizOptionsContainer.innerHTML = '';
        
        currentQuizCard = pool[Math.floor(Math.random() * pool.length)];
        quizCategoryEl.textContent = currentQuizCard.category;
        
        const promptText = Math.random() > 0.5 ? currentQuizCard.simple_def : currentQuizCard.real_world_scenario;
        quizQuestionEl.textContent = promptText;

        const sameDifficultyCards = flashcardsData.filter(c => c.difficulty === state.selectedDifficulty);
        const otherCards = sameDifficultyCards.filter(c => c.id !== currentQuizCard.id);
        const distractors = otherCards.sort(() => Math.random() - 0.5).slice(0, 3).map(c => c.word);
        
        const options = [...distractors, currentQuizCard.word].sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'w-full text-left p-4 rounded-xl border border-divider bg-surface hover:bg-surface-pearl transition-colors text-lg md:text-xl font-bold text-primary';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleQuizAnswer(btn, opt === currentQuizCard.word));
            quizOptionsContainer.appendChild(btn);
        });
    };

    const handleQuizAnswer = (selectedBtn, isCorrect) => {
        Array.from(quizOptionsContainer.children).forEach(btn => {
            btn.disabled = true;
            btn.classList.remove('hover:bg-surface-pearl', 'cursor-pointer');
            if (btn.textContent === currentQuizCard.word) {
                btn.classList.add('border-success', 'bg-success/10');
            }
        });

        quizFeedbackEl.classList.remove('hidden');
        if (isCorrect) {
            selectedBtn.classList.add('border-success', 'bg-success/10');
            quizFeedbackEl.innerHTML = `<span class="text-success font-bold"><i class="ph-fill ph-check-circle"></i> Correct!</span> That is the right concept.`;
            quizFeedbackEl.className = 'mt-6 rounded-xl p-4 text-sm bg-success/10 border border-success/20 animate-fade-in block';
            state.streak += 1;
        } else {
            selectedBtn.classList.add('border-danger', 'bg-danger/10');
            quizFeedbackEl.innerHTML = `<span class="text-danger font-bold"><i class="ph-fill ph-x-circle"></i> Incorrect.</span> The correct concept was highlighted above.`;
            quizFeedbackEl.className = 'mt-6 rounded-xl p-4 text-sm bg-danger/10 border border-danger/20 animate-fade-in block';
            state.streak = 0;
        }
        
        saveState();
        quizStreakEl.textContent = state.streak;
        quizNextBtn.classList.remove('hidden');
    };

    quizNextBtn?.addEventListener('click', initQuiz);

    // Glossary is built-in only
    const glossarySearchInput = document.getElementById('glossary-search');
    const glossaryList = document.getElementById('glossary-list');
    const diffFilter = document.getElementById('glossary-difficulty-filter');
    const catFilter = document.getElementById('glossary-category-filter');

    const initGlossaryFilters = () => {
        if(diffFilter && catFilter && appMode === 'built-in') {
            diffFilter.value = state.selectedDifficulty || 'All';
            populateGlossaryCategories(diffFilter.value);
            catFilter.value = state.selectedCategory || 'All';
        }
    };

    const populateGlossaryCategories = (difficulty) => {
        if(!catFilter) return;
        catFilter.innerHTML = '<option value="All">All Categories</option>';
        let pool = flashcardsData;
        if (difficulty !== 'All') pool = pool.filter(c => c.difficulty === difficulty);
        
        const categories = [...new Set(pool.map(c => c.category))];
        categories.sort().forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat;
            catFilter.appendChild(opt);
        });
    };

    if(diffFilter) {
        diffFilter.addEventListener('change', (e) => {
            populateGlossaryCategories(e.target.value);
            renderGlossary();
        });
    }

    if(catFilter) {
        catFilter.addEventListener('change', () => {
            renderGlossary();
        });
    }

    const renderGlossary = () => {
        if(!glossaryList || appMode !== 'built-in') return;
        glossaryList.innerHTML = '';
        
        const searchVal = glossarySearchInput ? glossarySearchInput.value.toLowerCase() : '';
        const selectedDiff = diffFilter ? diffFilter.value : 'All';
        const selectedCat = catFilter ? catFilter.value : 'All';

        const filtered = flashcardsData.filter(c => {
            const matchDiff = selectedDiff === 'All' || c.difficulty === selectedDiff;
            const matchCat = selectedCat === 'All' || c.category === selectedCat;
            const matchSearch = searchVal === '' || 
                c.word.toLowerCase().includes(searchVal) || 
                c.simple_def.toLowerCase().includes(searchVal) ||
                c.real_world_scenario.toLowerCase().includes(searchVal) ||
                c.category.toLowerCase().includes(searchVal);
            
            return matchDiff && matchCat && matchSearch;
        });

        if (filtered.length === 0) {
            glossaryList.innerHTML = `<p class="text-center text-[#a1a1a6] py-8">No matching concepts found.</p>`;
            return;
        }

        filtered.forEach(card => {
            const item = document.createElement('div');
            item.className = 'bg-surface border border-divider rounded-xl overflow-hidden';
            item.innerHTML = `
                <button class="w-full text-left p-4 md:p-6 flex justify-between items-center hover:bg-surface-pearl transition-colors focus:outline-none">
                    <div class="pr-4">
                        <span class="text-xs text-primary font-medium uppercase tracking-wider mb-1 block">${card.category}</span>
                        <h3 class="apple-body-strong text-primary">${card.word}</h3>
                    </div>
                    <i class="ph ph-caret-down text-muted transition-transform duration-200"></i>
                </button>
                <div class="hidden px-4 md:px-6 pb-6 text-muted leading-relaxed border-t border-divider pt-4 bg-canvas">
                    <p class="text-ink mb-4">${card.simple_def}</p>
                    <div class="bg-surface p-4 rounded-lg border-l-4 border-primary mb-4 shadow-sm">
                        <span class="text-xs uppercase tracking-widest text-primary font-semibold block mb-2">Scenario</span>
                        <span class="text-ink">${card.real_world_scenario}</span>
                    </div>
                    <div class="mt-3 text-xs text-muted"><i class="ph ph-books"></i> ${card.source}</div>
                </div>
            `;

            const btn = item.querySelector('button');
            const content = item.querySelector('div.hidden');
            const icon = item.querySelector('.ph-caret-down');

            btn.addEventListener('click', () => {
                const isHidden = content.classList.contains('hidden');
                if (isHidden) {
                    content.classList.remove('hidden');
                    icon.classList.add('rotate-180');
                } else {
                    content.classList.add('hidden');
                    icon.classList.remove('rotate-180');
                }
            });
            glossaryList.appendChild(item);
        });
    };

    if(glossarySearchInput) {
        glossarySearchInput.addEventListener('input', () => {
            renderGlossary();
        });
    }

    // ==========================================
    // CUSTOM FILE UPLOAD LOGIC
    // ==========================================
    const uploadDropzone = document.getElementById('upload-dropzone');
    const fileInput = document.getElementById('file-input');
    const fileListEl = document.getElementById('file-list');
    const uploadCounter = document.getElementById('upload-counter');
    const btnGenerate = document.getElementById('btn-generate-flashcards');
    
    let uploadedFiles = []; // { file: File, id: string }
    const MAX_FILES = 20;

    const updateFileUI = () => {
        fileListEl.innerHTML = '';
        uploadCounter.textContent = `${uploadedFiles.length} / ${MAX_FILES} files uploaded`;
        btnGenerate.disabled = uploadedFiles.length === 0;
        if(uploadedFiles.length === 0) {
            btnGenerate.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            btnGenerate.classList.remove('opacity-50', 'cursor-not-allowed');
        }

        uploadedFiles.forEach(fObj => {
            const el = document.createElement('div');
            el.className = 'flex justify-between items-center bg-surface p-4 rounded-xl border border-divider shadow-sm';
            
            let size = (fObj.file.size / 1024).toFixed(1) + ' KB';
            if (fObj.file.size > 1024 * 1024) size = (fObj.file.size / (1024 * 1024)).toFixed(1) + ' MB';

            el.innerHTML = `
                <div class="flex items-center gap-3 overflow-hidden">
                    <i class="ph-fill ph-file-text text-2xl text-primary flex-shrink-0"></i>
                    <div class="truncate">
                        <p class="apple-body-strong text-ink truncate">${fObj.file.name}</p>
                        <p class="text-xs text-muted">${size}</p>
                    </div>
                </div>
                <button class="text-danger hover:bg-danger/10 p-2 rounded-full transition-colors flex-shrink-0" title="Remove">
                    <i class="ph-fill ph-trash text-lg"></i>
                </button>
            `;
            el.querySelector('button').addEventListener('click', () => {
                uploadedFiles = uploadedFiles.filter(f => f.id !== fObj.id);
                updateFileUI();
            });
            fileListEl.appendChild(el);
        });
    };

    const handleFiles = (files) => {
        const validExtensions = ['pdf', 'html', 'htm', 'txt'];
        for (let i = 0; i < files.length; i++) {
            if (uploadedFiles.length >= MAX_FILES) break;
            const file = files[i];
            const ext = file.name.split('.').pop().toLowerCase();
            if (validExtensions.includes(ext)) {
                // Check if not already added
                if(!uploadedFiles.find(f => f.file.name === file.name && f.file.size === file.size)) {
                    uploadedFiles.push({ file, id: Math.random().toString(36).substring(7) });
                }
            } else {
                alert(`File format .${ext} is not supported.`);
            }
        }
        updateFileUI();
    };

    uploadDropzone?.addEventListener('click', () => fileInput.click());
    
    uploadDropzone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadDropzone.classList.add('border-primary', 'bg-surface-pearl');
    });
    
    uploadDropzone?.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadDropzone.classList.remove('border-primary', 'bg-surface-pearl');
    });

    uploadDropzone?.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadDropzone.classList.remove('border-primary', 'bg-surface-pearl');
        if (e.dataTransfer.files) {
            handleFiles(e.dataTransfer.files);
        }
    });

    fileInput?.addEventListener('change', (e) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
        fileInput.value = ''; // Reset
    });

    // ==========================================
    // TEXT EXTRACTION
    // ==========================================
    const extractTextFromFile = async (file) => {
        const ext = file.name.split('.').pop().toLowerCase();
        
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            if (ext === 'txt') {
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsText(file);
            } 
            else if (ext === 'html' || ext === 'htm') {
                reader.onload = (e) => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(e.target.result, 'text/html');
                    // Remove scripts and styles
                    doc.querySelectorAll('script, style').forEach(el => el.remove());
                    resolve(doc.body.innerText || '');
                };
                reader.onerror = reject;
                reader.readAsText(file);
            } 
            else if (ext === 'pdf') {
                reader.onload = async (e) => {
                    try {
                        const typedarray = new Uint8Array(e.target.result);
                        const pdf = await pdfjsLib.getDocument(typedarray).promise;
                        let text = '';
                        // Limit to first 20 pages to avoid extreme payloads
                        const maxPages = Math.min(pdf.numPages, 20); 
                        for (let i = 1; i <= maxPages; i++) {
                            const page = await pdf.getPage(i);
                            const content = await page.getTextContent();
                            const strings = content.items.map(item => item.str);
                            text += strings.join(' ') + '\n';
                        }
                        resolve(text);
                    } catch (err) {
                        reject(err);
                    }
                };
                reader.onerror = reject;
                reader.readAsArrayBuffer(file);
            } else {
                resolve('');
            }
        });
    };

    // ==========================================
    // AI GENERATION LOGIC
    // ==========================================
    const apiKeyModal = document.getElementById('api-key-modal');
    const apiKeyModalContent = document.getElementById('api-key-modal-content');
    const apiKeyInput = document.getElementById('api-key-input');
    
    const showLoading = () => document.getElementById('loading-overlay').classList.remove('hidden');
    const hideLoading = () => document.getElementById('loading-overlay').classList.add('hidden');

    const showApiKeyModal = () => {
        apiKeyModal.classList.remove('hidden');
        setTimeout(() => {
            apiKeyModalContent.classList.remove('scale-95', 'opacity-0');
        }, 10);
    };

    const hideApiKeyModal = () => {
        apiKeyModalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            apiKeyModal.classList.add('hidden');
        }, 300);
    };

    document.getElementById('btn-close-modal')?.addEventListener('click', hideApiKeyModal);
    document.getElementById('btn-save-key')?.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        if (key) {
            state.geminiApiKey = key;
            saveState();
            hideApiKeyModal();
            // Retry generation
            btnGenerate.click();
        }
    });

    btnGenerate?.addEventListener('click', async () => {
        if (!state.geminiApiKey) {
            showApiKeyModal();
            return;
        }

        if (uploadedFiles.length === 0) return;

        showLoading();
        
        try {
            // Extract text
            let combinedText = '';
            const fileNames = [];
            for (const fObj of uploadedFiles) {
                const text = await extractTextFromFile(fObj.file);
                combinedText += `\n--- Document: ${fObj.file.name} ---\n${text}\n`;
                fileNames.push(fObj.file.name);
            }

            // Limit text size to prevent payload issues (~100k chars is safe)
            combinedText = combinedText.substring(0, 100000);

            const prompt = `You are generating study flashcards from user-provided learning material. 
Use ONLY the information contained in the provided source material. Do not use outside knowledge. Do not invent facts. Do not hallucinate answers. 
Create flashcards in three difficulty levels.
Return a raw JSON object (without markdown code blocks) with this exact structure:
{
  "title": "A short 2-5 word title for this collection based on the material",
  "easy": [ { "word": "Concept Name", "simple_def": "Definition", "real_world_scenario": "A brief scenario or example from the text" } ],
  "medium": [ { "word": "Concept Name", "simple_def": "Definition", "real_world_scenario": "A brief scenario or example from the text" } ],
  "hard": [ { "word": "Concept Name", "simple_def": "Definition", "real_world_scenario": "A brief scenario or example from the text" } ]
}
Make at least 3-5 cards per category if possible. Ensure no markdown formatting surrounds the JSON.

Source Material:
${combinedText}
`;

            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${state.geminiApiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.2,
                        responseMimeType: "application/json"
                    }
                })
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error.message || "API Error");
            }

            let generatedJsonText = data.candidates[0].content.parts[0].text;
            
            // Clean up if it returned markdown
            generatedJsonText = generatedJsonText.replace(/```json/gi, '').replace(/```/g, '').trim();
            const result = JSON.parse(generatedJsonText);

            // Format into internal structure
            const collectionId = 'col_' + Date.now();
            
            const processCards = (arr, diff) => {
                if(!arr) return [];
                return arr.map((c, i) => ({
                    id: `${collectionId}_${diff}_${i}`,
                    category: diff,
                    difficulty: diff,
                    word: c.word,
                    simple_def: c.simple_def,
                    real_world_scenario: c.real_world_scenario,
                    source: fileNames[0] + (fileNames.length > 1 ? ` (+${fileNames.length-1})` : '')
                }));
            };

            const collection = {
                id: collectionId,
                title: result.title || 'Custom Flashcards',
                date: new Date().toLocaleDateString(),
                files: fileNames,
                cards: {
                    easy: processCards(result.easy, 'Easy'),
                    medium: processCards(result.medium, 'Medium'),
                    hard: processCards(result.hard, 'Hard')
                }
            };

            state.customCollections[collectionId] = collection;
            saveState();

            // Clear upload queue
            uploadedFiles = [];
            updateFileUI();
            
            // Go to Profile
            showProfileScreen();

        } catch (error) {
            console.error(error);
            alert("Failed to generate flashcards. Please check your API key or ensure the documents contain readable text.");
            if(error.message.includes("API_KEY_INVALID")) {
                state.geminiApiKey = null;
                saveState();
            }
        } finally {
            hideLoading();
        }
    });

    // ==========================================
    // PROFILE LOGIC
    // ==========================================
    const renderProfile = () => {
        const grid = document.getElementById('collections-grid');
        const emptyState = document.getElementById('empty-profile-state');
        
        grid.innerHTML = '';
        
        const keys = Object.keys(state.customCollections);
        if (keys.length === 0) {
            grid.classList.add('hidden');
            emptyState.classList.remove('hidden');
            return;
        }

        grid.classList.remove('hidden');
        emptyState.classList.add('hidden');

        keys.sort().reverse().forEach(key => {
            const col = state.customCollections[key];
            const totalCards = (col.cards.easy?.length || 0) + (col.cards.medium?.length || 0) + (col.cards.hard?.length || 0);
            
            const card = document.createElement('button');
            card.className = 'text-left apple-card apple-card-hover p-6 group flex flex-col h-full';
            card.innerHTML = `
                <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <i class="ph-fill ph-cards text-2xl"></i>
                </div>
                <h3 class="apple-body-strong text-ink mb-1 group-hover:text-primary transition-colors">${col.title}</h3>
                <p class="text-xs text-muted mb-4">${col.files.join(', ')}</p>
                <div class="mt-auto pt-4 border-t border-divider flex justify-between items-center text-sm">
                    <span class="font-medium text-ink">${totalCards} Cards</span>
                    <span class="text-muted">Created ${col.date}</span>
                </div>
            `;
            card.addEventListener('click', () => showCustomCollection(key));
            grid.appendChild(card);
        });
    };

    // ==========================================
    // EDIT CARD LOGIC
    // ==========================================
    const editModal = document.getElementById('edit-card-modal');
    const editModalContent = document.getElementById('edit-card-modal-content');
    
    document.getElementById('btn-edit-card')?.addEventListener('click', () => {
        if (currentQueue.length === 0) return;
        const card = currentQueue[currentIndex];
        
        document.getElementById('edit-word').value = card.word;
        document.getElementById('edit-def').value = card.simple_def;
        document.getElementById('edit-scenario').value = card.real_world_scenario;
        
        editModal.classList.remove('hidden');
        setTimeout(() => editModalContent.classList.remove('scale-95', 'opacity-0'), 10);
    });

    const hideEditModal = () => {
        editModalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => editModal.classList.add('hidden'), 300);
    };

    document.getElementById('btn-close-edit')?.addEventListener('click', hideEditModal);

    document.getElementById('btn-save-edit')?.addEventListener('click', () => {
        if (currentQueue.length === 0 || appMode !== 'custom') return;
        
        const card = currentQueue[currentIndex];
        card.word = document.getElementById('edit-word').value;
        card.simple_def = document.getElementById('edit-def').value;
        card.real_world_scenario = document.getElementById('edit-scenario').value;
        
        // Update in localStorage
        const collection = state.customCollections[currentCustomCollectionId];
        if(collection) {
            saveState();
        }
        
        renderCurrentCard();
        hideEditModal();
    });

    document.getElementById('btn-delete-card')?.addEventListener('click', () => {
        if (currentQueue.length === 0 || appMode !== 'custom') return;
        
        if (confirm('Delete this flashcard?')) {
            const card = currentQueue[currentIndex];
            const collection = state.customCollections[currentCustomCollectionId];
            if(collection) {
                // Find and remove
                const diffKey = card.difficulty.toLowerCase();
                collection.cards[diffKey] = collection.cards[diffKey].filter(c => c.id !== card.id);
                saveState();
            }
            
            currentQueue.splice(currentIndex, 1);
            if (currentIndex >= currentQueue.length) currentIndex = 0;
            
            renderCurrentCard();
            hideEditModal();
            updateGlobalProgress();
        }
    });

    // ==========================================
    // THEME TOGGLE LOGIC
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    const updateThemeIcon = () => {
        if (document.documentElement.classList.contains('dark')) {
            themeIcon.className = 'ph-fill ph-moon text-xl';
        } else {
            themeIcon.className = 'ph-fill ph-sun text-xl';
        }
    };

    if (themeToggleBtn) {
        updateThemeIcon();
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            if (isDark) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('ai_flashcard_theme_v3', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('ai_flashcard_theme_v3', 'dark');
            }
            updateThemeIcon();
        });
    }

    // Initialize initial view
    if (state.selectedDifficulty && state.selectedCategory) {
        showAppMode(state.selectedCategory);
    } else if (state.selectedDifficulty) {
        showTopicsScreen(state.selectedDifficulty);
    } else {
        showDifficultyScreen();
    }
});
