"""Validate batch3, restore it in memory, then reuse unchanged batch2 preservation checks."""
import copy,json,hashlib
from pathlib import Path
from append_batch2_evidence import digest,restore_append_batch
ROOT=Path(__file__).resolve().parents[1]
def restore_append_batches(source):
 ledger=json.loads((ROOT/'tools/append-only-batch3-20261016.json').read_text(encoding='utf-8'))
 for name,sha in ledger['protected_files_sha256'].items():assert hashlib.sha256((ROOT/'tools'/name).read_bytes()).hexdigest()==sha,('Protected historical ledger/baseline changed',name)
 scratch=copy.deepcopy(source);counts={'sections':0,'practice':0}
 for row in ledger['files']:
  name=row['file'];obj=copy.deepcopy(scratch[name] if name in scratch else json.loads((ROOT/name).read_text(encoding='utf-8-sig')))
  assert digest(obj)==row['after_sha256'],('Batch3 current source differs from ledger',name)
  for ch in reversed(row['changes']):
   assert ch['operation']=='append' and len(ch['path'])==2
   point,field=ch['path'];assert field in counts
   current=obj[point][field];n=ch['prefix_length']
   assert current[n:]==ch['added'],('Batch3 added suffix mismatch',name,ch['path'])
   assert digest(current[:n])==ch['prefix_sha256'],('Batch3 old prefix changed/lost',name,ch['path'])
   counts[field]+=len(ch['added']);obj[point][field]=current[:n]
  assert digest(obj)==row['before_sha256'],('Batch3 did not restore exact pre-batch file',name)
  scratch[name]=obj
 assert counts==ledger['counts']=={'sections':3,'practice':6}
 prior_counts=restore_append_batch(scratch)
 # Keep caller's original key set: strict checker hashes only its historical files.
 for name in source:source[name]=scratch[name]
 return counts,prior_counts
