---
name: eds-migration-process
description: EDS site/page migration workflow and its two validation gates. Use when starting a migration, deciding what to import next, checking progress, or guiding the user through content/design validation.
---

Migrate page-by-page, content first then design, then scale to bulk. Stop at two validation gates and make the user confirm before continuing — never style content the user hasn't approved.

## Flow
0. **Scope the site** (new site, before page work) — discover URLs and group pages into templates so you know the full scope and which pages are representative. See EMA skills below.
1. **Pick a representative page** — prefer one that introduces new blocks.
2. **Phase 1 — Content** (two ordered steps — see below).
3. **🚦 GATE 1 — validate content structure** (below) before any design work.
4. **Phase 2 — Design** (two ordered steps — see below).
5. **🚦 GATE 2 — validate design** (below).
6. **Nav + footer** once the first page looks right.
7. **More pages** — repeat, reusing validated blocks; prefer pages with new blocks.
8. **Bulk import** once representative pages and all block variants are covered.

## Phase 1 — Content (model first, script second)
The order matters — **do NOT start by running the import script.**
1. **Model the content (decisions, not the script).** Study the source page and make smart decisions about how to split it into **default content vs blocks vs sections** — which content stays default, what becomes a block, where sections break, and what each block is named. Climb the augmented-styles ladder from the bottom (`eds-content-modeling`). This produces the validated `.plain.html` reference.
2. **Generate the import script to reproduce that validated structure.** Only after the split is decided, build ONE generic marker-driven parser that reproduces the validated `.plain.html` exactly (`marker-driven-import`). The script is generated *from* the modeling decisions, not the other way around.
- **The import script is the source of truth thereafter.** Each time the user asks to modify the content (rename a block, re-split a section, add a variant), update the import script accordingly — edits to `.plain.html` are temporary; the script is authoritative.

## Phase 2 — Design (global baseline first, blocks second)
1. **Import global design — only if this is the first page or a new page template.** Bring in the brand tokens, type scale, and the vertical-spacing system to create a solid baseline of **default styles authors can use with default content** (titles, text, images, lists, links, spacing). Skip this step on later pages that reuse an already-styled template. See `vertical-spacing-system`, `eds-content-patterns`.
2. **Import per-block styling.** Only after the global baseline looks right, style the individual blocks — and at each block decide whether the look is the bare block, an existing variant, a new variant, a section style, or a one-off, per the `eds-content-modeling` ladder.

## 🚦 GATE 1 — content structure
Ask the user to roughly validate, and wait for confirmation:
- How content was split into **default content vs blocks vs sections**.
- **Block names** — any to rename?
- **Reuse/refactor** — use an existing set of blocks instead, or a different structure?

## 🚦 GATE 2 — design (after global styles, and after each block's styling)
Ask the user to compare against the source site in the Console preview:
- Is the global look (tokens, type, spacing) right?
- Does each styled block match — what needs further visual improvement?
Use `excat-visual-critique` to compare migrated output against the original (block, section, full-page, or full-site) and surface the deltas, then close each one with the `block-visual-iteration` measure-first loop. Iterate on the user's feedback before moving on.

## EMA skills by stage
Reach for these native EMA skills — suggest them to the user when they fit. **Where a project skill covers the same step (content modeling, parser strategy, visual QA), the project skill takes precedence** — see `skills/README.md` "Native EMA & EDS skills" for the full precedence map.
- **Scope the site (do this first for a new site):** `excat-site-scope` for a full scope report; `excat-site-catalog` to group pages into templates / page types; `excat-url-discovery` to list all URLs from the sitemap.
- **Migrate content:** `excat-site-migration` orchestrates the migration; `excat-page-analysis` analyzes one page's structure; `excat-import-infrastructure` / `excat-import-script` build parsers + transformers; `excat-content-import` runs the import for one or many pages.
- **Migrate design:** `excat-complete-design-expert` for site design tokens and block styling.
- **Validate / critique:** `excat-visual-critique` (see GATE 2).
- **Nav + footer:** `excat-navigation-orchestrator` (header/nav), `excat-footer-orchestrator` (footer) — require screenshots, run after the page is migrated.
- **Forms:** `excat-form-migration` for HTML → EDS Form blocks.
- **UI help:** `excat-ui-tour` when the user asks how to use the Console UI.

## Always
- Frame the next action as a suggestion: *"Next would be X — shall I go ahead?"*
- Actively invite feedback at each gate — the user's validation drives the next step.
- Consult `PROJECT-STATUS.md` to pick the next page or task.

## Pitfalls
- Don't lead Phase 1 with the import script — model the default-content/block/section split first, generate the script to reproduce it second.
- Don't style blocks before the global design baseline exists (first page / new template) — the baseline is what default content relies on.
- Don't let `.plain.html` drift from the script — every content-structure change the user asks for must go back into the import script.
- Don't skip GATE 1 — broken structure is far harder to fix after styling.
- Re-import flattens section boundaries — restore section divs by hand after.
- `run-bulk-import.js` overwrites `content/*.plain.html` — back up first (`project-import-script-bundling`).
- Footer blocks must be in one section (no `<hr>`) or EDS renders rules between them.

See also: `marker-driven-import` (design ONE generic parser once content is validated), `eds-content-modeling` (block vs variant vs section vs template decisions), `importer-parser-patterns` (writing parsers), `project-import-script-bundling` (running imports)
