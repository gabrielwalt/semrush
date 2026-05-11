# PROJECT-DESIGN.md — Design System

Design intent and token inventory. For actual values read `styles/brand.css` and `styles/styles.css`.  
**Update when tokens are added, renamed, or removed.**

---

## Token Files

| File | Purpose |
|------|---------|
| `styles/brand.css` | Brand colors, fonts |
| `styles/styles.css` | Type scale, spacing, layout tokens, global resets |
| `styles/fonts.css` | `@font-face` declarations |
| `styles/lazy-styles.css` | Below-the-fold and section styles |

---

## Colors

| Token | Purpose |
|-------|---------|
| `--background-color` | White page background |
| `--dark-color` / `--text-color` | Near-black text and dark sections |
| `--light-color` | Light gray section backgrounds |
| `--accent-color` | Brand purple — primary CTAs |
| `--accent-cyan` | Mint/cyan — stats, data viz |
| `--accent-hover` | Darker lavender — universal CTA hover |

---

## Typography

- **Heading font:** Lazzer (Inter fallback)
- **Body font:** Inter

Key size tokens: `--font-size-display` (84/56px), `--font-size-heading-xl` (64/48px), `--font-size-heading-l` (48/32px), `--font-size-body-l` (18px), `--font-size-body-m` (16px).

---

## Spacing

| Token | Desktop | Mobile | Usage |
|-------|---------|--------|-------|
| `--section-padding` | 120px | 60px | Between sections |
| `--block-padding` | 64px | 32px | Within blocks |
| `--container-padding` | 32px | 16px | Page edge |
| `--container-max-width` | 1440px | — | Outermost cap |
| `--nav-height` | 84px | — | Fixed nav bar |
| `--cta-height` | 60px | — | Standard button height |

---

## Breakpoints

- Mobile: < 768px (single-column, hamburger)
- Tablet: 768–1023px
- Desktop: >= 1024px (full nav, multi-column)

Write mobile-first.

---

## Buttons

All buttons: pill shape (`--radius-pill: 100px`), 60px height, `padding: 0 32px`, 16px/600 font.

| Variant | Markup | Style |
|---------|--------|-------|
| Primary | `<strong><a>` | Purple bg, dark text |
| Secondary | `<em><a>` | Transparent bg, dark border |

Hover: all transition to `--accent-hover` (#b072ff), 0.2s ease.

---

## Adding a Token

1. Add to `styles/brand.css` or `styles/styles.css` `:root`
2. Update this file
3. Use `var(--token-name)` everywhere
