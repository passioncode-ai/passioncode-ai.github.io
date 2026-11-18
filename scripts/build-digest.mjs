// The daily AI research digest (/blog/ai-research/): one English page per post, the section's hub, the blog's RSS
// feeds and the section's own sitemap, rendered from one JSON file per post in blog/ai-research/posts/<date>.json
// (schema passioncode-digest-post/1, below). The section is English only: its pages are outside the locale system
// (scripts/pages.mjs), carry no language switch and no hreflang, and are listed in their own sitemap
// (blog/ai-research/sitemap.xml, named in robots.txt) so the site's sitemap keeps one entry per translated page.
// The writer (PassionCode's content agent) adds a post by a pull request with one JSON file; the order and the chain
// are in the agents database's design ai-research-digest (operator, 2026-11-18).
//   node scripts/build-digest.mjs [--check]
//
// passioncode-digest-post/1: { schema, date: YYYY-MM-DD, title (<= 60), description (<= 155), lead,
//   chat_summary_ru, items: [{ title, url (https), source, take, points: [..], adopt }], adopt_summary: [..],
//   sources_note, copylot_report }
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { POSTS, PUBLISHED } from './site-content.mjs'

const root = resolve(import.meta.dirname, '..')
const ORIGIN = 'https://passioncode.ai'
const SECTION = '/blog/ai-research/'
const POSTS_DIR = resolve(root, 'blog/ai-research/posts')
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const ld = data => `  <script type="application/ld+json">${JSON.stringify(data, null, 2).replace(/</g, '\\u003c')}</script>\n`
const PUBLISHER = { '@type': 'Organization', name: 'PassionCode.ai', url: `${ORIGIN}/` }
const AUTHOR = { '@type': 'Organization', name: 'PassionCode.ai', url: `${ORIGIN}/` }
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const longDate = iso => { const [y, m, d] = iso.split('-').map(Number); return `${MONTHS[m - 1]} ${d}, ${y}` }
const rfc822 = iso => new Date(`${iso}T06:00:00Z`).toUTCString()

// The site's own header and footer (from vision/index.html), English, with the language switch taken out: these
// pages exist in English only.
const vision = readFileSync(resolve(root, 'vision/index.html'), 'utf8')
const at = marker => { const i = vision.indexOf(marker); if (i < 0) throw new Error(`vision/index.html: anchor not found: ${marker}`); return i }
const SWITCH = /<a class="lang-switch"[^>]*>[^<]*<\/a>|<details class="lang-switch[^"]*">[\s\S]*?<\/details>/g
const header = vision.slice(at('<body'), at('<main id="main">')).replace(SWITCH, '')
const footer = vision.slice(at('</main>'))

export function validate (post, file) {
  const fail = why => { throw new Error(`${file}: ${why}`) }
  if (post.schema !== 'passioncode-digest-post/1') fail('schema is not passioncode-digest-post/1')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date || '')) fail('date is not YYYY-MM-DD')
  if (!file.endsWith(`${post.date}.json`)) fail('the file name is not the post date')
  for (const k of ['title', 'description', 'lead', 'chat_summary_ru', 'sources_note']) if (typeof post[k] !== 'string' || !post[k].trim()) fail(`${k} is missing`)
  if (post.title.length > 60) fail(`title is ${post.title.length} characters, more than 60`)
  if (post.description.length > 155) fail(`description is ${post.description.length} characters, more than 155`)
  if (!Array.isArray(post.items) || post.items.length < 1 || post.items.length > 7) fail('items: 1 to 7')
  for (const [i, it] of post.items.entries()) {
    for (const k of ['title', 'url', 'source', 'take', 'adopt']) if (typeof it[k] !== 'string' || !it[k].trim()) fail(`items[${i}].${k} is missing`)
    if (!/^https:\/\//.test(it.url)) fail(`items[${i}].url is not https`)
    if (!Array.isArray(it.points) || !it.points.length) fail(`items[${i}].points is empty`)
  }
  if (!Array.isArray(post.adopt_summary) || !post.adopt_summary.length) fail('adopt_summary is empty')
  if (JSON.stringify(post).includes('\u2014')) fail('an em dash (U+2014) in text for people')
  return post
}

export function loadPosts () {
  if (!existsSync(POSTS_DIR)) return []
  return readdirSync(POSTS_DIR).filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort().reverse()
    .map(f => validate(JSON.parse(readFileSync(resolve(POSTS_DIR, f), 'utf8')), `blog/ai-research/posts/${f}`))
}

function head ({ path, title, description, ogType = 'website', data }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title><meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${ORIGIN}${path}">
  <link rel="alternate" type="application/rss+xml" title="PassionCode.ai AI research digest" href="${ORIGIN}${SECTION}feed.xml">
  <meta name="robots" content="index, follow"><meta name="theme-color" content="#0a070d">
  <meta property="og:type" content="${ogType}"><meta property="og:site_name" content="PassionCode.ai">
  <meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${ORIGIN}${path}">
  <meta property="og:image" content="${ORIGIN}/assets/passioncode-social-card.png">
  <meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${ORIGIN}/assets/passioncode-social-card.png">
  <link rel="icon" type="image/svg+xml" href="/assets/passioncode-mark.svg">
  <link rel="icon" type="image/png" sizes="64x64" href="/assets/favicon-64.png">
  <link rel="apple-touch-icon" sizes="256x256" href="/assets/icon-256.png">
  <link rel="stylesheet" href="/design-system/tokens.css"><link rel="stylesheet" href="/styles.css">
  <script type="module" src="/assets/site.js"></script>
${data.map(ld).join('')}</head>
`
}
const crumbs = list => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: list.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: ORIGIN + path })) })
const breadcrumbNav = list => `<nav class="breadcrumbs" aria-label="Breadcrumb">${list.map(([name, path]) => `<a href="${path}">${esc(name)}</a>`).join('<span aria-hidden="true">/</span>')}</nav>`
const HOME = ['Home', '/']
const BLOG = ['Blog', '/blog/']
const HUB = ['AI research digest', SECTION]
const postPath = p => `${SECTION}${p.date}/`

function postPage (p, older) {
  const path = postPath(p)
  const data = [
    { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.description, url: ORIGIN + path, mainEntityOfPage: ORIGIN + path, datePublished: p.date, dateModified: p.date, inLanguage: 'en', author: AUTHOR, publisher: PUBLISHER, image: `${ORIGIN}/assets/passioncode-social-card.png`, citation: p.items.map(it => ({ '@type': 'CreativeWork', name: it.title, url: it.url })) },
    crumbs([HOME, BLOG, HUB, [p.title, path]])
  ]
  const items = p.items.map((it, i) => ` <h2 id="item-${i + 1}">${esc(it.title)}</h2>
 <p class="article-meta"><a href="${esc(it.url)}" rel="noopener">${esc(it.source)}</a></p>
 <p>${esc(it.take)}</p>
 <ul>
${it.points.map(pt => `  <li>${esc(pt)}</li>`).join('\n')}
 </ul>
 <p><strong>What we can adopt:</strong> ${esc(it.adopt)}</p>`).join('\n')
  const main = `<main id="main">
<article class="section legal article-page" aria-labelledby="hero-title">
 ${breadcrumbNav([HOME, BLOG, HUB])}
 <p class="section-number">AI research digest · <time datetime="${p.date}">${longDate(p.date)}</time></p>
 <h1 id="hero-title">${esc(p.title)}</h1>
 <p class="legal-lead">${esc(p.lead)}</p>
 <p class="article-meta">PassionCode.ai research desk</p>
${items}
 <h2 id="adopt">What we can adopt</h2>
 <ul>
${p.adopt_summary.map(a => `  <li>${esc(a)}</li>`).join('\n')}
 </ul>
 <p class="article-meta">${esc(p.sources_note)}</p>
 <div class="hero-actions article-actions"><a class="button button-primary" href="/agents/" data-cta="agents" data-cta-location="digest">Agent templates <span aria-hidden="true">→</span></a></div>
</article>
${older.length ? `
<section class="section related-templates" aria-labelledby="related-title">
 <div class="section-heading"><p class="section-number">AI RESEARCH DIGEST</p><h2 id="related-title">Earlier digests</h2></div>
 <ul class="related-list">
${older.slice(0, 7).map(o => `  <li><a href="${postPath(o)}">${esc(o.title)}</a> · <time datetime="${o.date}">${longDate(o.date)}</time></li>`).join('\n')}
  <li><a href="${SECTION}">All digests</a></li>
 </ul>
</section>` : ''}
</main>
`
  return head({ path, title: `${p.title} | PassionCode.ai`.length <= 60 ? `${p.title} | PassionCode.ai` : p.title, description: p.description, ogType: 'article', data }) + header + main + footer
}

function hubPage (posts) {
  const description = 'A daily review of new AI research on agents: what each paper measured and what an agent platform can take from it, from PassionCode.ai.'
  const data = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'AI research digest', description, url: ORIGIN + SECTION, publisher: PUBLISHER, mainEntity: { '@type': 'ItemList', itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: ORIGIN + postPath(p) })) } },
    crumbs([HOME, BLOG, HUB])
  ]
  const main = `<main id="main">
<section class="hero page-hero" aria-labelledby="hero-title">
 <div class="hero-copy">
  ${breadcrumbNav([HOME, BLOG])}
  <p class="eyebrow"><span></span> Blog · AI research digest</p>
  <h1 id="hero-title">AI research <em>digest</em></h1>
  <p class="page-lead">Every day we read new AI papers and researchers' posts on agents, memory, evaluation and tool use, and write down what each one measured and what an agent platform can take from it. Each digest links every source it quotes.</p>
  <p class="article-meta hub-byline">PassionCode.ai research desk · <a href="${SECTION}feed.xml">RSS feed</a></p>
 </div>
</section>

<section class="section" aria-labelledby="list-title">
 <h2 id="list-title" class="visually-hidden">Digests</h2>
 <div class="path-grid path-grid-two article-grid">
${posts.map(p => `  <article class="path-card reveal"><p class="availability">Digest · <time datetime="${p.date}">${longDate(p.date)}</time></p><h3><a href="${postPath(p)}" data-cta="blog" data-cta-location="digest">${esc(p.title)}</a></h3><p>${esc(p.lead)}</p><ul class="hub-topics">${p.items.map(it => `<li>${esc(it.title)}</li>`).join('')}</ul></article>`).join('\n')}
 </div>
</section>
</main>
`
  return head({ path: SECTION, title: 'AI research digest | PassionCode.ai', description, data }) + header + main + footer
}

function rss ({ title, link, description, entries }) {
  const items = entries.map(e => `  <item>
   <title>${esc(e.title)}</title>
   <link>${esc(e.link)}</link>
   <guid isPermaLink="true">${esc(e.link)}</guid>
   <pubDate>${rfc822(e.date)}</pubDate>
   <description>${esc(e.description)}</description>
  </item>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
 <channel>
  <title>${esc(title)}</title>
  <link>${esc(link)}</link>
  <atom:link href="${esc(link)}feed.xml" rel="self" type="application/rss+xml"/>
  <description>${esc(description)}</description>
  <language>en</language>
${entries.length ? `  <lastBuildDate>${rfc822(entries[0].date)}</lastBuildDate>\n` : ''}${items}
 </channel>
</rss>
`
}

export function renderDigest () {
  const posts = loadPosts()
  const files = {}
  posts.forEach((p, i) => { files[`blog/ai-research/${p.date}/index.html`] = postPage(p, posts.slice(i + 1)) })
  files['blog/ai-research/index.html'] = hubPage(posts)
  const digestEntries = posts.map(p => ({ title: p.title, link: ORIGIN + postPath(p), date: p.date, description: p.lead }))
  files['blog/ai-research/feed.xml'] = rss({ title: 'PassionCode.ai AI research digest', link: ORIGIN + SECTION, description: 'A daily review of new AI research on agents, from PassionCode.ai.', entries: digestEntries })
  const articles = POSTS.map(a => ({ title: a.name, link: `${ORIGIN}/blog/${a.slug}/`, date: PUBLISHED.iso, description: a.lead }))
  const all = [...digestEntries, ...articles].sort((a, b) => b.date.localeCompare(a.date))
  files['blog/feed.xml'] = rss({ title: 'PassionCode.ai blog', link: `${ORIGIN}/blog/`, description: 'Notes from PassionCode.ai on AI-native organizations, and the daily AI research digest.', entries: all })
  const urls = [SECTION, ...posts.map(postPath)].map(u => `<url><loc>${ORIGIN}${u}</loc>${u === SECTION ? '' : `<lastmod>${u.slice(SECTION.length, -1)}</lastmod>`}</url>`)
  files['blog/ai-research/sitemap.xml'] = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
  return files
}

// The files the build copies to dist/ (scripts/build-site.mjs).
export const DIGEST_FILES = () => Object.keys(renderDigest())

if (import.meta.main ?? process.argv[1] === import.meta.filename) {
  const files = renderDigest()
  const stale = Object.entries(files).filter(([file, body]) => !existsSync(resolve(root, file)) || readFileSync(resolve(root, file), 'utf8') !== body)
  if (process.argv.includes('--check')) {
    if (stale.length) { console.error(`${stale.map(([f]) => f).join(', ')}: stale; run node scripts/build-digest.mjs`); process.exit(1) }
    console.log(`PASS: ${Object.keys(files).length} AI research digest files are current`)
  } else {
    for (const [file, body] of stale) { mkdirSync(dirname(resolve(root, file)), { recursive: true }); writeFileSync(resolve(root, file), body); console.log(`wrote ${file}`) }
    console.log(`${Object.keys(files).length} digest files, ${stale.length} written`)
  }
}
