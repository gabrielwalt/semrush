---
name: writing-skills
description: Guide for creating and maintaining Claude Code skills. Use when creating a new skill, improving existing ones, or auditing the skill library.
disable-model-invocation: true
---

A skill answers: "What do I wish I'd known 30 minutes ago?"

## Non-negotiable rules

1. **Project-specific skills MUST be prefixed with `project-`** in both the directory name and the `name` frontmatter field. "Would this help on a completely different brand migration?" — if no, it gets the prefix. No exceptions.
2. **`skills/README.md` MUST be updated with every skill change** — creation, rename, deletion, or key insight change. The README is the fallback discovery path and the only thing guaranteed to load every session. A skill that isn't in the README may as well not exist.
3. **Generic skills MUST NOT hardcode project-specific values** — no pixel breakpoints, no token values, no brand font names, no specific file names. Instead, reference `PROJECT-DESIGN.md` for breakpoints/tokens, `PROJECT-IMPORT.md` for import file names, or use generic placeholders. A generic skill must work unchanged on the next project.

## Creating a new skill

1. Create `skills/{problem-domain}/SKILL.md` at the project root
2. **Scope**: "Would this help on a different brand migration?" If no → prefix with `project-` (e.g. `project-glass-surface-pattern`)
3. Add YAML frontmatter — see format below
4. Write the body: key insight first, then recipe, then pitfalls
5. Keep under 500 lines. Aim for ~20-30 lines for reference skills.
6. **Update `skills/README.md`** — add a row in the correct table (generic or project-specific) with the key insight inline
7. Verify the `name` field matches the directory name exactly

## SKILL.md format

```yaml
---
name: my-skill
description: What this does. When to use it. Key trigger phrases.
---
[Key insight — the one sentence that unblocks]

## Recipe
[Code, commands, tables. Zero prose.]

## Pitfalls
- [What fails → why. One line each.]
```

## Frontmatter fields

| Field | Required | Purpose |
|-------|----------|---------|
| `name` | Yes | Must match directory name. Lowercase, hyphens, max 64 chars |
| `description` | Yes | Claude uses this for auto-matching. Put key use case FIRST — truncated at 1,536 chars |
| `when_to_use` | No | Extra trigger phrases, appended to description. Counts toward the 1,536-char cap |
| `disable-model-invocation` | No | Set `true` for skills only the user should invoke (side effects, workflows). Hides from Claude's auto-matching |
| `allowed-tools` | No | Tools Claude can use without permission prompts when this skill is active |
| `context` | No | Set `fork` to run in an isolated subagent context |
| `agent` | No | Subagent type when `context: fork` (`Explore`, `Plan`, `general-purpose`, or custom) |
| `paths` | No | Glob patterns — skill only auto-loads when working with matching files |

## Description quality

- Put the key use case FIRST — descriptions are truncated at 1,536 characters
- Include symptom words users would naturally say ("broken", "not working", "invisible")
- Be specific: "CSS selector doesn't match EDS DOM" beats "CSS issues"
- The `description` drives auto-matching — if Claude doesn't invoke the skill when expected, the description needs better keywords

## How skills load in Claude Code

- **Session start**: all skill names and descriptions load (small context cost)
- **On invocation**: full SKILL.md body loads and stays in context for the rest of the session
- **After compaction**: most recently invoked skills are re-attached (5,000 tokens each, 25,000 total budget)
- **Symlink path**: `.claude/skills → ../skills` enables native discovery. If missing, recreate: `mkdir -p .claude && ln -sf ../skills .claude/skills`
- **Fallback path**: `skills/README.md` auto-loads via CLAUDE.md every session with inline key insights

## Quality bar

- **Prescriptive**: "Do X" not "X happened"
- **Concrete**: actual selectors, actual values, actual commands
- **Scannable**: tables and code blocks beat paragraphs
- **No history, no justification**: just what works now

## Improving an existing skill

| Signal | Action |
|--------|--------|
| Used it but still got stuck | Add to Recipe or Pitfalls |
| Right but hard to scan | Convert prose → table or list |
| Contains stale info | Update to current implementation |
| Two skills answer same question | Merge, delete one, update README index |
| Too long | Cut. Move edge cases to Pitfalls. Split if needed |
| Claude doesn't auto-invoke it | Improve `description` with better trigger keywords |
| Claude invokes it too often | Make `description` more specific, or add `disable-model-invocation: true` |
