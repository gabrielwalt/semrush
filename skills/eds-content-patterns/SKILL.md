---
name: eds-content-patterns
description: How EDS decorates authored content into interactive elements. Use when CTA links aren't rendering as buttons, button styles are wrong, or decorateButtons() isn't triggering.
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

## Pitfalls
- Block JS must not strip button formatting — style `.button` elements within the block's CSS scope
- EDS runs `decorateButtons()` globally during page load — blocks decorated later must call it explicitly if they inject new content
