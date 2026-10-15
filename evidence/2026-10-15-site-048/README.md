# SITE-048 — no space at an emphasis join in Chinese and Japanese (2026-10-15)

Problem: a heading whose second half is emphasised kept the English source's space at the join in languages
written without spaces. zh-hans /start/ read "从一台空白的电脑 <em>到你的第一个智能体</em>".

Cause: `localizePage` (`scripts/locales.mjs`) keeps the English fragment's surrounding spaces
("From an empty computer to␠" before `<em>`), and `tightenCjk` removed that space only around links and code.

Fix: `tightenCjk` drops the space at an `<em>`, `<strong>` or `<b>` join between CJK characters, or after full-width
punctuation that closes the emphasis (`<strong>示例：</strong> 每…`). Korean keeps it (it is written with spaces;
Hangul is not in the CJK class), and so do the spaced languages. One catalog value carried the same stray space:
the zh-hans /start/ meta description (`i18n/zh-hans/start.json`).

Scan before the fix (the new whole-site test): 19 hits on 14 pages.
- Headings: zh-hans /start/, /404, /business/thanks/; ja /start/, /404.
- Inline emphasis: zh-hans /fabric/, /switchboard/, /switchboard/agents/, /vision/, /business/; ja /switchboard/,
  /switchboard/agents/, /business/, /inbox/.

Kept on purpose: kicker and caption spans (`<span>工具包成员</span> 状态…`) and form `<small>` labels are separate
visual elements, not emphasis joins.

Checks run:
- `node --test scripts/locales.test.mjs`: the two new tests failed before the fix and pass after.
  - "a heading split by emphasis joins without a space in Chinese and Japanese, and keeps it in spaced languages"
  - "no generated Chinese or Japanese page puts a space between CJK text and an emphasis or a heading join"
- `npm run check`: exit 0.
- `npm run build`: 224 entries.
- WebKit 26.5 (Playwright 1.62.1), 1440 and 390 px, on built `dist/`. Pages: zh-hans /start/, /404, /fabric/,
  /business/thanks/; ja /start/, /switchboard/, /404; ko /start/. The h1 join is "的电脑|到你的", "ーから|最初の",
  "ージが|見つか"; ko keeps "에서 |첫 에". No overflow: 16 of 16 PASS.

Shipped: PR #144 merged as `b1059ce`; `npm run deploy` from `main` (its own `npm run check` and build) published Worker
version `54b43572-c501-4ed2-8c92-b0d1c76e1fc6`. `scripts/verify-live.py` PASS, 263 of 263 checks, 13 download routes, 23 not-found addresses
([live.json](live.json)); the first run, seconds after the deploy, saw 3 changed pages still served old by the edge.
