// #region messages — docs: docs/DEPLOYMENT.md#languages
// The English source of everything the Worker says to a person: the page and the message a
// refused form gets, the validation issues, and the receipt email. Each language translates
// them in i18n/<locale>/_scripts.json, keyed by this English text (worker/i18n.js is generated
// from it); a message without a translation shows in English. `error` codes, log events and the
// mail to the commercial mailbox stay English: scripts and people at PassionCode.ai read them.
export const M = {
  notSentTitle: 'Request not sent',
  notSentHeading: 'Your request was not sent',
  writeTo: 'You can also write to {email}.',
  back: 'Back to the form',
  unavailable: 'The form is not accepting requests right now. Please write to {email} instead.',
  rateLimited: 'Too many requests from your network in the last minute. Please wait a minute and try again.',
  tooLarge: 'The request is too long.',
  invalidBody: 'The request could not be read.',
  tooFast: 'That was faster than a person can fill the form. Please check your answers and send it again.',
  formExpired: 'The form has expired. Reload the page and send it again — your answers are kept in the browser.',
  invalid: 'Some answers need another look.',
  formUsed: 'This form was already sent once. Reload the page to send another request — your answers are kept in the browser.',
  storeFailed: 'We could not save your request. Nothing was sent. Please try again in a minute or write to {email}.',
  conflict: 'This request was already sent with different answers. Reload the page to start a new one.',
  receiptSubject: 'We received your request — PassionCode.ai',
  receiptHello: 'Hello,',
  receiptThanks: 'Thank you for your request. It reached PassionCode.ai.',
  receiptNext: 'What happens next:',
  receiptStep1: '1. We read what you sent and reply within two business days, usually with a few questions about the processes you named.',
  receiptStep2: '2. If it fits, we suggest a short call to map one process and agree how to measure it.',
  receiptStep3: '3. You get a written proposal: what we would set up, where it runs, and the license it needs.',
  receiptOpenSource: 'Everything PassionCode.ai builds is open source under the GNU AGPL-3.0, so you can also start on your own today: {start}',
  receiptReply: 'To add anything, reply to this email.',
  receiptReference: 'Reference: {id}. We keep your request only to answer it: {privacy}'
}

// Validation issues are made in English — code and tests compare that text, the request's
// identity (L10N-04) — and translated where they are shown (worker/leads.js issueMessage).
// A count is a plural: { one, other } in English, every plural form in a catalog (L10N-03).
export const ISSUES = {
  required: 'required',
  atLeast: { one: 'at least {n} character', other: 'at least {n} characters' },
  atMost: { one: 'at most {n} character', other: 'at most {n} characters' },
  numberRange: 'a number from 0 to {max}',
  chooseListed: 'choose one of the listed answers',
  unknownAnswer: 'unknown answer',
  chooseAtLeastOne: 'choose at least one',
  chooseAtLeast: 'choose at least {n}',
  webAddress: 'a web address',
  workEmail: 'a work email address',
  agreePrivacy: 'agree to the privacy notice to send the request'
}
// #endregion messages
