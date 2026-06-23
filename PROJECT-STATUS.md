# PROJECT-STATUS.md — Migration Status

**Update whenever a page or block status changes.** This is a **session bookmark, not a log** — keep "Current Focus" to a few lines. Completed-work history lives in `PROJECT-PLAN.md` (task Resolved notes), `skills/craft-skills-field-notes.md`, and git.

---

## Current Focus

**Last updated:** 2026-06-18  
**Branch:** `main`  
**Active task:** Site scope analysis expanded to include `enterprise.semrush.com` (23 marketing pages — was missed because it's a separate host from the `www` sitemap). Catalog re-run over **169 marketing pages → 47 raw templates, 198 block variants**. Next: consolidate the 47 raw templates into a handful of canonical templates (see PROJECT-PLAN entropy-reduction task) before bulk import.  
**Last completed:** Improved the content-hub card-grid landings' layout (hub home + blog index). Added a `template-content-hub` body class (stacked on `template-default`, emitted by `import-content-hub.js` when a page has a `cards-icon-feature` grid) and scoped editorial-layout CSS to it: centered section headers, framed image-led blog cards (16:9 edge-to-edge cover, hairline border, clamped desc, accent CTA), a gradient research-callout panel, sized closing CTA. Fixed `statsBlock` to emit one cell per stat (was collapsing 3 stats into one column). Also fixed `cards-icon-feature` images rendering too small (now full-width natural ratio). All linters clean; verified scoped rules don't leak to the frozen homepage. GATE-2 visual still needs Console preview (dev server 404s these unpublished paths). Earlier: Quality pass on the new tool-detail + case-study pages. GATE-1 (content modeling): verified every section-style/template/block the pages reference resolves to real CSS — found `template-case-study` had NO CSS, so its long-form articles ran full-width; added an **additive** `body.template-case-study` reading-column rule (caps default-content to `--measure` 60ch, images + section-dark close opt out), which also wired up the previously-orphaned `--measure` token. Browser-verified the rule computes (697px @ 60ch). Fixed three decoration defects the critique surfaced on the banded-div tool pages (glued "Step N"/feature bullets, dropped CTA buttons, orphaned how-to steps) in `import-content-hub.js` + a general list-item un-gluing rule; re-imported all 14, no regression on section-shape pages. craft-floor + stylelint + eslint all clean (0 errors). **GATE-2 (visual) BLOCKED locally**: the dev server proxies the remote `.aem.page` and 404s unpublished `/free-tools/`,`/content-hub/` paths — these need Console preview to validate the look. Earlier: Autonomous batch — imported the rest of the `tool-detail` template (11 more `/free-tools/*` pages; +3 hub-grid pages DEFERRED for client-hydrated grids) and 3 `case-study-detail` pages (`success-spotlights/{barbara-ferrigno,exemplifi,sleepme}`). Extended `import-content-hub.js` to handle the newer checker/generator DOM shape (no `<section>` wrappers → banded `<div>`s): builds both candidate bodies and keeps the richer one, plus bare-div hero leads, numbered-step `<ol>` recovery, feature-grid un-gluing, nested-span CTA detection. Content audited: 10/11 free-tools + all 3 case studies complete. All await GATE 2 (local preview can't serve these subpaths; verified structurally + by live-source audit). Earlier: Content-completeness audit of all not-yet-validated imported pages (the `/vs/` family, content-hub editorial family, lottiefiles, /one/, feature) against their live originals. `/vs/`, content-hub landing/blog/article pages, lottiefiles, /one/, and feature were COMPLETE. Found + fixed a real content-loss bug in `import-content-hub.js`: it dropped every page's h3 sub-headings (feature labels + ALL FAQ questions) because region selection kept innermost sub-panels instead of the meaningful parent section, and prose used a single-heading emitter. Rewrote to select top-level sections + walk all headings/lists in order (`proseRegion()`); re-imported all 15 goodcontent pages — free-tools h3 0→6-15/page, FAQ questions restored, cards/stats pages unchanged (no regression). Earlier: Unified the ENTIRE `/vs/` family under ONE script (`import-comparison.js`): moz+ahrefs (now LOCKED — content+design validated; reproduce byte-identically), the `/vs/` index landing (NEW — `VSCard` grid → `cards-icon`), and the 4 legacy `/content-hub/vs-*` pages (auto-detected legacy dispatch, relocated to `content/vs/semrush-vs-*`, EXPANDED to capture all 8 source regions — no content lost). Deleted the now-redundant `import-content-hub-vs.js`. All 7 `/vs/` pages render clean; frozen pages verified byte-identical. (Earlier: 15 goodcontent editorial pages → `template-default` via `import-content-hub.js`.) Awaiting GATE 2 on the non-locked vs pages.  
**Next up:** canonical template hierarchy locked in `PROJECT-TEMPLATES.md` (3 chromes → 12 templates → sub-categories, all 47 raw mapped, routing resolved — no open confirmations); begin building templates reference-page-first (T01). Then GATE 2 on the feature page. Open: **F01** (Lazzer font decision).  
**Blocker:** none.

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
| Enterprise — block styling | ✅ Done (verify on preview once published) |
| Site scope analysis (www + enterprise) | ✅ Done — 169 marketing pages, 47 raw templates, 198 block variants (catalog in `catalog/`) |
| Template consolidation (47 → 12 canonical, 3 chromes) | 🔲 Hierarchy locked in PROJECT-TEMPLATES.md; build not started (T01) |
| Comparison pages (`/vs/semrush-vs-moz/` + `/vs/semrush-vs-ahrefs/`) — content imported | ✅ Done 2026-06-18 — both `/vs/` pages imported via one generic `import-comparison.js` (moz verified byte-stable; ahrefs reused parser as-is). These are the only two live `/vs/` pages (sitemap + 404 check) |
| Comparison page — styled | ✅ Done 2026-06-18 — awaiting GATE 2. Refinement pass applied: comparison-table merges "AI optimization" into the header row (no standalone band) + black/translucent row rules (visible over gradient) + rounded frame. NEW additive blocks `reviews` (single-testimonial carousel + arrow nav), `ratings` (3 centered score columns), `showcase` (large alternating frameless image+text rows). Final CTA → NEW `section-violet` band. All scoped to the comparison page (frozen index/enterprise/one unaffected). `--color-critical` token retained |
| Case-study page (`/content-hub/success-spotlights/lottiefiles/`) — content imported | ✅ Done 2026-06-18 — awaiting GATE 1 (default-content article) |
| `tool-detail` template family — content imported | ✅ 18/21 `/free-tools/*` done (7 writing-tools + 11 checkers/generators via `import-content-hub.js`); 3 hub-grid pages (seo, local-seo, ai-writing-tools) DEFERRED — client-hydrated card grid not in headless DOM. 10/11 new audited content-complete. Awaiting GATE 2 |
| `case-study-detail` template family — content imported | ✅ 4/8 done (lottiefiles + barbara-ferrigno, exemplifi, sleepme via `import-case-study.js`); all 3 new audited content-complete. Awaiting GATE 1/2 |
| Bulk import | 🔲 Not started |
| PageSpeed 100 | 🔲 Not started |
| Accessibility (WCAG 2.1 AA) | 🔲 Not started |

---

## Pages

Two independent validation flags per page (see `eds-migration-process` + `styling-additively`):
- **Content validated** = the default-content/block/section split and block names are user-approved (GATE 1).
- **Style validated** = the page's *look* is user-approved against the original (GATE 2). **Once style-validated, every block/variant/section-style the page uses is normally FROZEN** — style later pages additively so these can't move.
- **🔓 Unfrozen (design-open)** = a previously style-validated page the user has explicitly reopened for design improvement. Marked `✅ 🔓` in the Style column. The Frozen-Tools Rule is **suspended** for these. `tools/quality/project-state.mjs` excludes `🔓` pages from its `frozen` list.

**🔒 2026-06-18: user LOCKED index (homepage) + enterprise/index + the two comparison pages `vs/semrush-vs-moz` and `vs/semrush-vs-ahrefs` (all content AND design validated).** Their blocks/variants/section-styles are now frozen: style any new page **additively** (`styling-additively`) so a shared block never shifts under them. The comparison blocks (`comparison-table`, `reviews`, `ratings`, `showcase`, `section-violet`) and `cards-icon` are load-bearing for the locked vs pages — the other `/vs/` pages (index + 4 converted) must be styled additively around them. `import-comparison.js` reproduces moz/ahrefs byte-identically (re-verified on every re-import). (`seo` was named in the lock instruction but does not exist in the project — deleted in the 2026-06-17 scope reset; when re-created it is to be treated as locked too.)

**Scope:** 5 keepers below.

| Page | URL | Content validated | Style validated | Notes |
|------|-----|:---:|:---:|-------|
| Homepage | https://www.semrush.com/ | ✅ | ✅ 🔒 | **LOCKED 2026-06-18** (content + design validated). Frozen — changes to its shared blocks ripple to other pages; do not move its look |
| Semrush One | https://www.semrush.com/one/ | ✅ | 🔲 | 8 blocks; feature teasers use the violet-gradient default `.teaser`; `testimonials-oneoff-one` added. Style work in progress |
| Enterprise | https://enterprise.semrush.com/ | ✅ | ✅ 🔒 | **LOCKED 2026-06-18** (content + design validated). Frozen — style new pages additively around its blocks |
| Keyword Research (feature) | https://www.semrush.com/features/keyword-research-toolkit/ | ✅ (content complete, GATE 1 passed) | 🔲 | NEW 2026-06-18. Server-rendered `/features/` sibling of the homepage/one template. Modeled Toolbox-First onto existing blocks (no new block): hero default-content + `cards-icon-tools` (6 dual-CTA product cards) + `section-dark` CTA band + `cards-icon-related` (3 cards). New `template-feature` + 2 `cards-icon` variants, all additive/scoped (frozen index+enterprise + /one verified unchanged). Awaiting user style validation (GATE 2). Parser reusable for other `/features/` pages |
| Comparison — Moz | https://www.semrush.com/vs/semrush-vs-moz/ | ✅ | ✅ 🔒 | **LOCKED 2026-06-18 (content + design validated).** `content/vs/semrush-vs-moz.plain.html`. `template-comparison`. Blocks: `comparison-table`, `reviews`, `ratings`, `showcase` + `section-violet`. Reference baseline for the whole `/vs/` family; `import-comparison.js` reproduces it byte-identically |
| Comparison — Ahrefs | https://www.semrush.com/vs/semrush-vs-ahrefs/ | ✅ | ✅ 🔒 | **LOCKED 2026-06-18 (content + design validated).** `content/vs/semrush-vs-ahrefs.plain.html`. Same blocks/styles as moz via the unified `import-comparison.js`. Byte-identical on re-import |
| Comparison — Index (`/vs/`) | https://www.semrush.com/vs/ | ✅ | 🔲 | NEW 2026-06-18. Landing page → `content/vs/index.plain.html`. Hero + marquee + 6-competitor `cards-icon` grid (links rewritten to canonical `/vs/semrush-vs-*`) + `ratings` + `section-violet` CTA. Same `import-comparison.js`. Awaiting GATE 2 |
| Comparison — ChatGPT/Copy.ai/Jasper/SurferSEO | https://www.semrush.com/content-hub/vs-* → /vs/semrush-vs-* | ✅ | 🔲 | NEW 2026-06-18. LEGACY editorial pages CONVERTED + relocated to `content/vs/semrush-vs-*.plain.html`, now via the SAME unified `import-comparison.js` (legacy dispatch). Expanded to capture ALL 8 source regions — nothing lost (hero+reviews, advantages prose, AI-functionality screenshots, comparison table, success story, learn-more, violet CTA). All 4 render clean. Awaiting GATE 2 |
| Goodcontent editorial family (15 pages) | /content-hub/ landing, ai-prompt-library, ai-content-marketing-report, can-ai-content-rank-on-google, content-marketing-blog (+ how-to-use-chatgpt, small-business-content-ideas), ebooks-templates/content-marketing-starter-kit, 7× /free-tools/* | ✅ | 🔲 | NEW 2026-06-18. Whole legacy "goodcontent" template family migrated to `template-default` via ONE generic shape-driven parser `import-content-hub.js` (sections→`columns-stats`/`cards-icon`/default; `<article>` branch for blog-redirected pages). Reuses existing toolbox, zero new blocks. Caveats: free-tools migrate content shell only (interactive JS not ported); 2 form-gated pages (report, ebook) are intentionally thin. All render-verified. Awaiting GATE 2 |
| Nav (fragment) | — | ✅ | ✅ 🔓 | Design-open. `content/nav.plain.html` — shared header content |
| Footer (fragment) | — | ✅ | ✅ 🔓 | Design-open. `content/footer.plain.html` — shared footer content |

---

## Known Issues

- Resource card images 404 on local dev server (remote media assets not available locally).
- `cards-icon-feature` cards render title/desc/CTA `<p>`s nested inside the image's wrapping `<p>` (EDS `wrapTextNodes` artifact). Cosmetic only — renders correctly. Not fixed: the touch point is shared `cards-icon.js`, so the regression risk outweighs the DOM-tidiness gain.
- **Lazzer heading font is NOT loaded** (no `@font-face`, no font file, no reachable CDN URL) — headings render in the Inter fallback. **F01** in PROJECT-PLAN tracks the decision (add Lazzer woff2 500/600 vs. standardize on Inter). Body weight 500 is fine — Inter 500 IS loaded.

---

## Next Actions

1. One + Enterprise — run a Page-mode `excat-visual-critique` to baseline similarity, then close gaps toward style validation.
2. Resolve **F01** (Lazzer) once the user picks a direction.
3. Performance validation — PageSpeed on feature branch.
4. Accessibility audit — WCAG 2.1 AA.
