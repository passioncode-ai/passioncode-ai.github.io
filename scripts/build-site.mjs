import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { PAGES } from './pages.mjs'
import { LOCALES, localizedFile } from './locales.mjs'
import { PROMPT_FILE } from './agent-prompt.mjs'

const root = resolve(import.meta.dirname, '..')
const output = resolve(root, 'dist')

const publicFiles = [
  ...PAGES,
  // The /business/ agent prompt as plain text, in every language (npm run locales writes them).
  ...LOCALES.map(locale => localizedFile(PROMPT_FILE, locale)),
  'llms.txt',
  'assets/site.js',
  'assets/business.js',
  'assets/estimate.js',
  'assets/lead-options.js',
  'assets/messages.js',
  'assets/i18n.js',
  'assets/translate.js',
  'styles.css',
  'fabric/release.json',
  'assets/fabric-home.jpg',
  'assets/fabric-board.jpg',
  'assets/fabric-releases.jpg',
  'switchboard/release.json',
  'inbox/release.json',
  'assets/inbox-mark.svg',
  'assets/dashboards-mark.svg',
  'assets/dashboards-overview.jpg',
  'assets/dashboards-service-dashboard.jpg',
  'design-system/tokens.css',
  'assets/switchboard-mark.svg',
  'assets/switchboard-demo.jpg',
  'assets/switchboard-accounts.jpg',
  'assets/observatory-mark.svg',
  'assets/observatory-demo.jpg',
  'assets/observatory-overview.jpg',
  'assets/observatory-overview-ru.jpg',
  'assets/inbox-overview.jpg',
  'assets/inbox-overview-ru.jpg',
  'assets/journey-2-2.jpg',
  'assets/journey-2-2-ru.jpg',
  'assets/journey-3-1.jpg',
  'assets/journey-3-1-ru.jpg',
  'assets/journey-3-2.jpg',
  'assets/journey-3-2-ru.jpg',
  'assets/journey-3-3.jpg',
  'assets/journey-3-3-ru.jpg',
  'assets/journey-3-4.jpg',
  'assets/journey-3-4-ru.jpg',
  // The home video (SITE-028 W10): the English and Russian cuts, their posters, and captions in
  // every language (v2 since SITE-043: docs/video/2026-10-12-home-v2/README.md).
  ...['', '-ru'].flatMap(suffix => [`assets/video/home${suffix}.mp4`, `assets/video/home${suffix}.webm`, `assets/video/home${suffix}.jpg`]),
  ...LOCALES.map(locale => `assets/video/home${locale === 'en' ? '' : `-${locale}`}.vtt`).filter(file => existsSync(resolve(root, file))),
  'robots.txt',
  'sitemap.xml',
  'assets/passioncode-mark.svg',
  'assets/favicon-64.png',
  'assets/icon-256.png',
  'assets/icon-1024.png',
  'assets/passioncode-social-card.svg',
  'assets/passioncode-social-card.png',
  'assets/passioncode-social-card.jpg'
]

rmSync(output, { recursive: true, force: true })
mkdirSync(output, { recursive: true })

for (const file of publicFiles) {
  mkdirSync(resolve(output, file, '..'), { recursive: true })
  cpSync(resolve(root, file), resolve(output, file), { recursive: true })
}

console.log(`PASS: built ${publicFiles.length} public entries in dist/`)
