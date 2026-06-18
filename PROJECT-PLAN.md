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

When a task is completed, **delete its body** rather than keeping a long "Resolved" note — the implementation is in the code and the rationale is in git + `skills/craft-skills-field-notes.md`. Record finished work as a one-line row in **Completed work (archive)** below.

---

## Goal

Grow the migration page by page. For each new page: model its content with the **augmented-styles** ladder (baseline blocks + variants + section styles + page template — see `eds-content-modeling`), reuse existing blocks wherever possible, add the minimum of new variants/styles, then build a generic marker-driven parser that reproduces the validated content exactly and renders identically to the original.

The homepage (`content/index.plain.html`) is the **validated reference** and the worked example of every layer. Use it as the pattern for the next pages.

---

## Open tasks

### T01 — 🔲 Open — Consolidate the 47 raw catalog templates into the canonical hierarchy (3 chromes → 12 templates → sub-categories)

**Priority:** P1
**Type:** Enhancement (scope/entropy reduction — do BEFORE bulk import)
**Affected files:** `PROJECT-TEMPLATES.md` (authoritative map — already drafted), `catalog/template-catalog.json` (read), `PROJECT-BLOCKS.md`, parsers under `tools/importer/`, future `.plain.html` content
**Skill:** Load `import-template-consolidation` and `eds-content-modeling` first.

**What's wrong:** Catalog discovery produced **47 raw templates** from 169 pages. Most of the multiplicity is **drift, not genuine page types** — Semrush expanded over years and near-identical pages diverged. We must NOT reproduce 47 page templates; that imports the source's accumulated entropy. The canonical set, the full 47→canonical map, per-template purpose, and per-template branding rules are documented in **`PROJECT-TEMPLATES.md`** — that file is authoritative; this task is to confirm it and apply it at import.

**Merge test (per `import-template-consolidation`): SAME APPEARANCE + SAME PURPOSE → one template.** Block count/order is NOT a distinguishing axis. The model is a **three-level hierarchy: chrome → template → sub-category.** Bucket by **rendered chrome first** (empirically, from the screenshot/class signature — never the URL path); a template never spans chromes; recurring author-meaningful variation within a template is a **sub-category** (a variant, not a new template+parser).

**Three chromes, all KEPT distinct (user-confirmed), 67/71/31 = 169 pages:**
- **Marketing** (brand nav/footer/gradient) — `www` + `enterprise.semrush.com`. **67 pages.**
- **App-shell** (App Center product application: left product rail) — all `/apps/*`. **71 pages.** Built natively in this chrome — NOT folded to marketing.
- **Careers** (`careers.semrush.com` sub-nav) — **31 pages.** Sub-brand chrome, kept.

**Canonical hierarchy (12 templates + sub-categories + 2 DEFER) — authoritative in `PROJECT-TEMPLATES.md`:**
- Marketing (6): `marketing-landing` (`:light`/`:dark`; ref homepage LOCKED), `comparison` (incl. `/content-hub/vs-*`), `tool-detail` (`:hub`/`:single`; reconcile onto `template-feature`), `article` (`:standard`/`:with-video`/`:index`), `case-study-detail` (`:detail`/`:index`), `resource-detail` (`:gated`/`:ungated`). No marketing `text-page` (the only prose pages are careers-hosted).
- App-shell (2): `app-detail` (collapses `-b/-c/-d/-e` drift), `app-listing` (`:storefront-home`/`:category`).
- Careers (4): `careers-landing`, `careers-content`, `careers-office-detail`, `careers-text`.

**Fix approach:** (template-routing fully resolved in `PROJECT-TEMPLATES.md` — no open confirmations remain)
1. For each template pick the **reference page** (prefer LOCKED: homepage → `marketing-landing`) and reconcile onto existing blocks/variants (`styling-additively`, Toolbox-First). Sub-categories are variants/section-styles of the parent.
2. At import, route each page to its chrome → template → sub-category and **normalize drift** — reproduce the canonical structure, not incidental extra/missing sections.
3. Keep `PROJECT-TEMPLATES.md` authoritative; the 47 raw names exist only in `catalog/`.

**Verification:**
1. Final template count = 12 across 3 chromes (Marketing 6 · App-shell 2 · Careers 4), each with a named reference page; sub-categories are variants, not separate parsers.
2. Every one of the 47 raw templates maps to exactly one template (or DEFER). No raw template silently dropped. (Verified in `PROJECT-TEMPLATES.md`.)
3. Every page assigned to a chrome by its RENDERED chrome, not its URL path. No template spans chromes.

**Acceptance criteria:** A user-approved chrome → template → sub-category hierarchy mapping all 47 raw templates, bucketed by rendered chrome, with a reference page per template, recorded in `PROJECT-TEMPLATES.md` before any bulk import begins.

---

### F01 — 🔲 Open — Lazzer heading font is never loaded (headings fall back to Inter)

**Priority:** P1
**Type:** Gap
**Affected files:** `styles/fonts.css`, `styles/styles.css` (`--heading-font-family`), `PROJECT-DESIGN.md`

**What's wrong:** Every heading is meant to render in **Lazzer** (`--heading-font-family: "Lazzer", "Inter", sans-serif`) but no `@font-face` for Lazzer exists, so all headings silently render in the **Inter** fallback. The original Semrush site uses Lazzer for headings — this is a fidelity gap.
**Evidence:** `styles/fonts.css` declares only Inter 400/500/600/700. Grep for `lazzer` in `styles/*.css` returns only the two `--heading-font-family` token declarations, no `@font-face`. In preview, `[...document.fonts].map(f=>f.family)` returns only `Inter` + Arial-based fallbacks. h1 computed `font-family` resolves to Lazzer in the cascade but glyphs come from Inter because Lazzer has no source.
**Root cause:** Missing `@font-face` rule for Lazzer (no woff2 source wired up).
**Fix approach:** **Decision required first:** either (a) add a Lazzer `@font-face` (hosted/self-hosted woff2 for the weights used — 500/600) to `styles/fonts.css`, restoring the intended brand heading voice; OR (b) formally drop Lazzer from `--heading-font-family` and standardize headings on Inter. This **changes the look of the frozen pages**, so it needs explicit user sign-off on the direction before implementing.

**Verification (implementing agent MUST do all):**
1. In preview, before the fix, confirm `[...document.fonts].map(f=>`${f.family} ${f.status}`)` contains no `Lazzer ... loaded`.
2. Apply the approved direction in `styles/fonts.css` / `styles/styles.css`.
3. Reload; if (a): confirm `document.fonts.check('600 84px Lazzer')` is true AND a `Lazzer` entry shows `loaded`. If (b): confirm `--heading-font-family` no longer lists Lazzer and h1 computed font-family is `Inter`.
4. Compare index and /one/ headings against the original — confirm the heading voice matches the intended direction and no layout shift/regression on the frozen pages.
5. Update PROJECT-DESIGN.md → Typography + Named Foundation Rules to reflect the resolved state.
6. After 2 failed attempts, stop and ask.

**Acceptance criteria:** Headings render in the user-approved font with its `@font-face` actually loaded (or Lazzer formally removed), verified via `document.fonts` in preview, with no regression on the frozen pages.

---

## Phase A — Re-create pages from the foundation (when ready)

No open page tasks. When re-creating a page, follow `eds-migration-process` (orient → foundation → content → gates) and reuse the keepers' blocks/variants/section-styles first (`styling-additively`). Re-introduce a toolkit parser only when a new page needs it.

---

## Standing priorities (not yet scheduled)

- **PageSpeed 100** — performance validation on the feature branch (EDS best practices cover the mechanics; no dedicated skill needed).
- **Accessibility WCAG 2.1 AA** — audit and fix (ARIA on interactive blocks; focus-visible done; contrast enforced by `craft-floor`/`detect.mjs`).
- **Mobile polish** — responsive refinement pass across migrated pages (backed by `responsive-adaptation`).

---

## Completed work (archive)

One-line summaries only — implementation is in the code, rationale in git + `skills/craft-skills-field-notes.md`.

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
| F02–F10 | Foundation craft / a11y (focus ring, token hygiene, links, inverse-color token, radius/transition tokens, reduced-motion baseline) | 9 |
| G1–G4 | Executable rules + structured context (craft-floor IDs, `detect.mjs`, `project-state.mjs`, wired into always-on skills) | 4 |
| HP1–HP5 | Ported impeccable design-craft (typography/color/layout-craft, responsive-adaptation, identity-preservation + side-stripe) | 5 |
| I1–I7 | Exercised craft skills on unfrozen pages + field notes | 7 |
| — | Augmented-styles refactor; marker-driven homepage parser; 10-page autonomous batch (later scope-reset to 5 keepers) | — |
| — | Systematic tokenization + coverage + enforcement; breakpoint consistency; smarter tokenization checkers (`craft-token-near`/`-unused`) | — |
| — | Dynamic-brand animation layer (`scroll-animations.js`) on homepage + One + Enterprise; responsive touch-target audit | — |
| — | Visual Critique v2 wired in as lead discovery step; 2 new skills (`motion-craft`, `interaction-states-eds`, `scroll-reveal-animations`) | — |
| **Total** | | **100+ tasks** |
