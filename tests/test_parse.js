const defaultState = {
    progress: {},
    selectedDifficulty: null,
    selectedCategory: null,
    customCollections: {},
    geminiApiKey: null,
    needReview: {},
    notes: {}
};

let stored = '{"progress":{},"selectedDifficulty":null,"selectedCategory":null,"customCollections":{"id1":{"title":"Test"}},"geminiApiKey":"testkey","needReview":{},"notes":{}}';

let state;
try {
    if (stored) {
        state = JSON.parse(stored);
        if (!state || typeof state !== 'object' || Array.isArray(state)) {
            state = { ...defaultState };
        } else {
            state = { ...defaultState, ...state };
            if (typeof state.customCollections !== 'object' || Array.isArray(state.customCollections)) {
                state.customCollections = {};
            }
        }
    }
} catch (e) {
    console.error(e);
}
console.log(state);
