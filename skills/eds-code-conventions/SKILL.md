---
name: eds-code-conventions
description: CSS and JavaScript coding conventions for EDS blocks. Use when writing block CSS, block JS, or reviewing code for EDS standards.
---

## CSS
- Use tokens from `styles.css`; add new tokens when values repeat
- Class names: `{block}-{part}` in kebab-case
- No positional selectors (`nth-child`) — use `decorate()` to add semantic classes
- No `!important` — see the `max-width-container-pattern` skill for the full-width escape hatch
- See `css-specificity-eds` skill when a rule isn't applying as expected

## JavaScript
- No layout coupling between blocks — each block is self-contained
- No `aem.js` edits
- `decorate()` must handle missing/optional content gracefully

## Quality
- `npm run lint` after every code change
- Verify visually at `localhost:3000`
- Screenshots under `/tmp/` only
