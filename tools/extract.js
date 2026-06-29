// Extract every unique tag-stripped French string the grammar page can speak.
// Runs the page's own <script> under a universal fake DOM so we use the exact
// same data (GRAMMAR + PRACTICE) and the exact same stripTags() the page uses.
//
// Usage (from the repo root, where index.html lives):
//   node tools/extract.js index.html tools/strings.json
const fs = require('fs');
const html = fs.readFileSync(process.argv[2], 'utf8');

// Pick the largest inline <script> (no src) block — that's the app/data script.
const blocks = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
if (!blocks.length) { console.error('no inline <script> found'); process.exit(1); }
const script = blocks.sort((a, b) => b.length - a.length)[0];

// Universal no-op proxy: any property access or call returns itself.
const fake = new Proxy(function () {}, {
  get(_t, p) { if (p === Symbol.toPrimitive) return () => ''; return fake; },
  set() { return true; },
  apply() { return fake; },
  construct() { return fake; },
  has() { return false; },
});
const documentStub = new Proxy({}, { get() { return fake; } });
const windowStub = new Proxy({}, {
  get(_t, p) { if (p === 'speechSynthesis' || p === 'AUDIO_MANIFEST') return undefined; return fake; },
  set() { return true; },
  has() { return false; },
});
const localStorageStub = { getItem() { return null; }, setItem() {}, removeItem() {} };

let GRAMMAR = null, PRACTICE = null;
try {
  const fn = new Function('document', 'window', 'localStorage', 'navigator', 'speechSynthesis', 'Audio',
    script + '\n;return {G: typeof GRAMMAR!=="undefined"?GRAMMAR:null, P: typeof PRACTICE!=="undefined"?PRACTICE:null};');
  const r = fn(documentStub, windowStub, localStorageStub, { language: 'fr' }, undefined, undefined);
  GRAMMAR = r.G; PRACTICE = r.P;
} catch (e) { console.error('RUN ERROR', e); process.exit(1); }

if (!Array.isArray(GRAMMAR)) { console.error('GRAMMAR not found'); process.exit(1); }

const strip = s => String(s).replace(/<[^>]+>/g, ''); // identical to page's stripTags()
const set = new Set();
const add = s => { if (s == null) return; const t = strip(s); if (t.trim()) set.add(t); };

GRAMMAR.forEach(g => { add(g.title); add(g.fr); (g.ex || []).forEach(e => add(e.fr)); });
Object.values(PRACTICE || {}).forEach(arr => (arr || []).forEach(p => add(p.a)));
add('Bonjour ! Ceci est un exemple de prononciation française.'); // voiceTest sample

const out = [...set];
fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 0));
console.log('points:', GRAMMAR.length, '| unique strings:', out.length);
