# PassionCode design system · 1.1.0

Canonical public token source: [tokens.css](tokens.css). Public reference: [passioncode.ai/design-system/](https://passioncode.ai/design-system/). Introduced by the operator's 2026-09-26 request for a common PassionCode system and a yellow S on black for Switchboard.

## Identity and roles

The passion fruit remains the parent brand. Products carry their own glyph on the same dark tile; Switchboard uses S, Project Observatory an observing lens with a gold point (O), and Fabric Inbox a geometric inbox tray with a downward arrow. Product name: Fabric Switchboard, short form Switchboard. Fabric is the CEO AI agent in development; the Fabric technical kernel retains its technical meaning.

Use the semantic `--pc-*` tokens, not sampled colors. Gold is the action/selection fill; `--pc-focus` and `--pc-link` provide theme-appropriate focus and link ink; peach is warning, green positive, pink-red negative, blue information. Always pair state color with text. Plum/magenta belong to brand illustration, not operational status. Marketing can use the existing spacious hero and fruit; desktop uses compact rows and quiet surfaces. No animated backgrounds inside repeated workflows.

## Typography and controls

System sans fallback, no network font requirement. Body 14px for desktop, 18px for marketing explanation; metadata 12px; data in monospace. A 4px base spacing grid, 8px control corners, 16px desktop panels, 24px marketing features. One prominent action per task region; platform download alternatives are equally available. A primary control has dark text on gold. Secondary controls retain a visible border. Disabled controls keep their label and cannot be activated. Focus uses a gold outline with space from the control; never remove keyboard focus to improve a screenshot. Links in prose are underlined.

## States and motion

Preserve empty, loading, unavailable, error and success states. Unknown usage never becomes zero. Gold never implies an authenticated account or successful provider request. Hover/state transitions use the shared ease-out and duration tokens; reduced motion makes them immediate. No new animation is necessary for this identity update.

## Adoption

The site serves the canonical file. Switchboard vendors its exact bytes and records source commit + SHA-256 in `brand/passioncode/manifest.json`; its existing app token names alias those shared roles. Update the canonical source, review the rendered site and app, then copy and repin. A brand check rejects drift. Fabric's internal design documentation points here; legacy Fabric runtime screens are not silently restyled or claimed migrated.

## Verification

`npm run check` validates the canonical tokens, product mark, public pages and deployment. Browser checks cover desktop/mobile layout, named links and keyboard focus. This is not a full WCAG or screen-reader conformance claim.

## Light and dark — 1.1.0

The default `:root` palette retains every v1.0.0 dark value. Set `data-theme="light"` on the document root to select the opt-in light palette; remove the attribute or use `data-theme="dark"` for dark. Theme choice belongs to each application; the website remains dark. Do not infer an automatic operating-system theme policy from these tokens.

The light palette is an authored extension of the existing PassionCode system for the operator's 2026-09-26 Inbox request: warm paper canvas, white panels, plum-black text and the unchanged gold action fill. Status ink is darker on pale tinted backgrounds. It was not sampled from another product or presented as an upstream pack palette. Brand plum/magenta, typography, spacing, radii and motion inherit the original contract.

Use `--pc-accent` for button fills with `--pc-on-accent` text. Use `--pc-link` for text links and `--pc-focus` for focus outlines: raw yellow on white does not provide sufficient separation. The light strong border is the control-boundary role; the lighter border is decorative division only. State labels accompany every color.

[Token checks](../scripts/check-design-tokens.mjs) compute text contrast for the defined text/state pairs and control/focus separation, and [task packet](../docs/tasks/2026-09-26-inbox-site.md) records the scope. These checks are not whole-application WCAG certification. Consumers vendor the exact file and pin its commit/hash; adopting light requires checking their own screens and aliases. Switchboard's existing vendored v1.0.0 remains unchanged until its owner repins it.
