const defaultState = { progress: {}, selectedDifficulty: null, selectedCategory: null, customCollections: {}, geminiApiKey: null, needReview: {}, notes: {} };
let state = { ...defaultState };
state.customCollections['custom_123'] = { id: 'custom_123', title: 'test', date: '1/1/2026', files: [], cards: {} };
let json1 = JSON.stringify(state);
let state2 = JSON.parse(json1);
state2 = { ...defaultState, ...state2 };
if (typeof state2.customCollections !== 'object' || Array.isArray(state2.customCollections)) { state2.customCollections = {}; }
console.log("State 2 Collections:", Object.keys(state2.customCollections));

let state3 = Object.assign({}, defaultState, state2);
console.log("State 3 Collections:", Object.keys(state3.customCollections));

// Test what happens if we overwrite customCollections with defaultState accidentally
let state4 = { ...state2, ...defaultState }; // this would wipe it!
console.log("State 4 Collections (wrong order):", Object.keys(state4.customCollections));
