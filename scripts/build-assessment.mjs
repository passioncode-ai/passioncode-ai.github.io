// The story demo (SITE-068) on its own host, assessment.passioncode.ai: an allow-listed static artifact in
// dist-assessment/, served by the assets-only Worker of wrangler.assessment.json. The story is the root page;
// /story/ keeps answering so the page's own asset paths resolve. Links to the site are absolute (passioncode.ai),
// the host is noindex (robots.txt and the X-Robots-Tag header), and the main site's Worker is not touched.
import { cpSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'dist-assessment')
const files = [
  'story/index.html', 'story/story.css', 'story/story.js', 'story/store.js', 'story/field.js',
  'design-system/tokens.css', 'assets/passioncode-mark.svg', 'assets/favicon-64.png'
]

rmSync(out, { recursive: true, force: true })
for (const f of files) {
  mkdirSync(dirname(join(out, f)), { recursive: true })
  cpSync(join(root, f), join(out, f))
}
writeFileSync(join(out, 'index.html'), readFileSync(join(root, 'story/index.html')))
writeFileSync(join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n')
writeFileSync(join(out, '_headers'), [
  '/*',
  '  X-Robots-Tag: noindex, nofollow',
  '  X-Content-Type-Options: nosniff',
  '  Referrer-Policy: strict-origin-when-cross-origin',
  '  X-Frame-Options: DENY',
  ''
].join('\n'))
console.log(`build-assessment: ${files.length + 3} files in dist-assessment/`)
