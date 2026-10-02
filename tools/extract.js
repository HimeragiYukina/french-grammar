// Extract the exact texts used by all seven pages and shared speech logic.
const fs=require('fs'),page=require('./load-page').loadPage();
const strings=new Set(),add=s=>{if(s){const t=String(s).replace(/<[^>]+>/g,'');if(t.trim())strings.add(t);}};
page.GRAMMAR.forEach(g=>{add(g.title);add(g.fr);g.ex.forEach(e=>add(e.fr));});
Object.values(page.PRACTICE).forEach(ps=>ps.forEach(p=>add(p.a)));
Object.values(page.EXPANSIONS).forEach(x=>{x.sections.forEach(s=>s.examples.forEach(e=>add(e.fr)));(x.practice||[]).forEach(p=>add(p.a));});
page.CONTEXTS.forEach(c=>{add(c.sentences.map(s=>s.fr).join(' '));c.sentences.forEach(s=>add(s.fr));c.practice.forEach(p=>add(p.a));});
const app=fs.readFileSync('assets/app.js','utf8');const voiceSample=app.match(/speak\('(Bonjour[^']+)'/);if(voiceSample)add(voiceSample[1]);
fs.writeFileSync(process.argv[3]||'tools/strings.json',JSON.stringify([...strings]));console.log('points:',page.GRAMMAR.length,'| unique strings:',strings.size);
