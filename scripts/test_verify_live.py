"""SITE-073: scripts/verify-live.py says FAIL for a regression and PASS for what the Worker legitimately serves:
a newer release snapshot, the guide-only languages, the digest and Cloudflare's managed robots.txt block."""
import hashlib
import importlib.util
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location('verify_live', Path(__file__).with_name('verify-live.py'))
vl = importlib.util.module_from_spec(spec)
spec.loader.exec_module(vl)


def snap(version, tag=None, repo='passioncode-ai/fabric', platforms=('macos',)):
    tag = tag or f'v{version}'
    return {'version': version, 'tag': tag, 'repository': repo,
            'assets': {p: {'url': f'https://github.com/{repo}/releases/download/{tag}/F-{version}-{p}'} for p in platforms}}


POLICIES = {'fabric': {'repository': 'passioncode-ai/fabric'}}
COMMITTED = {'schema': 'releases/1', 'products': {'fabric': snap('0.3.16')}}


class VersionTests(unittest.TestCase):
    def test_semver_precedence(self):
        self.assertEqual(vl.compare_versions('0.3.24', '0.3.16'), 1)
        self.assertEqual(vl.compare_versions('v1.0.0', '1.0.0'), 0)
        self.assertEqual(vl.compare_versions('1.0.0-beta.2', '1.0.0'), -1)
        self.assertEqual(vl.compare_versions('1.0.0-beta.10', '1.0.0-beta.2'), 1)
        self.assertEqual(vl.compare_versions('1.0.0-alpha', '1.0.0-1'), 1)
        with self.assertRaises(ValueError):
            vl.compare_versions('latest', '1.0.0')


class SnapshotTests(unittest.TestCase):
    def rows(self, live, policies=POLICIES):
        return {r['path']: r['pass'] for r in vl.snapshot_rows(live, COMMITTED, policies)}

    def test_newer_live_release_passes(self):
        self.assertTrue(all(self.rows({'schema': 'releases/1', 'products': {'fabric': snap('0.3.24')}}).values()))

    def test_live_below_the_committed_floor_fails(self):
        self.assertFalse(self.rows({'schema': 'releases/1', 'products': {'fabric': snap('0.3.15')}})['/api/releases fabric'])

    def test_a_held_tag_may_go_below_the_floor(self):
        policies = {'fabric': {'repository': 'passioncode-ai/fabric', 'hold': 'v0.3.10'}}
        self.assertTrue(self.rows({'schema': 'releases/1', 'products': {'fabric': snap('0.3.10')}}, policies)['/api/releases fabric'])

    def test_missing_product_foreign_url_and_bad_schema_fail(self):
        self.assertFalse(self.rows({'schema': 'releases/1', 'products': {}})['/api/releases fabric'])
        self.assertFalse(self.rows({'schema': 'releases/1', 'products': {'fabric': snap('0.3.24', repo='someone/else')}})['/api/releases fabric'])
        self.assertFalse(self.rows({'products': {}})['/api/releases'])
        self.assertFalse(self.rows(None)['/api/releases'])

    def test_download_routes_take_the_served_url_and_keep_every_committed_platform(self):
        live = {'products': {'fabric': snap('0.3.24', platforms=('macos', 'windows-x64'))}}
        committed = {'products': {'fabric': snap('0.3.16', platforms=('macos', 'linux-x64-deb'))}}
        routes = {(p, k): u for p, k, u in vl.download_routes(live, committed)}
        self.assertTrue(routes[('fabric', 'macos')].endswith('/v0.3.24/F-0.3.24-macos'))
        self.assertIsNone(routes[('fabric', 'linux-x64-deb')])  # served snapshot lost a route: that route fails
        self.assertIn(('fabric', 'windows-x64'), routes)


OWN = b'User-agent: *\nAllow: /\n\nSitemap: https://passioncode.ai/sitemap.xml\n'
MANAGED = (b'# As a condition of accessing this website...\n\n# BEGIN Cloudflare Managed content\n\n'
           b'User-agent: *\nContent-Signal: search=yes,ai-train=no\nAllow: /\n\nUser-agent: GPTBot\nDisallow: /\n\n'
           b'# END Cloudflare Managed Content\n\n')


class RobotsTests(unittest.TestCase):
    def test_our_file_alone_passes(self):
        self.assertTrue(vl.robots_row('/robots.txt', 200, OWN, OWN)['pass'])

    def test_cloudflare_managed_block_before_our_lines_passes(self):
        row = vl.robots_row('/robots.txt', 200, MANAGED + OWN, OWN)
        self.assertTrue(row['pass'])
        self.assertTrue(row['managedByCloudflare'])

    def test_our_lines_changed_fail(self):
        self.assertFalse(vl.robots_row('/robots.txt', 200, MANAGED + OWN.replace(b'Allow', b'Disallow'), OWN)['pass'])
        self.assertFalse(vl.robots_row('/robots.txt', 200, MANAGED, OWN)['pass'])
        self.assertFalse(vl.robots_row('/robots.txt', 404, OWN, OWN)['pass'])

    def test_managed_block_that_hides_the_site_from_every_crawler_fails(self):
        blocking = MANAGED.replace(b'Content-Signal: search=yes,ai-train=no\nAllow: /', b'Disallow: /')
        self.assertFalse(vl.robots_row('/robots.txt', 200, blocking + OWN, OWN)['pass'])
        grouped = MANAGED.replace(b'User-agent: GPTBot\n', b'User-agent: GPTBot\nUser-agent: *\n')
        self.assertFalse(vl.robots_row('/robots.txt', 200, grouped + OWN, OWN)['pass'])


PAGE = b'<!doctype html><html lang="de"><head><link rel="alternate" hreflang="en" href="https://passioncode.ai/x/"></head></html>'


def expect(body, **extra):
    return {'sha256': hashlib.sha256(body).hexdigest(), 'locale': 'de', 'lang': 'de', 'dir': None,
            'hreflang': ['en https://passioncode.ai/x/'], **extra}


class PageTests(unittest.TestCase):
    def test_identical_page_passes(self):
        self.assertTrue(vl.page_row('/de/x/', 200, PAGE, expect(PAGE), 200)['pass'])

    def test_changed_bytes_status_lang_dir_or_hreflang_fail(self):
        self.assertFalse(vl.page_row('/de/x/', 200, PAGE + b' ', expect(PAGE), 200)['pass'])
        self.assertFalse(vl.page_row('/de/x/', 404, PAGE, expect(PAGE), 200)['pass'])
        self.assertFalse(vl.page_row('/de/x/', 200, PAGE, expect(PAGE, lang='fr'), 200)['pass'])
        self.assertFalse(vl.page_row('/de/x/', 200, PAGE, expect(PAGE, dir='rtl'), 200)['pass'])
        self.assertFalse(vl.page_row('/de/x/', 200, PAGE, expect(PAGE, hreflang=[]), 200)['pass'])

    def test_rtl_page_and_unasserted_hreflang(self):
        rtl = PAGE.replace(b'<html lang="de">', b'<html lang="ar" dir="rtl">')
        self.assertTrue(vl.page_row('/ar/x/', 200, rtl, expect(rtl, locale='ar', lang='ar', dir='rtl', hreflang=None), 200)['pass'])

    def test_form_token_is_blanked_before_comparing(self):
        built = b'<html lang="de"><input type="hidden" name="form_token" value=""></html>'
        served = built.replace(b'value=""', b'value="abc.def"')
        self.assertTrue(vl.page_row('/de/business/', 200, served, expect(built, hreflang=None), 200)['pass'])


if __name__ == '__main__':
    unittest.main()
