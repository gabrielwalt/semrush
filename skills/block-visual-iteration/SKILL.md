---
name: block-visual-iteration
description: Systematic visual comparison workflow for iterating a block toward pixel-match with the original site. Use PROACTIVELY when asked to improve, iterate, critique, or visually compare any block.
---

When asked to visually improve a block, follow this recipe instead of ad-hoc screenshot comparisons.

## Recipe

### 1. Measure original (programmatic, not screenshot)
Use `evaluate` to extract computed styles from every element in the original block:
```js
// For each element: fontSize, fontWeight, lineHeight, letterSpacing, textTransform,
// color, backgroundColor, padding, margin, gap, borderRadius, width, height, position
```
Record the **section header** (eyebrow + heading) AND the **block content** separately.

### 2. Measure ours the same way
Same evaluate script on `localhost:3000`. Use `setTimeout` (3s) to wait for block JS decoration.

### 3. Produce a comparison table
Create a property-by-property diff table. Flag any value that differs. This is more reliable than visual comparison for catching letter-spacing, line-height, and margin differences that screenshots don't reveal.

### 4. Fix all differences in one batch
Apply CSS changes for ALL flagged properties at once, not one at a time.

### 5. Re-measure and verify
Run step 2 again. Confirm all values match. Only THEN take a screenshot for final visual confirmation. Screenshots are expensive (20-50k tokens) and imprecise; computed-style extraction is cheap (~2k) and exact — use screenshots for final confirmation only, never discovery.

## Pitfalls
- Don't compare active/hover states unless you trigger them first on both sites
- Section header styles come from the section's `.default-content-wrapper`, not the block itself — measure both
- Body-level inherited properties (font-weight, letter-spacing) affect all blocks — check global styles too
- When fixing one element, verify you didn't regress adjacent elements (load `regression-guard`)

See also: `measure-then-implement` (how to extract values + responsive verification), `regression-guard` (full regression protocol), `executing-plan-tasks` (Gap vs Enhancement verification). Native `excat-visual-critique` is **complementary**: after importing styles, run it to compare migrated output against the original and surface deltas, then use this measure-first loop to close each delta precisely. Critique finds the gaps; this loop fixes them.
