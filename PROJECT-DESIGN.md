# PROJECT-DESIGN.md — Design System Overview

Design intent, token inventory, and where to find things.  
For actual values read `styles/brand.css` and `styles/styles.css` directly.  
**Update when tokens are added, renamed, or removed.**

---

## Token Files

| File | Purpose |
|------|---------|
| `styles/brand.css` | Brand-level tokens — colors, fonts, core spacing. Imported first. |
| `styles/styles.css` | Imports brand.css; adds type scale, layout tokens, global resets |
| `styles/fonts.css` | `@font-face` declarations |
| `styles/lazy-styles.css` | Below-the-fold and section styles |

---

## Colors

Global tokens live in `styles/brand.css`. Key ones:

| Token | Purpose |
|-------|---------|
| `--accent-color` | Brand purple — used for primary CTAs and highlights |
| `--text-color` / `--dark-color` | Near-black — primary text and dark section backgrounds |
| `--background-color` | White page background |

Block-scoped colors (defined inside their own CSS files, not global tokens):
- `stats`: mint green accent (`--stats-accent`) for the active-state arrow
- `hero`, `promo-cards`: gradient stops as local custom properties

---

## Typography

Two font families, both defined as tokens in `brand.css`:
- **Heading:** Lazzer (custom web font) with Inter fallback
- **Body:** Inter

Full type scale (sizes for xxl → xs, desktop and mobile breakpoints) is in `styles.css`. Read it directly — don't duplicate the values here.

---

## Breakpoints

| Token | Value | Usage |
|-------|-------|-------|
| Mobile | < 768px | Single-column, stacked, hamburger nav |
| Tablet | 768px–1023px | Wider content, sliders active, still hamburger |
| Desktop | ≥ 1024px | Full nav, multi-column, max-width 1200px |

Write mobile-first: base styles are mobile, `@media (width >= 768px)` for tablet, `@media (width >= 1024px)` for desktop.

---

## Button Design Intent

Buttons in this project are **not** styled globally — each block styles its own buttons. The consistent design intent is:

- **Shape:** Always pill (`border-radius: 100px`) — never square or rectangular
- **Primary CTA:** Accent-color fill, dark text
- **Secondary / default:** Outlined (transparent bg, dark border)
- **On dark backgrounds:** White outlined

See individual block CSS files for the actual implementation.

---

## Section Styles

Not yet implemented. Will be tracked here once added.

---

## Adding a Token

1. Add to `styles/brand.css` (brand) or `styles/styles.css` `:root` (layout/type)
2. Add a row to the relevant table above
3. Use `var(--token-name)` everywhere — never hardcode the raw value
