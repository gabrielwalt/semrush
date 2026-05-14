# Skills Index

Each skill is a directory with a `SKILL.md` file. Scan the "Load when..." column — if a trigger matches your situation, read that skill in full before proceeding.

To create a new skill: see `writing-skills/SKILL.md` and copy `_template.md`.

**Context budget:** Only the "Always load" skills are read every session. All other skills are loaded on demand via trigger matching. Do not load skills speculatively — load them when the trigger fires.

---

## Always load

These are tiny, high-impact skills that apply to every session. Load them at session start.

| Skill | Load when... |
|-------|-------------|
| [session-startup](session-startup/SKILL.md) | **ALWAYS** — at the start of every new session, before any work |
| [session-close](session-close/SKILL.md) | **ALWAYS** — at the end of every session before signing off |
| [verify-before-claiming](verify-before-claiming/SKILL.md) | **ALWAYS** — before writing "done", "fixed", "implemented", or any completion claim |

---

## Plan tasks

| Skill | Load when... |
|-------|-------------|
| [writing-plan-tasks](writing-plan-tasks/SKILL.md) | Creating or updating tasks in PROJECT-PLAN.md from user-reported gaps or enhancement requests |
| [executing-plan-tasks](executing-plan-tasks/SKILL.md) | Picking up a plan task to implement; need to confirm the problem before coding and verify after |

---

## Quality guards

Load these before making changes — they prevent regressions and guesswork.

| Skill | Load when... |
|-------|-------------|
| [regression-guard](regression-guard/SKILL.md) | About to edit CSS in `styles.css`, block wrappers, or any shared selector |
| [measure-first](measure-first/SKILL.md) | About to write a px value from memory; guessing at sizing, spacing, or color |
| [block-visual-iteration](block-visual-iteration/SKILL.md) | Asked to improve, iterate, critique, or visually compare any block |

---

## Layout & CSS

| Skill | Load when... |
|-------|-------------|
| [css-specificity-eds](css-specificity-eds/SKILL.md) | A CSS rule isn't applying; computed style shows wrong value |
| [eds-dom-structure](eds-dom-structure/SKILL.md) | Selector doesn't match; need to know where EDS puts blocks in the DOM |
| [vertical-spacing-system](vertical-spacing-system/SKILL.md) | Blocks touching with no gap; sections too far apart; page rhythm wrong |
| [full-width-escape-hatch](full-width-escape-hatch/SKILL.md) | Block needs to escape max-width container; tempted to write `!important` on wrapper |
| [max-width-container-pattern](max-width-container-pattern/SKILL.md) | Setting up or debugging global layout constraints (max-width, centering) |
| [stylelint-no-descending-specificity](stylelint-no-descending-specificity/SKILL.md) | Fixing stylelint `no-descending-specificity` errors |
| [eds-code-conventions](eds-code-conventions/SKILL.md) | Writing block CSS or JS; reviewing code for EDS standards |

---

## Nav & Header

| Skill | Load when... |
|-------|-------------|
| [nav-header-eds](nav-header-eds/SKILL.md) | Header broken; nav invisible; mega menu won't animate; sticky not working; transparent bg issues |
| [mobile-nav-click-handling](mobile-nav-click-handling/SKILL.md) | Mobile nav closes when tapping sub-items; click delegation issues; `closeOnFocusLost` closing early |

---

## Content & Authoring

| Skill | Load when... |
|-------|-------------|
| [eds-content-patterns](eds-content-patterns/SKILL.md) | Link not becoming a button; button style wrong; `decorateButtons()` not triggering |
| [eds-content-modeling](eds-content-modeling/SKILL.md) | Deciding what goes in blocks vs default content; block vs variant; CTA type conventions |
| [plain-html-format](plain-html-format/SKILL.md) | Creating/editing `.plain.html`; sections not rendering; blocks unstyled |
| [page-template-metadata](page-template-metadata/SKILL.md) | Applying page-level styles via metadata template classes |
| [eds-section-style-icons](eds-section-style-icons/SKILL.md) | Section needs a decorative icon or badge injected via CSS (not authored content) |

---

## Blocks & Patterns

| Skill | Load when... |
|-------|-------------|
| [carousel-pattern-eds](carousel-pattern-eds/SKILL.md) | Building horizontal scrolling carousel with right-edge bleed |
| [video-in-eds](video-in-eds/SKILL.md) | Implementing video; EDS rewrites video URLs in link hrefs |
| [measure-then-implement](measure-then-implement/SKILL.md) | Need to match exact dimensions, colors, or hover states from the original site |
| [responsive-verification](responsive-verification/SKILL.md) | Checking a component across viewport widths; original behaves differently at certain sizes |

---

## Import & Migration

| Skill | Load when... |
|-------|-------------|
| [importer-parser-patterns](importer-parser-patterns/SKILL.md) | Writing a block parser; parser validation failing; content structure questions |
| [eds-migration-process](eds-migration-process/SKILL.md) | Starting a new page migration; deciding what to import next |
| [eds-troubleshooting](eds-troubleshooting/SKILL.md) | Stuck on an EDS issue; need to search official docs |

---

## Block Renaming

| Skill | Load when... |
|-------|-------------|
| [block-rename-checklist](block-rename-checklist/SKILL.md) | Renaming a block — name propagates to 12+ locations |
| [block-rename-in-eds](block-rename-in-eds/SKILL.md) | Renaming a block when remote content still uses the old name |

---

## Skills Library

| Skill | Load when... |
|-------|-------------|
| [writing-skills](writing-skills/SKILL.md) | Creating a new skill; improving existing skill; auditing the skill library |
| [commit-message](commit-message/SKILL.md) | About to write a commit message; unsure how to describe a change concisely |

---

## Project-specific skills

These skills contain Semrush-specific values and patterns. They help on this project only.

| Skill | Load when... |
|-------|-------------|
| [project-background-layering](project-background-layering/SKILL.md) | Gradient not showing through blocks; background wrong color; need page-specific pattern |
| [project-clip-path-bar-charts](project-clip-path-bar-charts/SKILL.md) | Building bar charts with arrow/pyramid-shaped bars (AI Visibility Index) |
| [project-footer-reveal-pattern](project-footer-reveal-pattern/SKILL.md) | Adding sticky reveal element behind footer; bottom bar social icons/legal layout |
| [project-glass-surface-pattern](project-glass-surface-pattern/SKILL.md) | Implementing frosted glass frame effect around images or videos |
| [project-import-script-bundling](project-import-script-bundling/SKILL.md) | Import script not executing; `CustomImportScript.default` not found; bundling commands |
| [project-mega-menu-content-model](project-mega-menu-content-model/SKILL.md) | Editing nav content; adding mega menu items; debugging dropdown columns |
| [project-section-heading-pattern](project-section-heading-pattern/SKILL.md) | Adding eyebrow + uppercase heading to a new section; section heading CSS selectors |
