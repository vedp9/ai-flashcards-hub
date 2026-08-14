<div align="center">
  <img src="https://github.com/vedp9/ai-flashcards-hub/blob/main/favicon.png?raw=true" width="100" alt="AI Flashcards Hub Logo">
  <h1>AI Flashcards Hub</h1>
  <p>An open-source AI-powered flashcard platform that turns your learning material into Easy, Medium, and Hard flashcards.</p>

  <p>
    <a href="https://vedp9.github.io/ai-flashcards-hub/"><strong>View Live Demo »</strong></a>
  </p>
</div>

<hr/>

## ✨ Features

- **Apple-Inspired Design:** Beautiful, minimalist, responsive interface with smooth animations.
- **AI-Powered Generation:** Upload any PDF, HTML, or TXT file and let Gemini instantly extract the text and build categorized flashcards.
- **Easy / Medium / Hard Categorization:** Built-in curriculum for AI concepts, and smart categorization for custom generated cards.
- **Bring-Your-Own-Key (BYOK):** Users provide their own Gemini API key, which is stored locally in their browser.
- **Local Library:** All custom flashcard collections (metadata and extracted text) are stored locally on your device via `localStorage`. The original uploaded binary files are *not* permanently saved. No database required.
- **Interactive Study Tools:** Edit cards on the fly, take quizzes, and search the glossary.
- **Light & Dark Mode:** Toggle seamlessly between themes that are automatically saved to your preferences.

## 🎯 Why this project?

AI Flashcards Hub exists to democratize learning and exploration of AI concepts without the overhead of backend infrastructure, databases, or subscriptions. We wanted to create a platform where anyone can transform their learning material into study tools entirely within the browser, while retaining full control of their data and API keys.

## 🚀 Live Demo

Check out the live deployed application here:
[**https://vedp9.github.io/ai-flashcards-hub/**](https://vedp9.github.io/ai-flashcards-hub/)

## 📸 Screenshots

*(We are currently looking for contributors to add screenshots of the light and dark themes here! Check out the contributing guidelines below if you'd like to help.)*

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

A massive thank you to everyone who has contributed to this project so far. Whether it was a massive feature or a single typo fix, you make open source incredible!
