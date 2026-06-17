---
name: stylelint-no-descending-specificity
description: Fix stylelint no-descending-specificity errors in EDS block CSS. Fires when a lower-specificity selector appears after a higher one targeting the same element.
---

Fix by reordering or merging properties into base selectors.

## Recipe
**Problem:** base selector after compound selector
```css
.card-expanded .desc { opacity: 1; }   /* high specificity first */
.desc { opacity: 0; transition: ...; } /* lower after — ERROR */
```
**Fix:** put base first, override after
```css
.desc { opacity: 0; transition: ...; }           /* base first */
.card-expanded .desc { opacity: 1; }             /* override after — OK */
```

**Problem:** second `.cta` rule after `.cta:hover`
**Fix:** merge all base properties into the first `.cta` block — don't create a second one

**Problem:** a NEW scoped rule you just added (e.g. `body.template-A main .section.foo .default-content-wrapper`) trips the error on PRE-EXISTING, lower-specificity rules later in the file that end in the same element (`body.template-B main .x > .default-content-wrapper`). The two scopes are mutually exclusive (different templates) so they never actually collide — but the linter only sees the shared trailing element. Reordering is unnatural here (you'd scatter one feature's rules across the file).
**Fix:** LOWER your new rule's specificity so it no longer outranks the later ones. Often you can drop the trailing shared class and rely on inheritance — e.g. set `text-align: center` on `.section.foo` (inherits down to the default-content) instead of targeting `…foo .default-content-wrapper`. Same visual result, no descending-specificity conflict.

## Pitfalls
- The rule checks if a selector COULD target the same element, not if it actually does — so unrelated template scopes that share a trailing class (`.default-content-wrapper`, `.button`) still conflict
- `!important` doesn't fix it — the rule checks selector specificity, not cascade
- Moving rules into `@media` blocks doesn't help
- Prefer lowering specificity (inheritance) over a `stylelint-disable` wrap — the disable silences the rule but leaves the real cascade fragility
