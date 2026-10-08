// #region routing — docs: docs/DEPLOYMENT.md#languages
// Which language an address belongs to, and the addresses the Worker treats specially. Kept out
// of worker/index.js because the Workers runtime accepts only handlers as exports of the entry
// module (`wrangler dev`: "Incorrect type for map entry … not of type 'function or
// ExportedHandler'"), and the tests read these.
import { LOCALES, SOURCE_LOCALE } from './i18n.js'

// The site's languages other than English, each under /<locale>/ (i18n/locales.json).
export const TRANSLATED = Object.keys(LOCALES).filter(l => l !== SOURCE_LOCALE)
const LOCALE_PREFIX = TRANSLATED.length ? `(?:(?:${TRANSLATED.join('|')})\\/)?` : ''
// The not-found page's own addresses, in every language: /404, /404/, /404.html, /ru/404 …
export const NOT_FOUND_PAGE = new RegExp(`^\\/${LOCALE_PREFIX}404(?:\\.html|\\/)?$`)
// A path no asset can have: asking the assets for it returns the not-found page with 404.
export const MISSING_PATH = '/__not-found__/'
// The form page in every language, which gets a fresh form token on each render.
export const BUSINESS_PAGE = new RegExp(`^\\/${LOCALE_PREFIX}business\\/?$`)
// An address under /<locale>/ that has no page gets that language's not-found page
// (<locale>/404.html), still 404.
export const localeOfPath = path => TRANSLATED.find(l => path === `/${l}` || path.startsWith(`/${l}/`)) || SOURCE_LOCALE
export const notFoundPath = locale => `/${locale}/404`
// #endregion routing
