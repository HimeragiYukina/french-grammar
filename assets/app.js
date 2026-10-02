const PAGE_LEVEL = document.body.dataset.level || 'ALL';
const LEVELS = ['A1','A2','B1','B2','C1','C2'];
const LEVEL_COUNTS = {A1:23,A2:18,B1:15,B2:16,C1:13,C2:12};
let GRAMMAR = [], PRACTICE = {}, EXPANSIONS = {}, EXPANSION_SOURCES = {}, CONTEXTS = [];
const dataLoads = new Map();
function mergeLevel(level){
  const d=window.GRAMMAR_DATA && window.GRAMMAR_DATA[level];
  if(!d)return false;
  if(!GRAMMAR.some(g=>g.level===level))GRAMMAR.push(...d.grammar);
  if(!CONTEXTS.some(c=>c.id.startsWith(level.toLowerCase()+"-")))CONTEXTS.push(...(d.contexts||[]));
  Object.assign(PRACTICE,d.practice);Object.assign(EXPANSIONS,d.expansions);
  EXPANSION_SOURCES[level]=d.sources;return true;
}
function loadLevel(level){
  if(mergeLevel(level))return Promise.resolve();
  if(dataLoads.has(level))return dataLoads.get(level);
  const task=new Promise((resolve,reject)=>{
    const s=document.createElement('script');s.src='data/'+level.toLowerCase()+'.js';
    s.onload=()=>mergeLevel(level)?resolve():reject(new Error('缺少级别数据：'+level));
    s.onerror=()=>reject(new Error('无法加载 '+level+'；请检查本地文件或网络。'));
    document.head.appendChild(s);
  }).catch(e=>{dataLoads.delete(level);throw e;});
  dataLoads.set(level,task);return task;
}
function pointURL(id){return id.slice(0,2)+'.html#'+encodeURIComponent(id);}
function routeHash(){
  const id=decodeURIComponent(location.hash.slice(1));
  const level=id.slice(0,2).toUpperCase();
  if(LEVELS.includes(level)&&level!==PAGE_LEVEL){location.replace(pointURL(id));return true;}
  const el=document.getElementById(id);if(el)el.scrollIntoView({block:'start'});
  return false;
}


/* ===================== 渲染 ===================== */
const $ = s => document.querySelector(s);
const content = $("#content"), sidebar = $("#sidebar");
let activeLevel = PAGE_LEVEL, query = "";
let searchGeneration=0;

function escAttr(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function stripTags(s){return String(s).replace(/<[^>]+>/g,'');}
function tts(fr){const t=stripTags(fr);return t?`<button class="tts" data-tts="${escAttr(t)}" title="朗读法语 / Écouter">🔊</button>`:"";}
// titleFr is "français · 中文" for some entries but Chinese-only for others; g.title always holds the French
function fullTitle(g){return /[一-鿿]/.test(g.titleFr.split(" · ")[0]) ? `${g.title} · ${g.titleFr}` : g.titleFr;}
function exerciseHTML(items,label='练习 · Exercices'){
  if(!items?.length)return '';
  return `<div class="practice"><div class="label">${label}</div><ol class="qs">${items.map(p=>`<li><div class="q">${p.q} <button class="reveal">显示答案 / Réponse</button></div><div class="a hidden">✓ ${p.a} ${tts(p.a)}${p.note?` <span class="anote">${p.note}</span>`:''}</div></li>`).join('')}</ol></div>`;
}
function relatedHTML(ids){return (ids||[]).length?`<p class="related">相关语法：${ids.map(id=>{const g=GRAMMAR.find(g=>g.id===id);return `<a href="${pointURL(id)}">${g?fullTitle(g):(window.GRAMMAR_TITLES[id]||id)}</a>`;}).join(' · ')}</p>`:'';}
function contextHTML(c){
  return `<article class="context-card" id="${c.id}"><h3>${c.title}</h3>${relatedHTML(c.related)}<div class="fr passage">${tts(c.sentences.map(s=>s.fr).join(' '))} ${c.sentences.map(s=>s.fr).join(' ')}</div><details><summary>逐句理解 · 为什么这样说</summary>${c.sentences.map(s=>`<section class="usage-section"><div class="fr">${tts(s.fr)} ${s.fr}</div><div class="zh">${s.zh}</div><p><strong>为什么这样说：</strong>${s.why}</p><p><strong>换一种表达：</strong>${s.alternative}</p></section>`).join('')}</details>${exerciseHTML(c.practice,'语境练习 · Mise en pratique')}<details class="source-notes"><summary>参考资料</summary><ul>${(c.sources||[]).map(s=>`<li><a href="${escAttr(s.url)}" target="_blank" rel="noopener noreferrer">${s.title}</a></li>`).join('')}</ul></details></article>`;
}
function expansionHTML(g){
  const x = EXPANSIONS[g.id];
  if(!x) return "";
  const sections = x.sections.map(s=>`<section class="usage-section"><h4>${s.title}</h4><div class="zh">${s.explanation}</div><ul class="ex">${s.examples.map(e=>`<li><div class="fr">${tts(e.fr)} ${e.fr}</div><div class="zh">${e.zh}</div><div class="use">📌 ${e.use}</div></li>`).join("")}</ul></section>`).join("");
  const sources = (EXPANSION_SOURCES[g.level]||[]).map(s=>`<li><a href="${escAttr(s.url)}" target="_blank" rel="noopener noreferrer">${s.title}</a>${s.notes?` — ${s.notes}`:""}</li>`).join("");
  return `<details class="in-depth"${query?" open":""}><summary>详细讲解 · 用法、比较与纠错</summary>${sections}${relatedHTML(x.related)}${exerciseHTML(x.practice,"实用练习 · Mise en pratique")}<section class="usage-section"><h4>易混形式对比</h4><div class="zh">${x.comparison}</div></section><section class="usage-section"><h4>常见错误与纠正</h4><div class="zh">${x.errors}</div></section><section class="usage-section"><h4>例外与适用边界</h4><div class="zh">${x.boundaries}</div></section><details class="source-notes"><summary>本级讲解核对资料</summary><ul>${sources}</ul></details></details>`;
}

function cardHTML(g){
  const forms = g.forms ? `<div class="forms">${g.forms}</div>` : "";
  const tip = g.tip ? `<div class="tip">${g.tip}</div>` : "";
  const ex = (g.ex||[]).map(e=>`<li><div class="fr">${tts(e.fr)} ${e.fr}</div><div class="zh">${e.zh}</div>${e.use?`<div class="use">📌 ${e.use}</div>`:""}</li>`).join("");
  const pr = (typeof PRACTICE!=="undefined" && PRACTICE[g.id]) || null;
  let practice="";
  if(pr && pr.length){
    const items = pr.map(p=>`<li><div class="q">${p.q} <button class="reveal">显示答案 / Réponse</button></div><div class="a hidden">✓ ${p.a} ${tts(p.a)}${p.note?` <span class="anote">${p.note}</span>`:""}</div></li>`).join("");
    practice = `<div class="practice"><div class="label">练习 · Exercices</div><ol class="qs">${items}</ol></div>`;
  }
  return `<article class="card" id="${g.id}" data-level="${g.level}">
    <h3><span class="ttl"><a class="point-link" href="${pointURL(g.id)}">${fullTitle(g)}</a></span> ${tts(g.title)} <span class="badge ${g.level}">${g.level}</span> <button class="say-all" title="仅朗读本节(标题+讲解+例句) / Lire cette fiche">▶ 整段朗读</button> <button class="say-from" title="从本节起连续朗读全部,可在顶栏暂停/停止 / Lire en continu à partir d'ici">⏩ 从此连读</button></h3>
    <div class="expl">
      <div class="zh">${g.zh}</div>
      <div class="fr">${tts(g.fr)} ${g.fr}</div>
    </div>
    ${forms}
    <div class="label">例句 · Exemples</div>
    <ul class="ex">${ex}</ul>
    ${tip}
    ${expansionHTML(g)}
    ${practice}
  </article>`;
}

function matches(g){
  if(activeLevel!=="ALL" && g.level!==activeLevel) return false;
  if(!query) return true;
  const hay = (g.title+g.titleFr+g.zh+g.fr+g.cat+(g.ex||[]).map(e=>e.fr+e.zh).join("")+JSON.stringify(EXPANSIONS[g.id]||{})).toLowerCase();
  return hay.includes(query);
}

function render(){
  if(!query && PAGE_LEVEL==='ALL'){
    stopSpeak();
    content.innerHTML='<div class="overview-grid">'+LEVELS.map(l=>`<a class="level-link" href="${l.toLowerCase()}.html"><strong>${l}</strong><span>${LEVEL_COUNTS[l]} 个语法点 · 讲解、例句与练习</span></a>`).join('')+'</div>';
    sidebar.innerHTML='<div class="brand">法语语法手册<small>按级别阅读 · 跨级搜索</small></div>'+LEVELS.map(l=>`<a class="navitem" href="${l.toLowerCase()}.html">${l} · ${LEVEL_COUNTS[l]} 点</a>`).join('');
    $('#count').textContent='共 97 个语法点 · 选择级别，或搜索全部级别';
    $('#nores').classList.add('hidden');return;
  }
  if(typeof stopSpeak==='function')stopSpeak();
  const list = GRAMMAR.filter(matches);
  // group by level then cat, preserving order
  let html="", lastCat="";
  const order = {A1:1,A2:2,B1:3,B2:4,C1:5,C2:6};
  list.sort((a,b)=> (order[a.level]-order[b.level]) || 0);
  list.forEach(g=>{
    const key = g.level+" · "+g.cat;
    if(key!==lastCat){ html += `<div class="cathead">${g.level} · ${g.cat} <span style="font-weight:400">/ ${g.catFr}</span></div>`; lastCat=key; }
    html += cardHTML(g);
  });
  const contexts=CONTEXTS.filter(c=>(activeLevel==='ALL'||c.id.startsWith(activeLevel.toLowerCase()+'-'))&&(!query||JSON.stringify(c).toLowerCase().includes(query)));
  if(contexts.length)html+='<h2 id="contexts">语境阅读 · Lire en contexte</h2>'+contexts.map(contextHTML).join('');
  content.innerHTML = html;
  $("#nores").classList.toggle("hidden", list.length>0||contexts.length>0);
  $("#count").textContent = `共 97 个语法点 · ${query?"全站搜索":"当前级别 "+PAGE_LEVEL} · 当前显示 ${list.length} 个语法点、${contexts.length} 个语境`;
  buildSidebar(list);
}

function buildSidebar(list){
  let html = `<div class="brand">法语语法手册<small>Grammaire française · A1–C2</small></div>`;
  let lastLevel="", lastCat="";
  list.forEach(g=>{
    if(g.level!==lastLevel){ html+=`<div class="navlevel">${g.level}</div>`; lastLevel=g.level; lastCat=""; }
    if(g.cat!==lastCat){ html+=`<div class="navcat">${g.cat}</div>`; lastCat=g.cat; }
    html += `<a class="navitem" href="${pointURL(g.id)}" data-id="${g.id}">${fullTitle(g).split(" · ")[0]}</a>`;
  });
  const contexts=CONTEXTS.filter(c=>activeLevel==='ALL'||c.id.startsWith(activeLevel.toLowerCase()+'-'));
  if(contexts.length)html+='<div class="navlevel">语境阅读</div>'+contexts.map(c=>`<a class="navitem" href="${pointURL(c.id)}" data-id="${c.id}">${c.title}</a>`).join('');
  sidebar.innerHTML = html;
  sidebar.querySelectorAll(".navitem").forEach(n=>{
    n.onclick=()=>{
      const el=document.getElementById(n.dataset.id);
      if(el){el.scrollIntoView({behavior:"smooth",block:"start"});
        sidebar.querySelectorAll(".navitem").forEach(x=>x.classList.remove("active"));
        n.classList.add("active");
        closeMenu();}
    };
  });
}

/* ===================== 交互 ===================== */
async function updateSearch(value,writeURL=true){
  const gen=++searchGeneration;query=value.trim().toLowerCase();activeLevel=query?'ALL':PAGE_LEVEL;
  if(writeURL){const u=new URL(location.href);if(value.trim())u.searchParams.set('q',value.trim());else u.searchParams.delete('q');history.replaceState(null,'',u);}
  try{
    $('#pageStatus').textContent=query?'正在搜索全部级别…':'';
    if(query)await Promise.all(LEVELS.map(loadLevel));
    if(gen!==searchGeneration)return;
    render();$('#pageStatus').textContent='';if(location.hash)routeHash();
  }catch(e){if(gen===searchGeneration)$('#pageStatus').textContent=e.message;}
}
$("#search").addEventListener("input",e=>updateSearch(e.target.value));
const themeBtn=$("#themeBtn");
function setTheme(t){ document.documentElement.setAttribute("data-theme",t); try{localStorage.setItem("gr-theme",t);}catch(e){} }
themeBtn.onclick=()=>{ const cur=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark"; setTheme(cur); };
try{ const saved=localStorage.getItem("gr-theme"); if(saved) setTheme(saved); }catch(e){}

/* mobile menu */
const scrim=$("#scrim");
function closeMenu(){ sidebar.classList.remove("open"); scrim.classList.remove("open"); $("#menuToggle").setAttribute("aria-expanded","false"); }
$("#menuToggle").onclick=()=>{ sidebar.classList.toggle("open"); scrim.classList.toggle("open"); $("#menuToggle").setAttribute("aria-expanded",String(sidebar.classList.contains("open"))); };
scrim.onclick=closeMenu;
document.addEventListener('keydown', e=>{
  if(e.key==='Escape')closeMenu();
  if((e.key==='Enter'||e.key===' ') && e.target.matches('[role=button].chip,[role=button].navitem')){
    e.preventDefault();e.target.click();
  }
});

/* ===== TTS(法语朗读:高清神经语音 + 系统语音回退 + 语速调节) =====
   优先播放预生成的高清 mp3(edge-tts,iOS/离线/GitHub Pages 均可用);
   无对应音频或选了系统语音时,回退到浏览器 Web Speech。 */
let frVoice=null, voices=[], rate=0.95, curBtn=null, speakGen=0, speaking=false, paused=false, pendingNext=null;
let useNeural=false, neuralVoice='fr-FR', curAudio=null;
const MAN=(typeof window!=='undefined' && window.AUDIO_MANIFEST) || null;
const audioEl=(typeof Audio!=='undefined') ? new Audio() : null;
if(audioEl){ audioEl.preload='auto'; try{audioEl.preservesPitch=true;audioEl.mozPreservesPitch=true;audioEl.webkitPreservesPitch=true;}catch(e){} }
const voiceSel=document.getElementById('voiceSel'), rateInput=document.getElementById('rate'),
      rateVal=document.getElementById('rateVal'), voiceTest=document.getElementById('voiceTest'),
      ttsPause=document.getElementById('ttsPause'), ttsStop=document.getElementById('ttsStop');
function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function lsSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}
function setVoiceFromValue(val){
  if(val && val.indexOf('neural:')===0){ useNeural=true; neuralVoice=val.slice(7); frVoice=null; }
  else if(val && val.indexOf('sys:')===0){ useNeural=false; const name=val.slice(4); frVoice=voices.find(v=>v.name===name)||null; }
  else { useNeural=false; frVoice=null; }
}
function applyVoiceChoice(saved){
  const opts=[...voiceSel.options].map(o=>o.value);
  let pick=(saved && opts.indexOf(saved)>=0) ? saved : null;
  if(!pick && MAN && MAN.voices && MAN.voices.length) pick='neural:'+(MAN.voices.indexOf('fr-FR')>=0?'fr-FR':MAN.voices[0]);
  if(!pick){ const s=voices.find(v=>/fr[-_]?FR/i.test(v.lang))||voices.find(v=>/^fr/i.test(v.lang)); if(s)pick='sys:'+s.name; }
  if(!pick && opts.length) pick=opts[0];
  if(pick==null)return;
  voiceSel.value=pick; setVoiceFromValue(pick);
}
function loadVoices(){
  voices=(window.speechSynthesis?speechSynthesis.getVoices():[])||[];
  if(!voiceSel)return;
  const prev=voiceSel.value, saved=lsGet('gr-voice');
  const fr=voices.filter(v=>/^fr/i.test(v.lang));
  voiceSel.innerHTML='';
  if(MAN && MAN.voices){ MAN.voices.forEach(code=>{ const o=document.createElement('option'); o.value='neural:'+code; const lb=(MAN.labels&&MAN.labels[code])||''; o.textContent='🔊 '+code+(lb?' · '+lb:'')+' · 高清'; voiceSel.appendChild(o); }); }
  fr.forEach(v=>{ const o=document.createElement('option'); o.value='sys:'+v.name; o.textContent=v.name.replace(/^(Microsoft|Google)\s+/,'')+' · '+v.lang; voiceSel.appendChild(o); });
  if(!voiceSel.options.length){ const o=document.createElement('option'); o.value=''; o.textContent='系统默认 fr-FR / Défaut'; voiceSel.appendChild(o); }
  applyVoiceChoice(prev || saved);
}
loadVoices();
if('speechSynthesis' in window){ try{window.speechSynthesis.onvoiceschanged=loadVoices;}catch(e){} }
if(voiceSel)voiceSel.addEventListener('change',e=>{ setVoiceFromValue(e.target.value); lsSet('gr-voice',e.target.value); });
if(rateInput){
  const sr=parseFloat(lsGet('gr-rate'));
  if(!isNaN(sr)){rate=sr;rateInput.value=sr;}
  if(rateVal)rateVal.textContent=rate.toFixed(2)+'×';
  rateInput.addEventListener('input',e=>{ rate=parseFloat(e.target.value); if(rateVal)rateVal.textContent=rate.toFixed(2)+'×'; lsSet('gr-rate',e.target.value); if(curAudio){try{curAudio.playbackRate=rate;}catch(err){}} });
}
if(voiceTest)voiceTest.addEventListener('click',()=>speak('Bonjour ! Ceci est un exemple de prononciation française.'));
function updateTransport(){
  if(ttsStop)ttsStop.disabled=!speaking;
  if(ttsPause){ttsPause.disabled=!speaking;ttsPause.textContent=paused?'▶':'⏸';ttsPause.title=paused?'继续 / Reprendre':'暂停 / Pause';}
}
function togglePause(){
  if(!speaking)return;
  if(paused){
    paused=false;
    if(curAudio){curAudio.play().catch(function(){});}
    else if('speechSynthesis' in window){try{speechSynthesis.resume();}catch(e){}}
    if(pendingNext){const f=pendingNext;pendingNext=null;f();}
  }else{
    paused=true;
    if(curAudio){try{curAudio.pause();}catch(e){}}
    else if('speechSynthesis' in window){try{speechSynthesis.pause();}catch(e){}}
  }
  updateTransport();
}
if(ttsPause)ttsPause.addEventListener('click',togglePause);
if(ttsStop)ttsStop.addEventListener('click',stopSpeak);
function clearReading(){document.querySelectorAll('.card.reading').forEach(x=>x.classList.remove('reading'));}
function stopSpeak(){
  speakGen++; speaking=false; paused=false; pendingNext=null;
  try{if('speechSynthesis' in window)speechSynthesis.cancel();}catch(e){}
  if(audioEl){try{audioEl.pause();}catch(e){} audioEl.onended=null; audioEl.onerror=null;}
  curAudio=null;
  document.querySelectorAll('.tts.playing,.say-all.playing,.say-from.playing').forEach(x=>x.classList.remove('playing'));
  clearReading(); curBtn=null; updateTransport();
}
function utter(text){
  const u=new SpeechSynthesisUtterance(text);
  u.lang=(frVoice&&frVoice.lang)||'fr-FR'; if(frVoice)u.voice=frVoice; u.rate=rate;
  return u;
}
function audioURLFor(text){
  if(!useNeural||!MAN||!MAN.map)return null;
  const f=MAN.map[text];
  return f ? (MAN.base+neuralVoice+'/'+f) : null;
}
function speakOne(text,done){
  if(!('speechSynthesis' in window)){done&&done();return;}
  const u=utter(text); u.onend=()=>done&&done(); u.onerror=()=>done&&done();
  try{speechSynthesis.speak(u);}catch(e){done&&done();}
}
function playItems(items,btn){
  items=(items||[]).filter(x=>x&&x.t);
  if(!items.length)return;
  if(!('speechSynthesis' in window) && !(useNeural&&MAN&&audioEl))return;
  stopSpeak(); const gen=speakGen;
  speaking=true; paused=false; curBtn=btn||null; if(btn)btn.classList.add('playing');
  let i=0,lastCard=null;
  function next(){
    if(gen!==speakGen)return;
    if(paused){pendingNext=next;return;}
    if(i>=items.length){speaking=false;if(btn)btn.classList.remove('playing');clearReading();curAudio=null;updateTransport();return;}
    const it=items[i++];
    if(it.card&&it.card!==lastCard){clearReading();it.card.classList.add('reading');try{it.card.scrollIntoView({behavior:'smooth',block:'center'});}catch(e){}lastCard=it.card;}
    const url=audioURLFor(it.t);
    if(url&&audioEl){
      curAudio=audioEl;
      audioEl.onended=()=>{if(gen===speakGen){curAudio=null;next();}};
      audioEl.onerror=()=>{if(gen!==speakGen)return;curAudio=null;speakOne(it.t,()=>{if(gen===speakGen)next();});};
      try{audioEl.pause();}catch(e){}
      audioEl.src=url;
      try{audioEl.playbackRate=rate||1;}catch(e){}
      const pr=audioEl.play();
      if(pr&&pr.catch)pr.catch(()=>{if(gen!==speakGen)return;curAudio=null;speakOne(it.t,()=>{if(gen===speakGen)next();});});
    }else{
      curAudio=null;
      speakOne(it.t,()=>{if(gen===speakGen)next();});
    }
  }
  next(); updateTransport();
}
function speak(text,btn){ playItems([{t:text}],btn); }
/* 事件委托:朗读 + 揭示答案 */
content.addEventListener('click',e=>{
  const sf=e.target.closest('.say-from');
  if(sf){
    stopSpeak();
    const card=sf.closest('.card');
    const cards=[...content.querySelectorAll('.card')];
    const start=cards.indexOf(card); const items=[];
    for(let k=start;k<cards.length;k++){
      [...cards[k].querySelectorAll('.tts')].filter(x=>!x.closest('.practice')).forEach(x=>items.push({t:x.getAttribute('data-tts'),card:cards[k]}));
    }
    playItems(items,null); return;
  }
  const sa=e.target.closest('.say-all');
  if(sa){
    const was=sa.classList.contains('playing'); stopSpeak(); if(was)return;
    const card=sa.closest('.card');
    const items=[...card.querySelectorAll('.tts')].filter(x=>!x.closest('.practice')).map(x=>({t:x.getAttribute('data-tts'),card}));
    playItems(items,sa); return;
  }
  const b=e.target.closest('.tts');
  if(b){speak(b.getAttribute('data-tts'),b);return;}
  const r=e.target.closest('.reveal');
  if(r){
    const li=r.closest('li'); const a=li&&li.querySelector('.a'); if(!a)return;
    const show=a.classList.contains('hidden');
    a.classList.toggle('hidden',!show);
    r.textContent=show?'隐藏答案 / Masquer':'显示答案 / Réponse';
    return;
  }
});


async function initialize(){
  if(routeHash())return;
  try{
    if(PAGE_LEVEL!=='ALL')await loadLevel(PAGE_LEVEL);
    document.querySelectorAll('.chip').forEach(c=>{const current=c.dataset.l===PAGE_LEVEL;c.classList.toggle('on',current);if(current)c.setAttribute('aria-current','page');});
    const q=new URL(location.href).searchParams.get('q')||'';$('#search').value=q;
    await updateSearch(q,false);routeHash();
  }catch(e){$('#pageStatus').textContent=e.message;}
}
window.addEventListener('hashchange',routeHash);
window.addEventListener('popstate',()=>{const q=new URL(location.href).searchParams.get('q')||'';$('#search').value=q;updateSearch(q,false);});
if(!window.GRAMMAR_TEST)initialize();
