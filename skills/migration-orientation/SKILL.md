---
name: migration-orientation
description: The mandatory setup conversation that runs BEFORE any import on a new migration. Establishes scope, content source, design source, fidelity level, reuse strategy, and constraints, then records the migration strategy. Use when starting a new migration, when the user says "let's migrate X" / "start a new site", or whenever PROJECT-DESIGN.md has no Migration Strategy section yet.
---

A migration never starts by importing a page. It starts by understanding *what kind of design the source has, how the imported design should be conceptualized, and what global foundation to build*. This skill is the gate for **The Brand-Foundation-First Rule** (AGENTS.md): no content import, no styling, until the strategy below is decided and recorded.

## When this is required
Run this **once per new migration**, before the first import. You are in this gate if **any** of these is true:
- `PROJECT-DESIGN.md` has no `## Migration Strategy` section, OR
- the user asks to migrate a site/page and no strategy is on record, OR
- the user explicitly asks to (re)set migration direction.
If a strategy is already recorded, **do not re-run** — read it and proceed. Tell the user it exists and offer to revise.

## The conversation — assert-then-confirm, 2–3 questions per round
Do **not** dump all questions at once, and do **not** synthesize a full strategy from a one-line prompt for blanket sign-off. Where the source site or the user's prompt makes an answer obvious, **assert it and ask to confirm** ("This reads as *Refined* — confirm?") rather than offering an open menu. Inspect the source site first (its look, structure, page types) so your assertions are grounded, not guesses.

Cover these eight inputs across the rounds:

| # | Input | What to settle |
|---|-------|----------------|
| 1 | **Scope** | Which pages/templates are in scope, and roughly how many. One page, a template, or the whole site? |
| 2 | **Content source** | Where the content comes from — the live source site, an export, another URL set, or author-supplied. |
| 3 | **Design source** | Where the *look* comes from: **same site** (most common), **another site**, or a **Figma file**. May differ from the content source. |
| 4 | **Fidelity** | The site-wide default on the **Faithful / Refined / Reimagined** scale (defined below). |
| 5 | **Copy / improve / inspire** | How literally to treat the design source — restated by the fidelity choice; confirm it explicitly. |
| 6 | **Reuse** | Is there an existing block library, design system, or prior EDS blocks to reuse? Reuse-first beats building new (**The Toolbox-First Rule**). |
| 7 | **Per-page overrides** | Any page/template that needs a *different* fidelity than the site default (e.g. a weak legacy template to treat as Reimagined while the rest is Faithful). |
| 8 | **Constraints** | Strict brand rules, templates to avoid copying, pages flagged as redesign candidates, accessibility bar, anything off-limits. |

Round 1: scope, content source, design source. Round 2: fidelity + copy/improve/inspire + reuse. Round 3 (only if gaps remain): per-page overrides + constraints. Skip any question the source inspection or prompt already answers.

## Fidelity scale (site default; per-page overridable)
The dial that conditions every later styling decision. **First-match-wins** when signals conflict: (1) explicit per-page override; (2) site default recorded here; (3) Faithful, if nothing is recorded.

| Level | Treat the design source as… | License to deviate | Use when |
|-------|------------------------------|--------------------|----------|
| **Faithful** | **The spec.** Match it closely — layout, spacing, color, type. | Only to fix outright bugs (broken contrast, overflow). Measure, don't invent. | Strong existing brand; stakeholder expects "the same site, on EDS". |
| **Refined** | **A strong reference.** Keep the brand essence and structure; fix weak spots and uplevel craft to serve the foundation. | Moderate — improve rhythm, hierarchy, states; never change the brand's identity. | The site is solid but dated or uneven; the goal is "the same brand, done better". |
| **Reimagined** | **Inspiration.** Capture the essence and the strongest concepts; rebuild on a rock-solid foundation. | High — real liberties, as long as the foundation stays graphically excellent and on-brand. | Weak/legacy source design, or an explicit redesign mandate. |

At **every** fidelity level the global foundation must be graphically rock-solid — fidelity governs *how close to the original*, never *how much craft*.

## Record the strategy (then the gate is passed)
Write the decisions into `PROJECT-DESIGN.md` under a `## Migration Strategy` section (create it if absent — it belongs at the top, above the token inventory). Record: scope, content source, design source, **site-default fidelity**, copy/improve/inspire stance, reuse inventory, **per-page fidelity overrides** (a small table), and constraints/anti-references. This is the doc later styling work consults to know how literally to match each page.

Verify before claiming the gate passed (**The Bookend-Verification Rule**): the section exists, all eight inputs are recorded, and the user has confirmed the fidelity default. Only then move on.

## Next, not now
Once recorded, the path is: **global design foundation** (the *workbench* — `global-style-foundation`, **The Workbench-Before-Tools Rule**) → first representative page content → gates → per-block styling. Orientation sets direction; it does not import anything itself.

## Pitfalls
- Jumping to "let's import the homepage" before the strategy is recorded — that's the exact failure **Brand-Foundation-First** exists to prevent.
- Offering a four-option menu when source inspection already makes the fidelity obvious — assert and confirm instead.
- Treating fidelity as a quality dial — Reimagined is *not* "lower quality", it's "freer of the original". Craft is non-negotiable at all three levels.
- Recording a single fidelity and forgetting per-page overrides — a weak legacy template copied Faithfully drags the whole migration down.
- Re-running orientation on a migration that already has a strategy — read it, don't redo it.

See also: `global-style-foundation` (the very next step — build the workbench at the fidelity set here), `eds-migration-process` (the flow this gates — foundation, then pages), `styling-additively` (Toolbox-First reuse once tools exist), `eds-content-modeling` (the block/variant/section/template ladder), `measure-then-implement` (Faithful means measure, don't guess), `PROJECT-DESIGN.md` (where the strategy is recorded)
