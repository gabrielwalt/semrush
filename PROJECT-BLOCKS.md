# PROJECT-BLOCKS.md — Block Inventory

All blocks, variants, and non-obvious intent. For implementation details read the block files.  
**Update whenever a block or variant is created, modified, or deleted.**

Authoring model: **augmented styles** — a small set of baseline blocks expanded by layered styling (auto-styles → variants → section styles → page templates). The decision framework lives in the `eds-content-modeling` skill; this file is the inventory of what currently exists.

---

## One-off (throw-away) registry

Every throw-away variant, section style, or page template is listed here so it can be removed when its pages are refactored or deleted. Conventions for each one-off:
1. **Name** with the `oneoff-` prefix (e.g. `oneoff-spotlight-banner`, `section-oneoff-…`, `template-oneoff-…`).
2. **Header comment** in the CSS/JS stating its scope and exactly which page(s) use it.
3. **Registry row** below.

| One-off name | Type | Used on | Remove when | Notes |
|--------------|------|---------|-------------|-------|
| `section-oneoff-ai-visibility` | Section style | Homepage AI Visibility Index | AI Visibility section removed/redesigned | Striped bottom SVG + 136px logo + centered/uppercase heading. Combine with `section-dark`. CSS: `styles.css` + `stats-visibility.css` |
| `teaser-oneoff-semrush-one` | Block variant | Homepage, `/one/` | Those promos redesigned | Branded teal/purple card background, dark text. CSS: `teaser.css`. On `/one/` (body.template-one) its container background is made transparent so the hero blends into the page-wide gradient — see `template-one` |
| `teaser-oneoff-enterprise` | Block variant | Homepage | Enterprise promo redesigned | Self-contained dark card: black + enterprise photo card background, white text + inverted buttons baked in (context-INDEPENDENT — no `teaser-dark` pairing). CSS: `teaser.css` |
| `teaser-oneoff-enterprise-platform` | Block variant | `/enterprise/` | Enterprise platform promo redesigned | Light gradient + bottom-aligned screenshot layout. CSS: `teaser.css` |
| `testimonials-oneoff-one` | Block variant | `/one/` | Semrush One testimonial redesigned | Giant stat number (clamp 96–200px) on transparent left column beside dark author card; no logo/quote in this instance. CSS: `testimonials.css` |

---

## Authoring Reference — Section Styles

Apply via **Section Metadata** block with `Style` key in the content.

| Style class | Effect | Use when | Combinability |
|-------------|--------|----------|---------------|
| `section-centered` | Centered flex column, max-width on headings/paragraphs | Hero sections with centered text | Layout — combines with a background style |
| `section-dark` | Dark background (`--dark-color`), white text, inverted buttons. Context-adaptive blocks inside (e.g. a bare `teaser`) AUTO-INVERT — no per-block dark variant needed (see `context-adaptive-blocks`) | Any dark-themed section (generic) | Background — mutually exclusive with other bg styles |
| `section-flush` | Zero padding top and bottom | Sections that need no breathing room (e.g. marquee) | Spacing — combines with anything |
| `section-tabs` | Turns the section's top-level blocks into tab panels with a tab list (each block's leading heading becomes its tab label) | A section whose blocks (teasers, cards, anything) should be tab-switched. Chosen over a `tabs` BLOCK because a block can't contain other decorated blocks | Behavior+layout — combines with a background style (e.g. `section-dark`). JS: `scripts/section-tabs.js`; generic CSS in `lazy-styles.css` |
| `section-oneoff-ai-visibility` | ONE-OFF: striped SVG at bottom + logo + centered heading | Homepage AI Visibility Index only | Decoration — designed to combine with `section-dark` (see registry) |

## Authoring Reference — Block Spacing Variants

Apply by adding the class to the block name, e.g. `Insights Widget (spacing-top-small)`.

| Variant class | Effect |
|---------------|--------|
| `spacing-top-none` | Zero top margin on this block |
| `spacing-top-small` | 16px top margin instead of default 60px |
| `spacing-top-large` | 120px top margin |
| `spacing-bottom-none` | Zero top margin on the NEXT block |
| `spacing-bottom-small` | 16px top margin on the next block |
| `spacing-bottom-large` | 120px top margin on the next block |

---

## Blocks

Each block listed once, with every variant it owns. **Used on** reflects the 5 keeper pages only (index, one, enterprise, nav, footer) after the 2026-06-17 scope reset — verified against the `class="…"` block tables in `content/*.plain.html`.

| Block | Variants | Used on | Notes |
|-------|----------|---------|-------|
| `announcement-bar` | — | Homepage | Dismissible top banner |
| `insights-widget` | — | Homepage | Search form with searchable country dropdown (115 countries), blinking cursor, glass surface |
| `media` | — | Homepage, Enterprise | Glass-framed image OR video (image alone = image; +video link = video). Detects video URLs in link text (EDS pattern for external media). Shares `.glass-surface` |
| `marquee` | — | Homepage, Enterprise | Infinite-scroll logo strip with edge fade mask. Enterprise re-skins logos white/28px additively (`body.template-enterprise`) |
| `teaser` | `teaser-oneoff-semrush-one`, `teaser-oneoff-enterprise`, `teaser-oneoff-enterprise-platform` | Homepage, Semrush One, Enterprise | 2-column block: media one side, text the other. **Content format = TWO rows, one cell each** (a content row + a media row; never two cells in one row — block JS reads only the first cell per row, so a 2-cell row silently drops the media). **Column side follows authored row order** — content-row-first → media right (default); media-row-first → `teaser.js` adds `teaser-media-left` and columns flip (glass frame mirrors to the left edge). `/one/` feature teasers alternate (media-left on the 1st & 3rd of the first group) to match the original. Mobile stacks text-above-media for both. TWO archetypes. **Default (bare `.teaser`)** = violet-gradient feature card on a LIGHT surface (`linear-gradient(#d4b1ff 0%, transparent 72.43%)`; 8px radius, 40px h3 / 21px body, optional 30px icon above heading) with a systematic full glass frame. **CONTEXT-ADAPTIVE**: a bare teaser dropped on a dark surface (a `section-dark` section OR a `template-dark` page) AUTO-INVERTS — violet box drops, text→white, buttons+glass invert — with NO variant (see `context-adaptive-blocks`). Used by the enterprise tab panels (template-dark). **Glass-media one-offs (any `teaser-oneoff-*`)** = self-styled branded card whose own surface is painted (context-INDEPENDENT — looks identical on any surface, never auto-inverts). Feature-card + auto-invert rules are scoped `:not([class*='oneoff'])` so one-offs stay frozen. **Text-only**: if no media row is authored, `teaser.js` adds `teaser-text-only` and the grid collapses to one column |
| `carousel` | `carousel-expansible`, `carousel-testimonials` | Homepage (resources + solutions), Enterprise (resources + testimonials) | Single horizontal scrolling row of cards with ‹/› nav; extends to right viewport edge. **Default** = image+text resource cards. **`carousel-expansible`** = product cards that expand/collapse one at a time (430→798px, "+" rotates to "×"); homepage solutions accordion. **`carousel-testimonials`** = portrait (4:5, 318px) image-only customer cards (enterprise "How leaders…") |
| `stats-facts` | — | Homepage | Click/scroll-to-expand stat rows; diagonal-line arrow pattern, 180px numbers |
| `stats-visibility` | — | Homepage | Dark section, bar chart with purple-to-teal gradient clip-path arrows, 84px heading |
| `case-study` | — | Enterprise | Customer-story block: video-thumbnail row (with play button) + stat rows (number + label). Rendered on the white enterprise case-study section |
| `testimonials` | `testimonials-oneoff-one` | Homepage, Semrush One | Quote card (dark) + stat card (grey), 2fr:1fr grid. One-off on `/one/` flips to a giant stat number beside a dark author card |
| `columns-stats` | — | Semrush One | Large stat number columns (10M / 35% / 21); one row, h3 number + label |
| `cards-icon` | `cards-icon-feature`, `cards-icon-tools`, `cards-icon-related` | Semrush One, Feature pages | Icon + title + description feature grid (3-col). **`cards-icon-feature`**: leading image is a full product SCREENSHOT (full-width, rounded, `aspect-ratio: 3/2`); unused by a keeper, parked. **`cards-icon-tools`** (feature pages): bordered white product card — 96px glyph, title, desc, DUAL CTA (primary "Try It Free" soft-neutral fill + secondary "Learn more" quiet text link, pushed to card bottom via `margin-top:auto`); hover-lift. **`cards-icon-related`** (feature pages): bordered link card — title, desc, "N tools" caption, accent "Learn more" link; no icon. Both new variants scoped by class so the frozen pages + /one are untouched. CSS: `cards-icon.css` |
| `cards-awards` | — | Semrush One | Award badge display for the dark CTA section |
| `header` | — | All | Sticky nav with mega-menu dropdowns |
| `footer` | — | All | Orchestrates the footer fragment: CTA + link columns + social/legal bottom bar + SEMRUSH reveal. Composes the three `footer-*` sub-blocks below |
| `footer-cta` | — | Footer fragment | "Get started" CTA sub-block inside the footer. Pure styling — JS is a no-op decorator |
| `footer-links` | — | Footer fragment | Footer link columns. JS adds a mobile accordion (heading → `role=button`, `aria-expanded`, Enter/Space toggle) |
| `footer-bottom` | — | Footer fragment | Social row + legal/copyright bottom bar. JS is a no-op; `footer.js` post-processes `.footer-bottom > div > div` into the legal row |
| `fragment` | — | — | Utility — `loadFragment()` used by header/footer |

---

## Consolidation candidates (propose only — do NOT execute)

Flagged during the 2026-06-17 toolbox inventory. These are *proposals for review* — nothing deleted, merged, or renamed. The frozen pages (index, one) must not move, so any consolidation that touches a tool they use is additive-only or deferred.

| # | Candidate | Observation | Proposed action | Risk |
|---|-----------|-------------|-----------------|------|
| 1 | `cards-icon-feature` variant | **One-off masquerading as reusable.** Built for the deleted toolkit pages; UNUSED by any of the 5 keepers. Carries CSS weight for nothing. | Either keep explicitly as a "parked, reusable" variant (document as such — done above) OR move to the one-off registry / remove if no near-term page needs a screenshot-card grid. Decision, not urgent. | Low — unused, so removal can't regress a keeper. |
| 2 | `footer-cta` + `footer-bottom` (no-op JS) | Both are pure-CSS sub-blocks whose `decorate()` is empty; `footer.js` already post-processes `.footer-bottom`. Three separate block folders for one footer fragment is heavier than needed. | Consider collapsing the footer sub-blocks into `footer` (styling via `.footer-cta`/`.footer-bottom` classes the parent applies) so the footer is one block, not four. | Medium — footer is shared by ALL pages incl. frozen ones; only worth doing if it stays byte-identical. Defer unless footer is reworked. |
| 3 | `case-study` vs `testimonials` vs `carousel-testimonials` | Three different tools all present "customer proof" (quote/stat/portrait). Not duplicates (different layouts) but overlapping in PURPOSE — worth watching as more pages import, so we don't grow a 4th. | No action now. Re-evaluate when the next page needs social proof: prefer extending one of these over adding a new block. | Low — informational. |
| 4 | `teaser` one-off proliferation | Three `teaser-oneoff-*` variants exist; two (`-semrush-one`, `-enterprise-platform`) are single-page. This is by design (one-off registry) but the count is climbing. | Keep, but when re-creating deleted pages prefer the context-adaptive bare `teaser` over new one-offs. | Low — already governed by the one-off registry. |

No true duplicate blocks were found in `blocks/` — the earlier duplicate ROWS in this file's inventory table (carousel/cards-icon/columns-stats listed twice) were a documentation artifact, now corrected.

---

## Page Templates

Applied via authored page **Metadata** block (`template` key → body class, verbatim). New templates use the `template-` prefix.

| Template | Body class | Applied via | Effect |
|----------|-----------|-------------|--------|
| `template-dark` | `body.template-dark` | `template: template-dark` metadata (stackable — comma-split with a page template, e.g. `template: template-dark, template-enterprise`) | GENERIC reusable page-wide color inversion ONLY: dark surface (`--dark-color`), white text/headings, white plain links, white-outline secondary button. Sets NO type/spacing/layout. Any page can opt in. Blocks inside auto-adapt (a bare `teaser` inverts — see `context-adaptive-blocks`). CSS: `styles.css` |
| `template-default` | `body.template-default` | `template: template-default, …` metadata (stackable); applied to EVERY marketing-chrome page | **Marketing-chrome base class.** Owns the marketing page gradient (`--color-teal`→lavender→white on `main`) and any future marketing-wide styling. App-shell + careers chromes deliberately do NOT carry it (so they don't inherit the gradient). `/one/` + enterprise carry it but override `main`'s background with their own. Fallback in `scripts.js`: added alongside the page-specific class. |
| `template-oneoff-homepage` | `body.template-oneoff-homepage` | `template: template-default, template-oneoff-homepage` metadata in `index.plain.html` | Homepage-only `pattern-hero.svg` overlay layered over the marketing gradient (the gradient itself now comes from `template-default`). Fallback in `scripts.js`: adds `template-default` + this if an `insights-widget` is present but metadata is missing |
| `template-one` | `body.template-one` | `template: template-one` metadata in `one.plain.html` (emitted by `import-semrush-one.js` afterTransformer) | Semrush One (`/one/`). Page-wide gradient on `main` (purple→teal→white), capped ~1250px so it fades to white before the "Built for how people search today" title; the rest of the page is white. Makes the hero `teaser-oneoff-semrush-one` container transparent so its purple comes from the page bg (no box of its own). Also re-skins shared blocks for this page only (all scoped `body.template-one`, so toolkit pages are untouched): `columns-stats` → three dark tiles (white text, 8px radius); `cards-icon` → white hairline-bordered cards (10px radius, 30px icons, 21px titles); `cards-awards` → 5-up left-aligned icon+label row, stacking 2-up on mobile. The closing region ("Win every search with Semrush One" title → CTA → awards → legal) is its OWN `section-dark` section (color-inverted), so the awards block no longer carries its own dark band — the section paints it. That `section-dark` is further customized FOR template-one only (scoped `body.template-one main .section.section-dark`): centered default-content, 46px uppercase heading, and a FILLED purple-pill CTA (overriding the generic outline-white dark-section button). Each award shows the decorative G2 shield badge via `.cards-awards-card-body::before` using `/icons/one-award-badge.svg`. Fallback in `scripts.js`: adds the class if `testimonials-oneoff-one` is present but metadata is missing |

| `template-enterprise` | `body.template-dark.template-enterprise` | `template: template-dark, template-enterprise` metadata in `enterprise/index.plain.html` (emitted by `import-enterprise.js`) | Enterprise homepage (root of `enterprise.semrush.com`, content at `content/enterprise/index.plain.html`). STACKED with `template-dark`: the generic dark layer owns the page-wide color inversion; THIS layer adds only enterprise-specific TYPE, SPACING, the purple-pill primary CTA, and bespoke section looks. MOSTLY-DARK theme that ALTERNATES (like the original): dark on hero/marquee/testimonials/solutions-tabs/platform/CTA; but the **case-study + resources sections are WHITE** (`.case-study-container`/`.carousel-container` painted `#fff` with dark text/headings/links/stats). All scoped under `body.template-enterprise` in `styles.css` (so the frozen homepage/one are untouched), incl. additive overrides for the SHARED `marquee` (logos inverted white, 28px) + `carousel` (resource card h3 sizing; text dark on its white section; the `carousel-testimonials` variant re-caps the base `full-width` wrapper). Per-block: `section-hero` (84px headline, left ~half), `carousel-testimonials` (4-col portrait card mosaic), `section-tabs` (the "OUR SOLUTIONS" tabs — a SECTION STYLE, not a block: white-pill selected tab on a translucent capsule; **each tab panel is a BARE `teaser` (2-col illustration + text) that auto-inverts via `template-dark` — no `teaser-dark` variant**; 40px headline). All six tab panels carry full content + a distinct illustration (parser `PANEL_FALLBACK` holds the lazy Builder.io copy/images). `case-study` (64px stat numbers, row-flow), `section-dark` (centered closing CTA). Eyebrows are client-rendered → published-copy fallbacks. Fallback in `scripts.js`: adds BOTH `template-dark`+`template-enterprise` if `.teaser-oneoff-enterprise-platform` is present but metadata is missing. Look not yet user-validated. |

`section-hero` (NEW, template-enterprise opening section — 84px headline, larger padding). The enterprise `section-dark` is the generic dark section recentered + larger padding for the closing CTA.

| `template-feature` | `body.template-feature` | `template: template-feature` metadata in `content/features/<tool>.plain.html` (emitted by `import-feature.js`) | Feature landing pages (`/features/<tool>/`) — a product-marketing sibling of the homepage/one template. Reuses the default body gradient. Scoped TYPE/LAYOUT only (all under `body.template-feature` so locked index/enterprise + /one are untouched): hero `section-centered` overridden to LEFT-aligned at 48px (`--font-size-heading-l`, not the 84px display); the mid-page `section-dark` band centered with a 40ch measure; the related-features section heading centered. The product-card looks live in the two `cards-icon` variants (above), not here. Fallback in `scripts.js`: adds the class if `.cards-icon-tools` is present but metadata is absent. Content not yet user style-validated. CSS: `styles.css`. |

---

## Key Implementation Patterns

- **Video detection**: Links whose text content contains a video URL (`.mp4`, `.webm`) are detected as video sources — EDS rewrites external media hrefs, so check `link.textContent` not `link.href`.
- **Glass frame**: `linear-gradient(91deg, rgba(5,5,5,0.04), rgba(255,255,255,0.04))` + `backdrop-filter: blur(5px)` + `border: 1px solid rgba(255,255,255,0.6)` + `border-radius: 12px` + `padding: 12px`.
- **Carousel edge-bleed**: Section has `overflow: hidden`. Slider uses `margin-left: container-padding` (not padding — padding on `overflow-x: auto` flex containers doesn't reliably offset scroll-snap). Last card gets `margin-right: container-padding`. This creates the right-edge peek where the 4th card is partially visible, clipped by the section boundary.
- **Carousel nav buttons**: Both variants place nav in `.default-content-wrapper` (JS appends there). CSS positions via `position: absolute; right: container-padding; bottom: 0` to bottom-align with the heading. Hidden below 1024px (touch scroll only).
- **Section header pattern**: Eyebrow `<p>` + `<h2>` tagline used across carousel, stats, and testimonials sections. H2 is 48px/uppercase/line-height 1.0/letter-spacing -0.04em. Applied via block-specific selectors on `.default-content-wrapper > h2`.
- **Pattern-hero positioning**: calc-based, scoped to `main .section.centered:first-of-type`. Breakpoints: ≥1440px → `calc(50% - 20px)`, 1024–1439px → `calc(50% - 100px)`, 768–1023px → `calc(50% + 100px)`, <768px → `100%`.
- **Footer layout**: CTA left (~1/3) + link columns right (~2/3) side-by-side via CSS grid `1fr 2fr`. CTA is left-aligned, uppercase heading. Footer uses Lazzer font family throughout. Social icons detected from href patterns in `decorateSocialLinks()`.
- **Footer reveal**: `.footer-reveal` is a sibling of `.footer` block inside `<footer>` element (not a child of `.footer`). Uses `position: sticky; bottom: 0; z-index: 0` while `.footer` has `position: relative; z-index: 1; background: white`. The white footer scrolls up to reveal the sticky mint-colored SEMRUSH wordmark behind it.
- **Nav header bg toggle**: Tinted background (`rgb(220 238 235)`) switches to white when a dropdown opens. `.nav-open` must toggle on BOTH `.nav-wrapper` and `header` element.
- **Carousel expand/collapse** (expansible variant): One card expanded at a time (430px collapsed, 798px expanded). "+" button rotates 45° to "×". Collapsed shows eyebrow + title + poster; expanded shows large image + description + CTA.
- **Testimonials content model**: 5-row model — Row 1: section heading; Row 2: company logo; Row 3: quote text (`<blockquote>`); Row 4: author photo + name (bold) + role; Row 5+: stats cards (one per row). JS extracts `<strong>` for author name, plain `<p>` for role.
- **Stats-facts arrow indicator**: CSS `::before` for diagonal hatching SVG pattern, `::after` for up-arrow SVG icon (data URI). Active state changes arrow bg to cyan and icon fill to dark. `activateStat()` function handles both click and scroll-driven activation.
- **Stats-visibility bars**: `clip-path: polygon()` for angled bar ends. Bar widths derived from data attributes set by JS. Alternating cyan/purple fills on bars.
- **Stats-visibility h2**: The `h2` lives in `.default-content-wrapper` (default section content above the block), NOT inside `.stats-visibility`. CSS selector `.stats-visibility h2` never matches — use `.section > .default-content-wrapper > h2` to target it.
- **Insights-widget blinking cursor**: Hide cursor when (a) country dropdown is open and (b) when the text input has focus — two conflicting cursors otherwise.
