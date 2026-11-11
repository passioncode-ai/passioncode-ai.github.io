// The site's pages, in one place: checks, the copy projections, the release sync and the
// build read this list, so a new page cannot be added to one of them and missed by another.
// SOURCE_PAGES are the English pages, written by hand; every other language in
// i18n/locales.json has the same pages under /<locale>/, generated from them
// (scripts/locales.mjs, docs/DEPLOYMENT.md#languages).
import { readFileSync } from 'node:fs'

export const REGISTRY = JSON.parse(readFileSync(new URL('../i18n/locales.json', import.meta.url), 'utf8'))
export const SOURCE_LOCALE = REGISTRY.source
export const LOCALES = Object.keys(REGISTRY.locales)
export const TRANSLATED_LOCALES = LOCALES.filter(locale => locale !== SOURCE_LOCALE)

export const SOURCE_PAGES = [
  'index.html',
  'vision/index.html',
  'start/index.html',
  'business/index.html',
  'business/thanks/index.html',
  'privacy/index.html',
  'switchboard/index.html',
  'switchboard/agents/index.html',
  'fabric/index.html',
  'fabric/agents/index.html',
  'inbox/index.html',
  'dashboards/index.html',
  'observatory/index.html',
  'design-system/index.html',
  // SITE-056: rendered by scripts/build-content-pages.mjs from scripts/site-content.mjs
  'agents/index.html',
  'agents/company-assessment/index.html',
  'agents/organization-administrator/index.html',
  'agents/data-room/index.html',
  'agents/host-operations/index.html',
  'agents/messenger-gateway/index.html',
  'agents/sales-and-leads/index.html',
  'agents/marketing-analyst/index.html',
  'agents/growth-analytics/index.html',
  'agents/search-traffic/index.html',
  'agents/app-store-publisher/index.html',
  'agents/brand-and-content/index.html',
  'agents/support-answerer/index.html',
  'agents/chat-assistant/index.html',
  'agents/telegram-product-bot/index.html',
  'agents/customer-listening/index.html',
  'agents/media-production/index.html',
  'agents/research/index.html',
  'agents/web-quality-monitor/index.html',
  'guides/index.html',
  'guides/start-agent-workplace/index.html',
  'guides/free-assessment/index.html',
  'guides/templates-to-agents/index.html',
  'blog/index.html',
  'blog/why-person-shaped-processes-stall/index.html',
  'blog/what-is-an-ai-native-organization/index.html',
  '404.html'
]
export const PAGES = [...SOURCE_PAGES, ...TRANSLATED_LOCALES.flatMap(locale => SOURCE_PAGES.map(page => `${locale}/${page}`))]
// Pages a search engine should not list: the form's no-JavaScript confirmation and the 404 page,
// in every language. Every other page is indexed in every language.
export const SOURCE_NOINDEX = ['business/thanks/index.html', '404.html']
export const NOINDEX = new Set([...SOURCE_NOINDEX, ...TRANSLATED_LOCALES.flatMap(locale => SOURCE_NOINDEX.map(page => `${locale}/${page}`))])
