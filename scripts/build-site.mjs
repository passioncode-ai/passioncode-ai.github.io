import { cpSync, mkdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const output = resolve(root, 'dist')

const publicFiles = [
  'index.html',
  'styles.css',
  'switchboard/index.html',
  'fabric/index.html',
  'fabric/release.json',
  'assets/fabric-home.jpg',
  'assets/fabric-board.jpg',
  'assets/fabric-releases.jpg',
  'switchboard/release.json',
  'observatory/index.html',
  'inbox/index.html',
  'assets/inbox-mark.svg',
  'design-system/index.html',
  'design-system/tokens.css',
  'assets/switchboard-mark.svg',
  'assets/switchboard-demo.jpg',
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
