---
name: eds-code-conventions
description: CSS and JavaScript coding conventions for EDS blocks. Use when writing block CSS, block JS, or reviewing code for EDS standards.
---

## CSS
- Use tokens from `styles.css`; add new tokens when values repeat
- Class names: `{block}-{part}` in kebab-case
- No positional selectors (`nth-child`) — use `decorate()` to add semantic classes
- No `!important` — use the `.full-width` escape hatch instead (see below)
- See `css-specificity-eds` when a rule isn't applying as expected

## Full-width escape hatch
See `full-width-escape-hatch` skill for the complete pattern. Key point: add `.full-width` class to the wrapper via JS, never duplicate the CSS rule in block stylesheets.

## JavaScript
- No layout coupling between blocks — each block is self-contained
- No `aem.js` edits
- `decorate()` must handle missing/optional content gracefully

## Clean and lean
- **Simple is always better.** If a simpler implementation works, use it. Never add complexity without documenting why it's needed.
- **No dirty hacks.** No workarounds for broken content in code (URL rewrites, fallback paths, `about:error` detection). Fix the content instead. If a content fix isn't possible, document the constraint and add a plan task — don't bury a workaround in block JS.
- **Fix at the right level.** Wrong image URL → fix in content. Wrong video path → fix in content. Missing media asset → fix via DA upload. Code workarounds for content problems create technical debt that outlives the original issue.
- **Clean up after yourself.** When resolving an issue, remove all previous failed attempts — leftover fallback files, dead code branches, temporary `let` where `const` sufficed. Review the diff before claiming done.
- **Code must be self-explanatory.** Add comments only to explain WHY, not WHAT. If something is unclear, it's probably technical debt — add it to the plan to be cleaned up.
- **Be proactive about code smells.** When touching any file, look for unnecessary complexity, dead code, or patterns that could be simpler. Add cleanup tasks to `PROJECT-PLAN.md` rather than ignoring them.

## Quality
- `npm run lint` after every code change
- Verify visually at `localhost:3000`
- Screenshots under `/tmp/` only

See also: `full-width-escape-hatch` (detailed recipe), `css-specificity-eds` (when rules don't apply). Native `excat-eds-developer` covers generic block development — **these conventions take precedence** for this project's clean-and-lean and no-`!important` rules.
