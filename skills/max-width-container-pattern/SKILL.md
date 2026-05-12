---
name: max-width-container-pattern
description: Global layout constraints (max-width, centering) for EDS blocks. Use when setting up or debugging the container constraint pattern.
---

Apply max-width at `main > .section > div`. Full-width blocks add `.full-width` to their wrapper via JS — no `!important` overrides.

## Recipe
1. Sections (`main > .section`) have NO max-width — they span full viewport
2. Block wrappers get the constraint:
```css
main > .section > div {
  max-width: var(--container-max-width);
  margin: auto;
  padding: 0 var(--container-padding);
}
```
3. Full-width blocks add `.full-width` in JS:
```js
const wrapper = block.closest('[class$="-wrapper"]');
if (wrapper) wrapper.classList.add('full-width');
```
4. Global utility:
```css
main > .section > .full-width { max-width: none; padding: 0; }
```

## Pitfalls
- Never use `max-width: 100% !important` — use `.full-width` class instead
- Don't put padding on sections — it prevents full-bleed backgrounds
