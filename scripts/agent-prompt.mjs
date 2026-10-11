// #region agent-prompt — docs: docs/ux/scenarios.md#scn-022-let-a-coding-agent-ask-and-send-the-request
// The /business/ agent prompt as plain text: what the page's Copy button puts on the clipboard
// (assets/site.js promptText) and what /business/agent-request.txt and each language's
// /<code>/business/agent-request.txt serve to an agent that fetches it. Written by
// npm run locales from each language's page, so the page and the file never differ.
export const PROMPT_FILE = 'business/agent-request.txt'
export const PROMPT_ROUTE = '/' + PROMPT_FILE

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'", nbsp: ' ' }
const decode = s => s.replace(/&(amp|lt|gt|quot|#39|apos|nbsp);/g, (_, e) => ENTITIES[e])
const text = html => decode(html.replace(/<[^>]+>/g, ''))
// The browser's textContent, squashed the way assets/site.js squashes it (JS \s includes NBSP).
const squash = s => s.replace(/\s+/g, ' ').trim()

// The prompt box is the element carrying data-copy-prompt; its children are <p>, <ol> and <pre>.
export function promptText (html) {
  const open = /<div\b[^>]*\bdata-copy-prompt\b[^>]*>/.exec(html)
  if (!open) return null
  const body = html.slice(open.index + open[0].length, html.indexOf('\n   </div>', open.index))
  const blocks = []
  for (const m of body.matchAll(/<(p|ol|pre)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    if (m[1] === 'pre') blocks.push(text(m[2]).replace(/\s+$/, ''))
    else if (m[1] === 'ol') blocks.push([...m[2].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((li, i) => `${i + 1}. ${squash(text(li[1]))}`).join('\n'))
    else blocks.push(squash(text(m[2])))
  }
  return blocks.join('\n\n') + '\n'
}
// #endregion agent-prompt
