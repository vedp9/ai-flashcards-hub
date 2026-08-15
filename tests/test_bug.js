const fs = require('fs');

class MockStorage {
    constructor() { this.store = {}; }
    getItem(key) { return this.store[key] || null; }
    setItem(key, value) { this.store[key] = String(value); }
    removeItem(key) { delete this.store[key]; }
    clear() { this.store = {}; }
}

const runLifecycle = () => {
    let localStorage = new MockStorage();
    
    const STATE_KEY = 'ai_flashcard_state_v3';
    
    // Simulate App Load 1
    const defaultState = {
        progress: {}, selectedDifficulty: null, selectedCategory: null,
        customCollections: {}, geminiApiKey: null, needReview: {}, notes: {}
    };
    
    let state = { ...defaultState };
    
    const saveState = () => {
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
    };

    // User adds API key
    state.geminiApiKey = "test_key";
    saveState();

    // User generates flashcards
    state.customCollections["col1"] = { title: "Test", cards: { easy: [{q:"a", a:"b"}], medium: [], hard: [] } };
    saveState();

    // Verify
    let raw = localStorage.getItem(STATE_KEY);
    console.log("Before close:", JSON.parse(raw));

    // Simulate browser close & reopen
    // (localStorage persists)
    
    // Simulate App Load 2
    let state2;
    try {
        const stored = localStorage.getItem(STATE_KEY);
        if (stored) {
            state2 = JSON.parse(stored);
            if (!state2 || typeof state2 !== 'object' || Array.isArray(state2)) {
                state2 = { ...defaultState };
            } else {
                state2 = { ...defaultState, ...state2 };
                if (typeof state2.customCollections !== 'object' || Array.isArray(state2.customCollections)) {
                    state2.customCollections = {};
                }
                if (typeof state2.progress !== 'object' || Array.isArray(state2.progress)) {
                    state2.progress = {};
                }
            }
        } else {
            state2 = { ...defaultState };
        }
    } catch (e) {
        state2 = { ...defaultState };
    }
    
    console.log("After reopen:", state2);
    
    // Simulate showDifficultyScreen
    state2.selectedDifficulty = null;
    state2.selectedCategory = null;
    localStorage.setItem(STATE_KEY, JSON.stringify(state2));
    
    console.log("After showDifficultyScreen:", JSON.parse(localStorage.getItem(STATE_KEY)));
}

runLifecycle();
