---
name: measure-first
description: Reminder to measure before guessing when matching sizes, spacing, or colors. Load when you're about to write a px value from memory or estimation.
---

If you don't know the value, measure it — never guess. Guessing creates a correction loop (too big → too small → still wrong) that costs multiple prompts. One measurement saves five corrections.

## When to measure (not guess)
- Any specific px value: font-size, height, width, padding, gap, margin
- Any color that isn't a project design token
- Any animation duration or easing
- Logo, icon, or image sizes

## How to measure
Load `measure-then-implement` for the full code patterns. Quick summary:
- Use browser DevTools on the original site (not your implementation)
- `getBoundingClientRect()` for dimensions
- `getComputedStyle()` for spacing, colors, font properties
- Inspect stylesheets directly for hover/transition values

## Pitfalls
- "Approximately 50px" is a guess, not a measurement
- Screenshot comparison misses letter-spacing, line-height, and sub-pixel differences
- Measuring YOUR implementation instead of the ORIGINAL — always measure the source

See also: `measure-then-implement` (how to measure programmatically)
