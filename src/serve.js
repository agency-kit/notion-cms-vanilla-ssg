import fs from 'fs';
import http from 'http';
import path from 'path';

const outputFolder = process.argv[2] || './dist'; // Use the provided folder path or default to './dist'

const server = http.createServer((req, res) => {
  const filePath = path.join(outputFolder, req.url === '/' ? '/index.html' : req.url + '/index.html');
  console.log(req.method, ':', filePath);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Page not found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf8');
    }
  });
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
