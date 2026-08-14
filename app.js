document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // STATE MANAGEMENT
    // ==========================================
    const STATE_KEY = 'ai_flashcard_state_v3';
    let state = JSON.parse(localStorage.getItem(STATE_KEY)) || {
        progress: {}, // { id: 'mastered' | 'review' }
        selectedDifficulty: null,
        selectedCategory: null,
        customCollections: {},
        geminiApiKey: null,
        needReview: {} // { id: { nextReviewDate: timestamp, mistakeCount: number } }
    };

    // Backward-compatibility and Migration
    if (!state.customCollections) state.customCollections = {};
    if (!state.needReview) state.needReview = {};
    if (!state.notes) state.notes = {};
    if (state.streak !== undefined) delete state.streak;

    // Migrate old 'review' progress into new Need Review system if missing
    Object.keys(state.progress || {}).forEach(id => {
        if (state.progress[id] === 'review' && !state.needReview[id]) {
            state.needReview[id] = { nextReviewDate: Date.now(), mistakeCount: 1 };
        }
    });

    const saveState = () => {
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
        updateGlobalProgress();
    };

    // DOM ELEMENTS
    const viewDifficulty = document.getElementById('view-difficulty');
    const viewTopics = document.getElementById('view-topics');
    const viewFlashcards = document.getElementById('view-flashcards');
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
        if (confirm('Are you sure you want to reset all your progress?')) {
            state.progress = {};
            state.needReview = {};
            saveState();
            initFlashcards();
        }
    });

    // ==========================================
    // NAVIGATION & ROUTING LOGIC
    // ==========================================
    let appMode = 'built-in'; // 'built-in' | 'custom'
    let currentCustomCollectionId = null;
    let customCurrentDiff = null;

    const hideAllViews = () => {
        [viewDifficulty, viewTopics, viewFlashcards, viewGlossary, viewCustomize, viewProfile].forEach(v => {
            if (v) {
                v.classList.add('hidden');
                v.classList.remove('block');
            }
        });
    };

    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');

    const toggleMobileMenu = (forceClose = false) => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        if (isExpanded || forceClose) {
            navMenu.classList.add('hidden');
            navMenu.classList.remove('flex');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuIcon.classList.replace('ph-x', 'ph-list');
        } else {
            navMenu.classList.remove('hidden');
            navMenu.classList.add('flex');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            mobileMenuIcon.classList.replace('ph-list', 'ph-x');
        }
    };

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleMobileMenu(true);
        }
    });

    // Close menu when clicking a nav item on mobile
    const closeMenuOnNav = () => {
        if (window.innerWidth < 768) {
            toggleMobileMenu(true);
        }
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
        renderRecommendations();
    };

    const renderRecommendations = () => {
        const grid = document.getElementById('recommendations-grid');
        if (!grid) return;
        grid.innerHTML = '';

        const hasHistory = Object.keys(state.progress).length > 0 || Object.keys(state.needReview).length > 0;

        if (!hasHistory) {
            grid.innerHTML = `
                <div class="apple-card p-6 border border-divider col-span-full text-center">
                    <i class="ph-fill ph-sparkle text-3xl text-primary mb-3"></i>
                    <h3 class="apple-title-sm text-ink mb-2">Start Your Journey</h3>
                    <p class="text-sm text-muted">Select a difficulty level above to start learning, or head to the Profile to generate your own flashcards.</p>
                </div>
            `;
            return;
        }

        let reviewCards = [];
        const now = Date.now();
        let allCards = [...flashcardsData];
        for (const col of Object.values(state.customCollections)) {
            allCards = allCards.concat(col.cards.easy || [], col.cards.medium || [], col.cards.hard || []);
        }

        for (const [id, data] of Object.entries(state.needReview)) {
            if (data.nextReviewDate < now) {
                const card = allCards.find(c => (c.id || c.word) === id);
                if (card) reviewCards.push(card);
            }
        }

        let recs = [];
        if (reviewCards.length > 0) {
            recs = reviewCards.sort(() => Math.random() - 0.5).slice(0, 2);
        }
        const unmastered = allCards.filter(c => state.progress[c.id || c.word] !== 'mastered' && !recs.find(r => r === c));
        const needed = 3 - recs.length;
        if (needed > 0 && unmastered.length > 0) {
            recs = recs.concat(unmastered.sort(() => Math.random() - 0.5).slice(0, needed));
        }

        if (recs.length === 0) {
            grid.innerHTML = `
                <div class="apple-card p-6 border border-divider col-span-full text-center">
                    <i class="ph-fill ph-check-circle text-3xl text-success mb-3"></i>
                    <h3 class="apple-title-sm text-ink mb-2">You're all caught up!</h3>
                    <p class="text-sm text-muted">You've mastered everything. Try generating some new flashcards.</p>
                </div>
            `;
            return;
        }

        recs.forEach(card => {
            const btn = document.createElement('button');
            btn.className = 'text-left apple-card p-5 border border-divider hover:border-primary transition-colors bg-surface flex flex-col justify-between h-full';
            btn.innerHTML = `
                <div>
                    <span class="text-xs font-bold text-primary uppercase tracking-wider">${card.category}</span>
                    <h4 class="text-lg font-semibold text-ink mt-2 truncate">${card.word}</h4>
                </div>
                <div class="mt-6 text-sm text-primary font-medium flex items-center gap-1 group">
                    Review now <i class="ph-bold ph-arrow-right transition-transform group-hover:translate-x-1"></i>
                </div>
            `;
            btn.addEventListener('click', () => {
                appMode = 'review';
                currentQueue = [card];
                currentIndex = 0;
                hideAllViews();
                viewFlashcards.classList.remove('hidden');
                breadcrumbs.classList.add('flex');
                breadcrumbs.classList.remove('hidden');
                bcLevel.textContent = 'Home';
                bcLevel.onclick = showDifficultyScreen;
                bcSepTopic.classList.remove('hidden');
                bcTopic.classList.remove('hidden');
                bcTopic.textContent = 'Recommended';
                if (flipCardEl) flipCardEl.classList.remove('flipped');
                renderCurrentCard();
            });
            grid.appendChild(btn);
        });
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
        initGlossaryFilters();
        renderGlossary();
        observeReveals();
    };

    const showCustomizeScreen = () => {
        appMode = 'custom';
        hideAllViews();
        viewCustomize.classList.remove('hidden');
        viewCustomize.classList.add('block');
        breadcrumbs.classList.add('hidden');
        navTabsContainer.classList.add('hidden');
        navTabsContainer.classList.remove('flex');
        closeMenuOnNav();
    };

    document.getElementById('nav-profile-btn')?.addEventListener('click', () => {
        showProfileScreen();
        closeMenuOnNav();
    });

    document.getElementById('nav-customize-btn')?.addEventListener('click', showCustomizeScreen);

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
        if (confirm('Are you sure you want to delete this entire collection?')) {
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
document.getElementById('nav-home-btn')?.addEventListener('click', () => { showDifficultyScreen(); closeMenuOnNav(); });
document.getElementById('nav-customize-btn')?.addEventListener('click', () => { showCustomizeScreen(); closeMenuOnNav(); });
document.getElementById('nav-profile-btn')?.addEventListener('click', () => { showProfileScreen(); closeMenuOnNav(); });
document.getElementById('btn-profile-create')?.addEventListener('click', showCustomizeScreen);
document.getElementById('btn-empty-create')?.addEventListener('click', showCustomizeScreen);

// Old Nav Buttons
bcHome.addEventListener('click', () => { showDifficultyScreen(); closeMenuOnNav(); });
document.getElementById('nav-logo').addEventListener('click', () => { showDifficultyScreen(); closeMenuOnNav(); });

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
const cardWordBackEl = document.getElementById('card-word-back');
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
    } else if (appMode === 'review') {
        const now = Date.now();
        let allCards = [...flashcardsData];
        for (const col of Object.values(state.customCollections)) {
            allCards = allCards.concat(col.cards.easy || [], col.cards.medium || [], col.cards.hard || []);
        }

        pool = allCards.filter(c => {
            const cardId = c.id || c.word;
            return state.needReview[cardId] && state.needReview[cardId].nextReviewDate < now;
        });

        if (btnEditCard) btnEditCard.classList.add('hidden');
        if (sepEdit) sepEdit.classList.add('hidden');
    }

    currentQueue = [...pool];
    currentIndex = 0;
    if (flipCardEl) flipCardEl.classList.remove('flipped');
    renderCurrentCard();
};

const renderCurrentCard = () => {
    if (currentQueue.length === 0) {
        if (cardWordEl) cardWordEl.textContent = "No cards available.";
        if (cardSimpleDefEl) cardSimpleDefEl.textContent = "";
        if (cardScenarioEl) cardScenarioEl.textContent = "";
        if (btnEditCard) btnEditCard.classList.add('hidden');
        return;
    }

    if (appMode === 'custom' && btnEditCard) btnEditCard.classList.remove('hidden');

    const card = currentQueue[currentIndex];
    cardCategoryEl.textContent = card.category || (appMode === 'custom' ? customCurrentDiff : '');
    cardWordEl.textContent = card.word;
    if (cardWordBackEl) cardWordBackEl.textContent = card.word;
    cardSimpleDefEl.textContent = card.simple_def;
    cardScenarioEl.innerHTML = `${card.real_world_scenario}`;
    cardSourceEl.textContent = card.source || (appMode === 'custom' ? 'Custom Upload' : '');
    cardCounterEl.textContent = `${currentIndex + 1} / ${currentQueue.length}`;

    const status = state.progress[card.id];
    flipCardEl.firstElementChild.style.borderColor =
        status === 'mastered' ? 'var(--color-success)' :
            status === 'review' ? 'var(--color-danger)' : 'var(--color-divider)';
};

if (flipCardEl) {
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
    if (currentQueue.length === 0) return;
    const card = currentQueue[currentIndex];
    const cardId = card.id || card.word;

    const now = Date.now();
    if (status === 'mastered') { // Got It!
        state.progress[cardId] = 'mastered';
        if (state.needReview[cardId]) {
            delete state.needReview[cardId]; // Resolves review state
        }
    } else if (status === 'review') { // Need Review
        state.progress[cardId] = 'review';
        if (!state.needReview[cardId]) {
            state.needReview[cardId] = { nextReviewDate: now + 24 * 60 * 60 * 1000, mistakeCount: 1 };
        } else {
            state.needReview[cardId].mistakeCount += 1;
            state.needReview[cardId].nextReviewDate = now + 3 * 24 * 60 * 60 * 1000;
        }
    }

    saveState();

    flipCardEl.classList.remove('flipped');
    setTimeout(() => {
        // Remove from current queue if in review mode and answered
        if (appMode === 'review') {
            currentQueue.splice(currentIndex, 1);
            if (currentIndex >= currentQueue.length) currentIndex = 0;
        } else {
            currentIndex = (currentIndex + 1) % currentQueue.length;
        }
        renderCurrentCard();
    }, 300);
};

document.getElementById('btn-mastered')?.addEventListener('click', () => updateCardStatus('mastered'));
document.getElementById('btn-review')?.addEventListener('click', () => updateCardStatus('review'));

document.getElementById('btn-start-review')?.addEventListener('click', () => {
    appMode = 'review';
    initFlashcards();
    updateGlobalProgress();
    hideAllViews();
    viewFlashcards.classList.remove('hidden');
    updateBreadcrumbs('Need Review');
});

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
// GLOSSARY MODE (Built-in Only)
// ==========================================

// Glossary is built-in only
const glossarySearchInput = document.getElementById('glossary-search');
const glossaryList = document.getElementById('glossary-list');
const diffFilter = document.getElementById('glossary-difficulty-filter');
const catFilter = document.getElementById('glossary-category-filter');

const initGlossaryFilters = () => {
    if (diffFilter && catFilter && appMode === 'built-in') {
        diffFilter.value = state.selectedDifficulty || 'All';
        populateGlossaryCategories(diffFilter.value);
        catFilter.value = state.selectedCategory || 'All';
    }
};

const populateGlossaryCategories = (difficulty) => {
    if (!catFilter) return;
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

if (diffFilter) {
    diffFilter.addEventListener('change', (e) => {
        populateGlossaryCategories(e.target.value);
        renderGlossary();
    });
}

if (catFilter) {
    catFilter.addEventListener('change', () => {
        renderGlossary();
    });
}

const renderGlossary = () => {
    if (!glossaryList || appMode !== 'built-in') return;
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

if (glossarySearchInput) {
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
    if (uploadedFiles.length === 0) {
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
            if (!uploadedFiles.find(f => f.file.name === file.name && f.file.size === file.size)) {
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

    const quoteEl = document.getElementById('loading-quote-text');
    let quoteInterval = null;
    if (quoteEl && typeof loadingQuotes !== 'undefined' && loadingQuotes.length > 0) {
        const updateQuote = () => {
            quoteEl.classList.remove('opacity-100');
            quoteEl.classList.add('opacity-0');
            setTimeout(() => {
                const q = loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)];
                quoteEl.textContent = `"${q.text}"${q.author ? ` — ${q.author}` : ''}`;
                quoteEl.classList.remove('opacity-0');
                quoteEl.classList.add('opacity-100');
            }, 500);
        };
        updateQuote();
        quoteInterval = setInterval(updateQuote, 4000);
    }

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
The uploaded material must be treated as the PRIMARY SOURCE OF TRUTH.

CRITICAL RULES FOR SOURCE-GROUNDED GENERATION:
1. Extract and analyze the uploaded source content.
2. Identify only meaningful concepts that are actually explained in the source. Do NOT generate a flashcard merely because a technical word/term appears once. A concept should have enough meaningful information in the source to create a useful Concept, Simple Definition, and Real-World Scenario.
3. If the source does not provide enough information to create a useful flashcard, skip that concept rather than generating a shallow or hallucinated card.

FLASHCARD STRUCTURE:

### SIMPLE DEFINITION
The definition must be strictly grounded in the uploaded source.
- Accurately represent what the source says.
- Do not introduce unsupported technical facts.
- Do not expand the definition using your general knowledge.
- Keep it simple enough for a beginner.
- Do not change the meaning of the source.

### REAL-WORLD SCENARIO
The scenario should help the learner understand the source-supported concept. Use this priority:
1. If the uploaded source already contains an example, application, analogy, or real-world scenario: Prefer and transform that source material into a concise learner-friendly scenario.
2. If the source explains the concept clearly but does not provide an example: You MAY create a simple illustrative analogy/scenario, but ONLY to explain the concept already supported by the source.
3. The generated scenario must NOT introduce: New technical concepts, unsupported factual claims, new definitions, contradictory information, or extra domain knowledge that changes the scope of the source.

QUALITY PRIORITY:
1. Source fidelity
2. Factual accuracy
3. Concept clarity
4. Beginner understanding
5. Useful real-world illustration
Do NOT prioritize creativity over accuracy.

Create flashcards in three difficulty levels (easy, medium, hard).
Infer a high-level "topic" and "subtopic" based on the material. If it cannot be confidently inferred, fallback to "General" for topic and null for subtopic.

Return a raw JSON object (without markdown code blocks) with this exact structure:
{
  "title": "A short 2-5 word title for this collection based on the material",
  "easy": [ { "word": "Concept Name", "simple_def": "Definition", "real_world_scenario": "A brief scenario", "topic": "...", "subtopic": "..." } ],
  "medium": [ { "word": "Concept Name", "simple_def": "Definition", "real_world_scenario": "A brief scenario", "topic": "...", "subtopic": "..." } ],
  "hard": [ { "word": "Concept Name", "simple_def": "Definition", "real_world_scenario": "A brief scenario", "topic": "...", "subtopic": "..." } ]
}
Make at least 3-5 cards per category if possible. Ensure no markdown formatting surrounds the JSON.

Source Material:
${combinedText}
`;

        let data = null;
        let retries = 3;
        let delay = 1500;
        let currentModel = 'gemini-3.6-flash';

        while (retries > 0) {
            try {
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${state.geminiApiKey}`, {
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

                data = await res.json();

                if (data.error) {
                    const msg = data.error.message || "";
                    if (msg.includes('high demand') || msg.includes('Too Many Requests') || msg.includes('503')) {
                        console.warn(`[API] High demand on ${currentModel}. Retries left: ${retries - 1}. Retrying in ${delay}ms...`);
                        await new Promise(r => setTimeout(r, delay));
                        delay *= 2;
                        retries--;
                        
                        if (retries === 0 && currentModel === 'gemini-3.6-flash') {
                            currentModel = 'gemini-1.5-flash';
                            retries = 2;
                            delay = 1000;
                            console.warn(`[API] Falling back to ${currentModel}`);
                        } else if (retries === 0) {
                            throw new Error(data.error.message);
                        }
                    } else if (data.error.code === 404 || msg.includes('no longer available') || msg.includes('not found')) {
                        console.warn(`[API] Model ${currentModel} unavailable. Falling back to gemini-1.5-flash...`);
                        currentModel = 'gemini-1.5-flash';
                    } else {
                        throw new Error(data.error.message || "API Error");
                    }
                } else {
                    break;
                }
            } catch (err) {
                if (retries <= 1) throw err;
                await new Promise(r => setTimeout(r, delay));
                delay *= 2;
                retries--;
            }
        }

        let generatedJsonText = data.candidates[0].content.parts[0].text;

        // Clean up if it returned markdown
        generatedJsonText = generatedJsonText.replace(/```json/gi, '').replace(/```/g, '').trim();
        const result = JSON.parse(generatedJsonText);

        // Format into internal structure
        const collectionId = 'col_' + Date.now();

        let validCardCount = 0;
        const processCards = (arr, diff) => {
            if (!arr || !Array.isArray(arr)) return [];
            const validCards = [];
            arr.forEach((c, i) => {
                // Structural validation
                if (!c.word || typeof c.word !== 'string') {
                    console.warn(`[Validation] Dropped card at ${diff}[${i}]: Missing or invalid 'word'.`);
                    return;
                }
                if (!c.simple_def || typeof c.simple_def !== 'string') {
                    console.warn(`[Validation] Dropped card "${c.word}": Missing or invalid 'simple_def'.`);
                    return;
                }
                if (!c.real_world_scenario || typeof c.real_world_scenario !== 'string') {
                    console.warn(`[Validation] Dropped card "${c.word}": Missing or invalid 'real_world_scenario'.`);
                    return;
                }

                validCardCount++;
                validCards.push({
                    id: `${collectionId}_${diff}_${i}`,
                    category: diff,
                    difficulty: diff,
                    word: c.word,
                    simple_def: c.simple_def,
                    real_world_scenario: c.real_world_scenario,
                    topic: c.topic || 'General',
                    subtopic: c.subtopic || null,
                    source: fileNames[0] + (fileNames.length > 1 ? ` (+${fileNames.length - 1})` : '')
                });
            });
            return validCards;
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

        hideLoading();
        alert(`${validCardCount} flashcards generated successfully.`);
        showProfileScreen();

    } catch (error) {
        console.error(error);
        alert("Failed to generate flashcards. Please check your API key or ensure the documents contain readable text.");
        if (error.message.includes("API_KEY_INVALID")) {
            state.geminiApiKey = null;
            saveState();
        }
    } finally {
        if (quoteInterval) clearInterval(quoteInterval);
        hideLoading();
    }
});

// ==========================================
// PROFILE LOGIC
// ==========================================
const renderProfile = () => {
    const grid = document.getElementById('collections-grid');
    const emptyState = document.getElementById('empty-profile-state');
    const reviewSection = document.getElementById('need-review-section');
    const reviewCount = document.getElementById('need-review-count');

    let dueCount = 0;
    const now = Date.now();
    for (const [id, data] of Object.entries(state.needReview)) {
        if (data.nextReviewDate < now) dueCount++;
    }

    if (dueCount > 0 && reviewSection) {
        reviewSection.classList.remove('hidden');
        reviewCount.textContent = dueCount;
    } else if (reviewSection) {
        reviewSection.classList.add('hidden');
    }

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

        const card = document.createElement('div');
        card.className = 'text-left apple-card apple-card-hover p-6 group flex flex-col h-full cursor-pointer relative';
        card.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <i class="ph-fill ph-cards text-2xl"></i>
                    </div>
                    <button class="btn-delete-col w-8 h-8 rounded-full bg-surface border border-divider text-muted hover:text-danger hover:bg-danger/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-sm" data-id="${key}">
                        <i class="ph ph-trash text-sm pointer-events-none"></i>
                    </button>
                </div>
                <h3 class="apple-body-strong text-ink mb-1 group-hover:text-primary transition-colors">${col.title}</h3>
                <p class="text-xs text-muted mb-4">${col.files.join(', ')}</p>
                <div class="mt-auto pt-4 border-t border-divider flex justify-between items-center text-sm">
                    <span class="font-medium text-ink">${totalCards} Cards</span>
                    <span class="text-muted">Created ${col.date}</span>
                </div>
            `;
        card.addEventListener('click', (e) => {
            if (e.target.closest('.btn-delete-col')) {
                openDeleteCollectionModal(key);
            } else {
                showCustomCollection(key);
            }
        });
        grid.appendChild(card);
    });

    renderNotes();
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
    if (collection) {
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
        if (collection) {
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

// ==========================================
// DELETE COLLECTION LOGIC
// ==========================================
let collectionToDelete = null;
const deleteColModal = document.getElementById('delete-collection-modal');
const deleteColModalContent = document.getElementById('delete-collection-modal-content');

const openDeleteCollectionModal = (id) => {
    collectionToDelete = id;
    deleteColModal.classList.remove('hidden');
    setTimeout(() => deleteColModalContent.classList.remove('scale-95', 'opacity-0'), 10);
};

const closeDeleteCollectionModal = () => {
    deleteColModalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => deleteColModal.classList.add('hidden'), 300);
    collectionToDelete = null;
};

document.getElementById('btn-cancel-delete-col')?.addEventListener('click', closeDeleteCollectionModal);
document.getElementById('btn-confirm-delete-col')?.addEventListener('click', () => {
    if (!collectionToDelete) return;
    
    // Clean up needReview state for this collection
    const col = state.customCollections[collectionToDelete];
    if (col) {
        const allCards = [...(col.cards.easy || []), ...(col.cards.medium || []), ...(col.cards.hard || [])];
        allCards.forEach(c => {
            if (state.needReview[c.id]) delete state.needReview[c.id];
        });
        delete state.customCollections[collectionToDelete];
        saveState();
    }
    
    closeDeleteCollectionModal();
    renderProfile();
});

// ==========================================
// NOTES LOGIC
// ==========================================
const noteEditorModal = document.getElementById('note-editor-modal');
const noteEditorModalContent = document.getElementById('note-editor-modal-content');
const noteViewerModal = document.getElementById('note-viewer-modal');
const noteViewerModalContent = document.getElementById('note-viewer-modal-content');

let currentNoteId = null;

const closeNoteEditor = () => {
    noteEditorModalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => noteEditorModal.classList.add('hidden'), 300);
    currentNoteId = null;
};

const closeNoteViewer = () => {
    noteViewerModalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => noteViewerModal.classList.add('hidden'), 300);
    currentNoteId = null;
};

document.getElementById('btn-close-note-editor')?.addEventListener('click', closeNoteEditor);
document.getElementById('btn-close-note-viewer')?.addEventListener('click', closeNoteViewer);

document.getElementById('btn-create-note')?.addEventListener('click', () => {
    currentNoteId = null;
    document.getElementById('note-editor-title').textContent = 'New Note';
    document.getElementById('note-input-title').value = '';
    document.getElementById('note-input-content').value = '';
    document.getElementById('note-input-topic').value = '';
    
    noteEditorModal.classList.remove('hidden');
    setTimeout(() => noteEditorModalContent.classList.remove('scale-95', 'opacity-0'), 10);
});

document.getElementById('btn-save-note')?.addEventListener('click', () => {
    const title = document.getElementById('note-input-title').value.trim();
    const content = document.getElementById('note-input-content').value.trim();
    const topic = document.getElementById('note-input-topic').value.trim();
    
    if (!title || !content) {
        alert('Title and content are required.');
        return;
    }
    
    if (!currentNoteId) {
        currentNoteId = 'note_' + Date.now();
    }
    
    state.notes[currentNoteId] = {
        id: currentNoteId,
        title,
        content,
        topic,
        timestamp: Date.now()
    };
    
    saveState();
    closeNoteEditor();
    renderProfile();
});

const openNoteViewer = (id) => {
    const note = state.notes[id];
    if (!note) return;
    
    currentNoteId = id;
    document.getElementById('viewer-note-title').textContent = note.title;
    document.getElementById('viewer-note-content').textContent = note.content;
    document.getElementById('viewer-note-date').textContent = new Date(note.timestamp).toLocaleDateString();
    
    const topicEl = document.getElementById('viewer-note-topic');
    if (note.topic) {
        topicEl.textContent = note.topic;
        topicEl.classList.remove('hidden');
    } else {
        topicEl.classList.add('hidden');
    }
    
    noteViewerModal.classList.remove('hidden');
    setTimeout(() => noteViewerModalContent.classList.remove('scale-95', 'opacity-0'), 10);
};

document.getElementById('btn-edit-note')?.addEventListener('click', () => {
    if (!currentNoteId) return;
    const note = state.notes[currentNoteId];
    if (!note) return;
    
    closeNoteViewer();
    
    setTimeout(() => {
        document.getElementById('note-editor-title').textContent = 'Edit Note';
        document.getElementById('note-input-title').value = note.title;
        document.getElementById('note-input-content').value = note.content;
        document.getElementById('note-input-topic').value = note.topic || '';
        
        noteEditorModal.classList.remove('hidden');
        setTimeout(() => noteEditorModalContent.classList.remove('scale-95', 'opacity-0'), 10);
    }, 300);
});

document.getElementById('btn-delete-note')?.addEventListener('click', () => {
    if (!currentNoteId) return;
    if (confirm('Permanently delete this note?')) {
        delete state.notes[currentNoteId];
        saveState();
        closeNoteViewer();
        renderProfile();
    }
});

document.getElementById('btn-share-note')?.addEventListener('click', async () => {
    if (!currentNoteId) return;
    const note = state.notes[currentNoteId];
    if (!note) return;
    
    const shareText = `${note.title}\n${note.topic ? `Topic: ${note.topic}\n` : ''}\n${note.content}`;
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: note.title,
                text: shareText
            });
        } catch (err) {
            console.warn('Share canceled or failed', err);
        }
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Note copied to clipboard!');
        }).catch(() => {
            alert('Failed to copy to clipboard.');
        });
    }
});

const renderNotes = () => {
    const grid = document.getElementById('notes-grid');
    const emptyState = document.getElementById('empty-notes-state');
    
    if (!grid || !emptyState) return;
    grid.innerHTML = '';
    
    const keys = Object.keys(state.notes || {});
    if (keys.length === 0) {
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }
    
    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');
    
    keys.sort((a, b) => state.notes[b].timestamp - state.notes[a].timestamp).forEach(key => {
        const note = state.notes[key];
        
        const card = document.createElement('div');
        card.className = 'text-left apple-card apple-card-hover p-5 group flex flex-col h-full cursor-pointer';
        card.innerHTML = `
            <div class="mb-3 flex justify-between items-start">
                <h3 class="apple-body-strong text-ink group-hover:text-primary transition-colors truncate pr-2">${note.title}</h3>
                <i class="ph ph-note-pencil text-muted opacity-0 group-hover:opacity-100 transition-opacity"></i>
            </div>
            <p class="text-sm text-muted line-clamp-3 mb-4 leading-relaxed">${note.content}</p>
            <div class="mt-auto pt-4 border-t border-divider flex justify-between items-center">
                <span class="text-xs text-muted font-medium bg-surface-pearl px-2 py-1 rounded-md max-w-[50%] truncate">${note.topic || 'General'}</span>
                <span class="text-xs text-muted opacity-60">${new Date(note.timestamp).toLocaleDateString()}</span>
            </div>
        `;
        card.addEventListener('click', () => openNoteViewer(key));
        grid.appendChild(card);
    });
};

// Initialize initial view
if (state.selectedDifficulty && state.selectedCategory) {
    showAppMode(state.selectedCategory);
} else if (state.selectedDifficulty) {
    showTopicsScreen(state.selectedDifficulty);
} else {
    showDifficultyScreen();
}
});
