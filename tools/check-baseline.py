"""Prove preservation of original material, accounting for explicit reviewed fixes."""
import json,hashlib,copy
from pathlib import Path
r=Path(__file__).resolve().parents[1]
g=[];p={};x={};source={}
for l in ('a1','a2','b1','b2','c1','c2'):
 for kind in ('grammar','expansion'):
  name=f'tools/{kind}-{l}.json';source[name]=json.loads((r/name).read_text(encoding='utf-8'))
# Verify exact appended suffixes and original prefixes, then restore only this batch in memory.
from append_batch21_evidence import restore_all_append_batches
batch21_counts,batch20_counts,batch19_counts,batch18_counts,batch17_counts,batch16_counts,batch15_counts,batch14_counts,batch13_counts,batch12_counts,batch11_counts,batch10_counts,batch9_counts,batch8_counts,batch7_counts,batch6_counts,batch5_counts,batch4_counts,batch3_counts,append_counts=restore_all_append_batches(source)
# Reverse this batch before replaying historical review ledgers.
for ch in reversed(json.loads((r/'tools/full-site-review-20261016.json').read_text(encoding='utf-8'))['changes']):
 if ch['file'] not in source:continue
 obj=source[ch['file']]
 for key in ch['path'][:-1]:obj=obj[key]
 assert obj[ch['path'][-1]]==ch['after'],(ch['file'],ch['path'])
 obj[ch['path'][-1]]=copy.deepcopy(ch['before'])
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
print('Batch21 append-only proof:', batch21_counts)
print('Batch20 append-only proof:', batch20_counts)
print('Batch19 append-only proof:', batch19_counts)
print('Batch18 append-only proof:', batch18_counts)
print('Batch17 append-only proof:', batch17_counts)
print('Batch16 append-only proof:', batch16_counts)
print('Batch15 append-only proof:', batch15_counts)
print('Batch14 append-only proof:', batch14_counts)
print('Batch13 append-only proof:', batch13_counts)
print('Batch12 append-only proof:', batch12_counts)
print('Batch11 append-only proof:', batch11_counts)
print('Batch10 append-only proof:', batch10_counts)
print('Batch9 append-only proof:', batch9_counts)
print('Batch8 append-only proof:', batch8_counts)
print('Batch7 append-only proof:', batch7_counts)
print('Batch6 append-only proof:', batch6_counts)
print('Batch5 append-only proof:', batch5_counts)
print('Batch4 append-only proof:', batch4_counts)
print('Batch3 append-only proof:', batch3_counts)
print('Batch2 append-only proof:', append_counts)
print('Baseline preserved: 97 points, 427 original examples, 436 original exercises, 311 original expansion sections / 812 examples; explicit reviewed field fixes recorded.')
