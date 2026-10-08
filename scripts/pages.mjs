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
  '404.html'
]
export const PAGES = [...SOURCE_PAGES, ...TRANSLATED_LOCALES.flatMap(locale => SOURCE_PAGES.map(page => `${locale}/${page}`))]
// Pages a search engine should not list: the form's no-JavaScript confirmation and the 404 page,
// in every language. Every other page is indexed in every language.
export const SOURCE_NOINDEX = ['business/thanks/index.html', '404.html']
export const NOINDEX = new Set([...SOURCE_NOINDEX, ...TRANSLATED_LOCALES.flatMap(locale => SOURCE_NOINDEX.map(page => `${locale}/${page}`))])
