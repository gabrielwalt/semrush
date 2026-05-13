---
name: eds-section-style-icons
description: Inject decorative icons or images into sections via CSS pseudo-elements bound to section style classes. Use when a section needs a visual element (icon, badge) that shouldn't be in authored content.
---

Use a `::before` or `::after` pseudo-element on the section's `.default-content-wrapper` to inject decorative visuals tied to a section style class.

## Recipe
```css
/* Bind to the section style classes (not the block class) */
.section.section-dark.section-pattern-bars > .default-content-wrapper::before {
  content: '';
  display: block;
  width: 136px;
  height: 136px;
  margin: 0 auto 32px;
  background: url('/icons/my-icon.svg') no-repeat center / contain;
}
```

Place the icon SVG in `/icons/`. The pseudo-element is purely decorative — no content authoring needed.

**Note:** Always bind to the section's combined style classes (e.g., `.section-dark.section-pattern-bars`), not to a block-specific class. This makes the icon reusable across any block in sections with those styles.

## Pitfalls
- Icons in `/icons/` are served locally by the dev server. Icons in `/content/images/` come from remote and may 404 locally.
- Use `::before` for icons above the heading, `::after` for below.
- Don't bind to the block class (e.g., `.stats-visibility`) — this prevents the icon from appearing in other blocks within the same styled section.
- Old pattern used `.section-ai-visibility` — that class is deprecated, replaced by `section-dark + section-pattern-bars`.

See also: `eds-content-modeling` (section styles), `page-template-metadata` (page-level styling)
