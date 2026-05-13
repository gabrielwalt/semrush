# General Rules & Project Conventions

*Requirements extracted exclusively from Gabriel Walt's explicit statements.*

---

## Content Rules

- **All user-facing text lives in content files — never in JS or CSS.** Code only decorates and lays out what the content provides. This includes video URLs, descriptions, CTAs, and any other author-controlled strings. (Conv04 P35, Conv05 P4)
- **Default content is preferred over block-internal content.** Eyebrow pre-titles, section headings, subtitles, and CTAs that introduce a block belong in the section's default content above the block — not in the block's first row. (Conv05 P4)
- **Block variants must share the same content structure.** A variant is a CSS/JS styling toggle (injected as a class name). If two instances need fundamentally different row/cell layouts, they are different blocks — not variants. (Conv05 P4)
- **Keep content structure consistent across similar blocks.** Authors remember patterns; surprises cost them time. (Conv05 P4)
- **Import parsers must never inject placeholder text.** If source content is missing, leave the field empty rather than inventing a value. (Conv03 general rule)

---

## CSS Rules

- **No `!important`.** Try cleaner strategies (increase specificity, cascade order, add a class via JS). Exception: EDS wrapper overrides — even then, prefer section-level alternative. (Conv02 P26)
- **No positional selectors (`nth-child`).** Use `decorate()` to add semantic classes (`{block}-{part}` kebab-case). (Conv01 P09)
- **Full-width breakout uses `.full-width` class added via JS**, never `!important` width overrides. (Conv05 P11)
- **Block variant class naming:** `{block} {block}-{variant}` (e.g., `promo-cards promo-cards-enterprise`, not `promo-cards enterprise`). (Conv01 P09)

---

## Naming Conventions

- **Section styles:** prefix with `section-` (e.g., `section-dark`, `section-centered`, `section-narrow`). (Conv05 P8)
- **Page templates:** prefix with `template-` (e.g., `template-blog-post`, `template-landing`). (Conv05 P8)
- **Generic block variants** that apply across multiple blocks (e.g., spacing): prefix with `block-` (e.g., `block-spacious`, `block-no-margin-top`). (Conv05 P8)

---

## Import Parser Rules

- **Use `getAttribute('src')` / `getAttribute('poster')` instead of `.src` / `.poster` properties.** The property resolves against the browser context and returns `about:error` for failed loads; the attribute returns the raw authored value. (Conv05 P1)
- **Always resolve relative paths to absolute.** Prefix paths starting with `/` with the source origin (e.g., `https://www.semrush.com`). EDS media pipeline needs full URLs to download assets. (Conv05 P1)
- **Skip images with `src="about:error"` or empty `src`** — never emit broken references into content. (Conv05 P1)
- **Import parsers must detect, not hardcode, styling decisions.** Every choice — CTA type (primary/secondary), heading level, block variant, section style, page template — must be derived from observable signals in the source DOM (CSS classes, computed styles, element structure, aria attributes). Never assume a fixed style for a given parser. (Conv05 P9, Conv03 general)
- **One import script for the whole project.** Only create a second script for fundamentally incompatible DOM structures. (Conv03 P15)
- **The import script is inseparable from the block's content structure.** Never change a block's structure without updating the import script. (Conv03 P15)
- **DA does not support `<video>` elements** — import parsers must emit video as link + poster URL, not `<video>` tags. (Conv03 P38)
- **SVGs get stripped by the `html2md` pipeline** — inject them post-import. (Conv03 P20)
- **Wrap every `<img>` in `<picture>`** — EDS requires this structure for proper media handling. (Conv05 P13)

---

## CTA / Button System

- **Links wrapped in formatting become buttons:**
  - `<strong><a>` → primary button (solid filled) — main action
  - `<em><a>` → secondary button (outline/ghost) — alternative action
  - `<strong><em><a>` → accent button (high-impact) — use sparingly
- **This applies everywhere** — in default content AND inside blocks. Block JS must not strip or override button formatting; block CSS must style `.button` elements within the block's CSS scope. (Conv05 P7, P10)
- **Import parsers must detect the visual weight of source CTAs** (filled vs outline classes) and apply the matching wrapper. Never hardcode one style — detect from the source DOM. (Conv05 P7)
- **Primary button spec:** purple accent fill (`rgb(193,144,255)`), dark text, pill shape, height 60px, padding `0 32px`. (Conv01 P22)
- **Secondary button spec:** transparent bg, dark outline, pill, height 60px, padding `0 32px`. (Conv01 P22)
- **Accent button spec:** dark fill, white text. (Conv01 P22)
- **No responsive size changes for buttons.** (Conv01 P22)
- **Hover animation:** `#b072ff` hover color, `transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out`. (Conv02 P10)

---

## Heading Hierarchy

- **Section eyebrow / pre-title:** `<p>` before h2 — small uppercase text
- **Section title:** `<h2>`
- **Subtitle / description:** `<p>` following the h2
- **Card title** (items within sliders/blocks): `<h3>`
- **Card subtitle:** `<p>`
- **No `h4` or `h5` in slider cards.** (Conv01 P04)

---

## AGENTS.md Rules

- **AGENTS.md must contain only project-agnostic, overarching rules.** Page-specific content structure decisions go in `PROJECT-BLOCKS.md` or `PROJECT-IMPORT.md`. (Conv03 P14, Conv05 P14)
- **Keep AGENTS.md as succinct as possible** to avoid context overload — it is loaded into every conversation context. (Conv03 P16)
- **Remove the "Environment" and "EDS Fundamentals" sections** — derivable at runtime. (Conv03 P18)
- **Section name:** "Project Reference" (not "Quick Reference"). (Conv03 P22)
- **No Git, no AEM pushes.** Never suggest doing it yourself — always tell the user they can click "Upload content" in the Console UI. (Conv03 P16)

---

## PROJECT Files

- **Keep PROJECT-*.md files current.** Any meaningful change — block, variant, token, import script, page — updates the relevant file immediately. (Conv01 P09)
- **PROJECT-*.md holds inventory, intent, decisions, and non-obvious gotchas** — NOT selectors, token values, or DOM patterns (those live in the code). (Conv06 P38)
- **The code itself must be well-commented** where the WHY isn't obvious. (Conv06 P38)
- **After any session with non-obvious solves:** identify what was surprising → create/update skills. (Conv03 P20, P30, P39; Conv04 P20, P28, P31; Conv06 P40, P42)

---

## Skills System

- **Skills folder (`skills/`) is the single knowledge system.** No separate PROJECT-LEARNINGS.md. (Conv02 §Skills)
- **Every learning becomes a skill** (learning in actionable form). Skills must be continuously created, updated, merged, and improved after every problem solved or correction received. (Conv02 P20, P32)
- **Skills must be distinguished as project-specific vs project-agnostic** and organized accordingly. (Conv05 P14)
- **Project-agnostic skills should be useful on the next project too.** (Conv05 P14)
- **Before any task:** scan `skills/README.md`, load matching skills, follow recipes before inventing. (AGENTS.md rule)
- **After any non-obvious solve or correction:** create/update a skill immediately. (Conv03 P20 — multiple confirmations)

---

## Quality Bar

- **`npm run lint` after every code change.** (AGENTS.md rule)
- **Verify visually at `localhost:3000`.** (AGENTS.md rule)
- **After any correction:** don't just fix the symptom — capture the rule and apply it universally.
- **"Leaner is better"** is an explicit quality bar. After feature work, review all CSS/JS touched, remove duplication, dead paths, and over-specific rules. (Conv02 P01 §9)
- **All blocks must be pixel-matched to the original.** Proactive visual iteration and critique are expected, not just reactive fixes. (Conv06 P9, P16, P35)

---

## Process / Workflow

- **End every substantive reply with:** (1) Summary of what you did or decided, (2) one concrete next-step question. (AGENTS.md rule)
- **"continue"** from Gabriel means: proceed immediately without further clarification. (Conv05 P3)
- **Before importing the next page:** do a cleanup review of the current state. (Conv06 P39)
- **After each page import:** critique all new blocks against the original before moving on. (Conv06 P44)
- **One section = one `<div>` wrapper in `.plain.html`.** Do not use `<hr>` for section breaks. (Conv03 P27)
