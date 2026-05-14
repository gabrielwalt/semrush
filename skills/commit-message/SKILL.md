---
name: commit-message
description: Rules for writing clear git commit messages in this project. Load before writing any commit line.
type: project
---

## Key insight
The diff shows *what* changed. The commit message explains *why it matters* — the effect or the problem solved. Future readers have no access to the plan; task IDs and branch names mean nothing in six months.

## Rules

**Verb (imperative mood)** — pick the one that's true:
| Verb | When to use |
|------|------------|
| `Fix` | Something was wrong / broken |
| `Restore` | Reverting to a known-good previous state |
| `Remove` | Deleting something intentionally |
| `Update` | Changing existing behaviour or value |
| `Add` | A genuinely *new* file, feature, or block |
| `Refactor` | Restructure without behaviour change |

**Format**
```
Verb + object + effect (≤72 chars, no period)
```

**What to include** — the purpose / visual effect:
- "Fix header background going opaque before menu opens" ✓
- "Restore stats-facts active number to 180px" ✓
- "Remove !important from block wrappers; use JS full-width pattern" ✓
- "Add missing background SVGs for video-card variants" ✓

**What NOT to include**
- Task IDs (`T05–T14`, `V01`) — plan-internal, meaningless in history
- File names alone (`Update stats-visibility.css`) — tells nothing
- Verb `Add` when the thing already existed (`Add marquee block` — wrong if the block existed and was modified)
- Vague words: "changes", "stuff", "things", "misc"
- Branch names or PR numbers in the subject

## Test
Read the subject aloud: "If applied, this commit will ___." If it sounds like a complete, purposeful action — it's good.
