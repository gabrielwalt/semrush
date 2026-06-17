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
| Homepage, Nav, Footer | **Refined, design-open** | **Unfrozen 2026-06-17** by the user: previously style-validated/frozen, now reopened so I may take design liberties and improve them. Still Refined (keep the brand), but the Frozen-Tools Rule is suspended for them. ⚠️ These share blocks (`teaser`, `carousel`, `marquee`, `header`, `footer`) with One/Enterprise — a change to a shared block still ripples; verify those pages too (the *check-the-ripple* discipline survives the unfreeze). |

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

**Enterprise tab panels (`body.template-enterprise .section-tabs .teaser`):** each panel is a CARD — `1px solid rgb(255 255 255 / 12%)` border, `--radius-m` (8px) corners, `var(--space-xl)` padding, `rgb(255 255 255 / 4%)` translucent fill over the dark glass. Image sits on the LEFT (parser emits media-row-first → `teaser-media-left`).

**Radius scale:** `--radius-s` (5px), `--radius-m` (8px), `--radius-l` (12px), `--radius-pill` (100px). `--radius-l` is the card/glass-frame corner (glass surface, carousel/media glass, /one/ icon cards) — added in F07 to replace scattered raw `12px`/`10px` literals. (Historical note: `--radius-l` did NOT exist before 2026-06-17; older code that referenced it resolved to 0 — that token now exists, so the hazard is gone.)

**Dark-template header inversion (`body.template-dark header`):** the header inverts fully with the page, not just its text. The text already inherits white from `body.template-dark`; three rules in `styles.css` add the rest — `.nav-wrapper` background → `--dark-color`, the logo `<img>` → `filter: brightness(0) invert(1)` (white), and the two `.nav-tools` CTAs invert (Log In → white-outline/transparent, Sign Up → white fill + dark text). `header.js` skips its desktop scroll-fade (which writes an inline light background) when `body.template-dark` is present, so the dark header bg isn't overwritten on scroll. Scoped to `template-dark`, so only enterprise inverts; the frozen homepage/`/one/` headers stay white.

**Semrush One closing section (`body.template-one .section.section-dark`):** the closing "Win every search…" region inverts to dark. Customized for template-one only (the shared `section-dark` on homepage/seo is untouched): 90px top/bottom padding, centered default-content, heading 46px/line-height 1 uppercase (36px <768px), and a FILLED purple-pill CTA (`--accent-color` bg, `--dark-color` text) overriding the generic outline-white dark-section button. Plain legal links inverted to white + underlined. Each award shows the decorative G2 shield badge `/icons/one-award-badge.svg` (50×54px) injected via `.cards-awards-card-body::before` — a single repeated glyph, so it's code not content.

---

## Typography

- **Heading font:** Lazzer (Inter fallback)
- **Body font:** Inter
- **Body weight:** 500 (not 400 — the original uses Lazzer at weight 500 for all body text)
- **Body letter-spacing:** `-0.02em` (`--tracking-snug`) globally
- **Eyebrow/pre-title letter-spacing:** `+0.02em` (`--tracking-wide`) — used for section eyebrow labels

**Title / font-size scale (full, desktop → mobile):**

| Token | Desktop | Responsive | Role |
|-------|---------|-----------|------|
| `--font-size-display` | 84px | 56px <1024 | h1 / hero |
| `--font-size-heading-xl` | 64px | 32px <1024 | h2 / big section headings |
| `--font-size-heading-l` | 48px | 32px <1024 | h3 / section headings |
| `--font-size-heading-ml` | 40px | fixed | feature-card + tab-panel headlines |
| `--font-size-heading-m` | 24px | 18px <768 | h4 / subheads |
| `--font-size-heading-s` | 21px | fixed | card titles, lead/emphasis body |
| `--font-size-body-l` | 18px | fixed | body / lead paragraph |
| `--font-size-body-m` | 16px | fixed | body |
| `--font-size-body-s` | 14px | fixed | small / captions (`--font-size-caption` is an alias) |
| `--font-size-label` | 12px | fixed | labels, eyebrows |

**⚠️ Responsive-token hazard:** `display`/`heading-xl`/`heading-l`/`heading-m` SHRINK under `@media`. Only tokenize a `font-size` literal with one of these if the element *should* shrink on mobile AND the literal isn't a fixed display value (stat number, icon glyph) or inside a `@media` block. The `ml`/`s`/`body-*`/`label` tokens are fixed → always safe. (See `typography-craft`.) Bespoke big stat numbers (180/137/110/96/80px) stay literals — they're a per-block display treatment, not a reusable title role.

Heading letter-spacing: H1/H2/H3 use `--tracking-tight` (-0.04em), H4 uses `--tracking-snug` (-0.02em). H4 line-height is 1.2 (not 1.1 like other headings).

Tablet breakpoint (< 1024px) reduces `--font-size-display` to 56px and `--font-size-heading-xl` to 32px.

---

## Spacing

| Token | Desktop | Mobile | Usage |
|-------|---------|--------|-------|
| `--section-padding` | 60px | 30px | Between sections (top+bottom padding on each `.section`) |
| `--block-padding` | 60px | 30px | Block-to-block rhythm (applied as `margin-top` via the `* + *` rule) |
| `--container-padding` | 32px | 16px | Page edge |
| `--container-max-width` | 1440px | — | Outermost cap |
| `--nav-height` | 84px | — | Fixed nav bar |
| `--cta-height` | 60px | — | Standard button height |

**`--space-*` scale (ascending, fixed):** `xs` 8 · `xxs` 12 · `s` 16 · `m` 24 · `l` 32 · `xl` 40 · `2xl` 64 · `3xl` 120. ⚠️ `--space-xxs` (12px) sits ABOVE `xs` and below `s` — named `xxs` (not `2xs`) to read as "between xs and s", not smaller. It's a recurring small gap / glass-frame padding (~13 uses). All `--space-*` are fixed (no `@media` shrink) → always safe to tokenize a matching single-value `padding`/`gap`/`margin`.

**`--radius-*` scale:** `s` 5 · `m` 8 · `l` 12 · `pill` 100. The former 6px literals were snapped to `--radius-s` (5px) as near-matches. Off-scale one-offs (2px hairline, 16px) stay literal.

> Values measured 2026-06-17 on index/one/enterprise at 1440px desktop and verified against `styles/styles.css` `:root`. The `--section-padding`/`--block-padding` pair is a single rhythm value (60/30), not two different ones. Per-section overrides exist (e.g. `/one/` uses 90px on one section) — those are page-level one-offs, NOT foundation.
>
> **The `--space-*` scale** is `8 / 16 / 24 / 32 / 40 / 64 / 120` (xs→3xl). Note **`12px` is a de-facto additional step** used 30+ times as a small intra-component gap/padding (glass-frame padding+radius, carousel `--slider-gap`, insights-widget, testimonials) — it is intentional and load-bearing, not an off-scale accident (reviewed in F08). `--space-l` (32) and `--space-xl` (40) are both in active use and visually distinct — keep both.

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

## Named Foundation Rules

The de-facto global system, **measured across the style-validated/keeper pages (index, one, enterprise) on 2026-06-17** at 1440px desktop and cross-checked against `styles/styles.css`. A value is a *foundation rule* only because it **recurs across all three pages** — one-page values (e.g. `/one/`'s 90px section, enterprise's 46px hero h2) are explicitly NOT foundation and are excluded. Cite these by name when styling the remaining pages so they stay consistent.

| Rule | Value | Evidence (recurs on) | Notes |
|------|-------|----------------------|-------|
| **Type-scale ratio** | ~**1.31** between the top steps: display **84** → xl **64** → l **48** | index, one, enterprise | 84/64 = 1.31, 64/48 = 1.33. Below that the scale drops to h4 **24px** and body **18px**. Tablet (<1024px) collapses display→56, xl/l→32. |
| **Display/H1 size** | **84px** desktop / 56px <1024px, line-height **1.1**, weight 600 | index h1, one h1 | The page's largest type. |
| **Heading tracking** | **-0.04em** (`--tracking-tight`) on h1/h2/h3; **-0.02em** (`--tracking-snug`) on h4 | index, one, enterprise | Headings are optically tightened; h4 less so. Line-height 1.1 on headings (h4 = 1.2). |
| **Body type** | Inter **500**, **18px**, line-height **1.5** (27px), tracking **-0.02em** | index, one, enterprise (all body `<p>`) | Body is weight 500, NOT 400 — matches the source. Line-height 1.5 is the relaxed reading measure. |
| **Body-contrast floor** | **≥ 4.5:1**, currently **17:1** everywhere | index, one, enterprise — light AND dark sections | Ink `rgb(24 30 21)` on white and white on `--dark-color` both measure 17:1. Any new surface color must keep body text ≥ 4.5:1. |
| **Section-spacing rhythm** | **60px** desktop / **30px** mobile, applied symmetrically (`padding: var(--section-padding) 0`) + block `margin-top: var(--block-padding)` via `* + *` | index, one, enterprise | One rhythm value drives both section padding and block gap. See `vertical-spacing-system`. |
| **Button system** | pill (`--radius-pill` 100px), **60px** height, `padding: 0 32px`, **16px / 600** | index, one, enterprise | Primary (purple), secondary (outline), accent (dark fill); all hover → `--accent-hover`. |
| **Heading font** | Lazzer, with `Inter` fallback | declared in `:root` on all pages | ⚠️ **No `@font-face` for Lazzer is loaded** (only Inter 400/500/600/700 in `fonts.css`) — headings currently render in the Inter fallback. Flagged as a proposed additive fix below; not part of the validated look until resolved. |

## Proposed additive fixes (await approval — do NOT apply)

Discovered during the 2026-06-17 foundation audit. Each is non-destructive and would be applied additively per the Frozen-Tools Rule. **Not applied** — listed for review (craft/a11y items are also being filed as PROJECT-PLAN tasks under Task C).

1. **Lazzer is never loaded.** `--heading-font-family` is `"Lazzer", "Inter", sans-serif` but `styles/fonts.css` declares no `@font-face` for Lazzer, so every heading on every page falls back to Inter. Either add the Lazzer `@font-face` (restores the intended brand heading voice) or formally drop Lazzer from the token and standardize on Inter for headings. Decision needed — this changes the look of the frozen pages, so it needs explicit sign-off.

## Adding a Token

1. Add to `styles/brand.css` or `styles/styles.css` `:root`
2. Update this file
3. Use `var(--token-name)` everywhere
