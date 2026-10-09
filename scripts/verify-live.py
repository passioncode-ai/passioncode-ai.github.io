#!/usr/bin/env python3
"""Compare a built static artifact and its download routes with a deployed site."""
import argparse
import hashlib
import json
import re
from pathlib import Path
import subprocess
import tempfile
from datetime import datetime, timezone

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--base-url', default='https://passioncode.ai')
parser.add_argument('--output', required=True, help='Receipt JSON path outside dist/')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
files = sorted(path for path in (root / 'dist').rglob('*') if path.is_file())
if not files:
    parser.error('Run npm run build first; dist has no files')
rows = []
FORM_TOKEN = re.compile(rb'(<input type="hidden" name="form_token" value=")[^"]*(")')
ALTERNATE = re.compile(rb'<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">')
# The languages the site is published in (i18n/locales.json): English at /, every other language
# with the same pages under /<locale>/, and each indexed page's hreflang links name every version,
# English as x-default.
REGISTRY = json.loads((root / 'i18n' / 'locales.json').read_text())
SOURCE_LOCALE = REGISTRY['source']
ALL_LOCALES = list(REGISTRY['locales'])
LOCALES = [code for code in ALL_LOCALES if code != SOURCE_LOCALE]
# The tag each version carries in <html lang> and hreflang: the registry's `lang` where the
# address prefix is not the tag itself (pt-br -> pt-BR), the code otherwise (scripts/locales.mjs).
LANG_TAGS = {code: REGISTRY['locales'][code].get('lang', code) for code in ALL_LOCALES}
ORIGIN = 'https://passioncode.ai'
HTML_LANG = re.compile(rb'<html lang="([^"]+)">')

def fetch(path):
    # urllib is denied by the live edge (403); use the existing curl transport.
    # No -L: redirect destinations must be inspected without following them.
    with tempfile.TemporaryDirectory(prefix='site-live-') as directory:
        body = Path(directory) / 'body'
        header_file = Path(directory) / 'headers'
        status = subprocess.check_output([
            'curl', '--silent', '--show-error', '--max-time', '30',
            '--proto', '=http,https', '--dump-header', str(header_file),
            '--output', str(body), '--write-out', '%{http_code}',
            args.base_url.rstrip('/') + path,
        ], text=True)
        headers = {}
        for line in header_file.read_text().splitlines():
            if line.startswith('HTTP/'):
                headers = {}
            elif ':' in line:
                name, value = line.split(':', 1)
                headers[name.lower()] = value.strip()
        return int(status), headers, body.read_bytes()

for file in files:
    relative = file.relative_to(root / 'dist').as_posix()
    path = '/' + (relative[:-10] if relative.endswith('index.html') else relative)
    locale = next((l for l in LOCALES if relative.startswith(l + '/')), SOURCE_LOCALE)
    source = relative[len(locale) + 1:] if locale != SOURCE_LOCALE else relative
    # The not-found page is what an unknown address returns, with 404 (worker/index.js
    # NOT_FOUND_PAGE); its own address answers the same way, so fetch one that cannot exist —
    # under /<locale>/ for another language's, which the Worker serves for unknown addresses there.
    not_found = source == '404.html'
    expected_status = 404 if not_found else 200
    status, headers, body = fetch(('' if locale == SOURCE_LOCALE else f'/{locale}') + '/__verify-live-missing__/' if not_found else path)
    local_bytes = file.read_bytes()
    if source == 'business/index.html':
        # The Worker writes a fresh signed form token into every render (docs/DEPLOYMENT.md
        # "Commercial enquiries"); compare the page with that one value blanked.
        body = FORM_TOKEN.sub(rb'\1\2', body)
    local = hashlib.sha256(local_bytes).hexdigest()
    actual = hashlib.sha256(body).hexdigest()
    row = {'path': path, 'status': status, 'expectedSha256': local,
           'actualSha256': actual, 'pass': status == expected_status and local == actual}
    if relative.endswith('.html'):
        row['locale'] = locale
        lang = HTML_LANG.search(body)
        row['pass'] = row['pass'] and bool(lang) and lang.group(1).decode() == LANG_TAGS[locale]
        # A page that search engines list names its language versions, English as the default.
        if b'content="index, follow"' in local_bytes:
            route = '/' + (source[:-10] if source.endswith('index.html') else source)
            expected = [f'{LANG_TAGS.get(l, l)} {ORIGIN}{"" if l in (SOURCE_LOCALE, "x-default") else "/" + l}{route}' for l in [*ALL_LOCALES, 'x-default']]
            row['hreflang'] = [f'{m[0].decode()} {m[1].decode()}' for m in ALTERNATE.findall(body)]
            row['pass'] = row['pass'] and row['hreflang'] == expected
    rows.append(row)
# Every download route the Worker serves, against the committed release snapshot (the live one is
# never older: worker/releases.js mergeSnapshots keeps it as the floor).
snapshot = json.loads((root / 'releases' / 'current.json').read_text())
routes = [(key, platform, asset['url']) for key, entry in snapshot['products'].items()
          for platform, asset in (entry.get('assets') or {}).items()]
for product, platform, expected in routes:
    path = f'/{product}/download/{platform}'
    status, headers, _ = fetch(path)
    rows.append({'path': path, 'status': status, 'location': headers.get('location'),
                 'pass': status == 302 and headers.get('location') == expected
                 and headers.get('cache-control') == 'no-store'
                 and headers.get('x-robots-tag') == 'noindex'})
not_found_paths = ['/docs/HANDOFF.md', '/.git/config', '/package.json', '/404', '/404.html', *(f'/{l}{p}' for l in LOCALES for p in ('/404', '/404.html'))]
for path in not_found_paths:
    status, _, _ = fetch(path)
    rows.append({'path': path, 'status': status, 'pass': status == 404})
result = {'checkedAt': datetime.now(timezone.utc).isoformat(), 'baseUrl': args.base_url,
          'sourceCommit': subprocess.check_output(['git', '-C', str(root), 'rev-parse', 'HEAD'], text=True).strip(),
          'checks': rows, 'pass': all(row['pass'] for row in rows)}
output = Path(args.output)
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(result, indent=2) + '\n')
pages = [r for r in rows if 'locale' in r]
by_locale = ', '.join(f"{l} {sum(1 for r in pages if r['locale'] == l)}" for l in ALL_LOCALES)
print(('PASS' if result['pass'] else 'FAIL') + f': {len(files)} assets ({len(pages)} pages: {by_locale}; hreflang on {sum(1 for r in rows if "hreflang" in r)}), {len(routes)} download routes and {len(not_found_paths)} not-found addresses; {output}')
raise SystemExit(0 if result['pass'] else 1)
