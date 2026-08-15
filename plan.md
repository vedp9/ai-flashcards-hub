# Persistence Investigation Plan

## Goal
Investigate and resolve the critical persistence issue where custom collections and API keys disappear after a full browser restart on the live HTTPS GitHub Pages site.

## Analysis of the 12 Requested Items
1. **Where customCollections are written:** `saveState()` is called immediately after `state.customCollections[collectionId] = collection` in the generation logic.
2. **Where the API key is written:** `saveState()` is called immediately after `state.geminiApiKey = key`.
3. **Startup code overwrite:** On `DOMContentLoaded`, `app.js` reads `localStorage.getItem(STATE_KEY)`, parses it, and deeply merges it with `defaultState`. It does not forcefully overwrite existing keys.
4. **defaultState writing:** `defaultState` is written ONLY if `localStorage` returns `null` or if `JSON.parse()` throws an error (caught in the `catch` block), which is then saved to disk by `showDifficultyScreen()`.
5. **Clear/reset functions:** There is a reset button, but it only clears `progress` and `needReview`, not `customCollections` or `geminiApiKey`.
6. **Dynamic keys:** The key is a hardcoded constant: `ai_flashcard_state_v3`.
7. **Reading from the same key:** Yes, initialization and `saveState` both strictly use `STATE_KEY`.
8. **JSON Serialization:** The custom collections are standard JavaScript objects (arrays and strings). They stringify and parse natively without circular reference errors.
9. **Migration code:** Lines 52-57 migrate `progress` to `needReview`, but this explicitly ignores `customCollections`.
10. **Race conditions:** `saveState()` is fully synchronous.
11. **Lifecycle handlers:** No `unload`, `beforeunload`, `pagehide`, or `visibilitychange` handlers exist in the codebase.
12. **Shared Keys:** Both API key and collections share the same `STATE_KEY` object. If both disappear, the entire object is being cleared or overwritten.

## Proposed Diagnostics
Since standard JavaScript execution cannot natively differentiate between a tab close (which supposedly works) and a full browser restart (which fails) unless relying on `sessionStorage`, we must rule out silent `JSON.parse` failures or unexpected overrides.

I will add diagnostic logging to `app.js` to log exactly what `localStorage` contains at every stage:
1. `[LIFECYCLE: INIT]` Logs the raw string read from `localStorage` on page load.
2. `[LIFECYCLE: PARSE_SUCCESS]` Logs the parsed state object.
3. `[LIFECYCLE: PARSE_ERROR]` Logs any error caught during initialization.
4. `[LIFECYCLE: SAVE]` Logs the JSON string being written to `localStorage`.
5. `[LIFECYCLE: BEFOREUNLOAD]` Logs the raw `localStorage` string immediately before the browser tab or window closes.

## Proposed Fix Approach
While injecting diagnostics, I will implement a safety net for `saveState()`. Currently, `showDifficultyScreen()` (called on every page load) automatically triggers `saveState()`. If `localStorage` fails to initialize properly, this immediately overwrites the corrupted/missing state with `defaultState` permanently. I will add a guard to prevent `saveState()` from executing if the initial load was flagged as a failure.
