---
name: eds-content-patterns
description: How EDS's runtime decoration turns authored HTML into interactive elements — the strong/em-wrapped-link → button mapping in particular. Use when a CTA link isn't becoming a button, the button variant (primary/secondary/accent) is wrong, or decorateButtons() isn't firing. For choosing which CTA style to author, see eds-content-modeling.
---

EDS transforms authored HTML patterns into decorated elements at runtime. The most common: links wrapped in `<strong>` or `<em>` become styled CTA buttons.

## CTA button decoration
```html
<p><strong><a href="...">Get started</a></strong></p>  → .button.primary
<p><em><a href="...">Learn more</a></em></p>           → .button.secondary
<p><strong><em><a>Try now</a></em></strong></p>         → .button.accent
<p><a href="...">Plain link</a></p>                     → no button, stays a link
```

The wrapping element (`<strong>`, `<em>`) determines the button variant. Import parsers must detect the visual weight of source CTAs and apply the matching wrapper — never hardcode one style.

## Why a link isn't becoming a button
1. Missing wrapper — `<a>` must be inside `<strong>` or `<em>` inside a `<p>`
2. Extra text in the paragraph — `decorateButtons()` checks `p.textContent.trim() !== linkText` and skips if the `<p>` contains other text besides the link
3. `:only-child` false match — CSS `:only-child` ignores text nodes, so `p > a:only-child` matches even when there's text before the link. Use JS `p.textContent.trim() === a.textContent.trim()` instead

## Adjacent item borders (avoiding double borders)
```css
.item { border-top: 1px solid var(--border-color); }
.item:last-child { border-bottom: 1px solid var(--border-color); }
/* NOT border-top + border-bottom on every item — that doubles the visible border */
```

## Lint gotchas
- Font family names must NOT be quoted: `font-family: Inter, sans-serif` (not `'Inter'`)
- Vendor prefixes (`-webkit-`) fail `property-no-vendor-prefix` — remove unless absolutely needed
- `no-descending-specificity` — order selectors from least to most specific

## Pitfalls
- Block JS must not strip button formatting — style `.button` elements within the block's CSS scope
- EDS runs `decorateButtons()` globally during page load — blocks decorated later must call it explicitly if they inject new content

See also: `eds-content-modeling` (CTA type decisions), `css-specificity-eds` (specificity issues)
