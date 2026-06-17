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

## Scope reset — pared back to 5 validated/keeper pages (2026-06-17)

On user direction, the project was reset to a clean core: only **index** (validated), **one**, **enterprise/index**, plus the **nav** and **footer** fragments are kept. The other 11 imported pages (seo, content, pricing, local-business, social-media, pr-toolkit, company, advertising, ai-seo, analytics/traffic, features) were **deleted** — they were far from the originals and not worth polishing. They'll be re-created later from a stronger foundation.

Removed along with them: the `accordion` + `testimonials-carousel` blocks (used only by deleted pages), the two toolkit parsers (`import-toolkit.js`/`import-toolkit2.js`) + their urls lists, the orphaned `seo-*.svg` files, and the `template-toolkit` CSS. The 5 keepers render byte-identical after the cleanup.

Obsolete tasks removed in this reset: A01 (per-page visual compare of the batch), A02–A03 (toolkit-parser fixes, were done but the parsers are gone), A04–A09 (toolkit content-recovery), B01 (app-shell SPA pages). Re-create as needed when those pages are rebuilt.

## Phase A — Re-create pages from the foundation (when ready)

No open page tasks right now. When re-creating a page, follow `eds-migration-process` (orient → foundation → content → gates) and reuse the keepers' blocks/variants/section-styles first (`styling-additively`). Re-introduce a toolkit parser only when a new page needs it.

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
