# Sample-data mockups: capture record (SITE-028 W5, 2026-10-11)

Operator decision 2026-10-11: mockups rendered from our products' own test and demo interfaces replace the
real screenshots W5 planned ("давай мокапы а не скриншоты, у нас весь UI тестовый есть"). No throwaway macOS
user, no real account, no real data. Every product repository was read through `git archive origin/main` into a
scratch folder; no product checkout was modified.

Every image is 2560×1600 (1280×800 at 2x), a progressive JPEG within the 320 KB budget that
`scripts/check-site.mjs` enforces, and carries a visible chip, "Sample data" (English image) or «Пример данных»
(Russian image), drawn by [`harness/make_jpg.py`](harness/make_jpg.py). The Russian pages show the `-ru.jpg`
twin; the other eight languages show the English image (`localizedAsset` in `scripts/locales.mjs`).

## Images

| File (+ `-ru`) | Shows | Source interface | Product commit | How it was rendered |
|---|---|---|---|---|
| `assets/journey-2-2.jpg` | Fabric first run, step 3 of 3: the four actions in two pairs (SCR-70) | Fabric's renderer: the real `App`, `LaunchShell`, `FirstRun`, `StartCards` | passioncode-ai/fabric `659ff3568e5f` (after release 0.3.4) | Vite dev server over the renderer source with a sample bridge ([`harness/fabric/mock.js`](harness/fabric/mock.js)) in place of the Electron preload; WebKit at 1440×900 CSS px (Fabric's default window), 2x, scaled to 2560×1600; light theme |
| `assets/journey-3-1.jpg` | Create an agent (SCR-74), filled: `release-notes-agent`, its sentence, `/Users/demo/agents`, Claude Code, adapter skills 0.8.3 installed | Fabric renderer, `CreateAgent` | same | same; reached by clicking through the first run |
| `assets/journey-3-2.jpg` | Adapt an existing agent (SCR-75) after choosing `legacy-reports-agent` | Fabric renderer, `ConvertAgent` | same | same |
| `assets/journey-3-3.jpg` | The session window (SCR-25) with Claude Code asking the second of the six intake questions of `creating-fabric-agents` | Fabric renderer, `SessionWindow` + `TerminalView` (xterm) | same | Fabric's session window with a sample session; the terminal text is **written by hand** from the skill's Step 0 table and Fabric's own instruction string (`start.createAgent.instruction`), not recorded ([`harness/fabric/transcripts.js`](harness/fabric/transcripts.js)). Dark theme: the session header has no contrast in light. WebKit 1000×625 CSS px (the session window's default width), DPR 2.56 |
| `assets/journey-3-4.jpg` | The session window after Adapt: the plan for `legacy-reports-agent` (profile local-runner, effects, branch `fabric-adapter`, files of the provider bundle), waiting for a yes | same | same, plus fabric-agent-adapter `7e45e6b` (the skill's workflow and provider-bundle reference) | same as 3-3, written by hand |
| `assets/observatory-overview.jpg` | Observatory overview of the fictional Northwind Labs estate: five findings, counters, activity | Observatory's unmodified engine and dashboard, through its own demo builder `tools/demo_estate.py` | passioncode-ai/project-observatory-dashboard `2510398d6b70` (engine 0.21.0, app 0.20.1) | `demo_estate.py OUT --locale en|ru` under an empty fake HOME (`OBSERVATORY_DEMO=1`, its own data home), then WebKit 1280×800, 2x ([`harness/observatory/obs-shot.js`](harness/observatory/obs-shot.js)). Dark, as the product ships (no light switch exists). In the Russian image the demo's finding sentences stay English: the demo writes them in English only |
| `assets/inbox-overview.jpg` | Fabric Inbox, all inboxes: three addresses at example.test, important first, a release-notes draft open | Inbox's web interface (SCR-03) against its own preview fixture `scripts/preview-fixture.mjs` | passioncode-ai/fabric-inbox `e4df28453faa` (0.14.1) | Fixture data replaced with synthetic people and agents at example.test, no third-party brands, English or Russian content (`FIXTURE_LANG=ru`) ([`harness/inbox/preview-fixture.mjs`](harness/inbox/preview-fixture.mjs)); the dev server fails on a large icon chunk in workerd, so a local production build was served on 127.0.0.1 with Cloudflare Access skipped for that local preview only ([`harness/inbox/workers-app-local-preview.diff`](harness/inbox/workers-app-local-preview.diff)); interface language `?lang=ru`; WebKit 1280×800, 2x, light ([`harness/inbox/inbox-shot.cjs`](harness/inbox/inbox-shot.cjs)) |

Names on screen are synthetic: `release-notes-agent`, `legacy-reports-agent`, `support-triage-agent`,
`docs-sync-agent`, `acme-site`, `acme-mobile`, people "Dana Park" and "Nina Kim", addresses at `example.test`,
the folder `/Users/demo/agents`, the remote `git@example.test:acme/…`, Observatory's Northwind Labs projects.
"Claude Code", "Codex", "Gmail", "Cloudflare" and "Heroku" appear because the products name them in their own
interface.

What could not be shown as a live product state: the coding agent's console. Fabric's session window is real,
but the text inside it is a written example; the page says so in the alt text and in the note under the
/fabric/ pictures. Fabric's Agent access panel (SCR-76) and the Fabric board in light were not redone here;
step 05 keeps the earlier synthetic `fabric-board.jpg`.

## Checks

- Privacy: every image's visible text (saved beside each capture), the transcripts, the fixture and every file
  in `harness/` were count-scanned against the operator's private-terms list (183 terms, "Nicegram" allowed):
  0 hits. Each image was inspected by eye before commit.
- `scripts/check-site.mjs`: each mockup is 2560×1600, within 320 KB, has its `-ru` twin, is published by
  `scripts/build-site.mjs`, and every `<img>` of it says "Synthetic demo data." or "A written example, not a
  recording."
- `scripts/locales.test.mjs`: the Russian home page uses `journey-2-2-ru.jpg`, the German one the English
  image, and the skeletons still match.

## Reproduce

Fabric: put `harness/fabric/harness.html` in `apps/desktop/src/renderer/`, `mock.js` and `transcripts.js` in
`apps/desktop/src/renderer/harness/`, and `harness.vite.config.mjs` in `apps/desktop/` of an archived copy of
the Fabric repository; link `apps/desktop/node_modules` from an installed checkout; start Vite with that config;
run `node harness/fabric/fabric-shots.mjs <out> en ru` with Playwright installed (WebKit only); then
`python3 harness/make_jpg.py <png> <jpg> <en|ru> br 80` (consoles at quality 70). Observatory and Inbox: the
commands in the table above, then `make_jpg.py` with corner `tr` (Observatory) or `br@180` (Inbox).
