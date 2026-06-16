---
name: page-template-metadata
description: Apply page-wide styles in EDS via a template metadata class on <body>. Use when one page type needs different styling from another and you need a body-level class (e.g. body.homepage) to scope CSS — instead of :has() or per-block overrides.
---

EDS reads `<meta name="template">` and applies it as a class on `document.body`. A page template is the top rung of the augmented-styles ladder (see `eds-content-modeling`) — the mechanism is below; the *when-to-create* decision is the important part.

## When to create a page template (be conservative)
- Only when **many things change together** page-wide, so one template replaces a pile of per-block variants + section styles the author would otherwise apply by hand (e.g. a blog template that auto-blocks title/paragraph/image into a blog header AND restyles carousel/tabs for blog pages). The author applies one template instead of remembering N tweaks.
- It should be **obvious** a template is needed: a clearly distinct page type with its own rules. Detect from many signals changing together across a set of pages — not a single difference (a single difference is a section style or variant).
- **Keep the count low.** Prefer climbing back down the ladder (section style, variant, auto-style) before adding a template.
- **Exception — throw-away templates:** fine for bespoke landing/campaign pages. Mark with the `oneoff-` prefix, a header comment stating scope + which page(s), and an entry in the `PROJECT-BLOCKS.md` one-off registry. Delete when those pages go.

## Recipe
1. Add Metadata block to content:
```html
<div class="metadata">
  <div><div>template</div><div>homepage</div></div>
</div>
```
2. EDS `decorateTemplateAndTheme()` adds the value verbatim as a body class (here `class="homepage"`)
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
- Reaching for a template when a section style would do — a single page-wide difference (e.g. just a background) is a section style, not a template

Naming: new templates use a `template-<page-type>` metadata value → `body.template-<page-type>`. The existing `homepage`/`semrush-one`/`enterprise` use bare classes (grandfathered). Full convention: `eds-content-modeling`.

See also: `eds-content-modeling` (the full augmented-styles ladder + section-style-vs-template decision)
