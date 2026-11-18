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
  'story/index.html', 'story/story.css', 'story/story.js', 'story/store.js', 'story/field.js', 'story/rain.js', 'story/voice.js', 'story/matrix.css', 'story/ink.css', 'story/v2.css', 'story/v3.css', 'story/cast.js', 'story/comic/comic.css', 'story/comic/comic.js', 'story/comic/sound.js', 'story/comic/pager.js', 'story/comic/rail.js', 'story/voice/script.json', 'story/vendor/scrolly-video.js', 'story/vendor/scrolly-video.LICENSE',
  'story/film/film.css', 'story/film/film.js', 'story/film/standin.mp4', 'story/film/poster.jpg',
  'design-system/tokens.css', 'assets/passioncode-mark.svg', 'assets/favicon-64.png'
]

rmSync(out, { recursive: true, force: true })
for (const f of files) {
  mkdirSync(dirname(join(out, f)), { recursive: true })
  cpSync(join(root, f), join(out, f))
}
// The generated cast portraits (SITE-068 v2, Asset Foundry character-new trial)
cpSync(join(root, 'story/cast'), join(out, 'story/cast'), { recursive: true })
// The film treatment for the operator (SITE-068 v2, 2026-11-18): the page and, when rendered locally, its PDF
cpSync(join(root, 'story/treatment'), join(out, 'story/treatment'), { recursive: true })
// W12: Morpheus's recorded lines and the interface sounds (Asset Foundry), mp3
cpSync(join(root, 'story/comic/audio'), join(out, 'story/comic/audio'), { recursive: true })
// v4 the comic is the root (the operator, 2026-11-18); the scroll story with the side chat stays at /v3/
writeFileSync(join(out, 'index.html'), readFileSync(join(root, 'story/comic/index.html')))
mkdirSync(join(out, 'v3'), { recursive: true })
writeFileSync(join(out, 'v3/index.html'), readFileSync(join(root, 'story/index.html')))
// Variation 2 «Ink» at /v2/: the same page, html.ink on top of html.matrix (refactor 2026-11-17, F15)
mkdirSync(join(out, 'v2'), { recursive: true })
const page = readFileSync(join(root, 'story/index.html'), 'utf8')
if (!page.includes('class="matrix v3"')) throw new Error('build-assessment: story/index.html lost html.matrix.v3; /v2/ cannot be written')
writeFileSync(join(out, 'v2/index.html'), page.replace('class="matrix v3"', 'class="matrix v3 ink"'))
// The v2 layout (chat column, framed scene) kept for comparison at /layout-v2/ (SITE-068 v3, 2026-11-18)
mkdirSync(join(out, 'layout-v2'), { recursive: true })
writeFileSync(join(out, 'layout-v2/index.html'), page.replace('class="matrix v3"', 'class="matrix"'))
// Variant B, the scroll cartoon, at /film/
mkdirSync(join(out, 'film'), { recursive: true })
writeFileSync(join(out, 'film/index.html'), readFileSync(join(root, 'story/film/index.html')))
for (const f of ['story/film/film-en.mp4', 'story/film/film-ru.mp4', 'story/film/timeline.json', 'story/film/future-office.jpg']) { try { cpSync(join(root, f), join(out, f)) } catch {} } // the film's cut (story/film/cut.py), once it exists
writeFileSync(join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n')
writeFileSync(join(out, '_headers'), [
  '/*',
  '  X-Robots-Tag: noindex, nofollow',
  '  X-Content-Type-Options: nosniff',
  '  Referrer-Policy: strict-origin-when-cross-origin',
  '  X-Frame-Options: DENY',
  ''
].join('\n'))
console.log(`build-assessment: ${files.length + 4} files in dist-assessment/`)
