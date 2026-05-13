---
name: css-specificity-eds
description: CSS specificity issues in EDS. Use when a CSS rule isn't applying or computed style shows a different value than expected.
---

EDS block wrappers carry `!important` on `padding` and `max-width`. Attribute selectors (`[aria-expanded='true']`) add specificity that beats plain class selectors.

## Debugging recipe
1. Inspect the element's computed style in the browser
2. Check what rule IS winning (look for `!important`, attribute selectors, or more-specific class chains)
3. Match or exceed that specificity in your fix

## Common fixes
| Problem | Why it fails | Fix |
|---------|-------------|-----|
| `* + *` doesn't apply margin | Zero specificity loses to any class rule | Use `[class$="-wrapper"] + [class$="-wrapper"]` |
| Desktop `display: flex` overridden | `[aria-expanded='true']` has higher specificity | Include the attribute selector in your desktop rule too |
| Block wrapper ignores your padding | Wrapper has `padding: 0 !important` | Use margin on the wrapper, or inner element padding |
