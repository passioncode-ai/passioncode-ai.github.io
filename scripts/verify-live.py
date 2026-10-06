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
    # The not-found page is what an unknown address returns, with 404 (worker/index.js
    # NOT_FOUND_PAGE); its own address answers the same way, so fetch one that cannot exist.
    expected_status = 404 if relative == '404.html' else 200
    status, headers, body = fetch('/__verify-live-missing__/' if relative == '404.html' else path)
    local_bytes = file.read_bytes()
    if path == '/business/':
        # The Worker writes a fresh signed form token into every render (docs/DEPLOYMENT.md
        # "Commercial enquiries"); compare the page with that one value blanked.
        body = FORM_TOKEN.sub(rb'\1\2', body)
    local = hashlib.sha256(local_bytes).hexdigest()
    actual = hashlib.sha256(body).hexdigest()
    rows.append({'path': path, 'status': status, 'expectedSha256': local,
                 'actualSha256': actual, 'pass': status == expected_status and local == actual})
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
for path in ('/docs/HANDOFF.md', '/.git/config', '/package.json', '/404', '/404.html'):
    status, _, _ = fetch(path)
    rows.append({'path': path, 'status': status, 'pass': status == 404})
result = {'checkedAt': datetime.now(timezone.utc).isoformat(), 'baseUrl': args.base_url,
          'sourceCommit': subprocess.check_output(['git', '-C', str(root), 'rev-parse', 'HEAD'], text=True).strip(),
          'checks': rows, 'pass': all(row['pass'] for row in rows)}
output = Path(args.output)
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(result, indent=2) + '\n')
print(('PASS' if result['pass'] else 'FAIL') + f': {len(files)} assets, {len(routes)} download routes and 5 not-found addresses; {output}')
raise SystemExit(0 if result['pass'] else 1)
