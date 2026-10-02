// Load the same browser bundles and shared runtime without a browser dependency.
const fs=require('fs'),vm=require('vm');
const fake=new Proxy(function(){},{get(t,p){if(p===Symbol.toPrimitive)return ()=>'';return fake;},set(){return true;},apply(){return fake;},construct(){return fake;},has(){return false;}});
function loadPage(level='ALL'){
 const data={};const context={window:{GRAMMAR_DATA:data}};
 for(const l of ['a1','a2','b1','b2','c1','c2'])vm.runInNewContext(fs.readFileSync('data/'+l+'.js','utf8'),context);
 const win=new Proxy({GRAMMAR_TEST:true,GRAMMAR_DATA:data},{get(t,p){if(p in t)return t[p];if(['speechSynthesis','AUDIO_MANIFEST'].includes(p))return undefined;return fake;},has(){return false;}});
 const doc=new Proxy({body:{dataset:{level}}},{get(t,p){return p in t?t[p]:fake;}});
 const script=fs.readFileSync('assets/app.js','utf8');
 const run=new Function('document','window','localStorage','navigator','speechSynthesis','Audio',script+'\nLEVELS.forEach(mergeLevel);return {GRAMMAR,PRACTICE,EXPANSIONS,EXPANSION_SOURCES,CONTEXTS,cardHTML,contextHTML,matches,setQuery(q){query=q;},setLevel(l){activeLevel=l;}};');
 return run(doc,win,{getItem(){return null;},setItem(){}},{language:'fr'},undefined,undefined);
}
module.exports={loadPage};
