---
When to load: Applying page-level styles that differ between page types (e.g. homepage gradient vs plain white)
Key insight: EDS reads `<meta name="template">` and applies it as a class on `document.body` — use this for page-specific backgrounds and themes
---

## Recipe

1. Add a Metadata block to the content:
```html
<div class="metadata">
  <div><div>template</div><div>homepage</div></div>
</div>
```

2. EDS `decorateTemplateAndTheme()` in `aem.js` reads it and adds `class="homepage"` to `<body>`

3. Use `body.homepage main` in CSS for page-specific backgrounds:
```css
body.homepage main {
  background: url('/icons/pattern.svg') 2px 680px repeat-x,
    linear-gradient(...) top / 100% 2814px no-repeat;
}
```

4. For fallback when metadata isn't available (remote content not yet updated), add detection in `scripts.js`:
```js
if (doc.querySelector('.insights-widget')) {
  document.body.classList.add('homepage');
}
```

## Pitfalls

- Don't use `%`-based positioning for backgrounds on tall `main` elements — `50%` of 8000px = 4000px, not where you expect. Use fixed pixel values.
- The `:has()` selector works but has limited browser support — prefer body classes via metadata
- Background patterns in `/icons/` are served by the local dev server; patterns in `/content/images/` come from the remote origin and may 404 locally
