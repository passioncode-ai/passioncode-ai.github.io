# SITE-033 evidence: Fabric Inbox 0.15 on /inbox/, Dashboards 0.7.4 updates, 2026-10-11

PR #107 merged as `2dbc9c3`; deployed from that commit with `npm run deploy` (Worker version
`3d735e87-9d54-4da3-8bbf-9730bcde3297`); `scripts/verify-live.py` PASS ([live.json](live.json)).

## Before and after, with the release evidence

| Page | Before | After | Release evidence |
|---|---|---|---|
| /inbox/ after the hero | straight to "01 / What it does" | "New in 0.15" block, first section after the hero: the agent console (Claude Code or Codex in a panel beside the mail; toolbar button, View → Agent Console, ⌃⌘T / Ctrl+Shift+T; a key per session at the chosen level, revoked when it ends; "The console works from 0.15.1: in 0.15.0 it could not start"; "The Mac App Store version does not have the console"), setup by the coding agent ("You paste the token, sign in and choose Allow"; welcome "Use the server your agent set up"), mail the server could not take (whom, when, why, in the domain's settings) | [v0.15.0 notes](https://github.com/passioncode-ai/fabric-inbox/releases/tag/v0.15.0), [v0.15.1 notes](https://github.com/passioncode-ai/fabric-inbox/releases/tag/v0.15.1) ("In 0.15.0 the console … could not start") |
| /inbox/ hero | "Your mail / Important first" | unchanged: the page's one question is "Can agents answer my mail without me losing control?" ([narrative §5](../../brand/narrative.md)) and the voice's Density axis rules out a feature inventory in the headline | voice.md |
| /inbox/ #agents | 2 steps: make a key; connect | 3 steps: "Give your agent one sentence" (Settings → Agent access shows it first; agent creates the server and connects once you choose Allow; link to `docs/agents/onboard.md`); "Or make a key yourself"; "Connect your agent" (for a key you made) | v0.15.0 notes ("Settings → Agent access first shows the sentence …; making a key by hand is the second option"); [onboard.md at v0.15.1](https://github.com/passioncode-ai/fabric-inbox/blob/v0.15.1/docs/agents/onboard.md) |
| /inbox/ Before you open it | "choose Create my server on Cloudflare" | adds "If your coding agent made the server, choose Use the server your agent set up instead" | v0.15.0 notes |
| /inbox/ macOS card | DMG note only | adds "A Mac copy older than 0.15.2 cannot update itself: download 0.15.2 once and install it over the old one. Later releases install themselves again." | [v0.15.2 notes](https://github.com/passioncode-ai/fabric-inbox/releases/tag/v0.15.2) (published 20:50 UTC during this task) |
| /dashboards/ Windows and Linux card | "Updates are automatic on macOS only for now: on Windows and Linux, install the next release yourself." | "Since 0.7.4 the Windows app and the AppImage update themselves; a copy installed from the .deb does not, so install the next .deb." | [v0.7.4 notes](https://github.com/passioncode-ai/fabric-dashboards/releases/tag/v0.7.4); run [38168481474](https://github.com/passioncode-ai/fabric-dashboards/actions/runs/38168481474) success on `09e1c41`; `update-feed.json` platforms darwin-universal, win32-x64, win32-arm64, linux-x64, linux-arm64; both Windows receipts `windows_authenticode: SIGNED`. End-to-end update to the next release not proven, so no stronger claim |

All in ten languages. `releases:sync` during the task: Observatory 0.22.0 → 0.23.0, Dashboards 0.7.3 → 0.7.4,
Inbox 0.15.1 → 0.15.2 (versions, checksums, downloads).

## Copy checks (saved voice v2 `1657e5b3…` v1, register marketing)

- New /inbox/ strings: en 100 and ru 100, no blocking rule.
  - Advisories: the release notes' own triples, allcaps section labels, Russian no-break spaces (the catalog carries them).
  - de, es, pt-BR, pl, ko, ja, zh-Hans: no findings.
  - fr: four no-break-space suggestions, applied.
- The /dashboards/ line and the 0.15.2 note: en 100, ru 100 (no-break-space advisory), zh-Hans no findings.
- zh-Hans was written only by the copy agent's write capability: three jobs, $0.059 + $0.014 + $0.019.
- Humanization: on, own pass. The two English triples were kept because they quote the release notes.

## Checks

- All exit 0 on the branch: `npm run locales -- --check`, `python3 scripts/extract-public-copy.py`, `npm run check`, `npm test`, `npm run build` and `npm run releases:check`.
- CI `check` passed on PR #107. `npm run deploy` re-ran check and build on `2dbc9c3`.
- Brand lint (`brand_lint.py docs/brand`): no finding that origin/main does not already have.
- WebKit check with [webkit.cjs](webkit.cjs) (playwright-core 1.63.0) against `dist/` over local HTTP: /inbox/ and /dashboards/, en and ru, 390 and 1280 px.
  - 8/8 status 200, no horizontal overflow, nothing outside the viewport, no broken image.
  - New in 0.15 sits directly after the hero, in 1 column at 390 px and 3 at 1280 px ([visual.json](visual.json)).
- Private-terms count of the diff: 0.
