"""Validate this review's coverage ledger and every recorded JSON edit."""
import json,hashlib,copy
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
LEVELS=('a1','a2','b1','b2','c1','c2')
def read(name):return json.loads((ROOT/name).read_text(encoding='utf-8-sig'))
def get(data,path):
 for key in path:data=data[key]
 return data
def set_value(data,path,value):
 if not path:return copy.deepcopy(value)
 node=data
 for key in path[:-1]:node=node[key]
 node[path[-1]]=copy.deepcopy(value)
 return data
def main():
 baseline=read('tools/strict-review-baseline.json')['files'];current={name:read(name) for name in baseline}
 from append_batch26_evidence import restore_all_append_batches
 batch26_counts,batch25_counts,batch24_counts,batch23_counts,batch22_counts,batch21_counts,batch20_counts,batch19_counts,batch18_counts,batch17_counts,batch16_counts,batch15_counts,batch14_counts,batch13_counts,batch12_counts,batch11_counts,batch10_counts,batch9_counts,batch8_counts,batch7_counts,batch6_counts,batch5_counts,batch4_counts,batch3_counts,append_counts=restore_all_append_batches(current)
 for ch in reversed(read('tools/full-site-review-20261016.json')['changes']):
  if ch['file'] not in current:continue
  assert get(current[ch['file']],ch['path'])==ch['after'],(ch['file'],ch['path'])
  current[ch['file']]=set_value(current[ch['file']],ch['path'],ch['before'])
 reports=[read('tools/strict-audit-'+l+'.json') for l in LEVELS]
 rows=[];contexts=[];changes=[]
 for l,a in zip(LEVELS,reports):
  assert a['level'].lower()==l
  g=current['tools/grammar-'+l+'.json'];x=current['tools/expansion-'+l+'.json']
  expected={z['id'] for z in g['grammar']};assert {r['id'] for r in a['coverage']}==expected,l
  for row in a['coverage']:
   obj=next(z for z in g['grammar'] if z['id']==row['id']);e=x[row['id']]
   counts={'original_examples':len(obj['ex']),'original_practice':len(g['practice'][row['id']]),'expansion_sections':len(e['sections']),'expansion_examples':sum(len(s['examples']) for s in e['sections']),'added_practice':len(e.get('practice',[]))}
   for k,v in counts.items():assert row[k]==v,(row['id'],k)
   assert row['status']=='semantic-reviewed';rows.append(row)
  cs=current.get('tools/context-'+l+'.json',[])
  actual={c['id']:c for c in cs};assert {r['id'] for r in a.get('context_coverage',[])}==set(actual),l
  for row in a.get('context_coverage',[]):
   c=actual[row['id']];assert row['sentences']==len(c['sentences']) and row['practice']==len(c['practice']);assert row['status']=='semantic-reviewed';contexts.append(row)
  for ch in a['changes']:
   assert ch['reason'] and ch['before']!=ch['after'] and isinstance(ch['path'],list)
   assert ch['file'] in current,ch['file'];changes.append(ch)
 # Replay backwards; exact before-values and hashes prove there are no unlogged edits.
 for ch in reversed(changes):
  obj=current[ch['file']];assert get(obj,ch['path'])==ch['after'],(ch['file'],ch['path'],'after mismatch')
  current[ch['file']]=set_value(obj,ch['path'],ch['before'])
 for name,obj in current.items():
  digest=hashlib.sha256(json.dumps(obj,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()
  assert digest==baseline[name],('Unlogged JSON edit',name)
 assert len(rows)==97 and len(contexts)==6
 print(json.dumps({'append_only_batch26':batch26_counts,'append_only_batch25':batch25_counts,'append_only_batch24':batch24_counts,'append_only_batch23':batch23_counts,'append_only_batch22':batch22_counts,'append_only_batch21':batch21_counts,'append_only_batch20':batch20_counts,'append_only_batch19':batch19_counts,'append_only_batch18':batch18_counts,'append_only_batch17':batch17_counts,'append_only_batch16':batch16_counts,'append_only_batch15':batch15_counts,'append_only_batch14':batch14_counts,'append_only_batch13':batch13_counts,'append_only_batch12':batch12_counts,'append_only_batch11':batch11_counts,'append_only_batch10':batch10_counts,'append_only_batch9':batch9_counts,'append_only_batch8':batch8_counts,'append_only_batch7':batch7_counts,'append_only_batch6':batch6_counts,'append_only_batch5':batch5_counts,'append_only_batch4':batch4_counts,'append_only_batch3':batch3_counts,'append_only_batch2':append_counts,'points':len(rows),'contexts':len(contexts),'recorded_changes':len(changes),'checks':'per-ID semantic coverage counts and exact reversible edits against pre-review SHA-256 baseline'},ensure_ascii=False,indent=2))
 return reports
if __name__=='__main__':main()
