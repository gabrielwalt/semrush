---
name: eds-content-modeling
description: EDS content modeling and authoring structure. Use when deciding what goes in blocks vs default content, choosing between variants and new blocks, structuring rows and cells, or applying section/page styling context.
---

Content structure decisions determine how easy a page is for authors to maintain. Every choice here affects the authoring experience months from now.

## Blocks vs default content
- All user-facing text lives in `.plain.html` content files — never hardcode strings in JS or CSS. Exception: purely functional UI labels (e.g., "Previous slide" aria-labels).
- Prefer default content (headings, paragraphs, links outside a block table) over putting content inside blocks. Eyebrow pre-titles, section headings, subtitles, and CTAs that introduce a block belong in the section's default content above the block — not in the block's first row.

## Blocks vs variants
- Prefer reuse and variants over new blocks. Add a new block only when structure is fundamentally different or a variant would need >50% new JS/CSS.
- Block variants must share the same content structure. A variant is a CSS/JS styling toggle (class name), not a different content model. If two instances need fundamentally different row/cell layouts, they are different blocks.
- Keep content structure consistent across similar blocks. If one uses `[h2, p, CTA]` in a text cell, don't make another use `[h2]` in row 1 and `[p, CTA]` in row 2 for the same logical content.

## CTA link formatting convention
Links wrapped in formatting become buttons during decoration — everywhere, in default content and inside blocks:
- `<strong><a>` → **primary** button (solid filled) — main action
- `<em><a>` → **secondary** button (outline/ghost) — alternative action
- `<strong><em><a>` → **accent** button (high-impact) — use sparingly
- Block JS must not strip button formatting — style `.button` elements within the block's CSS scope
- Import parsers must detect the visual weight of source CTAs and apply the matching wrapper — never hardcode one style

## Styling context: variants, section styles, page templates
All three add a context-specific class name:
- **Block variant** — class on the block element. Use when two instances differ visually but share content structure. For cross-block generic styles, prefix with `block-` (e.g., `block-no-margin-top`).
- **Section style** — class on the section wrapper, prefixed `section-` (e.g., `section-dark`). For shared visual treatment spanning default content and blocks. Authors set via Section Metadata.
- **Page template** — class on `<body>`, prefixed `template-` (e.g., `template-blog-post`). For page-wide layout or behavior.

## Import parser styling rules
- Import parsers must extract all content from the source DOM — never inject placeholder text or hardcode editorial strings.
- Every styling choice (CTA type, heading level, variant, section style, template) must be derived from observable signals in the source DOM. Never assume a fixed style — detect from the source.
- Detect visual context (dark backgrounds, layout patterns) and emit corresponding Section Metadata or template metadata automatically.

## Pitfalls
- A variant that needs a different content model is a different block — not a variant
- Section Metadata must be the LAST element inside its section div
- If source content is missing at import time, leave the field empty rather than inventing a value
