---
name: eds-migration-process
description: EDS site/page migration workflow and its two validation gates. Use when starting a migration, deciding what to import next, checking progress, or guiding the user through content/design validation.
---

Migrate page-by-page, content first then design, then scale to bulk. Stop at two validation gates and make the user confirm before continuing — never style content the user hasn't approved.

## Flow
1. **Pick a representative page** — prefer one that introduces new blocks.
2. **Phase 1 — Content.** Import via the import script; split into default content, blocks, sections.
3. **🚦 GATE 1 — validate content structure** (below) before any design work.
4. **Phase 2 — Design.** Import global styles (tokens, type, spacing) first, then per-block styling.
5. **🚦 GATE 2 — validate design** (below).
6. **Nav + footer** once the first page looks right.
7. **More pages** — repeat, reusing validated blocks; prefer pages with new blocks.
8. **Bulk import** once representative pages and all block variants are covered.

## 🚦 GATE 1 — content structure
Ask the user to roughly validate, and wait for confirmation:
- How content was split into **default content vs blocks vs sections**.
- **Block names** — any to rename?
- **Reuse/refactor** — use an existing set of blocks instead, or a different structure?

## 🚦 GATE 2 — design (after global styles, and after each block's styling)
Ask the user to compare against the source site in the Console preview:
- Is the global look (tokens, type, spacing) right?
- Does each styled block match — what needs further visual improvement?
Iterate on their feedback before moving on.

## Always
- Frame the next action as a suggestion: *"Next would be X — shall I go ahead?"*
- Actively invite feedback at each gate — the user's validation drives the next step.
- Consult `PROJECT-STATUS.md` to pick the next page or task.

## Pitfalls
- Don't skip GATE 1 — broken structure is far harder to fix after styling.
- Re-import flattens section boundaries — restore section divs by hand after.
- `run-bulk-import.js` overwrites `content/*.plain.html` — back up first (`project-import-script-bundling`).
- Footer blocks must be in one section (no `<hr>`) or EDS renders rules between them.

See also: `marker-driven-import` (design ONE generic parser once content is validated), `eds-content-modeling` (block vs variant vs section vs template decisions), `importer-parser-patterns` (writing parsers), `project-import-script-bundling` (running imports)
