import { cpSync, mkdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { PAGES } from './pages.mjs'

const root = resolve(import.meta.dirname, '..')
const output = resolve(root, 'dist')

const publicFiles = [
  ...PAGES,
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
