---
name: page-template-metadata
description: Apply page-wide styles in EDS via a template metadata class on <body>. Use when one page type needs different styling from another and you need a body-level class (e.g. body.homepage) to scope CSS — instead of :has() or per-block overrides.
---

EDS reads `<meta name="template">` and applies it as a class on `document.body`.

## Recipe
1. Add Metadata block to content:
```html
<div class="metadata">
  <div><div>template</div><div>homepage</div></div>
</div>
```
2. EDS `decorateTemplateAndTheme()` adds `class="homepage"` to `<body>`
3. Use `body.homepage main` in CSS for page-specific styles
4. Fallback detection in `scripts.js`:
```js
if (doc.querySelector('.some-page-specific-block')) {
  document.body.classList.add('homepage');
}
```

## Pitfalls
- Don't use `%`-based positioning for backgrounds on tall `main` elements
- `:has()` has limited browser support — prefer body classes via metadata
- Patterns in `/icons/` are local; `/content/images/` come from remote
