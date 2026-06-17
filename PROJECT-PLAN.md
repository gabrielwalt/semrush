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

## Phase G — Executable rules + structured context (impeccable.style integration, 2026-06-17)

**Why:** A review of impeccable.style (cloned, studied) showed our craft *knowledge* is on par but our *mechanization* is absent. Their power is that rules are **executable** (a deterministic detector enforces them and feeds findings back) and project state is **structured** (machine-readable signals + committed token files), so the agent acts on facts not memory. This phase makes our rules executable and our context structured — per **The Executable-Rule Rule** (AGENTS.md). **Bold-but-safe:** refactor our skills toward IDs + checkers, but RETAIN every piece of hard-won context already in them, and never move a frozen page.

**Sequencing:** G1 (rule IDs) is the contract the detector enforces, so it comes first. G2 (detector) and G3 (signals) are independent builds. G4 wires everything into the always-on skills + docs. Each script MUST be runnable with `node` and verified against the real repo before its task is `✅ Done` — a checker that doesn't run is not done.

### G1 — ✅ Done — Refactor `craft-floor` into an ID'd, tightened, executable ruleset

> **Done (status flag was stale — work completed during the G/HP build, verified 2026-06-17).** `craft-floor` now carries a stable `<!-- rule:craft-* -->` ID on every checkable rule (**30 unique IDs**, no dups), the tightened impeccable thresholds (display ceiling ≤6rem, tracking floor ≥−0.04em, `text-wrap` balance/pretty, semantic z-index, cards-are-lazy, flex/grid), an **"Enforced by"** section pointing at `tools/quality/detect.mjs` with `[auto]` tags, and an updated README row. All prior context retained. (Later augmented in HP5 with Identity-Preservation + side-stripe + light-on-dark.)

**Priority:** P1
**Type:** Enhancement
**Affected files:** `skills/craft-floor/SKILL.md`, `skills/README.md`

**Current state:** `craft-floor` holds the right named rules (One-Ratio, No-Twin-Sizes, Distinct-Link, One-Token-One-Home, Tokenize-Inverse, One-Spacing-Scale, One-Radius, All-Elements-Focus, Reduced-Motion-Baseline, Distill) but as prose only — no stable IDs, so nothing can enforce or cite them mechanically; and it's missing several exact thresholds impeccable states.
**Requested change:** (1) Give every checkable rule a stable `<!-- rule:craft-<area>-<slug> -->` ID (the contract the G2 detector keys on). (2) Tighten with impeccable's exact numbers we don't yet state, folded into our existing rules (NOT a rewrite — additive): hero/display clamp **ceiling ≤ 6rem**, display tracking **floor ≥ −0.04em**, `text-wrap: balance` on h1–h3 / `pretty` on long prose, semantic **z-index scale** (never 999/9999), "cards are the lazy answer / nested cards always wrong", flexbox-1D/grid-2D. (3) Add a short "Enforced by" line pointing at `tools/quality/detect.mjs` for the rules G2 covers. RETAIN all existing prose, pitfalls, and the See-also chain.
**Implementation:** Edit in place. Keep the section structure (Typography/Color/Spacing/State/Distill). Append `<!-- rule:id -->` to each checkable bullet. Add the new thresholds under the matching section. Add an "## Enforced by" section near the top once G2 exists (or stub it now, fill the file list in G2).

**Verification (implementing agent MUST do all):**
1. Every checkable rule line ends with a unique `<!-- rule:craft-... -->` ID (grep the file; count IDs = count of checkable rules; no dup IDs).
2. The new thresholds (6rem ceiling, −0.04em floor, text-wrap, z-index scale, cards-are-lazy) are present, each as a citable rule.
3. No existing rule, pitfall, or See-also line was deleted (diff shows additions, not removals).
4. `skills/README.md` row for craft-floor still matches; update its one-liner if the trigger changed.

**Acceptance criteria:** `craft-floor` carries a stable ID on every mechanically-checkable rule, includes impeccable's tightened thresholds, retains all prior context, and names its enforcing tool — making it the citable source of truth the detector keys on.

### G2 — ✅ Done — Build `tools/quality/detect.mjs`, a deterministic CSS/HTML slop + regression checker

> **Done 2026-06-17.** Built `tools/quality/rules.mjs` (registry + live allow-list loader + contrast math) and `tools/quality/detect.mjs` (CLI). 6 matchers, all keyed to G1 rule IDs and all proven against scratch violations: `craft-color-raw-inverse`, `craft-color-off-palette`, `craft-color-token-dup` (cross-file, base-`:root`-only via brace-matched ranges — ignores legit `@media :root` responsive overrides, catches real two-owner dups single- AND multi-line), `craft-radius-raw`, `craft-motion-reduced` (suppressed when styles.css has the global `*` guard), `craft-cruft-placeholder`. Allow-list is LIVE: harvested from `styles/*.css` (all colors the validated sheets use) + hex/rgb in `PROJECT-DESIGN.md` + `--radius-*` scale; structural near-grays/black/white skipped; ±6/channel tolerance. Verified: clean on `styles/styles.css` (exit 0); accent-purple proof (live token → allowed); full `--all` scan finds 26 warns/0 errors, ALL in block CSS (the F06/F07-deferred block-level literals — the detector's intended backlog, not regressions); `--json` valid; exit 0 clean / 2 findings. No deps, no network, `node --check` clean.

**Priority:** P1
**Type:** Enhancement
**Affected files:** NEW `tools/quality/detect.mjs`, NEW `tools/quality/rules.mjs` (rule registry), NEW `skills/quality-tooling/SKILL.md`, `skills/README.md`

**Current state:** We have ZERO deterministic detection. Every craft check (off-palette color, contrast, dead token, twin sizes, raw `#fff`, missing focus/reduced-motion, off-scale gap) is done by the agent manually — exactly the F01–F10 manual pass. Nothing catches a regression on a frozen page automatically.
**Requested change:** A Node (ESM, no deps, no network) CLI that scans given CSS/HTML files and emits findings keyed to the G1 rule IDs. It loads the allow-list from `PROJECT-DESIGN.md` + the `:root` tokens in `styles/*.css` (off-palette / off-scale lint binds to OUR committed tokens, never hardcoded). Output: human table by default, `--json` for machines, exit 0 = clean, exit 2 = findings.
**Implementation:** Mirror impeccable's split: `rules.mjs` = a central registry array `{ id, area, name, description, severity, test }` (regex/text matchers, real contrast math via relative luminance, token-set membership); `detect.mjs` = CLI that reads files, runs matchers, formats. Seed the registry from the G1 IDs. Concrete first matchers (all already hand-verified in F01–F10, so each has a known-true case in this repo): `craft-color-raw-inverse` (raw `#fff`/`#ffffff` as a color value outside an allow-list of glass/gradient contexts), `craft-color-off-palette` (a hex/rgb color not in the DESIGN.md set, tolerance ±6/channel), `craft-token-dup` (same `--token:` defined in >1 `:root`), `craft-token-dead` (a `--token` defined but `var()`-referenced 0×), `craft-radius-raw` (literal `10px`/`12px` `border-radius` where a `--radius-*` token exists), `craft-contrast-floor` (body/muted color vs its bg < 4.5:1 — needs the color pairs, start with the token-level check), `craft-motion-unguarded` (a `@keyframes`/`animation:` with no `prefers-reduced-motion` block in the same file). Keep matchers conservative (favor false-negatives over false-positives; an over-eager checker gets ignored).
**Verification (implementing agent MUST do all):**
1. `node tools/quality/detect.mjs styles/styles.css` runs, exits 0/2 cleanly, prints a readable table.
2. `--json` emits valid JSON: array of `{ file, line, ruleId, name, severity, snippet }`.
3. Prove each seeded matcher works: temporarily reintroduce a known violation (e.g. a duplicate `--color-muted`, a raw `border-radius: 10px`, a `#ffffff` color, a `@keyframes` with no reduced-motion guard in a scratch file under `/tmp`) and confirm the matcher flags it at the right line with the right ruleId; confirm the clean current repo files do NOT false-positive on the glass/gradient `#fff` (those are allow-listed).
4. Confirm it loads tokens from `PROJECT-DESIGN.md`/`styles` and that removing a color from the allow-list makes a previously-clean color flag (allow-list is live, not hardcoded).
5. Run it across ALL of `styles/*.css` + `blocks/*/*.css` and record the finding count in `quality-tooling`; triage any hit on a frozen page (must be a real issue or an allow-list gap, never a forced change to a frozen page).
6. After 2 failed attempts, stop and ask.

**Acceptance criteria:** `node tools/quality/detect.mjs [files] [--json]` deterministically flags craft-floor violations keyed to G1 rule IDs, binds its allow-list to our committed tokens, runs clean on the current (validated) repo, and is documented in `quality-tooling`.

### G3 — ✅ Done — Build `tools/quality/project-state.mjs`, a structured project-state probe

> **Done 2026-06-17.** Built `tools/quality/project-state.mjs` — emits JSON: `pages` (each parsed from the PROJECT-STATUS Pages table with content/style gate + `frozen` derived from style-validated), `frozen` (paths), `contentFiles` (glob of `content/**/*.plain.html`), `changedFiles` (read-only `git status --porcelain`), `tokenFiles` (the `:root` definers), `scanTargets`+`scanVia` (changed CSS first, else all foundation+blocks — pipes into detect.mjs). `--scan` prints the ready detect.mjs command. Verified: `frozen` = exactly index/nav/footer (NOT the 🔲 one/enterprise); contentFiles = the 5 real files; tokenFiles = styles.css+brand.css. `changedFiles` proven in a throwaway git repo (reports modified + untracked CSS, `scanVia: git-changes`); in THIS repo git's safe.directory guard blocks it so it degrades to `[]` gracefully (try/catch, stderr ignored). Read-only — only `git status --porcelain`, never mutating git. `node --check` clean.

**Priority:** P2
**Type:** Enhancement
**Affected files:** NEW `tools/quality/project-state.mjs`, `skills/quality-tooling/SKILL.md`, `skills/session-startup/SKILL.md`

**Current state:** At session start and before tasks, the agent *guesses* project state by reading prose in PROJECT-STATUS.md (which pages are frozen, which gate each is at, what changed). Impeccable's `context-signals.mjs` proves a JSON probe of ground truth is far more reliable.
**Requested change:** A Node CLI emitting JSON facts the agent routes on: `pages` (each content file → content-validated / style-validated / frozen, parsed from the PROJECT-STATUS Pages table), `frozen` (the list of frozen page paths), `changedFiles` (working-tree changes vs the served baseline, via the read-only git plumbing already allowed — `git status --porcelain`/`diff --name-only`, NOT mutating git), `tokenFiles` (the `styles/*.css` that define `:root`), `scanTargets` (block/style files to feed G2). No network.
**Implementation:** Parse the PROJECT-STATUS.md Pages table for the validation flags (it's a fixed markdown table); glob `content/**/*.plain.html`; read-only git for changes. Emit `{ pages: [...], frozen: [...], changedFiles: [...], scanTargets: [...] }`. Pair with G2: `project-state.mjs --scan` could pipe `scanTargets` into `detect.mjs`.
**Verification (implementing agent MUST do all):**
1. `node tools/quality/project-state.mjs` emits valid JSON.
2. `frozen` correctly lists the pages marked style-validated ✅ in PROJECT-STATUS (currently index, nav, footer) and NOT the in-progress ones (one, enterprise) — cross-check against the Pages table by hand.
3. `changedFiles` reflects the actual working tree (make a trivial scratch edit, confirm it appears; revert).
4. Uses only read-only git (no `add`/`commit`/`push`/`checkout`); confirm by reading the source.
5. After 2 failed attempts, stop and ask.

**Acceptance criteria:** `node tools/quality/project-state.mjs` returns ground-truth JSON for frozen pages, per-page validation gate, and changed files — so the agent routes on facts, documented in `quality-tooling`.

### G4 — ✅ Done — Wire the tooling into the always-on skills + docs (make it the default reflex)

> **Done 2026-06-17.** Created the hub skill `quality-tooling` (documents both scripts: purpose, flags, exit codes, the live allow-list, the loop, pitfalls) + README row. Threaded the exact commands into the reflexes: `verify-before-claiming` (new step 3 — run detect on changed files + project-state to confirm no frozen file was touched), `regression-guard` (project-state for the frozen set before, detect on shared-file consumers after, + an "Unfrozen ≠ unshared" caution), `session-startup` (run project-state at startup for ground-truth state), `styling-additively` (read `frozen` from the probe before touching a shared tool, + unfrozen-still-ripples note). Added an AGENTS.md Troubleshooting "Quality tooling" block. Verified: end-to-end dry-run of the verify loop runs both scripts and reports; all 4 reflex skills name the exact command; README + AGENTS reference the hub; spot-checked that every edited skill RETAINED its prior sections (additive only).

**Priority:** P2
**Type:** Enhancement
**Affected files:** `skills/verify-before-claiming/SKILL.md`, `skills/regression-guard/SKILL.md`, `skills/session-startup/SKILL.md`, `skills/styling-additively/SKILL.md`, `skills/quality-tooling/SKILL.md`, `AGENTS.md`, `skills/README.md`

**Current state:** The checkers from G2/G3 exist but nothing tells the agent to run them, so they'd be as forgettable as the prose rules they replace. The loop only closes when the always-load skills point at them.
**Requested change:** Thread the tools into the reflexes that already fire: (a) `verify-before-claiming` — before claiming a CSS/style task done, run `detect.mjs` on the changed files + `project-state.mjs` to confirm no frozen page regressed; (b) `regression-guard` — run `detect.mjs` on the shared file's consumers after editing shared CSS; (c) `session-startup` — run `project-state.mjs` to load ground-truth state instead of only reading prose; (d) `styling-additively` — check `frozen` from the probe before touching any shared tool. Keep all existing content; add a short "Run the checker" step to each. `quality-tooling` is the hub skill documenting both tools (when/how/flags/exit codes). RETAIN all existing skill content.
**Implementation:** Additive edits — one new step/section per skill pointing at the exact command. Create `quality-tooling/SKILL.md` (the hub) and add its README row. Add a one-line pointer in AGENTS.md Troubleshooting.
**Verification (implementing agent MUST do all):**
1. Each of the 4 always-on/guard skills names the exact command to run and when.
2. `quality-tooling` documents both scripts: purpose, invocation, flags, exit codes, and that the allow-list is the committed tokens.
3. `skills/README.md` lists `quality-tooling`; the "Load when…" trigger matches its job.
4. Re-read each edited skill: no prior recipe/pitfall was dropped.
5. Dry-run the loop end-to-end: pretend a CSS task just finished → follow `verify-before-claiming` literally → it tells you to run the two scripts → they run and report. Confirm the wiring is real, not described.

**Acceptance criteria:** Running the checkers is now a documented default step in the verify, regression-guard, session-startup, and styling-additively reflexes, with `quality-tooling` as the hub — so executable enforcement happens by reflex, not memory.

---

## Phase HP — Port impeccable's design-craft references (rebuild a meaningful brand guideline) (2026-06-17)

**Why (user-steered):** Every import must *rebuild a meaningful, best-practice brand guideline + default style from the original site* — at Refined/Reimagined this is obvious, but even a Faithful pixel-match still needs a solid default-content foundation. impeccable's `skill/reference/` deep-craft files (typeset, colorize, layout, adapt, the brand register) are gold for exactly this. We have a *floor* (`craft-floor`) and a *process* (`global-style-foundation`) but lack the deep **positive craft criteria** that turn a passable foundation into an elegant one. Phase HP ports those criteria into reusable, migration-framed skills. **Performance/CWV dropped** — EDS best practices cover it. **Not wholesale:** we adapt the *criteria for elegance*, framed for FAITHFUL reproduction (the source brand's committed identity always wins over a generic "best practice"); we do NOT port impeccable's invent/amplify verbs (bolder/delight/overdrive). Each new skill stays in our format, cross-links the library, and hardcodes no project values (reference `PROJECT-DESIGN.md`).

**The orchestration:** `global-style-foundation` stays the *entry point* (the capture-the-essence pass). The three new craft skills (`typography-craft`, `color-craft`, `layout-craft`) are the *deep references* it points into when building each dimension of the foundation. `craft-floor` remains the *minimum bar* the result must clear. `responsive-adaptation` covers the cross-device dimension. So: foundation (process) → craft skills (how to do each dimension well) → craft-floor (did it clear the floor?).

### HP1 — ✅ Done — New skill `typography-craft` (rebuild the type system well)
> Done 2026-06-17. `skills/typography-craft/SKILL.md`: read-source-first + identity-preservation; 5-role scale + one-ratio commitment + semantic tokens + weight roles; 45–75ch measure + context line-heights + light-on-dark 3-axis (owns `craft-typo-light-on-dark`); font-loading-without-shift; Reimagined-only font-selection + reflex-reject list. Defers thresholds to craft-floor. README row added.

**Priority:** P1
**Type:** Enhancement
**Affected files:** NEW `skills/typography-craft/SKILL.md`, `skills/README.md`
**Source:** impeccable typeset.md + brand.md (font-selection procedure, reflex-reject list)

**Current state:** `craft-floor` states type *thresholds* (ratio ≥1.25, no twin sizes, tracking floor) but not the *positive method* for rebuilding a brand's type system: how to read the source's type voice, pick/confirm the scale ratio, assign weight roles, set measure + light-on-dark compensation, and load fonts without shift. `global-style-foundation` gestures at "type scale + ratio" without the depth.
**Requested change:** A migration-framed skill: (1) **read the source first** — extract the actual fonts/weights/sizes the original uses (`measure-then-implement`); the source's committed identity wins (identity-preservation). (2) **Rebuild as a clean system**: 5-role scale (caption/secondary/body/subheading/heading), commit to ONE ratio (1.25/1.333/1.5), semantic token names (`--text-body` not `--font-16`), ≤3–4 weights with defined roles, body ≥16px. (3) **Readability**: 45–75ch measure via `ch`, line-height tighter for headings (1.1–1.2) / looser body (1.5–1.7), **light-on-dark three-axis compensation** (+0.05–0.1 line-height, +0.01–0.02em tracking, +1 weight step). (4) **Loading without shift**: `font-display: optional|swap`, metric-matched fallback (`size-adjust`/`ascent-override`/`descent-override`), preload critical weight only, ALL-CAPS needs +5–12% tracking. (5) For a Reimagined page only, the **font-selection procedure + reflex-reject list** (don't *invent* Inter/Roboto/Fraunces/Playfair etc.) — but NEVER reject what the source brand already committed to. Cross-link `craft-floor`, `global-style-foundation`, `measure-then-implement`, `vertical-spacing-system`.
**Implementation:** New SKILL.md in our format. Frame every rule as "reproduce the source's intent, then regularize toward this criterion." Keep generic.

**Verification:**
1. Skill covers: read-source-first, 5-role scale + ratio commitment, weight roles, measure/line-height, light-on-dark 3-axis, font-loading-without-shift, and the reflex-reject list scoped to Reimagined-only + identity-preservation.
2. It defers thresholds to `craft-floor` (cross-link, no duplication of the numbers it owns).
3. README row, trigger ("type system", "typography", "fonts", "type scale", "rebuild the type").

**Acceptance criteria:** `typography-craft` gives the positive method for rebuilding an elegant, on-brand type system from a source site, deferring hard thresholds to craft-floor, indexed + cross-linked.

### HP2 — ✅ Done — New skill `color-craft` (rebuild the palette well)
> Done 2026-06-17. `skills/color-craft/SKILL.md`: extract-source-first; role structure (primary/neutral/semantic/surface); 60-30-10 by visual weight; tinted neutrals toward the brand hue (not reflex warm/cool); OKLCH ramps; dark-mode-is-not-inversion; alpha-is-a-smell; Reimagined-only strategy + named reference. Defers contrast/side-stripe/distinct-link to craft-floor. README row added.

**Priority:** P1
**Type:** Enhancement
**Affected files:** NEW `skills/color-craft/SKILL.md`, `skills/README.md`
**Source:** impeccable colorize.md + brand.md (color strategy, named reference)

**Current state:** `craft-floor` owns anti-slop color *prohibitions* (distinct-link, tokenize-inverse, contrast floor, off-palette) but not the *positive palette-construction method*: roles, the 60-30-10 weight rule, tinted neutrals toward the brand hue, OKLCH ramp construction, dark-mode-is-not-inversion, alpha-is-a-smell.
**Requested change:** A migration-framed skill: (1) **extract the source palette first** — the brand's committed colors win. (2) **Structure into roles**: Primary (1 color, 3–5 shades) / Neutral (9–11 scale) / Semantic (success/error/warning/info) / Surface (2–3 elevations); skip secondary/tertiary unless needed. (3) **60-30-10 by visual weight** (not pixel count) — neutrals 60 / secondary 30 / accent 10; the accent works *because* it's rare. (4) **Tinted neutrals**: add chroma 0.005–0.015 toward THIS brand's hue (never reflex warm-orange/cool-blue — that's the AI cream/sand tell). (5) **OKLCH ramps**: hold hue+chroma, vary lightness, reduce chroma near white/black. (6) **Dark mode ≠ inverted**: depth via surface-lightness (3-step scale), desaturate accents, −1 body weight step; "alpha is a design smell" → define explicit overlay colors. (7) **color strategy** (Restrained/Committed/Full/Drenched) named against a real reference, but ONLY when Reimagined; Faithful/Refined reproduce the source's strategy. Cross-link `craft-floor` (the prohibitions + contrast), `context-adaptive-blocks` (dark surfaces), `project-background-layering`.
**Implementation:** New SKILL.md. Defer the contrast numbers + side-stripe ban + distinct-link to craft-floor; this skill is construction method, not the floor.

**Verification:**
1. Skill covers: extract-source-first, role structure, 60-30-10-by-weight, tinted-neutrals-toward-brand-hue, OKLCH ramp method, dark-mode-not-inverted, alpha-smell, strategy-named-reference scoped to Reimagined.
2. Defers contrast/side-stripe/distinct-link thresholds to craft-floor (cross-link, no dup).
3. README row, trigger ("palette", "color system", "brand colors", "dark mode", "tinted neutrals").

**Acceptance criteria:** `color-craft` gives the positive method for rebuilding an elegant, on-brand palette, deferring prohibitions/thresholds to craft-floor, indexed + cross-linked.

### HP3 — ✅ Done — New skill `layout-craft` (rhythm, hierarchy, spatial structure)
> Done 2026-06-17. `skills/layout-craft/SKILL.md`: squint test; hierarchy via 2–3 combined dimensions (table); rhythm (tight 8–12px groupings + generous 48–96px separations); flex-1D/grid-2D/container-query tool choice; cards-are-lazy; 44px hit-area expansion + optical alignment. Defers scale/radius to craft-floor and EDS section/block mechanics to vertical-spacing-system. README row added.

**Priority:** P2
**Type:** Enhancement
**Affected files:** NEW `skills/layout-craft/SKILL.md`, `skills/README.md`
**Source:** impeccable layout.md

**Current state:** We have `vertical-spacing-system` (the EDS section/block mechanics) and `craft-floor`'s One-Spacing-Scale rule, but not the *positive composition criteria*: the squint test, hierarchy via 2–3 combined dimensions, rhythm (tight groupings + generous separations), flex-1D/grid-2D, container queries, the 44px hit-area expansion, optical alignment.
**Requested change:** A skill: (1) **squint test** for verifying hierarchy (blur — can you still find primary/secondary/groupings?). (2) **Hierarchy via combined dimensions** (size 3:1, weight bold-vs-regular, space, position) — the table; space alone is often enough. (3) **Rhythm not uniformity**: tight grouping 8–12px between siblings, generous 48–96px between sections, vary within sections. (4) **Tool choice**: flex for 1D, grid for 2D, named grid-areas for page layout, **container queries for components** (a card adapts to its container, not the viewport). (5) **Optical**: 44×44px hit area via `::before { inset: -10px }` when the visual element is smaller; negative-margin optical text alignment; nudge geometrically-centered glyphs. Defers the scale-coherence rule + radius to craft-floor; defers EDS section/block margin mechanics to `vertical-spacing-system`. Cross-link both + `measure-then-implement` + `carousel-pattern-eds`.
**Implementation:** New SKILL.md. Frame for reproduction: match the source's spatial rhythm, regularize to a coherent scale. No project values.

**Verification:**
1. Skill covers: squint test, hierarchy-dimensions table, rhythm values, flex/grid/container-query choice, 44px hit-area + optical alignment.
2. Defers scale/radius to craft-floor and section/block mechanics to vertical-spacing-system (cross-links, no dup).
3. README row, trigger ("layout", "hierarchy", "spacing rhythm", "composition", "grid vs flex").

**Acceptance criteria:** `layout-craft` gives positive composition criteria (hierarchy, rhythm, tool choice, optical) for rebuilding elegant layout, deferring mechanics/thresholds to the owning skills, indexed + cross-linked.

### HP4 — ✅ Done — New skill `responsive-adaptation` (adapt for device + input, not just scale)
> Done 2026-06-17. `skills/responsive-adaptation/SKILL.md`: adapt≠scale; input-method queries (`pointer: coarse` → ≥44px targets, `hover: none` forbids hover-only reveals — flagged for our nav); content-driven mobile-first breakpoints (points at PROJECT-DESIGN); srcset/`<picture>` art-direction; author-content overflow guards (`min-width:0`, `overflow-wrap`, line-clamp); safe-area insets. README row added (Layout & CSS).

**Priority:** P2
**Type:** Enhancement
**Affected files:** NEW `skills/responsive-adaptation/SKILL.md`, `skills/README.md`
**Source:** impeccable adapt.md + harden.md (text-overflow)

**Current state:** "Mobile polish" is a standing priority; we have breakpoints in PROJECT-DESIGN but no skill on *adapting* (rethinking, not scaling) an imported desktop page for touch/small screens, nor text-overflow guards for author-entered content.
**Requested change:** A skill: (1) **adapt ≠ scale** — rethink for the new context (single column, stacked, full-width; progressive disclosure). (2) **Detect input method, not just screen size**: `@media (pointer: coarse)` → bigger touch targets (≥44×44px), `@media (hover: hover)` gates hover affordances, `@media (hover: none)` forbids hover-only reveals — *touch users can't hover* (directly relevant to our mega-menu/nav). (3) **Content-driven breakpoints** mobile-first (`min-width`; start narrow, add a breakpoint where the design breaks; 640/768/1024 usually suffice) — reference PROJECT-DESIGN's breakpoints. (4) **Responsive images**: `srcset`+`sizes` for resolution, `<picture>` for art-direction crops. (5) **Author-content overflow guards**: `min-width:0` on flex/grid children, `overflow-wrap:break-word`, `-webkit-line-clamp` — so long author-entered strings don't blow out a block. (6) `env(safe-area-inset-*)` for notches. Cross-link `nav-header-eds` (hover/touch nav), `measure-then-implement` (measure each breakpoint), `vertical-spacing-system`.
**Implementation:** New SKILL.md, generic. Point at PROJECT-DESIGN breakpoints, don't hardcode.

**Verification:**
1. Skill states the `pointer`/`hover` reflexes, the 44px touch target, content-driven mobile-first breakpoints, srcset/picture, and the author-content overflow guards.
2. README row, trigger ("responsive", "mobile", "touch", "hover on mobile", "text overflow on narrow", "adapt for device").

**Acceptance criteria:** `responsive-adaptation` captures adapt-don't-scale + input-method-aware reflexes + author-content overflow guards, indexed + cross-linked.

### HP5 — ✅ Done — Augment `craft-floor` (identity-preservation + side-stripe [auto]) and wire the foundation orchestration
> Done 2026-06-17. craft-floor: added the prominent **Identity-Preservation Rule** (`craft-identity-preservation`, near the fidelity gate — source brand identity always beats a generic floor rule), the **Side-Stripe Ban** (`craft-color-side-stripe` [auto]), and a light-on-dark pointer (`craft-typo-light-on-dark`, full method in typography-craft). 30 unique rule IDs now, no dups, all prior content retained. Added the `craft-color-side-stripe` matcher to `tools/quality/rules.mjs` — flags `border-left/right ≥2px solid` in a brand/non-gray color (var(--accent*) too), skips 1px + gray dividers + full borders; proven against scratch violations, **zero false positives on the validated repo** (still 26 block-CSS warns, no new). Documented in `quality-tooling`. `global-style-foundation` now routes into typography-craft/color-craft/layout-craft/responsive-adaptation per dimension, then clears craft-floor. Scripts lint clean.

**Priority:** P1
**Type:** Enhancement
**Affected files:** `skills/craft-floor/SKILL.md`, `tools/quality/rules.mjs`, `skills/quality-tooling/SKILL.md`, `skills/global-style-foundation/SKILL.md`
**Source:** impeccable brand.md (identity-preservation scoping) + colorize.md (side-stripe absolute ban) + typeset.md (light-on-dark)

**Current state:** craft-floor lacks three high-value impeccable rules and the new craft skills aren't yet wired into the foundation entry point. (a) **Identity-Preservation note** — anti-slop bans apply to *invented* choices, NOT a source brand's committed identity (so we never "correct" a faithfully-reproduced font/lane/palette); already half-present in pitfalls, needs to be a named, prominent rule. (b) **Side-stripe ban** (`border-left/right ≥2px` as a colored accent → full hairline/tint/leading glyph) — impeccable's #1 absolute ban, and **regex-checkable**. (c) **Light-on-dark** cross-reference to typography-craft.
**Requested change:** (1) Add to craft-floor: a prominent **Identity-Preservation Rule** (`craft-identity-preservation`) near the fidelity gate, the **side-stripe ban** (`craft-color-side-stripe`), and a light-on-dark pointer (`craft-typo-light-on-dark`) deferring detail to `typography-craft`. (2) Add a `craft-color-side-stripe` **[auto]** matcher to `tools/quality/rules.mjs`: flag `border-left`/`border-right` ≥2px solid with a non-structural (non-near-gray) color. (3) Document the matcher in `quality-tooling`. (4) In `global-style-foundation`, add a "deep references" pointer so the foundation pass routes into typography-craft/color-craft/layout-craft per dimension, and clears craft-floor at the end. RETAIN all existing content in every file.
**Implementation:** Additive edits. Matcher follows the existing registry pattern (reuse `isStructural`); favor false-negatives. Prove against a scratch violation; confirm the validated repo stays clean.

**Verification:**
1. craft-floor has the 3 new ID'd rules; Identity-Preservation is prominent near the fidelity discussion; all prior rules + the 27 existing IDs retained.
2. `node tools/quality/detect.mjs` flags a scratch `border-left: 4px solid <brand-purple>` on a card AND runs clean on the current `styles/` + `blocks/` (no new false positives — verify the existing repo has no real side-stripes).
3. `quality-tooling` lists the new matcher; `global-style-foundation` points into the three craft skills.

**Acceptance criteria:** craft-floor gains the Identity-Preservation + side-stripe + light-on-dark rules, the side-stripe rule is deterministically enforced and clean on the repo, and `global-style-foundation` orchestrates the new craft skills.

---

## Phase I — Exercise the craft skills on the unfrozen pages + capture field notes (2026-06-17)

**Why:** The HP craft skills (`typography-craft`/`color-craft`/`layout-craft`/`responsive-adaptation`) have never been run against real EDS pages. The user unfroze index/nav/footer and reopened one/enterprise is in-progress — so we can dogfood the skills on actual pages, fix genuine improvements, AND learn which guidance fits a typical Edge Delivery project vs which clashes (vanilla CSS, no build, block model, author content, EDS perf budget). All learnings → `skills/craft-skills-field-notes.md`. **Constraints:** identity-preservation (don't "correct" deliberate Semrush brand decisions); shared blocks ripple (a homepage teaser edit changes one/enterprise — verify all three, per `regression-guard`); run `detect.mjs` after every CSS change; lint clean; preview-verify. Fidelity = Refined.

> **✅ Phase I complete 2026-06-17.** All 7 sub-tasks done. **Code outcome:** detector findings 26→5 (the 5 are accepted Semrush brand gradient stops); tokenized 7 inverse `#fff`→`--color-inverse` + 4 exact-match radii (all zero-visual, lint clean, preview-verified on all 3 pages). **Skill outcomes (dogfooding fed back):** `typography-craft` gained the "body already ≥500 → weight axis pre-satisfied" caveat; `layout-craft` gained the "EDS uniform `--section-padding` IS the rhythm" caveat; **`tools/quality/rules.mjs` `craft-radius-raw` matcher refined** to flag only token-matching radii (killed false-noise on intentional off-scale radii); `quality-tooling` doc updated. **Key learnings** (full notes in `skills/craft-skills-field-notes.md`): the raw-inverse→`--color-inverse` rule is the best EDS-block fit; the nav is touch-correct (click-based); Identity-Preservation repeatedly drove correct "accept, don't fix" triage; the executable detector made the whole pass fast and objective. **Solo decisions + 3 open questions** logged in the notes for user review (overflow-wrap global, the matcher refinement, Lazzer F01).

### I1 — ✅ Done — Baseline capture
**Type:** Enhancement · **Files:** notes only
Run `project-state.mjs` + `detect.mjs --all`; record current computed type scale / colors / spacing on index, /one/, /enterprise/ at desktop+mobile as the regression baseline. Acceptance: baseline values + current detector findings logged in field notes.

### I2 — ✅ Done — typography-craft lens
**Type:** Enhancement · **Files:** `styles/*.css`, blocks as needed, notes
Apply `typography-craft` to the 3 pages: check scale-ratio coherence, weight roles, measure (45–75ch on prose), light-on-dark 3-axis on dark sections/enterprise. Fix only genuine, identity-preserving improvements; note anything that's a Semrush brand decision to leave alone. Acceptance: real type issues fixed + verified non-regressing on all 3 pages; ≥3 field-note entries on EDS fit.

### I3 — ✅ Done — color-craft lens
**Type:** Enhancement · **Files:** `blocks/*/*.css`, `styles/*.css`, notes
Apply `color-craft`: tackle the block-CSS `craft-color-raw-inverse` backlog (tokenize genuine inverse `#fff`→`--color-inverse`), check palette roles + tinted-neutral cohesion + dark-mode handling. Triage each detector finding (real vs allow-list gap). Acceptance: raw-inverse backlog reduced where it's a true win, detector re-run, all 3 pages non-regressing; field notes on what EDS block CSS does/doesn't fit.

### I4 — ✅ Done — layout-craft lens
**Type:** Enhancement · **Files:** notes, CSS only if a real win
Apply `layout-craft`: squint test on each page, hierarchy/rhythm evaluation, card-grid monotony check. Mostly evaluative (these pages are validated-ish) — change only on a clear win. Acceptance: squint-test verdict per page logged; any fix verified; field notes on layout-craft EDS fit.

### I5 — ✅ Done — responsive-adaptation lens
**Type:** Enhancement · **Files:** `blocks/header/*`, CSS, notes
Apply `responsive-adaptation`: the highest-value real check is the **nav hover-vs-touch** path (mega-menu must not be hover-only on touch); also spot-check mobile reflow + a long-author-string overflow on a couple of blocks. Fix genuine touch/overflow bugs. Acceptance: nav touch path assessed (+fixed if broken), overflow guards added where missing, verified; field notes.

### I6 — ✅ Done — Clear the radius backlog where it's a genuine win
**Type:** Enhancement · **Files:** `blocks/*/*.css`, notes
The detector's `craft-radius-raw` backlog (raw `border-radius` literals where a `--radius-*` token exists) — tokenize the clear-cut single-value ones (zero-visual), leave intentional/structural ones. Re-run detector. Acceptance: radius backlog reduced, computed radii unchanged in preview, all 3 pages non-regressing.

### I7 — ✅ Done — Write up field notes + fold EDS learnings back into the skills
**Type:** Enhancement · **Files:** `skills/craft-skills-field-notes.md`, the craft skills, notes
Consolidate the notes into the three buckets (works / doesn't-fit / open-questions). For any learning that's a durable EDS truth, fold a concise line into the matching craft skill (Pitfalls or a note) so the skill improves from the dogfooding. Acceptance: field notes complete; ≥1 craft skill improved from a real learning; README unaffected unless a skill's trigger changed.

---

## Standing priorities (not yet scheduled)

- **PageSpeed 100** — performance validation on the feature branch (EDS best practices cover the mechanics; no dedicated skill needed).
- **Accessibility WCAG 2.1 AA** — audit and fix (ARIA on interactive blocks; focus-visible covered by F02; contrast enforced by `craft-floor`/`detect.mjs`).
- **Mobile polish** — responsive refinement pass across migrated pages (now backed by `responsive-adaptation`, HP4).

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
