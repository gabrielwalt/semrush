---
name: project-mega-menu-content-model
description: Mega menu content model for nav. Use when editing nav content, adding mega menu items, or debugging dropdown columns.
---

Nav uses heading hierarchy as single source of truth. H2 = top nav item. H3 = column heading. UL = column links. H2 with no following content = simple link, no dropdown.

## Content structure (nav.plain.html)
```
div (brand): logo
div (sections):
  H2 "Products"        ← has dropdown (H3/UL content follows)
    H3 "Column Title"  → column heading
    UL                  → column links
    P > picture         → promo image
    P > strong          → promo title
    P                   → promo description
  H2 "Pricing"         ← no content after = no dropdown
  H2 "Enterprise"      ← external link
div (tools): Log In | Sign Up
```

## JS logic
1. Find all H2s → create `.nav-item` each
2. Collect siblings until next H2 → build `.nav-mega-panel`
3. H3 → column, UL → column links, P+picture → promo

## Pitfalls
- H2 with no content before next H2 = no dropdown, no chevron
- Promo parsing looks ahead at next P elements — content order matters
