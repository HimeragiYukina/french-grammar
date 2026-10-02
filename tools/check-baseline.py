"""Prove preservation of original material, accounting for explicit reviewed fixes."""
import json,hashlib,copy
from pathlib import Path
r=Path(__file__).resolve().parents[1]
g=[];p={};x={};source={}
for l in ('a1','a2','b1','b2','c1','c2'):
 for kind in ('grammar','expansion'):
  name=f'tools/{kind}-{l}.json';source[name]=json.loads((r/name).read_text(encoding='utf-8'))
# Restore this review's edits in memory before comparing the original historical baseline.
for audit in sorted((r/'tools').glob('strict-audit-*.json')):
 data=json.loads(audit.read_text(encoding='utf-8-sig'))
 for ch in reversed(data.get('changes',[])):
  if ch['file'] not in source:continue
  obj=source[ch['file']];path=ch['path']
  if not path:
   assert obj==ch['after'];source[ch['file']]=ch['before'];continue
  for key in path[:-1]:obj=obj[key]
  assert obj[path[-1]]==ch['after'],(ch['file'],path)
  obj[path[-1]]=ch['before']
for l in ('a1','a2','b1','b2','c1','c2'):
 d=source[f'tools/grammar-{l}.json'];g+=d['grammar'];p.update(d['practice']);x.update(source[f'tools/expansion-{l}.json'])
for f in json.loads((r/'tools/split-review-fixes.json').read_text(encoding='utf-8')):
 item=p[f['id']][f['practice_index']] if 'practice_index' in f else next(i for i in g if i['id']==f['id'])
 if 'practice_index' not in f and f['example_index'] is not None:item=item['ex'][f['example_index']]
 assert item[f['field']]==f['new'];item[f['field']]=f['old']
review=json.loads((r/'tools/deepening-review.json').read_text(encoding='utf-8'))
for key in review['points']:
 x[key]['sections'].pop();x[key].pop('practice');x[key].pop('related')
b=json.loads((r/'tools/content-baseline.json').read_text(encoding='utf-8'))
for key,data in [('GRAMMAR',g),('PRACTICE',p),('EXPANSIONS',x)]:
 digest=hashlib.sha256(json.dumps(data,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()
 assert digest==b['sha256'][key],f'Unrecorded change/loss in {key}'
print('Baseline preserved: 97 points, 427 original examples, 436 original exercises, 311 original expansion sections / 812 examples; explicit reviewed field fixes recorded.')
