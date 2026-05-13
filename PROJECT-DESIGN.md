# PROJECT-DESIGN.md — Design System

Design intent and decisions. For actual token values read `styles/brand.css` and `styles/styles.css`.  
**Update when tokens are added, renamed, or removed.**

---

## Token Files

| File | Purpose |
|------|---------|
| `styles/brand.css` | Brand colors, fonts |
| `styles/styles.css` | Type scale, spacing, layout tokens, global resets |
| `styles/fonts.css` | `@font-face` declarations |
| `styles/lazy-styles.css` | Below-the-fold styles: section patterns, CTA grid |

---

## Design Decisions

- **Body weight 500** — the original uses Lazzer at 500 for all body text, not the typical 400. Applied globally on `body`.
- **Body letter-spacing `-0.02em`** — tighter than default, applied globally.
- **Section heading pattern** — eyebrow `<p>` + uppercase `<h2>` used across carousels, stats, testimonials, footer CTA. Consistent sizing at 48px desktop.
- **AI Visibility heading exception** — uses the display size (84px) instead of heading-l, with tighter line-height.
- **H4 differs from other headings** — uses `-0.02em` tracking and `1.2` line-height (not `1.1`).
- **Buttons are all pill-shaped** — `border-radius: 100px`, consistent 60px height across all variants.
- **Breakpoints**: 768px (mobile), 1024px (tablet/desktop). Heading sizes reduce at each breakpoint.

---

## Adding a Token

1. Add to `styles/brand.css` or `styles/styles.css` `:root`
2. Update this file if the decision is non-obvious
3. Use `var(--token-name)` everywhere — never hardcode a value that matches a token
