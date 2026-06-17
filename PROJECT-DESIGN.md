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

**Page gradient (default):** `linear-gradient(rgb(220 238 235) 0%, rgb(232 225 255) 75%, rgb(255 255 255) 100%)` with `background-size: 100% 2814px`.

**Semrush One page gradient (`body.template-one`):** `linear-gradient(rgb(193 144 255) 5%, var(--color-teal) 42%, var(--color-teal) 64%, #fff 92%)` over white, capped at `100% 1250px` so it fades to white before the "Built for how people search today" title. The hero teaser is transparent on this page so its purple comes from this background. A **second gradient region** is layered on `main` lower down (white→teal→purple behind "The only tool…" → icon cards → testimonial), ended by the decorative comb-fade image `/icons/one-gradient-fade.png` (purple→white striped band). Both are background LAYERS on `main` (vertically positioned with explicit `Npx` offsets) — not z-index:-1 pseudo-elements, which render behind main's white base.

**Semrush One closing section (`body.template-one .section.section-dark`):** the closing "Win every search…" region inverts to dark. Customized for template-one only (the shared `section-dark` on homepage/seo is untouched): 90px top/bottom padding, centered default-content, heading 46px/line-height 1 uppercase (36px <768px), and a FILLED purple-pill CTA (`--accent-color` bg, `--dark-color` text) overriding the generic outline-white dark-section button. Plain legal links inverted to white + underlined. Each award shows the decorative G2 shield badge `/icons/one-award-badge.svg` (50×54px) injected via `.cards-awards-card-body::before` — a single repeated glyph, so it's code not content.

---

## Typography

- **Heading font:** Lazzer (Inter fallback)
- **Body font:** Inter
- **Body weight:** 500 (not 400 — the original uses Lazzer at weight 500 for all body text)
- **Body letter-spacing:** `-0.02em` (`--tracking-snug`) globally
- **Eyebrow/pre-title letter-spacing:** `+0.02em` (`--tracking-wide`) — used for section eyebrow labels

Key size tokens: `--font-size-display` (84/56px), `--font-size-heading-xl` (64/32px at tablet), `--font-size-heading-l` (48/32px), `--font-size-body-l` (18px), `--font-size-body-m` (16px).

Heading letter-spacing: H1/H2/H3 use `--tracking-tight` (-0.04em), H4 uses `--tracking-snug` (-0.02em). H4 line-height is 1.2 (not 1.1 like other headings).

Tablet breakpoint (< 1024px) reduces `--font-size-display` to 56px and `--font-size-heading-xl` to 32px.

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
| Accent | `<strong><em><a>` | Dark fill, white text |

Hover: all transition to `--accent-hover` (#b072ff), 0.2s ease.

**Nav CTA sizes:** "Log In" button uses compact height with `padding: 16px 24px` (outlined); "Sign Up" uses the same compact height, solid dark fill.

---

## Adding a Token

1. Add to `styles/brand.css` or `styles/styles.css` `:root`
2. Update this file
3. Use `var(--token-name)` everywhere
