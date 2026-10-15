# SITE-047 — /start/ says per system what setup installs (2026-10-15)

Problem: /start/ said "Fabric needs macOS on Apple silicon or Intel" (hero caption) and SCN-013's preconditions said the same, although Fabric 0.3.5 ships Windows and Linux builds (SITE-046).

What the launcher does (`passioncode-ai/passioncode` main at `9b8462030f603573bced9ee3d81779cdf8b67fcb`, v0.2.5 + 2, read with `git show origin/main:<path>`):

- `lib/setup.js:34`: `setup` plans app installs only when `platform === 'darwin'`.
- `lib/doctor.js:130`: when the platform is not macOS, the app checks are skipped and the output names each app's download page.
- `plugin/passioncode/skills/setting-up-passioncode/SKILL.md:99`: not on macOS, the person installs the apps from those pages, then runs `setup` again for the MCP servers.

Change (PR #142, merged as `52d8c1a`): /start/ in ten languages, edited through the catalogs.
- Hero: "From an empty computer". The caption now says "Fabric needs Docker and the Supabase CLI on every system".
- The One command paragraph says the split per system: on macOS the command installs the apps, the skills and the MCP servers. On Windows and Linux, download the apps from their pages, then run the same command for the skills and the MCP servers. The step line, the copy-prompt and the note under the pair say the same; the note links the Fabric page.
- The Fabric and Dashboards manual steps each gained a "For Windows and Linux" link.

The same change updated the facts row *Launcher* (under a lease), SCN-013, SCR-08 and `llms.txt`.

Checks run:
- `npm run check`: exit 0.
- `npm run build`: 224 entries.
- `npm run locales`: PASS, nothing missing.
- WebKit (Playwright 1.61) at 390 and 1440 px on en, ru, ja, de, ko and zh-hans: no horizontal overflow, no page errors, the old claim absent.
- CI `check` on #142: pass.

Shipped: deployed from `main` at `52d8c1a` as Worker version `1d762e44-8e28-4af1-9e1c-2464417a2337`. `scripts/verify-live.py` PASS: 263 checks, 224 assets, 150 pages, 13 download routes, 23 not-found addresses ([live.json](live.json)).

Known, not changed: the zh-hans h1 keeps a space before `<em>` ("从一台空白的电脑 到…"), which comes from the English source's whitespace. It is the same as every other zh-hans h1 with an `<em>`.
