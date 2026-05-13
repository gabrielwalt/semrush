---
name: block-rename-in-eds
description: Renaming a block when remote content still uses the old name. AEM CLI serves HTML from remote so you need a thin redirect.
---

AEM CLI serves page HTML from the remote server — you cannot rename a block class in remote content without re-publishing. Keep a thin redirect at the old name.

## Recipe
1. Create the new block folder (`blocks/{new-name}/`)
2. Redirect at old name:
```js
// {old-name}.js
import decorate from '../{new-name}/{new-name}.js';
export default decorate;
```
```css
/* {old-name}.css */
@import url('../{new-name}/{new-name}.css');
```
3. In new block's CSS, include selectors for BOTH class names
4. Update import parser to produce new block name
5. Remove old redirect once content is re-published

## Pitfalls
- `export { default } from '...'` triggers eslint `no-restricted-exports` — use `import` + `export default`
- `@import url()` path must be correct relative to the file
- AEM CLI caches remote page shell — restart won't help

See also: `block-rename-checklist` (full list of locations to update)
