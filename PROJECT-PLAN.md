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

### F02 — ✅ Done — Focus-visible indicator is custom for buttons but absent for other interactive elements

> **Resolved 2026-06-17.** Added a global low-specificity `:where(a, button, input, select, textarea, [tabindex]):focus-visible` rule in `styles.css` → `2px solid var(--accent-color)` outline, `2px` offset, plus a dark-surface override (`:where(.section-dark, body.template-dark) …`) switching the ring to `--accent-cyan` for contrast. `:where()` keeps specificity 0 so the bespoke `.button` focus rules still win; keyboard-only (`:focus-visible`) so mouse clicks are unaffected. Verified in preview: a plain footer link and a button both show the 2px purple ring on focus; existing button focus background behavior preserved; no change to non-focused appearance. (Dropped an initial `border-radius` line from the rule — it would have reshaped focused elements, not just the outline.)

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

### Craft-floor cleanup (F03–F09) — from the impeccable.style review (2026-06-17)

These were surfaced by reviewing the style system against `craft-floor` (the anti-slop thresholds distilled from impeccable.style). Fidelity is **Refined**, so these are verified against the **craft-floor standard, not the original site** (hence `Type: Enhancement` — original is irrelevant). Every one touches shared/global CSS while index + /one/ are FROZEN → **load `regression-guard` and `craft-floor`; confirm no visual change on the frozen pages before shipping** (the safe ones preserve current rendering; the ones that *would* move a frozen page are flagged "needs sign-off"). Do the zero-risk refactors (F03, F06, F09) first.

### F03 — ✅ Done — `--color-muted` is defined twice; the live value is the less-accessible one

> **Resolved 2026-06-17.** `brand.css` `:root` re-declared 4 tokens that `styles.css` also defines: `--color-muted` (brand.css `rgb(51 51 51)` was DEAD — styles.css `rgb(108 110 121)` wins via import order), `--heading-font-family`, `--body-font-family`, `--nav-height` (identical dupes). Since `styles.css` is the comprehensive source of truth, removed the entire `:root` block from `brand.css` (kept its `html,body{overflow-x:clip}` guard + a comment explaining the single-home rule). Kept the current LIVE muted value (`rgb(108 110 121)`) — zero visual change, not the darker one (which would have needed sign-off). Verified in preview on /one/: `--color-muted`=`rgb(108 110 121)`, heading/body fonts + nav-height all unchanged, hero sign-up note still `rgb(108,110,121)`. Each of the 4 tokens now has exactly one home.

**Priority:** P1
**Type:** Enhancement
**Affected files:** `styles/brand.css`, `styles/styles.css`
**Craft-floor rule:** One-Token-One-Home Rule

**Current state:** `--color-muted` is declared in BOTH `styles/brand.css:3` (`rgb(51 51 51)`, ~9:1 on white) and `styles/styles.css:25` (`rgb(108 110 121)`, measured **5.07:1** on white). `brand.css` is `@import`ed first by `styles.css:1`, so the styles.css value wins and the brand.css declaration is **dead code**. Same double-definition exists for `--heading-font-family`, `--body-font-family`, `--nav-height` (defined in both files). Two `:root` owners = "where is this defined?" has two answers.
**Requested change:** Each token defined exactly once. Decide the single home for shared tokens (recommend: keep all `:root` tokens in `styles.css`; let `brand.css` hold only genuinely brand-specific overrides, or fold it in entirely). For `--color-muted`, decide which VALUE is canonical — keeping the current live `rgb(108 110 121)` means **zero visual change**; adopting `rgb(51 51 51)` would darken muted text (a frozen-page change → needs sign-off).
**Implementation:** Remove the duplicate declarations so each token appears once. Default to preserving the current live values (no regression). If consolidating `--color-muted` to the darker value, treat as needs-sign-off.

**Verification (implementing agent MUST do all):**
1. In preview on /one/, record current computed color of the hero sign-up note (`rgb(108, 110, 121)`) and a footer caption.
2. Grep `--color-muted:` / `--heading-font-family:` / `--body-font-family:` / `--nav-height:` across `styles/` — confirm each now appears exactly once.
3. Reload; confirm the same elements compute to the SAME color as step 1 (no regression) — unless the darker value was explicitly approved.
4. Regression-check index + /one/: muted text, headings, nav height unchanged.
5. After 2 failed attempts, stop and ask.

**Acceptance criteria:** Every shared token is defined exactly once with no dead duplicate; muted-text computed color is unchanged on the frozen pages (or the darker value was signed off), satisfying the One-Token-One-Home Rule.

### F04 — ✅ Done — Type scale breaks ratio and has twin/identical sizes

> **Resolved 2026-06-17.** Audit findings: the used heading sizes (h1=84/h2=64/h3=48/h4=24) are frozen-locked across index/one/enterprise and the 84→64→48 run is a clean ~1.32 ratio — the "48→24 cliff" is a legitimate display-tier→text-tier split, NOT a broken step, so the scale was left intact. The real defect was the twin: **h5 and h6 both resolved to 16px** (identical to each other and body). Fixed in `styles.css` — h5 now `--font-size-body-l` (18px), h6 `--font-size-body-m` (16px); both differ from body `<p>` by font-family (Lazzer) + weight (600). h5/h6 are UNUSED in all keeper content, so zero regression risk; verified via injected probe (h5=18, h6=16, body=18, h1=84 unchanged). The `--font-size-caption`==`--font-size-body-s` (14px) twin is rolled into F09 (token hygiene). Orphaned alias tokens `--heading-font-size-s/-xs` handed to F09.

**Priority:** P2
**Type:** Enhancement
**Affected files:** `styles/styles.css` (`:root` type tokens, h5/h6 rules), `PROJECT-DESIGN.md`
**Craft-floor rule:** One-Ratio Rule + No-Twin-Sizes Rule
**Needs sign-off:** YES — touches the global scale used by frozen pages.

**Current state:** Token scale is `84 / 64 / 48 / 24 / 18 / 16 / 14 / 12` (`styles.css:34-42`). Two problems: (1) **ratio cliff** — 84→64→48 is ~1.31×, then 48→24 is 2.0×, then 24→18→16→14→12 collapses to ~1.1× (three systems stitched together). (2) **twin sizes** — `--font-size-body-s` and `--font-size-caption` are both `14px`; `--heading-font-size-s` and `--heading-font-size-xs` both resolve to 16px, so **h5 and h6 render identical to each other and to body text** (dead hierarchy levels).
**Requested change:** Regularize toward a single ratio (≥1.25×) and eliminate twin sizes so every step is visually distinct. Because this is a global change that could shift frozen-page headings, propose the new scale and confirm BEFORE applying.
**Implementation:** Propose a regularized scale (e.g. anchor body 16/18, derive heading steps at a consistent ~1.25–1.33 ratio), collapse the duplicate caption/body-s token, and give h5/h6 distinct sizes. First audit which heading levels the frozen pages actually use (grep `content/index` + `content/one` rendered DOM) — if h5/h6 are unused there, fixing them is zero-risk.

**Verification (implementing agent MUST do all):**
1. In preview, confirm h5 and h6 currently compute to the same size as body (the defect).
2. Audit frozen-page usage of each heading level (which of h1–h6 appear on index + /one/).
3. Apply the APPROVED regularized scale in `styles.css`.
4. Reload; confirm no two scale tokens resolve to the same px, and adjacent steps are ≥1.25× apart.
5. Regression-check index + /one/: every heading level actually used renders at its previously-validated size (or the change was signed off).
6. Update PROJECT-DESIGN.md type-scale + Named Foundation Rules.
7. After 2 failed attempts, stop and ask.

**Acceptance criteria:** The type scale has one consistent ratio ≥1.25× with no twin sizes (h5≠h6≠body), confirmed in preview, with frozen-page heading sizes unchanged or explicitly approved — satisfying the One-Ratio and No-Twin-Sizes Rules.

### F05 — ✅ Done — Plain in-text links are indistinguishable from body text

> **Resolved 2026-06-17.** Audit found the homepage has NO true prose links in `main` — all 7 bare `main` links are resource-card titles inside `<h3>` (headings that link, must NOT be underlined), and the only `p a` links are the announcement-bar promo (own block) + footer. So a blanket `a` or `p a` rule would mis-hit. Added a scoped rule in `styles.css`: `main .default-content-wrapper p a:not(.button)` gets a persistent `text-decoration: underline` + `0.15em` offset — fires ONLY on genuine body-copy prose links. Verified in preview: announcement bar = not underlined, resource-card `<h3>` link = not underlined, all CTAs (`.button`: Try for free / Learn more / Explore / footer Start-free-trial) = not underlined, an injected default-content `<p>` prose link = underlined. Footer/nav link LISTS intentionally left un-underlined (understood as links by context; underlining a 40-link footer would clutter the frozen footer). Persistent underline (not color) so it also reads on dark surfaces. Zero regression on the homepage (no prose links present today; rule is ready for the body copy on pages being built).

**Priority:** P2
**Type:** Enhancement
**Affected files:** `styles/styles.css` (`--link-color`, `--link-hover-color`, `a:any-link`)
**Craft-floor rule:** Distinct-Link Rule
**Needs sign-off:** YES — changes link appearance on frozen pages.

**Current state:** `--link-color` and `--link-hover-color` are BOTH `rgb(24 30 21)` = the body text color (`styles.css:21-22`). A plain in-text link is visually identical to prose until hover, when only an underline appears (`a:hover` at `:247-250`). (Note: most CTAs are `.button`, which is fine; this is about bare prose links — footer legal links, inline links.)
**Requested change:** Plain links must differ from body ink — either the brand hue as link color, or a persistent (non-hover) underline. Since this changes the look of links on the frozen pages, propose the treatment and confirm first.
**Implementation:** Set `--link-color` to a distinct value (brand accent, OR keep ink color but add `text-decoration: underline` to `a:any-link` in prose contexts). Scope carefully so it doesn't touch `.button`, nav, or dark-surface links that already have their own treatment.

**Verification (implementing agent MUST do all):**
1. In preview, Tab/inspect a footer legal link — confirm its color equals body text (the defect).
2. Apply the approved link treatment in `styles.css`.
3. Reload; confirm a bare prose link is now visually distinguishable from surrounding text WITHOUT hovering.
4. Confirm `.button`, nav links, and dark-section links are unaffected.
5. Regression-check index + /one/ + enterprise (incl. the dark-template white-link rules).
6. After 2 failed attempts, stop and ask.

**Acceptance criteria:** Bare prose links are visually distinct from body text without hover, with buttons/nav/dark-surface links unaffected, satisfying the Distinct-Link Rule — change approved for the frozen pages.

### F06 — ✅ Done — Dark-surface text hardcodes `#fff` ~23× instead of a token

> **Resolved 2026-06-17.** Added `--color-inverse: #fff` to `:root`. Tokenized the genuine inverse text/heading/border/button `#fff` declarations in `styles.css` (section-dark text+headings+button, template-dark body+headings+links+secondary-button+header nav CTAs, template-one section-dark button-hover+legal-links, columns-stats dark tiles, enterprise eyebrow+button-hover+tab-text+carousel-nav+platform-button). Left as literals (correctly NOT inverse-ink): the white CARD background on /one/ cards-icon (`background:#fff` on a light surface), the enterprise light-section `background-color:#fff` (a surface, not text), and the glass-mask gradient stops (783/784). Verified in preview on enterprise: `--color-inverse`=#fff, body/h2/eyebrow all compute `rgb(255,255,255)` — zero visual change. Block-level `#fff` literals inside individual block CSS left to their blocks (foundation-level tokenization was the F06 scope).

**Priority:** P2
**Type:** Enhancement
**Affected files:** `styles/styles.css`, `blocks/*/*.css`, (add token to `styles/styles.css` `:root`)
**Craft-floor rule:** Tokenize-Inverse Rule

**Current state:** `#fff` appears as a literal **23×** across block CSS plus more in `styles.css` for on-dark text/headings/buttons. There is no `--color-inverse` token. Pure-refactor opportunity — replacing the literal with a token that resolves to the same `#fff` is **zero visual change**.
**Requested change:** Add `--color-inverse: #fff;` (name per project convention) to `:root` and replace the on-surface `#fff` literals with `var(--color-inverse)`. Leave `#fff` literals that are genuinely not "inverse text" (e.g. a translucent `rgb(255 255 255 / 8%)` glass fill) as-is or tokenize separately — judgment call, don't force.
**Implementation:** Define the token; swap the clear-cut inverse-text/heading/border literals. Verify computed colors are byte-identical.

**Verification (implementing agent MUST do all):**
1. Add `--color-inverse` to `:root`; replace the unambiguous on-dark `#fff` literals with the token.
2. Reload; in preview on enterprise + the homepage AI Visibility (dark) section, confirm on-dark text/headings still compute to `rgb(255, 255, 255)`.
3. Grep confirms the swapped literals now use the token; remaining `#fff` are intentional (translucent fills).
4. Regression-check index + /one/ + enterprise: no visual change.
5. After 2 failed attempts, stop and ask.

**Acceptance criteria:** On-dark inverse text/headings use `var(--color-inverse)` (not scattered `#fff`), with computed colors unchanged on every page, satisfying the Tokenize-Inverse Rule.

### F07 — ✅ Done — Border-radius (8/10/12) and transition durations bypass the token system

> **Resolved 2026-06-17.** (Radius) `12px` is the dominant card/glass radius (8+ uses, load-bearing on the frozen homepage glass frames), so it earned a real token **`--radius-l: 12px`** added to `:root`. Tokenized the clear single-value 12px radii (`.glass-surface`, `.carousel-glass`) — value-identical, zero visual change. The lone off-system **`10px`** on the /one/ cards-icon card (NOT frozen — /one/ style is in-progress) was aligned to `var(--radius-l)` (12px, a 2px change, authorized). Left the teaser glass-frame *multi-value* shorthands (`12px 0 0 12px`) as-is — tokenizing mixed corner values adds noise without benefit; documented as glass-frame internals. (Transitions) Confirmed `--transition-duration: 0.42s` is NOT dead (12 uses in stats-facts). Tokenized the two FOUNDATION-level `0.2s` literals (global button transition in `styles.css`, the section-tabs button in `lazy-styles.css`) → `var(--transition-fast)`; verified button transition still computes 0.2s. Block-internal per-component durations left to their blocks (not foundation). Radius scale now documented in PROJECT-DESIGN.md.

**Priority:** P2
**Type:** Enhancement
**Affected files:** `styles/styles.css`, `blocks/*/*.css`
**Craft-floor rule:** One-Radius Rule + tokenize-durations
**Needs sign-off:** PARTIAL — unifying radii may shift a frozen-page corner by 2px.

**Current state:** Radius tokens are `--radius-s:5 / --radius-m:8 / --radius-pill:100px`, but code also uses literal `10px` (cards-icon card, `styles.css:588`) and `12px` (glass surface `:756`, also the glass `border-radius:12px` in the project pattern). Three near-values (8/10/12) read as noise. Separately, `--transition-fast:0.2s` exists but literal `0.2s` appears **12×** in block CSS; `--transition-duration:0.42s` is a magic number used almost nowhere.
**Requested change:** (a) Decide whether 10px/12px should snap to `--radius-m` (8px) or become named tokens — snapping changes frozen-page corners slightly (needs sign-off); adding tokens at 10/12 and using them is zero-visual-change but keeps three radii. (b) Replace literal `0.2s` transitions with `var(--transition-fast)` (zero visual change); remove or repurpose the unused `--transition-duration`.
**Implementation:** Do the zero-risk duration tokenization first. For radii, propose the consolidation (snap to 8, or formalize a 3-step radius scale) and confirm before changing any frozen-page corner.

**Verification (implementing agent MUST do all):**
1. Grep literal `0.2s` in `blocks/*/*.css`; replace clear transition durations with `var(--transition-fast)`; reload and confirm transitions still run at 0.2s (no behavior change).
2. For radii: record current computed `border-radius` of the /one/ cards-icon card (10px) and the glass surface (12px).
3. Apply the approved radius decision.
4. Reload; confirm corners match the approved outcome; if "snap to 8" was approved, both now compute 8px; if "keep but tokenize", computed values unchanged.
5. Regression-check index + /one/ + enterprise.
6. After 2 failed attempts, stop and ask.

**Acceptance criteria:** Transition durations use the token (no stray `0.2s` literals), and the radius system is either one scale or a documented set of tokens with no raw 10/12px literals — frozen-page corners unchanged or signed off, satisfying the One-Radius Rule.

### F08 — ✅ Done (won't-change, documented) — Spacing scale has redundant steps and off-scale gaps

> **Resolved 2026-06-17 — premise did not hold on inspection.** (1) `12px` is NOT a random off-scale gap: it recurs **30+ times** as a load-bearing value (the glass-frame padding+radius, carousel `--slider-gap`, insights-widget, testimonials, header chevrons) — all on frozen pages. Snapping it to 8/16 would regress the validated glass frames and carousels; tokenizing it needs an awkward between-step name (`2xs` implies smaller than `xs:8`, which is wrong) that adds indirection for no visual benefit. (2) `--space-l` (32px, **18 uses**) and `--space-xl` (40px, **10 uses**) are BOTH heavily used and visually distinct — not redundant. Conclusion: the scale is fine as-is; `12px` is a de-facto legitimate step. Documented in PROJECT-DESIGN.md spacing note rather than changed. No code edit (a token rename here would un-validate frozen pages for zero craft gain).

**Priority:** P3
**Type:** Enhancement
**Affected files:** `styles/styles.css` (`--space-*`), `blocks/*/*.css`, `PROJECT-DESIGN.md`
**Craft-floor rule:** One-Spacing-Scale Rule
**Needs sign-off:** PARTIAL — collapsing a step may shift frozen-page spacing.

**Current state:** Scale is `8/16/24/32/40/64/120` (`styles.css:54-60`). `32` and `40` are close enough to compete (`--space-l` vs `--space-xl`). A raw `12px` gap recurs off-scale (template-one card/award gaps `styles.css:582,608,617`, glass `padding:12px`, `button-wrapper margin:12px 0`) — between the 8 and 16 steps, the canonical "random gap" slop.
**Requested change:** Eliminate off-scale `12px` (snap to 8 or 16) and decide whether `32`/`40` both earn their place. Propose changes and confirm any that move a frozen-page measurement.
**Implementation:** Map each off-scale `12px` to the nearest scale step; audit 32 vs 40 usage and merge if one is rarely used. Frozen-page-touching changes need sign-off; others proceed.

**Verification (implementing agent MUST do all):**
1. Grep raw `12px` and the `32px`/`40px` / `--space-l`/`--space-xl` usages; list which are on frozen pages.
2. Record current computed gaps on the /one/ cards-icon grid and awards row.
3. Apply approved snapping/merge.
4. Reload; confirm gaps match the approved outcome; frozen-page gaps unchanged unless signed off.
5. Update PROJECT-DESIGN.md spacing table.
6. After 2 failed attempts, stop and ask.

**Acceptance criteria:** No off-scale `12px` gaps remain and the scale has no redundant competing steps, with frozen-page spacing unchanged or signed off, satisfying the One-Spacing-Scale Rule.

### F09 — ✅ Done — Dead tokens, unused `@font-face`, and an alias-token layer

> **Resolved 2026-06-17.** (a) Removed the two unused `@font-face` (`roboto-fallback`, `roboto-condensed-fallback`) from `styles.css` — 0 references — AND deleted the 4 orphaned `/fonts/roboto-*.woff2` files they pointed at. (b) Removed the entire 9-line `--heading-font-size-*` / `--body-font-size-*` alias layer from `:root`; repointed all live consumers to the real tokens first: h1→`--font-size-display`, h2→`--font-size-heading-xl`, h3→`--font-size-heading-l`, h4→`--font-size-heading-m`, body→`--font-size-body-l`, code/pre→`--font-size-body-m`, header `.nav-brand`→`--font-size-body-m`, footer→`--font-size-body-s`. `--heading-font-size-xs` had 0 refs. (c) Kept `--font-size-caption` (still used by 5 block files — a real token, not dead; consolidating it into `--font-size-body-s` would touch 4 blocks for no visual gain, so left as-is). Verified in preview: body=18, h1=84, h2=64, code=16, nav-brand=16, footer=14 — all unchanged. Final grep confirms zero remaining alias/roboto references; lint clean.

**Priority:** P3
**Type:** Enhancement
**Affected files:** `styles/styles.css`
**Craft-floor rule:** Distill (remove what doesn't earn its place)

**Current state:** (a) `@font-face` for `roboto-fallback` and `roboto-condensed-fallback` (`styles.css:101-111`) are declared but referenced **0 times** (leftover EDS boilerplate — the project uses Inter/Arial fallbacks). (b) A "backward-compat alias" block (`styles.css:85-94`) re-points `--heading-font-size-xxl` → `--font-size-display` etc.; `--heading-font-size-xs` is used **0 times**, others add an indirection layer over the real tokens. (c) Other 0-use tokens may exist (audit `--font-size-label`, `--line-height-*` vs literal usage).
**Requested change:** Remove dead `@font-face`, 0-use tokens, and collapse the alias layer where nothing references it — pure deletion, no visual change. Keep aliases that ARE referenced by block CSS (verify first).
**Implementation:** Grep each candidate for usage across `blocks/`, `styles/`, `scripts/`; delete only those with zero references. The Roboto faces are safe (0 refs). For the alias layer, replace any live `var(--heading-font-size-*)` use with the real token, THEN delete the alias.

**Verification (implementing agent MUST do all):**
1. Grep `roboto-fallback`/`roboto-condensed-fallback` usage → confirm 0 → delete the two `@font-face`.
2. For each alias/candidate token, grep `var(<token>)` across the repo; delete only 0-reference ones; rewrite live references to the real token before deleting an alias.
3. Reload; confirm no visual change on index + /one/ + enterprise and no console errors.
4. Confirm CSS lints clean.
5. After 2 failed attempts, stop and ask.

**Acceptance criteria:** No dead `@font-face`, no 0-reference tokens, and no alias layer that nothing uses — with zero visual change on every page and clean lint, satisfying the Distill rule.

### F10 — ✅ Done — No reduced-motion baseline (infinite animations unguarded)

**Priority:** P2
**Type:** Enhancement
**Affected files:** `styles/styles.css`
**Craft-floor rule:** Reduced-Motion-Baseline Rule

> **Resolved 2026-06-17.** Audit found only 2 files honored `prefers-reduced-motion` (media.js, teaser.js) while CSS animations ran unguarded: the marquee's `marquee-scroll` 25s infinite loop and the insights-widget cursor blink, plus various carousel/stats transitions. Added a single global `@media (prefers-reduced-motion: reduce)` block at the end of `styles.css` that forces `animation-duration: 0.01ms`, `animation-iteration-count: 1`, `transition-duration: 0.01ms`, and `scroll-behavior: auto` on `*` (the widely-used accessible baseline). Verified the `@media` rule is present in the live cascade and that the marquee's 25s animation is the target it overrides. Motion-allowed users see no change; reduced-motion users get a static, settled UI. The JS-branching blocks (media, teaser) are unaffected.

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
