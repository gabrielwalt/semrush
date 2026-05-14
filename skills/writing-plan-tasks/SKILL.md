---
name: writing-plan-tasks
description: How to write verifiable plan tasks in PROJECT-PLAN.md. Load when creating or updating tasks from user-reported gaps or enhancement requests. Ensures the planning agent understands what's asked before writing the task.
---

A plan task that the implementing agent can't independently verify will cause fix → check → misunderstand → redo loops. The planning agent must **understand and confirm the request** before writing the task — and the task must be written so the implementing agent can verify the outcome.

## Step 0 — classify the task type

Every task is one of two types. **Label it explicitly** in the task header.

| Type | Meaning | How to verify |
|------|---------|---------------|
| **Gap** | Current implementation differs from the original site | Compare original site vs. localhost — the delta is visible on both |
| **Enhancement** | New behavior or divergence from the original site | Only the current implementation matters — original site is irrelevant |

Infer the type from context: if the user says "fix", "missing", "wrong", "broken", "doesn't match" → **Gap**. If the user says "add", "change to", "make it", "I want" (something not on the original) → **Enhancement**.

**Label it:** put `**Type:** Gap` or `**Type:** Enhancement` right after the priority line.

---

## Writing a Gap task

### 1. Verify the gap yourself BEFORE writing the task

Do not transcribe the user's words. First:

1. **Open the original site** — navigate to the exact section/block the user describes.
2. **Open the current implementation** — navigate to the same area on localhost.
3. **Identify the specific delta** — what exactly differs? Name the element, CSS property, missing DOM node, wrong value.
4. **If you cannot see the gap**: STOP. Ask the user: "I inspected [element] on both sites and they appear identical — could you point me to the exact difference?"

### 2. Describe the gap in concrete terms

| Section | Purpose |
|---------|---------|
| **What's wrong** | Observable delta — element, property, actual vs. expected value. Specific enough that anyone can point to it. |
| **Evidence** | How you confirmed it — computed styles, DOM inspection, measurements. Exact selector, property, values. |
| **Root cause** | Why it's wrong — missing CSS rule, JS logic error, content gap. |
| **Fix approach** | What to change, where, and what value. |

### 3. Write verification steps for Gap tasks

```
**Verification (implementing agent MUST do all):**
1. Open original site → navigate to [section]. Inspect [element]. Note [property] = [value].
2. Open localhost → same section. Confirm gap: [property] = [wrong value].
3. Implement fix in [file].
4. Reload localhost → inspect same element. Confirm [property] now = [expected value].
5. Visually compare both sites at same viewport. Confirm no regressions.
6. If gap persists after fix: re-inspect original. After 2 failed attempts, stop and ask user.
```

---

## Writing an Enhancement task

### 1. Verify you understand the request BEFORE writing the task

The original site is irrelevant — only the current implementation matters.

1. **Open localhost** — navigate to the area the user describes.
2. **Confirm the current state** — verify the thing the user wants to change actually exists in its current form. If the user says "make the button rounded" and it's already rounded → ask the user what they mean rather than guessing.
3. **If the request is ambiguous**: STOP. Ask the user: "I see [current state]. Could you clarify what you'd like changed?"

### 2. Describe the enhancement in concrete terms

| Section | Purpose |
|---------|---------|
| **Current state** | What exists now — element, property, current value. |
| **Requested change** | What the user wants — specific outcome, not vague intent. |
| **Implementation** | What to change, where, and what value. |

### 3. Write verification steps for Enhancement tasks

```
**Verification (implementing agent MUST do all):**
1. Open localhost → navigate to [section]. Confirm current state: [element] has [current property/value].
2. Implement change in [file].
3. Reload localhost → confirm [element] now has [new expected property/value].
4. Confirm no regressions on surrounding elements.
5. If unclear whether result matches intent: stop and ask user. Do NOT iterate on assumptions.
```

---

## Handle uncertainty (both types)

| Situation | Action |
|-----------|--------|
| **Gap:** Can see gap but not root cause | Write task with "What's wrong" + "Evidence". Put "Root cause: TBD — implementing agent must investigate." |
| **Gap:** Cannot see the gap at all | **Do not write the task.** Ask the user to point to the difference. |
| **Enhancement:** Request is ambiguous | Ask: "I see [current state] — could you clarify what should change?" |
| **Enhancement:** Already in the requested state | Ask: "It appears [thing] is already [state] — am I looking at the right element?" |
| **Either:** No clean fix exists | Document what was attempted and why it failed. Suggest alternatives. Escalate to user. |

---

## Task template

```markdown
### HXX — 🔲 Open — [Short title]

**Priority:** P0/P1/P2
**Type:** Gap | Enhancement
**Affected files:** [exact file paths]

<!-- For Gap tasks: -->
**What's wrong:** [Delta — element, property, actual vs expected.]
**Evidence:** [How confirmed — selectors, computed values.]
**Root cause:** [Why — missing rule, wrong value, content gap.]
**Fix approach:** [What to change, where, what value.]

<!-- For Enhancement tasks: -->
**Current state:** [What exists now.]
**Requested change:** [What user wants.]
**Implementation:** [What to change, where, what value.]

**Verification (implementing agent MUST do all):**
[Numbered steps — see templates above per type.]

**Acceptance criteria:** [Single sentence, measurable.]
```

## Pitfalls
- Not labeling Gap vs. Enhancement → implementing agent doesn't know whether to compare against original site or not, wastes time inspecting the wrong thing.
- Writing a Gap task without seeing the gap → wrong problem described, wrong fix applied.
- Writing an Enhancement task without checking current state → user asks for something that already exists, agent changes it to something else.
- Verification steps that say "confirm it looks right" → subjective. Say "confirm `margin-bottom` computes to `12px`" or "confirm element has class `.foo`".
- Huge tasks with 6+ sub-problems → split. Each task = one verifiable change.

See also: `executing-plan-tasks` (how the implementing agent should work), `verify-before-claiming` (verifying before saying "done"), `measure-first` (measuring before guessing), `regression-guard` (checking for side-effects)
