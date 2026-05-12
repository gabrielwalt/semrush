# Skills

Operational micro-skills for EDS migration. Each skill is a directory with a `SKILL.md` file.

These skills are auto-discovered by Claude Code via `.claude/skills` symlink when available. This index also auto-loads via `CLAUDE.md` as a fallback. The key insight for each skill is inline so you can act on most problems without reading the full file — only open the SKILL.md when you need the recipe or code.

## Generic Skills (reusable across projects)

| Skill | When to load | Key insight |
|-------|-------------|-------------|
| [eds-dom-structure](eds-dom-structure/SKILL.md) | Selector doesn't match; need EDS DOM structure | Blocks are siblings at section level in `-wrapper > -container > .block` chain — NOT children of section's inner div |
| [css-specificity-eds](css-specificity-eds/SKILL.md) | CSS rule not applying; wrong computed style | EDS wrappers carry `!important` on padding/max-width. Attribute selectors beat plain class selectors |
| [eds-content-patterns](eds-content-patterns/SKILL.md) | CTA links not rendering as buttons; button styles wrong | Links in `<strong>` → primary button, `<em>` → secondary. `decorateButtons()` skips if `<p>` has extra text |
| [vertical-spacing-system](vertical-spacing-system/SKILL.md) | Blocks touching; sections too far apart | Sections use padding. Blocks spaced via `margin-top` on adjacent `[class$="-wrapper"]` selectors |
| [max-width-container-pattern](max-width-container-pattern/SKILL.md) | Setting up global layout constraints | Apply max-width at `main > .section > div`. Full-width blocks add `.full-width` via JS |
| [nav-header-eds](nav-header-eds/SKILL.md) | Header broken; nav invisible; mega menu issues | `aria-expanded='true'` on desktop means mobile CSS applies unless you match that specificity |
| [carousel-pattern-eds](carousel-pattern-eds/SKILL.md) | Building horizontal scrolling carousel | Left-only padding, track scrolls via `overflow-x: auto`, wrapper escapes with `max-width: 100% !important` |
| [importer-parser-patterns](importer-parser-patterns/SKILL.md) | Writing a block parser; validation failing | Parser outputs EDS block tables via `createTable()`. First row = block name. Use `element.replaceWith()` |
| [import-script-bundling](import-script-bundling/SKILL.md) | Import script not executing | Must use `export default { transform }` — esbuild wraps as IIFE exposing `window.CustomImportScript.default` |
| [plain-html-format](plain-html-format/SKILL.md) | Sections not rendering; blocks unstyled | Each section = top-level `<div>`. No `<hr>` separators. Section-metadata must be last in its div |
| [video-in-eds](video-in-eds/SKILL.md) | Implementing video playback | EDS rewrites media hrefs — check link **textContent** for video extensions, not href |
| [page-template-metadata](page-template-metadata/SKILL.md) | Applying page-level styles | EDS reads `<meta name="template">` → class on `document.body` |
| [block-rename-checklist](block-rename-checklist/SKILL.md) | Renaming a block | Name propagates to 12+ locations. Grep to verify nothing remains |
| [block-rename-in-eds](block-rename-in-eds/SKILL.md) | Renaming when remote content uses old name | Keep thin redirect (import+re-export) at old name until re-published |
| [stylelint-no-descending-specificity](stylelint-no-descending-specificity/SKILL.md) | Fixing stylelint specificity errors | Lower-specificity selector after higher one. Fix by reordering or merging into base selectors |
| [mobile-nav-click-handling](mobile-nav-click-handling/SKILL.md) | Mobile nav closes on sub-item click | Guard against entire panel container (`e.target.closest('.panel')`) not just links |
| [measure-then-implement](measure-then-implement/SKILL.md) | Matching original site's exact dimensions | Measure via `getBoundingClientRect()` / `getComputedStyle()` at project breakpoints. Hover colors from stylesheet rules |
| [responsive-verification](responsive-verification/SKILL.md) | Checking component at all breakpoints | Verify at all project breakpoints (see `PROJECT-DESIGN.md`). Measure original first, then verify match |

## Project-Specific Skills (current migration, prefixed `project-`)

| Skill | When to load | Key insight |
|-------|-------------|-------------|
| [project-glass-surface-pattern](project-glass-surface-pattern/SKILL.md) | Frosted glass/translucent frame effect | Gradient + `backdrop-filter: blur(5px)` + border-radius + semi-transparent border |
| [project-mega-menu-content-model](project-mega-menu-content-model/SKILL.md) | Editing nav content; mega menu columns | H2 = nav item, H3 = column, UL = links. No content after H2 = no dropdown |
| [project-background-layering](project-background-layering/SKILL.md) | Gradient not showing through blocks | ONE background on `main` with layers. All blocks must be `background: transparent` |
| [project-clip-path-bar-charts](project-clip-path-bar-charts/SKILL.md) | Arrow-shaped bar charts | `clip-path: polygon()` for shape. Proportional widths from data values |
| [project-carousel-expand-collapse](project-carousel-expand-collapse/SKILL.md) | Expand/collapse card behavior | One card expanded at a time. 430px collapsed, 798px expanded. "+" rotates to "×" |
| [project-nav-header-semrush](project-nav-header-semrush/SKILL.md) | Brand-specific nav toggle | Tinted bg switches to white on dropdown. Toggle `.nav-open` on BOTH wrapper and header |

## Meta

| Skill | When to load |
|-------|-------------|
| [writing-skills](writing-skills/SKILL.md) | Creating, improving, or auditing skills |
