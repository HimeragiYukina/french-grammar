"""Generate seven offline pages and six shared, on-demand level bundles."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
LEVELS=('a1','a2','b1','b2','c1','c2')
def main():
 template=(ROOT/'tools/page-template.html').read_text(encoding='utf-8')
 ids=[];titles={}
 for level in LEVELS:
  data=json.loads((ROOT/'tools'/f'grammar-{level}.json').read_text(encoding='utf-8'))
  data['expansions']=json.loads((ROOT/'tools'/f'expansion-{level}.json').read_text(encoding='utf-8-sig'))
  context_path=ROOT/'tools'/f'context-{level}.json'
  data['contexts']=json.loads(context_path.read_text(encoding='utf-8')) if context_path.exists() else []
  data['sources']=json.loads((ROOT/'tools'/f'sources-{level}.json').read_text(encoding='utf-8-sig'))
  current=[g['id'] for g in data['grammar']];ids+=current
  titles.update({g['id']:g['titleFr'] for g in data['grammar']})
  assert set(current)==set(data['practice'])==set(data['expansions']),level
  for key,x in data['expansions'].items():
   assert all(x.get(f) for f in ('comparison','errors','boundaries')),key
   for s in x['sections']:
    assert s['title'] and s['explanation'] and len(s['examples'])>=2,key
    assert all(e.get('fr') and e.get('zh') and e.get('use') for e in s['examples']),key
  payload=json.dumps(data,ensure_ascii=False,indent=2).replace('</script','<\\/script')
  (ROOT/'data'/f'{level}.js').write_text('window.GRAMMAR_DATA=window.GRAMMAR_DATA||{};\nwindow.GRAMMAR_DATA.'+level.upper()+'='+payload+';\n',encoding='utf-8')
 (ROOT/'data/titles.js').write_text('window.GRAMMAR_TITLES='+json.dumps(titles,ensure_ascii=False)+';\n',encoding='utf-8')
 assert len(ids)==len(set(ids))==97
 for level in ('index',)+LEVELS:
  is_index=level=='index';label='ALL' if is_index else level.upper()
  heading='法语语法手册 · Grammaire française '+('A1–C2' if is_index else label)
  page=template.replace('@@LEVEL@@',label).replace('@@HEADING@@',heading).replace('@@TITLE@@',heading)
  page=page.replace('@@DATA_SCRIPT@@','' if is_index else '<script src="data/'+level+'.js"></script>')
  (ROOT/f'{level}.html').write_text(page,encoding='utf-8')
 print('Generated overview + six level pages; 97 points in six on-demand bundles.')
if __name__=='__main__':main()
