---
When to load: Renaming a block when remote content still uses the old name
Key insight: AEM CLI serves page HTML from the remote server — you cannot rename a block class in remote content without re-publishing
---

## Recipe

1. Create the new block folder with the desired name (`blocks/carousel-slider/`)
2. Keep a thin redirect at the old name (`blocks/solutions-slider/`):

```js
// solutions-slider.js
import decorate from '../carousel-slider/carousel-slider.js';
export default decorate;
```

```css
/* solutions-slider.css */
@import url('../carousel-slider/carousel-slider.css');
```

3. In the new block's CSS, include selectors for BOTH class names:

```css
.solutions-slider-wrapper,
.carousel-slider-wrapper {
  max-width: 100% !important;
}
```

4. Update the import parser to produce the new block name for future imports
5. Once content is re-published with the new class, the old redirect can be removed

## Pitfalls

- `export { default } from '...'` re-export triggers eslint `no-restricted-exports` — use `import` + `export default` instead
- `@import url()` in CSS only works if the path is correct relative to the file
- The AEM CLI caches the page shell from the remote origin — cache-busting or server restart won't help
