// Explicit release selection: prereleases are intentional, not mistaken for stable.
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
const tag = process.argv[2]
if (!/^v\d+\.\d+\.\d+(?:-[\w.]+)?$/.test(tag ?? '')) throw new Error('Usage: node scripts/update-switchboard-release.mjs vX.Y.Z-beta.N')
const repo = 'passioncode-ai/fabric-switchboard'
const release = JSON.parse(execFileSync('gh', ['api', `repos/${repo}/releases/tags/${tag}`], {encoding:'utf8'}))
if (release.draft) throw new Error('Refusing a draft release')
const version = tag.slice(1)
const binaryVersion = version.split('-')[0]
const downloads = {}
for (const [os,suffix] of [['macos','macos-universal'],['windows','windows-x64']]) {
 const asset = release.assets.find(a => a.name === `Fabric-Switchboard-${binaryVersion}-${suffix}.zip`)
 if (!asset || !asset.size) throw new Error(`Missing ${os} archive`)
 const check = await fetch(asset.browser_download_url, {method:'HEAD',redirect:'follow'})
 if (!check.ok) throw new Error(`${os} asset is not anonymously downloadable: ${check.status}`)
 downloads[os] = asset.browser_download_url
}
const path = new URL('../switchboard/release.json',import.meta.url)
const previous = JSON.parse(readFileSync(path))
let html = readFileSync(new URL('../switchboard/index.html',import.meta.url),'utf8')
html = html.replaceAll(previous.releaseUrl,release.html_url).replaceAll(previous.version,version)
writeFileSync(path,JSON.stringify({tag,version,repository:repo,releaseUrl:release.html_url,downloads},null,2)+'\n')
writeFileSync(new URL('../switchboard/index.html',import.meta.url),html)
console.log(`Selected public ${release.prerelease ? 'beta' : 'release'} ${tag}; run npm run check, review platform notes, then deploy.`)
