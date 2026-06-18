# PROJECT-STATUS.md — Migration Status

**Update whenever a page or block status changes.** This is a **session bookmark, not a log** — keep "Current Focus" to a few lines. Completed-work history lives in `PROJECT-PLAN.md` (task Resolved notes), `skills/craft-skills-field-notes.md`, and git.

---

## Current Focus

**Last updated:** 2026-06-18  
**Branch:** `main`  
**Active task:** none in progress.  
**Last completed:** ran enriched detectors on One + Enterprise (clean; only the 5 accepted brand-gradient warns) and extended the scroll-animation layer to both pages (Enterprise case-study count-up + grid reveal); reduced-motion + mobile verified; lint + detector clean.  
**Next up:** One + Enterprise await per-page **style validation** — run a Page-mode `excat-visual-critique` to baseline similarity %, then close gaps. Open plan task: **F01** (Lazzer heading font — user decision needed).  
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
| Bulk import | 🔲 Not started |
| PageSpeed 100 | 🔲 Not started |
| Accessibility (WCAG 2.1 AA) | 🔲 Not started |

---

## Pages

Two independent validation flags per page (see `eds-migration-process` + `styling-additively`):
- **Content validated** = the default-content/block/section split and block names are user-approved (GATE 1).
- **Style validated** = the page's *look* is user-approved against the original (GATE 2). **Once style-validated, every block/variant/section-style the page uses is normally FROZEN** — style later pages additively so these can't move.
- **🔓 Unfrozen (design-open)** = a previously style-validated page the user has explicitly reopened for design improvement. Marked `✅ 🔓` in the Style column. The Frozen-Tools Rule is **suspended** for these. `tools/quality/project-state.mjs` excludes `🔓` pages from its `frozen` list. **2026-06-17: user unfroze index, nav, footer.**

**Scope:** 5 keepers below (scope reset 2026-06-17 — the 11 other imported pages were deleted, too far from the originals; to be re-created later from a stronger foundation).

| Page | URL | Content validated | Style validated | Notes |
|------|-----|:---:|:---:|-------|
| Homepage | https://www.semrush.com/ | ✅ | ✅ 🔓 | **Unfrozen 2026-06-17** for design improvement. Changes to its shared blocks still ripple to other pages — verify there too |
| Semrush One | https://www.semrush.com/one/ | ✅ | 🔲 | 8 blocks; feature teasers use the violet-gradient default `.teaser`; `testimonials-oneoff-one` added. Style work in progress |
| Enterprise | https://enterprise.semrush.com/ | ✅ | 🔲 | Content imported + block styling done; look not yet user-validated |
| Nav (fragment) | — | ✅ | ✅ 🔓 | **Unfrozen 2026-06-17.** `content/nav.plain.html` — shared header content |
| Footer (fragment) | — | ✅ | ✅ 🔓 | **Unfrozen 2026-06-17.** `content/footer.plain.html` — shared footer content |

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
