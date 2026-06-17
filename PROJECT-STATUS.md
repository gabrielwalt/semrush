# PROJECT-STATUS.md — Migration Status

**Update whenever a page or block status changes.**

---

## Current Focus

**Last updated:** 2026-06-17  
**Branch:** `main`  
**Active task (skills system):** DONE — Integrated impeccable.style lessons into our skill library. (1) Added **"Make skills operational"** (7 authoring habits) + an **anti-pattern capture recipe** to `writing-skills`. (2) Added a **Named Rules** registry to `AGENTS.md` (after Rules, before Skills System): Workbench-Before-Tools, Brand-Foundation-First, Toolbox-First, Frozen-Tools, Bookend-Verification, Anti-Pattern-Capture. (3) Added the **opening bookend** (state checkable success criteria up front) to `verify-before-claiming`. (4) New skill **`migration-orientation`** — mandatory pre-import setup conversation (scope, content/design source incl. Figma, fidelity, reuse, per-page overrides, constraints) with the **Faithful/Refined/Reimagined** fidelity scale. (5) Evolved **`PROJECT-DESIGN.md`** into a guiding doc with a `## Migration Strategy` section; **site-default fidelity = Refined** (user-confirmed). (6) New skill **`global-style-foundation`** — the capture-the-essence *workbench* pass across ≥3 pages before any block styling. (7) Reworked **`eds-migration-process`**: step 0 = orient, step 2 = build foundation, fidelity threaded into Phase 2 per-block styling. README index updated. Impeccable repo copied to `.impeccable-analysis/` for reference. NEXT: exercise the new flow on the next migration action, or prune `.impeccable-analysis/` if no longer needed.  
**Prior active task:** DONE — Made blocks **context-adaptive to dark surfaces** and recovered the enterprise tab content. (1) Recovered ALL SIX tab panels from the live site by real Playwright tab-clicks (the prior "uncapturable" note was wrong — each Builder.io panel loads on a genuine click). `tabsParser` now emits one BARE `teaser` per tab with full content (heading + 40px subtitle + description + feature list + Explore CTA) and its distinct illustration; six panels' published copy/images live in `PANEL_FALLBACK` so re-import reproduces them. (2) Removed the explicit `teaser-dark` variant entirely. The bare `teaser` is now **context-adaptive**: on a `section-dark` section or a `template-dark` page it AUTO-INVERTS (white text, inverted buttons, dark glass) — authors no longer add a dark variant. Self-styled `teaser-oneoff-enterprise` absorbed its own dark card styling (context-independent). (3) Split a GENERIC reusable **`template-dark`** (color inversion only) out of `template-enterprise`; the enterprise page now stacks `template: template-dark, template-enterprise` (comma-split → `body.template-dark.template-enterprise`); scripts.js fallback adds both. (4) New skill **`context-adaptive-blocks`** + updates to `eds-content-modeling` (context-adaptive vs variant; stacked templates) and `page-template-metadata`. Re-bundled + re-imported enterprise (9 sections, all 6 tab teasers w/ media + template metadata verified in preview, body has both classes, tab teaser container bg=none/text=#fff). Homepage regression-checked: enterprise teaser still black+white, semrush-one unchanged. Lint clean. NEXT: user validation of the enterprise tab look (now full content + illustrations).  
**Prior task:** Enterprise page (`content/enterprise/index.plain.html`, `body.template-enterprise`) — content-complete + designed + critiqued. Refactored the enterprise testimonials section OFF the bespoke `testimonials-carousel` block onto the baseline **`carousel` block + new `carousel-testimonials` variant** (per eds-content-modeling: reuse baseline, name semantically). It's now a single horizontal scrolling row of portrait 318px image cards with ‹/› nav (was a static 4-col grid). `testimonialsCarouselParser` emits `Carousel (carousel-testimonials)`; variant CSS in `carousel.css` (4:5 cards, no light placeholder); removed the old enterprise `.testimonials-carousel` overrides + the full-width re-cap (base carousel handles it). The testimonials carousel section stays DARK while the resources carousel section is WHITE — both are `.carousel-container`, disambiguated with `:not(:has(.carousel-testimonials))` on the white-section rules + white nav-button override on the dark one. NOTE: the base `testimonials-carousel` block is KEPT (4 toolkit pages — content/company/pricing/social — still use it; verified company unchanged). Recent fixes: (1) page is NOT dark end-to-end — case-study + resources sections are WHITE (`.case-study-container`/`.carousel-container` painted white w/ dark text); hero/marquee/testimonials/tabs/platform/CTA stay dark. (2) testimonials-carousel was bleeding full-viewport-width (base wrapper has `full-width`) → re-capped `.testimonials-carousel-wrapper.full-width` to container width. (3) case-study "Case Studies" + platform "MODULAR SOLUTIONS" eyebrows were client-rendered text nodes the parser missed → added published-copy fallbacks in `caseStudyParser`/`platformParser`, rebundled+reimported (9 sections + metadata intact). All enterprise CSS scoped `body.template-enterprise` (wrapped in scoped `stylelint-disable no-descending-specificity`). Index regression-verified unchanged each pass. Lint clean. TABS critique pass done: tablist is now a CENTERED translucent-white segmented-control pill (`border-radius: pill`, 12px padding, fit-content auto-centered, no bottom hairline) with the selected tab as a FILLED purple pill (dark text); section heading + panel both centered; panel constrained to 640px auto-centered; feature `<ul>` rendered without the global purple `li::before` dot (suppressed with `content: none`) since the centered column has no left gutter. Tab switching verified working (only enterprise uses the tabs block). Known gap: 5 non-SEO tab-panel bodies + Marketo form are lazy Builder.io content, not capturable. NEXT: user validation of the enterprise look (then freeze its blocks/styles).  
**Last completed:** Imported 10 pages with structured content + styling: index (validated), one, enterprise, seo, content, pricing, local-business, social-media, pr-toolkit, company. Built TWO toolkit parsers (v1 `.landing` marker-based for /seo/; v2 shape-based for newer CSS-module pages). New `accordion` block. `columns-stats` for toolkit stats. `template-toolkit` body styling. All metadata emitted as own section.  
**Last polish:** Fixed v2 testimonials extraction (now separate quote cards on content/pricing/social/company) and feature-card sub-bullet over-extraction (clean cards on content). All 10 pages: 1 metadata block in own section, blocks present, CSS lint clean.  
**Next up:** Per-page pixel compare vs original (hero subtitle on /content/ picks up a testimonial quote — minor `firstText` fix); revisit app-shell pages (advertising, traffic, ai-seo, features) that import thin  
**Blocker:** Some SPA/app-shell toolkit pages render too sparsely for the headless importer (advertising/traffic/ai-seo time out or yield little)

---

## Progress

| Area | Status |
|------|--------|
| Homepage content + blocks + styling | ✅ Done |
| Import scripts — homepage, nav, footer | ✅ Done (consolidated, no inline duplication) |
| Header/nav — sticky, mega-menu, mobile | ✅ Done |
| Footer — layout, social icons, SEMRUSH reveal | ✅ Done |
| Font system / typography | ✅ Done |
| Skills system | ✅ Done |
| Semrush One — content imported | ❌ Lost — needs re-import |
| Semrush One — block styling | ⏸ Blocked (content lost) |
| Enterprise — content imported | ✅ Done |
| Enterprise — block styling | ✅ Done (E01–E04 complete; verify on preview once published) |
| Bulk import | 🔲 Not started |
| PageSpeed 100 | 🔲 Not started |
| Accessibility (WCAG 2.1 AA) | 🔲 Not started |

---

## Homepage Blocks — Refinement Status

| Block | Status | Notes |
|-------|--------|-------|
| `announcement-bar` | ✅ Done | Purple accent bg, centered link |
| `header` | ✅ Done | Sticky fixed, transparent/white toggle, mega-menu, mobile nav focusout fix |
| `insights-widget` | ✅ Done | Searchable country dropdown (115 countries), blinking cursor, chevron, z-index layering |
| `media` | ✅ Done | Glass-framed image or video; detects video URL in link text, poster fallback, autoplay (was `video`) |
| `marquee` | ✅ Done | Edge fade via CSS mask-image, 50px desktop / 32px mobile logo height |
| `teaser` | ✅ Done | Was `video-card`. 64px padding, glass frame, stacked; `teaser-dark` generic inversion + `teaser-oneoff-*` branded backgrounds |
| `carousel` | ✅✅ Refined | Was `carousel-slider`. Overflow:hidden clipping, left-edge margin alignment, nav in header area (60×60px, 16px gap), hidden <1024px, section header 48px uppercase |
| `stats-facts` | ✅✅ Refined | Up-arrow SVG via ::after, hatching pattern via ::before, section header 48px uppercase, "Learn more" CTA grid-positioned top-right |
| `stats-visibility` | ✅ Done | 84px heading, alternating cyan/purple bars, dark section, section-oneoff-ai-visibility |
| `testimonials` | ✅✅ Refined | Zoominfo logo, quote marks, author role, 26px Lazzer quote text, 2fr:1fr grid, stats pattern SVG |
| `carousel` (resources) | ✅✅ Refined | Descriptions added to content + parser, Lazzer font on cards, 24px image gap |
| `footer` | ✅✅ Refined | Sticky reveal fixed (sibling of .footer), social icons, Adobe logo, Lazzer font, 1440px max-width, bottom bar with legal row |

### Global typography refinement (✅✅)
- Body font-weight 500, letter-spacing -0.02em
- H2/H3 letter-spacing tightened to -0.04em
- Tablet breakpoint (<1024px) for heading-xl → 32px
- Lazzer font 500 weight in use for body text

---

## Pages

Two independent validation flags per page (see `eds-migration-process` + `styling-additively`):
- **Content validated** = the default-content/block/section split and block names are user-approved (GATE 1).
- **Style validated** = the page's *look* is user-approved against the original (GATE 2). **Once style-validated, every block/variant/section-style the page uses is FROZEN** — style later pages additively so these can't move.

| Page | URL | Content validated | Style validated | Notes |
|------|-----|:---:|:---:|-------|
| Homepage | https://www.semrush.com/ | ✅ | ✅ | Validated reference. Its blocks/variants/section-styles are frozen |
| Semrush One | https://www.semrush.com/one/ | ✅ | 🔲 | 8 blocks; `video-card-feature` consolidated into `teaser`; `testimonials-oneoff-one` added. Feature teasers now use the violet-gradient default `.teaser` look (matches original). Style work in progress |
| Enterprise | https://enterprise.semrush.com/ | ✅ | 🔲 | Content imported + block styling done; look not yet user-validated |
| SEO | https://www.semrush.com/seo/ | ✅ | 🔲 | Imported + styled (toolkit v1) |
| Content | https://www.semrush.com/content/ | ✅ | 🔲 | Imported (toolkit v2) |
| Pricing | https://www.semrush.com/pricing/ | ✅ | 🔲 | Imported (toolkit v2) |
| Local | https://www.semrush.com/local-business/start/ | ✅ | 🔲 | Imported (toolkit v2) |
| Social Media | https://www.semrush.com/social-media/ | ✅ | 🔲 | Imported (toolkit v2) |
| PR Toolkit | https://www.semrush.com/pr-toolkit/ | ✅ | 🔲 | Imported (toolkit v2) |
| Company | https://www.semrush.com/company/ | ✅ | 🔲 | Imported (toolkit v2) |
| Advertising / Traffic / AI-SEO / Features | (toolkit) | 🔲 | 🔲 | App-shell SPAs — import thin/time out; needs different approach |

---

## Known Issues

- Backward-compat redirect blocks (`solutions-slider`, `hero-video`, `promo-cards`) exist because remote AEM content may reference old block names
- Resource card images 404 on local dev server (remote media assets not available locally)
- Lazzer font weight 500 is used by body but only 400/600/700 weights are loaded in `fonts.css` — may cause faux-bold rendering on some browsers
- ESLint cannot run in current environment (dependency conflict with `es-abstract`) — JS files not linted

---

## Next Actions

1. Enterprise page — style new blocks (see PROJECT-PLAN.md)
2. Semrush One — re-import content when ready, then verify block styling (columns-stats, cards-icon, cards-awards CSS is ready)
3. Performance validation — PageSpeed on feature branch
4. Accessibility audit — WCAG 2.1 AA
