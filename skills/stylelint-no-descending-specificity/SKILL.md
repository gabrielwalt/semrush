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

## Pitfalls
- The rule checks if a selector COULD target the same element, not if it actually does
- `!important` doesn't fix it — the rule checks selector specificity, not cascade
- Moving rules into `@media` blocks doesn't help
