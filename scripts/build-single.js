/**
 * Folds the Vite build into one self-contained HTML file that can be opened
 * by double-clicking it.
 *
 * Why this is needed: an external <script type="module"> cannot load over
 * file://. The browser treats the page's origin as null and blocks the fetch
 * by CORS, so the app never boots. Inlining sidesteps it entirely, because an
 * inline module is never fetched. Relative paths alone do not fix this.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIST = resolve('dist');
// Checked in under docs/ so it can be downloaded straight from the repo.
const OUT_NAME = 'docs/index.html';
const OUT_DIR = resolve('docs');
const OUT = join(OUT_DIR, 'index.html');

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('No dist/index.html found - run `npm run build` first.');
  process.exit(1);
}

let html = readFileSync(join(DIST, 'index.html'), 'utf8');
let inlined = 0;

/** Resolve a build-relative URL to a file on disk, ignoring remote URLs. */
function localAsset(url) {
  if (/^[a-z]+:\/\//i.test(url) || url.startsWith('//') || url.startsWith('data:')) {
    return null;
  }
  const path = join(DIST, url.replace(/^\.?\//, ''));
  return existsSync(path) ? path : null;
}

// Stylesheets.
html = html.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/gi, (tag) => {
  const match = tag.match(/href="([^"]+)"/);
  const file = match && localAsset(match[1]);
  if (!file) return tag;
  inlined += 1;
  const css = readFileSync(file, 'utf8').replace(/<\/style>/gi, '<\\/style>');
  return `<style>${css}</style>`;
});

// Scripts.
html = html.replace(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/gi, (tag, src) => {
  const file = localAsset(src);
  if (!file) return tag;
  inlined += 1;
  const isModule = /type="module"/i.test(tag);
  // A literal </script> can only appear inside a string, comment or regex,
  // where the escaped form means the same thing - so this is safe.
  const js = readFileSync(file, 'utf8').replace(/<\/script>/gi, '<\\/script>');
  return `<script${isModule ? ' type="module"' : ''}>${js}</script>`;
});

// Favicon, so the finished file has no siblings at all.
html = html.replace(/<link\b[^>]*rel="icon"[^>]*>/gi, (tag) => {
  const match = tag.match(/href="([^"]+)"/);
  const file = match && localAsset(match[1]);
  if (!file) return tag;
  inlined += 1;
  const data = readFileSync(file).toString('base64');
  return `<link rel="icon" href="data:image/x-icon;base64,${data}">`;
});

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT, html);

const size = Math.round(Buffer.byteLength(html) / 1024);
console.log(`inlined ${inlined} asset(s)`);
console.log(`${OUT_NAME}  ${size} kB`);

// Anything still loaded from disk would break as soon as the file is moved,
// which defeats the point - so fail loudly rather than ship a broken file.
const external = [...html.matchAll(/(?:src|href)="(?!data:|https?:|#|mailto:)([^"]+)"/gi)]
  .map((m) => m[1]);

if (external.length) {
  console.error(`\nERROR: still references files outside the HTML: ${external.join(', ')}`);
  console.error('The standalone build would break when moved.');
  process.exit(1);
}
