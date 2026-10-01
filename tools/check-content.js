// Verify full coverage and execute the actual offline page without dependencies.
const fs = require('fs');
const assert = require('assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const script = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)]
  .map(m => m[1]).sort((a,b) => b.length-a.length)[0];
const fake = new Proxy(function(){}, {
  get(t,p){ if(p===Symbol.toPrimitive)return ()=>''; return fake; },
  set(){return true;}, apply(){return fake;}, construct(){return fake;}, has(){return false;}
});
const win = new Proxy({}, {get(t,p){return ['speechSynthesis','AUDIO_MANIFEST'].includes(p)?undefined:fake;},set(){return true;},has(){return false;}});
const run = new Function('document','window','localStorage','navigator','speechSynthesis','Audio',
  script + '\nreturn {GRAMMAR,PRACTICE,EXPANSIONS,EXPANSION_SOURCES,cardHTML,matches,setQuery(q){query=q;},setLevel(l){activeLevel=l;}};');
const page = run(new Proxy({}, {get(){return fake;}}),win,{getItem(){return null;},setItem(){}},{language:'fr'},undefined,undefined);
const ids = page.GRAMMAR.map(g=>g.id);
assert.equal(ids.length,97);
assert.equal(new Set(ids).size,97);
assert.deepEqual(Object.keys(page.EXPANSIONS).sort(), [...ids].sort());
let sections=0, examples=0;
for(const g of page.GRAMMAR){
  const x=page.EXPANSIONS[g.id];
  assert(page.PRACTICE[g.id]?.length, `Practice lost: ${g.id}`);
  assert(x.sections.length >= 1, g.id);
  for(const s of x.sections){
    sections++;
    assert(s.examples.length>=2,`${g.id}: ${s.title}`);
    for(const e of s.examples){
      examples++;
      assert(e.fr && e.zh && e.use,`${g.id}: incomplete example`);
      assert(!/[\u4e00-\u9fff\ufffd]/u.test(e.fr),`${g.id}: French text damaged`);
    }
  }
  const card=page.cardHTML(g);
  assert(card.includes('详细讲解') && card.includes('例外与适用边界'),g.id);
  assert.equal((card.match(/class="tts"/g)||[]).length,2+(g.ex||[]).length+x.sections.reduce((n,s)=>n+s.examples.length,0)+page.PRACTICE[g.id].length,`${g.id}: speech buttons`);
  page.setQuery(x.sections[0].examples[0].fr.toLowerCase());
  assert(page.matches(g),`${g.id}: supplement not searchable`);
  assert(page.cardHTML(g).includes('class="in-depth" open'),`${g.id}: search details closed`);
  page.setQuery('');
}
for(const [level,sources] of Object.entries(page.EXPANSION_SOURCES)){
  assert(sources.length,level);
  for(const s of sources)assert(/^https:\/\//.test(s.url) && s.title,level);
  page.setLevel(level);
  assert(page.GRAMMAR.filter(page.matches).every(g=>g.level===level));
}
for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
  const link=m[1];
  if(!/^(https?:|data:|\$\{)/.test(link))assert(fs.existsSync(link),`Missing local dependency: ${link}`);
}
assert(!html.includes('\ufffd'),'Invalid Unicode replacement character');
if(fs.existsSync('tools/audit-summary.json')){
  const audit=JSON.parse(fs.readFileSync('tools/audit-summary.json','utf8'));
  assert.deepEqual(audit.coverage.map(x=>x.id).sort(),[...ids].sort(),'Audit record coverage');
  for(const row of audit.coverage){
    const g=page.GRAMMAR.find(g=>g.id===row.id),x=page.EXPANSIONS[row.id];
    assert.equal(row.original_examples,g.ex.length,row.id);
    assert.equal(row.practice_items,page.PRACTICE[row.id].length,row.id);
    assert.equal(row.expansion_sections,x.sections.length,row.id);
    assert.equal(row.expansion_examples,x.sections.reduce((n,s)=>n+s.examples.length,0),row.id);
    assert.equal(row.status,'reviewed',row.id);
  }
}
module.exports={GRAMMAR:page.GRAMMAR,PRACTICE:page.PRACTICE,EXPANSIONS:page.EXPANSIONS};
console.log(JSON.stringify({points:ids.length,sections,examples,levels:Object.fromEntries(['A1','A2','B1','B2','C1','C2'].map(l=>[l,page.GRAMMAR.filter(g=>g.level===l).length])),checks:'coverage, runtime, practice, speech, search, filters, local links, UTF-8'},null,2));
