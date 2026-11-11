// SITE-056: renders the English pages of the agent templates (/agents/ and one page per template), the guides
// (/guides/) and the blog (/blog/) from scripts/site-content.mjs. The header and the footer are the site's own, taken
// from vision/index.html, so these pages carry them unchanged; every other language is generated from these pages by
// npm run locales (docs/DEPLOYMENT.md#languages).
//   node scripts/build-content-pages.mjs [--check]
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { applyChrome } from './locales.mjs'
import { ASSEMBLY, FAMILIES, GUIDES, POSTS, PUBLISHED, TEMPLATES } from './site-content.mjs'

const root = resolve(import.meta.dirname, '..')
const ORIGIN = 'https://passioncode.ai'
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const vision = readFileSync(resolve(root, 'vision/index.html'), 'utf8')
const at = marker => { const i = vision.indexOf(marker); if (i < 0) throw new Error(`vision/index.html: anchor not found: ${marker}`); return i }
const header = vision.slice(at('<body'), at('<main id="main">'))
const footer = vision.slice(at('</main>'))
const ld = data => `  <script type="application/ld+json">${JSON.stringify(data, null, 2).replace(/</g, '\\u003c')}</script>\n`
const PUBLISHER = { '@type': 'Organization', name: 'PassionCode.ai', url: `${ORIGIN}/` }
const AUTHOR = { '@type': 'Person', '@id': `${ORIGIN}/#sergey-sheleg`, name: 'Sergey Sheleg', url: 'https://x.com/sshlg93' }
const crumbs = list => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: list.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: ORIGIN + path })) })
const breadcrumbNav = list => `<nav class="breadcrumbs" aria-label="Breadcrumb">${list.map(([name, path]) => `<a href="${path}">${esc(name)}</a>`).join('<span aria-hidden="true">/</span>')}</nav>`

function head ({ path, title, description, ogTitle, ogType = 'website', data }) {
  if (title.length > 60) throw new Error(`${path}: <title> is ${title.length} characters, more than 60`)
  if (description.length > 155) throw new Error(`${path}: meta description is ${description.length} characters, more than 155`)
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title><meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${ORIGIN}${path}">
  <meta name="robots" content="index, follow"><meta name="theme-color" content="#0a070d">
  <meta property="og:type" content="${ogType}"><meta property="og:site_name" content="PassionCode.ai">
  <meta property="og:title" content="${esc(ogTitle)}"><meta property="og:description" content="${esc(description)}">
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
const page = (sourceFile, parts) => applyChrome(head(parts) + header + parts.main + footer, { sourceFile, locale: 'en' })
const family = id => FAMILIES.find(f => f.id === id)
const HOME = ['Home', '/']
const MARKET = ['Agent templates', '/agents/']
const closing = (location, extra = '') => `<section class="closing" aria-labelledby="closing-title"><img src="/assets/passioncode-mark.svg" width="72" height="72" alt=""><p class="section-number">CREATE YOUR AGENT</p><h2 id="closing-title">Agents for your processes,<br>assembled for you</h2><p>Tell us what agents should do for your organization. We reply within two business days, and the details of each template come with the conversation.</p><div class="hero-actions closing-actions"><a class="button button-primary" href="/business/#request" data-cta="business" data-cta-location="${location}"${extra}>Create your agent <span aria-hidden="true">→</span></a><a class="button button-secondary" href="/guides/templates-to-agents/" data-cta="guides" data-cta-location="${location}">How templates become agents <span aria-hidden="true">→</span></a></div></section>`
const assembly = `<ol class="work-cycle assembly-steps">
${ASSEMBLY.map(([h, p], i) => `  <li class="reveal"><span class="cycle-number">0${i + 1}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('\n')}
 </ol>`

// ---- /agents/ -------------------------------------------------------------------------------
function marketplace () {
  const path = '/agents/'
  const title = 'Agent templates for your organization | PassionCode.ai'
  const description = 'Eighteen agent templates for operations, sales, support, analytics and media, assembled into agents that run your processes on your own machines.'
  const sections = FAMILIES.map((f, i) => {
    const cards = TEMPLATES.filter(t => t.family === f.id).map(t => `  <article class="path-card template-card reveal"><p class="availability">ON REQUEST</p><h3><a href="/agents/${t.slug}/">${esc(t.name)}</a></h3><p>${esc(t.lead)}</p></article>`).join('\n')
    return `<section class="section template-family" id="${f.anchor}" aria-labelledby="${f.anchor}-title">
 <div class="section-heading story-heading"><p class="section-number">0${i + 1} / ${esc(f.name.toUpperCase())}</p><h2 id="${f.anchor}-title">${esc(f.name)}</h2><p>${esc(f.text)}</p></div>
 <div class="path-grid template-grid">
${cards}
 </div>
</section>`
  }).join('\n\n')
  const data = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Agent templates', description, url: ORIGIN + path, isPartOf: { '@type': 'WebSite', name: 'PassionCode.ai', url: `${ORIGIN}/` }, publisher: PUBLISHER, mainEntity: { '@type': 'ItemList', name: 'Agent templates', numberOfItems: TEMPLATES.length, itemListElement: TEMPLATES.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, url: `${ORIGIN}/agents/${t.slug}/` })) } },
    crumbs([HOME, MARKET])
  ]
  const main = `<main id="main">
<section class="hero page-hero" aria-labelledby="hero-title">
 <div class="hero-copy">
  ${breadcrumbNav([HOME])}
  <p class="eyebrow"><span></span> Agent templates · on request</p>
  <h1 id="hero-title">Agents for <em>your processes</em></h1>
  <p class="hero-body">Choose the work you want agents to take. Our engineer agent assembles each template into an agent for your organization that runs on your own machines, with your keys</p>
  <div class="hero-actions"><a class="button button-primary" href="/business/#request" data-cta="business" data-cta-location="marketplace">Create your agent <span aria-hidden="true">→</span></a><a class="text-link" href="#how">How it works</a></div>
  <p class="hero-caption"><span class="status-dot" aria-hidden="true"></span> Eighteen templates in four groups <span>Details of each template on request</span></p>
 </div>
 <nav class="page-toc" aria-label="On this page">${FAMILIES.map((f, i) => `<a href="#${f.anchor}"><span>0${i + 1}</span> ${esc(f.name)}</a>`).join('')}<a href="#how"><span>→</span> How it works</a></nav>
</section>

${sections}

<section class="section" id="how" aria-labelledby="how-title">
 <div class="section-heading story-heading"><p class="section-number">HOW IT WORKS</p><h2 id="how-title">How a template<br>becomes your agent</h2><p>Each template holds what we learned running agents of that kind in our own work. We do not hand out the template: we assemble it into your agent.</p></div>
 ${assembly}
 <p class="section-note"><a href="/guides/templates-to-agents/" data-cta="guides" data-cta-location="marketplace">How agent templates become your agents</a> · <a href="/guides/free-assessment/" data-cta="guides" data-cta-location="marketplace">How the free one-week assessment works</a></p>
</section>

<section class="section faq" id="faq" aria-labelledby="faq-title">
 <div class="section-heading"><p class="section-number">QUESTIONS</p><h2 id="faq-title">Before you ask</h2></div>
 <details open><summary>Can I see a template’s code or prompts?</summary><p>No. The templates are our own library. You receive the agent assembled for your organization, and we share the details of a template when we discuss your request.</p></details>
 <details open><summary>Is a template a finished product?</summary><p>No. A template is where we start: what we learned running agents of that kind. Each agent is assembled for your processes and checked on them before it starts work.</p></details>
 <details open><summary>Where do the agents run?</summary><p>On your machines or in your own cloud, with your keys. You see what each agent does and what it spends.</p></details>
 <details open><summary>What does it cost?</summary><p>There is no fixed package. We name the price after we understand your processes, and the estimate comes before any contract.</p></details>
</section>

${closing('marketplace')}
</main>
`
  return page('agents/index.html', { path, title, description, ogTitle: 'Agent templates for your organization', data, main })
}

// ---- /agents/<slug>/ ------------------------------------------------------------------------
function template (t) {
  const path = `/agents/${t.slug}/`
  const f = family(t.family)
  const title = `${t.title} | PassionCode.ai`
  const related = TEMPLATES.filter(o => o.family === t.family && o.slug !== t.slug)
  const data = [
    { '@context': 'https://schema.org', '@type': 'Service', name: t.name, description: t.lead, serviceType: 'AI agent', url: ORIGIN + path, provider: PUBLISHER, category: f.name },
    crumbs([HOME, MARKET, [t.name, path]])
  ]
  const main = `<main id="main">
<section class="hero page-hero" aria-labelledby="hero-title">
 <div class="hero-copy">
  ${breadcrumbNav([HOME, MARKET])}
  <p class="eyebrow"><span></span> Agent template · ${esc(f.name)}</p>
  <h1 id="hero-title">${esc(t.name)}</h1>
  <p class="page-lead">${esc(t.lead)}</p>
  <div class="hero-actions"><a class="button button-primary" href="/business/#request" data-cta="business" data-cta-location="template" data-template="${t.slug}">Create your agent <span aria-hidden="true">→</span></a><a class="text-link" href="/agents/" data-cta="agents" data-cta-location="template">All agent templates</a></div>
  <p class="hero-caption"><span class="status-dot" aria-hidden="true"></span> On request <span>Assembled for your organization by our engineer agent</span></p>
 </div>
 <nav class="page-toc" aria-label="On this page"><a href="#does"><span>01</span> What it does</a><a href="#who"><span>02</span> Who it is for</a><a href="#how"><span>03</span> How it is assembled</a></nav>
</section>

<section class="section" id="does" aria-labelledby="does-title">
 <div class="section-heading story-heading"><p class="section-number">01 / WHAT IT DOES</p><h2 id="does-title">What it does</h2></div>
 <ul class="vision-principles">
${t.does.map(([s, p]) => `  <li><strong>${esc(s)}</strong><span>${esc(p)}</span></li>`).join('\n')}
 </ul>
</section>

<section class="section" id="who" aria-labelledby="who-title">
 <div class="section-heading story-heading"><p class="section-number">02 / WHO IT IS FOR</p><h2 id="who-title">Who it is for</h2><p>${esc(t.who)}</p></div>
 <h3 class="outcomes-title">What you get</h3>
 <ul class="shift-list outcomes">
${t.outcomes.map(o => `  <li>${esc(o)}</li>`).join('\n')}
 </ul>
</section>

<section class="section" id="how" aria-labelledby="how-title">
 <div class="section-heading story-heading"><p class="section-number">03 / HOW IT IS ASSEMBLED</p><h2 id="how-title">How a template<br>becomes your agent</h2><p>The template holds what we learned running agents of this kind. Our engineer agent assembles it for your organization; the details come on request.</p></div>
 ${assembly}
</section>

<section class="section related-templates" aria-labelledby="related-title">
 <div class="section-heading"><p class="section-number">${esc(f.name.toUpperCase())}</p><h2 id="related-title">More templates in this group</h2></div>
 <ul class="related-list">
${related.map(o => `  <li><a href="/agents/${o.slug}/">${esc(o.name)}</a></li>`).join('\n')}
  <li><a href="/agents/">All agent templates</a></li>
 </ul>
</section>

${closing('template', ` data-template="${t.slug}"`)}
</main>
`
  return page(`agents/${t.slug}/index.html`, { path, title, description: t.lead, ogTitle: t.name, data, main })
}

// ---- /guides/ and /blog/ ----------------------------------------------------------------------
// SITE-058: a hub opens with what the section is for, whom it helps and what to read first (the answer before the list),
// and each card says whom its item helps and lists the item's own h2 headings as what it covers (plain text, no links,
// so the cards add words to quote rather than link markers).
const topics = a => [...a.body.matchAll(/<h2>([^<]+)<\/h2>/g)].map(m => m[1])
function hub ({ folder, items, title, description, name, eyebrow, h1, body, lead, start, covers, byline, location, kind }) {
  const path = `/${folder}/`
  const data = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name, description, url: ORIGIN + path, publisher: PUBLISHER, mainEntity: { '@type': 'ItemList', itemListElement: items.map((a, i) => ({ '@type': 'ListItem', position: i + 1, name: a.name, url: `${ORIGIN}/${folder}/${a.slug}/` })) } },
    crumbs([HOME, [name, path]])
  ]
  const main = `<main id="main">
<section class="hero page-hero" aria-labelledby="hero-title">
 <div class="hero-copy">
  ${breadcrumbNav([HOME])}
  <p class="eyebrow"><span></span> ${esc(eyebrow)}</p>
  <h1 id="hero-title">${h1}</h1>
  <p class="hero-body">${esc(body)}</p>
  <p class="page-lead">${esc(lead)}</p>
${byline ? `  <p class="article-meta hub-byline">${esc(byline)}</p>
` : ''}  <h2 class="outcomes-title hub-start-title">Where to start</h2>
  <ul class="shift-list hub-start">
${start.map(([who, what]) => `   <li><strong>${esc(who)}</strong> ${esc(what)}</li>`).join('\n')}
  </ul>
 </div>
</section>

<section class="section" aria-labelledby="list-title">
 <h2 id="list-title" class="visually-hidden">${esc(name)}</h2>
 <div class="path-grid path-grid-two article-grid">
${items.map(a => `  <article class="path-card reveal"><p class="availability">${esc(kind)} · <time datetime="${PUBLISHED.iso}">${PUBLISHED.text}</time></p><h3><a href="/${folder}/${a.slug}/" data-cta="${folder}" data-cta-location="${location}">${esc(a.name)}</a></h3><p>${esc(a.lead)}</p><p class="hub-summary">${esc(a.summary)}</p><p class="hub-topics-title">${esc(covers)}</p><ul class="hub-topics">${topics(a).map(t => `<li>${esc(t)}</li>`).join('')}</ul></article>`).join('\n')}
 </div>
</section>
</main>
`
  return page(`${folder}/index.html`, { path, title, description, ogTitle: name, data, main })
}

function article ({ folder, a, kind, hubName, location, others }) {
  const path = `/${folder}/${a.slug}/`
  const blog = folder === 'blog'
  const data = [
    { '@context': 'https://schema.org', '@type': blog ? 'BlogPosting' : 'Article', headline: a.name, description: a.description, url: ORIGIN + path, mainEntityOfPage: ORIGIN + path, datePublished: PUBLISHED.iso, dateModified: PUBLISHED.iso, inLanguage: 'en', author: AUTHOR, publisher: PUBLISHER, image: `${ORIGIN}/assets/passioncode-social-card.png` },
    crumbs([HOME, [hubName, `/${folder}/`], [a.name, path]])
  ]
  const main = `<main id="main">
<article class="section legal article-page" aria-labelledby="hero-title">
 ${breadcrumbNav([HOME, [hubName, `/${folder}/`]])}
 <p class="section-number">${esc(kind)} · <time datetime="${PUBLISHED.iso}">${PUBLISHED.text}</time></p>
 <h1 id="hero-title">${esc(a.name)}</h1>
 <p class="legal-lead">${esc(a.lead)}</p>
 <p class="article-meta">Sergey Sheleg, co-founder of PassionCode.ai</p>
${a.body.trim().split('\n').map(l => ' ' + l.trim()).join('\n')}
 <div class="hero-actions article-actions"><a class="button button-primary" href="${a.cta.href}" data-cta="${a.cta.cta}" data-cta-location="${location}">${esc(a.cta.label)} <span aria-hidden="true">→</span></a></div>
</article>

<section class="section related-templates" aria-labelledby="related-title">
 <div class="section-heading"><p class="section-number">${esc(hubName.toUpperCase())}</p><h2 id="related-title">${blog ? 'More from the blog' : 'More guides'}</h2></div>
 <ul class="related-list">
${others.map(o => `  <li><a href="/${folder}/${o.slug}/">${esc(o.name)}</a></li>`).join('\n')}
  <li><a href="/agents/">Agent templates</a></li>
 </ul>
</section>
</main>
`
  return page(`${folder}/${a.slug}/index.html`, { path, title: a.title, description: a.description, ogTitle: a.name, ogType: 'article', data, main })
}

export function renderAll () {
  const files = { 'agents/index.html': marketplace() }
  for (const t of TEMPLATES) files[`agents/${t.slug}/index.html`] = template(t)
  files['guides/index.html'] = hub({ folder: 'guides', items: GUIDES, title: 'Guides to working with agents | PassionCode.ai', description: 'Step-by-step guides: set up your agent workplace, how the free one-week assessment works, and how agent templates become your agents.', name: 'Guides', eyebrow: 'Guides', h1: 'Guides to <em>working with agents</em>', body: 'Short guides to setting up the tools on your computer and to bringing agents into your organization', lead: 'Each guide explains what happens at each step before you take it. They help two kinds of readers: people who set up the tools on their own computer, and leaders who bring agents into a company.', start: [['On your own computer:', 'read the setup guide first, then run the command from the Get started page.'], ['For your company:', 'read how the free one-week assessment works, then how agent templates become your agents.']], covers: 'In this guide', location: 'guide', kind: 'Guide' })
  for (const a of GUIDES) files[`guides/${a.slug}/index.html`] = article({ folder: 'guides', a, kind: 'Guide', hubName: 'Guides', location: 'guide', others: GUIDES.filter(o => o !== a) })
  files['blog/index.html'] = hub({ folder: 'blog', items: POSTS, title: 'Blog: notes on AI-native organizations | PassionCode.ai', description: 'Notes from PassionCode.ai on AI-native organizations: why processes built around people stall, and what changes when agents run the process.', name: 'Blog', eyebrow: 'Blog', h1: 'Notes on <em>AI-native organizations</em>', body: 'Why companies will run on agents, and what we learn building the tools for it', lead: 'The blog explains the ideas behind the tools: how work changes when agents run a company’s processes and people steer them. It is for founders and leaders deciding how their company should work with AI.', start: [['New to the idea:', 'start with what an AI-native organization is.'], ['Already giving people AI assistants:', 'read why processes built around people stall.'], ['Ready to try it in your company:', 'read how the free one-week assessment works.']], covers: 'In this article', byline: 'Sergey Sheleg, co-founder of PassionCode.ai', location: 'blog', kind: 'Article' })
  for (const a of POSTS) files[`blog/${a.slug}/index.html`] = article({ folder: 'blog', a, kind: 'Article', hubName: 'Blog', location: 'blog', others: POSTS.filter(o => o !== a) })
  return files
}

export const CONTENT_PAGES = ['agents/index.html', ...TEMPLATES.map(t => `agents/${t.slug}/index.html`), 'guides/index.html', ...GUIDES.map(a => `guides/${a.slug}/index.html`), 'blog/index.html', ...POSTS.map(a => `blog/${a.slug}/index.html`)]

if (import.meta.main ?? process.argv[1] === import.meta.filename) {
  const files = renderAll()
  const stale = Object.entries(files).filter(([file, html]) => !existsSync(resolve(root, file)) || readFileSync(resolve(root, file), 'utf8') !== html)
  if (process.argv.includes('--check')) {
    if (stale.length) { console.error(`${stale.map(([f]) => f).join(', ')}: stale; run node scripts/build-content-pages.mjs`); process.exit(1) }
    console.log(`PASS: ${Object.keys(files).length} agent template, guide and blog pages are current`)
  } else {
    for (const [file, html] of stale) { mkdirSync(dirname(resolve(root, file)), { recursive: true }); writeFileSync(resolve(root, file), html); console.log(`wrote ${file}`) }
    console.log(`${Object.keys(files).length} pages, ${stale.length} written`)
  }
}
