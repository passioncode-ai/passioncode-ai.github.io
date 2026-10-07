"""Regression plants exercise source semantics, not exact approved headline words."""
from pathlib import Path
import json
import re
import subprocess
import tempfile
import unittest
import xml.etree.ElementTree as ET
from check_display_copy import check, inspect
from html_copy import LOCALES, PAGES, parse, projection

ROOT = Path(__file__).resolve().parents[1]

class DisplayCopyTests(unittest.TestCase):
    def test_nested_heading_linebreak_and_staccato_plants(self):
        for html in ('<h1>AI-native <em>teams.</em></h1>',
                     '<h2>Your agents.<br>Your tools</h2>',
                     '<h2>Your agents. Your tools</h2>',
                     '<div role="heading">A title.</div>'):
            with self.subTest(html=html):
                self.assertTrue(inspect(html)[1])

    def test_display_roles_and_caption_plants(self):
        for html in ('<p class="hero-body">Your workflow.</p>',
                     '<p class="hero-reframe">Your tools. Your work</p>',
                     '<p class="specimen-heading">Keep building.</p>',
                     '<p class="eyebrow">BY PASSIONCODE.</p>',
                     '<p class="build-status">Available now.</p>',
                     '<figcaption>A synthetic demo.</figcaption>',
                     '<button>Continue.</button>',
                     '<section class="hero"><p class="beta-note">Beta.</p></section>'):
            with self.subTest(html=html):
                self.assertTrue(inspect(html)[1])

    def test_ordinary_prose_and_non_terminal_dots(self):
        html = ('<p>This is a sentence. Another follows.</p>'
                '<p class="beta-note">This is a full explanatory paragraph.</p>'
                '<h1>PassionCode.ai</h1><h2>Version 0.3.1</h2>'
                '<h2>https://passioncode.ai</h2><h2>Need help?</h2>'
                '<h2>Working...</h2><h2>Working…</h2><h2>Meet Dr. Smith</h2>'
                '<h2>Acme Inc.</h2><h2>In the U.S.</h2>'
                '<h2><code>./tool</code></h2><h2><code>git add .</code></h2>')
        self.assertEqual(inspect(html)[1], [])

    def test_source_whitespace_is_not_a_display_linebreak(self):
        self.assertEqual(inspect('<h2>Release 0.3.1\nwith more tools</h2>')[1], [])
        self.assertTrue(inspect('<h2>“Keep building.”</h2>')[1])
        self.assertTrue(inspect('<h2>Keep building&#46;</h2>')[1])

    def test_hidden_content_and_attributes(self):
        html = ('<style>.title { content: "Bad." }</style>'
                '<script>"<h1>Bad.</h1>"</script>'
                '<template><h1>Bad.</h1></template>'
                '<div hidden><h1>Bad.</h1></div>'
                '<h1 style="display: none !important">Bad.</h1>'
                '<h1 title="Not visible.">Good<span hidden> bad.</span></h1>')
        self.assertEqual(inspect(html)[1], [])
        self.assertTrue(inspect('<h1 aria-hidden="true">Still visible.</h1>')[1])

    def test_projection_preserves_nested_headings_and_excludes_markup(self):
        lines = projection(parse('<meta name="description" content="Description.">'
                           '<h1>Your <em>agents.</em><br>Tools</h1>'
                           '<p>Use <code>npm</code> now.</p>'
                           '<script>Bad.</script><p hidden>Secret.</p>'))
        self.assertEqual(lines, ['Description.', '# Your agents.', '# Tools', 'Use npm now.'])

    def test_empty_and_missing_corpus_fail_closed(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            count, errors = check(root)
            self.assertEqual(count, 0)
            self.assertEqual(len(errors), len(PAGES))
            for page in PAGES:
                target = root / page
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text('<p>Only prose.</p>')
            self.assertEqual(len(check(root)[1]), len(PAGES))

    def test_release_generated_copy(self):
        result = subprocess.run(['node', '--input-type=module', '-e',
            "import {renderSwitchboardPage} from './scripts/switchboard-release.mjs'; "
            "import {readFileSync} from 'node:fs'; "
            "console.log(renderSwitchboardPage(readFileSync('switchboard/index.html','utf8'), JSON.parse(readFileSync('switchboard/release.json','utf8'))));"],
            cwd=ROOT, text=True, capture_output=True, check=True)
        blocks, errors = inspect(result.stdout)
        self.assertGreaterEqual(len(blocks), 2)
        self.assertEqual(errors, [])
        self.assertTrue(inspect(result.stdout.replace('</h2>', '.</h2>', 1))[1])

    def test_every_sitemap_page_has_editorial_coverage(self):
        sitemap = ET.parse(ROOT / 'sitemap.xml')
        urls = [element.text for element in sitemap.findall('.//{*}loc')]
        expected = {url.removeprefix('https://passioncode.ai/').rstrip('/') + '/index.html'
                    if url != 'https://passioncode.ai/' else 'index.html' for url in urls}
        self.assertTrue(expected)
        # Noindex pages (scripts/pages.mjs NOINDEX) are shipped and checked, but not listed.
        pages_src = (ROOT / 'scripts/pages.mjs').read_text()
        source_noindex = set(re.findall(r"'([^']+\.html)'", pages_src.split('const SOURCE_NOINDEX', 1)[1].split(']', 1)[0]))
        noindex = {page for page in PAGES
                   if page in source_noindex or (page.split('/', 1)[0] in LOCALES and page.split('/', 1)[1] in source_noindex)}
        self.assertEqual(set(PAGES) - noindex, expected)
        # The build ships every page by importing the same list.
        build = (ROOT / 'scripts/build-site.mjs').read_text()
        self.assertIn("import { PAGES } from './pages.mjs'", build)
        self.assertIn('...PAGES', build)

    def test_projection_cli_staleness_is_in_gate(self):
        package = json.loads((ROOT / 'package.json').read_text())
        self.assertIn('check_display_copy.py', package['scripts']['check'])
        self.assertIn('extract-public-copy.py --check', package['scripts']['check'])

if __name__ == '__main__':
    unittest.main()
