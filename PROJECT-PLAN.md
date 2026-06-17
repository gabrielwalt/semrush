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

## Phase F — Foundation craft / a11y (from the 2026-06-17 foundation audit)

Global-foundation defects found by measuring index/one/enterprise in preview. Several touch shared/global CSS while index + /one/ are FROZEN — every fix must be confirmed non-regressing on the frozen pages before it ships (`regression-guard`). Body-text contrast was audited and PASSES (17:1 on both light and dark surfaces, well above 4.5:1) — no task needed. Heading size/tracking were measured consistent across all three pages — no task needed.

### F01 — 🔲 Open — Lazzer heading font is never loaded (headings fall back to Inter)

**Priority:** P1
**Type:** Gap
**Affected files:** `styles/fonts.css`, `styles/styles.css` (`--heading-font-family`), `PROJECT-DESIGN.md`

**What's wrong:** Every heading on every page is meant to render in **Lazzer** (`--heading-font-family: "Lazzer", "Inter", sans-serif`) but no `@font-face` for Lazzer exists, so all headings silently render in the **Inter** fallback. The original Semrush site uses Lazzer for headings — this is a fidelity gap.
**Evidence:** `styles/fonts.css` declares only Inter 400/500/600/700. Grep for `lazzer` in `styles/*.css` returns only the two `--heading-font-family` token declarations, no `@font-face`. In preview, `[...document.fonts].map(f=>f.family)` returns only `Inter` + the Arial-based fallbacks — no Lazzer. h1 computed `font-family` resolves to Lazzer in the cascade but the glyphs come from Inter because Lazzer has no source.
**Root cause:** Missing `@font-face` rule for Lazzer (no woff2 source wired up).
**Fix approach:** **Decision required first** (recorded in PROJECT-DESIGN.md → Proposed additive fixes): either (a) add a Lazzer `@font-face` (with a hosted/self-hosted woff2 for the weights used — 500/600) to `styles/fonts.css`, restoring the intended brand heading voice; OR (b) formally drop Lazzer from `--heading-font-family` and standardize headings on Inter. This **changes the look of the frozen pages**, so it needs explicit user sign-off on the direction before implementing.

**Verification (implementing agent MUST do all):**
1. In preview, before the fix, confirm `[...document.fonts].map(f=>`${f.family} ${f.status}`)` contains no `Lazzer ... loaded`.
2. Apply the approved direction in `styles/fonts.css` / `styles/styles.css`.
3. Reload; if direction (a): confirm `document.fonts.check('600 84px Lazzer')` is true AND a `Lazzer` entry shows `loaded`. If (b): confirm `--heading-font-family` no longer lists Lazzer and h1 computed font-family is `Inter`.
4. Compare index and /one/ headings against the original site — confirm the heading voice now matches the intended direction and no layout shift/regression on the frozen pages (heading line-heights/wrapping unchanged).
5. Update PROJECT-DESIGN.md → Typography + Named Foundation Rules to reflect the resolved state.
6. After 2 failed attempts, stop and ask.

**Acceptance criteria:** Headings render in the user-approved font with its `@font-face` actually loaded (or Lazzer formally removed), verified via `document.fonts` in preview, with no regression on the frozen pages.

### F02 — 🔲 Open — Focus-visible indicator is custom for buttons but absent for other interactive elements

**Priority:** P2
**Type:** Enhancement
**Affected files:** `styles/styles.css` (global focus styles)

**Current state:** Custom `:focus-visible` styling exists only for `.button` variants (primary/secondary/accent and their dark/template overrides — 11 rules, all `a.button`/`button.button`). Plain in-text links (resource-card titles, footer links, nav links, blockquote links), the stats-facts expand buttons, the carousel `‹`/`›` nav buttons, and the country-filter combobox have **no custom focus indicator** — they rely on the browser default outline (no global `outline: none` reset exists, so a UA ring still shows; this is a consistency/craft gap, not a hard 2.4.7 failure).
**Requested change:** Add a single consistent global `:focus-visible` outline for keyboard focus on all interactive elements (links, buttons, inputs) so focus affordance is uniform and on-brand, not a mix of custom-pill-glow and UA default.
**Implementation:** Add a global rule in `styles/styles.css` such as `:where(a, button, input, select, [tabindex]):focus-visible { outline: 2px solid var(--accent-color); outline-offset: 2px; }` (use a low-specificity `:where()` so existing `.button` focus rules still win, and so it's easily overridden on dark surfaces). Verify the ring is visible on BOTH light and dark sections (may need a dark-surface override using white or `--accent-cyan`).

**Verification (implementing agent MUST do all):**
1. In preview, Tab to a resource-card link and confirm it currently shows only the UA default outline.
2. Add the global `:focus-visible` rule in `styles/styles.css`.
3. Reload; Tab through: a footer link, a resource-card link, a carousel nav button, the country combobox — confirm each shows the new `2px solid` accent outline with `2px` offset.
4. Tab to a primary `.button` and confirm the EXISTING custom button focus style still wins (not overridden by the global rule).
5. Confirm the ring is visible against a `section-dark` background (e.g. the AI Visibility section); if invisible, add a dark-surface override.
6. Regression-check index and /one/: no change to default (non-focused) appearance.
7. After 2 failed attempts, stop and ask.

**Acceptance criteria:** Every keyboard-focusable element shows a consistent, visible `:focus-visible` outline on both light and dark surfaces, while existing button focus styles are preserved and no non-focused appearance changes on the frozen pages.

---

## Standing priorities (not yet scheduled)

- **PageSpeed 100** — performance validation on the feature branch.
- **Accessibility WCAG 2.1 AA** — audit and fix (ARIA on interactive blocks; focus-visible covered by F02).
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
