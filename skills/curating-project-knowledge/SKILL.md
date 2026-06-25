---
name: curating-project-knowledge
description: How to capture a learning from the user and integrate it coherently into the project's memory — routing it to the right home (context wiki / skill / checker / structured PROJECT file), consolidating rather than appending, re-synthesizing the whole picture after every change, and propagating consequences to the plan and the user. Load whenever the user reveals a durable learning/decision/constraint/fact/preference/correction, or whenever you are about to write any learning into a project MD file. NOT for session-scoped directives (those stay in working context).
---

The user reveals load-bearing knowledge in passing — a decision, a constraint, an environment fact, a preference, a correction. Capture each durable piece the moment it surfaces (**The Puzzle-Piece Rule**, AGENTS.md), so a future session inherits the complete picture and the user never repeats themselves. But a piece is worthless in isolation — what matters is the **picture** the pieces paint together. So capture is never an append: it is route, consolidate, reflect, and act.

## Step 0 — Is it durable? (gate)
*Will this still be true and useful in a fresh session next month?*
- **Durable** (true across sessions) → continue with the loop below.
- **Session-scoped** (governs only this conversation — e.g. "for now only touch `docs/`", "skip page 3 today") → keep in working context, do NOT persist.

## The capture-and-curate loop

### 1. Place — route to where it belongs (first-match-wins)
| If the piece is… | Test | Home |
|---|---|---|
| A **mechanically-checkable rule** | "Could a script *enforce* it?" | An executable checker in `tools/quality/` (Executable-Rule Rule) |
| **Procedural** — how to do something; ordered steps; a decision heuristic | "Could this have been code? or: does it tell me what to *do* next?" | A **skill** — fold into an existing one if it owns the domain; else a new (draft) skill (`writing-skills`) |
| **Semantic** — a fact about the project, environment, brand, people, history, or a preference | "Is this project knowledge a teammate would want on the wiki?" | The most-specific existing PROJECT-* file; else **PROJECT-CONTEXT.md** (the project's wiki) |

Tiebreak: declarative (states what's *true*) → context; imperative (states what to *do*) → skill/checker.

### 2. Consolidate — integrate, never append
Read what's already in the target first. Then:
- **Merge** near-duplicates into one sharper entry; **resolve** contradictions (the newer/confirmed fact wins; surface the conflict if it's load-bearing).
- Ask: *does this addition force a refactor of the file?* If the file no longer reads coherently with the piece bolted on, restructure it.
- **Migrate knowledge between tiers as it formalizes.** A context fact that now recurs as a pattern → *promote* into a skill (and delete from context). A "rule" that's really just a fact → *demote* to context. Anything in the wrong file → move it. The piece goes where it now belongs, not where it first landed.

### 3. Reflect — re-read the whole picture
After any add/modify/remove, step back: *what does the completed picture now imply for the project that no single piece did on its own?* The capture is the means; the picture is the point.

### 4. Propagate + surface
- If reflection reveals work to be done → add a task to **PROJECT-PLAN.md** (`writing-plan-tasks`).
- **Surface the bigger-picture conclusion to the user** at the concluding answer (AGENTS.md): propose planning the action, or — if the piece creates a contradiction or gap — flag the ambiguity and ask. Never sit on a conclusion that changes the project.

## PROJECT-CONTEXT.md — the project's wiki
Home for durable knowledge that fits no other PROJECT-* file and isn't a procedure — accumulated context, not a log.
- **Read every session** (`session-startup` loads it) — that, plus pointers, is how it's found without vector search.
- **Topical headings** (Environment, Constraints, Brand, Stakeholders, Decisions…) keep it navigable; one dense declarative line per fact, no timestamps, no "the user said".
- **Drop a pointer where the knowledge is needed** — when an entry bears on a skill or another PROJECT-* file, add a `See also: PROJECT-CONTEXT.md § X` there. Pointers substitute for the index we don't have.
- **Bounded + curated** — consolidate on every write; if it outgrows comfortable always-loading, keep a one-line index at top and read sections on demand.

## Pitfalls
- Appending a line without reading the rest of the file — accumulation, not curation; the picture rots.
- Persisting a session-scoped directive — apply the Step-0 durable test first.
- Leaving a piece in the wrong tier because it's "already written" — promote/demote/move it.
- Capturing a piece and not reflecting — you stored a fact and missed the conclusion it implied.
- Capturing what the code already shows (structure, past fixes) — re-discoverable; skip.

See also: `writing-skills` (procedural-route target; follow this loop when adding/updating a skill), `writing-plan-tasks` (where reflected consequences become tasks), `session-startup` (reads PROJECT-CONTEXT.md), `session-close` (end-of-session capture+curate pass), `quality-tooling` (the checker tier).
