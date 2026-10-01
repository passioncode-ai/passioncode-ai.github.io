#!/usr/bin/env python3
"""Compare a built static artifact and its download routes with a deployed site."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
from urllib.error import HTTPError
from urllib.request import build_opener, HTTPRedirectHandler, Request
from datetime import datetime, timezone

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--base-url', default='https://passioncode.ai')
parser.add_argument('--output', required=True, help='Receipt JSON path outside dist/')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
files = sorted(path for path in (root / 'dist').rglob('*') if path.is_file())
if not files:
    parser.error('Run npm run build first; dist has no files')
opener = build_opener(NoRedirect)
rows = []

def fetch(path):
    try:
        response = opener.open(Request(args.base_url.rstrip('/') + path), timeout=30)
    except HTTPError as error:
        response = error
    with response:
        return response.status, response.headers, response.read()

for file in files:
    relative = file.relative_to(root / 'dist').as_posix()
    path = '/' + (relative[:-10] if relative.endswith('index.html') else relative)
    status, headers, body = fetch(path)
    local = hashlib.sha256(file.read_bytes()).hexdigest()
    actual = hashlib.sha256(body).hexdigest()
    rows.append({'path': path, 'status': status, 'expectedSha256': local,
                 'actualSha256': actual, 'pass': status == 200 and local == actual})
for product in ('switchboard', 'fabric', 'inbox'):
    manifest = json.loads((root / product / 'release.json').read_text())
    for platform, expected in manifest['downloads'].items():
        path = f'/{product}/download/{platform}'
        status, headers, _ = fetch(path)
        rows.append({'path': path, 'status': status, 'location': headers.get('Location'),
                     'pass': status == 302 and headers.get('Location') == expected
                     and headers.get('Cache-Control') == 'no-store'
                     and headers.get('X-Robots-Tag') == 'noindex'})
for path in ('/docs/HANDOFF.md', '/.git/config', '/package.json'):
    status, _, _ = fetch(path)
    rows.append({'path': path, 'status': status, 'pass': status == 404})
result = {'checkedAt': datetime.now(timezone.utc).isoformat(), 'baseUrl': args.base_url,
          'sourceCommit': subprocess.check_output(['git', '-C', str(root), 'rev-parse', 'HEAD'], text=True).strip(),
          'checks': rows, 'pass': all(row['pass'] for row in rows)}
output = Path(args.output)
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(result, indent=2) + '\n')
print(('PASS' if result['pass'] else 'FAIL') + f': {len(files)} assets, 4 download routes and 3 private-path exclusions; {output}')
raise SystemExit(0 if result['pass'] else 1)
