"""Validate and reverse only explicitly recorded append-only grammar batch2 additions."""
import copy,hashlib,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def digest(value):
 return hashlib.sha256(json.dumps(value,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()
def restore_append_batch(source):
 ledger=json.loads((ROOT/'tools/append-only-batch2-20261016.json').read_text(encoding='utf-8'))
 counts={'sections':0,'practice':0}
 for row in ledger['files']:
  name=row['file'];obj=copy.deepcopy(source[name] if name in source else json.loads((ROOT/name).read_text(encoding='utf-8')))
  assert digest(obj)==row['after_sha256'],('Batch2 current source changed outside ledger',name)
  for ch in reversed(row['changes']):
   node=obj
   for key in ch['path'][:-1]:node=node[key]
   key=ch['path'][-1]
   if ch['operation']=='add_point':
    assert not ch['before_exists'] and node[key]==ch['after'],(name,ch['path'])
    assert node[key]['sections']==[] and node[key]['related']==[] and len(node[key]['practice'])==2
    counts['practice']+=2;del node[key]
   else:
    assert ch['operation']=='append' and key in counts
    current=node[key];n=ch['prefix_length']
    assert current[n:]==ch['added'],('Batch2 exact suffix mismatch',name,ch['path'])
    assert digest(current[:n])==ch['prefix_sha256'],('Original prefix lost/changed',name,ch['path'])
    counts[key]+=len(ch['added']);node[key]=current[:n]
  assert digest(obj)==row['before_sha256'],('Batch2 reverse does not restore original entire file',name)
  if name in source:source[name]=obj
 assert counts=={'sections':6,'practice':12} and ledger['append_sections']==6 and ledger['append_practice']==12,counts
 return counts
if __name__=='__main__':
 print(json.dumps({'append_only_batch2':restore_append_batch({}),'old_baselines_replaced':False},ensure_ascii=False))
