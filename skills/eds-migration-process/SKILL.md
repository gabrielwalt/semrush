---
name: eds-migration-process
description: EDS site/page migration workflow and its two validation gates. Use when starting a migration, deciding what to import next, checking progress, or guiding the user through content/design validation.
---

Orient first, level the workbench, then migrate page-by-page (content before design), then scale to bulk. Stop at two validation gates and make the user confirm before continuing — never style content the user hasn't approved.

**A migration never starts by importing a page.** Two things come first, in order: the **orientation** (decide scope, sources, fidelity — `migration-orientation`, **The Brand-Foundation-First Rule**) and the **global design foundation** (the *workbench* every block sits on — `global-style-foundation`, **The Workbench-Before-Tools Rule**). Only then does page-by-page work begin.

## Track two validation flags per page
Every page carries **content validated** and **style validated** flags (maintain a table in `PROJECT-STATUS.md`). They gate differently:
- **Content validated** (GATE 1 passed) = the default-content/block/section split and block names are approved.
- **Style validated** (GATE 2 passed) = the page's *look* is approved against the original.
Once a page's **style** is validated, every block/variant/section-style/template it uses is **frozen** — styling later pages must be **additive** so these don't move. This is the core discipline of `styling-additively` — load it before designing any page after the first.

## Flow
0. **Orient the migration** (new site, before anything) — run `migration-orientation`: settle scope, content source, design source, **fidelity** (Faithful / Refined / Reimagined), reuse strategy, per-page overrides, and constraints. Record them in `PROJECT-DESIGN.md`'s `## Migration Strategy`. **Gate: no import until this exists.**
1. **Scope the site** — discover URLs and group pages into templates so you know the full scope and which pages are representative. See EMA skills below.
2. **Build the global design foundation** (the *workbench*, once per site) — run `global-style-foundation`: capture the visual gist across ≥3 representative pages and formalize brand tokens, type scale, spacing system, and default-content styling, at the recorded fidelity. **Blocks are not styled until the workbench is level.**
3. **Pick a representative page** — prefer one that introduces new blocks.
4. **Phase 1 — Content** (two ordered steps — see below).
5. **🚦 GATE 1 — validate content structure** (below) before any design work.
6. **Phase 2 — Design** (two ordered steps — see below).
7. **🚦 GATE 2 — validate design** (below).
8. **Nav + footer** once the first page looks right.
9. **More pages** — repeat. Style each new page **reuse-first then additive** (Phase 2 step 2): reproduce the look with existing blocks/variants/section-styles before adding anything new, and keep additions scoped to the new page so style-validated pages stay frozen. Prefer pages that introduce new blocks. If in doubt that a change was purely additive, re-check the style-validated pages sharing a touched block (`styling-additively`).
10. **Bulk import** once representative pages and all block variants are covered.

## Phase 1 — Content (model first, script second)
The order matters — **do NOT start by running the import script.**
1. **Model the content (decisions, not the script).** Study the source page and make smart decisions about how to split it into **default content vs blocks vs sections** — which content stays default, what becomes a block, where sections break, and what each block is named. Climb the augmented-styles ladder from the bottom (`eds-content-modeling`). This produces the validated `.plain.html` reference.
2. **Generate the import script to reproduce that validated structure.** Only after the split is decided, build ONE generic marker-driven parser that reproduces the validated `.plain.html` exactly (`marker-driven-import`). The script is generated *from* the modeling decisions, not the other way around.
- **The import script is the source of truth thereafter.** Each time the user asks to modify the content (rename a block, re-split a section, add a variant), update the import script accordingly — edits to `.plain.html` are temporary; the script is authoritative.

## Phase 2 — Design (workbench first, tools second)
The **workbench** — the global foundation — is built once in Flow step 2 (`global-style-foundation`), before any page's blocks. Phase 2 assumes it exists; here you confirm it holds for this page, then style the page's blocks at the recorded fidelity.
1. **Confirm the workbench covers this page.** The brand tokens, type scale, and vertical-spacing system should already render default content (titles, text, images, lists, links) on-brand. If this page reveals a *genuinely global* gap the foundation missed, extend the foundation (not a block) and re-verify the existing pages didn't move (`regression-guard`). Otherwise, leave it untouched. See `vertical-spacing-system`, `eds-content-patterns`.
2. **Per-block styling — two ordered sub-steps (`styling-additively`), at the page's fidelity.** Read the page's fidelity from `PROJECT-DESIGN.md` (first-match-wins: per-page override → site default). **Faithful** = match the original block closely (measure, don't guess). **Refined** = reproduce its intent, then strengthen it toward the foundation. **Reimagined** = keep the concept, rebuild for excellence. Then:
   - **2a. Reproduce the look with what already exists, first.** Before writing any CSS, take stock of every block, variant, section style, and combination you already have, and try to reproduce the original look by *only* choosing among them (rename a block, switch to an existing variant, add a section style, combine them). Re-author/re-import with those choices.
   - **2b. Add only what the existing blocks/variants/section-styles can't express.** Whatever's genuinely missing becomes a *new* item — a new block, variant, section style, or (conservatively) a page template — per the `eds-content-modeling` ladder. New items are seen only by the new page, so style-validated pages can't move.
   - **Editing existing shared CSS is the exception.** A lean **additive** rule on a base block is fine when the block just receives a *content shape* it hasn't handled (e.g. teaser image-only, or title+video) — that's not a new variant. If you must change an *existing* declaration, measure the style-validated instances before/after (`regression-guard`).

## 🚦 GATE 1 — content structure
Ask the user to roughly validate, and wait for confirmation:
- How content was split into **default content vs blocks vs sections**.
- **Block names** — any to rename?
- **Reuse/refactor** — use an existing set of blocks instead, or a different structure? Take a step back here even for a content-validated page: can the original look be reached with just basic changes to existing block names/variants/section-styles, before inventing anything new? (`styling-additively`)

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
- Don't start with a page import — orient first (`migration-orientation`) and build the workbench (`global-style-foundation`). A migration that opens with "import the homepage" skipped its foundation (**Brand-Foundation-First**).
- Don't lead Phase 1 with the import script — model the default-content/block/section split first, generate the script to reproduce it second.
- Don't style blocks before the global foundation exists — the workbench is what default content relies on (**Workbench-Before-Tools**).
- Don't ignore the recorded fidelity — a Refined page styled Faithfully (or vice versa) misses the agreed strategy. Read it from `PROJECT-DESIGN.md` before styling.
- Don't let `.plain.html` drift from the script — every content-structure change the user asks for must go back into the import script.
- Don't skip GATE 1 — broken structure is far harder to fix after styling.
- Don't edit a shared block/variant/section-style to fix a new page — it silently breaks every style-validated page that uses it. Add new styles instead (`styling-additively`).
- Don't mint a new variant for what's only a different *content shape* — extend the base block's CSS additively.
- Re-import flattens section boundaries — restore section divs by hand after.
- `run-bulk-import.js` overwrites `content/*.plain.html` — back up first (`project-import-script-bundling`).
- Footer blocks must be in one section (no `<hr>`) or EDS renders rules between them.

See also: `migration-orientation` (step 0 — scope, sources, fidelity, recorded before any import), `global-style-foundation` (step 2 — the workbench, built once before blocks), `styling-additively` (reuse-first, additive styling that protects style-validated pages), `marker-driven-import` (design ONE generic parser once content is validated), `eds-content-modeling` (block vs variant vs section vs template decisions), `importer-parser-patterns` (writing parsers), `project-import-script-bundling` (running imports)
