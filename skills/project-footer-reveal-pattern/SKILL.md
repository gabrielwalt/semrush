---
name: project-footer-reveal-pattern
description: Sticky reveal element behind footer for scroll-to-unveil branding effect. Use when a large text or image should appear fixed at the bottom and get revealed as the footer scrolls away.
---

A decorative element (e.g., large brand wordmark) stays pinned to the viewport bottom and gets progressively revealed as the footer content scrolls up and away.

## Recipe
1. **Structure**: The reveal element must be a **sibling** of the footer block, NOT a child. In EDS, `footer.js` appends the reveal to the `<footer>` element itself, alongside the `.footer` block.
   ```
   footer (element)
     └── .footer (block)       → position: relative; z-index: 1; background: white
     └── .footer-reveal        → position: sticky; bottom: 0; z-index: 0
   ```
2. **Footer block** covers the reveal: `position: relative; z-index: 1; background: var(--background-color)` — the white background is essential to hide the reveal behind it.
3. **Reveal is sticky**: `position: sticky; bottom: 0; z-index: 0` — it sticks to the viewport bottom. The footer scrolls normally while the reveal stays put.
4. **Reveal styling**: `display: flex; align-items: flex-end; justify-content: center; height: 550px; padding: 0 var(--container-padding) 32px` — content centered at the bottom.
5. **Brand text**: `font-size: clamp(120px, 15vw, 220px); font-weight: 700; white-space: nowrap` — responsive sizing.

## Pitfalls
- **Never put the reveal inside the `.footer` block** — the block has `position: relative; z-index: 1; background: white` which will contain and cover the reveal, preventing the sticky effect. The reveal MUST be a sibling at the `<footer>` level.
- **z-index layering is critical** — footer block z-index must be HIGHER than reveal (1 vs 0). If equal or inverted, the reveal shows through the footer content.
- **The footer block MUST have an opaque background** — `transparent` won't cover the reveal.
- **`overflow: hidden` on the `<footer>` element will break sticky** — don't set it.

## How it works
As the user scrolls past the footer, the white `.footer` block (z-index: 1) scrolls up out of view. The `.footer-reveal` (z-index: 0, sticky bottom: 0) stays pinned to the viewport bottom. Since the reveal is behind the footer in z-order, it's hidden while the footer is in view and progressively revealed as the footer exits.

## Footer bottom bar pattern
The footer bottom bar (social icons + copyright + legal links) follows this layout:
- **Social icons**: `display: flex; gap: 0` with 40×40px click targets, 24×24px SVG icons. Use **outline-style** SVGs (stroke, not fill) except for brand marks like X/Twitter.
- **Legal row**: `justify-content: space-between` to spread Adobe logo + copyright left, legal links right. Legal links use `gap: var(--space-xl)` for generous spacing.
- **Adobe logo**: Replace "Adobe" text link with `<img src="/icons/adobe.svg">` via JS decoration. Size: 62×15px.
- **No border-top divider** between link columns and bottom bar — use whitespace only.

See also: `vertical-spacing-system` (section spacing), `eds-dom-structure` (EDS wrapper chain)
