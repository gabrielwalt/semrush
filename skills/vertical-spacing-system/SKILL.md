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

See `PROJECT-DESIGN.md` for the project's token values (desktop and mobile).

## Common overrides
- **First section (hero):** `padding-top: 0` — starts directly at header bottom, no extra gap
- **Full-bleed blocks (marquee):** `.section.marquee-container { padding: 0 }` — block handles its own internal spacing
- **Centered hero section:** may need custom `padding-top` to control hero vertical position

## Pitfalls
- `main > .section > * + *` — universal `*` has zero specificity and loses
- The `> div` inside a section is `.default-content-wrapper`, not a generic container
- First and last items inside a section must have `margin-top: 0` / `margin-bottom: 0` — all inter-section gap comes from section padding only

See also: `eds-dom-structure` (full DOM tree), `css-specificity-eds` (why `* + *` loses)
