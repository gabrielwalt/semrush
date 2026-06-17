# PROJECT-PLAN.md — Active Tasks

**Pick the first `🔲 Open` task, implement it fully, mark it `✅ Done`, then move to the next.**

---

## How to work this list

**Required skills:** Load `executing-plan-tasks` before starting. For import work also load `marker-driven-import`, `eds-content-modeling`, `eds-migration-process`.

**Execution protocol:**
1. Read the task and the files/skills it references before touching anything.
2. Implement the change.
3. Verify: for content/import work, run the never-overwrite temp-diff loop (`PROJECT-IMPORT.md` → Validation loop) and confirm the import reproduces the validated reference. For styling, reload the preview and compare against the original.
4. Mark the task `✅ Done` and update `PROJECT-STATUS.md`.
5. **After 2 failed fix attempts: STOP.** Ask the user.

---

## Goal

Grow the migration page by page. For each new page: model its content with the **augmented-styles** ladder (baseline blocks + variants + section styles + page template — see `eds-content-modeling`), reuse existing blocks wherever possible, add the minimum of new variants/styles, then build a generic marker-driven parser that reproduces the validated content exactly and renders identically to the original.

The homepage (`content/index.plain.html`) is the **validated reference** and the worked example of every layer. Use it as the pattern for the next pages.

---

## ✅ Batch complete — 10 pages imported (autonomous run, 2026-06-16)

Imported & rendering with structured augmented-styles content: **index** (validated), **one**, **enterprise**, **seo**, **content**, **pricing**, **local-business**, **social-media**, **pr-toolkit**, **company**. Built `accordion` block, two toolkit parsers (v1 class-marker for `/seo/`, v2 content-shape for newer pages), `template-toolkit` styling. Details in `PROJECT-IMPORT.md`.

## Phase A — Polish the imported batch (next)

### A01 — 🔲 Open — Per-page visual compare vs original

**Why:** Content is structured and renders cleanly, but not yet pixel-compared to the original on each page.
**Action:** For each of the 10 pages, load `/content/<page>` at 1440px + 375px, compare to the original with `block-visual-iteration` + `measure-then-implement`. Fix spacing/typography/color gaps. No regressions on index.
**Acceptance:** Each page visually matches the original at desktop + mobile.

### A02 — ✅ Done — Fix v2 testimonials extraction

Testimonials were collapsing into one run-on paragraph. Fixed `classify` (detect `h2 === "Testimonials"`, straight + curly quotes, quote-paragraph fallback) and `buildTestimonials` (quote→name→role rhythm splitting, slide-marker skip, outermost-wrapper dedup). Re-imported content (5 cards), pricing (7), social-media, company — all render as separate quote cards with photo + name + role.

### A03 — ✅ Done — De-duplicate v2 feature-card sub-bullets

`findCardItems` was emitting a card's own sub-bullets as separate cards. Fixed by excluding `<li>`s nested inside another `<li>`/`<article>`. `/content/` now shows 5 clean feature cards (was over-extracting bullet items).

## Phase B — App-shell pages (deferred)

### B01 — 🔲 Open — Handle SPA/app-shell toolkit pages

**Why:** `/advertising/`, `/analytics/traffic/`, `/ai-seo/overview/`, `/features/` are client-rendered SPAs with deep obfuscated nesting; they import thin or time out under the headless importer.
**Action:** Either add a longer render-wait/scroll step before capture, or build a tailored parser per page. Validate structure before adding to the set.
**Acceptance:** Each renders with its full content.

---

## Standing priorities (not yet scheduled)

- **PageSpeed 100** — performance validation on the feature branch.
- **Accessibility WCAG 2.1 AA** — audit and fix (focus-visible styles, ARIA on interactive blocks).
- **Mobile polish** — responsive refinement pass at <768px and 768–1023px across migrated pages.

---

## Completed work (archive)

| ID Range | Area | Count |
|----------|------|-------|
| P01–P05 | Merge fixes | 5 |
| M01–M08 | Skills library | 8 |
| T01–T18 | Homepage blocks & layout | 18 |
| E01–E04 | Enterprise blocks | 4 |
| V01–V02 | Asset verification | 2 |
| H01–H26 | Homepage visual refinement | 26 |
| R01–R06 | Second-pass refinement | 6 |
| C01–C15 | Dead-code removal, consolidation, spacing, docs | 15 |
| Q01–Q08 | Quality & accessibility (tabs ARIA, focus, colors, fonts) | 8 |
| S01–S08 | Skills-library audit & fixes | 8 |
| — | Augmented-styles refactor (teaser/carousel/media renames, section-oneoff split, template-homepage, content-ownership asset moves) | — |
| — | Homepage import: marker-driven parser reproduces validated content exactly (incl. marquee + template metadata) | — |
| — | 10-page autonomous batch: accordion block, toolkit v1+v2 parsers, columns-stats, template-toolkit styling; imported seo/content/pricing/local/social/pr/company + one/enterprise | — |
| **Total** | | **100+ tasks** |
