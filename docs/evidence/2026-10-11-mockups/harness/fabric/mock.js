// Synthetic bridge for the site's sample-data mockups (SITE-028 W5). No backend, no real data.
const q = new URLSearchParams(location.search)
const locale = q.get('locale') === 'ru' ? 'ru' : 'en'
const never = () => new Promise(() => {})
const ok = (v) => async () => v
const unknown = []
const sessionKind = q.get('session')
const SESSION = sessionKind ? {
  sessionId: 'sample-' + sessionKind, projectId: 'sample-project', cwd: sessionKind === 'adapt' ? '/Users/demo/agents/legacy-reports-agent' : '/Users/demo/agents/release-notes-agent',
  program: 'claude', optionId: 'claude-code', permissionMode: 'default', excerpt: '', written: 4000, running: true, state: 'idle',
  startedAt: '2026-10-11T09:00:00Z', lastActivityAt: '2026-10-11T09:03:00Z', tail: '', exitCode: null
} : null
const known = {
  settings: {
    read: ok({ theme: q.get('theme') === 'dark' ? 'dark' : 'light', locale, keepAwake: 'while-working', workspace: { path: null, git: 'unanswered' }, tabs: { tabs: [], active: null }, readThroughSeq: 0, firstRun: { completedAt: null }, runnerFallback: { order: [] } }),
    write: async (next) => ({ saved: true, settings: { theme: 'light', locale, keepAwake: 'while-working', workspace: { path: null, git: 'unanswered' }, tabs: { tabs: [], active: null }, readThroughSeq: 0, firstRun: { completedAt: '2026-10-11T09:00:00Z' }, runnerFallback: { order: [] }, ...next } })
  },
  meta: { info: ok({ estateName: 'org #1', filePath: null, sessionId: SESSION ? SESSION.sessionId : null }) },
  projects: { list: ok([]), create: async (i) => ({ id: i.id, name: i.name }) },
  tabs: { read: ok({ tabs: [], active: null }), write: ok(undefined), onCloseActive: () => () => {} },
  drafts: { read: ok({ status: 'ready', drafts: {} }), save: ok({ saved: true }) },
  terminal: { list: ok([]), get: async () => SESSION, scrollback: async () => ({ text: window.__transcript(locale, sessionKind), written: 4000 }), onData: () => () => {}, onExit: () => () => {}, write: () => {}, resize: () => {} },
  feed: { replay: ok([]) },
  quota: { read: never },
  ceo: { status: ok({ active: false }) },
  stack: { exposure: never },
  analytics: { status: never, setEnabled: ok(undefined) },
  persona: { read: ok({ persona: { seed: 731, style: 'orbit' }, chosen: false }), save: async (p) => ({ persona: p, saved: true }) },
  start: {
    chooseFolder: async (kind) => kind === 'parent' ? '/Users/demo/agents' : '/Users/demo/agents/legacy-reports-agent',
    inspect: async (path) => ({
      path, name: 'legacy-reports-agent', git: true, kind: 'repository', parent: null, branch: 'main',
      remote: 'git@example.test:acme/legacy-reports-agent.git',
      lastCommit: { at: '2026-10-08T14:20:00Z', subject: locale === 'ru' ? 'Выгрузка недельного отчёта в CSV' : 'Export the weekly report as CSV' },
      stack: ['Python'], importedBy: [],
      summary: locale === 'ru' ? 'Собирает недельный отчёт по заявкам поддержки и отправляет его команде.' : 'Builds the weekly support-ticket report and sends it to the team.',
      summaryFile: 'README.md'
    }),
    scan: never, cancelScan: ok(undefined), lastScan: ok(null), createFolder: async (i) => ({ ok: true, path: `${i.parent}/${i.name}` }),
    adapterSkills: ok({ ready: true, where: 'plugin', version: '0.8.3', found: { 'creating-fabric-agents': true, 'adapting-projects-to-fabric': true }, command: 'npx @passioncode-ai/passioncode@latest update', launcherCovers: true }),
    executors: ok([
      { id: 'claude-code', label: 'Claude Code', connected: true, state: 'found', version: '2.1.288', path: '/Users/demo/.local/bin/claude', install: null, authentication: { state: 'authenticated', method: null, reason: null } },
      { id: 'codex', label: 'Codex', connected: false, state: 'missing', version: null, path: null, install: 'npm install -g @openai/codex' }
    ])
  },
  tasks: { start: never, close: ok({ ok: true }) },
  windows: { openSession: never, openFile: never }
}
const ns = (name, base = {}) => new Proxy(base, {
  get (t, k) {
    if (k in t) return t[k]
    if (typeof k !== 'string') return undefined
    unknown.push(`${name}.${k}`)
    return k.startsWith('on') ? () => () => {} : never
  }
})
window.fabric = new Proxy({}, { get (_, k) { if (typeof k !== 'string') return undefined; return ns(k, known[k] || {}) } })
window.__unknownBridge = unknown
