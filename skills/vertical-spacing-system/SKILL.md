---
name: vertical-spacing-system
description: EDS vertical spacing system — section padding plus the `* + *` block-margin rule, and the section/block spacing variants. Use when blocks touch with no gap, sections are too far apart, page rhythm is off, or position:sticky fails because an ancestor has overflow:hidden.
---

This is the **foundation** of augmented styles (rung 1 in `eds-content-modeling`): the default vertical-margin system that makes any page typographically harmonious with zero authoring. Get it solid before reaching for variants. Sections use padding for vertical rhythm. Blocks/elements are spaced via `margin-top` on the universal `* + *` sibling selector. First/last child margins are zeroed so section padding handles the edges.

## Token values
| Token | Desktop | Mobile (<768px) |
|-------|---------|-----------------|
| `--section-padding` | 60px | 30px |
| `--block-padding` | 60px | 30px |

## The pattern (styles.css)
```css
main > .section { margin: 0; padding: var(--section-padding) 0; }
main > .section > * + * { margin-top: var(--block-padding); }
main > .section > *:first-child { margin-top: 0; }
main > .section > *:last-child { margin-bottom: 0; }
```

## Section style variants (via Section Metadata)
- `section-flush` — `padding: 0` (e.g. marquee)
- `section-dark` — dark bg, white text
- `section-centered` — centered flex column (hero)

## Universal block spacing variants (via block class name)
These are the canonical **universal variants** — they apply to ANY block (the sibling-spacing example from the augmented-styles ladder). Prefix `block-`-style intent; apply by adding the class to the block name in authoring (e.g. `Carousel (spacing-top-small)`).
`spacing-top-none/small/large`, `spacing-bottom-none/small/large` — uses `:has()` selector to reach from wrapper to block class. Because they work on every block, define them once globally and never duplicate per-block.

## Pitfalls
- `main > .section > div { margin: auto }` overrides `* + *` because `div` has higher specificity — use `margin-left: auto; margin-right: auto` instead
- Block CSS must NOT set `padding-top/bottom` on the section container — the global rule handles it
- `overflow: hidden` on `html/body` breaks `position: sticky` — use `overflow-x: clip` (see `brand.css`)

See also: `eds-content-modeling` (where this fits in the augmented-styles ladder), `eds-dom-structure`, `full-width-escape-hatch`, `carousel-pattern-eds`
