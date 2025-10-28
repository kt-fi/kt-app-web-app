const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();
const publishDir = process.env.PUBLISH_DIR || 'www';
const publishPath = path.join(__dirname, publishDir);

// History fallback rewrites non-file requests to /index.html (safe for SPAs)
app.use(history({
  index: '/index.html',
  disableDotRule: true // allow URLs containing dots
}));

// Serve static files (hashed assets)
app.use(express.static(publishPath, { index: false }));

// Optional health route so you can verify server is running
app.get('/_health', (req, res) => res.send('ok'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));