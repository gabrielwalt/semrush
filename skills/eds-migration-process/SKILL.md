---
name: eds-migration-process
description: EDS page migration workflow. Use when starting a new page migration, deciding what to import next, or checking migration progress.
---

Work through each page in two phases — content first, then styles — before scaling to bulk import.

## Phase 1 — Content
1. Import page content using the import script
2. Verify block names and cell structure make sense to an author
3. Refine the import script and re-import until correct

## Phase 2 — Styles
1. Import styles — distinguish general styles (tokens, typography, spacing) from block-specific styles
2. Ask the user to compare against the source site in the Console preview

## After each page
Consult `PROJECT-STATUS.md` and suggest the logical next step:
- Nav/footer not yet imported → suggest those
- More pages remain → suggest the next one (prefer pages introducing new blocks)
- All representative pages done → suggest bulk import

Always frame as a suggestion: *"The next step would be X — shall I go ahead?"*

## Pitfalls
- Don't skip Phase 1 validation — broken content structure is harder to fix after styling
- Re-import flattens section boundaries — maintain section-div structure by hand after
- **`run-bulk-import.js` overwrites `content/*.plain.html` directly** — back up first. Full warning and restore command: `project-import-script-bundling`
- Footer blocks must be in a **single section** (no `<hr>` separators) — otherwise EDS renders horizontal rules between them

See also: `marker-driven-import` (once content is validated, design ONE generic marker-driven parser + diff against the reference), `eds-content-modeling` (content decisions), `importer-parser-patterns` (writing parsers), `project-import-script-bundling` (running imports)
