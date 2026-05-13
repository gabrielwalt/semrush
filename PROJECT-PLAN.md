# PROJECT-PLAN.md — Implementation Gap Tasks

Actionable backlog derived from the requirements audit (May 2026).  
**Pick the first `🔲 Open` task, implement it fully, mark it `✅ Done`, then move to the next.**  
Each task is self-contained: file paths, required values, and acceptance criteria are all inline.

---

## How to work this list

1. Read the task. Read the files it references before touching anything.
2. Implement the change. Run `npm run lint` after every code change.
3. Verify visually at `localhost:3000` against the original at `https://www.semrush.com/`.
4. Mark the task `✅ Done` and update `PROJECT-STATUS.md` if the task closes a known issue.
5. Move to the next `🔲 Open` task.

---

## Part 1 — Meta-work: Skills & Learning Loop

*Do these first. The agent works better when it works correctly, so fixing the methodology infrastructure pays off on every subsequent task.*

---

### M01 — Consolidate skills into a single file format

**Status:** ✅ Done — 23 flat .md files deleted; 4 project-specific skills properly prefixed (`project-footer-reveal-pattern`, `project-section-heading-pattern`); content from flat files merged into directory versions; `_template.md` updated to directory/frontmatter format  
**Priority:** P0-meta — structural chaos makes the skill system unreliable  
**Files:** `skills/` (entire directory)

**Problem:**  
19 skills currently exist in **two different formats simultaneously** — as a root-level flat `.md` file AND as a `{name}/SKILL.md` directory file. These two versions have diverged: the flat files were written first, the directory versions were written later and sometimes have different content. When the agent reads `skills/README.md` (which links to flat files) and when it follows the AGENTS.md rule ("each is a directory with a `SKILL.md` file"), it reads different content for the same skill.

The 19 duplicated skills are:
`block-rename-checklist`, `block-rename-in-eds`, `carousel-pattern-eds`, `css-specificity-eds`, `eds-content-patterns`, `eds-dom-structure`, `import-script-bundling`, `importer-parser-patterns`, `max-width-container-pattern`, `measure-then-implement`, `mobile-nav-click-handling`, `nav-header-eds`, `page-template-metadata`, `plain-html-format`, `responsive-verification`, `stylelint-no-descending-specificity`, `vertical-spacing-system`, `video-in-eds`, `writing-skills`

Additionally, these 4 skills exist ONLY as flat `.md` files with no directory version:
`background-layering.md`, `clip-path-bar-charts.md`, `glass-surface-pattern.md`, `mega-menu-content-model.md`

**Fix — for each of the 19 duplicated skills:**
1. Read BOTH versions (flat `.md` and `{name}/SKILL.md`)
2. Merge the best content of both into the directory `SKILL.md` — the directory version is canonical per AGENTS.md
3. Delete the flat `.md` file

**Fix — for the 4 flat-only skills:**
1. Create a `{name}/` directory
2. Move the content into `{name}/SKILL.md`, adding the frontmatter format (see `_template.md`)
3. Delete the flat `.md` file

**Fix — for `_template.md`:**  
Update `_template.md` to show the directory/SKILL.md format (with frontmatter), not the flat format.

**Acceptance criteria:**
- `ls /app/skills/*.md` returns only `README.md` and `_template.md` — no other flat skill files
- Every skill is a directory with a `SKILL.md` inside
- `npm run lint` passes
- AGENTS.md rule "each is a directory with a SKILL.md file" is satisfied everywhere

---

### M02 — Rebuild the skills/README.md index to cover all skills

**Status:** ✅ Done — All 38 skills indexed in 7 categorized sections (Always load, Layout & CSS, Nav & Header, Content & Authoring, Blocks & Patterns, Import & Migration, Block Renaming, Skills Library, Project-specific). Symptoms-first trigger phrases throughout.  
**Priority:** P0-meta — the index is the agent's skill-matching mechanism; incomplete = skills never loaded  
**Files:** `skills/README.md`, `AGENTS.md`

**Problem:**  
`skills/README.md` currently indexes only ~25 of the ~31 skill directories. Missing from the index:
- `eds-code-conventions` — the core coding rules skill
- `eds-content-modeling` — content structure decisions
- `eds-migration-process` — the two-phase migration workflow
- `eds-troubleshooting` — EDS docs search
- `eds-section-style-icons` — decorative section icons
- `footer-reveal-pattern` — the SEMRUSH sticky reveal architecture
- `section-heading-pattern` — eyebrow + uppercase section heading
- `writing-skills` — how to create/audit skills
- `block-visual-iteration` — proactive pixel-match workflow
- `project-background-layering`, `project-clip-path-bar-charts`, `project-glass-surface-pattern`, `project-mega-menu-content-model` — all 4 project-specific skills

A skill that is not in the index will never be found and loaded. It is effectively dead.

**Fix:**  
Rewrite `skills/README.md` to:
1. Include every skill directory
2. Write "Load when..." trigger phrases that match the EXACT words an agent would think when stuck — not what the skill teaches, but what symptom triggers it
3. Mark project-specific skills with `[project]` prefix
4. Keep it scannable: one row per skill, sorted by frequency of use

**Also update AGENTS.md:**  
The AGENTS.md currently contains its own duplicate skill index table. Remove it — the README is the single index. Replace with a one-liner: "Scan `skills/README.md` — the trigger phrase tells you when to load it."

**Acceptance criteria:**
- Every directory in `skills/` has a corresponding row in `skills/README.md`
- AGENTS.md no longer contains a duplicate skill index table
- The README trigger phrases are written from the "stuck agent" perspective — symptoms, not topics

---

### M03 — Add missing meta-skills: the three failure modes

**Status:** ✅ Done — Created `verify-before-claiming`, `regression-guard`, `measure-first`; all indexed in README under "Always load"  
**Priority:** P0-meta — these skills prevent the most costly recurring agent failures  
**Files:** `skills/` (new directories), `skills/README.md`

**Problem:**  
The issues log (`conversations/issues/all-issues.md`) shows three failure patterns that occurred across all 6 conversations:

1. **Declaring done without verifying** — "Fix declared without verification" occurred in every session. The agent wrote code, said it was done, and Gabriel had to re-prompt to discover it wasn't working.

2. **Regressing something while fixing something else** — "When fixing the max-width, we lost the pattern-hero background" (Conv04 P17). The agent has no formal step to check what it might have broken.

3. **Not measuring before implementing** — Logo sizing oscillated between too big and too small across multiple prompts (Conv04, Conv05) because the agent guessed rather than measuring. Gabriel wrote "FRUSTRATION IS BUILDING UP!!" (Conv04 P20).

These are not EDS-specific problems — they're agent-behavior problems that need to be encoded as skills so the agent loads them automatically when relevant.

**Create skill: `skills/verify-before-claiming/SKILL.md`**

```markdown
---
name: verify-before-claiming
description: Protocol for verifying work before reporting it complete. Load ALWAYS before saying "done", "fixed", "implemented", or similar.
---

Never declare work complete based on having written the code. Verify the outcome directly.

## Recipe — After any code change
1. **Re-read the file you just edited** — confirm the change is actually there as written
2. **Run `npm run lint`** — confirm zero errors (not just "no new" errors)
3. **Check localhost:3000** — load the page, look at the component, confirm it renders as intended
4. **Compare against original** — open the original site at the same viewport, verify they match
5. Only THEN write "done" in your response

## Recipe — After any CSS change
Before editing: note the key computed values of the element AND its siblings/parents.
After editing: re-check those same values. If any untouched value changed, you introduced a regression.

## Pitfalls
- Writing code = not done. Saving the file = not done. Only verified output = done.
- "It should work" is not verification. "I checked at localhost:3000 and it renders correctly" is.
- Never use phrases like "this should fix it" or "that ought to work" — those are guesses, not confirmations.
- Lint passing is necessary but not sufficient — visual verification is required separately.
```

**Create skill: `skills/regression-guard/SKILL.md`**

```markdown
---
name: regression-guard
description: How to prevent introducing new bugs while fixing existing ones. Load before any CSS/JS change that touches shared or global code.
---

Every CSS edit on shared selectors (styles.css, block wrappers, section classes) risks affecting elements you didn't intend to change.

## Recipe
1. Before editing: identify all elements that share the selector you're about to change
2. Record their current key values (font-size, margin, padding, color, display)
3. Make the change
4. Check ALL identified elements — not just the one you were fixing
5. If any untouched element changed: undo, find a more specific selector, try again

## Common regression triggers
| What you change | What it can break |
|---|---|
| `h2` global styles | Every h2 on the page |
| `.section > div` | All section containers |
| `.button` / `.button-wrapper` | CTAs in every block |
| `styles.css` root tokens | Anything using that token |
| `main > .section` padding | All section spacing |

## Pitfalls
- Fixing one block's margin by editing the global section rule — breaks every section
- Removing a shared CSS custom property — silently breaks all blocks that inherit it
- "It looks fine in the hero" — check all sections, not just the one you're working on
```

**Create skill: `skills/measure-first/SKILL.md`**  
*(distinct from `measure-then-implement` — that one explains HOW; this one explains WHEN and WHY)*

```markdown
---
name: measure-first
description: Reminder to measure before guessing when matching sizes, spacing, or colors. Load when you're about to write a px value from memory or estimation.
---

## Key insight
If you don't know the value, measure it — never guess. Guessing creates a loop of corrections (too big → too small → still wrong) that costs many prompts. One measurement saves five corrections.

## When to measure (not guess)
- Any specific px value: font-size, height, width, padding, gap, margin
- Any color that isn't a project token
- Any animation duration
- Logo, icon, or image sizes

## How to measure
Load the `measure-then-implement` skill for the code patterns. In short:
- Use browser DevTools on the original site
- Use `getBoundingClientRect()` for dimensions
- Use `getComputedStyle()` for spacing, colors, font properties
- Check stylesheets directly for hover/transition values

## Pitfalls
- "Approximately 50px" is a guess, not a measurement
- Screenshot comparison misses letter-spacing, line-height, and sub-pixel differences
- Measuring on our implementation instead of the original — measure the SOURCE not the copy
```

After creating all three skills, add them to `skills/README.md` with trigger phrases that match the MOMENT of failure, not the topic.

**Acceptance criteria:**
- 3 new skill directories created with correct frontmatter
- All 3 indexed in `skills/README.md` with symptoms-first trigger phrases
- The `verify-before-claiming` skill is flagged in README as always-relevant (ALWAYS load)

---

### M04 — Add session startup and close rituals as skills

**Status:** ✅ Done — Created `session-startup` and `session-close`; indexed in README under "Always load"  
**Priority:** P1-meta — context loss between sessions is why decisions and corrections evaporate  
**Files:** `skills/` (new), `AGENTS.md`, `skills/README.md`

**Problem:**  
Sessions get context-compressed. When a new session starts, the agent loses the state of the previous session unless it reads state explicitly from files. Gabriel's issue log shows corrections being repeated across sessions — the agent didn't retain that it had already been told not to do something.

The most successful Claude Code setups encode an explicit **startup ritual** (what to read at the beginning of every session) and a **close ritual** (what to update at the end) so that session continuity is file-based, not memory-based.

**Create skill: `skills/session-startup/SKILL.md`**

```markdown
---
name: session-startup
description: What to do at the start of every new session to orient yourself and pick up where the last session left off.
---

At the start of every session, before doing any work:

## Startup sequence
1. Read `AGENTS.md` — rules, conventions, project reference table
2. Read `PROJECT-STATUS.md` — what's done, what's pending, known issues
3. Read `PROJECT-PLAN.md` — find the first 🔲 Open task; that's your starting point
4. Read `skills/README.md` — prime your trigger matching for the session's tasks
5. If the user's first message names a specific task or block, also load the matching skills

## What NOT to do at startup
- Don't re-read files you just read in the same session
- Don't propose a plan if a plan already exists in PROJECT-PLAN.md — just execute it
- Don't ask what to work on if PROJECT-PLAN.md has open tasks — start the first one

## State recovery
If you don't know what was last worked on:
1. Check `PROJECT-PLAN.md` — find the last completed task and the next open one
2. Check `PROJECT-STATUS.md` — the "current focus" note if present
3. Check recent git log: the last commit message summarizes what changed

## Pitfalls
- Starting work without reading PROJECT-PLAN.md — you'll duplicate or skip tasks
- Reading AGENTS.md but not PROJECT-STATUS.md — AGENTS.md doesn't tell you what's broken
```

**Create skill: `skills/session-close/SKILL.md`**

```markdown
---
name: session-close
description: What to do at the end of a session before handing off to the user. Ensures state is captured in files so the next session can resume cleanly.
---

At the end of every session (or when the user signals they're done):

## Close sequence
1. **Mark completed tasks** — in `PROJECT-PLAN.md`, change `🔲 Open` → `✅ Done` for every task completed this session
2. **Update PROJECT-STATUS.md** — update the progress table and block refinement table for anything that changed
3. **Capture skills** — for every non-obvious problem solved this session, create or update a skill
4. **Update AGENTS.md skill index** — if new skills were added, add them to the index
5. **Note current focus** — add a brief "Current focus" line to PROJECT-STATUS.md so the next session knows where to resume

## The skill capture test
Ask: "If the next agent starts fresh, what non-obvious thing would they have to re-discover that I just learned?"
If the answer is anything, write it as a skill.

## Pitfalls
- Updating PROJECT-STATUS.md with "done" when the task hasn't been verified visually
- Forgetting to add new skills to skills/README.md — the skill exists but is never found
- Leaving PROJECT-PLAN.md with ambiguous task states — next session won't know where to start
```

After creating both skills:
- Add to `skills/README.md` with "always load at session start/end" trigger language
- Add explicit startup/close steps to `AGENTS.md` Rules section

**Acceptance criteria:**
- Both skills created with correct frontmatter and actionable recipes
- AGENTS.md Rules section references the startup sequence (read these files, in this order, at session start)
- `skills/README.md` lists both with trigger phrases

---

### M05 — Update stale skills with current implementation facts

**Status:** ✅ Done — Updated: `mobile-nav-click-handling` (closeOnFocusLost recipe added), `eds-section-style-icons` (selector updated to `section-dark.section-pattern-bars`, deprecated `section-ai-visibility`), `nav-header-eds` (transparent bg, nav-open on both elements, --nav-top-offset pattern), `eds-code-conventions` (full-width escape hatch inlined)  
**Priority:** P1-meta — stale skills actively mislead; the agent follows them and produces wrong output  
**Files:** `skills/mobile-nav-click-handling/SKILL.md`, `skills/eds-section-style-icons/SKILL.md`, `skills/nav-header-eds/SKILL.md`, `skills/eds-code-conventions/SKILL.md`

**Problem:**  
Four skills contain information that is now outdated or incomplete given what was learned in Convs 01–06:

**`mobile-nav-click-handling`** — covers click delegation inside nav panels but does NOT mention the `closeOnFocusLost` focusout bug (Conv05 P13, Conv06 P43). An agent loading this skill to fix mobile nav issues would miss the root cause of T01.

**`eds-section-style-icons`** — the recipe binds `::before` to `.section-ai-visibility`. After T05, the correct binding is `.section-dark.section-pattern-bars`. An agent loading this skill would apply the deprecated class name.

**`nav-header-eds`** — doesn't mention: (a) the transparent header requirement, (b) the `--nav-top-offset` CSS variable pattern for announcement bar offset, (c) the `header.nav-open` class that must be set on BOTH `header` and `.nav-wrapper`.

**`eds-code-conventions`** — says "No `!important` — see `max-width-container-pattern` skill" but the `max-width-container-pattern` skill doesn't clearly explain the JS `.full-width` pattern. The chain breaks. Should inline the escape hatch pattern.

**Fix for each:**

`mobile-nav-click-handling` — add a second recipe section:
```markdown
## Also: closeOnFocusLost mobile bug
`focusout` fires with `e.relatedTarget === null` on mobile taps. `nav.contains(null)` 
returns false, incorrectly triggering menu close. Fix: early-return on mobile.

```js
function closeOnFocusLost(e) {
  if (!isDesktop.matches) return; // null relatedTarget on mobile taps
  ...
}
```

`eds-section-style-icons` — update the example selector from `.section-ai-visibility` to `.section-dark.section-pattern-bars` and add a note about the naming pattern.

`nav-header-eds` — add: transparent desktop background, `nav-open` on BOTH elements, `--nav-top-offset` variable for announcement bar.

`eds-code-conventions` — inline the `.full-width` escape hatch:
```markdown
## Full-width escape hatch (never use !important)
```js
// In decorate():
block.closest('.{block}-wrapper')?.classList.add('full-width');
```
Defined globally in styles.css: `main > .section > .full-width { max-width: none; padding: 0; }`
```

**Acceptance criteria:**
- Each of the 4 skills updated with the missing information
- No skill references `section-ai-visibility` as the current pattern
- `eds-code-conventions` has the full-width JS snippet inline
- `mobile-nav-click-handling` has the `closeOnFocusLost` early-return pattern

---

### M06 — Add AGENTS.md session startup instruction and tighten skill-loading rule

**Status:** ✅ Done — startup/close sequences added to AGENTS.md Rules; duplicate skill index table removed; skill-loading instruction tightened  
**Priority:** P1-meta — the agent needs explicit behavioral instruction, not just a skill it might not load  
**Files:** `AGENTS.md`

**Problem:**  
The current AGENTS.md Rules section says "Before any task: scan `skills/README.md`, load matching skills, follow recipes before inventing" — but this is easy to miss under context pressure, and it says nothing about what to do at session START (before the first task). The result is sessions where the agent begins work without reading current state, then makes decisions that contradict things Gabriel already established.

Also: "scan `skills/README.md`" is too vague. The agent should know HOW to scan it — match the "Load when..." phrase to the current situation, not read every skill in full.

**Fix — Add to AGENTS.md Rules section (after the existing rules, before Skills System section):**

```markdown
**Session startup.** At the start of every new conversation — before responding to any request:
1. Read `PROJECT-STATUS.md` — understand current state and known issues
2. Read `PROJECT-PLAN.md` — find the first 🔲 Open task; that is the default next action
3. Read `skills/README.md` — scan the "Load when..." column; load any skill whose trigger matches the session's work
Do not propose a new plan if one exists. Do not ask what to work on if PROJECT-PLAN.md has open tasks.

**Session close.** Before ending any session:
1. Mark completed tasks `✅ Done` in `PROJECT-PLAN.md`
2. Update `PROJECT-STATUS.md` — progress table and current focus
3. For every non-obvious problem solved: create or update a skill immediately
```

**Fix — Tighten the skill-loading instruction:**

Replace:
> Before any task: scan `skills/README.md`, load matching skills, follow recipes before inventing.

With:
> Before any task: scan the "Load when..." column in `skills/README.md`. If a trigger phrase matches what you are about to do or the symptom you're seeing, read that skill in full before proceeding. Do not read skills whose trigger doesn't match — stay focused.

**Acceptance criteria:**
- AGENTS.md has explicit startup and close sequences in the Rules section
- Skill-loading instruction is precise about HOW to scan (match trigger phrases, not read all)
- The instruction to check PROJECT-PLAN.md first is explicit

---

### M07 — Create a `full-width-escape-hatch` skill and audit all blocks for !important

**Status:** ✅ Done — Created `full-width-escape-hatch` skill; indexed in README under "Layout & CSS" with trigger phrase targeting the moment of temptation  
**Priority:** P1-meta — the most violated coding rule needs its own dedicated skill so future agents find it automatically  
**Files:** `skills/full-width-escape-hatch/` (new), `skills/README.md`

**Problem:**  
"No `!important`" is a core project rule (Conv02 P26). It is violated in 9 block CSS files. The fix pattern (`.full-width` JS class) exists and works — `carousel-slider.js` already uses it correctly. But there is no dedicated skill for it, and `eds-code-conventions` only mentions it with a cross-reference that leads nowhere actionable.

The result: every time an agent writes a new full-bleed block, it reaches for `!important` because that's the obvious CSS solution. A skill with the right trigger phrase ("block needs to escape max-width container", "need full viewport width") would intercept this before the mistake happens.

**Create skill: `skills/full-width-escape-hatch/SKILL.md`**

```markdown
---
name: full-width-escape-hatch
description: Making a block span the full viewport width while the global container constrains everything else. Use whenever a block needs to escape the max-width container.
---

## Key insight
Never use `max-width: none !important` or `padding: 0 !important` on block wrappers.
The `.full-width` utility class handles this globally and cleanly.

## Recipe
```js
// In the block's decorate() function:
const wrapper = block.closest('.{block}-wrapper');
if (wrapper) wrapper.classList.add('full-width');
```

In styles.css (already defined globally — do not repeat in block CSS):
```css
main > .section > .full-width {
  max-width: none;
  padding: 0;
}
```

That's it. No CSS changes needed in the block file.

## When to use
Block needs viewport-width bleed (marquee, announcement bar, video hero, carousel edge-bleed).
Section background color must reach the viewport edge.
Any time you're tempted to write `max-width: 100% !important`.

## Pitfalls
- Adding a JS file just for `full-width` to blocks that have no decorate() yet — add a minimal JS file
- Setting `.full-width` on the block itself (not the wrapper) — it must be on the `-wrapper` element
- Repeating the `.full-width` CSS rule in the block's own CSS — it's global, don't duplicate
- Using `!important` in block CSS — this is the wrong approach and violates project rules
```

After creating the skill:
- Add to `skills/README.md` with trigger phrase matching the moment of temptation: "block needs to escape max-width" / "need full viewport width" / "about to write !important on a wrapper"

**Note:** The implementation fix (removing all `!important` from existing blocks) is in task T08. This task is about the skill — the tool that prevents the mistake in the future.

**Acceptance criteria:**
- Skill created with frontmatter
- Recipe clearly shows the JS pattern AND says the CSS is global (don't duplicate)
- Added to README with a trigger phrase that fires BEFORE the mistake (not after)

---

### M08 — Add "Current Focus" to PROJECT-STATUS.md and establish update convention

**Status:** ✅ Done — Current Focus section added to PROJECT-STATUS.md  
**Priority:** P2-meta — provides session continuity without relying on conversation memory  
**Files:** `PROJECT-STATUS.md`

**Problem:**  
When context is compressed between sessions (which happened at least twice in this project), the next session has no way to know: what was being worked on, what decision was made most recently, or what was left half-done. PROJECT-STATUS.md has progress tables but no "what is the agent doing right now" indicator.

**Fix:**  
Add a "Current Focus" section at the very top of `PROJECT-STATUS.md`, directly below the title. This section is updated at the end of every session and read first at the start of the next.

```markdown
## Current Focus

**Last updated:** 2026-05-13  
**Branch:** `aem-merged-20260513`  
**Active task:** M01 — Consolidate skills into single file format  
**Last completed:** PROJECT-PLAN.md created (meta-tasks M01–M08 + implementation tasks T01–T14)  
**Next up:** M01 → M02 → M03 in sequence  
**Blocker:** None
```

Convention:
- Update this section at the end of every session (it's part of the session-close ritual)
- Keep it to 6 lines max — it's a bookmark, not a log
- "Active task" = the task currently being worked on (or the first open task)
- "Last completed" = the last thing finished this session

**Acceptance criteria:**
- Current Focus section added to PROJECT-STATUS.md at the top
- Section is 6 lines or fewer
- Values are filled in with the actual current state (branch, active task, etc.)

---

## Part 2 — Implementation Gaps

---

### T01 — Fix mobile nav `closeOnFocusLost` bug + hamburger alignment

**Status:** 🔲 Open  
**Priority:** P0 — functional bug affecting every mobile user  
**Files:** `blocks/header/header.js`, `blocks/header/header.css`

**Problem A — closeOnFocusLost:**  
`closeOnFocusLost` fires on mobile when a user taps a link inside the expanded nav panel. On mobile, `e.relatedTarget` is `null` after a tap, so `nav.contains(null)` returns `false`, which incorrectly triggers `toggleMenu(nav, navSections, false)` and closes the menu before navigation occurs.

**Fix A:**  
Add an early return at the very top of `closeOnFocusLost` when on mobile:

```js
function closeOnFocusLost(e) {
  if (!isDesktop.matches) return;   // ← add this line
  const nav = e.currentTarget;
  ...
}
```

**Problem B — Hamburger placement (Conv04 P36, P37):**  
The hamburger icon must be on the **right side** of the mobile header, not the left. It must be **vertically centered** in the header height. It must be moved **further from the right edge** — use a gap that looks harmonious (e.g., `1rem` / `16px`).

**Fix B:**  
In `header.css`, ensure:
```css
@media (width < 1024px) {
  .nav-hamburger {
    margin-left: auto;
    margin-right: 16px; /* adjust for harmonious gap */
    align-self: center;
  }
}
```

**Acceptance criteria:**
- Tapping a link inside the open mobile menu navigates correctly without the menu flickering closed first.
- Desktop mega-menu still closes on focus loss (existing behaviour must not regress).
- Hamburger is right-aligned and vertically centered at all mobile viewports.
- Clicking sub-items of open panels does not close the menu (parent `li`'s `preventDefault` must not intercept child link clicks).

---

### T02 — Testimonials: quote text size and font

**Status:** 🔲 Open  
**Priority:** P1 — visual spec failure on a hero-area block  
**Files:** `blocks/testimonials/testimonials.css`

**Problem:**  
Quote text renders at 18px (`--font-size-body-l`). Requirement (Conv06 P8): **26px, weight 500, line-height 1.5, Lazzer font**.

**Fix:**  
Update `.testimonials .quote-card blockquote`:

```css
.testimonials .quote-card blockquote {
  font-family: var(--heading-font-family);
  font-size: 26px;
  font-weight: 500;
  line-height: var(--line-height-relaxed); /* 1.5 */
  margin: 0 0 var(--space-m);
  padding: 0;
  border: none;
}
```

**Acceptance criteria:**
- Quote text is 26px Lazzer at weight 500 on desktop.
- Mobile: verify the text doesn't overflow at small viewports — add a responsive reduction if needed.

---

### T03 — Testimonials: add decorative quote marks

**Status:** 🔲 Open  
**Priority:** P1 — missing design element called out explicitly (Conv06 P8)  
**Files:** `blocks/testimonials/testimonials.css`

**Problem:**  
Decorative opening/closing quotation marks are absent. The original site displays large typographic `"` marks as decorative elements on the quote card.

**Fix:**  
Add `::before` on the blockquote to render an opening quote mark. Inspect the original at `https://www.semrush.com/` with DevTools to get the exact size, color, and positioning. Implement as a CSS pseudo-element — never add content to the JS.

Example pattern (values to be confirmed against the original):
```css
.testimonials .quote-card blockquote::before {
  content: '\201C';
  display: block;
  font-size: 64px;
  line-height: 1;
  color: var(--accent-color);
  margin-bottom: var(--space-xs);
  font-family: var(--heading-font-family);
}
```

**Acceptance criteria:**
- A decorative opening quote mark renders above the quote text on the dark card.
- The mark is sized and colored to match the original site.
- No JS changes — pure CSS pseudo-element.

---

### T04 — Testimonials: stats card layout and background pattern

**Status:** 🔲 Open  
**Priority:** P1 — two visual spec failures on the stats card (Conv06 P8)  
**Files:** `blocks/testimonials/testimonials.css`

**Problem A — Alignment:**  
Stats card is `justify-content: center; align-items: center; text-align: center`. Requirement (Conv06 P8): number **top-left** at **64px / weight 600**, label **bottom-left** at **18px / weight 500**, `justify-content: space-between`.

**Problem B — Background pattern:**  
Stats card has a plain grey background. The original has a decorative SVG pattern overlay (same hatching used in carousel cards). A `pattern-stats.svg` or similar must be applied.

**Fix — Alignment:**
```css
.testimonials .stats-card {
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
  padding: var(--space-l);
}

.testimonials .stats-card .stat-number {
  font-size: 64px;
  font-weight: 600;
  line-height: 1;
}

.testimonials .stats-card .stat-label {
  font-size: 18px;
  font-weight: 500;
}
```

**Fix — Pattern:**  
Inspect the original stat card background at `https://www.semrush.com/`. If a pattern SVG is used, reference it. The carousel card uses `/content/images/pattern-toolkit-card.svg` — check if the same applies here, or if a different pattern is needed.

```css
.testimonials .stats-card {
  background-image: url('/content/images/pattern-toolkit-card.svg');
  background-repeat: no-repeat;
  background-position: bottom right;
}
```

**Acceptance criteria:**
- Stats number renders top-left at 64px/600.
- Stats label renders bottom-left at 18px/500.
- A background pattern is visible on the stats card, matching the original.

---

### T05 — Define `section-pattern-bars` section style

**Status:** 🔲 Open  
**Priority:** P1 — the section style is referenced in requirements but has zero CSS definition  
**Files:** `styles/styles.css`, `blocks/stats-visibility/stats-visibility.css`

**Problem:**  
The requirement (Conv05 P5, P7) says stats-visibility uses two Section Metadata styles: `section-dark` (dark background) and `section-pattern-bars` (decorative bar SVG background). The import parser should emit both. However:
- `section-pattern-bars` is not defined anywhere in CSS.
- The background pattern SVG is currently attached to the obsolete `section-ai-visibility` class inside `stats-visibility.css`.

**Fix — Step 1:** Move the pattern-bars background rule from `stats-visibility.css` into `styles/styles.css` as a global section style:

```css
/* in styles/styles.css */
main .section.section-pattern-bars {
  background-image: url('/icons/pattern-ai-vis-index.svg');
  background-repeat: repeat-x;
  background-position: 0% 100%;
}
```

**Fix — Step 2:** Remove the now-redundant rule from `stats-visibility.css`:
```css
/* DELETE from stats-visibility.css: */
.section.section-ai-visibility {
  background-image: url('/icons/pattern-ai-vis-index.svg');
  ...
}
```

**Fix — Step 3:** Update the sparkle icon `::before` rule in `stats-visibility.css` to use the new class names:
```css
/* CHANGE: .section.section-ai-visibility → .section.section-dark.section-pattern-bars */
.section.section-dark.section-pattern-bars > .default-content-wrapper::before { ... }
.section.section-dark.section-pattern-bars > .default-content-wrapper { text-align: center; }
```

**Fix — Step 4:** Update `PROJECT-BLOCKS.md` to reflect that `section-ai-visibility` is now deprecated in favour of `section-dark + section-pattern-bars`.

**Acceptance criteria:**
- `.section.section-pattern-bars` produces the bar pattern background when applied to any section, not just stats-visibility.
- `section-ai-visibility` references are removed from `stats-visibility.css`.
- The sparkle icon still appears above the heading when both `section-dark` and `section-pattern-bars` are present on the section.
- Check the content file at `content/index.plain.html` — update Section Metadata if it references `section-ai-visibility` so both styles are emitted correctly.

---

### T06 — Stats-visibility h2: fix CSS selector scope

**Status:** 🔲 Open  
**Priority:** P1 — the 84px display size never fires because the selector targets a non-existent element  
**Files:** `blocks/stats-visibility/stats-visibility.css`, `styles/styles.css` or `styles/lazy-styles.css`

**Problem:**  
The 84px display-size rule is scoped inside the block:
```css
.stats-visibility .stats-visibility-header h2 { font-size: var(--font-size-display); }
```
But the h2 is in **default content** (`.default-content-wrapper`), outside the block. The rule never matches. The h2 renders at 64px (global h2 default).

**Fix:**  
Add a section-scoped rule that targets the default-content h2 when the dark+pattern section is active. Place in `stats-visibility.css` (block-scoped section override) or in `styles/lazy-styles.css`:

```css
/* In stats-visibility.css or lazy-styles.css */
.section.section-dark.section-pattern-bars > .default-content-wrapper > h2 {
  font-size: var(--font-size-display); /* 84px */
  text-transform: uppercase;
  text-align: center;
}
```

Also add the specific spacing below the h2 (Conv06 P11):
```css
.section.section-dark.section-pattern-bars > .default-content-wrapper > h2 {
  margin-bottom: 24px; /* h2 → subtitle gap */
}
.section.section-dark.section-pattern-bars > .default-content-wrapper > p {
  margin-bottom: 32px; /* subtitle → CTA gap */
}
.section.section-dark.section-pattern-bars > .default-content-wrapper > .button-wrapper {
  margin-bottom: 60px; /* CTA → block (table) gap */
}
```

**Note:** After completing T05, these selectors will use `section-dark.section-pattern-bars`. If T05 is not yet done, temporarily use `section-ai-visibility` to avoid a regression.

**Acceptance criteria:**
- The AI Visibility Index section heading renders at 84px on desktop, uppercase, centered.
- The three spacing gaps (24px / 32px / 60px) between h2, subtitle, CTA, and the block table are correct.

---

### T07 — Stats-facts: active number size 130px → 180px

**Status:** 🔲 Open  
**Priority:** P1 — active number is 28% smaller than specified  
**Files:** `blocks/stats-facts/stats-facts.css`

**Problem:**  
```css
.stats-facts > .stat-row.active .stat-count { font-size: 130px; }
```
Requirement (Conv01 P15): **180px** for the active stat number.

**Fix:**
```css
.stats-facts > .stat-row.active .stat-count { font-size: 180px; }
```
Also verify: the active `.stat-number` container height (currently 180px) needs to accommodate a 180px font — it may need to grow. Check visually that the number doesn't clip.

**Acceptance criteria:**
- Active stat number is 180px, matching the original site.
- No clipping — the stat-number container height adjusts if needed.
- Transition animation between active states still works smoothly.

---

### T08 — Replace `!important` overrides with `.full-width` JS pattern

**Status:** 🔲 Open  
**Priority:** P2 — explicit coding rule violation (Conv02 P26); all other full-bleed blocks use `!important` instead of the established pattern  
**Files:** `blocks/announcement-bar/`, `blocks/hero/`, `blocks/insights-widget/`, `blocks/logo-marquee/`, `blocks/stats-visibility/`, `blocks/video-card/`, `blocks/video-card-feature/`, `blocks/video/`

**Problem:**  
The established pattern (already used by `carousel-slider`) is:
```js
// In block's decorate():
const wrapper = block.closest('.{block}-wrapper');
if (wrapper) wrapper.classList.add('full-width');
```
```css
/* In styles.css — already defined globally: */
main > .section > .full-width { max-width: none; padding: 0; }
```

Instead, these blocks override `max-width` and `padding` via `!important` on their wrapper selectors.

**Fix — for each block:**

1. In the block's `decorate()` JS, add:
   ```js
   block.closest('.{block}-wrapper')?.classList.add('full-width');
   ```
   For blocks without a `decorate()` JS file (e.g. `logo-marquee`), add a minimal JS file.

2. In the block's CSS, remove the `!important` max-width/padding overrides on the wrapper/container selectors. The `full-width` class in styles.css handles it.

**Blocks to fix:**
- `announcement-bar` — `max-width: 100% !important; padding: 0 !important; margin: 0 !important;`
- `video` — same pattern (wrapper + container both)
- `insights-widget` — same pattern
- `stats-visibility` — `padding: 0 !important` on wrapper
- `video-card` — `padding: 0 var(--container-padding) !important` on wrapper  
- `video-card-feature` — same

**Exception:** `hero/hero.css` — evaluate if the hero block still needs this or if the hero section is handled by the section-centered metadata. Remove if redundant.

**Acceptance criteria:**
- `npm run lint` passes with no new errors.
- `!important` is gone from all block wrapper/container selectors.
- All affected blocks still render full-width or constrained as before — verify each at `localhost:3000`.

---

### T09 — Header: transparent background + full desktop spec

**Status:** 🔲 Open  
**Priority:** P2 — multiple desktop requirements uncovered in audit; transparent nav is the root concern (Conv01 P36, Conv02 P07)  
**Files:** `blocks/header/header.css`, `blocks/header/header.js`

**Problem A — Opaque mint background:**  
```css
header .nav-wrapper { background-color: rgb(220 238 235); }
```
This hardcodes the mint colour that matches the gradient top but is not transparent. On short pages or when the gradient changes, the seam is visible.

**Fix A:**
```css
@media (width >= 1024px) {
  header .nav-wrapper {
    background-color: transparent;
    transition: background-color 0.2s ease-in-out;
  }

  /* Both elements need nav-open — applying only to one causes gradient bleed (Conv03 P35, P36) */
  header.nav-open .nav-wrapper,
  header .nav-wrapper.nav-open {
    background-color: #fff;
  }
}
```

**Problem B — Logo, font, and height (Conv01 P36):**  
- Logo must be **150×36px** (check current CSS — may render at wrong size)
- Nav link font-size: **16px** (check against `--font-size-body` default)
- Header height: **84px** (verify `--nav-height` token is set to 84px)

**Fix B:** In `header.css`, verify/add:
```css
header .nav-brand img { width: 150px; height: 36px; }
header .nav-sections a { font-size: 16px; }
/* --nav-height must equal 84px in styles.css */
```

**Problem C — Enterprise external arrow (Conv01 P31):**  
The "Enterprise" nav item must have an external-link arrow SVG rendered via `::after`. Base64 SVG was provided in Conv01 P31.

**Fix C:** Add to `header.css`:
```css
.nav-sections .nav-item-external > a::after {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 4px;
  background: url("data:image/svg+xml,...") center / contain no-repeat;
  /* Use the base64 SVG from Conv01 P31 */
}
```
In `header.js`, add `nav-item-external` class to `<li>` when H2 href is external (contains `//` and not current domain).

**Problem D — Chevron position shift (Conv01 P31, Conv02 P03):**  
When a dropdown opens, the chevron rotates 180° but must NOT shift vertical position. If the chevron uses `transform: rotate()`, it may shift due to transform-origin.

**Fix D:** Ensure chevron uses:
```css
.nav-item .nav-item-chevron {
  transition: transform 0.2s ease-in-out;
  transform-origin: center center; /* prevents position shift */
}
.nav-item.nav-item-open .nav-item-chevron {
  transform: rotate(180deg);
}
```

**Problem E — Mega menu animation and border-radius (Conv02 P25, Conv03 P36):**  
Mega menu panel must animate open/close and have `border-radius: 0 0 12px 12px`. Promo sections must not overflow the panel edges.

**Fix E:** In `header.css`:
```css
.nav-mega-panel {
  border-radius: 0 0 12px 12px;
  overflow: hidden; /* prevents promo image overflow */
  /* Add animation: max-height or opacity transition */
  animation: slideDown 0.2s ease-in-out;
}
```

**Acceptance criteria:**
- At desktop, nav background is truly transparent — page gradient visible behind it.
- When mega-menu opens, background switches to white (no gradient bleed).
- Mobile behaviour is unchanged.
- Logo is 150×36px on desktop.
- Nav links are 16px.
- Header height is 84px.
- Enterprise nav item shows external arrow icon.
- Chevron rotates without shifting vertical position.
- Mega menu has rounded bottom corners and animates open/close.
- Promo sections do not overflow the mega menu panel.

---

### T10 — Hero pattern: use `calc()` breakpoint positions, add ≥1440px breakpoint

**Status:** 🔲 Open  
**Priority:** P2 — pattern anchors incorrectly at tall viewports; missing breakpoint  
**Files:** `styles/styles.css`

**Problem:**  
The hero stripe pattern uses fixed-pixel Y-positions (`680px`, `580px`, `500px`) that don't adapt to viewport height. The requirements (Conv02 P11) specify `calc()`-based positions that keep the pattern anchored relative to the hero content:

| Breakpoint | Required Y position |
|---|---|
| ≥ 1440px | `calc(50% - 20px)` |
| 1024–1439px | `calc(50% - 100px)` |
| 768–1023px | `calc(50% + 100px)` |
| < 768px | `100%` (with `-2px` X) |

The ≥1440px breakpoint is missing entirely.

**Fix:**  
Replace the three `body.homepage main` background rules with:

```css
body.homepage main {
  background:
    url('/icons/pattern-hero.svg') 2px calc(50% + 100px) / auto repeat-x,
    linear-gradient(rgb(220 238 235) 0%, rgb(232 225 255) 75%, rgb(255 255 255) 100%) top / 100% 2814px no-repeat;
}

@media (width >= 1024px) {
  body.homepage main {
    background:
      url('/icons/pattern-hero.svg') 2px calc(50% - 100px) / auto repeat-x,
      linear-gradient(rgb(220 238 235) 0%, rgb(232 225 255) 75%, rgb(255 255 255) 100%) top / 100% 2814px no-repeat;
  }
}

@media (width >= 1440px) {
  body.homepage main {
    background:
      url('/icons/pattern-hero.svg') 2px calc(50% - 20px) / auto repeat-x,
      linear-gradient(rgb(220 238 235) 0%, rgb(232 225 255) 75%, rgb(255 255 255) 100%) top / 100% 2814px no-repeat;
  }
}

@media (width < 768px) {
  body.homepage main {
    background:
      url('/icons/pattern-hero.svg') -2px 100% / auto repeat-x,
      linear-gradient(rgb(220 238 235) 0%, rgb(232 225 255) 75%, rgb(255 255 255) 100%) top / 100% 2814px no-repeat;
  }
}
```

**Acceptance criteria:**
- Pattern position is validated at 375px, 768px, 1024px, 1440px, and 1920px widths.
- Pattern aligns with the hero content area at each breakpoint, not to an arbitrary distance from the page top.

---

### T11 — Clean up stale redirect block CSS files

**Status:** 🔲 Open  
**Priority:** P3 — leftover artefacts that could cause style conflicts  
**Files:** `blocks/logo-marquee/logo-marquee.css`, `blocks/hero-video/` (if CSS present)

**Problem:**  
`blocks/logo-marquee/` contains `logo-marquee.css` with its own rules. The block's JS is a thin re-export to `marquee`, but the CSS file means any content using `logo-marquee` gets unintended styles. The redirect block pattern should be CSS-free — just a JS re-export.

**Fix:**
1. Delete `blocks/logo-marquee/logo-marquee.css` (or empty it to a comment).
2. Check `blocks/hero-video/` and `blocks/promo-cards/` — remove any CSS files there too if present.
3. Check `blocks/solutions-slider/` for the same issue.

**Acceptance criteria:**
- Redirect blocks (`logo-marquee`, `hero-video`, `promo-cards`, `solutions-slider`) have no CSS file, or an empty one.
- `npm run lint` passes.
- Visual check: pages using the old block names still render correctly (they inherit the CSS of the target block).

---

### T12 — Video-card: glass border shrink-wraps the video

**Status:** 🔲 Open  
**Priority:** P3 — the glass border fills the grid column instead of wrapping tightly around the video  
**Files:** `blocks/video-card/video-card.css`, `blocks/video-card/video-card.js`

**Problem:**  
Requirement (Conv04 P32, P35): the glassy border must shrink-wrap around the video, not fill the grid cell. Currently `.video-card-media` is a grid column (`1fr`) and the glass style is applied to it — so the glass frame is always 50% of the card width regardless of the video's actual dimensions.

**Fix:**  
The glass style should be on a wrapper around the `<video>` or `<img>`, not on the column container. In `video-card.js`, wrap the media element:

```js
const glassFrame = document.createElement('div');
glassFrame.className = 'video-card-glass';
glassFrame.appendChild(video); // or picture
mediaCol.appendChild(glassFrame);
```

Then move the glass styles from `.video-card-media` to `.video-card-glass`, and size `mediaCol` differently (e.g. `align-self: center` with `width: fit-content`).

**Acceptance criteria:**
- The glass border follows the video element's actual dimensions.
- The video does not stretch to fill the grid column.
- `object-fit: contain` is confirmed on the video (not `cover`).

---

### T13 — Enterprise video-card CTA: outline/white on dark background

**Status:** 🔲 Open  
**Priority:** P3 — CTA renders as primary purple on a black card (Conv02 P01 §7)  
**Files:** `blocks/video-card/video-card.css`

**Problem:**  
The enterprise variant has a dark/black background. A primary button (purple fill, dark text) is unreadable and doesn't match the original site. The requirement says the CTA must be outline/transparent/white on dark background.

**Fix:**  
Add a variant-scoped CTA override:

```css
.video-card.video-card-enterprise .video-card-text .button,
.promo-cards.promo-cards-enterprise .video-card-text .button {
  border-color: #fff;
  background-color: transparent;
  color: #fff;
}

.video-card.video-card-enterprise .video-card-text .button:hover,
.promo-cards.promo-cards-enterprise .video-card-text .button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
```

**Acceptance criteria:**
- On the dark enterprise card, the CTA is a white outline button.
- On the Semrush One (light gradient) card, the CTA retains its default styling.
- Hover state is visible on the dark background.

---

### T14 — Stats-facts: verify 2-column desktop layout (title left, stats right)

**Status:** 🔲 Open  
**Priority:** P3 — layout requirement from Conv01 P11 not visibly implemented  
**Files:** `blocks/stats-facts/stats-facts.css`, `styles/lazy-styles.css`

**Problem:**  
The requirement says "two-column layout at desktop: title left, stats right." The current block CSS shows single-column rows for the stat entries. This may mean the section default-content (eyebrow + h2 + CTA) should be side-by-side with the stats block itself at desktop — or that each stat row has a 2-col internal layout. Inspect the original site at `https://www.semrush.com/` to determine the correct interpretation, then implement.

**Fix:**  
Inspect first, then decide whether to:
- (a) Place the section default-content-wrapper and the stats-facts-wrapper in a 2-col grid on the section container, or
- (b) Implement a 2-col layout within each stat row (count left, description right)

Use `measure-then-implement` skill — measure the original before coding.

**Acceptance criteria:**
- The stats section matches the original 2-column layout at ≥1024px.
- Mobile: single-column stack.

---

### T15 — Footer: full requirements audit and fixes

**Status:** 🔲 Open  
**Priority:** P2 — footer has several specific unverified requirements from Conv06 P14 + P41  
**Files:** `blocks/footer/footer.css`, `blocks/footer/footer.js`

**Requirements to verify and fix (read footer.css in full first):**

| Requirement | Source | Check |
|-------------|--------|-------|
| Lazzer font throughout footer | Conv06 P14 | `font-family: var(--heading-font-family)` on `.footer` wrapper |
| Container max-width matches global (not 1200px) | Conv06 P14 | `--layout-max-width` token used, not hardcoded |
| Column headers font-weight 600 | Conv06 P14 | `.footer-col-heading { font-weight: 600; }` |
| Link font-size 14px | Conv06 P14 | `.footer a { font-size: 14px; }` |
| Bottom bar with separator line | Conv06 P14 | Border-top on `.footer-bottom-bar` |
| Social icons: outline style, 40px touch targets, flush spacing | Conv06 P41 | `.footer-social a { width: 40px; height: 40px; }` |
| Adobe logo: red "A" image (not text) | Conv06 P41 | `<img>` element used (not text "Adobe") |
| 5 properly-spaced link columns in 1:2 grid | Conv06 P41 | Verify column count and grid ratios |
| Legal links: `justify-content: space-between` | Conv06 P41 | `.footer-legal { justify-content: space-between; }` |
| SEMRUSH reveal: 550px height, sticky, behind footer | Conv06 P13 | `.semrush-reveal { height: 550px; position: sticky; bottom: 0; z-index: 0; }` |
| Breakpoints aligned with header + content area | Conv06 P41 | Verify at 375px, 768px, 1024px |

**Acceptance criteria:**
- Every row in the table above is confirmed correct or fixed.
- Footer renders correctly at 375px, 768px, and 1024px.
- SEMRUSH reveal animation works on scroll-to-bottom.

---

### T16 — Implement global `.glass-surface` utility

**Status:** 🔲 Open  
**Priority:** P2 — glass style is duplicated per block; requirement says shared utility (Conv02 P01 §4, Conv03 P36)  
**Files:** `scripts/glass.js` (new), `blocks/insights-widget/insights-widget.css`, `blocks/video/video.css`, `styles/styles.css`

**Problem:**  
The glass surface style (gradient + backdrop-filter + border) is currently duplicated in each block that uses it. The requirement (Conv02 P01 §4) calls for a **single global utility class** and optionally a **small shared JS module** (`scripts/glass.js`) exporting `applyGlassSurface(el)`.

**Requirements:**
- **Consistent padding:** 12px on all glass-surfaced elements (Conv03 P36)
- **White outline must always be present** on every glass element (Conv04 P14)
- Must be applied to: `insights-widget` container, `video` block container

**Fix — Step 1:** Create `scripts/glass.js`:
```js
export function applyGlassSurface(el) {
  el.classList.add('glass-surface');
}
```

**Fix — Step 2:** Add `.glass-surface` to `styles/styles.css` (global, not in a block CSS file):
```css
.glass-surface {
  background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255,255,255,0.45);
  border-radius: 12px;
  padding: 12px;
}
```
*(exact values: inspect the original site — this is the template; measure with DevTools)*

**Fix — Step 3:** In `insights-widget.js` and `video.js`, call `applyGlassSurface(block)` from `decorate()`. Remove the duplicated glass CSS from individual block CSS files.

**Acceptance criteria:**
- `.glass-surface` is defined once in `styles/styles.css`.
- Both `insights-widget` and `video` blocks use the shared class.
- White border is visible on both at `localhost:3000`.
- 12px padding confirmed on both elements.
- No duplicate glass CSS in block CSS files.

---

### T17 — Section vertical spacing: use 120px padding, not margins

**Status:** 🔲 Open  
**Priority:** P2 — spacing system requirement from Conv02 P18; sections may be using margins instead  
**Files:** `styles/styles.css`

**Problem:**  
The requirement (Conv02 P18) is: sections have `padding: 120px 0` and `margin: 0`. The visual gap between sections must come purely from section padding — not from block or wrapper margins. First and last items inside a section must have no top/bottom margin.

Verify whether the current `styles.css` implements this correctly:
1. Does `main > .section` have `padding: 120px 0` and `margin: 0`?
2. Do block wrappers inside sections have `margin-top: 0` and `margin-bottom: 0`?
3. Is first/last child margin correctly reset?

**Fix (if needed):**
```css
main > .section {
  margin: 0;
  padding: 120px 0;
}

main > .section > div:first-child { margin-top: 0; }
main > .section > div:last-child { margin-bottom: 0; }
```

**Acceptance criteria:**
- Visual gap between sections is consistent with the original at 1440px viewport.
- No section uses negative margins or `!important` to achieve spacing.
- First and last items inside a section have no extra top/bottom margin.

---

### T18 — Marquee: verify logo color, animation speed, and horizontal spacing

**Status:** 🔲 Open  
**Priority:** P3 — several marquee details may not match original (Conv02 P01 §5, Conv05 P11, P12, P17)  
**Files:** `blocks/marquee/marquee.css`, `blocks/marquee/marquee.js`

**Requirements to verify (the block is marked Done but these specifics need confirmation):**

| Requirement | Source | Check |
|-------------|--------|-------|
| Logo color: **black** (NOT grey / `opacity: 0.3`) | Conv02 P01 §5 | `.marquee img { opacity: 1; filter: none; }` |
| Logo height: **50px desktop / 32px mobile** | Conv05 P17 | `height: 50px` + media query `height: 32px` |
| Animation speed: **slower** than default | Conv02 P01 §5 | Increase `animation-duration` to match original |
| Horizontal spacing **consistent** including loop seam | Conv05 P11, P12 | `gap` or `padding-right` on items; verify seam between last and first item |
| Background: **transparent** (page gradient shows through) | Conv02 P07 | `.marquee-wrapper { background: transparent; }` |
| Edge fades via `mask-image` gradient | Conv04 P3 | Verified in status, but confirm CSS still present |

**Acceptance criteria:**
- Logos are solid black (no grey / opacity treatment).
- Logos are exactly 50px tall on desktop, 32px on mobile.
- Animation speed matches the original site.
- Loop seam spacing matches inter-logo spacing (no wider gap at wrap point).
- Marquee background is transparent.

---

## Completed tasks

*(Move tasks here when done, with date)*

---

## Notes

- All tasks assume the current branch is `aem-merged-20260513`.
- After completing T05 (section-pattern-bars), update the content file `content/index.plain.html` if it uses `section-ai-visibility` in Section Metadata — replace with `section-dark | section-pattern-bars`.
- T08 (`!important` cleanup) touches many files — run a full visual check at `localhost:3000` for every affected block after completing it.
- Tasks T05 and T06 are interdependent: T06's CSS selectors depend on the class name established in T05. Complete T05 first.
- T16 (glass-surface) and T08 (!important cleanup) can be combined for blocks that currently use both glass styles and !important overrides.
- T09 Problem E (mega menu border-radius) requires reading `header.js` first — the panel may already have the class; only CSS may need updating.
- Import parser completeness (nav traversing all entries including Top Apps) — verify by running `tools/importer/import-nav.js` against the live site and checking output for "Top Apps", "AdClarity", "Exploding Topics", "SERP Gap Analyzer". If missing, add traversal to the parser. No task created as the import is already marked Done, but flag it if re-importing nav.
- Testimonials content model: requirements (Conv01 P03, Conv06 P8) describe a 5-row block model (logo, quote, author, stats) while the import script produces a 3-row model. The 3-row model is authoritative (both branches agreed). The requirements' "Row 1: section heading" should be default content above the block, not inside it — no change needed unless visual inspection shows the block JS doesn't handle the 3 rows correctly.
