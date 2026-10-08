"""Static visible-copy structure shared by the editorial gate and projection.

No computed CSS/JS: browser review owns those. aria-hidden is not a visual hide.
"""
from dataclasses import dataclass, field
from html.parser import HTMLParser
import json
import re
from pathlib import Path

# The one page list lives in scripts/pages.mjs and the languages in i18n/locales.json; read them
# rather than keep a second copy: the English source pages, then the same pages under each
# translated locale.
_SCRIPTS = Path(__file__).resolve().parent
_PAGES_SOURCE = (_SCRIPTS / 'pages.mjs').read_text()
_REGISTRY = json.loads((_SCRIPTS.parent / 'i18n' / 'locales.json').read_text())
SOURCE_PAGES = tuple(re.findall(r"'([^']+\.html)'", _PAGES_SOURCE.split('export const SOURCE_PAGES = [', 1)[1].split(']', 1)[0]))
SOURCE_NOINDEX = tuple(re.findall(r"'([^']+\.html)'", _PAGES_SOURCE.split('export const SOURCE_NOINDEX = [', 1)[1].split(']', 1)[0]))
LOCALES = tuple(code for code in _REGISTRY['locales'] if code != _REGISTRY['source'])
PAGES = SOURCE_PAGES + tuple(f'{locale}/{page}' for locale in LOCALES for page in SOURCE_PAGES)
HEADINGS = {'h1', 'h2', 'h3', 'h4', 'h5', 'h6'}
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link',
        'meta', 'param', 'source', 'track', 'wbr'}
DISPLAY_CLASSES = {'hero-body', 'hero-reframe', 'hero-caption', 'eyebrow',
                   'status', 'build-status', 'specimen-heading',
                   'section-number', 'button'}

@dataclass
class Node:
    tag: str
    attrs: dict = field(default_factory=dict)
    children: list = field(default_factory=list)
    line: int = 1
    in_hero: bool = False

    @property
    def hidden(self):
        return (self.tag in {'script', 'style', 'template'} or 'hidden' in self.attrs
                or bool(re.search(r'(?:^|;)\s*(?:display\s*:\s*none|visibility\s*:\s*hidden)\s*(?:!important\s*)?(?:;|$)',
                                  self.attrs.get('style', ''), re.I)))

    @property
    def heading(self):
        return self.tag in HEADINGS or self.attrs.get('role') == 'heading'

    @property
    def display(self):
        return (self.heading or self.tag in {'figcaption', 'button', 'label'}
                or (self.in_hero and 'beta-note' in self.attrs.get('class', '').split())
                or bool(DISPLAY_CLASSES.intersection(self.attrs.get('class', '').split())))

    def text(self):
        if self.hidden:
            return ''
        if self.tag == 'br':
            return '\n'
        return ''.join(re.sub(r'\s+', ' ', child) if isinstance(child, str)
                       else child.text() for child in self.children)

    def walk(self):
        if not self.hidden:
            yield self
            for child in self.children:
                if isinstance(child, Node):
                    yield from child.walk()

class CopyParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node('document')
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = Node(tag, dict(attrs), line=self.getpos()[0])
        node.in_hero = self.stack[-1].in_hero or 'hero' in node.attrs.get('class', '').split()
        self.stack[-1].children.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(data)

def parse(html):
    parser = CopyParser()
    parser.feed(html)
    parser.close()
    return parser.root

def projection(node):
    """Keep headline roles and join inline nodes instead of splitting every token."""
    if node.hidden:
        return []
    if node.tag == 'meta' and node.attrs.get('name') == 'description':
        return [node.attrs.get('content', '')]
    if node.heading:
        level = int(node.tag[1]) if node.tag in HEADINGS else 2
        return ['#' * level + ' ' + line.strip() for line in node.text().splitlines() if line.strip()]
    if node.tag in {'p', 'li', 'dt', 'dd', 'figcaption', 'title', 'button', 'pre'} and not any(
            child.heading for child in node.walk() if child is not node):
        return [node.text().strip()] if node.text().strip() else []
    lines = []
    for child in node.children:
        if isinstance(child, Node):
            lines.extend(projection(child))
        elif child.strip():
            lines.append(re.sub(r'\s+', ' ', child).strip())
    return lines
