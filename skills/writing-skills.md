# Writing Skills

## When to load
You need to create a new skill, improve an existing one, or audit your skill library.

## Key insight
A skill answers: "What do I wish I'd known 30 minutes ago?" Write for the stuck version of yourself, not the solved version. If reading the skill wouldn't save you real time, it's not sharp enough.

## Creating a new skill

1. Copy `_template.md` → name it `{problem-domain}.md` in kebab-case
2. "When to load" = the **symptom** (what you see), not the topic (what the skill teaches)
3. "Key insight" = the **one sentence** that unblocks — if you could only shout one thing
4. "Recipe" = **action** — code snippets, commands, tables. Zero prose, zero preamble
5. "Pitfalls" = things you **tried that failed** and why, one line each
6. Add to `README.md` index — trigger phrase must match the words you'd think when stuck
7. If over 25 lines → split into two skills

## Improving an existing skill

| Signal | Action |
|--------|--------|
| Used it but still got stuck | Add missing piece to Recipe or Pitfalls |
| Right but hard to scan | Convert prose → table or numbered list |
| Contains stale info (old selectors, old names) | Update to current implementation |
| Two skills answer the same question | Merge into one, delete the other, update index |
| Trigger phrase didn't match your search | Rewrite "When to load" using the words you actually thought |
| Too long | Cut ruthlessly. Move edge cases to Pitfalls. Split if needed |

## Self-audit checklist (run periodically)

1. Read each skill in the index — does the trigger phrase still match how you'd search for it?
2. Are any skills stale? (Reference old block names, old selectors, old patterns)
3. Did recent work reveal gaps? (Problems solved without a matching skill = missing skill)
4. Are any skills never loaded? (If you never reach for it, it's either poorly indexed or unnecessary)
5. Merge any pair that solves the same class of problem

## Quality bar

- **Prescriptive over descriptive**: "Do X" not "X happened"
- **Concrete over abstract**: actual selectors, actual values, actual commands
- **Scannable**: tables and code blocks beat paragraphs
- **No history**: don't explain what was tried before — state what works now
- **No justification**: don't explain WHY — just say what fails and what to do instead
- **Imperative tone**: "Use X", "Never Y", "Set Z to W"

## Pitfalls
- Writing while still frustrated → too verbose. Solve first, then distill.
- Including "context" or "background" → that's documentation, not a skill. Cut it.
- Using "should" or "consider" → too weak. Skills use imperatives.
- Forgetting to update the index → skill exists but you'll never find it.
