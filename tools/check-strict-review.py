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
 print(json.dumps({'points':len(rows),'contexts':len(contexts),'recorded_changes':len(changes),'checks':'per-ID semantic coverage counts and exact reversible edits against pre-review SHA-256 baseline'},ensure_ascii=False,indent=2))
 return reports
if __name__=='__main__':main()
