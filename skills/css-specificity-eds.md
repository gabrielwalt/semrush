# CSS Specificity in EDS

## When to load
A CSS rule isn't applying. Computed style shows a different value than expected.

## Key insight
EDS block wrappers carry `!important` on `padding` and `max-width`. Attribute selectors (`[aria-expanded='true']`) add specificity that beats plain class selectors. The universal `*` selector has zero specificity and always loses to any class-based rule.

## Debugging recipe
1. Inspect the element's computed `margin-top` / `display` / etc. in the browser
2. If it shows the wrong value, check what rule IS winning (look for `!important`, attribute selectors, or more-specific class chains)
3. Match or exceed that specificity in your fix

## Common fixes
| Problem | Why it fails | Fix |
|---------|-------------|-----|
| `* + *` doesn't apply margin | Zero specificity loses to any class rule | Use `[class$="-wrapper"] + [class$="-wrapper"]` |
| Desktop `display: flex` overridden | `[aria-expanded='true']` has higher specificity | Include the attribute selector in your desktop rule too |
| Block wrapper ignores your padding | Wrapper has `padding: 0 !important` | Don't fight it — use margin on the wrapper, or inner element padding |
| Text node in flex creates extra gap | Anonymous flex items get gap applied | Set `font-size: 0` on parent, or restructure to remove text nodes |
