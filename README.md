<div align="center">
  <img src="https://github.com/vedp9/ai-flashcards-hub/blob/main/favicon.png?raw=true" width="100" alt="AI Flashcards Hub Logo">
  <h1>AI Flashcards Hub</h1>
  <p>An open-source AI-powered flashcard platform that turns your learning material into Easy, Medium, and Hard flashcards.</p>

  <p>
    <a href="https://vedp9.github.io/ai-flashcards-hub/"><strong>Live Application »</strong></a>
  </p>
</div>

<hr/>

## 🚀 Updates Since Last Release

### Product & Layout UX
- **Bulletproof Responsive Layout:** Transitioned to a native `100dvh` container with a flex-grow scrollable core, fully eliminating mobile layout cut-off issues caused by artificial flex centering. The app now scrolls completely naturally while preserving static headers.
- **Snappy Visual Polish:** Removed visible desktop scrollbars for a premium, native-app feel. Accelerated scroll-reveal animations (from 0.8s to 0.4s) across the app and Glossary to eliminate "empty" waiting sensations.
- **Quick Customize Shortcut:** Added a minimal magic wand quick-link directly in the top mobile navbar for instant access to custom flashcard generation.

### Touch Mechanics & Interactions
- **Unified Pointer Engine:** Completely overhauled gesture mechanics from legacy `touchstart/touchmove` to modern unified `PointerEvents`. This completely eliminates scroll freezing and phantom swipe conflicts across all mobile and desktop devices.
- **Action Button Clarity:** Replaced confusing swipe animations on the "Need Review" and "Got It" buttons with a crisp, distinct "scale-down-and-fade" animation to clearly separate manual button clicks from physical touch swipe gestures.

### Learning Experience
- **Instant "Need Review" Queue:** Removed the restrictive 24-hour spaced repetition delay. Cards marked as "Need Review" are now instantly accessible inside a prioritized, top-level queue in your Profile.
- **Dynamic Loading Experience:** Added a curated, high-quality rotating quote system during custom flashcard generation to improve the loading experience.

### Customized Flashcards
- **Strict Source Grounding:** Upgraded the Gemini extraction prompt to strictly prioritize source fidelity and factual accuracy. The AI will now skip extracting concepts that lack sufficient definition in the source text instead of hallucinating outside knowledge.
- **Collection Management:** Added the ability to permanently delete custom-generated collections, which automatically scrubs local storage and associated review schedules.
- **API Resilience:** Implemented exponential backoff and fallback logic to gracefully handle Google Gemini API rate limits or high-demand model errors.

### Personalization & Review
- **My Notes:** Introduced a lightweight, local-first note-taking system in the Profile view. Users can save personal thoughts, organize them by topic, and natively share/export them.

### Open Source / Documentation
- **Testing Guidelines:** Added `TESTING.md` to establish manual verification guidelines for testing the source-grounded accuracy of customized flashcards.

## ✨ Features

- **Apple-Inspired Design & Mobile-First UX:** Beautiful, minimalist, responsive interface with smooth animations. The mobile layout features an accessible top-right menu, safe-area alignments, and robust text-wrapping, paired with seamlessly saved Light & Dark modes.
- **Source-Grounded AI Generation:** Upload any PDF, HTML, or TXT file and let Gemini extract the text to build categorized flashcards. The AI strictly prioritizes source fidelity—extracting meaningful concepts and scenarios directly from your material without hallucinating outside knowledge. Enjoy curated learning quotes during the dynamic loading process!
- **Bring-Your-Own-Key (BYOK):** Users provide their own Gemini API key, which is stored locally in the browser. The client communicates directly with Gemini rather than using an AI Flashcards Hub backend. Includes exponential backoff and retry resilience.
- **Structured Learning:** Flashcards are automatically grouped into Easy / Medium / Hard difficulty levels, and organized by inferred Topics and Subtopics.
- **Local Library & Profile:** All custom flashcard collections (metadata and extracted text) are stored entirely locally on your device via `localStorage`. The original uploaded binary files are *not* permanently saved. You can permanently delete custom collections at any time to scrub your local data.
- **Spaced Repetition (Need Review):** Mark cards for review to have them resurface on a deterministic 1-day/3-day spaced schedule, or mark them as "Got It" to master them.
- **Interactive Study Tools:** Edit cards on the fly, search the glossary, and receive personalized recommendations.
- **Personal Notes:** A local-first note-taking system built right into your Profile to save thoughts, organize by topic, and natively share or export them.

## 🎯 Why this project?

AI Flashcards Hub exists to democratize learning and exploration of AI concepts without the overhead of backend infrastructure, databases, or subscriptions. We wanted to create a platform where anyone can transform their learning material into study tools entirely within the browser, while retaining full control of their data and API keys.

## 🚀 Live Demo



## 🛠️ Tech Stack

- **Frontend:** Pure HTML5, Vanilla JavaScript, and Tailwind CSS (via CDN).
- **Icons:** Phosphor Icons.
- **PDF Extraction:** PDF.js (Client-side).
- **AI Integration:** Google Gemini API (`gemini-3.6-flash`).

## 🏃 Getting Started

Because this application is a completely static frontend, it is incredibly simple to run locally! No Node.js build steps or complex environments are required.

1. **Clone the repository**
   ```bash
   git clone https://github.com/vedp9/ai-flashcards-hub.git
   cd ai-flashcards-hub
   ```

2. **Serve the folder**
   You can use any local web server to run the project. If you have Python installed:
   ```bash
   python3 -m http.server 8080
   ```
   Or using Node's `serve`:
   ```bash
   npx serve .
   ```

3. **Open the App**
   Open your browser and navigate to `http://localhost:8080` (or whatever port your server started on).

## 🔑 Environment Variables

**None!** 
This project uses a **Bring Your Own Key** architecture. 
When you click "Generate Flashcards" in the app, a popup will ask for your Google Gemini API key. The key is stored locally in the browser and is used by the client to communicate directly with the Gemini API. It is not sent to an AI Flashcards Hub backend.

> **WARNING:** Because there is no backend, do NOT hardcode your API key into `app.js` or `index.html` before pushing your code. Always use the built-in UI popup to supply your key locally.

## 🤝 Contributing

**We want your contributions!** And you *do not* need to be an expert to help out. 

Is this your first time contributing to open source? **Make it small.** We highly encourage:
- Fixing a typo in this README
- Adding screenshots to the documentation
- Fixing a broken link
- Improving accessibility labels
- Tweaking CSS spacing

Please read our [Contributing Guidelines](CONTRIBUTING.md) to see how simple it is to get started. By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## 🗺️ Roadmap

- [x] Basic AI curriculum (Easy, Medium, Hard)
- [x] Bring Your Own Key generation
- [x] PDF / HTML / TXT file upload extraction
- [x] Apple-inspired Light/Dark UI
- [ ] Add more supported file formats (e.g. DOCX)
- [ ] Import/Export custom collections as JSON/CSV
- [ ] Community flashcard collection sharing
- [ ] Accessibility improvements (aria labels, keyboard navigation)
- [ ] Automated testing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses
This project uses the following third-party libraries:
- [Tailwind CSS](https://tailwindcss.com/) (MIT License)
- [Phosphor Icons](https://phosphoricons.com/) (MIT License)
- [PDF.js](https://mozilla.github.io/pdf.js/) (Apache License 2.0)

## ❤️ Contributors

We welcome contributors! Whether you're fixing a typo, improving documentation, polishing the UI, or building a new feature, every contribution helps make AI Flashcards Hub better. Start small, learn along the way, and build with us.
