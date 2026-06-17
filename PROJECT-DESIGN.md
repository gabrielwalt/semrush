# PROJECT-DESIGN.md — Design Foundation & System

The **guiding design document** for this migration — not just a record of what was built, but the direction that shapes what gets built. Two layers:
1. **Migration Strategy** (below) — scope, sources, fidelity, constraints. Decided up front via `migration-orientation`, before any import. This is what later styling work consults to know *how literally to match* each page.
2. **Design System** (tokens, type, spacing, buttons) — the global *workbench* every block is built on. For actual values read `styles/brand.css` and `styles/styles.css`.

**Update when:** the migration strategy changes (fidelity, a new per-page override, a new constraint), or tokens are added, renamed, or removed.

---

## Migration Strategy

> Established via `migration-orientation` before the first import (**The Brand-Foundation-First Rule**). Reconstructed from work already done; **site-default fidelity confirmed by the user as Refined.**

| Input | Decision |
|-------|----------|
| **Scope** | Semrush marketing site — homepage (validated reference) + toolkit/landing/enterprise pages. ~12 representative pages tracked in `PROJECT-STATUS.md`. |
| **Content source** | The live source site (`https://www.semrush.com/` and subdomains), imported via the marker-driven script. |
| **Design source** | **Same site** — the look comes from the live Semrush pages themselves. No separate Figma or reference site. |
| **Site-default fidelity** | **Refined** — keep the Semrush brand essence and page structure, fix weak spots and uplevel craft to serve the global foundation. Improve rhythm, hierarchy, and states; never change the brand identity. The validated homepage is the design touchstone. |
| **Copy / improve / inspire** | **Improve.** Treat each original page as a strong reference, not a pixel spec — reproduce its intent and structure, then strengthen it toward the foundation. |
| **Reuse** | EDS Block Collection + the project's own growing toolbox (`PROJECT-BLOCKS.md`). Reuse-first before building new (**The Toolbox-First Rule**). |
| **Constraints** | Fast/lean/clean, author-friendly, accessible (WCAG 2.1 AA target), mobile-ready, PageSpeed 100 target. |

### Per-page fidelity overrides
First-match-wins: an override here beats the site default. Empty = the page uses the site default.

| Page / template | Fidelity | Why |
|-----------------|----------|-----|
| App-shell SPA pages — `advertising`, `traffic`, `ai-seo`, `features` | **Reimagined** | Weak legacy templates that import thin / time out. Treat as redesign candidates: capture the essence and rebuild on our foundation with real liberties. |

All other pages (One, Enterprise, SEO, Content, Pricing, Local, Social, PR, Company) use the **Refined** site default — no override.

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

**Dark-template header inversion (`body.template-dark header`):** the header inverts fully with the page, not just its text. The text already inherits white from `body.template-dark`; three rules in `styles.css` add the rest — `.nav-wrapper` background → `--dark-color`, the logo `<img>` → `filter: brightness(0) invert(1)` (white), and the two `.nav-tools` CTAs invert (Log In → white-outline/transparent, Sign Up → white fill + dark text). `header.js` skips its desktop scroll-fade (which writes an inline light background) when `body.template-dark` is present, so the dark header bg isn't overwritten on scroll. Scoped to `template-dark`, so only enterprise inverts; the frozen homepage/`/one/` headers stay white.

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
