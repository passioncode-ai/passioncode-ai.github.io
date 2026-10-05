// #region estimate — docs: business/index.html#estimate
// The savings estimate the /business/ page shows and the Worker recomputes for every
// enquiry (a client-supplied number is never trusted). It is arithmetic the visitor can
// check, not a promise: hours a month on the named processes × the share agents can
// plausibly take over × the loaded hourly cost.

export const ESTIMATE_MODEL = 'estimate/1'
export const WEEKS_PER_MONTH = 52 / 12

// The share of the hours an agent workplace can take over, as a range. Lower when the work
// is already partly automated: there is less manual effort left to remove.
export const SHARE_BY_STATE = {
  manual: [0.25, 0.5],
  scripts: [0.2, 0.4],
  ai_tools: [0.15, 0.35],
  agents: [0.1, 0.25]
}

const round = (n, step) => Math.round(n / step) * step

export function estimate ({ hoursPerWeek, hourlyCost, currentState, currency = 'USD' }) {
  const hours = Number(hoursPerWeek)
  const cost = Number(hourlyCost)
  const share = SHARE_BY_STATE[currentState]
  if (!share || !Number.isFinite(hours) || !Number.isFinite(cost) || hours <= 0 || cost < 0) return null
  const monthHours = hours * WEEKS_PER_MONTH
  const saved = share.map(s => round(monthHours * s, 1))
  const money = saved.map(h => round(h * cost, 10))
  return { model: ESTIMATE_MODEL, currency, hoursSavedPerMonth: saved, monthlySavings: money }
}

export function formatMoney (amount, currency) {
  try {
    return new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
  } catch {
    return `${Math.round(amount)} ${currency}`
  }
}
// #endregion estimate
