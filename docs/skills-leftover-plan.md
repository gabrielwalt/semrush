# Semrush Skills — Leftover Execution Plan

*Last updated: 2026-06-24. Reflects post-compaction state plus the completed extraction/trigger/AGENTS batch.*

---

## Executive Summary

- **52 skills.** All 4 compaction batches are done. The latest 5-item batch (trigger fix + two extractions + self-contained backup rule + `AGENTS.md` Project Files) is **executed and verified clean** — see "Recently completed" below. Working tree is uncommitted (docs + the 5 edited files).
- **`block-visual-iteration` trigger is fixed** — no longer fires on every CSS task; now scoped to a content-validated block needing pixel-match delta closure.
- **The two extractable CSS insights are preserved.** `overflow-x: clip` (from `project-footer-reveal-pattern`) and the three backdrop-filter pitfalls (from `project-glass-surface-pattern`) now live in `css-pitfalls-eds`. Those project skills can now be safely excluded in the boilerplate fork.
- **`marker-driven-import` owns its backup rule** — self-contained `cp`/`curl` restore guidance; no longer defers to `project-import-script-bundling`.
- **`AGENTS.md` has a `## Project Files` section** — fresh-boilerplate initialization sequence for `PROJECT-*.md` files is documented.
- **`eds-content-modeling` is verified clean** — grep found no Semrush-specific template names or token values. No edit needed.
- **The remaining work is the draft skills + two generalization/classification items.** `draft-project-setup` is the most blocking one before the boilerplate is usable on a new project. `project-cleanup` still carries Semrush-specific paths, and `craft-skills-field-notes.md` is still unclassified.

---

## Recently completed (this batch)

All five executed and verified clean (mechanical-corruption check passed; no repairs needed). Not yet committed.

| Was # | Task | Files | Result |
|-------|------|-------|--------|
| 1 | Narrow `block-visual-iteration` trigger | `skills/block-visual-iteration/SKILL.md`, `skills/README.md` | Description + README row now scope to a content-validated (GATE 1) block needing pixel-match delta closure; `PROACTIVELY`/`improve`/`iterate`/`critique`/`any block` removed. |
| 2 | Extract `overflow-x: clip` → `css-pitfalls-eds` | `skills/css-pitfalls-eds/SKILL.md` | New "`overflow-x: clip` vs `overflow: hidden` with sticky elements" section. Source skill ready to exclude. |
| 3 | Extract backdrop-filter/glass pitfalls → `css-pitfalls-eds` | `skills/css-pitfalls-eds/SKILL.md` | New "`backdrop-filter` and glass-effect pitfalls" section (non-opaque bg, light-bg border, inner radius = `calc(R − P)`). Source skill ready to exclude. |
| 4 | Self-contain backup rule in `marker-driven-import` | `skills/marker-driven-import/SKILL.md` | `cp` backup + `curl` restore inline; cross-reference to `project-import-script-bundling` removed from the rule and the See also line. |
| 5 | Add `## Project Files` to `AGENTS.md` | `AGENTS.md` | Table of every `PROJECT-*.md` file + purpose + create/update trigger; notes `PROJECT-DESIGN.md`/`PROJECT-STATUS.md` are required before `detect.mjs`/`project-state.mjs` work. |

---

## Current Project State

| Item | Value |
|------|-------|
| Git status | Uncommitted — the 5-item batch above plus these docs are modified in the working tree |
| Total skills | 52 |
| Untracked files | `cc-transcript-*.txt` (session logs, do not commit), `docs/skills-assessment/` (audit docs, separate decision), `docs/skills-leftover-plan.md` (this file) |
| Total skill lines | ~2,766 (css-pitfalls-eds grew from 53 to 75 after the two extractions) |
| Largest skills | `writing-skills` (165L), `migration-orientation` (108L), `eds-content-modeling` (104L), `craft-floor` (87L) |

---

## Prioritized Backlog

*The original P0 + four P1 items (trigger fix, two extractions, self-contained backup, `AGENTS.md` Project Files) are done — see "Recently completed" above. Open work is renumbered below; the next sensible batch is items 1–3 (+ optionally 4).*

| # | Priority | Task | Files | Why it matters | Proposed action | Risk | Confirm? |
|---|----------|------|-------|---------------|-----------------|------|----------|
| 1 | **P1** | Plan/draft `draft-project-setup` skill | New `skills/draft-project-setup/SKILL.md` | New project start is a recurring moment where agents on a fresh boilerplate hit broken `detect.mjs` calls on day one. No skill covers: initialize `PROJECT-*.md` stubs, install quality tools, wire stylelint, verify `aem up` works. **Most blocking item for boilerplate usability.** | Agree on recipe first with user. Write as `draft-` (prefix both directory and `name` field). | Medium | **Yes — agree on recipe first** |
| 2 | **P2** | Generalize `project-cleanup` — remove Semrush-specific paths and block names | `skills/project-cleanup/SKILL.md` | Currently references Semrush-specific file paths and block names. Blocks boilerplate fork readiness. | Read the file; replace specific names with generic placeholders. | Low | No |
| 3 | **P2** | Classify `skills/craft-skills-field-notes.md` | `skills/craft-skills-field-notes.md` | This file is either a project journal (exclude from boilerplate) or generalizable craft notes (keep). Currently unclassified. | Open the file and determine which it is. If project journal, mark ❌ in boilerplate-candidate-list. If generalizable, mark ✅ or convert to a proper skill. | Low | **Brief read needed** |
| 4 | **P2** | Write `draft-importer-diff-workflow` skill | New `skills/draft-importer-diff-workflow/SKILL.md` | `marker-driven-import` references "diff against reference" but doesn't codify the bash tooling. A concrete `curl` + `diff` / `wdiff` recipe closes the loop. | Write as `draft-`. No user confirmation needed — recipe is mechanical. | Low | No |
| 5 | **P2** | Write `draft-validation-gates` skill | New `skills/draft-validation-gates/SKILL.md` | No skill defines the explicit pass/fail criteria for content-validated or style-validated. Different sessions apply different gates. Current skills reference the flags without defining them. | Write as `draft-`. Define: what a page must demonstrate for each gate, who marks it, and what happens on regression. | Low | No |
| 6 | **P2** | Write `draft-unfreeze-page` skill | New `skills/draft-unfreeze-page/SKILL.md` | The Frozen-Tools Rule is currently one-way — freeze but no unfreeze protocol. When a client requests a revision to a validated page, there's no guidance on what to do. | Agree on recipe. Write as `draft-`. Key steps: identify all pages sharing tools with the frozen page, run `excat-visual-critique` on each, get explicit re-validation before re-freezing. | Medium | **Yes — agree on recipe first** |
| 7 | **P2** | Write `draft-source-change-handling` skill | New `skills/draft-source-change-handling/SKILL.md` | No guidance on what to do when the source site changes mid-migration. Agents triage incorrectly (re-import everything vs manual update). | Write as `draft-`. Key decision tree: classify change as structural (re-import block) vs content (manual update) vs visual (re-run style gate). | Low | No |
| 8 | **P3** | Write `draft-performance-guardrails` skill | New skill | No skill covers CLS, LCP, `loadBlock` sequencing, or performance budgets. Silent regressions are possible on any block change. | Write as `draft-`. Not urgent until a project page ships. | Medium | No |
| 9 | **P3** | Write `draft-aem-cli-troubleshooting` skill | New skill | No skill covers `aem up` failure modes, local vs remote content distinction, `localhost:3000` vs `.hlx.page` behavior. Friction point on every project. | Write as `draft-`. | Low | No |

---

## Recommended Next Batch

The previous batch (trigger fix + two extractions + backup rule + Project Files) is complete. The next batch shifts from quick edits to **writing the missing skills + two readiness cleanups**. Items 2 and 3 are low-risk and need no confirmation; item 1 needs a recipe agreed with the user first.

### 1 — Plan/draft `draft-project-setup` (P1, most blocking)

**File:** new `skills/draft-project-setup/SKILL.md` (prefix both the directory and the `name:` field with `draft-`).

**Why first:** without it, an agent on a fresh boilerplate hits broken `detect.mjs`/`project-state.mjs` calls on day one because the `PROJECT-*.md` stubs don't exist yet.

**Recipe to agree with the user before writing:**
- Initialize the `PROJECT-*.md` template stubs (the set + create-order now documented in `AGENTS.md` § Project Files).
- Ensure `PROJECT-DESIGN.md` (≥ `## Design Tokens` + `:root`) and `PROJECT-STATUS.md` (Pages table headers) exist so the quality tools run.
- Install quality tools / wire stylelint; verify `aem up` works.
- Confirm with the user before drafting — this is the contract every later session depends on. **Needs confirmation.**

---

### 2 — Generalize `project-cleanup` (P2)

**File:** `skills/project-cleanup/SKILL.md`

Read the file and replace Semrush-specific file paths and block names with generic placeholders, keeping the multi-pass cleanup structure intact. Required for boilerplate-fork readiness. Low-risk, no confirmation needed.

---

### 3 — Classify `craft-skills-field-notes.md` (P2)

**File:** `skills/craft-skills-field-notes.md`

Open it and decide: project journal (→ mark ❌ exclude in `boilerplate-candidate-list.md`) or generalizable craft notes (→ mark ✅ keep, or convert to a proper skill). Update the 🔬 Review row in `boilerplate-candidate-list.md` with the decision. Brief read; low-risk.

---

### Optional add-ons if the batch has room

- **4 — `draft-importer-diff-workflow` (P2):** mechanical `curl` + `diff`/`wdiff` recipe that closes the loop `marker-driven-import` references. No confirmation needed.
- **5 — `draft-validation-gates` (P2):** define explicit pass/fail criteria for content-validated / style-validated, who marks them, and regression handling. No confirmation needed.

---

## Do Not Do Yet

| Task | Why |
|------|-----|
| Remove `eds-migration-process` | Overlap-classification says it duplicates helix `page-import`, but the 2-gate workflow (GATE 1 content, GATE 2 style) and the per-phase skills table are EMA-specific and load-bearing. Removing it is incorrect. |
| Merge four craft skills into one `design-craft` | High risk of context bloat; the individual skills are clean and well-scoped. The global-style-foundation skill already orchestrates them. |
| Add Recipe sections to four craft skills | High risk of adding noise — the craft skills are currently clean after compaction. This is a significant authoring task that needs careful design, not a quick edit. |
| Merge `session-startup` + `session-close` | Works as-is. Not worth the disruption. |
| Evaluate `eds-dom-structure` as upstream duplicate | Low urgency; provides a useful EDS selector cheat sheet. Keep for now; revisit when preparing an upstream PR. |
| Commit transcript or `docs/skills-assessment/` | Transcript is working notes. Assessment docs are an audit artifact. Separate decision for the user. |

---

## Verification Commands (completed batch — all passing)

These confirm the just-completed 5-item batch. Re-run any time to re-verify:

```bash
# 1. block-visual-iteration trigger fixed
grep -n "PROACTIVELY" skills/block-visual-iteration/SKILL.md
# Expected: no output ✅

# 2. css-pitfalls-eds grew after the two extractions (sections added)
wc -l skills/css-pitfalls-eds/SKILL.md
# Expected: 75 lines (was 53) ✅

# 3. marker-driven-import no longer defers to project-import-script-bundling
grep -n "project-import-script-bundling" skills/marker-driven-import/SKILL.md
# Expected: no output ✅

# 4. marker-driven-import contains the curl restore command
grep -n "curl.*plain\|cp content" skills/marker-driven-import/SKILL.md
# Expected: the backup/restore line ✅

# 5. AGENTS.md has the Project Files section
grep -n "## Project Files" AGENTS.md
# Expected: the section heading ✅
```
