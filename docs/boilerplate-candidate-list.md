# AEM Boilerplate Fork — Candidate List

Tracks which files from the Semrush project should be carried into a future fork of `adobe/aem-boilerplate` as the starting point for any EDS migration. The Semrush project is the proving ground; this list is the harvest.

## Audience conventions

- **Skills** (`skills/`) — agent-facing only. Written for the AI; humans can read them but they are not required to.
- **`PROJECT-*.md` files** — dual audience. The agent is the **primary consumer** (tools like `detect.mjs` parse them, the agent reads them every session), but they must also be readable and useful to humans on the team.
- **`AGENTS.md`** — agent-only identity and rules file.

## Template design principle

`PROJECT-*.md` template stubs should ship with:
1. Section headings pre-filled (machine-parseable anchors for tools and skills)
2. An italicized instruction block under each heading explaining what the agent should write there — e.g. `*[Agent: record the Migration Strategy here after running migration-orientation.]*`
3. Human-readable prose context where the purpose of the section isn't obvious

`AGENTS.md` should include a brief section listing all `PROJECT-*.md` files, what each contains, and when the agent is expected to create/update it — so an agent landing on a fresh boilerplate knows exactly how to initialize the project.

**Status legend:**
- ✅ **Keep** — generalizable, ships as-is or with minor de-Semrush edits
- ✏️ **Keep (needs work)** — generalizable in principle but needs Semrush content removed or structure generalized
- 📄 **Keep as template with agent instructions** — ships as a stub with section headings + italicized agent fill-in instructions; load-bearing format for tools/skills
- ❌ **Exclude** — Semrush-specific or already in aem-boilerplate
- 🔬 **Review** — unclear; needs a decision before the fork

---

## Root files

| File | Decision | Notes |
|------|----------|-------|
| `AGENTS.md` | ✏️ Keep (needs work) | Core EMA identity and rules. Strip Semrush-specific Named Rules. Keep: governing principles, session rules, skill-capture discipline, code-is-truth, no-git rule. **Add: a `## Project Files` section** listing every `PROJECT-*.md` file, its purpose, and when the agent should create/update it — so a fresh boilerplate agent knows how to initialize the project. |
| `CLAUDE.md` | ✏️ Keep (needs work) | Has `aem up` commands, lint scripts. Update for boilerplate context (remove Semrush-specific paths). |
| `PROJECT.md` | 📄 Template | Basic project identity: site URL, target EDS repo, authoring model, team contacts. Agent fills after `migration-orientation`. |
| `PROJECT-DESIGN.md` | 📄 Template | **Critical** — quality tools (`detect.mjs`) load their palette and token allow-list from this file. Sections: `## Migration Strategy`, `## Design Tokens`, `## Typography`, `## Color`, `## Spacing`, `## Breakpoints`, `## Block Inventory`. Agent fills progressively: strategy after orientation, tokens after global-style-foundation. |
| `PROJECT-STATUS.md` | 📄 Template | **Critical** — `project-state.mjs` reads the `## Pages` table from this file. Pre-fill the table column headers exactly (`\| Page \| File \| Content ✓ \| Style ✓ \|`) so the parser works on day one. Agent updates per page as gates are validated. |
| `PROJECT-PLAN.md` | 📄 Template | Task tracking table. Agent creates/updates when the user reports gaps or enhancement requests. |
| `PROJECT-BLOCKS.md` | 📄 Template | Block inventory + one-off registry. Agent updates each time a new block, variant, or section style is validated. |
| `PROJECT-IMPORT.md` | 📄 Template | Import strategy: URL sets, parser strategy, template-to-parser mapping. Agent fills after site scope + template consolidation. |
| `PROJECT-TEMPLATES.md` | 📄 Template | Page template inventory. Agent fills during site catalog phase. |
| `CODE_OF_CONDUCT.md` | ❌ Exclude | aem-boilerplate has its own. |
| `CONTRIBUTING.md` | ❌ Exclude | aem-boilerplate has its own. |
| `LICENSE` | ❌ Exclude | aem-boilerplate has its own. |
| `README.md` | ❌ Exclude | aem-boilerplate has its own; we'll need a new one for the fork. |
| `favicon.ico` | ❌ Exclude | aem-boilerplate has its own. |
| `404.html` | ❌ Exclude | aem-boilerplate has its own. |
| `head.html` | ❌ Exclude | aem-boilerplate has its own. |
| `package.json` | ✏️ Keep (needs work) | Keep as aem-boilerplate base but ADD: `playwright`, `jsdom`, `exceljs` dependencies (needed by the importer runner). The quality tools have no deps beyond Node built-ins. |

---

## `tools/quality/` — the deterministic checkers

**Decision: ✅ Keep all three.** The rules are fully project-agnostic — the allow-list (palette, breakpoints, token scale) is loaded live from `PROJECT-DESIGN.md` and `styles/*.css :root` blocks at runtime. No Semrush values are hardcoded. These scripts work for any EDS project that initializes `PROJECT-DESIGN.md` with its actual tokens.

**Dependency:** `detect.mjs` needs `PROJECT-DESIGN.md` to exist and have at minimum a `## Design Tokens` section and some `:root` CSS. Running it on an empty project emits a no-findings result, which is safe. Document this in a setup skill.

| File | Decision | Notes |
|------|----------|-------|
| `tools/quality/detect.mjs` | ✅ Keep | Generalizable. CLI for running craft-floor checks. |
| `tools/quality/project-state.mjs` | ✅ Keep | Generalizable. Reads PROJECT-STATUS.md Pages table format — ship the template stub. |
| `tools/quality/rules.mjs` | ✅ Keep | Generalizable. All rules load allow-list from project files, nothing hardcoded. |

---

## `tools/importer/`

The runner and static importer are generalizable infrastructure. The import scripts and parsers are Semrush-specific content.

| File / Dir | Decision | Notes |
|------------|----------|-------|
| `tools/importer/run-bulk-import.js` | ✅ Keep | Generalizable runner — takes `--import-script` and `--urls` as args. No Semrush content. |
| `tools/importer/static/import.js` | ✅ Keep | The actual helix importer bundle used by the runner. |
| `tools/importer/import-processors/` | 🔬 Review | Shared processing utilities. Check if they have Semrush-specific assumptions. |
| `tools/importer/import-*.js` | ❌ Exclude | Semrush-specific import scripts (homepage, nav, feature, etc.). |
| `tools/importer/import-*.bundle.js` | ❌ Exclude | Semrush-specific bundles. |
| `tools/importer/parsers/helpers.js` | 🔬 Review | May contain generic helper utilities worth keeping. |
| `tools/importer/parsers/*.js` (others) | ❌ Exclude | Semrush-specific block parsers. |
| `tools/importer/transformers/cleanup.js` | 🔬 Review | Generic cleanup transformer; likely keepable as a base. |
| `tools/importer/page-templates.json` | ❌ Exclude | Semrush-specific template registry. |
| `tools/importer/urls-*.txt` | ❌ Exclude | Semrush-specific URL lists. |
| `tools/importer/reports/` | ❌ Exclude | Semrush-specific import reports. |

---

## `skills/`

### Always keep (fully general, no project-specific content)

| Skill | Category |
|-------|----------|
| `session-startup` | Lifecycle |
| `session-close` | Lifecycle |
| `verify-before-claiming` | Quality |
| `writing-plan-tasks` | Planning |
| `executing-plan-tasks` | Planning |
| `regression-guard` | Quality |
| `quality-tooling` | Quality |
| `styling-additively` | Quality |
| `block-visual-iteration` | Quality |
| `debug-block-decoration` | Debugging |
| `css-specificity-eds` | CSS |
| `eds-dom-structure` | CSS |
| `vertical-spacing-system` | CSS |
| `full-width-escape-hatch` | CSS |
| `css-pitfalls-eds` | CSS |
| `eds-code-conventions` | CSS |
| `responsive-adaptation` | CSS |
| `interaction-states-eds` | CSS |
| `typography-craft` | Design |
| `color-craft` | Design |
| `layout-craft` | Design |
| `motion-craft` | Design |
| `scroll-reveal-animations` | Design |
| `craft-floor` | Design |
| `nav-header-eds` | Blocks |
| `eds-content-patterns` | Content |
| `container-block-vs-section-style` | Content |
| `context-adaptive-blocks` | Content |
| `page-template-metadata` | Content |
| `eds-section-style-icons` | Content |
| `carousel-pattern-eds` | Blocks |
| `video-in-eds` | Blocks |
| `repo-hosted-svg-references` | Blocks |
| `measure-then-implement` | Blocks |
| `migration-orientation` | Migration |
| `import-content-scoping` | Migration |
| `import-template-consolidation` | Migration |
| `global-style-foundation` | Migration |
| `marker-driven-import` | Migration |
| `importer-parser-patterns` | Migration |
| `eds-migration-process` | Migration |
| `block-rename-checklist` | Maintenance |
| `writing-skills` | Meta |

### Keep with edits (needs Semrush-specific content removed)

| Skill | What to change |
|-------|---------------|
| `eds-content-modeling` | References to Semrush-specific template names or token values in examples; check and genericize. |
| `project-cleanup` | Strip references to Semrush-specific file paths and block names. Generalize the cleanup pass structure. |
| `project-import-script-bundling` | Strip Semrush-specific script names (`aem-import-bundle.sh`, `run-bulk-import.js` paths). Extract the generic "back up before bulk import" discipline into `marker-driven-import` or a new short skill. Then exclude this skill. |

### Exclude (Semrush-specific, belong only in this project)

| Skill | Why excluded |
|-------|-------------|
| `project-background-layering` | Semrush gradient system and `body.homepage main` pattern. |
| `project-clip-path-bar-charts` | Semrush AI Visibility Index feature. |
| `project-footer-reveal-pattern` | Semrush footer interaction. (Extract the `overflow-x: clip` vs `overflow: hidden` insight into `css-pitfalls-eds` before excluding.) |
| `project-glass-surface-pattern` | Semrush visual identity. |
| `project-mega-menu-content-model` | Semrush nav content structure. |
| `project-section-heading-pattern` | Semrush eyebrow+uppercase heading pattern. |

### Skills still to write (missing from the current library — needed before the boilerplate ships)

| Skill | Why needed |
|-------|-----------|
| `project-setup` | New project start: initialize PROJECT-*.md templates, install quality tools, set up stylelint, verify `aem up` works. Without this, agents on a fresh boilerplate hit broken `detect.mjs` calls on day one. |
| `unfreeze-page` | Protocol for unfreezing a style-validated page when the client requests a revision: identify all pages sharing its tools, run critique on each, get explicit re-validation before re-freezing. |
| `importer-diff-workflow` | How to compare a newly generated `.plain.html` against its reference (the bash tooling — `curl` + `diff` or `wdiff`). Closes the loop in `marker-driven-import`. |
| `source-change-handling` | What to do when the source site changes mid-migration: triage which pages/blocks are affected, decide re-import vs manual update, preserve curated content. |

---

## `docs/`

| Path | Decision | Notes |
|------|----------|-------|
| `docs/skills-assessment/` | ❌ Exclude | Semrush-specific assessment. Valuable for internal reference, not for the boilerplate. |
| `docs/boilerplate-candidate-list.md` (this file) | ❌ Exclude | Process document, not a migration resource. |

---

## `blocks/`, `content/`, `icons/`, `scripts/`, `styles/`, `svg/`

All ❌ Exclude — these are Semrush's actual site implementation. The boilerplate ships with aem-boilerplate's own stubs for `blocks/`, `scripts/`, `styles/`. Icons, content, and SVGs are project-specific assets.

Exception: `styles/` structure is worth studying for the boilerplate's starter CSS (token variable names, the `* + *` spacing system, the full-width class mechanism) — but the values are Semrush's brand, not something to ship.

---

## `skills/README.md` and `skills/_template.md`

| File | Decision | Notes |
|------|----------|-------|
| `skills/README.md` | ✏️ Keep (needs work) | Remove `project-*` skill rows. Remove the Semrush-specific "Native EMA & EDS skills" precedence mappings that reference excluded project skills. Keep the structure, Always-load section, and skill discovery instructions. |
| `skills/_template.md` | ✅ Keep | Generic skill template. |
| `skills/craft-skills-field-notes.md` | 🔬 Review | Check if this is a project journal or generalizable craft notes. |

---

## Sub-agent skill access

Skills in `skills/` are **not automatically available to sub-agents** (e.g., `excat-site-migration`'s parallel per-template agents). Sub-agents start fresh with no inherited context. They can read skill files from the filesystem, but only if the parent orchestrator explicitly passes the path or content in the sub-agent prompt — or if the sub-agent's own `.md` frontmatter preloads them.

**Practical implication:** The boilerplate skills benefit the main agent session fully. Sub-agents will benefit only to the extent that EMA's orchestrator skills (in `resources/plugins/aem-excat-plugin/`) are updated to reference the relevant boilerplate skills. That's an EMA product-level change, not something in the boilerplate itself. Document this boundary clearly in `AGENTS.md` so a future agent isn't surprised.

---

## Key dependencies between decisions

```
PROJECT-DESIGN.md (template) ──► detect.mjs works correctly
PROJECT-STATUS.md (template) ──► project-state.mjs works correctly
AGENTS.md ## Project Files section ─► agent knows initialization sequence on day one
project-setup skill (new) ────────► skill that walks the agent through initialization
unfreeze-page skill (new) ────────► frozen-tools discipline is complete (currently one-way)
```

The boilerplate is not shippable without the template stubs for `PROJECT-DESIGN.md` + `PROJECT-STATUS.md`, the updated `AGENTS.md`, and the `project-setup` skill. Everything else is additive.
