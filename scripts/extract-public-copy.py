#!/usr/bin/env python3
"""Project HTML's visible text/metadata for language lint, excluding markup tokens."""
from html.parser import HTMLParser
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]
class Text(HTMLParser):
    def __init__(self):
        super().__init__(); self.ignore = 0; self.lines=[]
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        if tag in ('script','style'): self.ignore += 1
        if tag == 'meta' and attrs.get('name') == 'description': self.lines.append(attrs['content'])
    def handle_endtag(self, tag):
        if tag in ('script','style'): self.ignore -= 1
    def handle_data(self, data):
        if not self.ignore and data.strip(): self.lines.append(data.strip())
for source in ('index.html','switchboard/index.html','fabric/index.html','observatory/index.html','design-system/index.html'):
    parser=Text(); parser.feed((ROOT/source).read_text())
    target=ROOT/'docs/brand/copy'/source.replace('/','-').replace('.html','.md')
    content='Contract: brand-contract v1\n\n<!-- Generated from '+source+'; edit source and rerun scripts/extract-public-copy.py. -->\n\n'+'\n\n'.join(parser.lines)+'\n'
    if '--check' in sys.argv:
        if not target.exists() or target.read_text()!=content: raise SystemExit('Stale public-copy projection: '+source)
    else:
        target.parent.mkdir(parents=True,exist_ok=True);target.write_text(content)
print('PASS: 5 public HTML text projections')
