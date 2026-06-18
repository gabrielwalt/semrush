# PROJECT-STATUS.md — Migration Status

**Update whenever a page or block status changes.** This is a **session bookmark, not a log** — keep "Current Focus" to a few lines. Completed-work history lives in `PROJECT-PLAN.md` (task Resolved notes), `skills/craft-skills-field-notes.md`, and git.

---

## Current Focus

**Last updated:** 2026-06-18  
**Branch:** `main`  
**Active task:** New page — `/features/keyword-research-toolkit/` imported + styled, **awaiting GATE 2 (style validation)**. Content complete (all 17 CTAs / 6 tool + 3 related cards match source, GATE 1 passed: card titles + both grids on `cards-icon`). Styled additively at Refined fidelity — new `template-feature` + `cards-icon-tools`/`cards-icon-related` variants, all scoped so the LOCKED index/enterprise + /one are verified unchanged. Lint + detector clean (5 accepted brand warns); desktop+mobile no overflow.  
**Last completed:** the feature page above (parser `import-feature.js`, reusable for other `/features/` siblings).  
**Next up:** user validates the feature page look (GATE 2); then replicate the parser to sibling `/features/` pages. Open: **F01** (Lazzer font decision).  
**Blocker:** none. (Tool-card glyphs are remote `cdn.semrush.com` SVGs — load in preview, will become DA hashes on upload; same pattern as other pages.)

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
| Bulk import | 🔲 Not started |
| PageSpeed 100 | 🔲 Not started |
| Accessibility (WCAG 2.1 AA) | 🔲 Not started |

---

## Pages

Two independent validation flags per page (see `eds-migration-process` + `styling-additively`):
- **Content validated** = the default-content/block/section split and block names are user-approved (GATE 1).
- **Style validated** = the page's *look* is user-approved against the original (GATE 2). **Once style-validated, every block/variant/section-style the page uses is normally FROZEN** — style later pages additively so these can't move.
- **🔓 Unfrozen (design-open)** = a previously style-validated page the user has explicitly reopened for design improvement. Marked `✅ 🔓` in the Style column. The Frozen-Tools Rule is **suspended** for these. `tools/quality/project-state.mjs` excludes `🔓` pages from its `frozen` list.

**🔒 2026-06-18: user LOCKED index + enterprise/index (content AND design validated — re-froze index after its design-improvement pass).** Their blocks/variants/section-styles are now frozen: style any new page **additively** (`styling-additively`) so a shared block never shifts under them. (`seo` was named in the lock instruction but does not exist in the project — deleted in the 2026-06-17 scope reset; when re-created it is to be treated as locked too.)

**Scope:** 5 keepers below.

| Page | URL | Content validated | Style validated | Notes |
|------|-----|:---:|:---:|-------|
| Homepage | https://www.semrush.com/ | ✅ | ✅ 🔒 | **LOCKED 2026-06-18** (content + design validated). Frozen — changes to its shared blocks ripple to other pages; do not move its look |
| Semrush One | https://www.semrush.com/one/ | ✅ | 🔲 | 8 blocks; feature teasers use the violet-gradient default `.teaser`; `testimonials-oneoff-one` added. Style work in progress |
| Enterprise | https://enterprise.semrush.com/ | ✅ | ✅ 🔒 | **LOCKED 2026-06-18** (content + design validated). Frozen — style new pages additively around its blocks |
| Keyword Research (feature) | https://www.semrush.com/features/keyword-research-toolkit/ | ✅ (content complete, GATE 1 passed) | 🔲 | NEW 2026-06-18. Server-rendered `/features/` sibling of the homepage/one template. Modeled Toolbox-First onto existing blocks (no new block): hero default-content + `cards-icon-tools` (6 dual-CTA product cards) + `section-dark` CTA band + `cards-icon-related` (3 cards). New `template-feature` + 2 `cards-icon` variants, all additive/scoped (frozen index+enterprise + /one verified unchanged). Awaiting user style validation (GATE 2). Parser reusable for other `/features/` pages |
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
