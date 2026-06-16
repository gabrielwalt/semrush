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

## Phase A — Extend the augmented-styles model (analysis)

### A01 — 🔲 Open — Build the project-wide marker map from the catalog

**Why:** We catalogued 26 page templates and 68 block variants (in `catalog/`), but only the homepage's blocks/variants/section-styles/template are mapped to reliable DOM markers. Before importing more pages we need the marker map for the next target.
**Action:**
- Pick the next target page (see A02) and, from its original DOM, identify the marker set for each block, variant, section style, and the page template — the smallest reliable DOM signal per element (tag/class/attribute/position). Follow `marker-driven-import` (the 6-level cascade).
- Record markers in `PROJECT-IMPORT.md` (extend the "marker map" table pattern established for the homepage).
- Flag which existing blocks/variants/section-styles the page reuses vs. what genuinely needs a new one (apply the `eds-content-modeling` reuse rules — new block only if structure differs or a variant needs >50% new code).
**Acceptance:** A marker table for the target page in `PROJECT-IMPORT.md`; a short reuse-vs-new list.

---

### A02 — 🔲 Open — Choose the next page to migrate

**Why:** Pick the page that adds the most coverage with the least new surface. Candidates from the catalog, in rough priority:
- **`/pricing/`** — pricing table/tiers; introduces a likely-new `pricing`/`cards` pattern. High value, distinct template.
- **A product/toolkit overview** (`/seo/`, `/features/`, `/advertising/`) — these share one template (`product-toolkit-overview`); migrating one unlocks the whole family. Reuses `teaser`, `carousel`, `cards`, `tabs`.
- **`/one/` (Semrush One)** — flagship product page; content was previously lost and needs re-import. Reuses `teaser`/`media`.
**Action:** Confirm the target with the user, then proceed to A01 for that page if not already done.
**Acceptance:** Target page agreed; its URL added to a `tools/importer/urls-<page>.txt`.

---

## Phase B — Migrate the next page (content first, then style)

### B01 — 🔲 Open — Model + author the next page's content structure

**Why:** Decide the content model before writing the parser. Apply the augmented-styles ladder; prefer default content and existing blocks; add new variants/section-styles/templates only when markers justify them, naming per the convention in `eds-content-modeling`.
**Action:** Draft the target `content/<page>.plain.html` structure (sections, blocks, variants, section styles, page-template metadata). Get user validation that this is the intended structure before building the parser.
**Acceptance:** User validates the content structure (record it in `PROJECT-IMPORT.md` → Validated reference pages).

---

### B02 — 🔲 Open — Build/extend the marker-driven parser for the page

**Why:** Reproduce the validated structure generically. Reuse the single import script + parser registry pattern (`import-homepage.js`); add parsers/branches only for genuinely new blocks. Aim for ~90% via generic markers, context-exceptions only for the last mile.
**Action:** Add the page's blocks to the registry with their markers (from A01); write/extend parsers; emit the page-template metadata (cascade level 1). Run the temp-diff validation loop until the block/variant/section/template sequence matches the validated content exactly.
**Acceptance:** Validation loop shows identical sequence; reference never overwritten.

---

### B03 — 🔲 Open — Style the page to match the original

**Why:** Content correct ≠ pixel-correct. Reuse existing block CSS/variants; add new variant/section-style CSS only as modeled in B01.
**Action:** Reload the preview (`/content/<page>`), compare against the original site, iterate. Use `measure-then-implement` for exact values; `block-visual-iteration` for the compare loop. Keep decorative bg assets in `/icons/` (code), not `content/images/`.
**Acceptance:** Page renders identically to the original at desktop + mobile; no regressions on already-migrated pages.

---

## Phase C — Scale

### C01 — 🔲 Open — Bulk-import a template family

**Why:** Once one page of a template (e.g. a product/toolkit overview) reproduces exactly, the same parser should handle its siblings.
**Action:** Add the family's URLs, run the import to a temp location, diff a sample against expectations, and only then promote. Never overwrite validated references.
**Acceptance:** Multiple pages of one template import correctly with the same parser.

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
| **Total** | | **100+ tasks** |
