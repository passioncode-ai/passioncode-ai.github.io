#!/usr/bin/env python3
"""Project visible HTML copy while retaining heading semantics for language lint."""
from pathlib import Path
import sys
from html_copy import PAGES, parse, projection
ROOT = Path(__file__).resolve().parents[1]

def render(source, html):
    return ('Contract: brand-contract v1\n\n<!-- Generated from ' + source
            + '; edit source and rerun scripts/extract-public-copy.py. -->\n\n'
            + '\n\n'.join(projection(parse(html))) + '\n')

def main():
    for source in PAGES:
        target = ROOT / 'docs/brand/copy' / source.replace('/', '-').replace('.html', '.md')
        content = render(source, (ROOT / source).read_text())
        if '--check' in sys.argv:
            if not target.exists() or target.read_text() != content:
                raise SystemExit('Stale public-copy projection: ' + source)
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(content)
    print(f'PASS: {len(PAGES)} public HTML text projections')

if __name__ == '__main__':
    main()
