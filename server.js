const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.xml': 'text/xml',
  '.txt': 'text/plain',
};

const OUT_DIR = path.join(__dirname, 'out');

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  
  // Remove trailing slash for file resolution, but keep / as index
  if (urlPath === '/') urlPath = '/index.html';
  else if (urlPath.endsWith('/')) urlPath = urlPath.slice(0, -1) + '/index.html';
  else {
    // Try exact path first, then with .html, then as directory
    const exactPath = path.join(OUT_DIR, urlPath);
    if (fs.existsSync(exactPath) && fs.statSync(exactPath).isFile()) {
      // serve as-is
    } else if (fs.existsSync(exactPath + '.html')) {
      urlPath = urlPath + '.html';
    } else if (fs.existsSync(path.join(exactPath, 'index.html'))) {
      urlPath = urlPath + '/index.html';
    }
  }

  const filePath = path.join(OUT_DIR, urlPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      });
      res.end(data);
    }
  });
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Static server running on http://0.0.0.0:3000');
});
