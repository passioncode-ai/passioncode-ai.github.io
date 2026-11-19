#!/usr/bin/env python3
"""Compare a built static artifact and its download routes with a deployed site, and smoke-test the
request intake in its dry-run mode only (docs/DEPLOYMENT.md#requests-from-a-coding-agent): a token,
a valid request and a refused one, none of which stores a lead or sends an email.

SITE-073: the Worker rewrites every page with the release snapshot it serves now (GET /api/releases,
worker/live.js), which is newer than releases/current.json between syncs. The expected bytes of a page
are therefore the built file rewritten with that live snapshot (scripts/verify-live-expect.mjs, the same
rule as the Worker), the download routes are checked against it, and the snapshot itself must not be
below the committed one (worker/releases.js mergeSnapshots keeps that as the floor). The guide-only
languages (i18n/scoped-locales.json, held versions included) and the English-only digest have their own
hreflang lists, and robots.txt may carry Cloudflare's managed block before our own lines."""
import argparse
import hashlib
import json
import re
import subprocess
import tempfile
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://passioncode.ai'
FORM_TOKEN = re.compile(rb'(<input type="hidden" name="form_token" value=")[^"]*(")')
ALTERNATE = re.compile(rb'<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">')
HTML_TAG = re.compile(rb'<html lang="([^"]+)"(?: dir="([^"]+)")?>')
SEMVER = re.compile(r'^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$')
# Cloudflare's managed robots.txt (AI crawl control) goes before the file's own lines, between these markers.
MANAGED_START = b'# BEGIN Cloudflare Managed content'
MANAGED_END = b'# END Cloudflare Managed Content'


def parse_version(tag):
    m = SEMVER.match(str(tag or '').strip())
    if not m:
        return None
    return (int(m[1]), int(m[2]), int(m[3]), m[4].split('.') if m[4] else [])


def compare_versions(a, b):
    """Semantic Versioning 2.0.0 precedence, as worker/releases.js compareVersions."""
    x, y = parse_version(a), parse_version(b)
    if x is None or y is None:
        raise ValueError(f'not a version: {a if x is None else b}')
    if x[:3] != y[:3]:
        return -1 if x[:3] < y[:3] else 1
    px, py = x[3], y[3]
    if not px or not py:
        return 0 if len(px) == len(py) else (-1 if px else 1)
    for i in range(max(len(px), len(py))):
        if i >= len(px):
            return -1
        if i >= len(py):
            return 1
        a_num, b_num = px[i].isdigit(), py[i].isdigit()
        if a_num and b_num and int(px[i]) != int(py[i]):
            return -1 if int(px[i]) < int(py[i]) else 1
        if a_num != b_num:
            return -1 if a_num else 1
        if px[i] != py[i]:
            return -1 if px[i] < py[i] else 1
    return 0


def snapshot_rows(live, committed, policies):
    """The served snapshot is valid, names every committed product and never one below the committed floor
    unless a policy holds that tag on purpose; its download URLs stay in the product's own repository."""
    rows = []
    products = (live or {}).get('products') if isinstance(live, dict) else None
    ok_schema = isinstance(products, dict) and live.get('schema') == 'releases/1'
    rows.append({'path': '/api/releases', 'pass': ok_schema, 'note': 'schema releases/1'})
    if not ok_schema:
        return rows
    for key, floor in committed['products'].items():
        entry = products.get(key)
        policy = policies.get(key, {})
        held = bool(policy.get('hold')) and entry is not None and entry.get('tag') == policy['hold']
        row = {'path': f'/api/releases {key}', 'committed': floor['version'], 'live': entry and entry.get('version')}
        try:
            row['pass'] = entry is not None and (held or compare_versions(entry['version'], floor['version']) >= 0)
        except ValueError:
            row['pass'] = False
        prefix = f"https://github.com/{policy.get('repository', floor['repository'])}/releases/download/"
        assets = (entry or {}).get('assets') or {}
        row['pass'] = row['pass'] and all(isinstance(a, dict) and str(a.get('url', '')).startswith(prefix) for a in assets.values())
        rows.append(row)
    return rows


def download_routes(live, committed):
    """Every download route: each platform of the committed snapshot and of the served one, with the URL the
    served snapshot names (None when it names none, which fails the route)."""
    routes = []
    for key in sorted(set(committed['products']) | set(live['products'])):
        mine = (committed['products'].get(key) or {}).get('assets') or {}
        served = (live['products'].get(key) or {}).get('assets') or {}
        for platform in sorted(set(mine) | set(served)):
            routes.append((key, platform, (served.get(platform) or {}).get('url')))
    return routes


def split_robots(body):
    """(managed block or b'', our own lines). The managed block is Cloudflare's legal header plus the lines
    between its BEGIN and END markers; everything after END is the file we deployed."""
    end = body.find(MANAGED_END)
    if end < 0 or body.find(MANAGED_START) < 0 or body.find(MANAGED_START) > end:
        return b'', body
    after = end + len(MANAGED_END)
    rest = body[after:]
    return body[:after], rest.lstrip(b'\r\n')


def managed_blocks_search(managed):
    """True when the managed block disallows the whole site to every crawler (User-agent: * with
    Disallow: /), which would hide the site from search engines whatever our own lines say."""
    groups, agents, rules, in_rules = [], [], [], False
    for raw in managed.decode('utf-8', 'replace').splitlines():
        line = raw.split('#', 1)[0].strip()
        if not line or ':' not in line:
            continue
        name, value = (part.strip() for part in line.split(':', 1))
        if name.lower() == 'user-agent':
            if in_rules:
                groups.append((agents, rules))
                agents, rules, in_rules = [], [], False
            agents.append(value)
        else:
            in_rules = True
            rules.append((name.lower(), value))
    if agents:
        groups.append((agents, rules))
    return any('*' in group and ('disallow', '/') in rules for group, rules in groups)


def robots_row(path, status, body, local_bytes):
    managed, own = split_robots(body)
    row = {'path': path, 'status': status, 'managedByCloudflare': bool(managed),
           'expectedSha256': hashlib.sha256(local_bytes).hexdigest(), 'actualSha256': hashlib.sha256(own).hexdigest()}
    row['pass'] = status == 200 and own == local_bytes and not (managed and managed_blocks_search(managed))
    return row


def page_row(path, status, body, expect, expected_status):
    """One page against its expectation from scripts/verify-live-expect.mjs."""
    # The Worker writes a fresh signed form token into every render of /business/ (docs/DEPLOYMENT.md
    # "Commercial enquiries"); compare the page with that one value blanked, as the build leaves it.
    body = FORM_TOKEN.sub(rb'\1\2', body)
    actual = hashlib.sha256(body).hexdigest()
    row = {'path': path, 'status': status, 'expectedSha256': expect['sha256'], 'actualSha256': actual,
           'pass': status == expected_status and actual == expect['sha256']}
    if 'lang' in expect:
        row['locale'] = expect['locale']
        if expect.get('scoped'):
            row['scoped'] = True
        if expect.get('held'):
            row['held'] = True
        tag = HTML_TAG.search(body)
        lang_ok = bool(tag) and tag.group(1).decode() == expect['lang'] and (tag.group(2) or b'').decode() == (expect.get('dir') or '')
        row['pass'] = row['pass'] and lang_ok
        if expect.get('hreflang') is not None:
            row['hreflang'] = [f'{m[0].decode()} {m[1].decode()}' for m in ALTERNATE.findall(body)]
            row['pass'] = row['pass'] and row['hreflang'] == expect['hreflang']
    return row


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-url', default=ORIGIN)
    parser.add_argument('--output', required=True, help='Receipt JSON path outside dist/')
    args = parser.parse_args()
    files = sorted(path for path in (ROOT / 'dist').rglob('*') if path.is_file())
    if not files:
        parser.error('Run npm run build first; dist has no files')
    registry = json.loads((ROOT / 'i18n' / 'locales.json').read_text())
    source_locale = registry['source']
    all_locales = list(registry['locales'])
    locales = [code for code in all_locales if code != source_locale]

    def fetch(path, data=None):
        # urllib is denied by the live edge (403); use the existing curl transport.
        # No -L: redirect destinations must be inspected without following them.
        with tempfile.TemporaryDirectory(prefix='site-live-') as directory:
            body = Path(directory) / 'body'
            header_file = Path(directory) / 'headers'
            status = subprocess.check_output([
                'curl', '--silent', '--show-error', '--max-time', '30',
                '--proto', '=http,https', '--dump-header', str(header_file),
                '--output', str(body), '--write-out', '%{http_code}',
                *(['--request', 'POST', '--header', 'Content-Type: application/json', '--data-binary', data] if data is not None else []),
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

    rows = []
    committed = json.loads((ROOT / 'releases' / 'current.json').read_text())
    policies = json.loads((ROOT / 'releases' / 'products.json').read_text())['products']
    status, _, body = fetch('/api/releases')
    try:
        live = json.loads(body) if status == 200 else None
    except ValueError:
        live = None
    rows.extend(snapshot_rows(live, committed, policies))
    if not rows[0]['pass']:
        live = committed  # nothing to compare against: the page rows then show what differs
    with tempfile.TemporaryDirectory(prefix='site-live-') as directory:
        snapshot_file = Path(directory) / 'snapshot.json'
        snapshot_file.write_text(json.dumps(live))
        expected = {row['file']: row for row in json.loads(subprocess.check_output(
            ['node', str(ROOT / 'scripts' / 'verify-live-expect.mjs'), str(snapshot_file), str(ROOT / 'dist')], text=True))}

    for file in files:
        relative = file.relative_to(ROOT / 'dist').as_posix()
        path = '/' + (relative[:-10] if relative.endswith('index.html') else relative)
        if relative == 'robots.txt':
            status, _, body = fetch(path)
            rows.append(robots_row(path, status, body, file.read_bytes()))
            continue
        locale = next((l for l in locales if relative.startswith(l + '/')), source_locale)
        source = relative[len(locale) + 1:] if locale != source_locale else relative
        # The not-found page is what an unknown address returns, with 404 (worker/index.js
        # NOT_FOUND_PAGE); its own address answers the same way, so fetch one that cannot exist,
        # under /<locale>/ for another language's, which the Worker serves for unknown addresses there.
        not_found = source == '404.html'
        status, _, body = fetch(('' if locale == source_locale else f'/{locale}') + '/__verify-live-missing__/' if not_found else path)
        rows.append(page_row(path, status, body, expected[relative], 404 if not_found else 200))

    # Every download route the Worker serves, against the snapshot it serves (checked above against the floor).
    routes = download_routes(live, committed)
    for product, platform, url in routes:
        path = f'/{product}/download/{platform}'
        status, headers, _ = fetch(path)
        rows.append({'path': path, 'status': status, 'location': headers.get('location'),
                     'pass': url is not None and status == 302 and headers.get('location') == url
                     and headers.get('cache-control') == 'no-store'
                     and headers.get('x-robots-tag') == 'noindex'})
    # The request intake, as a coding agent reaches it (no browser, no Origin), in dry-run mode only:
    # nothing is stored, no token is spent, no email is sent. Never a real lead in production.
    status, headers, body = fetch('/api/leads/token')
    token = json.loads(body or b'{}').get('form_token', '') if status == 200 else ''
    rows.append({'path': '/api/leads/token', 'status': status, 'pass': status == 200 and bool(token) and headers.get('cache-control') == 'no-store'})
    time.sleep(4)
    smoke = {'id': str(uuid.uuid4()), 'lang': 'en', 'form_token': token,
             'contact': {'email': 'verify-live@example.com', 'message': 'Dry-run smoke test from scripts/verify-live.py; never stored.'},
             'goals': ['cost_and_results'], 'source': {'channel': 'agent-prompt', 'agent': 'verify-live'}}
    status, _, body = fetch('/api/leads?dry_run=1', json.dumps(smoke))
    answer = json.loads(body or b'{}')
    rows.append({'path': '/api/leads?dry_run=1 (valid agent request)', 'status': status, 'answer': answer.get('status'),
                 'pass': status == 200 and answer.get('status') == 'valid' and answer.get('dryRun') is True and answer.get('lead', {}).get('schema') == 'lead/2'})
    refused = {**smoke, 'contact': {'message': smoke['contact']['message']}}
    status, _, body = fetch('/api/leads?dry_run=1', json.dumps(refused))
    answer = json.loads(body or b'{}')
    rows.append({'path': '/api/leads?dry_run=1 (no email)', 'status': status, 'issues': [i.get('path') for i in answer.get('issues', [])],
                 'pass': status == 400 and [i.get('path') for i in answer.get('issues', [])] == ['contact.email']})
    not_found_paths = ['/docs/HANDOFF.md', '/.git/config', '/package.json', '/404', '/404.html', *(f'/{l}{p}' for l in locales for p in ('/404', '/404.html'))]
    for path in not_found_paths:
        status, _, _ = fetch(path)
        rows.append({'path': path, 'status': status, 'pass': status == 404})
    # A release published while this ran changes the pages under it: say so instead of a page failure.
    status, _, body = fetch('/api/releases')
    try:
        after = json.loads(body) if status == 200 else None
    except ValueError:
        after = None
    stable = after is not None and {k: v.get('version') for k, v in (after.get('products') or {}).items()} == {k: v.get('version') for k, v in live['products'].items()}
    rows.append({'path': '/api/releases (unchanged during the run)', 'status': status, 'pass': stable})

    result = {'checkedAt': datetime.now(timezone.utc).isoformat(), 'baseUrl': args.base_url,
              'sourceCommit': subprocess.check_output(['git', '-C', str(ROOT), 'rev-parse', 'HEAD'], text=True).strip(),
              'liveVersions': {k: v.get('version') for k, v in live['products'].items()},
              'checks': rows, 'pass': all(row['pass'] for row in rows)}
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, indent=2) + '\n')
    pages = [r for r in rows if 'locale' in r]
    seen = list(dict.fromkeys(r['locale'] for r in pages))
    by_locale = ', '.join(f"{l} {sum(1 for r in pages if r['locale'] == l)}" for l in seen)
    failed = [r['path'] for r in rows if not r['pass']]
    print(('PASS' if result['pass'] else f'FAIL ({len(failed)}: {", ".join(failed[:10])}{" ..." if len(failed) > 10 else ""})')
          + f': {len(files)} assets ({len(pages)} pages: {by_locale}; hreflang on {sum(1 for r in rows if r.get("hreflang"))}), '
          + f'{len(routes)} download routes, {len(not_found_paths)} not-found addresses and the intake in dry-run mode; {output}')
    return 0 if result['pass'] else 1


if __name__ == '__main__':
    raise SystemExit(main())
