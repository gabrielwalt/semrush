---
When to load: Setting up global layout constraints (max-width, centering) across all blocks in an EDS project
Key insight: Apply max-width at the block-wrapper level (main > .section > div). Blocks that need full-width add .full-width class to their wrapper via JS — no !important overrides.
---

## Recipe

1. Sections (`main > .section`) have NO max-width — they span full viewport (backgrounds apply here).
2. Block wrappers (`main > .section > div`) get the container constraint:

```css
main > .section > div {
  max-width: var(--container-max-width); /* e.g. 1440px */
  margin: auto;
  padding: 0 var(--container-padding); /* e.g. 32px */
}
```

3. Blocks that need full viewport width add `.full-width` to their wrapper in JS:

```js
export default async function decorate(block) {
  const wrapper = block.closest('.my-block-wrapper');
  if (wrapper) wrapper.classList.add('full-width');
}
```

4. The `.full-width` utility is defined globally in `styles.css`:

```css
main > .section > .full-width {
  max-width: none;
  padding: 0;
}
```

5. Section backgrounds (dark, patterns) apply to `.section` element — always full-width by default.

## Pitfalls

- Never use `max-width: 100% !important` — use `.full-width` class instead
- Don't put padding on sections — it prevents full-bleed backgrounds
- Default content wrappers always stay constrained (they don't get `.full-width`)
- Carousel blocks that need right-edge bleed use `padding: 0 0 0 var(--container-padding)` on the block itself
