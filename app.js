document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // STATE MANAGEMENT
    // ==========================================
    const STATE_KEY = 'ai_flashcard_state_v3';
    let state = JSON.parse(localStorage.getItem(STATE_KEY)) || {
        progress: {}, // { id: 'mastered' | 'review' }
        streak: 0,
        selectedDifficulty: null,
        selectedCategory: null
    };

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
    
    const navTabsContainer = document.getElementById('nav-tabs');
    const navTabs = document.querySelectorAll('.nav-tab');
    const breadcrumbs = document.getElementById('breadcrumbs');
    const bcHome = document.getElementById('bc-home');
    const bcLevel = document.getElementById('bc-level');
    const bcSepTopic = document.getElementById('bc-sep-topic');
    const bcTopic = document.getElementById('bc-topic');
    const topAnchor = document.getElementById('top-anchor');

    // SCROLL REVEAL (Intersection Observer)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    const observeReveals = () => {
        document.querySelectorAll('.reveal-item').forEach(el => revealObserver.observe(el));
    }
    observeReveals();

    // TOP ANCHOR VISIBILITY
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topAnchor.classList.add('visible');
        } else {
            topAnchor.classList.remove('visible');
        }
    });

    // GLOBAL PROGRESS UPDATE
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    const updateGlobalProgress = () => {
        if (!state.selectedDifficulty) return;
        
        let pool = flashcardsData.filter(c => c.difficulty === state.selectedDifficulty);
        if (state.selectedCategory && state.selectedCategory !== 'All') {
            pool = pool.filter(c => c.category === state.selectedCategory);
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
    // DRILL-DOWN NAVIGATION LOGIC
    // ==========================================
    
    const hideAllViews = () => {
        [viewDifficulty, viewTopics, viewFlashcards, viewQuiz, viewGlossary].forEach(v => {
            v.classList.add('hidden');
            v.classList.remove('block');
        });
    };

    const showDifficultyScreen = () => {
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
        state.selectedDifficulty = difficulty;
        state.selectedCategory = null;
        saveState();

        hideAllViews();
        viewTopics.classList.remove('hidden');
        viewTopics.classList.add('block');
        
        breadcrumbs.classList.remove('hidden');
        breadcrumbs.classList.add('flex');
        bcLevel.textContent = difficulty;
        bcSepTopic.classList.add('hidden');
        bcTopic.classList.add('hidden');
        
        navTabsContainer.classList.add('hidden');
        navTabsContainer.classList.remove('flex');

        document.getElementById('topic-level-title').textContent = `${difficulty} Topics`;

        const topicsGrid = document.getElementById('topics-grid');
        topicsGrid.innerHTML = '';

        // Get unique categories for this difficulty
        const diffCards = flashcardsData.filter(c => c.difficulty === difficulty);
        const categories = [...new Set(diffCards.map(c => c.category))];

        // Add "All Topics" tile
        const allBtn = document.createElement('button');
        allBtn.className = 'text-left bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/50 rounded-2xl p-6 transition-all hover:-translate-y-1 group';
        allBtn.innerHTML = `
            <div class="flex items-center gap-3 mb-2">
                <i class="ph-fill ph-lightning text-xl text-yellow-400"></i>
                <h3 class="text-xl font-bold group-hover:text-white text-[#e5e5ea]">All ${difficulty} Topics</h3>
            </div>
            <p class="text-[#a1a1a6] text-sm">${diffCards.length} Flashcards</p>
        `;
        allBtn.addEventListener('click', () => showAppMode('All'));
        topicsGrid.appendChild(allBtn);

        // Add individual category tiles
        categories.forEach(cat => {
            const count = diffCards.filter(c => c.category === cat).length;
            const btn = document.createElement('button');
            btn.className = 'text-left bg-white/5 border border-white/10 hover:border-white/30 rounded-2xl p-6 transition-all hover:-translate-y-1 group';
            btn.innerHTML = `
                <h3 class="text-lg font-bold mb-2 group-hover:text-[#0A84FF] transition-colors">${cat}</h3>
                <p class="text-[#a1a1a6] text-sm">${count} Flashcards</p>
            `;
            btn.addEventListener('click', () => showAppMode(cat));
            topicsGrid.appendChild(btn);
        });
        observeReveals();
    };

    const showAppMode = (category) => {
        state.selectedCategory = category;
        saveState();

        bcSepTopic.classList.remove('hidden');
        bcTopic.classList.remove('hidden');
        bcTopic.textContent = category === 'All' ? `All ${state.selectedDifficulty}` : category;

        navTabsContainer.classList.remove('hidden');
        navTabsContainer.classList.add('flex');

        // Activate Flashcards tab by default
        navTabs.forEach(t => t.classList.remove('active'));
        document.querySelector('[data-target="flashcards"]').classList.add('active');

        hideAllViews();
        viewFlashcards.classList.remove('hidden');
        viewFlashcards.classList.add('block');

        updateGlobalProgress();
        initFlashcards();
        initQuiz();
        initGlossaryFilters(); // Set up glossary dropdowns with current selections
        renderGlossary(); // Render glossary
        observeReveals();
    };

    // Breadcrumb clicks
    bcHome.addEventListener('click', showDifficultyScreen);
    document.getElementById('nav-logo').addEventListener('click', showDifficultyScreen);
    bcLevel.addEventListener('click', () => showTopicsScreen(state.selectedDifficulty));

    // Difficulty Card clicks
    document.querySelectorAll('.difficulty-card').forEach(card => {
        card.addEventListener('click', () => {
            showTopicsScreen(card.dataset.difficulty);
        });
    });

    // Tab clicks
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

    const initFlashcards = () => {
        if (!state.selectedDifficulty) return;
        
        let pool = flashcardsData.filter(c => c.difficulty === state.selectedDifficulty);
        if (state.selectedCategory && state.selectedCategory !== 'All') {
            pool = pool.filter(c => c.category === state.selectedCategory);
        }
        
        currentQueue = [...pool];
        currentIndex = 0;
        if(flipCardEl) flipCardEl.classList.remove('flipped');
        renderCurrentCard();
    };

    const renderCurrentCard = () => {
        if (currentQueue.length === 0) {
            if(cardWordEl) cardWordEl.textContent = "No cards available.";
            return;
        }
        const card = currentQueue[currentIndex];
        cardCategoryEl.textContent = card.category;
        cardWordEl.textContent = card.word;
        cardSimpleDefEl.textContent = card.simple_def;
        cardScenarioEl.innerHTML = `<strong>Scenario:</strong> ${card.real_world_scenario}`;
        cardSourceEl.textContent = card.source;
        cardCounterEl.textContent = `${currentIndex + 1} / ${currentQueue.length}`;
        
        // Highlight border based on status
        const status = state.progress[card.id];
        flipCardEl.firstElementChild.style.borderColor = 
            status === 'mastered' ? 'var(--success-color)' : 
            status === 'review' ? 'var(--danger-color)' : 'var(--card-border)';
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
        
        // Auto next
        flipCardEl.classList.remove('flipped');
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % currentQueue.length;
            renderCurrentCard();
        }, 300);
    };

    document.getElementById('btn-mastered')?.addEventListener('click', () => updateCardStatus('mastered'));
    document.getElementById('btn-review')?.addEventListener('click', () => updateCardStatus('review'));

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (viewFlashcards.classList.contains('hidden')) return;
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
    // QUIZ MODE
    // ==========================================
    const quizCategoryEl = document.getElementById('quiz-category');
    const quizQuestionEl = document.getElementById('quiz-question');
    const quizOptionsContainer = document.getElementById('quiz-options');
    const quizFeedbackEl = document.getElementById('quiz-feedback');
    const quizNextBtn = document.getElementById('btn-quiz-next');
    const quizStreakEl = document.getElementById('quiz-streak');

    let currentQuizCard = null;

    const initQuiz = () => {
        if (!state.selectedDifficulty) return;
        
        let pool = flashcardsData.filter(c => c.difficulty === state.selectedDifficulty);
        if (state.selectedCategory && state.selectedCategory !== 'All') {
            pool = pool.filter(c => c.category === state.selectedCategory);
        }

        if (pool.length === 0) return;

        quizStreakEl.textContent = state.streak;
        quizFeedbackEl.classList.add('hidden');
        quizNextBtn.classList.add('hidden');
        quizOptionsContainer.innerHTML = '';
        
        // Select a random question from the filtered pool
        currentQuizCard = pool[Math.floor(Math.random() * pool.length)];
        
        quizCategoryEl.textContent = currentQuizCard.category;
        
        // Randomly pick simple_def or real_world_scenario as the prompt
        const promptText = Math.random() > 0.5 ? currentQuizCard.simple_def : currentQuizCard.real_world_scenario;
        quizQuestionEl.textContent = promptText;

        // Distractor Logic: Must pull from same difficulty level.
        const sameDifficultyCards = flashcardsData.filter(c => c.difficulty === state.selectedDifficulty);
        const otherCards = sameDifficultyCards.filter(c => c.id !== currentQuizCard.id);
        
        const distractors = otherCards.sort(() => Math.random() - 0.5).slice(0, 3).map(c => c.word);
        
        const options = [...distractors, currentQuizCard.word].sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'w-full text-left p-4 rounded-xl border border-[#2c2c2e] bg-white/5 hover:bg-white/10 transition-colors text-lg md:text-xl font-bold text-[#0A84FF]';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleQuizAnswer(btn, opt === currentQuizCard.word));
            quizOptionsContainer.appendChild(btn);
        });
    };

    const handleQuizAnswer = (selectedBtn, isCorrect) => {
        // Disable all buttons
        Array.from(quizOptionsContainer.children).forEach(btn => {
            btn.disabled = true;
            btn.classList.remove('hover:bg-white/10', 'cursor-pointer');
            if (btn.textContent === currentQuizCard.word) {
                btn.classList.add('border-[#30d158]', 'bg-[#30d158]/10');
            }
        });

        quizFeedbackEl.classList.remove('hidden');
        if (isCorrect) {
            selectedBtn.classList.add('border-[#30d158]', 'bg-[#30d158]/10');
            quizFeedbackEl.innerHTML = `<span class="text-[#30d158] font-bold"><i class="ph-fill ph-check-circle"></i> Correct!</span> That is the right concept.`;
            quizFeedbackEl.className = 'mt-6 rounded-xl p-4 text-sm bg-[#30d158]/10 border border-[#30d158]/20 animate-fade-in block';
            state.streak += 1;
        } else {
            selectedBtn.classList.add('border-[#ff453a]', 'bg-[#ff453a]/10');
            quizFeedbackEl.innerHTML = `<span class="text-[#ff453a] font-bold"><i class="ph-fill ph-x-circle"></i> Incorrect.</span> The correct concept was highlighted above.`;
            quizFeedbackEl.className = 'mt-6 rounded-xl p-4 text-sm bg-[#ff453a]/10 border border-[#ff453a]/20 animate-fade-in block';
            state.streak = 0;
        }
        
        saveState();
        quizStreakEl.textContent = state.streak;
        quizNextBtn.classList.remove('hidden');
    };

    quizNextBtn?.addEventListener('click', initQuiz);

    // ==========================================
    // GLOSSARY MODE
    // ==========================================
    const glossarySearchInput = document.getElementById('glossary-search');
    const glossaryList = document.getElementById('glossary-list');
    const diffFilter = document.getElementById('glossary-difficulty-filter');
    const catFilter = document.getElementById('glossary-category-filter');

    const initGlossaryFilters = () => {
        if(diffFilter && catFilter) {
            diffFilter.value = state.selectedDifficulty || 'All';
            populateGlossaryCategories(diffFilter.value);
            catFilter.value = state.selectedCategory || 'All';
        }
    };

    const populateGlossaryCategories = (difficulty) => {
        if(!catFilter) return;
        catFilter.innerHTML = '<option value="All">All Categories</option>';
        
        let pool = flashcardsData;
        if (difficulty !== 'All') {
            pool = pool.filter(c => c.difficulty === difficulty);
        }
        
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
        if(!glossaryList) return;
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
            item.className = 'bg-white/5 border border-white/10 rounded-xl overflow-hidden';
            item.innerHTML = `
                <button class="w-full text-left p-4 md:p-6 flex justify-between items-center hover:bg-white/5 transition-colors focus:outline-none">
                    <div class="pr-4">
                        <span class="text-xs text-[#0A84FF] font-medium uppercase tracking-wider mb-1 block">${card.category}</span>
                        <h3 class="font-bold text-xl text-[#0A84FF]">${card.word}</h3>
                    </div>
                    <i class="ph ph-caret-down text-[#a1a1a6] transition-transform duration-200"></i>
                </button>
                <div class="hidden px-4 md:px-6 pb-6 text-[#a1a1a6] leading-relaxed border-t border-white/5 pt-4">
                    <p class="text-white mb-4">${card.simple_def}</p>
                    <div class="bg-black/20 p-3 rounded-lg border-l-2 border-[#0A84FF] mb-4">
                        <span class="text-xs uppercase tracking-widest text-[#0A84FF] font-semibold block mb-1">Scenario</span>
                        ${card.real_world_scenario}
                    </div>
                    <div class="mt-3 text-xs text-white/40"><i class="ph ph-books"></i> ${card.source}</div>
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

    // INITIALIZATION
    // Decide what view to show on load based on state
    if (state.selectedDifficulty && state.selectedCategory) {
        showAppMode(state.selectedCategory);
    } else if (state.selectedDifficulty) {
        showTopicsScreen(state.selectedDifficulty);
    } else {
        showDifficultyScreen();
    }
});
