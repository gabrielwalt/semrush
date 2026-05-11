# PROJECT-DESIGN.md — Design System Overview

Design intent, token inventory, and where to find things.  
For actual values read `styles/brand.css` and `styles/styles.css` directly.  
**Update when tokens are added, renamed, or removed.**

---

## Token Files

| File | Purpose |
|------|---------|
| `styles/brand.css` | Brand-level tokens — colors, fonts. Imported first. |
| `styles/styles.css` | Imports brand.css; adds type scale, spacing, layout tokens, global resets |
| `styles/fonts.css` | `@font-face` declarations |
| `styles/lazy-styles.css` | Below-the-fold and section styles |

---

## Colors

| Token | Value | Purpose |
|-------|-------|---------|
| `--background-color` | `rgb(255 255 255)` | White page background |
| `--light-color` | `#f8f8f8` | Light gray section backgrounds |
| `--dark-color` | `rgb(24 30 21)` | Near-black — dark section bgs, primary text |
| `--text-color` | `rgb(24 30 21)` | Default body text color |
| `--link-color` | `rgb(24 30 21)` | Link color |
| `--link-hover-color` | `rgb(24 30 21)` | Link hover color |
| `--accent-color` | `rgb(193 144 255)` | Brand purple — primary CTAs, highlights |
| `--accent-cyan` | `rgb(24 240 191)` | Mint/cyan accent — stats, data viz |

Block-scoped colors (defined inside their own CSS files, not global tokens):
- `stats`: mint green accent (`--stats-accent`) for the active-state arrow
- `hero`, `promo-cards`: gradient stops as local custom properties

---

## Typography Scale

Two font families:
- **Heading:** `--heading-font-family`: Lazzer with Inter fallback
- **Body:** `--body-font-family`: Inter

### Size Tokens

| Token | Desktop | Mobile (<768px) | Role |
|-------|---------|-----------------|------|
| `--font-size-display` | 84px | 56px | Hero h1 |
| `--font-size-heading-xl` | 64px | 48px | Promo h2 |
| `--font-size-heading-l` | 48px | 32px | Section headings h3 |
| `--font-size-heading-m` | 24px | 18px | Card subtitles h4 |
| `--font-size-body-l` | 18px | 18px | Large body text |
| `--font-size-body-m` | 16px | 16px | Default body / buttons |
| `--font-size-body-s` | 14px | 14px | Small body text |
| `--font-size-caption` | 14px | 14px | Eyebrows, captions |
| `--font-size-label` | 12px | 12px | Card labels, tags |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--line-height-tight` | 1.0 | Eyebrows, labels, compressed headings |
| `--line-height-snug` | 1.1 | Display + large headings |
| `--line-height-normal` | 1.2 | Medium headings, buttons |
| `--line-height-relaxed` | 1.5 | Body text, paragraphs |

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--tracking-tight` | -0.04em | Display, large headings |
| `--tracking-snug` | -0.02em | Medium headings, body |
| `--tracking-wide` | 0.02em | Eyebrows, captions |

### Backward-Compat Aliases

Older tokens still work — they reference the new scale:

| Alias | Maps to |
|-------|---------|
| `--heading-font-size-xxl` | `var(--font-size-display)` |
| `--heading-font-size-xl` | `var(--font-size-heading-xl)` |
| `--heading-font-size-l` | `var(--font-size-heading-l)` |
| `--heading-font-size-m` | `var(--font-size-heading-m)` |
| `--heading-font-size-s` | `var(--font-size-body-m)` |
| `--heading-font-size-xs` | `var(--font-size-body-m)` |
| `--body-font-size-m` | `var(--font-size-body-l)` |
| `--body-font-size-s` | `var(--font-size-body-m)` |
| `--body-font-size-xs` | `var(--font-size-body-s)` |

---

## Spacing Scale

| Token | Value (desktop) | Value (mobile) | Usage |
|-------|-----------------|----------------|-------|
| `--space-xs` | 8px | 8px | Tight gaps, minor margins |
| `--space-s` | 16px | 16px | Button padding, list gaps |
| `--space-m` | 24px | 24px | Element spacing, card padding |
| `--space-l` | 32px | 32px | Section inner margins |
| `--space-xl` | 40px | 40px | Medium separations |
| `--space-2xl` | 64px | 64px | Block inner padding (desktop) |
| `--space-3xl` | 120px | 120px | Section-level spacing |

### Layout Spacing

| Token | Desktop | Mobile | Usage |
|-------|---------|--------|-------|
| `--section-padding` | 120px | 60px | Vertical padding between sections |
| `--block-padding` | 64px | 32px | Internal padding within blocks |
| `--container-padding` | 32px | 16px | Horizontal page edge padding |

### Layout Dimensions

| Token | Value | Usage |
|-------|-------|-------|
| `--container-max-width` | 1440px | Outermost container cap |
| `--content-max-width` | 1200px | Content area max-width |
| `--nav-height` | 70px | Fixed nav bar height |

---

## Border Radii

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-s` | 5px | Cards, small containers |
| `--radius-m` | 8px | Dropdowns, inputs, quote cards |
| `--radius-pill` | 100px | Buttons (pill shape) |

---

## Breakpoints

| Name | Value | Usage |
|------|-------|-------|
| Mobile | < 768px | Single-column, stacked, hamburger nav |
| Tablet | 768px–1023px | Wider content, sliders active, still hamburger |
| Desktop | >= 1024px | Full nav, multi-column, max-width content |

Write mobile-first: base styles are mobile, `@media (width >= 768px)` for tablet, `@media (width >= 1024px)` for desktop.

---

## Button System

Buttons are styled globally in `styles.css`. Blocks inherit the global styles and only override when context demands it (e.g. inverted colors on dark backgrounds, compact sizing).

### Base (all buttons)

All `a.button` and `button.button` elements share: pill shape, 16px/600 font, -0.02em tracking, 60px height, `padding: 0 32px`, inline-flex centered.

### Variants

| Variant | EDS markup | Background | Border | Text | Usage |
|---------|-----------|-----------|--------|------|-------|
| **Primary** | `<strong><a>` | Purple accent | transparent | Dark | Hero CTA, Footer CTA, AI Viz CTA |
| **Secondary** | `<em><a>` | Transparent | 1px solid dark | Dark | Promo "Try for free", Stats "Learn more" |
| **Accent** | Both `<strong>` + `<em>` | Dark solid | dark | White | N/A (reserved for special emphasis) |

### Context overrides (block CSS)

| Block | Override | Reason |
|-------|---------|--------|
| Header nav-tools | `height: auto; padding: 16px 24px` | Compact header buttons |
| Enterprise promo | `border-color: #fff; color: #fff` | Light variant on dark bg |
| Stats | `height: 48px; padding: 0 24px` | Compact inline CTA |

### Hover states

- Primary: darkened accent (`color-mix 85% black`)
- Secondary: subtle background fill (`rgb(24 30 21 / 5%)`)
- Accent: switches to accent purple fill

### Responsive

No breakpoint changes to button sizing — same dimensions at all viewports. Header buttons hide on mobile (visibility controlled by nav state).

---

## Section Styles

| Class | Effect |
|-------|--------|
| `.section.light` / `.section.highlight` | Light gray background (`--light-color`) |

Section padding uses `var(--section-padding)` which responds to breakpoints (120px desktop, 60px mobile).

---

## Adding a Token

1. Add to `styles/brand.css` (brand) or `styles/styles.css` `:root` (layout/type)
2. Add a row to the relevant table above
3. Use `var(--token-name)` everywhere — never hardcode the raw value
