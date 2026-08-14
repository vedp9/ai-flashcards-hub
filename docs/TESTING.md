# Manual Testing & Verification Plan

## Customized Flashcard Verification

When testing the customized flashcard generation (via PDF, HTML, HTM, or TXT uploads), all reviewers must manually test the generated cards against the original uploaded source material. 

### Verification Checklist for Source-Grounded Accuracy

For each generated flashcard, verify the following:
1. **Source Support:** The concept is actually supported by and explained in the source material.
2. **Definition Accuracy:** The simple definition strictly matches the source and does not introduce unsupported technical facts.
3. **Scenario Validity:** The real-world scenario correctly illustrates the source-supported concept.
4. **No Hallucinations:** No unsupported factual claims or external domain knowledge have been introduced into the definition or the scenario.
5. **No Shallow Cards:** Cards are not generated from terms that are only briefly mentioned without meaningful explanation in the text.

### Testing Matrix
- Test with a short document (1-2 pages) containing clear definitions.
- Test with a dense technical document (e.g., API documentation) to ensure it extracts concepts without hallucinating features.
- Test with a non-technical document to verify it handles general knowledge without enforcing programming metaphors.
- Test with a document that briefly mentions buzzwords to verify it skips generating shallow cards for them.
