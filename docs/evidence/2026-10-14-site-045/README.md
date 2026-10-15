# SITE-045 — one door to setup, Fabric as the home, the About notes (2026-10-14)

Operator decisions given in chat on 2026-10-14, recorded in [facts.md](../../brand/facts.md) (rows *homepage hero*,
*one door to setup*, *toolkit word (D2)*, *investors note (D3)*, *organization size*, *Launcher*, *Fabric coding
agents*) and [terminology.md](../../brand/terminology.md) ("Decided terms (operator, 2026-10-14)"):

- D1: the home H1 stays; one subline under it (Fabric the home; the four tools work with it and on their own; one
  command sets it all up today).
- D2: the public word stays "toolkit"; "modules" is internal only.
- D3: a short investors note in /#about (AGPL-3.0, free for personal use; commercial license and services; the
  founders; commercial@passioncode.ai; no figures, prices or terms).
- D4: the home video is re-rendered by another session (SITE-043 v3, merged as #134); this change only reads its
  files: the transcript under the player and the VideoObject data are written by `npm run locales` from the player's
  captions and MP4 (`applyVideo` in `scripts/locales.mjs`), so they followed v3 without an edit (en 91.6 s → PT1M32S, ru 98.0 s → PT1M38S). The
  video took SITE-044 for its v3 receipt (#136); this work is SITE-045.

What changed where: `setup` (as the terminal card shows it, without `--yes`; `--yes` only in the agent copy-prompt) replaces `update` wherever a
visitor starts (home step 01 and For you card, /start/ #setup and HowTo, llms.txt); header "Set up ↓" →
/start/#setup on every page; /start/ command and prompt side by side, the manual downloads folded in
`#by-hand`, task-pipeline moved to /vision/#pipeline; home #products Fabric first, no launcher card; /fabric/
#works-with and SoftwareApplication JSON-LD; /fabric/agents/ at Fabric 0.3.5 (Codex and Kimi Code connected,
from the v0.3.5 release notes); /business/ one hero action, the admin line, "one person to more than 1,000";
/design-system/ without "family"; /dashboards/ title suffix; ten languages.

Checks: `npm run check` exit 0 (114 tests); `npm run build` 224 entries; super-ux `brand_lint.py docs/brand`
165 errors (unchanged from main; B030/B070 are SITE-041), new warnings are B022 registry advisories (SITE-005);
`ux_lint.py docs/ux` 11 errors, 26 warnings (unchanged). WebKit (Playwright `playwright-core` 1.62, WebKit 2336)
on the built `dist/`, `/` and `/ru/` plus seven routes each at 1440 and 390 px: no horizontal overflow, no page
errors; the home For you Copy and the /start/ prompt Copy say Copied; the transcript opens; /start/#fabric opens the
folded downloads; the pair is two columns at 1440 and one at 390 ([webkit.json](webkit.json),
[script](webkit-check.cjs)).
