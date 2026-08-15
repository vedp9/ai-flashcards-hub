const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const appJs = fs.readFileSync('assets/js/app.js', 'utf8');
console.log("Does index.html have api-key-modal?", html.includes('api-key-modal'));
console.log("Does app.js have showApiKeyModal?", appJs.includes('showApiKeyModal'));
