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

## Full-width escape hatch (no !important)
When a block needs to escape the max-width container:
```js
// In decorate():
block.closest('[class$="-wrapper"]')?.classList.add('full-width');
```
Defined globally in `styles.css` (do NOT repeat in block CSS):
```css
main > .section > .full-width { max-width: none; padding: 0; }
```

## JavaScript
- No layout coupling between blocks — each block is self-contained
- No `aem.js` edits
- `decorate()` must handle missing/optional content gracefully

## Quality
- `npm run lint` after every code change
- Verify visually at `localhost:3000`
- Screenshots under `/tmp/` only

See also: `full-width-escape-hatch` (detailed recipe), `css-specificity-eds` (when rules don't apply)
