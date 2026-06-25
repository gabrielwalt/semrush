---
name: session-startup
description: What to do at the start of every new session. Load at session start before responding to any request.
---

## Precondition gate — uninitialized project
If `PROJECT-STATUS.md` or `PROJECT-PLAN.md` does not exist, the project is uninitialized. Stop here — load `draft-project-setup` instead of running the sequence below.

At the start of every session, before doing any work:

## Startup sequence
1. Read `PROJECT-STATUS.md` — what's done, what's in progress, known blockers
2. Read `PROJECT-CONTEXT.md` — the project's accumulated wiki knowledge (environment, constraints, decisions). Skip if it doesn't exist yet.
3. **Run `node tools/quality/project-state.mjs`** (`quality-tooling`) — ground-truth JSON for which pages are `frozen` vs `unfrozen`/in-progress, the content files present, and the working-tree changes. Prefer this over inferring state from prose; the prose can drift, the probe reads the filesystem + status table.
4. Read `PROJECT-PLAN.md` — find the first `🔲 Open` task; that's your starting point
5. Scan `skills/README.md` — prime trigger matching for the session's tasks
6. If the user's message names a specific task or block, also load matching skills

## What NOT to do at startup
- Don't re-read files you just read in the same session
- Don't propose a plan if one already exists in `PROJECT-PLAN.md` — execute it
- Don't ask what to work on if `PROJECT-PLAN.md` has open tasks — start the first one

## State recovery (when context has been compressed)
1. Check `PROJECT-PLAN.md` — find the last completed task and the next open one
2. Check `PROJECT-STATUS.md` — the "Current Focus" note (authoritative; don't use git log)

## Pitfalls
- Starting work without reading `PROJECT-PLAN.md` — you'll duplicate or skip tasks
- Reading `AGENTS.md` but not `PROJECT-STATUS.md` — AGENTS.md doesn't tell you what's broken now

See also: `executing-plan-tasks` (how to pick up and execute the first open task), `writing-plan-tasks` (how to create new tasks from user requests)
