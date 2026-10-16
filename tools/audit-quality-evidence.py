from pathlib import Path
import json,hashlib
R=Path(__file__).resolve().parents[1];grammar=R.name=='french-grammar';roots={'grammar':R} if grammar else {'tutorial':R,'grammar':R.parent/'french-grammar'};prefix='' if grammar else 'reports/'
def read(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def get(d,p):
 for k in p.strip('/').split('/'):
  k=k.replace('~1','/').replace('~0','~');d=d[int(k)] if isinstance(d,list) else d[k]
 return d
q=read(R/(prefix+'quality-content-review-20261016.json'));fix=read(R/(prefix+'quality-fixes-20261016.json'));rows=q['questions'];assert len(rows)==(162 if grammar else 172);assert len({r['questionId'] for r in rows})==len(rows)
for r in rows:
 root=roots[r['repo']];path=(root/r['file']).resolve();assert path.is_relative_to(root);data=read(path);assert get(data,r['jsonpath'])==r['currentSnapshot'],r['questionId']
 if isinstance(data,list):assert data[int(r['jsonpath'].split('/')[1])]['id']==r['contentId']
 else:assert r['jsonpath'].split('/')[1]==r['contentId']
for f in fix['appliedFixes']:
 data=read(R/f['file']);assert get(data,f['jsonpath'])==f['after'],f['journalId']
 if isinstance(data,list):assert data[int(f['jsonpath'].split('/')[1])]['id']==f['id']
 else:assert f['jsonpath'].split('/')[1]==f['id']
assert len(fix['appliedFixes'])==fix['appliedFixCount'];out={'scope':'Exact current question snapshots, unique IDs, declared append-delta records and ID/path guarded fixes. Independent semantic verdicts remain in quality-content-review.','questions':len(rows),'repositoryFixesVerified':len(fix['appliedFixes']),'issues':[],'semanticReviewIsSeparate':True};(R/(prefix+'quality-evidence-audit-20261016.json')).write_text(json.dumps(out,indent=2)+'\n',encoding='utf-8');print(json.dumps(out))
