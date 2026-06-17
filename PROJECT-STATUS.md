# PROJECT-STATUS.md — Migration Status

**Update whenever a page or block status changes.**

---

## Current Focus

**Last updated:** 2026-06-17  
**Branch:** `main`  
**Active task (craft-floor cleanup F01–F10):** DONE — Worked the whole impeccable.style review backlog in disruptive-first order. **F04** type scale: kept the frozen 84/64/48/24 scale (clean ~1.32 ratio; the 48→24 "cliff" is a legit display→text tier split), fixed the real twin defect — h5/h6 both resolved to 16px → now 18/16, distinct (h5/h6 unused in content = zero risk). **F07** radius+transitions: added `--radius-l: 12px` (the dominant card/glass radius), tokenized glass-surface/carousel-glass/+/one/ 10px card; tokenized the 2 foundation-level `0.2s` transitions → `--transition-fast`. **F05** links: scoped persistent underline to `main .default-content-wrapper p a:not(.button)` only (homepage has no prose links — all bare `main` links are `<h3>` card titles; verified announcement-bar/cards/CTAs NOT underlined). **F03** tokens: stripped brand.css's duplicate `:root` (4 tokens incl. the dead `--color-muted: rgb(51 51 51)`); single home in styles.css, live muted value `rgb(108 110 121)` unchanged. **F06** added `--color-inverse: #fff` and tokenized ~16 genuine inverse-text/border/button `#fff` in styles.css (left white card-bg + glass-mask literals). **F09** removed 2 unused Roboto `@font-face` + their 4 woff2 files + the 9-line alias-token layer (repointed all live consumers to real tokens first; body=18/h1=84/code=16 verified unchanged). **F02** global `:where(...):focus-visible` ring (purple, cyan on dark) — keyboard-only, button focus preserved. **F10** global `@media (prefers-reduced-motion: reduce)` baseline (settles marquee 25s loop + all transitions). **F01 (Lazzer @font-face) DEFERRED per user** — font not available; token keeps declaring Lazzer (renders Inter), Real-Font item stays open. **F08 closed won't-change** — 12px is a load-bearing de-facto step, 32/40 both used; documented in PROJECT-DESIGN. All edits verified in preview (index/one/enterprise), CSS lint clean, no dangling refs, frozen-page values unchanged except the authorized additive craft changes. NEXT: source the Lazzer font to close F01, or validate the look of /one/ + enterprise.  
**Prior task (craft-floor skill + review):** DONE — Reviewed the style system against impeccable.style's live skill docs (the old `.impeccable-analysis/` clone was pruned; fetched Typeset/Colorize/Layout/Distill/Polish from the site instead). Found 10 substantive issues. Captured the impeccable thresholds as a NEW generic skill **`craft-floor`** (named rules: One-Ratio, No-Twin-Sizes, Real-Font, Distinct-Link, One-Token-One-Home, Tokenize-Inverse, One-Spacing-Scale, One-Radius, All-Elements-Focus, Reduced-Motion-Baseline, Distill) — gated to fire ONLY at Refined/Reimagined fidelity (not Faithful). Wired into `skills/README.md` + cross-referenced from `global-style-foundation` at the fidelity-application point. Filed the review's findings as **PROJECT-PLAN.md Phase F tasks F03–F09** (F01 Real-Font/Lazzer + F02 focus already existed), each citing its craft-floor rule as acceptance criterion; flagged which need sign-off (move a frozen page) vs zero-risk refactors (F03/F06/F09). NEXT: get sign-off on F01 direction + the needs-sign-off tasks (F04/F05/F07/F08), or start the zero-risk refactors F03/F06/F09.  
**Prior task (foundation audit):** DONE — Non-destructive foundation/craft pass across the 3 good pages (index, one, enterprise), docs only — NO CSS/content touched, frozen pages unchanged. (A) Measured the de-facto global system at 1440px in preview and recorded **Named Foundation Rules** in PROJECT-DESIGN.md (type-scale ratio ~1.31; display 84px; heading tracking -0.04em; body Inter 500/18px/lh1.5/-0.02em; **body-contrast floor ≥4.5:1, actual 17:1 on light AND dark**; section rhythm 60/30px; button system). Corrected two stale spacing values (section-padding was documented 120px → actual **60px**; block-padding 64px → **60px**). (B) De-duplicated PROJECT-BLOCKS.md (carousel/cards-icon/columns-stats were listed twice), added missing blocks (`case-study`, `footer-cta/-links/-bottom`), corrected **Used on** to the 5 keepers, and added a **consolidation-candidates** list (proposals only). (C) Filed two verifiable plan tasks in PROJECT-PLAN.md Phase F: **F01** Lazzer `@font-face` is never loaded so headings fall back to Inter (needs user decision — changes frozen look); **F02** focus-visible only on buttons, add a consistent global ring. Contrast + heading scale audited and PASS (no task needed). NEXT: get user sign-off on F01 direction (add Lazzer vs standardize on Inter), then validate the look of /one/ and enterprise.  
**Prior task (scope reset):** DONE — Pared the project back to 5 keepers (index, one, enterprise/index, nav, footer) on user direction; deleted the 11 other imported pages (too far from originals, to be re-created later). Removed orphaned infra: `accordion` + `testimonials-carousel` blocks, both toolkit parsers (`import-toolkit.js`/`-toolkit2.js`) + urls lists, `seo-*.svg` (6), and the `template-toolkit` CSS block (preserved `.glass-surface` which sat inside it). Updated PLAN (removed A01/A02-A03/A04-A09/B01 as obsolete), STATUS, IMPORT, BLOCKS docs. The 3 rendered keepers verified byte-identical to baseline; CSS lint clean. NEXT: re-create pages from the foundation when ready (orient → foundation → content → gates).  
**Prior task (enterprise polish):** DONE — Two enterprise/index fixes. (1) **Header full inversion** on dark templates: text already inherited white from `body.template-dark`, but the header bg was hardcoded `#fff`, logo was colored, buttons fixed-dark. Added 3 rules in `styles.css` scoped to `body.template-dark header` (bg→`--dark-color`, logo→`filter: brightness(0) invert(1)`, Log In→white-outline, Sign Up→white-fill/dark-text) + a guard in `header.js` to skip the desktop scroll-fade (which writes an inline light bg) when `template-dark`. Verified inverted on enterprise, frozen homepage header unchanged (white/colored logo/original buttons). (2) **Restored the missing hero video** (autoplay/loop/muted, glass-framed) between the "Book a demo" CTA and the logo marquee. Added a `Media` block to `heroParser` in `import-enterprise.js` (`HERO_FALLBACK.videoSrc`, a Builder.io CDN asset with NO file extension) + a Builder.io detector in `scripts/video-utils.js` (matches `/o/`+`alt=media`→`video/mp4`). Mirrored into content (no destructive bulk re-import). Verified 708×472, readyState 4, glass frame, correct position. Re-bundled. **Fidelity overrides recorded** in PROJECT-DESIGN.md: app-shell SPAs (advertising/traffic/ai-seo/features) = Reimagined; all other pages = Refined default.  
**Prior task (skills system):** DONE — Integrated impeccable.style lessons into our skill library. (1) Added **"Make skills operational"** (7 authoring habits) + an **anti-pattern capture recipe** to `writing-skills`. (2) Added a **Named Rules** registry to `AGENTS.md` (after Rules, before Skills System): Workbench-Before-Tools, Brand-Foundation-First, Toolbox-First, Frozen-Tools, Bookend-Verification, Anti-Pattern-Capture. (3) Added the **opening bookend** (state checkable success criteria up front) to `verify-before-claiming`. (4) New skill **`migration-orientation`** — mandatory pre-import setup conversation (scope, content/design source incl. Figma, fidelity, reuse, per-page overrides, constraints) with the **Faithful/Refined/Reimagined** fidelity scale. (5) Evolved **`PROJECT-DESIGN.md`** into a guiding doc with a `## Migration Strategy` section; **site-default fidelity = Refined** (user-confirmed). (6) New skill **`global-style-foundation`** — the capture-the-essence *workbench* pass across ≥3 pages before any block styling. (7) Reworked **`eds-migration-process`**: step 0 = orient, step 2 = build foundation, fidelity threaded into Phase 2 per-block styling. README index updated. Impeccable repo copied to `.impeccable-analysis/` for reference. NEXT: exercise the new flow on the next migration action, or prune `.impeccable-analysis/` if no longer needed.  
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
| Semrush One — content imported | ✅ Done (keeper) |
| Semrush One — block styling | 🔲 In progress (look not yet validated) |
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

**Scope reset 2026-06-17:** pared back to the 5 keepers below. The 11 other imported pages (seo, content, pricing, local-business, social-media, pr-toolkit, company, advertising, ai-seo, analytics/traffic, features) were deleted — too far from the originals; to be re-created later from a stronger foundation. Removed with them: `accordion` + `testimonials-carousel` blocks, both toolkit parsers, `seo-*.svg`, `template-toolkit` CSS.

| Page | URL | Content validated | Style validated | Notes |
|------|-----|:---:|:---:|-------|
| Homepage | https://www.semrush.com/ | ✅ | ✅ | Validated reference. Its blocks/variants/section-styles are frozen |
| Semrush One | https://www.semrush.com/one/ | ✅ | 🔲 | 8 blocks; `video-card-feature` consolidated into `teaser`; `testimonials-oneoff-one` added. Feature teasers use the violet-gradient default `.teaser` look. Style work in progress |
| Enterprise | https://enterprise.semrush.com/ | ✅ | 🔲 | Content imported + block styling done; look not yet user-validated |
| Nav (fragment) | — | ✅ | ✅ | `content/nav.plain.html` — shared header content |
| Footer (fragment) | — | ✅ | ✅ | `content/footer.plain.html` — shared footer content |

---

## Known Issues

- Resource card images 404 on local dev server (remote media assets not available locally)
- `cards-icon-feature` cards render with title/desc/CTA `<p>`s nested inside the image's wrapping `<p>` (EDS `wrapTextNodes` artifact). Cosmetic only — renders correctly. Not fixed: the touch point is the shared `cards-icon.js` (also used on the frozen /one page), so the regression risk outweighs the DOM-tidiness gain.
- **Lazzer heading font is NOT loaded at all** (no `@font-face` anywhere; no font file in repo, no reachable CDN URL) — all headings currently render in the Inter fallback. F01 DEFERRED per user 2026-06-17: keep the `--heading-font-family` token declaring Lazzer, source the font later. craft-floor Real-Font item stays OPEN until a Lazzer woff2 (weights 500/600) or licensed URL is supplied. (Body weight 500 is fine — Inter 500 IS loaded.)
- ESLint cannot run in current environment (dependency conflict with `es-abstract`) — JS files not linted

---

## Next Actions

1. Enterprise page — style new blocks (see PROJECT-PLAN.md)
2. Semrush One — re-import content when ready, then verify block styling (columns-stats, cards-icon, cards-awards CSS is ready)
3. Performance validation — PageSpeed on feature branch
4. Accessibility audit — WCAG 2.1 AA
