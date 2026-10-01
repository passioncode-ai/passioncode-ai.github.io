#!/usr/bin/env python3
"""Enforce PassionCode's display punctuation policy on the shipped HTML sources."""
from pathlib import Path
import re
import sys
from html_copy import PAGES, parse

ROOT = Path(__file__).resolve().parents[1]
ABBREVIATION = re.compile(r'(?:\b(?:Mr|Mrs|Ms|Dr|Prof|Sr|Jr|St|Inc|Ltd|Co|etc)|\b(?:e\.g|i\.e)|(?:\b[A-Z]\.)+[A-Z])\.$', re.I)

def full_stop(text):
    text = text.strip().rstrip('\"\'”’»)]}').rstrip()
    return text.endswith('.') and not text.endswith('..') and not ABBREVIATION.search(text)

def inspect(html):
    root = parse(html)
    blocks = [node for node in root.walk() if node.display and node.text().strip()]
    problems = []
    for node in blocks:
        text = node.text().strip()
        fragments = text.splitlines()
        # Internal sentence punctuation in a hero introduction is normal prose;
        # a staccato headline is still a display composition on a single line.
        if node.heading or {'hero-reframe', 'eyebrow', 'specimen-heading'}.intersection(node.attrs.get('class', '').split()):
            fragments = re.split(r'(?<=\.)\s+', text)
        if any(full_stop(fragment) for fragment in fragments):
            problems.append(f'line {node.line}: <{node.tag}> display full stop: {text!r}')
    return blocks, problems

def check(root=ROOT):
    problems, count = [], 0
    for page in PAGES:
        source = root / page
        if not source.is_file():
            problems.append(f'{page}: missing source page')
            continue
        blocks, findings = inspect(source.read_text())
        count += len(blocks)
        if not any(node.tag == 'h1' for node in blocks):
            problems.append(f'{page}: no visible h1; editorial coverage is empty')
        problems.extend(f'{page}:{finding}' for finding in findings)
    return count, problems

if __name__ == '__main__':
    count, problems = check()
    if problems:
        print('\n'.join(problems), file=sys.stderr)
        raise SystemExit(1)
    print(f'PASS: display copy — {len(PAGES)} pages, {count} visible display blocks')
