// Usage: node scripts/screenshots.js <base-url | built-site-dir> <output-dir>
// Captures the pages below at phone and desktop widths. Run through scripts/screenshots.sh.
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PAGES = {
  home: '/',
  'lesson-short': '/posts/Musical-Words-Able.html',
  'lesson-long': '/posts/adjective-part-1.html',
  'lesson-odia': '/posts/Shabda-Ganga-1.html',
};
const VIEWPORTS = {
  phone: { width: 360, height: 740 },
  desktop: { width: 1280, height: 900 },
};
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.xml': 'application/xml', '.pdf': 'application/pdf' };

function serve(dir) {
  const root = path.resolve(dir);
  const server = http.createServer((req, res) => {
    let file = path.join(root, decodeURIComponent(req.url.split('?')[0]));
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, () => resolve(server)));
}

(async () => {
  const [target, out] = process.argv.slice(2);
  if (!target || !out) { console.error('usage: screenshots.js <base-url|dir> <output-dir>'); process.exit(2); }
  fs.mkdirSync(out, { recursive: true });

  let base = target.replace(/\/$/, '');
  let server;
  if (!/^https?:/.test(target)) {
    server = await serve(target);
    base = `http://localhost:${server.address().port}`;
  }

  const browser = await chromium.launch();
  let failed = false;
  for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
    const page = await browser.newPage({ viewport });
    for (const [name, url] of Object.entries(PAGES)) {
      const res = await page.goto(base + url, { waitUntil: 'load', timeout: 60000 });
      await page.waitForTimeout(1000);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const file = path.join(out, `${name}-${vpName}.png`);
      await page.screenshot({ path: file });
      console.log(`${file}  status=${res.status()}  horizontal-overflow=${overflow}px`);
      if (res.status() !== 200) failed = true;
    }
    await page.close();
  }
  await browser.close();
  if (server) server.close();
  process.exit(failed ? 1 : 0);
})();
