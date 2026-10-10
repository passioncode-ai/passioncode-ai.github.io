Contract: brand-contract v1
# Public site brand pack

Website projection of the PassionCode narrative, updated by the operator on 2026-09-26. Canonical internal positioning is maintained in Fabric; release facts are verified against the public Switchboard release. Visual tokens are owned by [the shared system](../../design-system/README.md).

Sources:
  marketing: docs/brand/copy/*.md

Files: [voice](voice.md), [narrative](narrative.md), [terms](terminology.md), [facts](facts.md), [channels](channels.md), [strings](strings.md).

[narrative.md](narrative.md) is the message house for the whole site: the promise (the home hero, verbatim), the problem in the reader's words, the six-step journey with what is available, preview or direction, three proofs, one question per page, and the words we own and ban. It is a draft until the operator approves it (plan [W1](../tasks/2026-10-10-narrative-l10n-video.md)).

`copy/` is generated from static visible HTML text/metadata by `scripts/extract-public-copy.py`; HTML classes, dimensions and JSON-LD syntax are excluded from language lint. Heading levels and explicit headline breaks are retained as Markdown headings.
The original HTML pages and projection freshness are checked by `npm run check`.

## Display punctuation

Operator direction, 2026-10-01: display headings, hero copy, slogans, short status
labels and figure captions do not end with full stops. A line break already
separates headline fragments; use a comma or rewrite an inline phrase instead of
staccato sentence fragments. Ordinary explanatory paragraphs retain sentence
punctuation. Preserve question marks in questions and dots in product names,
versions, URLs and commands. The seven source pages and generated Switchboard
agent section follow this convention; [editorial receipt](../tasks/2026-10-01-display-copy.md)
records the scope and verification.

Enforcement: `python3 scripts/check_display_copy.py` is part of `npm run check`,
so the existing CI and deploy path reject regressions. Its scope is semantic
headings (including `role="heading"`), figcaptions, buttons/labels and the display
classes in `scripts/html_copy.py`. A `beta-note` is display copy only inside a
hero; explanatory beta paragraphs keep sentence punctuation. The source parser
ignores scripts, styles, templates and explicit hidden content; `aria-hidden`
alone does not hide visible text. It does not compute CSS or JavaScript. Browser
review still verifies actual wrapping and visibility.

`python3 scripts/test_display_copy.py` plants nested headline, explicit break,
staccato, status, specimen, caption and generator regressions. It also protects
punctuation exceptions, empty coverage and sitemap coverage. General brand-lint
remains a separate review: its advisory exit code does not prove that these roles
were inspected. [Root-cause task](../tasks/2026-10-01-copy-guard.md).
