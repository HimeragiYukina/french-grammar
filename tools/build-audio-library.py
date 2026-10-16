from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1];T=ROOT if ROOT.name!='french-grammar' else ROOT.parent/'french-tutorial';G=ROOT if ROOT.name=='french-grammar' else ROOT.parent/'french-grammar';REPOS=[(G,'grammar')] if ROOT.name=='french-grammar' else [(T,'tutorial'),(G,'grammar')]
HTML='''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>法语配套音频索引</title><style>body{font:17px/1.65 system-ui,sans-serif;background:#f7f5ef;color:#183d35;margin:0}main{max-width:900px;margin:auto;padding:24px}a{color:#176b60}h1{font-size:2rem}input,select,button{font:inherit;padding:9px;border:1px solid #7d9a91;border-radius:7px;max-width:100%;box-sizing:border-box}input{width:100%}.bar{display:flex;gap:12px;flex-wrap:wrap;margin:16px 0}.clip{background:white;border:1px solid #d4ddd6;border-radius:12px;padding:18px;margin:14px 0;overflow-wrap:anywhere}.fr{font-size:1.13rem}.meta{font-size:.85rem;color:#526b63}audio{width:100%;margin-top:12px}.notice{padding:14px;border-left:4px solid #b17431;background:#fff3da}button{cursor:pointer}#count{font-weight:600}</style><main><a href="index.html">← 返回学习首页</a><h1>法语配套音频索引</h1><p>按课程或语法点找例句、词组、范文与题目材料。这里播放本地配套文件；原学习页的朗读音色选择仍保留。</p><p class="notice">配套合成音是练习示范。标为“待改错输入”的文字供辨析，不能当作正确表达；音素符号和构式占位不作为句子朗读。此索引不代表全部音频已经人工听审。</p><label>搜索法语、课程或语法点<input id="query" type="search" placeholder="输入法语或 A2-U05-L02 等编号"></label><div class="bar"><label>语速 <select id="rate"><option>0.75</option><option selected>1</option><option>1.2</option></select></label><button id="clear">显示全部</button><button id="prev">上一页</button><button id="next">下一页</button></div><p id="count" aria-live="polite"></p><div id="results"></div><p><a href="audio/SIWIS-MODEL-CARD.txt">补充音频的模型、来源与许可说明</a></p></main><script src="audio/library-data.js"></script><script>
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const params=new URLSearchParams(location.search);let selected=params.get('content')||'',page=0,matches=[];$('#query').value=selected;
function draw(){const q=$('#query').value.trim().toLowerCase();matches=AUDIO_LIBRARY.units.filter(r=>!q||r.text.toLowerCase().includes(q)||r.occurrences.some(o=>o.id.toLowerCase().includes(q)));page=Math.min(page,Math.max(0,Math.ceil(matches.length/30)-1));$('#count').textContent=`${matches.length} 段配套音频 · 第 ${page+1}/${Math.max(1,Math.ceil(matches.length/30))} 页`;$('#results').innerHTML=matches.slice(page*30,(page+1)*30).map(r=>`<section class="clip"><div class="fr" lang="fr">${esc(r.text)}</div><p class="meta">${r.kind==='error_input'?'待改错输入 · ':r.kind==='mixed_material'?'依语境辨析（含待改错输入） · ':r.kind==='exercise_material'?'题目／对比材料（含干扰项） · ':r.kind==='letter_name'?'字母名称 · ':'学习材料 · '}${r.source==='local-siwis'?'Piper Siwis 合成示范':'原有配套录音'}<br>${r.occurrences.map(o=>`<a href="${esc(AUDIO_LIBRARY.contentLinks[o.id]||'index.html')}">${esc(o.id)}</a>${o.roles.includes('error_input')?'（含待改错输入）':''}`).join('、')}</p><audio controls preload="none" src="${esc(r.path)}"></audio></section>`).join('');document.querySelectorAll('audio').forEach(a=>{a.playbackRate=+$('#rate').value;a.onplay=()=>document.querySelectorAll('audio').forEach(b=>{if(a!==b)b.pause()})});$('#prev').disabled=page===0;$('#next').disabled=(page+1)*30>=matches.length}
$('#query').oninput=()=>{page=0;draw()};$('#clear').onclick=()=>{$('#query').value='';page=0;draw()};$('#prev').onclick=()=>{page--;draw()};$('#next').onclick=()=>{page++;draw()};$('#rate').onchange=()=>document.querySelectorAll('audio').forEach(a=>a.playbackRate=+$('#rate').value);draw();
</script></html>'''.replace('\n+','\n')
def library_unit(record):
 roles=list(dict.fromkeys(record.get('roles') or [o.get('kind',record.get('kind','learning_text')) for o in record['occurrences']]))
 kind=('mixed_material' if any(role!='error_input' for role in roles) else 'error_input') if 'error_input' in roles else record.get('kind','learning_text')
 occurrences=[]
 for content_id in dict.fromkeys(o['id'] for o in record['occurrences']):
  occurrences.append({'id':content_id,'roles':list(dict.fromkeys(o.get('kind',record.get('kind','learning_text')) for o in record['occurrences'] if o['id']==content_id))})
 return {**{key:record.get(key) for key in ['text','path','source']},'kind':kind,'roles':roles,'occurrences':occurrences}

def content_links(root,repo):
 links={'exams':'index.html?view=exams','tcf':'index.html?view=full-mock&id=tcf','tef':'index.html?view=full-mock&id=tef'} if repo=='tutorial' else {}
 if repo=='grammar':
  data=[json.loads(line) for line in (root/'tools/audio-approved-spans-20261016.jsonl').read_text(encoding='utf-8').splitlines()]
  return {row['id']:row['id'][:2]+'.html#'+row['id'] for row in data if row['repo']=='grammar'}
 for name in ['a1','a2','b1','b2','c1','c2','phonetics','bridge']:
  for lesson in json.loads((root/'data'/f'{name}.json').read_text(encoding='utf-8-sig')):
   links[lesson['id']]='lessons/'+lesson['id']+'.html'
 for level in ['a1','a2','b1','b2','c1','c2']:
  assessment=json.loads((root/'data'/f'assessment-{level}.json').read_text(encoding='utf-8-sig'))
  links[assessment['id']]='index.html?view=assessment&level='+assessment['level']
 for group in json.loads((root/'data/exam-comprehension.json').read_text(encoding='utf-8-sig'))['groups']:
  links[group['id']]='index.html?view=exam-drill&id='+group['id']
  for item in group['items']:links[item['id']]=links[group['id']]
 for name in ['tcf','tef']:
  mock=json.loads((root/'data'/f'mock-{name}.json').read_text(encoding='utf-8-sig'))
  for section in mock['sections']:
   for item in section.get('items',[])+section.get('tasks',[]):
    if item.get('id'):links[item['id']]='index.html?view=full-mock&id='+name
 for name in ['beginner','intermediate']:
  raw=json.loads((root/'data'/f'human-unit-{name}.json').read_text(encoding='utf-8-sig'))
  for unit in raw if isinstance(raw,list) else raw['units']:links[unit['id']]='index.html?view=human-unit&id='+name
 return links

if __name__=='__main__':
 for root,repo in REPOS:
  coverage=json.loads((root/'audio/coverage-20261016.json').read_text(encoding='utf-8'))
  units=[library_unit(record) for record in coverage['records'] if record['repo']==repo]
  data={'repo':repo,'units':units,'contentLinks':content_links(root,repo)}
  (root/'audio/library-data.js').write_text('window.AUDIO_LIBRARY='+json.dumps(data,ensure_ascii=False)+';\n',encoding='utf-8')
  (root/'audio-library.html').write_text(HTML,encoding='utf-8');print(repo,len(units))
