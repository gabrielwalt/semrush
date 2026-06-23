# PROJECT-IMPORT.md — Import Infrastructure

Import pipeline status and commands. For parser/transformer implementation, read `tools/importer/` directly.  
**Update when scripts, parsers, or URL lists change.**

Approach: ONE generic, marker-driven parser per page type that reproduces the **user-validated** `content/*.plain.html` exactly. Methodology + validation loop: `skills/marker-driven-import`.

---

## Validated reference pages

These pages' content structure is **officially validated by the user** — `content/<page>.plain.html` is the reference truth. Never let an import overwrite them; import to a temp dir and diff (see Validation Loop below).

| Page | File | Validated |
|------|------|-----------|
| Homepage | `content/index.plain.html` | ✅ 2026-06-16 |

**Imported (not yet user-validated)** — `one`, `enterprise`, `keyword-research-toolkit` (feature); the full `/vs/` family — `vs/index` (landing), `semrush-vs-moz` + `semrush-vs-ahrefs` (**validated content + design**), `semrush-vs-chatgpt` + `semrush-vs-copy-ai` + `semrush-vs-jasper-ai` + `semrush-vs-surferseo` (legacy `/content-hub/vs-*` converted + relocated) — ALL via the single `import-comparison.js`; `success-spotlights/lottiefiles` (case-study); the full goodcontent editorial family on `template-default` — `content-hub` landing, `ai-prompt-library`, `ai-content-marketing-report`, `can-ai-content-rank-on-google`, `content-marketing-blog` index + `how-to-use-chatgpt` + `small-business-content-ideas` articles, `ebooks-templates/content-marketing-starter-kit`, and 7 `free-tools/*` pages (all via `import-content-hub.js`). Structure sound; awaiting per-page user validation before treating as reference truth.

---

## Comparison family marker map — the whole `/vs/` tree (cascade)

**ONE script — `import-comparison.js` — imports EVERY `/vs/` page**, regardless of source vintage, and every output lands under `content/vs/` on `template-default, template-comparison`. It handles three source shapes via an internal dispatch:

1. **Modern competitor pages** (`/vs/semrush-vs-moz/`, `/vs/semrush-vs-ahrefs/`) — power-pages stack, stable `data-test="…"` wrappers. **Frozen/validated — verified byte-identical on every re-import.** Marker table below.
2. **The `/vs/` index** (`https://www.semrush.com/vs/`) — same `data-test` stack, plus a 6× `[data-test="VSCard"]` grid ("How Does Semrush Compare to the Competition?") → `cards-icon` (each card: h4 + intro + ✓ bullet list + "View Full Comparison" link; legacy `/content-hub/vs-*` links rewritten to canonical `/vs/semrush-vs-*`). Output → `content/vs/index.plain.html` (a bare `/vs/` URL maps to the EDS folder-index file).
3. **Legacy editorial competitor pages** (`/content-hub/vs-{chatgpt,copy-ai,jasper-ai,surferseo}/`) — Next.js "goodcontent" stack, semantic `<section aria-label>` wrappers, no `data-test`. The script DETECTS these (no `data-test="HeroBlock"` + a "…instead of…" section) and runs the legacy converter (see below), relocating output to `content/vs/semrush-vs-<competitor>.plain.html`.

Markers below are for shape #1 (and the index #2, which shares them). Build-hashed `gch-*`/`textStyle_*` classes are NEVER used as markers.

| Level | Target | Marker (source DOM) |
|-------|--------|---------------------|
| 1 template | `template-default, template-comparison` | emitted unconditionally |
| 4 block | hero → default content (h1 + lead + primary CTA), `section-centered` | `[data-test="HeroBlock"]` |
| 4 block | `marquee` (trusted-by logos) | `[data-test="Brands"]` |
| 4 block | **`comparison-table`** (NEW block — the spec matrix) | `[data-test="ComparisonTable"]`; rows `[data-test="ComparisonTableRow"]`, cells `[data-test="ComparisonTableCell"]`; ✓=`svg[data-ui-name="Check"]`, ✗=`svg[data-ui-name="Close"]`, else cell text; group-header row = single `td.fw_600`. **thead first cell = feature-column header (e.g. "AI optimization")** → goes into the header row's 1st cell, NOT a standalone band |
| 4 block | **`reviews`** (NEW block — single-testimonial carousel) | `[data-test="ReviewsCarousel"]` → `[data-test="ReviewItem"]`; quote=`.textStyle_h5`, name=`.textStyle_smallBold`, title=`.textStyle_small`; heading is a SIBLING h2 before the wrapper |
| 4 block | **`ratings`** (NEW block — 3 score columns) | `[data-test="RatingBlock"]` → `:scope > div > div` columns, each: logo img + stars img + "X out of 5" span |
| 4 block | **`showcase`** (NEW block — large alternating image+text rows) | `[data-test="FeaturesSection"]` → `[data-test="DescriptionBlock"]` (img + h3 + body p's + secondary CTA) |
| 4 block + 3 style | final CTA → default content (h2 + CTA), **`section-violet`** | `[data-test="CtaBlock"]` |

### Legacy converter (shape #3) — `/content-hub/vs-*` → modern `/vs/`, ALL content preserved

The legacy dispatch inside `import-comparison.js` (functions prefixed `ch*`) walks **EVERY** `<section aria-label>` region so nothing is dropped, mapping each to the modern toolbox and relocating output to `content/vs/semrush-vs-<competitor>.plain.html` (source slug `vs-chatgpt` → `semrush-vs-chatgpt`; CTA `src` + path rewritten — re-imports land under `/vs/`, never `/content-hub/`):

| Source region (`aria-label`) | → Target |
|-------------------------------|----------|
| `…instead of <X>?` (hero) | default content (h1 + `<br>`-joined lead + primary CTA), `section-centered` |
| same region's `<ul><li>` testimonials | **`reviews`** block (quote/avatar/name/role; Next.js `/_next/image?url=` avatar proxy → real URL) |
| `…advantages` | default content (prose paragraphs) |
| `AI functionality` | default content (heading + the 2 UI screenshots — `{ images: true }`) |
| `Comparing … and <X>` (table) | **`comparison-table`**; source is competitor-first → SWAP to own-first; 2 source `<tr>`/feature → keep only the 3-`<td>` data row; `<img alt="Yes\|No">` → terse Yes/No; pricing text passes through |
| `Create …` | default content (heading + CTA) |
| `…success story` | default content (Barbara Ferrigno stat + testimonial + "Learn more") |
| `Learn more …` | default content (resource links) |
| `Try out …` (final CTA) | default content (h2 + body + CTA), **`section-violet`** |

All 4 imported + render-verified 2026-06-18 (all 8 source regions captured — nothing lost). Block header detection in `comparison-table.js` was relaxed to classify any non-empty non-Yes/No value pair as the header row (so the own column can be "Content Hub", not just "Semrush") — moz/ahrefs verified byte-identical after the change. NOT byte-compared to a reference (freshly modeled, not previously validated).

## Goodcontent editorial pages → marketing template — `/content-hub/*` + `/free-tools/*` (generic)

The whole LEGACY "goodcontent" template family (Next.js app, build-hashed `gch-*` classes, semantic `<section aria-label>` wrappers) — every `/content-hub/*` and `/free-tools/*` page EXCEPT the comparison pages (those are handled by `import-comparison.js`'s legacy dispatch and relocated to `/vs/`) — is migrated onto the **main marketing template (`template-default`)** by ONE generic, shape-driven parser: **`import-content-hub.js`**. It does NOT hand-model each page; it walks the page's content blocks and classifies each by SHAPE, reusing the existing toolbox. Covers 15 pages of ~6 page-types (hub landing, AI prompt library, AI content report, blog index, blog articles, ebook/starter-kit, 7 free-tool pages).

**Card-grid landing layout (2026, `template-content-hub`):** pages that lead with a blog-cover card grid (the hub home + the content-marketing-blog index — detected by an emitted `cards-icon-feature` grid) get `template: template-default, template-content-hub` (stacked, so layout CSS scoped to `body.template-content-hub` never touches the frozen homepage's bare `template-default`). The scoped rules (in `styles/styles.css`, wrapped in a `stylelint-disable no-descending-specificity` region with the other template scopes) center the section headers, frame the `cards-icon-feature` cards (hairline border + 16:9 edge-to-edge cover + clamped description + accent "Read now"), tint the lone-`h3` research callout into a full-width gradient panel, and size the closing CTA band. Free-tool pages (no feature grid) stay on bare `template-default`. **Also fixed:** `statsBlock` now emits one cell **per stat** (the `columns-stats` block reads the first row's children as columns; all-in-one-cell collapsed the 3 stats into a single stacked column).

| Shape detected | → Mapped to | Rule |
|----------------|-------------|------|
| page `h1` + lead `<p>`s | default content, `section-centered` | the first block holding the page h1 |
| `<article>` present (page 301-redirects to the BLOG template, e.g. can-ai-content-rank → `/blog/…`) | default content (headings, prose, lists, blockquotes, figure imgs) | article branch — skips the section walk entirely |
| `<section>` whose `<li>`s each lead with a number/%/M/K (2–4 items) | `columns-stats` | `extractStats()` (e.g. 10M / 14 / 30%) |
| `<section>` with a `<ul>`/`<li>` of link-cards (each has a heading + blurb) | `cards-icon` | `extractCards()` — blog cards, free-tool cards, resource cards |
| any other `<section>` (prose / callout / CTA) | default content (heading + paragraphs + region CTA) | `regionHeading()` excludes text inside `a`/`li` so card blurbs don't leak |

Path-driven: source pathname → `content/<same path>.plain.html` (e.g. `content/content-hub/ai-prompt-library.plain.html`, `content/free-tools/title-generator.plain.html`). Template metadata `template-default`, `nav: /nav`, `footer: /footer`.

**Caveats (faithful, not gaps):** (a) the `/free-tools/*` pages are INTERACTIVE generators — only their marketing content shell migrates, NOT the tool's JS functionality (that would be a separate build). (b) Two pages are thin because they're lead-capture FORMS with little prose (`ai-content-marketing-report` partially, `ebooks-templates/content-marketing-starter-kit`) — hero + intro captured, form omitted. (c) Icons are inline SVGs the html2md pipeline strips (decorative). All 15 render-verified 2026-06-18; not yet style-validated.

**Autonomous batch 2026-06-18 — +11 free-tools + 3 case studies (tool-detail + case-study-detail):** imported the remaining `/free-tools/*` pages via `import-content-hub.js` and the 3 remaining `success-spotlights/*` via `import-case-study.js`. This surfaced TWO new DOM shapes the parser didn't handle — fixed (see `import-content-hub.js` + `marker-driven-import` "Two-Shapes-One-Page Rule"):
- The newer **checker/generator tools** (competitor-finder, serp-checker, keyword-rank-checker, sitemap-generator, plagiarism-checker, serp-simulator, website-authority-checker, ai-overviews/ai-search-visibility-checker, keyword-search-volume-checker) use **NO `<section>` wrappers** — content sits in background-banded `<div>`s, and the hero lead/step copy is in bare `<div>`s not `<p>`. The parser now builds BOTH a section-shape body and a banded-div body and keeps whichever captured more text (robust to a stray lazily-hydrated region). Added bare-div hero-lead extraction, numbered-step `<ol>` recovery, feature-grid `h3`+`p` un-gluing, and nested-span CTA detection. **10/11 content-complete (audited); only plagiarism-checker drops a decorative "trusted by" logo strip.**
- **3 hub-grid pages DEFERRED — `/free-tools/seo`, `/local-seo`, `/ai-writing-tools`:** their central tool-card grid is **client-hydrated and not in the headless DOM** at parse time (import thin: hero only). Same SPA-hydration limit already noted below. Need a tailored render-wait or a different route; do NOT keep re-running.
- 3 case studies (barbara-ferrigno, exemplifi, sleepme) imported via `import-case-study.js` (path-driven) → all 3 content-complete (audited), structurally on par with the validated lottiefiles.
- **Quality pass 2026-06-18 (decoration defects fixed in `import-content-hub.js`):** a render critique of the banded-div tool pages found (a) glued list items — `Step1Choose…`, `Benchmark PerformanceCompare…` — because `li.textContent` concatenates a label `<p>`/`<h3>` with its description `<p>`; (b) dropped CTA buttons in promo bands (link nested in a `<span>` failed the parent-text-equality check); (c) orphaned "how-to" headings whose step copy lived in bare `<div>`s. Fixes: list items now collect block-child fragments and join with a separator (concatenating after a `Label:` lead-in, em-dash otherwise; standalone `Step N`/ordinal labels dropped since the `<ul>`/`<ol>` conveys order); CTA detection matches a standalone link not inside `p/li/heading`; numbered-step recovery emits an `<ol>`. Verified across all 14 + no regression on the section-shape pages.
- **GATE-1 design-foundation fix:** `template-case-study` had no CSS → its long-form articles rendered full-width. Added an additive `body.template-case-study` reading-column rule in `styles/styles.css` (caps default-content to `--measure` 60ch; images + the section-dark close opt out), browser-verified (697px @ 60ch). No frozen page carries that class, so the Frozen-Tools Rule holds. **GATE-2 visual still pending** — local dev server can't serve these unpublished paths.
All awaiting GATE 2. NB: the local preview server 404s on `/free-tools/*` and `/content-hub/*` subpaths (serves only homepage), so these were verified structurally (HTML decoration) + by live-source content audit, not by local visual render.

**Content-completeness fix 2026-06-18 (re-imported all 15):** an audit found the parser was dropping every page's **h3 sub-headings** (feature-card labels, FAQ questions) — only the first heading per region survived, orphaning its paragraphs/answers. Two root causes in `import-content-hub.js`, both fixed: (1) region selection used an "innermost section" filter that discarded the meaningful parent region and kept its heading-less sub-panels (most visibly the FAQ `<section>`, whose h3 questions sit above heading-less `div[role="region"]` answer panels — every question was lost, every answer orphaned). Now selects **top-level** content sections and lets the interior be walked from within. (2) prose regions used single-heading `regionHeading()`; now use new `proseRegion()` which emits ALL headings/paragraphs/plain-lists in DOM order. Verified: free-tools h3 count 0→6–15 per page, FAQ questions restored in order, cards/stats pages unchanged (no regression). URL list: `tools/importer/urls-content-hub.txt`.

## Case-study page marker map — `success-spotlights/lottiefiles` (cascade)

Source is **server-rendered** (Next.js). A long-form editorial article → captured as mostly **default content** (most faithful, zero new blocks). Script: `import-case-study.js`. Template: `template-default, template-case-study`. Article root `article.gch-12ojkkh` inside `main#root-content`.

| Level | Target | Marker (source DOM) |
|-------|--------|---------------------|
| 1 template | `template-default, template-case-study` | emitted unconditionally |
| 3 section style | logo hero band | `div.gch-k18f9v` (pink band) → brand logo `<img>` only |
| 4 default content | intro deck + all article body (h1/h2/h3, paragraphs, `ul` result-stat bullets, inline `<img>` screenshots, pull-quotes, inline links) | clone `article`, strip TOC `nav[aria-label="Contents of the article"]`, share `[aria-label^="Share the article"]`, heading anchors `span[data-menu="heading"]` |
| 4 default content | YouTube video → **plain link** (EDS auto-embeds; `video-in-eds`), NOT an `<iframe>` | `iframe[src*="youtube-nocookie.com/embed/"]` → `<a href>` |
| 4 block + 3 style | closing blue promo → default content (h4 + body + CTA), `section-dark` | `section.gch-1dwyxx3` (blue star-bg band) |

**Post-import manual ops (these pages):** image URLs are `static.semrush.com` (become DA hashes on upload); the comparison table's 49 feature rows + ✓/✗ render from source — verify none dropped; case-study GIF (`image_9_*.gif`) and YouTube link pass through as-is.

> **Scope reset 2026-06-17:** the toolkit pages (seo, content, pricing, local-business, social-media, pr-toolkit, company) + app-shell pages were deleted, and with them the two **toolkit import parsers** (`import-toolkit.js` v1 + `import-toolkit2.js` v2), their urls lists, and the `seo-*.svg` assets. They produced content too far from the originals. When those pages are re-created, build a fresh parser per `marker-driven-import` rather than resurrecting the toolkit shape-detection approach.

**Known limitation:** app-shell SPA pages (`/advertising/`, `/analytics/traffic/`, `/ai-seo/overview/`, `/features/`) render too sparsely or too slowly for the headless importer (deep obfuscated nesting / networkidle timeouts) — they import thin. Need a tailored approach or longer render wait.

---

## Homepage marker map (cascade)

The homepage import resolves each level from these source-DOM markers (registry in `import-homepage.js`):

| Level | Target | Marker (source DOM) |
|-------|--------|---------------------|
| 1 template | `template-default, template-oneoff-homepage` (body classes via Metadata) | page has `.mp-hero` (emitted unconditionally for this script) |
| 4 block | `announcement-bar` | `.srf_announcement_banner`, `.srf_top_banner` |
| 4 block | `insights-widget` + `media` (in hero) | `.mp-hero` → `hero.js` splits into widget + media |
| 3 section style | `section-centered` | hero section (emitted by `hero.js`) |
| 4 block | `marquee` | `.mp-logo-marquee` |
| 3 section style | `section-flush` | marquee section |
| 5 variant | `teaser teaser-oneoff-semrush-one` | `.mp-promo-cards.mp-semrush-one` |
| 5 variant | `teaser teaser-dark teaser-oneoff-enterprise` | `.mp-promo-cards.mp-enterprise` |
| 5 variant | `carousel carousel-expansible` | `.mp-section.mp-toolkits` |
| 4 block | `stats-facts` | `.mp-section.mp-stats` |
| 4 block + 3 style | `stats-visibility` + `section-dark, section-oneoff-ai-visibility` | `.mp-section.mp-ai-visibility-index` |
| 4 block | `testimonials` | `.mp-section.mp-client-testimonials` |
| 4 block | `carousel` (resources) | `.mp-section.mp-resources` |

Last verified against validated content: 2026-06-16 — block/variant/section-style/template sequence reproduces exactly **except** marquee (see Known Gaps).

---

## Files

| File | Purpose |
|------|---------|
| `tools/importer/import-homepage.js` | Main import script (imports from `parsers/*.js`, ES module export) |
| `tools/importer/import-nav.js` | Nav fragment import (parses `srf-header` structure) |
| `tools/importer/import-footer.js` | Footer fragment import (parses `srf-footer` structure) |
| `tools/importer/import-semrush-one.js` | Semrush One page import (teaser feature-cards, columns-stats, cards-icon, cards-awards parsers) |
| `tools/importer/import-feature.js` | Feature landing page import (`/features/<tool>/` → `content/features/<tool>.plain.html`). SERVER-RENDERED source (no Builder.io lazy-load), so a reliable straight parse. Maps the page onto the EXISTING toolbox (Toolbox-First, zero new block): hero → default content + primary CTA (`section-centered`); 6 tool cards → `Cards Icon (cards-icon-tools)` with dual CTA per card; mid band → default content + CTA (`section-dark`); related features → default content + `Cards Icon (cards-icon-related)`. Emits `template-feature` as its own last section. CTAs use `<strong><a>`/`<em><a>` (primary/secondary) so decorateButtons buttonizes them; CTA queries are scoped to the card button row so inline body links aren't mistaken for CTAs. Re-usable for any `/features/<tool>/` sibling (same template). |
| `tools/importer/import-enterprise.js` | Enterprise page import → `/enterprise/index`. Builds a FRESH output container (parsers RETURN wrappers; main appends each + `<hr>`/Section Metadata in order — do NOT mutate in place, that collapses all into one section). `findRegion(label, headingText, {minDescendants})` locates Builder.io client-rendered regions by aria-label then heading-text fallback, climbing to an ancestor big enough to hold the body. Hero/resources/CTA carry published-copy fallbacks (those regions are client-rendered/lazy). The hero also emits a `Media` block for the autoplay/loop/muted product video between the CTA and the marquee (URL in `HERO_FALLBACK.videoSrc` — a Builder.io CDN asset with no file extension). Emits `template-enterprise` + `section-hero`/`section-dark` |
| `tools/importer/import-comparison.js` | **The single importer for the WHOLE `/vs/` family** — modern competitor pages (moz/ahrefs, `data-test`), the `/vs/` index (+ `VSCard` grid → `cards-icon`), AND legacy `/content-hub/vs-*` pages (auto-detected, `ch*` converter, relocated to `/vs/`). All output under `content/vs/` on `template-default, template-comparison`. Emits `comparison-table` + `reviews` + `ratings` + `showcase` + `cards-icon` + `section-violet`. moz/ahrefs reproduce byte-identically. See "Comparison family marker map". |
| `tools/importer/import-content-hub.js` | GENERIC parser for the rest of the goodcontent family (`/content-hub/*` non-vs + `/free-tools/*`) → `template-default`. Shape-driven: classifies each `<section>` as stats→`columns-stats`, card-list→`cards-icon`, else prose default-content; plus an `<article>` branch for pages that redirect to the blog template. 15 pages, ~6 page-types, one script. See "Goodcontent editorial pages → marketing template". |
| `tools/importer/parsers/*.js` | Standalone parsers (11 total) |
| `tools/importer/transformers/cleanup.js` | DOM cleanup transformer |
| `tools/importer/page-templates.json` | Page template definitions for Semrush One and Enterprise (190 lines) |
| `tools/importer/urls-homepage.txt` | Homepage URL |
| `tools/importer/urls-semrush-one.txt` | Semrush One page URLs |
| `tools/importer/urls-enterprise.txt` | Enterprise page URLs |
| `tools/importer/urls-feature.txt` | Feature landing page URL(s) (currently `/features/keyword-research-toolkit/`) |
| `tools/importer/urls-content-hub.txt` | The 15 goodcontent editorial pages (`/content-hub/*` non-vs + `/free-tools/*`) for `import-content-hub.js` |

---

## Nav Content Model

Three divs (brand / sections / tools). Sections div uses H2/H3/UL heading hierarchy:

```
div (brand): p > a > picture > img
div (sections):
  H2 "Products"        ← top nav item (has dropdown: H3/UL content follows)
    H3 "Start Here"    ← column heading
    UL                 ← column links
    H3 "Find the Right Tools"
    UL
    ...
    P > picture        ← promo image
    P > strong         ← promo title
    P                  ← promo description
  H2 "Pricing"        ← top nav item (no content after = no dropdown)
  H2 "Resources"      ← top nav item with dropdown
    H3 / UL / ...
    P promo
  H2 "Enterprise"     ← external link, no dropdown
div (tools): p (Log In | Sign Up)
```

Header JS aggregates H2s for the top bar, builds mega panels from H3/UL/P content between each H2. H2 with no following content = simple link (no dropdown).

`import-nav.js` must emit this same shape so re-import doesn't undo hand fixes.

---

## Parser requirements

Generic parser mechanics + output conventions live in the skills, not here:
- **Table/DOM mechanics, output structure conventions** (section header → default content above the block; CTA as `<strong>`/`<em>`; `getAttribute` not `.src`; wrap imgs in `<picture>`; video as link not `<video>`; Section Metadata last) → `importer-parser-patterns`.
- **Marker-detection strategy + validation loop** → `marker-driven-import`.
- **Heavy SVGs (≥80KB) → `/svg/` link references** → `repo-hosted-svg-references`.

Per-parser output shapes are **encoded in the parser code itself** (`tools/importer/parsers/*.js`) — read it as the source of truth (AGENTS.md *Code-is-truth*). Non-obvious, project-specific parser facts that the code alone doesn't explain are captured in **Resolved** below.

**Project-specific source quirk — Builder.io video assets have NO file extension** (`cdn.builder.io/o/...?alt=media`). `scripts/video-utils.js` detects them (matches `/o/` + `alt=media`) on top of the `.mp4|webm|ogg` extension check, defaulting the type to `video/mp4`. (Generic "extensionless CMS video URL" guidance: `video-in-eds`.)

---

## Architecture

1. **One script per page type.** Homepage, nav, and footer each have their own (different DOM sources).
2. **Parsers are standalone files in `parsers/*.js`.** `import-homepage.js` imports from them — no inline duplicates.
3. **Cleanup runs first** (removes header, footer, scripts, tracking, consent banners).
4. **SVG images are stripped by Helix Importer's html2md pipeline.** Marquee logos must be ingested via DA upload.
5. **ES module export format** required for esbuild bundling (`export default { transform }` pattern).

---

## Post-Import Manual Operations

These items cannot be reliably auto-imported and require manual content edits after import:

1. **`spacing-top-small` on insights-widget** — Add class via block name: `Insights Widget (spacing-top-small)`. The parser can't detect this from source DOM.
2. **`carousel-expansible`: column 2 content** — Large images, descriptions, and CTAs only render when a card is expanded on the source site. Import captures collapsed state only. Populate manually or expand each card before import.
3. **Stats-visibility: 3rd header column** — "AI Platform: ChatGPT, April 2026" platform info. May not be in the DOM at import time.
4. **DA media hashes** — Import produces source URLs (semrush.com). After DA upload, images get media hashes. Normal DA ingestion workflow — not a bug.
5. **Footer: single-section structure** — The import script emits no `<hr>` between footer blocks. All three are in one section.

## Known Gaps (import vs validated)

- None for the homepage **structure** — the block/variant/section-style/template sequence reproduces the validated `index.plain.html` exactly (verified via the temp-diff loop).
- Remaining differences are expected and not structural: image URLs are source `/static/` URLs (become DA media hashes on upload), and the expansible carousel's expanded-only content (see Post-Import #2).

## Resolved (no longer manual)

- **Marquee dropped** — root cause was NOT lazy-load: the marquee (`.mp-logo-marquee`) is nested **inside** `.mp-hero`, and the hero parser's `replaceWith()` destroyed it before `marquee.js` ran. Fixed in the cleanup transformer: it now moves the marquee out to be a sibling after `.mp-hero` before parsers run. `marquee.js` also now emits the `section-flush` Section Metadata. Marquee + logos + flush section now import correctly.
- **`template-default, template-oneoff-homepage` metadata** — auto-emitted by `import-homepage.js` (cascade level 1) as a page `Metadata` block. `template-default` is the marketing-chrome base (gradient); `template-oneoff-homepage` adds the homepage-only hero pattern.
- **Testimonials author role** — `testimonials.js` extracts the role from any descendant `<p>` without strong/picture, robust to `wrapTextNodes` flattening. No manual add needed.
- **Enterprise CTA** — both promo CTAs are authored `<em>` (secondary); `teaser-dark` recolors them. Parsers emit `<em><a>`. No manual adjust.
- **`/one/` testimonial quote cell** — `testimonialsParser` queried the Coalition `logoImg` but never appended it, leaving the quote cell holding only the blockquote (and earlier imports dropped the quote entirely when the scroll-lazy DOM hadn't rendered). Fixed: the parser now prepends the brand logo (`.icons__testimonial--testimonial-logo img`) before the blockquote in the quote cell. The block JS reads logo (`picture img`) + `blockquote` from quote row 0. Logo lives on `cdn.semrush.com` (absolute URL, passes through `absUrl`).
- **Heavy SVGs → repo-hosted `/svg/` references, not embedded images.** DA/html2md rejects oversized images on preview/publish with a (409) "Images N… failed validation" (threshold ~40–89KB). The big graph/feature SVGs live in the repo under `/svg/` and content references them with a plain link (`<a href="/svg/<name>.svg">alt</a>`); `scripts.js` `decorateSvgReferences` expands the link to an `<img>` at render. Parsers reproduce this via a `svgRef(src, alt)` helper (`import-semrush-one.js` graphs → `/svg/graph-N.svg`). Full mechanism: skill `repo-hosted-svg-references`. NB: never run an SVG through `createOptimizedPicture` (can't rasterize to WebP — `cards-icon.js` skips `.svg`).
- **Tab panels are media-LEFT** — the original tabs (one reused layout) put the illustration on the left for every panel. `tabsParser` emits the media row BEFORE the text row so `teaser.js` adds `teaser-media-left`. Emitting text-first flips them all to the wrong side.
- **Marquee = all logos in ONE cell, not one row each.** `marquee.js` reads only the FIRST cell of the block and moves its pictures into the scroll track (then clones it for the seamless loop). Emitting one row per logo (`rows.push([pic])`) leaves the track with a single logo and no animation — the rest render as raw un-decorated rows. Correct: `createTable([['Marquee'], [cell]])` where `cell` holds every `<picture>`. (Was the enterprise marquee bug — homepage was already single-cell.) Inversion on dark templates is just `filter: brightness(0) invert(1)` on the imgs — that part was always fine.
- **Teaser 2-row format** — every teaser table is TWO rows, one cell each: a content row + a media row. Never emit `[textCell, imgCell]` as a single row — the block JS reads only the first cell per row and silently drops the media (this was the enterprise-platform image bug, now fixed). Row ORDER sets the media side: content-row-first → media right (default); media-row-first → media left (block adds `teaser-media-left`). `featureCardsParser` (import-semrush-one) emits media-row-first when the source `.cards__item` has `.reverse`, reproducing the original's alternation.
- **Section breaks require a fresh output container OR in-place `<hr>` between siblings.** An importer that parses with `el.replaceWith()` AND appends section-metadata/`<hr>` to the end of `main` collapses everything into ONE giant section (the parsed blocks stay at their original position; the breaks pile up at the bottom → empty `<div>`s). Two correct patterns: (a) build a NEW container and append each parser's returned wrapper followed by its `<hr>`/Section Metadata in order (enterprise); (b) insert the `<hr>`/metadata as a SIBLING at the right DOM position relative to surviving landmarks (`/one/` closing-section split). Either way verify with `python3` top-level-`<div>` count + `awk` line sizes.
- **`/one/` closing section-dark split** — `ctaParser`/`awardsParser` `replaceWith()` their `section.cta`/`section.awards` before the afterTransformer runs, so querying those selectors there finds nothing. Keyed the split off the surviving "Win every search" heading instead: insert `<hr>` before its block, append section-dark metadata at the end.
- **`import-semrush-one.js` afterTransformer emits two things** (so re-import reproduces hand-validated structure): (1) a `section-dark` Section Metadata before the closing CTA/awards/legal region; (2) a `template-one` page `Metadata` block as the last section — the PRIMARY mechanism for `body.template-one` (scripts.js only carries a fallback keyed off `.testimonials-oneoff-one`). Rebundle after editing. The closing `cards-awards` carries labels only — the repeated G2 shield badge is decorative, injected by CSS from `/icons/one-award-badge.svg` (the source's inline SVGs are stripped by html2md), so `awardsParser` deliberately drops base64/inline badge images.

---

## Commands

### Bundle (required before running import)

```bash
/home/node/.excat-marketplace/excat/skills/excat-content-import/scripts/aem-import-bundle.sh \
  --importjs tools/importer/import-homepage.js
```

### Validation loop (never overwrite the validated reference)

`run-bulk-import.js` writes to `content/` directly (no `--output-dir` flag), so it WILL overwrite the validated reference. To verify a parser reproduces the validated content without destroying it:

```bash
# 1. Back up the validated reference
cp content/index.plain.html /tmp/import-check/index.validated.plain.html

# 2. Bundle + run (this overwrites content/index.plain.html)
/home/node/.excat-marketplace/excat/skills/excat-content-import/scripts/aem-import-bundle.sh \
  --importjs tools/importer/import-homepage.js
node /home/node/.excat-marketplace/excat/skills/excat-content-import/scripts/run-bulk-import.js \
  --import-script tools/importer/import-homepage.bundle.js \
  --urls tools/importer/urls-homepage.txt

# 3. Capture the import output, then RESTORE the reference immediately
cp content/index.plain.html /tmp/import-check/index.imported.plain.html
cp /tmp/import-check/index.validated.plain.html content/index.plain.html

# 4. Diff block/variant/section/template sequence (image URLs & DA hashes differ — compare structure)
grep -oE 'class="(announcement-bar|insights-widget|media|marquee|teaser[^"]*|carousel[^"]*|stats-facts|stats-visibility|testimonials|section-metadata|metadata)"' \
  /tmp/import-check/index.validated.plain.html | nl
grep -oE 'class="(announcement-bar|insights-widget|media|marquee|teaser[^"]*|carousel[^"]*|stats-facts|stats-visibility|testimonials|section-metadata|metadata)"' \
  /tmp/import-check/index.imported.plain.html | nl
```

Re-run this after every parser change — a fix for one page often regresses another. Restore URL if the local reference is lost: `curl -s 'https://main--semrush--gabrielwalt.aem.page/index.plain.html' -o content/index.plain.html`
