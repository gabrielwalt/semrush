# Craft-skills field notes — exercising the new skills on a real EDS project

Notes taken while exercising `typography-craft`, `color-craft`, `layout-craft`, `responsive-adaptation`, `craft-floor`, and the `tools/quality/*` checkers on the unfrozen index / one / enterprise pages (Semrush EDS migration). Goal: capture **what works well and what doesn't fit a typical Edge Delivery project**, plus any decisions I had to make solo while the user was away.

Format: each entry is `[skill] observation → what I did / what it means for EDS`.

---

## Decisions made solo (for the user to review)

1. **Dark body type: no light-on-dark weight bump.** Semrush body is already weight 500 everywhere, so the "+1 weight step" axis is pre-satisfied; bumping to 600 would over-heavy dark body. Left dark body type unchanged (also: an in-progress page, marginal at 18px/17:1). Updated `typography-craft` with the ≥500-baseline caveat.
2. **5 off-palette warnings = accepted, not fixed.** They're Semrush brand gradient stops/tints (violet/blue) used decoratively. Per Identity-Preservation, reproduced-brand colors win; the off-palette rule is a warning, and accept is the right triage. Did NOT pollute the PROJECT-DESIGN allow-list with one-off gradient midpoints (would weaken the check's signal).
3. **Uniform 60px section padding: kept.** layout-craft's greenfield "vary section spacing" conflicts with EDS's systematic `--section-padding`; on EDS, rhythm = within-section + spacing variants. Updated `layout-craft` with the caveat.
4. **Refined the `craft-radius-raw` detector matcher** to flag only radii that EQUAL an existing token (the zero-visual swap), not every raw radius. The old behavior false-flagged intentional off-scale component radii (6/2/16px). This is a code change to `tools/quality/rules.mjs` — judged safe (proven still-fires on real violations; favors false-negatives per our detector design) but flagging it for review since it changes detector behavior.
5. **Tokenized 7 inverse `#fff` + 4 exact-match radii in block CSS** — all zero-visual (`var()` resolves to the same value), verified in preview, lint clean.

## What works well on EDS

- **`craft-color-raw-inverse` + `--color-inverse` token** — the best-fit rule for EDS block CSS; raw inverse `#fff` accumulates across per-block passes and tokenizing it is zero-visual + makes blocks dark-surface-ready. (9→0 this session.)
- **`responsive-adaptation` nav hover/touch check** — highest-value real check; confirmed the mega-menu is click-based (touch-correct), partly because EDS boilerplate nav is click-based by default.
- **Identity-Preservation framing** — repeatedly made the right triage obvious (accept brand gradient stops, keep the 12px carousel label, keep uniform section padding, don't bump 500→600). Without it the lenses would have "corrected" deliberate brand decisions.
- **The deterministic detector as the spine of every lens** — `detect.mjs` turned each subjective "is the color/radius right?" into a concrete, file:line, triageable list. The exercise was fast *because* the checks were executable, not eyeballed (validates the Executable-Rule Rule).
- **craft-floor as the floor, craft skills as the method, detect.mjs as enforcement** — the layered architecture held up: I used the craft skills to *judge*, craft-floor/detector to *check*, and they didn't overlap or conflict.

## What doesn't fit / needs adaptation on EDS

- **light-on-dark "+1 weight step"** assumes a 400 body baseline — breaks when the brand body is already ≥500 (common). → caveat added to `typography-craft`.
- **layout "vary section spacing for rhythm"** fights EDS's uniform `--section-padding` system — rhythm lives within sections + in spacing variants. → caveat added to `layout-craft`.
- **off-palette detection can't distinguish decorative gradient stops from stray off-brand text colors** — on marketing pages, gradients/glass legitimately use many tints, so this rule needs human triage (accept is common). Possible future matcher refinement (skip colors only inside `linear-gradient(`) — parked, not built (human triage is fine).
- **adapt.md's app-shell patterns** (bottom-nav, bottom-sheets, master-detail) are irrelevant to marketing-site migration — only the input-method + overflow-guard parts port.
- **Playwright `snapshot` is too token-heavy for routine craft checks** — each navigate dumps the full a11y tree. Use `evaluate` with a tight return object; reserve snapshots for DOM-structure questions. (Tooling/workflow note, not a skill flaw.)

## Open questions for the user

1. **Global `overflow-wrap: break-word` on default-content `h*,p`?** Would fully harden author text against long unbroken strings, but touches the global foundation with no observed defect today. Parked rather than forced. Want it added?
2. **The `craft-radius-raw` matcher refinement** (flag only token-matching radii) — I judged this a clear improvement and applied it. Flagging for awareness in case you'd prefer the stricter "tokenize every radius" behavior.
3. **Lazzer font (F01) remains the one true type defect** — headings render in Inter because Lazzer has no `@font-face`/source. Still needs a font file or a decision to standardize on Inter. (Pre-existing, unchanged.)

### Standing-priorities pass (2026-06-17)
- **Accessibility spot-check (homepage, the audit-nugget checklist):** 1 h1, **0 heading-order skips, 0 unnamed interactive elements (80 checked), 0 images missing alt**. One real gap found + **fixed**: the insights-widget country search input had only `placeholder="Enter country"` (a placeholder is not an accessible name, WCAG 4.1.2) → added `aria-label="Search countries"` in `insights-widget.js`. Verified in preview: now `combobox "Search countries"`, unlabeledCount 1→0. Touches homepage-only block (no ripple). The broader WCAG AA audit (focus-visible, ARIA on all interactive blocks) is now largely covered by F02 (global focus-visible) + this pass; remaining = a dedicated full-site audit, left as a standing priority.
- **PageSpeed/CWV:** per user, EDS best practices cover the mechanics — no dedicated work; the perf-relevant craft reflexes (no above-fold lazy-load, reserve media space) are already EDS-native. Left as a standing priority for a feature-branch Lighthouse run.
- **Mobile polish:** `responsive-adaptation` skill now exists + the nav touch path is confirmed good (I5). A full <768px sweep across pages remains a standing priority but has no known defects blocking it.

---

## Session log

### I1 — Baseline (2026-06-17)
**Detector `detect.mjs --all`:** 26 findings, ALL in block CSS (none in `styles/` foundation): `craft-radius-raw` ×12, `craft-color-raw-inverse` ×9, `craft-color-off-palette` ×5. By file: teaser 13, insights-widget 4, header 3, carousel 2, media 2, stats-visibility 1, testimonials 1. `project-state`: frozen=[] (index/nav/footer unfrozen), 5 content files, 0 working-tree changes.

**Computed type baseline @1440 desktop:**
- **index:** h1 84/92.4 600 Lazzer · h2 64/70.4 · h3 12/12 (carousel collapsed-card label — intentional) · h4 24/26.4 · body 18/27 500 ls-0.36 ink rgb(24,30,21) · prose ≈60ch.
- **/one/:** h1 84 · h2 48 · h3 40 · h4 24 · dark closing section text #fff on rgb(24,30,21) = **17:1**.
- (enterprise captured live; dark-template, h2 46 / h3 48, body white on dark = 17:1.)

**Observation [tooling]:** the deterministic baseline (detect + project-state) took ~2 commands and is exact; the *visual* baseline via Playwright snapshots is very token-heavy (each `browser_navigate` dumps the full a11y tree). → **For routine craft checks, `evaluate` with a tight return object beats `snapshot`; reserve snapshots for when DOM structure is actually in question.** Folded into a field-note for the skills.

### I2 — typography-craft lens (2026-06-17)
**Verdict: type foundation already solid (hardened earlier in F04); lens confirms it + surfaces 2 EDS/brand-fit learnings. No forced change.**
- Scale recurs cleanly (index 84/64/48-via-tokens/24; one 84/48/40/24; enterprise 46/48 bespoke). Ratio coherent; the index h3=12px is the carousel collapsed-card label (a real Semrush component decision — identity-preservation: leave it). Contrast 17:1 everywhere incl. dark surfaces.
- **[doesn't fit] The light-on-dark "+1 weight step" axis assumes a 400 body baseline.** Semrush body is **already weight 500** site-wide (light AND dark) — so the brand has effectively pre-compensated, and bumping dark body to 600 would over-heavy it. On this project only the line-height/letter-spacing axes of the three-axis rule are even available, and at 18px/17:1 they're marginal. **Decision (solo): made NO change to dark body type** — the weight axis is satisfied by the brand's 500 default, and a line-height nudge on an in-progress page is not a clear win. → fold a caveat into `typography-craft`: "if the brand's body is already ≥500, the weight axis is pre-satisfied; don't stack to 600."
- **[works] Real-Font rule already caught the real issue** (F01): Lazzer is declared but never loaded → headings render Inter. That's the one true type defect and it's correctly parked pending a font source (user decision). The craft lens re-confirms it's the highest-value type item, but it needs an asset I don't have.

### I3 — color-craft lens (2026-06-17)
**Outcome: tokenized 7 genuine inverse-text instances (raw-inverse 9→0), accepted 5 brand-gradient off-palette warnings. Zero visual change, lint clean.**
- **[works extremely well] The `craft-color-raw-inverse` matcher + `--color-inverse` token is the single best fit for EDS block CSS.** Block CSS is written per-block by different passes, so raw `#fff` inverse-text accumulates (teaser ×6, header, testimonials, insights-widget). Tokenizing to `var(--color-inverse)` is **zero-visual** (it resolves to #fff) and makes the block dark-surface-ready. Verified submit/nav-signup still `rgb(255,255,255)`. This is the F06 foundation pattern paying off at the block layer.
- **[decision, solo] The 5 `craft-color-off-palette` findings are brand gradient stops** (teaser violet `rgb(212 177 255)`/`rgb(240 234 255)`, insights-widget light tints `rgb(235 245 255)`/`rgb(225 240 255)`). Per **Identity-Preservation**, these ARE Semrush brand colors used decoratively — the off-palette rule is a *warning*, and the correct triage is **accept, not fix**. I did NOT add them to PROJECT-DESIGN's allow-list either: they're one-off gradient stops, and polluting the brand-color allow-list with decorative gradient midpoints would weaken the off-palette check's signal. **Left as accepted warnings.**
- **[doesn't fit / tooling gap] The off-palette matcher can't tell "decorative gradient stop" from "stray off-brand text color".** On EDS marketing pages, gradient/glass decoration legitimately uses many tints. → noted as a possible future matcher refinement (e.g. skip colors that appear only inside `linear-gradient(`), but NOT worth building now — favoring the human triage step is fine. Parked as an open question.
- **[works] color-craft's "extract source palette first / identity-preservation" framing made the triage decision obvious** — without it I might have "corrected" brand gradient stops toward tokens, which would be wrong.

### I4 — layout-craft lens (2026-06-17)
**Verdict: hierarchy + rhythm sound; one real EDS-vs-greenfield tension surfaced. No change (validated foundation + identity).**
- **Hierarchy (squint proxy):** each page has a clear primary (84px hero h1) → section eyebrow+48px h2 → block content ladder. Index/one read cleanly; enterprise's dark 46/48px headings are distinct. No flat-hierarchy or all-equal-weight failure.
- **[doesn't fit — important EDS tension] layout-craft's "rhythm not uniformity / vary section spacing" clashes with EDS's systematic section-padding model.** Measured homepage: 8 of 9 sections are a **uniform 60px** top/bottom (only the marquee is `section-flush` 0). impeccable (greenfield) would call uniform section padding monotone. **But on EDS the uniform `--section-padding` IS the foundation's vertical rhythm** — variation lives *within* sections (block gaps via `* + *`, card spacing) and via the `section-flush`/spacing variants, not by hand-tuning each section's outer padding. Hand-varying section padding would (a) break the validated foundation and (b) fight the `vertical-spacing-system`. **Decision (solo): no change.** → fold into `layout-craft`: on EDS, "rhythm" means within-section variation + the section-style spacing variants, NOT per-section outer-padding tuning; the uniform section padding is correct.
- **[works] cards check:** the card grids (carousel cards, cards-icon) are real distinct/actionable content, not lazy filler, and aren't nested — passes layout-craft's cards-are-lazy bar. The stats-facts/visibility blocks deliberately break card monotony. Good.

### I5 — responsive-adaptation lens (2026-06-17)
**Verdict: the highest-value check (nav hover-vs-touch) PASSES; overflow guards already reasonable. No fix needed; one additive recommendation parked.**
- **[works — biggest win of the lens] The mega-menu opens on `click` (toggles `aria-expanded`), NOT hover.** `header.js:190` is a `click` listener; CSS opens panels on `[aria-expanded='true']`, and the only `:hover` rules are link-color affordances *inside* an already-open panel. Plus keyboard handlers (keydown/focusout/Escape). → **the nav is touch-correct out of the box** — responsive-adaptation's #1 rule ("never gate functionality on hover") is satisfied. This is the single most valuable thing the lens checks and it's clean. Worth noting: EDS's boilerplate nav is click-based by default, so this is partly a platform win, not just ours.
- **[works] overflow guards already present:** global `a:any-link { overflow-wrap: break-word }` (styles.css:222), `min-width:0` on grid children in footer/header/insights-widget, and a global `html,body { overflow-x: clip }` (brand.css). No observed author-text overflow; detector found none.
- **[recommendation, parked — not forced] A global `overflow-wrap: break-word` on default-content `h*,p` (not just links) would fully harden author text** for long unbroken strings (URLs, German compounds). I did NOT add it: it touches the global foundation, there's no observed defect, and it's a judgment call better confirmed with the user. → Open question for the user.
- **[doesn't fit / N/A] adapt.md's app-shell advice (bottom-nav, bottom-sheets, master-detail) is irrelevant to a marketing-site migration** — correctly skipped. The portable EDS-relevant parts are exactly the two above (input-method/hover + overflow guards); the rest of adapt.md is greenfield-app shaped.

### I6 — radius backlog + a detector refinement (2026-06-17)
**Outcome: tokenized 4 exact-match radii (zero-visual), and REFINED the `craft-radius-raw` matcher to kill false-noise. Detector 13→5.**
- Tokenized the 4 radii that **exactly equal a token**: insights-widget `8px`→`--radius-m`, teaser `8px`×2→`--radius-m`, teaser `12px`→`--radius-l`. Zero-visual, lint clean.
- **[tooling improvement — real learning] The original `craft-radius-raw` matcher flagged EVERY raw radius once any `--radius` token existed** (`|| allow.radii.size > 0`). On a real project that's noise: blocks legitimately use off-scale component radii (6px glass insets, 2px chips, 16px stat tiles) that have NO matching token and shouldn't be force-snapped (snapping = visual change). **Refined the matcher to flag ONLY radii that equal an existing token value** — i.e. the actionable zero-visual swap. Off-scale radii are now treated as intentional. Re-proved it still fires on a genuine `8px`=`--radius-m` violation. This made the detector go from 13→5 findings, all 5 now being the accepted brand gradient stops. → **General lesson for our detector: a checker should flag the *actionable* case, not every theoretical deviation; over-flagging trains the agent to ignore it.** (Mirrors impeccable's "favor false-negatives" design.)
- The 6/2/16px radii: **accepted as intentional** (Identity-Preservation — component-specific brand radii).


### Tokenization pass (2026-06-17) — "tokenize as much as meaningful"
**Outcome: tokenized ~30 literals that match a token (zero-visual); reverted 5 that would have changed mobile rendering. Lint clean, detector still 5 (accepted brand gradients), desktop+mobile computed values verified unchanged.**

Tokenized (zero-visual, verified): block-CSS + styles.css literals matching a token in the same semantic category — `font-size` (body-s/m/l, label), `gap`/`padding` single-value (space-xs…2xl), `letter-spacing` (tracking-*), `transition` `0.2s`→`--transition-fast`, white surfaces → `--background-color`, inverse button fills → `--color-inverse`, exact-match radii → `--radius-*`.

- **[BIG LESSON — non-obvious, EDS-relevant] A literal is only safely tokenizable if the token's RESPONSIVE behavior matches the literal's intent.** Several font-size tokens are **responsive-variable** (`--font-size-heading-m` 24→18px <768, `--font-size-heading-xl` 64→32px <1024, `--font-size-heading-l` 48→32, `--font-size-display` 84→56). Replacing a **fixed** literal (e.g. a stat number's `64px`, a hero subtitle's `24px`, an icon glyph's `24px`) with one of these tokens silently SHRINKS it on mobile — a real regression, not a zero-visual swap. The `--space-*`, `--font-size-body-*`, `--tracking-*`, radius, color, and transition tokens are all **fixed** (single definition) → always safe.
  - **Caught + reverted 5:** `columns-stats` mobile stat (`64px` inside a `<768` block → `--font-size-heading-xl` would have been 32px there — worst case, halved); carousel `‹/›` nav glyph + `+` expand glyph (icons, not headings — also kept fixed); enterprise hero subtitle (`24px`, spec-comment says intentional) and case-study stat number (`64px` display). Each reverted to the literal **with an inline comment** explaining why it must not use the responsive token.
  - **Rule of thumb for future tokenization:** before swapping a `font-size` literal for a `--font-size-heading-*`/`display` token, check (a) is the literal inside an `@media` block? and (b) does the element render on mobile? If either makes the token's mobile value wrong, keep the literal. Body/space/tracking/radius/color tokens have no such hazard.
  - **Also: icon glyphs ≠ headings.** A `‹`/`›`/`+` glyph sized to fill a fixed button is not a heading; even when the value matches `--font-size-heading-m`, using a heading token there is semantically wrong AND drags in unwanted responsive shrink. Keep a literal (or a future dedicated `--icon-*` token).
- **[works] `--background-color` for white surfaces, `--color-inverse` for inverse ink/fills** — the two are semantically distinct and the right call per case (white nav/section background = `--background-color`; white-on-dark button fill/text = `--color-inverse`). Don't blanket-`replace_all` `#fff`.
- **[tooling] The detector stayed at 5 throughout** — it doesn't (yet) reward tokenization of fixed font-size/spacing literals (only radius/inverse/dup/off-palette have matchers). So this pass was driven by a one-off analysis script, not the detector. A possible future matcher: "literal `font-size`/`gap`/`padding`/`letter-spacing` that equals a FIXED (non-responsive) token → suggest the token." Parked (the responsive-token hazard makes it tricky to auto-suggest safely — exactly the lesson above).
