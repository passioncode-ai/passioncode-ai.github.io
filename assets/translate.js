// #region translate — docs: docs/DEPLOYMENT.md#languages
// What the site's scripts and the Worker say, in the reader's language (fabric-workspace
// knowledge/localization.md). English is the source and the key (L10N-02): code passes the
// English message, the catalog of the language maps it to a translation, and a message missing
// from a catalog shows in English, never as a key. Values go in named placeholders ({id}).
// Counts use the language's own plural forms (L10N-03): a plural message is { one, other } in
// English and has one form per Intl.PluralRules category in the catalog. The catalogs are
// generated from i18n/<locale>/_scripts.json by scripts/build-locale.mjs (assets/i18n.js for the
// browser, worker/i18n.js for the Worker); this file holds only the lookup.
export function translator ({ source, locales, catalogs }) {
  const resolveLocale = value => typeof value === 'string' && Object.hasOwn(locales, value) ? value : source
  const fill = (text, params = {}) => text.replace(/\{([a-zA-Z]\w*)\}/g, (all, name) => Object.hasOwn(params, name) ? String(params[name]) : all)
  const t = (locale, message, params) => {
    const value = locale === source ? undefined : catalogs[locale]?.[message]
    return fill(typeof value === 'string' ? value : message, params)
  }
  const tn = (locale, n, message, params = {}) => {
    const translated = locale === source ? undefined : catalogs[locale]?.[message.other]
    const [forms, tag] = translated && typeof translated === 'object' ? [translated, locales[locale].intl] : [message, locales[source].intl]
    const category = new Intl.PluralRules(tag).select(n)
    return fill(forms[category] ?? forms.other, { n, ...params })
  }
  return { resolveLocale, t, tn }
}
// #endregion translate
