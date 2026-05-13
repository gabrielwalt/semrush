---
name: vertical-spacing-system
description: EDS vertical spacing system. Use when blocks are touching with no gap, sections are too far apart, or page rhythm needs adjusting.
---

Sections use padding (not margin) for vertical rhythm. Blocks spaced via `margin-top` on adjacent wrappers using `[class$="-wrapper"]` selector (not `* + *` — loses specificity).

## The pattern (in styles.css)
```css
main > .section { margin: 0; padding: var(--section-padding) 0; }

main > .section > .default-content-wrapper + *,
main > .section > [class$="-wrapper"] + [class$="-wrapper"],
main > .section > [class$="-wrapper"] + .default-content-wrapper {
  margin-top: var(--block-padding);
}
```

## Token structure
| Token | Controls |
|-------|----------|
| `--section-padding` | Section top/bottom padding |
| `--block-padding` | Margin between blocks in a section |

Set desktop and mobile values via media queries. Typical range: `--section-padding` 60–120px, `--block-padding` 32–64px.

## Pitfalls
- `main > .section > * + *` — universal `*` has zero specificity and loses
- The `> div` inside a section is `.default-content-wrapper`, not a generic container

See also: `eds-dom-structure` (full DOM tree), `css-specificity-eds` (why `* + *` loses)
