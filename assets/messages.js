// #region messages — docs: docs/DEPLOYMENT.md#languages
// The English source of every word the page scripts add (assets/site.js, assets/business.js).
// The pages' own text is in the HTML; these appear only once a script runs. Each language
// translates them in i18n/<locale>/_scripts.json, keyed by this English text; npm run check
// fails while one has no translation or a translation changes its placeholders.
export const M = {
  copy: 'Copy',
  copied: 'Copied',
  copyManual: 'Select and copy',
  copyLabel: 'Copy: {text}',
  estimateEmpty: 'Fill in the hours, the cost and how the work runs today to see the estimate.',
  estimateLead: 'Agents could take over about',
  estimateFigure: '{low}–{high} a month',
  estimateDetail: '{low}–{high} hours a month. An estimate from the formula above, not a promise; the pilot measures the real number.',
  chooseAny: 'Choose at least one.',
  chooseOne: 'Choose one.',
  required: 'Required.',
  email: 'A work email address.',
  consent: 'Agree to the privacy notice to send the request.',
  sending: 'Sending…',
  doneTitle: 'Thank you — it reached us',
  doneBody: 'We reply within two business days. A confirmation email usually follows within minutes.',
  reference: 'Reference: {id}',
  notSent: 'The request was not sent.',
  offline: 'The request did not leave your browser — check your connection and send it again. Your answers are kept here.'
}
// #endregion messages
