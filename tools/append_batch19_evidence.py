"""Validate and restore batch19 in memory before unchanged prior preservation checks."""
import copy,json,hashlib
from pathlib import Path
from append_batch2_evidence import digest
from append_batch18_evidence import restore_all_append_batches as restore_prior
ROOT=Path(__file__).resolve().parents[1]
def restore_all_append_batches(source):
 ledger=json.loads((ROOT/'tools/append-only-batch19-20261016.json').read_text(encoding='utf8'))
 for name,sha in ledger['protected_files_sha256'].items():
  assert hashlib.sha256((ROOT/'tools'/name).read_bytes()).hexdigest()==sha,('Protected historical evidence changed',name)
 scratch=copy.deepcopy(source);counts={'sections':0,'practice':0}
 for row in ledger['files']:
  name=row['file'];obj=copy.deepcopy(scratch[name] if name in scratch else json.loads((ROOT/name).read_text(encoding='utf-8-sig')))
  assert digest(obj)==row['after_sha256'],('Batch19 current source differs from ledger',name)
  for ch in reversed(row['changes']):
   assert ch['operation']=='append' and len(ch['path'])==2
   point,field=ch['path'];assert field in counts
   current=obj[point][field];n=ch['prefix_length']
   assert current[n:]==ch['added'],('Batch19 added suffix changed',name,ch['path'])
   assert digest(current[:n])==ch['prefix_sha256'],('Batch19 old prefix changed',name,ch['path'])
   counts[field]+=len(ch['added']);obj[point][field]=current[:n]
  assert digest(obj)==row['before_sha256'],('Batch19 did not restore exact before state',name)
  scratch[name]=obj
 assert counts==ledger['counts']=={'sections':0,'practice':2}
 prior=restore_prior(scratch)
 for name in source:source[name]=scratch[name]
 return counts,*prior
