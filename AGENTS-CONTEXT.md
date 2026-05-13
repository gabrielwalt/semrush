# AGENTS-CONTEXT.md — Bootstrap for Fresh Context

**Purpose:** This file explains the full history, decisions, and current state of this project so a fresh agent (Ema) can resume without re-analyzing past conversations. Read this at session start in addition to AGENTS.md, PROJECT-STATUS.md, and PROJECT-PLAN.md.

**Last updated:** 2026-05-13

---

## Who You Are and What This Project Is

You are **Ema**, the Experience Modernization Agent. This is a migration of **semrush.com** to Adobe Edge Delivery Services (EDS) using Document Authoring (da.live). The output is vanilla JS + CSS, no build steps. GitHub repo: `gabrielwalt/semrush`. The human you work with is **Gabriel Walt**, an experienced EDS practitioner who reviews your output critically and expects pixel-level fidelity to the original site.

AEM preview URL pattern: `https://{branch}--semrush--gabrielwalt.aem.page`  
Original site: `https://www.semrush.com/`

---

## Conversation History Summary

Six conversations occurred before the current session (Conv01–Conv06, May 11–13 2026). Each conversation involved Gabriel iterating on block implementations — giving feedback, requesting corrections, and pushing toward pixel fidelity. The key arc:

- **Conv01–Conv03:** Initial migration — homepage blocks built, nav/footer implemented, import scripts written
- **Conv04–Conv05:** Refinement iteration — carousel, video-card, stats-facts, stats-visibility, testimonials all progressively refined
- **Conv06:** Final refinement pass — footer social icons, logo, legal row; carousel nav positioning; testimonials quote marks and stats layout; font weight/letter-spacing corrections
- **Post-Conv06 (current session):** Branch merge, requirements audit, plan written, skills system diagnosed

The full extracted requirements from all 6 conversations live in `conversations/requirements/` (12 files). These are the ground truth for what Gabriel wants.

---

## The Branch Merge (Completed)

Two branches diverged from a common base (`f096d19`):

- **`aem-20260508-1813`** — 10 refinement commits; the "good" implementation of existing blocks (carousel nav positioning, stats-facts, testimonials, header mobile nav fix, styles typography)
- **`aem-20260513-1138`** — 1 large commit adding: 4 new blocks (cards-awards, cards-icon, columns-stats, video-card-feature), 30+ skills, 2 import scripts (Semrush One + Enterprise), social icons

The merge target branch **`aem-merged-20260513`** was created by starting from `aem-20260508-1813` and surgically applying files from `aem-20260513-1138` using `git checkout <branch> -- <path>`. 

**Key decisions made during merge:**
- Footer JS + CSS: taken from `aem-20260513-1138` (adds social icons, Adobe logo, legal row — Conv06 P41 requirements)
- All carousel, stats-facts, testimonials, header, styles: kept from `aem-20260508-1813` (10-commit refinements win)
- Skills directory: taken from `aem-20260513-1138` (entirely new, 30+ skills)
- Testimonials content model: **3-row model is authoritative** (import script in both branches produces 3 rows: blockquote+logo / author+name / stats). The requirements file mentions a 5-row model but the section heading belongs in default content, not the block.

**The merge is complete and committed.** The current working branch is `aem-merged-20260513`. All subsequent work happens here.

---

## Requirements Audit (Completed)

All 12 requirements files in `conversations/requirements/` were read in full. These were extracted exclusively from Gabriel's explicit statements across Conv01–Conv06. The audit identified gaps between requirements and implementation, which were turned into PROJECT-PLAN.md tasks.

Key files:
- `00-index.md` — overview of all 12 domains
- `01-general-rules.md` — content rules, CSS, naming, CTA system, quality bar
- `02-page-layout.md` — max-width, 120px section padding, page gradient, hero pattern, glass surface
- `03-nav-header.md` — mega-menu model, logo 150×36px, Enterprise arrow, chevron, mega menu animation, mobile hamburger
- `04-hero-insights-video.md` — hero structure, insights-widget country switcher, video block
- `05-marquee.md` — logo black (not grey), 50px/32px heights, animation speed, loop seam spacing
- `06-video-card.md` — stacked vertically, 64px container padding, object-fit: contain, glass shrinks to video
- `07-carousel-slider.md` — expansible variant, nav buttons in section wrapper, right-edge bleed
- `08-stats-facts.md` — 180px active number, scroll-driven activation, 2-col layout
- `09-stats-visibility.md` — section-dark + section-pattern-bars, bar chart, sparkle icon
- `10-testimonials.md` — no .testimonials-layout margin/padding, quote 26px Lazzer, stats 64px/18px
- `11-footer.md` — SEMRUSH reveal 550px sticky, Lazzer throughout, column headers 600, links 14px
- `12-import-parsers.md` — getAttribute not .src, absolute URLs, wrap img in picture, detect not hardcode

---

## The Skills System Problem (Partially Diagnosed — M01/M02 Will Fix)

The skills system is currently **structurally broken** in two ways that M01 and M02 address:

**Problem 1 — Dual format chaos:**  
19 skills exist as BOTH a root-level flat `.md` file AND a `{name}/SKILL.md` directory. These have diverged in content. The README links to flat files. AGENTS.md says "each is a directory with a SKILL.md file." Reading the README vs following AGENTS.md gives you different content for the same skill.

**Problem 2 — 12 skills invisible in README:**  
The README indexes only ~25 of ~38+ skill paths. Missing entries include `eds-code-conventions`, `eds-content-modeling`, `eds-migration-process`, `eds-troubleshooting`, `eds-section-style-icons`, `footer-reveal-pattern`, `section-heading-pattern`, `writing-skills`, `block-visual-iteration`, `content-completeness-audit`, and all 4 `project-*` skills. Skills not in the README are never found and never loaded.

**Skills that exist only as flat files (no directory version yet):**  
`background-layering.md`, `clip-path-bar-charts.md`, `glass-surface-pattern.md`, `mega-menu-content-model.md`  
→ M01 will create directories for these and delete the flat files.

**Skills that exist in BOTH formats (need merging → canonical directory):**  
`block-rename-checklist`, `block-rename-in-eds`, `carousel-pattern-eds`, `css-specificity-eds`, `eds-content-patterns`, `eds-dom-structure`, `import-script-bundling`, `importer-parser-patterns`, `max-width-container-pattern`, `measure-then-implement`, `mobile-nav-click-handling`, `nav-header-eds`, `page-template-metadata`, `plain-html-format`, `responsive-verification`, `stylelint-no-descending-specificity`, `vertical-spacing-system`, `video-in-eds`, `writing-skills`

**Skills that exist ONLY as directories (correct format, but missing from README):**  
`block-visual-iteration`, `content-completeness-audit`, `eds-code-conventions`, `eds-content-modeling`, `eds-migration-process`, `eds-section-style-icons`, `eds-troubleshooting`, `footer-reveal-pattern`, `section-heading-pattern`, `project-background-layering`, `project-clip-path-bar-charts`, `project-glass-surface-pattern`, `project-mega-menu-content-model`

---

## The Task System: PROJECT-PLAN.md

`PROJECT-PLAN.md` is the authoritative task queue. Tasks are executed in order. The agent picks the first `🔲 Open` task and works through it fully before moving on.

### Part 1 — Meta-tasks (do these FIRST)

| Task | Status | What it does |
|------|--------|-------------|
| M01 | 🔲 Open | Consolidate skills — merge dual-format chaos into canonical `{name}/SKILL.md` directories |
| M02 | 🔲 Open | Rebuild `skills/README.md` — add all 12+ missing skills with symptoms-first trigger phrases |
| M03 | 🔲 Open | Create 3 new skills: `verify-before-claiming`, `regression-guard`, `measure-first` |
| M04 | 🔲 Open | Create `session-startup` and `session-close` skills |
| M05 | 🔲 Open | Update 4 stale skills: `mobile-nav-click-handling`, `eds-section-style-icons`, `nav-header-eds`, `eds-code-conventions` |
| M06 | ✅ Done | AGENTS.md session startup/close rituals + skill-loading instruction (completed this session) |
| M07 | 🔲 Open | Create `full-width-escape-hatch` skill |
| M08 | ✅ Done | Add "Current Focus" section to PROJECT-STATUS.md (completed this session) |

### Part 2 — Implementation tasks

| Task | Priority | What it fixes |
|------|----------|--------------|
| T01 | P0 | Mobile nav `closeOnFocusLost` bug + hamburger right-alignment |
| T02 | P1 | Testimonials quote text: 26px Lazzer weight 500 (currently 18px) |
| T03 | P1 | Testimonials: add decorative quote mark via CSS pseudo-element |
| T04 | P1 | Testimonials stats card: number top-left 64px/600, label 18px/500, background pattern |
| T05 | P1 | Define `section-pattern-bars` CSS globally; remove from `section-ai-visibility` |
| T06 | P1 | Stats-visibility h2 selector scope fix (currently scoped inside block, h2 is in default content) |
| T07 | P1 | Stats-facts active number: 130px → 180px |
| T08 | P2 | Replace all `!important` overrides with `.full-width` JS pattern |
| T09 | P2 | Header full desktop spec: transparent bg + logo 150×36px + Enterprise arrow + chevron + mega menu animation |
| T10 | P2 | Hero pattern: `calc()` breakpoint positions + add ≥1440px breakpoint |
| T11 | P3 | Clean up redirect block CSS files (logo-marquee, hero-video, promo-cards, solutions-slider) |
| T12 | P3 | Video-card glass border: shrink-wrap around video, not fill grid column |
| T13 | P3 | Enterprise video-card CTA: outline/white on dark (not primary purple) |
| T14 | P3 | Stats-facts: verify 2-column desktop layout (inspect original first) |
| T15 | P2 | Footer full audit: 11 specific requirements from Conv06 P14+P41 |
| T16 | P2 | Implement global `.glass-surface` utility class + `scripts/glass.js` |
| T17 | P2 | Section vertical spacing: 120px padding on sections, not margins |
| T18 | P3 | Marquee verification: logo black, 50px/32px, animation speed, loop seam |

---

## Critical Non-Obvious Technical Facts

These are things an agent would have to discover by trial and error — encoding them here prevents re-learning:

**1. Stats-visibility h2 is in DEFAULT CONTENT, not the block.**  
The heading renders in `.default-content-wrapper`, outside the `.stats-visibility` block. Any CSS rule scoped inside `.stats-visibility` will never match it. The fix lives in a section-scoped rule: `.section.section-dark.section-pattern-bars > .default-content-wrapper > h2`.

**2. `closeOnFocusLost` fires null relatedTarget on mobile.**  
Mobile tap events set `e.relatedTarget = null`. `nav.contains(null)` returns `false`, incorrectly triggering menu close. Fix: `if (!isDesktop.matches) return;` at the top of the function. Without this, tapping nav links on mobile closes the menu before navigation.

**3. Both `header` element and `.nav-wrapper` need the `nav-open` class.**  
If only one element gets the class, the other bleeds gradient through when the mega menu opens (Conv03 P35, P36). Both CSS rules are needed:  
`header.nav-open .nav-wrapper` AND `header .nav-wrapper.nav-open`.

**4. The `.full-width` pattern replaces `!important` on wrapper elements.**  
Global rule in styles.css: `main > .section > .full-width { max-width: none; padding: 0; }`. Add class via JS: `block.closest('.{block}-wrapper')?.classList.add('full-width')`. Never use `!important` on block wrapper/container selectors.

**5. Section padding 120px is the spacing source — NOT block margins.**  
`main > .section { padding: 120px 0; margin: 0; }`. First and last items inside a section have `margin-top: 0` / `margin-bottom: 0`. All inter-section gap comes from section padding only.

**6. `section-pattern-bars` is not yet defined in CSS.**  
Currently the bar pattern SVG is bound to the defunct `section-ai-visibility` class inside `stats-visibility.css`. After T05, it moves to `styles/styles.css` as a global section style, and `stats-visibility.css` references the new class names. Update content file `content/index.plain.html` Section Metadata accordingly.

**7. `getAttribute('src')` not `.src` in import parsers.**  
The `.src` property resolves against browser context and returns `about:error` for failed SVG/lazy loads. `getAttribute('src')` returns the raw authored value. Same for `.poster` vs `getAttribute('poster')`.

**8. Import scripts must emit absolute URLs.**  
Paths starting with `/` must be prefixed with `https://www.semrush.com`. EDS media pipeline needs full URLs.

**9. Testimonials is 3-row, not 5-row.**  
The requirements doc mentions 5 rows, but the authoritative import script (`testimonialsParser()`) produces 3: (0) blockquote + company logo, (1) author image + name/title, (2) stats. The section heading is default content above the block. The 3-row JS is correct.

**10. Glass surface: 12px padding + white border on ALL glass elements.**  
Currently duplicated per-block. T16 consolidates into a single `.glass-surface` utility class in `styles/styles.css` and a `scripts/glass.js` helper (`applyGlassSurface(el)`).

**11. `position: sticky` on header doesn't work with `overflow: hidden` on ancestors.**  
Use `position: fixed` with a dynamic CSS variable `--nav-top-offset` instead. The nav offset must compensate for the announcement bar when present.

**12. SEMRUSH reveal architecture: the reveal element is a SIBLING of `.footer`, not a child.**  
It's inside the `<footer>` tag but alongside `.footer` block. `.footer` has `position: relative; z-index: 1; background: white` to cover the reveal. Reveal element: `position: sticky; bottom: 0; z-index: 0; height: 550px`.

---

## What Was Completed in This Session

1. **Branch merge** — `aem-merged-20260513` created from best-of both branches
2. **AGENTS.md** — session startup/close rituals added; duplicate skill index removed; `PROJECT-PLAN.md` added to Project Reference table
3. **PROJECT-STATUS.md** — "Current Focus" section added at top
4. **PROJECT-BLOCKS.md** — rewritten with correct block names and 4 new blocks
5. **PROJECT-IMPORT.md** — 5 new import script rows added
6. **`skills/stats-facts/stats-facts.js`** — lint fix: `activateStat()` hoisted before use
7. **`PROJECT-PLAN.md`** — created with M01–M08 (meta) + T01–T18 (implementation), fully enriched from all 12 requirements files
8. **This file (AGENTS-CONTEXT.md)** — written as bootstrap for future fresh contexts

---

## What to Do Next (First Open Task)

**M01 — Consolidate skills into single file format.**  

Start by running `ls /app/skills/` to see the full directory. Then for each of the 19 dual-format skills: read both the flat `.md` and the `{name}/SKILL.md`, merge the best content into the directory version, delete the flat file. For the 4 flat-only skills: create a directory, move content into it with frontmatter, delete flat file. Update `_template.md` to show directory/frontmatter format.

After M01 → M02 (rebuild README) → M03 (3 failure-mode skills) → M04 (session skills) → M05 (update stale skills) → M07 (full-width skill) → T01 onwards.

---

## Files You'll Need Most

| File | Why |
|------|-----|
| `PROJECT-PLAN.md` | The task queue — start here |
| `PROJECT-STATUS.md` | Current state, known blockers |
| `skills/README.md` | Skill index — scan before every task |
| `skills/` directory | All skills |
| `conversations/requirements/` | Ground truth for requirements — 12 files |
| `AGENTS.md` | Rules and conventions |
| `blocks/` | All block implementations |
| `styles/styles.css`, `styles/lazy-styles.css` | Global styles and tokens |
