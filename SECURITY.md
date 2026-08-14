# Security Policy

## Supported Versions

Currently, the `main` branch of AI Flashcards Hub is the only supported version. If you are experiencing issues, please ensure you have pulled the latest code.

## Reporting a Vulnerability

Because this application interacts with third-party AI APIs (like Google Gemini) and handles user-uploaded documents (like PDFs), security is important to us.

**Do not publicly disclose sensitive vulnerabilities before they are addressed.**

If you discover a security vulnerability within this project, please follow these steps:
1. Do **not** open a public GitHub issue.
2. Instead, use the "Security" tab on the GitHub repository page and click **"Report a vulnerability"** to send a private advisory to the repository maintainers.
3. If that feature is unavailable, please open a standard GitHub issue requesting a private channel to share a security concern, and a maintainer will contact you.

We will endeavor to respond to your report as quickly as possible.

## API Key Security Reminder

As a contributor, **never submit your API keys or secrets** in Issues, Pull Requests, or commits. 
The application is designed as a Bring-Your-Own-Key (BYOK) system. Your API key should only be entered into the browser's UI popup, and should never be saved into files like `app.js`, `index.html`, or `.env`.
