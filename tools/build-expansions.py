"""Embed reviewed grammar supplements into the offline single-file handbook."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LEVELS = ('a1', 'a2', 'b1', 'b2', 'c1', 'c2')


def main():
    path = ROOT / 'index.html'
    html = path.read_text(encoding='utf-8')
    ids = re.findall(r'\bid:"([a-c][12]-[^"\s]+)"', html)
    supplements = {}
    sources = {}
    for level in LEVELS:
        data = json.loads((ROOT / 'tools' / f'expansion-{level}.json').read_text(encoding='utf-8-sig'))
        assert all(key.startswith(level + '-') for key in data), level
        supplements.update(data)
        sources[level.upper()] = json.loads((ROOT / 'tools' / f'sources-{level}.json').read_text(encoding='utf-8-sig'))
    assert set(ids) == set(supplements), f'Coverage mismatch: {set(ids) ^ set(supplements)}'
    for key, entry in supplements.items():
        assert entry['sections'], key
        for field in ('comparison', 'errors', 'boundaries'):
            assert isinstance(entry[field], str) and entry[field].strip(), (key, field)
        for section in entry['sections']:
            assert section['title'] and section['explanation'], key
            assert len(section['examples']) >= 2, (key, section['title'])
            for example in section['examples']:
                assert example['fr'] and example['zh'] and example.get('use'), (key, example)
    start = '// BEGIN REVIEWED EXPANSIONS'
    end = '// END REVIEWED EXPANSIONS'
    payload = (start + '\nconst EXPANSIONS = ' + json.dumps(supplements, ensure_ascii=False, indent=2)
               + ';\nconst EXPANSION_SOURCES = ' + json.dumps(sources, ensure_ascii=False, indent=2)
               + ';\n' + end).replace('</script', '<\\/script')
    if start in html:
        html = re.sub(re.escape(start) + r'[\s\S]*?' + re.escape(end), lambda _: payload, html, count=1)
    else:
        html = html.replace('const GRAMMAR = [...A1, ...A2, ...B1, ...B2, ...C1, ...C2];',
                            payload + '\n\nconst GRAMMAR = [...A1, ...A2, ...B1, ...B2, ...C1, ...C2];')
    with path.open('w', encoding='utf-8', newline='') as stream:
        stream.write(html)
    sections = sum(len(x['sections']) for x in supplements.values())
    examples = sum(len(s['examples']) for x in supplements.values() for s in x['sections'])
    print(f'Embedded {len(supplements)} points, {sections} usage sections, {examples} examples.')


if __name__ == '__main__':
    main()
