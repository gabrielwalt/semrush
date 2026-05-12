---
name: writing-skills
description: Guide for creating and maintaining Claude Code skills. Use when creating a new skill, improving existing ones, or auditing the skill library.
disable-model-invocation: true
---

A skill answers: "What do I wish I'd known 30 minutes ago?"

## Non-negotiable rules

1. **Project-specific skills MUST be prefixed with `project-`** in both the directory name and the `name` frontmatter field. "Would this help on a completely different brand migration?" — if no, it gets the prefix. No exceptions.
2. **The skill index in `AGENTS.md` MUST be updated with every skill change** — creation, rename, deletion, or key insight change. The index is the authoritative listing that loads every session. A skill not listed there may as well not exist.
3. **Generic skills MUST NOT hardcode project-specific values** — no pixel breakpoints, no token values, no brand font names, no specific file names. Reference `PROJECT-DESIGN.md` for breakpoints/tokens, `PROJECT-IMPORT.md` for import file names, or use generic placeholders.
4. **Never modify the Rules section of AGENTS.md when adding skills** — skills extend the rules, they don't override them. The Rules section is the core contract.

## Creating a new skill

1. Create `skills/{problem-domain}/SKILL.md` at the project root
2. **Scope**: "Would this help on a different brand migration?" If no → prefix with `project-`
3. Add YAML frontmatter — see format below
4. Write the body: key insight first, then recipe, then pitfalls
5. Keep under 500 lines. Aim for ~20-30 lines for reference skills
6. **Add a row to the skill index in `AGENTS.md`** — in the correct table (generic or project-specific) with "When to use" and "Key insight" columns
7. Verify the `name` field matches the directory name exactly

## Keeping skills modular and connected

- **One domain per skill.** If a skill covers two distinct topics, keep it focused on the primary one and cross-reference the other.
- **Cross-reference, don't duplicate.** If content exists in another skill, point to it with a `See also:` line at the bottom rather than repeating it. One skill owns each concept.
- **Add `See also:` to every skill** that has natural neighbors — related patterns, prerequisites, or next-step workflows. Format: `See also: \`skill-name\` (why), \`other-skill\` (why)`
- **Keep skills compact.** Aim for 20-30 lines. If a skill grows past ~40 lines, look for content that belongs in a referenced skill instead.
- **Friction-based triggers.** If you encounter the same problem or workaround twice, it's a skill gap. Propose a skill before moving on.

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
| `when_to_use` | No | Extra trigger phrases, appended to description |
| `disable-model-invocation` | No | Set `true` for user-only skills (side effects, workflows) |
| `allowed-tools` | No | Tools Claude can use without permission prompts when active |
| `context` | No | Set `fork` to run in isolated subagent context |
| `paths` | No | Glob patterns — skill only auto-loads for matching files |

## How skills load

- **Session start**: skill names and descriptions load (small context cost). Skill index in AGENTS.md also loads via `@AGENTS.md` in CLAUDE.md.
- **On invocation**: full SKILL.md body loads and stays in context
- **After compaction**: most recently invoked skills re-attached (5,000 tokens each, 25,000 total)
- **Symlink**: `.claude/skills → ../skills` enables native discovery. If missing: `mkdir -p .claude && ln -sf ../skills .claude/skills`

## Quality bar

- **Prescriptive**: "Do X" not "X happened"
- **Concrete**: actual selectors, actual values, actual commands
- **Scannable**: tables and code blocks beat paragraphs
- **No history, no justification**: just what works now

## Improving an existing skill

| Signal | Action |
|--------|--------|
| Used it but still got stuck | Add to Recipe or Pitfalls |
| Contains stale info | Update to current implementation |
| Two skills answer same question | Merge, delete one, update AGENTS.md index |
| Claude doesn't auto-invoke it | Improve `description` with better trigger keywords |
| Claude invokes it too often | Make `description` more specific, or add `disable-model-invocation: true` |
