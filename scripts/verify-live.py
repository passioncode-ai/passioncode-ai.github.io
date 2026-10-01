#!/usr/bin/env python3
"""Compare a built static artifact and its download routes with a deployed site."""
import argparse
import hashlib
import json
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
        rows.append({'path': path, 'status': status, 'location': headers.get('location'),
                     'pass': status == 302 and headers.get('location') == expected
                     and headers.get('cache-control') == 'no-store'
                     and headers.get('x-robots-tag') == 'noindex'})
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
