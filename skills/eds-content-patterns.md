# EDS Content Patterns

## When to load
Content renders wrong — links not becoming buttons, borders doubling, `:only-child` matching incorrectly.

## Key insight
EDS decorates content based on specific HTML patterns. Buttons require `<strong>` or `<em>` wrappers. CSS pseudo-selectors ignore text nodes. Borders between adjacent items need the top-only + last-child pattern.

## Button decoration
```html
<p><strong><a href="...">CTA</a></strong></p>  → .button.primary
<p><em><a href="...">CTA</a></em></p>          → .button.secondary
<p><strong><em><a>CTA</a></em></strong></p>     → .button.accent
<p><a href="...">CTA</a></p>                    → plain link (no button)
```

## Adjacent item borders
```css
.item { border-top: 1px solid #ddd; }
.item:last-child { border-bottom: 1px solid #ddd; }
/* NOT border-top + border-bottom on every item — that doubles the visual border */
```

## Lint gotchas
- Font family names must NOT be quoted: `font-family: Inter, sans-serif` (not `'Inter'`)
- Vendor prefixes (`-webkit-`) fail `property-no-vendor-prefix` — remove them unless absolutely needed
- `no-descending-specificity` — order selectors from least to most specific

## Pitfalls
- `:only-child` ignores text nodes — `p > a:only-child` matches even when there's text before the link. Use JS `p.textContent.trim() === a.textContent.trim()` instead.
- EDS `decorateButtons()` checks `p.textContent.trim() !== text` — if the paragraph has other text besides the link, no button decoration happens
