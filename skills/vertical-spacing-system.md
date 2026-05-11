# Vertical Spacing System

## When to load
Blocks touching each other with no gap, sections too far apart, or need to adjust page rhythm.

## Key insight
Sections use padding (not margin) for vertical rhythm — they sit flush. Blocks within a section are spaced via `margin-top` on adjacent wrapper siblings. The selector must be explicit (`[class$="-wrapper"]`) because `* + *` loses to wrapper specificity.

## The rules (in styles.css)
```css
/* Sections: no margin, padding handles the breathing room */
main > .section { margin: 0; padding: var(--section-padding) 0; }

/* Blocks: margin-top between adjacent wrappers */
main > .section > .default-content-wrapper + *,
main > .section > [class$="-wrapper"] + [class$="-wrapper"],
main > .section > [class$="-wrapper"] + .default-content-wrapper {
  margin-top: var(--block-padding);
}
```

## Token values
| Token | Desktop | Mobile | Controls |
|-------|---------|--------|----------|
| `--section-padding` | 120px | 60px | Section top/bottom padding |
| `--block-padding` | 64px | 32px | Margin between blocks in a section |

## Overrides
- First section: `padding-top: 0` (starts at header bottom)
- Centered hero section: `padding-top: 64px; padding-bottom: 0` (custom hero spacing)
- Full-bleed blocks (marquee): `.section.marquee-container { padding: 0 }` — block uses own 40px internal padding

## Pitfalls
- `main > .section > * + *` — the universal `*` has zero specificity and loses. Use explicit attribute selectors.
- The `> div` inside a section is `.default-content-wrapper`, not a generic container — block wrappers are its siblings, not its children.
