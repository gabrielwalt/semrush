# Semrush → AEM Edge Delivery Services

Migration of pages from [semrush.com](https://www.semrush.com/) to AEM Edge Delivery Services (Document Authoring via [da.live](https://da.live)). Vanilla JS + CSS, no build step, no framework.

But this repo is more than a migrated site. It is a **self-learning migration agent** — an agent that treats its own competence as editable state.

## The self-learning setup

The agent (**Ema**, the Experience Modernization Agent) carries a persistent identity and purpose: **faithful brand migration**, with **simplicity as the governing principle**. It doesn't start cold each session — it reads its own context at startup, guides rather than takes orders, and pauses to confirm the architecture before touching anything already validated. When a hard-won insight emerges, it distills that insight into a new reusable skill, cross-references the neighboring skills, and updates the living docs. The result is a purpose-driven, context-aware agent that turns both its own discoveries and your feedback into permanent, interconnected skills — and never solves the same problem twice.

This behavior is encoded, not hoped-for. Three layers make it real:

1. **A constitution** (`AGENTS.md`) — the agent's identity, governing principle, non-negotiable rules, and a registry of **Named Rules** it can cite by name while reasoning ("per the Toolbox-First Rule…").
2. **A skill library** (`skills/`, 52 skills) — each a self-contained recipe with trigger phrases, cross-linked into loading chains, indexed in `skills/README.md`. Skills are loaded on demand when their trigger matches, not all at once.
3. **Deterministic tooling** (`tools/quality/`) — scripts that *enforce* the checkable rules and read project state as structured facts, so the agent acts on ground truth rather than memory.

Skills capture *how to build or fix*; the `PROJECT-*.md` docs capture *what currently exists*; the code is the truth for implementation. Each layer has one job.

---

## Capabilities added on top of out-of-the-box EMA

OOTB EMA ships generic migration, analysis, and block-development skills (the `excat:` / `edge-delivery-services:` plugins). This project layers the following on top — its own opinions, enforcement, and hard-won lessons. Where a project skill covers the same ground as a native one, **the project skill wins**.

### Agent operating model (the self-learning loop)
| Capability | What it adds |
|---|---|
| **Constitution + Named Rules** (`AGENTS.md`) | Persistent identity, governing principle, and citable load-bearing rules (Workbench-Before-Tools, Brand-Foundation-First, Toolbox-First, Frozen-Tools, Bookend-Verification, Anti-Pattern-Capture, Executable-Rule, Heavy-SVG-In-Code). |
| **Session bookends** (`session-startup`, `session-close`) | Reads `PROJECT-STATUS`/`PROJECT-PLAN` and matching skills at startup; marks tasks done, updates docs, and captures new skills before signing off. |
| **Skill authoring** (`writing-skills`) | The meta-skill: how to write operational, executable skills; how to capture anti-patterns from your corrections match-and-refuse; the rule that every checkable rule gets a stable ID. |
| **Verify before claiming** (`verify-before-claiming`) | Bookend-verification protocol — restate the request as checkable criteria up front, prove each is met before saying "done". |
| **Plan discipline** (`writing-plan-tasks`, `executing-plan-tasks`) | Gap-vs-Enhancement task classification, verifiable acceptance criteria, confirm-the-problem-before-coding. |

### Deterministic quality enforcement (rules as scripts, not memory)
| Capability | What it adds |
|---|---|
| **Craft linter** (`tools/quality/detect.mjs` + `rules.mjs`, `quality-tooling`) | A dependency-free CSS/HTML checker keyed to `craft-floor` rule IDs. Allow-list (palette, scales, tokens) loaded **live** from the committed tokens. Flags off-palette color, raw inverse `#fff`, side-stripe accents, duplicate/dead tokens, raw radii, **near-match & exact token literals**, stray breakpoints, unguarded motion, placeholder cruft. |
| **Project-state probe** (`tools/quality/project-state.mjs`) | Emits structured JSON — frozen pages, per-page gate, changed files (read-only git), scan targets — so routing decisions are made on facts. |
| **Regression & frozen-page guards** (`regression-guard`, `styling-additively`) | The Frozen-Tools Rule made operational: style additively, never move a validated page's look; check the ripple on every shared-block consumer. |
| **Systematic tokenization** (in `craft-floor` + the checkers) | Five directives — snap exact, snap near-match (≤6%, category-bound), cover-the-gap for every value type, responsive-aware tokens, one-offs stay commented — plus a lean counterweight against over-tokenizing and dead tokens. |
| **Safe cleanup** (`project-cleanup`) | Multi-pass dead-code/asset removal that never disturbs a style-validated page. |

### Design craft — rebuild an elegant brand, not just copy pixels (ported from impeccable.style)
| Capability | What it adds |
|---|---|
| **The craft floor** (`craft-floor`) | The anti-slop minimum bar: concrete, ID'd, checkable typography/color/spacing/state/motion thresholds; the Identity-Preservation rule (never "correct" a faithfully-reproduced brand decision). |
| **Foundation workbench** (`global-style-foundation`) | Capture the visual gist across ≥3 pages and formalize brand tokens, type scale, spacing, and default-content styling *before* any block is styled. |
| **The four craft dimensions** (`typography-craft`, `color-craft`, `layout-craft`, `motion-craft`) | The *positive method* for each foundation dimension — scale ratios & weight roles; 60-30-10 & OKLCH ramps; squint-test hierarchy & rhythm; purposeful motion with the fade-rise AI-tell refused. |
| **Interaction completeness** (`interaction-states-eds`) | The 8 interactive states (not hover-only), `:focus-visible` over bare `outline:none`, placeholder-isn't-a-label, and the dropdown overflow-clipping fix. |
| **Responsiveness** (`responsive-adaptation`) | Adapt for device *and input method* (pointer/hover), content-driven breakpoints, author-content overflow guards — not just scaling pixels. |
| **Measure, don't guess** (`measure-then-implement`) | Programmatically measure the source's values/hover states/responsive behavior before writing any px. |
| **Visual iteration** (`block-visual-iteration`) | Systematic original-vs-local comparison loop to drive a block toward fidelity. |

### Migration process & content modeling
| Capability | What it adds |
|---|---|
| **Two-gate migration flow** (`eds-migration-process`, `migration-orientation`) | A mandatory orientation conversation (scope, source, fidelity, reuse) and a content→design validation flow with explicit gates. |
| **Single marker-driven parser** (`marker-driven-import`, `importer-parser-patterns`, `project-import-script-bundling`) | One generic parser that reproduces validated content exactly; the import script is the authoritative source→EDS mapping. |
| **Augmented-styles ladder** (`eds-content-modeling`, `eds-content-patterns`, `container-block-vs-section-style`, `context-adaptive-blocks`, `page-template-metadata`, `eds-section-style-icons`) | The decision framework for block vs variant vs section-style vs template; auto-styles; context-adaptive (surface-aware) blocks instead of redundant dark variants. |

### EDS layout, CSS & block patterns
| Capability | What it adds |
|---|---|
| **Spacing & layout systems** (`vertical-spacing-system`, `full-width-escape-hatch`, `eds-dom-structure`) | Section-padding + `* + *` block rhythm, the max-width container + full-width escape hatch (no `!important`), the wrapper/container/block DOM map. |
| **CSS gotcha skills** (`css-specificity-eds`, `stylelint-no-descending-specificity`, `css-background-shorthand-reset`, `eds-code-conventions`) | EDS-specific specificity traps, the clean-and-lean / no-`!important` conventions, plus an EDS-performance guardrail note. |
| **Block & media patterns** (`carousel-pattern-eds`, `video-in-eds`, `repo-hosted-svg-references`, `nav-header-eds`, `debug-block-decoration`, `block-rename-checklist`) | Edge-bleed carousels, EDS video URL handling, repo-hosted heavy SVGs (avoids the 409 validation error), nav/mega-menu patterns, decoration debugging, and the 12-location block-rename checklist. |

### Project-specific patterns (Semrush only — `project-` prefixed)
`project-background-layering` · `project-clip-path-bar-charts` (AI Visibility Index) · `project-footer-reveal-pattern` · `project-glass-surface-pattern` · `project-mega-menu-content-model` · `project-section-heading-pattern`

---

## Repository map

| Path | Purpose |
|------|---------|
| `AGENTS.md` / `CLAUDE.md` | The agent's constitution — identity, rules, Named Rules |
| `skills/` | The 52-skill library (`skills/README.md` is the index) |
| `skills/craft-skills-field-notes.md` | Field notes from exercising the craft skills on real EDS pages |
| `tools/quality/` | `detect.mjs` (craft linter), `project-state.mjs` (state probe), `rules.mjs` (rule registry) |
| `PROJECT.md` | URLs, environments, publishing flow |
| `PROJECT-DESIGN.md` | Design tokens, scales, breakpoints, Named Foundation Rules |
| `PROJECT-BLOCKS.md` | Block inventory |
| `PROJECT-IMPORT.md` | Import script reference |
| `PROJECT-PLAN.md` | Executable task plan |
| `PROJECT-STATUS.md` | Migration progress / session bookmark |
| `blocks/` · `styles/` · `content/` | EDS blocks, global styles, `.plain.html` content |

---

## Environments

- Preview: https://main--semrush--gabrielwalt.aem.page/
- Live: https://main--semrush--gabrielwalt.aem.live/

## Local development

```sh
npm i                 # install
npm run lint          # lint JS + CSS
aem up                # start AEM proxy at http://localhost:3000
```

Quality checks (run after any CSS/style change):

```sh
node tools/quality/detect.mjs --all          # craft-floor linter (exit 0 clean / 2 findings)
node tools/quality/project-state.mjs          # structured project state (frozen pages, changes)
```

1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
2. Start AEM Proxy: `aem up` (opens `http://localhost:3000`)
3. Open the repo in your IDE and start coding.

## Documentation

AEM Edge Delivery Services docs: https://www.aem.live/docs/ — in particular the [Developer Tutorial](https://www.aem.live/developer/tutorial), [Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project), [Web Performance](https://www.aem.live/developer/keeping-it-100), and [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks).
