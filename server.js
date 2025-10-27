const express = require('express');
const path = require('path');
const app = express();

const publishDir = process.env.PUBLISH_DIR || 'www'; // change if your build outputs to a different folder
const publishPath = path.join(__dirname, publishDir);

// serve static files (hashed assets)
app.use(express.static(publishPath, { index: false }));

// SPA fallback: return index.html for any non-static route (no redirect)
app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
  res.sendFile(path.join(publishPath, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));