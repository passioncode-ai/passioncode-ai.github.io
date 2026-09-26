import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../design-system/tokens.css', import.meta.url), 'utf8')
const block = selector => {
  const source = css.slice(css.indexOf(selector)).split('}')[0]
  return Object.fromEntries([...source.matchAll(/(--pc-[\w-]+):\s*([^;]+);/g)].map(m => [m[1],m[2]]))
}
const dark = block(':root {')
const light = {...dark,...block(':root[data-theme="light"]')}
const luminance = hex => {
  assert.match(hex, /^#[0-9a-f]{6}$/i)
  const rgb = hex.slice(1).match(/../g).map(v => parseInt(v,16)/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4)
  return rgb[0]*.2126 + rgb[1]*.7152 + rgb[2]*.0722
}
const resolve = (tokens,name) => tokens[name].startsWith('var(') ? resolve(tokens,tokens[name].slice(4,-1)) : tokens[name]
const ratio = (tokens,a,b) => {
  const values = [luminance(resolve(tokens,a)),luminance(resolve(tokens,b))].sort((a,b)=>b-a)
  return (values[0]+.05)/(values[1]+.05)
}
const pairs = [
  ...['--pc-bg','--pc-panel','--pc-panel-raised'].flatMap(bg => ['--pc-text','--pc-text-muted','--pc-link'].map(ink=>[ink,bg,4.5])),
  ['--pc-on-accent','--pc-accent',4.5],['--pc-on-accent','--pc-accent-hover',4.5],
  ...['positive','warning','negative','info'].map(s=>[`--pc-${s}`,`--pc-${s}-soft`,4.5]),
  ['--pc-focus','--pc-bg',3],['--pc-focus','--pc-panel',3]
]
let minimum = Infinity
for (const [theme,tokens] of Object.entries({dark,light})) {
  for (const [ink,bg,threshold] of pairs) {
    const result = ratio(tokens,ink,bg)
    minimum = Math.min(minimum,result)
    assert.ok(result>=threshold,`${theme}: ${ink} on ${bg} = ${result.toFixed(2)}:1 < ${threshold}`)
  }
}
assert.ok(ratio(light,'--pc-border-strong','--pc-panel')>=3,'light control border separation')
assert.equal(dark['--pc-bg'],'#0a070d')
assert.equal(dark['--pc-accent'],'#ffd21a')
console.log(`PASS: ${pairs.length*2+1} scoped token contrast pairs; minimum ${minimum.toFixed(2)}:1; not full UI conformance`)
