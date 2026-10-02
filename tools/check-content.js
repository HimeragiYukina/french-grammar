const fs=require('fs'),assert=require('assert/strict');
const page=require('./load-page').loadPage();
const ids=page.GRAMMAR.map(g=>g.id);assert.equal(ids.length,97);assert.equal(new Set(ids).size,97);
assert.deepEqual(Object.keys(page.EXPANSIONS).sort(),[...ids].sort());
let sections=0,examples=0,addedPractice=0;
for(const g of page.GRAMMAR){
 const x=page.EXPANSIONS[g.id];assert(page.PRACTICE[g.id]?.length,g.id);
 for(const s of x.sections){sections++;assert(s.title&&s.explanation&&s.examples.length>=2,g.id);for(const e of s.examples){examples++;assert(e.fr&&e.zh&&e.use,g.id);assert(!/[\u4e00-\u9fff\ufffd]/u.test(e.fr),g.id);}}
 for(const p of x.practice||[]){addedPractice++;assert(p.q&&p.a&&p.note,g.id);}
 const card=page.cardHTML(g);assert(card.includes('详细讲解')&&card.includes('例外与适用边界'),g.id);
 assert.equal((card.match(/class="tts"/g)||[]).length,2+g.ex.length+x.sections.reduce((n,s)=>n+s.examples.length,0)+page.PRACTICE[g.id].length+(x.practice||[]).length,g.id);
 page.setQuery(x.sections[0].examples[0].fr.toLowerCase());assert(page.matches(g));assert(page.cardHTML(g).includes('class="in-depth" open'));page.setQuery('');
 for(const id of x.related||[])assert(ids.includes(id),'Missing related grammar '+id);
}
for(const c of page.CONTEXTS){assert(c.title&&c.sentences.length&&c.practice.length,c.id);assert(!ids.includes(c.id));assert(c.sources.length);for(const p of c.practice)assert(p.q&&p.a&&p.note,c.id);for(const ref of c.sources)assert(/^https:\/\//.test(ref.url),c.id);for(const s of c.sentences)assert(s.fr&&s.zh&&s.why&&s.alternative,c.id);for(const id of c.related)assert(ids.includes(id),id);assert(page.contextHTML(c).includes('class="reveal"'));}
for(const file of ['index','a1','a2','b1','b2','c1','c2']){
 const html=fs.readFileSync(file+'.html','utf8');assert(!html.includes('@@'));assert(html.includes('assets/app.js'));
 const scripts=[...html.matchAll(/src="data\/([^\"]+)"/g)].map(m=>m[1]);assert.deepEqual(scripts,file==='index'?['titles.js']:['titles.js',file+'.js']);
 for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){const p=m[1].split('#')[0];if(!/^(https?:|data:)/.test(p))assert(fs.existsSync(p),p);}
 assert(!html.includes('\ufffd'));
}
for(const level of ['A1','A2','B1','B2','C1','C2']){page.setLevel(level);assert(page.GRAMMAR.filter(page.matches).every(g=>g.level===level));}
module.exports=page;
console.log(JSON.stringify({points:97,originalExamples:page.GRAMMAR.reduce((n,g)=>n+g.ex.length,0),originalPractice:Object.values(page.PRACTICE).reduce((n,p)=>n+p.length,0),sections,examples,addedPractice,contexts:page.CONTEXTS.length,checks:'runtime, coverage, examples, exercises, related links, seven pages, on-demand bundles, search and speech buttons'},null,2));
