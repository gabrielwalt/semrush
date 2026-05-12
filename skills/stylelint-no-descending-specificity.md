---
When to load: Fixing stylelint no-descending-specificity errors in EDS block CSS
Key insight: This rule fires when a lower-specificity selector appears AFTER a higher-specificity selector that targets the same element. Fix by reordering or merging properties into base selectors.
---

## Common scenarios and fixes

### Scenario 1: Fade-in properties defined separately

**Bad** (triggers error):
```css
.card-expanded .description { opacity: 1; }  /* high specificity first */
.description { opacity: 0; transition: ... }  /* lower specificity after — ERROR */
```

**Fix** — put base properties in the base selector first, or merge them:
```css
.description { opacity: 0; transition: ...; }  /* base first */
.card-expanded .description { opacity: 1; }    /* override after — OK */
```

### Scenario 2: :hover after base + expanded state

**Bad:**
```css
.cta { ... }
.card-expanded .cta { opacity: 1; }
.cta:hover { background: darker; }  /* same specificity as .cta but after .card-expanded .cta */
/* Then trying to add: */
.cta { opacity: 0; }  /* ERROR — .cta after .cta:hover */
```

**Fix** — merge opacity into the original `.cta` rule, don't create a second `.cta` block:
```css
.cta { opacity: 0; transform: translateY(8px); transition: ...; background: black; }
.cta:hover { background: darker; }
.card-expanded .cta { opacity: 1; transform: translateY(0); }
```

### Scenario 3: p:last-child after p:first-of-type

**Bad:**
```css
.container p:first-of-type:not(:last-of-type) { color: black; }
.container p:last-child { color: grey; }  /* ERROR */
```

**Fix** — use p (base) + p:last-of-type (override):
```css
.container p { color: black; }
.container p:last-of-type { color: grey; }
```

## Pitfalls

- The rule checks if a selector COULD target the same element, not if it actually does in practice
- `!important` doesn't fix specificity ordering — the rule checks selector specificity, not cascade
- Moving rules into `@media` blocks doesn't help — the rule checks within and across blocks
