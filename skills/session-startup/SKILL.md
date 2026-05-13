---
name: session-startup
description: What to do at the start of every new session. Load at session start before responding to any request.
---

At the start of every session, before doing any work:

## Startup sequence
1. Read `PROJECT-STATUS.md` — what's done, what's in progress, known blockers
2. Read `PROJECT-PLAN.md` — find the first `🔲 Open` task; that's your starting point
3. Scan `skills/README.md` — prime trigger matching for the session's tasks
4. If the user's message names a specific task or block, also load matching skills

## What NOT to do at startup
- Don't re-read files you just read in the same session
- Don't propose a plan if one already exists in `PROJECT-PLAN.md` — execute it
- Don't ask what to work on if `PROJECT-PLAN.md` has open tasks — start the first one

## State recovery (when context has been compressed)
1. Check `PROJECT-PLAN.md` — find the last completed task and the next open one
2. Check `PROJECT-STATUS.md` — the "Current Focus" note
3. Check recent git log for the last commit message

## Pitfalls
- Starting work without reading `PROJECT-PLAN.md` — you'll duplicate or skip tasks
- Reading `AGENTS.md` but not `PROJECT-STATUS.md` — AGENTS.md doesn't tell you what's broken now
