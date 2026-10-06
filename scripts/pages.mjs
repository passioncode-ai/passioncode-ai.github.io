// The site's pages, in one place: checks, the copy projections, the release sync and the
// build read this list, so a new page cannot be added to one of them and missed by another.
export const PAGES = [
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
// Pages a search engine should not list: the form's no-JavaScript confirmation and the 404 page.
export const NOINDEX = new Set(['business/thanks/index.html', '404.html'])
