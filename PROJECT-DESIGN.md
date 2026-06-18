# PROJECT-DESIGN.md — Design Foundation & System

The **guiding design document** for this migration — not just a record of what was built, but the direction that shapes what gets built. Two layers:
1. **Migration Strategy** (below) — scope, sources, fidelity, constraints. Decided up front via `migration-orientation`, before any import. This is what later styling work consults to know *how literally to match* each page.
2. **Design System** (tokens, type, spacing, buttons) — the global *workbench* every block is built on. For actual values read `styles/brand.css` and `styles/styles.css`.

**Per-template branding lives in `PROJECT-TEMPLATES.md`** — the canonical template hierarchy (3 chromes → 12 templates → sub-categories, distilled from 47 raw discovered templates), what each is for, how they differ, and the branding-rule deltas each adds on top of this foundation. This file owns the *global* system; that file owns the *per-template* application. Keep them in sync when a template-level rule promotes a value to a global token.

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

## Brand Gist — what makes a page feel "Semrush"

The distilled essence, extracted across the validated pages + the full cross-site screenshot pass (home, enterprise dark landing, free-tools, careers, App Center, comparison, case study). These are the **named concepts** every template is interpreted through — cite them by name. They are direction, not pixel specs: at **Refined/Reimagined** fidelity we take liberties in *how* we express each concept, but a page that drops them stops reading as Semrush.

| # | Concept | What it means | How it shows up |
|---|---------|---------------|-----------------|
| **B1** | **Confident display type** | Oversized, optically-tightened headings (Lazzer/Inter, `--tracking-tight` −0.04em, weight 600) are the brand's loudest instrument. Short, declarative, often two-line ("One team. All ambition.", "Outrank and outpace."). | display 84 hero, `text-wrap: balance`, headline does the talking — not decoration. |
| **B2** | **Purple as the signal, not the field** | Brand purple (`--accent-color`) is the 10% accent (60-30-10): CTAs, one highlighted column, one drenched hero. The teal→lavender→white **page gradient** is the ambient brand wash that ties pages together. Cyan (`--accent-cyan`) is data-only. | gradient lobby, purple pill CTAs, the *one* purple-drench resource hero, highlighted comparison column. |
| **B3** | **Product truth as hero** | The product UI itself (dashboards, charts, SERP widgets) is shown, not abstracted — screenshots, stat figures, real numbers. Semrush sells capability, so it *shows the tool*. | hero screenshot strips, big stat numerals (28M+, 176.7K, 86.8%), chart cards. |
| **B4** | **Generous dark moments** | High-impact pages punctuate with full-bleed dark sections (`--dark-color` + `--color-inverse`) — the closing CTA, the enterprise theme — for contrast and gravity. Used sparingly, they carry weight. | dark closing "Win every search" band, enterprise dark landing, dark footer + `SEMRUSH` reveal. |
| **B5** | **The SEMRUSH signature** | The giant `SEMRUSH` wordmark scroll-reveal at the foot of marketing pages is the brand's full-stop — unmistakable, owned. | footer reveal on every marketing-chrome page. |
| **B6** | **Energetic but disciplined motion** | Motion is purposeful (the reveal, hover feedback, scroll-in stats) — never decorative fade-rise on every section. Energy comes from bold type + color + product imagery, not animation. | the marquee logo strip, count-up stats, the footer reveal. |
| **B7** | **Quiet when the job is utility** | Not every page shouts. App Center, docs-like prose, legal, and dense listings are **deliberately calm** — flatter type, less color, more whitespace, function first. The brand's confidence shows in knowing when to be quiet. | App Center near-white shell, careers legal prose, listing grids. |

**The governing tension (cite as the Loud-vs-Quiet Rule):** Semrush is **loud where it sells, quiet where it serves.** A template's job determines its volume — marketing/campaign pages lean into B1–B6; utility/reference pages lean into B7. The **Expression Intensity Scale** below makes this assignable per template.

---

## Expression Intensity Scale (register)

Each template is assigned a **register** — how loudly it expresses the brand gist. This is the single biggest lever for "impactful where it matters, calm where it doesn't." Higher register = more of B1–B6; lower register = more of B7. Liberties are taken *within* a register, never across it (a Quiet page never grows a drenched hero).

| Register | Name | Volume | Gist concepts dialed up | Templates |
|----------|------|--------|-------------------------|-----------|
| **R4** | **Flagship** | Loudest | B1 display + B2 gradient/purple + B3 product + B4 dark moments + B5 reveal + B6 motion — all of it | `marketing-landing` (esp. `:dark`), `resource-detail:gated` (the purple drench) |
| **R3** | **Campaign** | Loud | B1 + B2 + B3 + B5; one dark moment max; motion on feedback only | `comparison`, `tool-detail`, `careers-landing` |
| **R2** | **Editorial** | Measured | B1 at reduced scale + B2 ambient gradient only; product imagery in-context; reading comfort leads | `article`, `case-study-detail`, `careers-content` |
| **R1** | **Utility** | Quiet (B7) | Minimal color, flat type scale, whitespace + function; no drench, no big display, no reveal theatrics | `app-detail`, `app-listing`, `careers-office-detail`, `careers-text` |

**First-match-wins for register conflicts:** explicit per-template assignment (the table above) → the template's chrome default (App-shell ⇒ R1, Careers ⇒ R2 unless landing, Marketing ⇒ R3) → R2. Sub-categories may shift one step (e.g. `tool-detail:single` sits at R3 but trims to a lighter R3 than `:hub`).

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
| `--color-inverse` | White text/borders on dark or drenched-purple surfaces (use the token, never ad-hoc `#fff`) |
| `--color-teal` | Brand teal — the top stop of the page gradient |

**Brand color roles (60-30-10, per `color-craft`).** The structured system behind the tokens, confirmed across the canonical templates:
- **Primary** — brand purple (`--accent-color` `rgb(193 144 255)`), hover `--accent-hover`. CTAs, focus, current selection, and the *one* place it goes dominant: the `resource-detail` purple-drench hero (a deliberate "Committed" exception to 60-30-10).
- **Neutral** — ink `rgb(24 30 21)` (a brand-tinted near-black, not pure `#000` — keep this; it's the cohesion tint), white background, `--light-color` section bands, `--color-border`, `--color-muted` for secondary text.
- **Accent-2** — mint/cyan (`--accent-cyan`) reserved for **stats / data-viz only** — never a second CTA color. Keeps the purple's 10% rare.
- **Surface inversion** — dark sections and the enterprise dark header use `--dark-color` + `--color-inverse`; both measure ~17:1 (well above the 4.5:1 floor).

**The chrome rule (entropy reduction — see `PROJECT-TEMPLATES.md`).** The source runs **three chromes**, bucketed empirically (rendered framing classes, never the URL path): **marketing** (brand nav/footer/gradient — `www` + `enterprise`, 67 pages), **App-shell** (App Center product application — left product rail, all `/apps/*`, 71 pages), and **careers** (`careers.semrush.com` sub-nav, 31 pages). All three are **kept as distinct chromes** (user decision) — App-shell and careers templates are built natively in their chrome, not folded onto marketing. Chrome is the hard top-level boundary: a template never spans chromes (so the same purpose in two chromes = two templates).

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
| `--font-size-quote` | 26px | 20px <768 | pull-quote / blockquote (NOT a heading — its own voice) |
| `--font-size-body-l` | 18px | fixed | body / lead paragraph |
| `--font-size-body-m` | 16px | fixed | body |
| `--font-size-body-s` | 14px | fixed | small / captions (`--font-size-caption` is an alias) |
| `--font-size-label` | 12px | fixed | labels, eyebrows |

**⚠️ Responsive-token hazard:** `display`/`heading-xl`/`heading-l`/`heading-m`/`quote` SHRINK under `@media`. Only tokenize a `font-size` literal with one of these if the element *should* shrink on mobile AND the literal isn't a fixed display value (stat number, icon glyph) or inside a `@media` block. The `ml`/`s`/`body-*`/`label` tokens are fixed → always safe. (See `typography-craft`.) **Responsive-aware tokens are the right tool when a role genuinely changes per breakpoint** — define once in base `:root`, override in the `@media :root` block, consumer keeps one `var()`. Bespoke big stat numbers (180/137/110/96/80px) stay literals — they're a per-block display treatment, not a reusable title role.

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
| `--measure` | 60ch | — | Reading-column cap for long-form text (`article`, `careers-text`, `case-study-detail` body). Promoted from the recurring `60ch` literal so the new text-heavy templates share one reading measure. |
| `--nav-height` | 84px | — | Fixed nav bar |
| `--cta-height` | 60px | — | Standard button height |

**`--space-*` scale (ascending, fixed):** `xs` 8 · `xxs` 12 · `s` 16 · `m` 24 · `l` 32 · `xl` 40 · `2xl` 64 · `3xl` 120. ⚠️ `--space-xxs` (12px) sits ABOVE `xs` and below `s` — named `xxs` (not `2xs`) to read as "between xs and s", not smaller. It's a recurring small gap / glass-frame padding (~13 uses). All `--space-*` are fixed (no `@media` shrink) → always safe to tokenize a matching single-value `padding`/`gap`/`margin`.

**`--radius-*` scale:** `s` 5 · `m` 8 · `l` 12 · `pill` 100. The former 6px literals were snapped to `--radius-s` (5px) as near-matches. Off-scale one-offs (2px hairline, 16px) stay literal.

> Values measured 2026-06-17 on index/one/enterprise at 1440px desktop and verified against `styles/styles.css` `:root`. The `--section-padding`/`--block-padding` pair is a single rhythm value (60/30), not two different ones. Per-section overrides exist (e.g. `/one/` uses 90px on one section) — those are page-level one-offs, NOT foundation.
>
> **The `--space-*` scale** is `8 / 16 / 24 / 32 / 40 / 64 / 120` (xs→3xl). Note **`12px` is a de-facto additional step** used 30+ times as a small intra-component gap/padding (glass-frame padding+radius, carousel `--slider-gap`, insights-widget, testimonials) — it is intentional and load-bearing, not an off-scale accident (reviewed in F08). `--space-l` (32) and `--space-xl` (40) are both in active use and visually distinct — keep both.

---

## Breakpoints

Exactly **two** sanctioned breakpoints site-wide — no others:

- Mobile: < 768px (single-column, hamburger)
- Tablet: 768–1023px (`@media (width >= 768px)`)
- Desktop: >= 1024px (`@media (width >= 1024px)` — full nav, multi-column)

Write mobile-first. The foundation (`styles/styles.css`) owns the breakpoint set, `detect.mjs` harvests it live, and `craft-breakpoint-stray` flags any block `@media` width outside it. The header JS reads the desktop breakpoint via `matchMedia('(min-width: 1024px)')` — keep it in sync if the desktop breakpoint ever changes.

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
| **Heading font** | Lazzer, with `Inter` fallback | declared in `:root` on all pages | ⚠️ **No `@font-face` for Lazzer is loaded** (only Inter 400/500/600/700 in `fonts.css`) — headings currently render in the Inter fallback. Tracked as open task **F01** in `PROJECT-PLAN.md` (decision needed: add the Lazzer `@font-face` vs. formally standardize headings on Inter); not part of the validated look until resolved. |
| **Three chromes, kept distinct** | marketing (67p) · app-shell (71p) · careers (31p) | all 12 templates | Bucket by RENDERED chrome, never URL. A template never spans chromes. App-shell + careers templates are built natively in their chrome (user decision), not folded to marketing. See `PROJECT-TEMPLATES.md`. |
| **Hero-size-by-purpose** | display **84** (campaign: marketing-landing, tool-detail, careers-landing) · xl **64** (browse/compare: comparison, app-listing, careers-office) · l **48** (catalog/utility: app-detail, careers-text) · brand-color band (editorial: article, case-study, resource) | across the 47 templates' representative pages | Hero weight signals page intent; pick the step by the template's purpose, not by copy length. |
| **Reading measure** | **`--measure` 60ch** on long-form body | recurs as `60ch` in `styles.css`; needed by article/text/case-study | One reading-column width across all text-heavy templates. |
| **Accent-2 is data-only** | `--accent-cyan` for stats/data-viz, never a 2nd CTA | foundation + case-study stat bands | Keeps brand purple's 10% rare (60-30-10, `color-craft`). |

> **Evidence note (2026-06-18):** the rules above the divider were measured on index/one/enterprise (the style-validated keepers). The four rules below the Heading-font row were derived from the **full 47-template cross-site analysis** (169 pages, `catalog/`) when distilling the 12 canonical templates across 3 chromes — they describe the *whole site's* gist, which is exactly what a foundation rule should be (`global-style-foundation`: capture the gist across pages, not one page). They are direction for the unbuilt templates, not yet style-validated in code.

## Adding a Token

1. Add to `styles/brand.css` or `styles/styles.css` `:root`
2. Update this file
3. Use `var(--token-name)` everywhere
