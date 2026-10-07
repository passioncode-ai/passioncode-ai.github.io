// The site's pages, in one place: checks, the copy projections, the release sync and the
// build read this list, so a new page cannot be added to one of them and missed by another.
// SOURCE_PAGES are the English pages, written by hand; every other language has the same pages
// under /<locale>/, generated from them (scripts/locales.mjs, docs/DEPLOYMENT.md#languages).
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
export const TRANSLATED_LOCALES = ['ru']
export const PAGES = [...SOURCE_PAGES, ...TRANSLATED_LOCALES.flatMap(locale => SOURCE_PAGES.map(page => `${locale}/${page}`))]
// Pages a search engine should not list: the form's no-JavaScript confirmation and the 404 page,
// in every language.
const SOURCE_NOINDEX = ['business/thanks/index.html', '404.html']
export const NOINDEX = new Set([...SOURCE_NOINDEX, ...TRANSLATED_LOCALES.flatMap(locale => SOURCE_NOINDEX.map(page => `${locale}/${page}`))])
