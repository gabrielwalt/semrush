# PROJECT-PLAN.md — Implementation Gap Tasks

Actionable backlog derived from the requirements audit (May 2026).  
**Pick the first `🔲 Open` task, implement it fully, mark it `✅ Done`, then move to the next.**  
Each task is self-contained: file paths, required values, and acceptance criteria are all inline.

---

## How to work this list

**Required skills:** Load `executing-plan-tasks` before starting any task. Load `writing-plan-tasks` before creating or editing tasks.

**Every task has a Type label:**
- **Gap** = current implementation differs from the original site. Verify by comparing original site vs. localhost.
- **Enhancement** = new behavior not on the original site. Verify by inspecting localhost only.

**Execution protocol (from `executing-plan-tasks`):**
1. Read the task. Read the files it references before touching anything.
2. **Confirm the problem exists BEFORE coding:**
   - **Gap tasks:** Open the original site AND localhost. Visually confirm you can see the exact delta described. If you cannot see it, STOP and ask the user — do not guess.
   - **Enhancement tasks:** Open localhost. Confirm the current state matches the "before" described. If it already matches the requested outcome, STOP and ask the user.
3. Implement the change. Run `npm run lint` after every code change.
4. **Verify AFTER coding:**
   - **Gap tasks:** Reload localhost, inspect the element, confirm it now matches the original site. Visually compare at the same viewport width.
   - **Enhancement tasks:** Reload localhost, confirm the element now has the requested state.
5. Check adjacent elements for regressions (load `regression-guard` if shared CSS).
6. Mark the task `✅ Done` and update `PROJECT-STATUS.md`.
7. **After 2 failed fix attempts: STOP.** Document what was tried. Ask the user. Do not iterate blindly.

---

## Active tasks

### H01 — 🔲 Open — Fix all broken images

**Priority:** P0 (blocks entire visual fidelity)  
**Type:** Gap  
**Affected files:** `content/index.plain.html`, `content/footer.plain.html`, possibly block JS files  
**Problem:** Some images on the homepage may be 404ing or failing to render. Image `src` attributes reference `content.da.live` CDN URLs which may not resolve in local dev, and `<source>` `srcset` attributes reference `main--semrush--gabrielwalt.aem.page` which also may not resolve locally.  
**Investigation steps (do these first):**
1. Open http://localhost:3000/ in the browser.
2. Open DevTools → Console, filter for 404/failed network requests on image URLs.
3. Open DevTools → Network tab, filter by "Img" type, identify any images with error status.
4. Compare each broken image against https://www.semrush.com/ to see what should render there.
5. Cross-reference `content.da.live` URLs — the local dev server should proxy these. If not, the AEM CLI may need configuration, or the URLs need to be rewritten to relative paths or `main--semrush--gabrielwalt.aem.page` paths.
**Fix approach:** For each broken image, determine whether it's a URL resolution issue (CDN not reachable) or a missing asset. If the asset exists in the repo (check `content/images/` and `icons/`), switch to a local reference. If it's a remote CDN issue, note it as an environment constraint.  
**Acceptance criteria:** Zero 404s in console on image resources. All visible images render matching their counterparts on semrush.com.

---

### H02 — 🔲 Open — Fix spacing between insights-widget and video block

**Priority:** P1  
**Type:** Gap  
**Affected files:** `blocks/insights-widget/insights-widget.css`, `blocks/video/video.css`, `styles/styles.css`  
**Problem:** On the original site, the hero section flows as: H1 → subtitle → insights-widget → video block, all within the same `section-centered` section. Inspect the original site to measure the exact spacing between the bottom of the search form and the top of the video. The current implementation may have too much or too little gap.  
**Investigation steps:**
1. On https://www.semrush.com/, use DevTools to inspect the margin/padding between the insights-widget (search bar area) and the video element below it. Look at the computed margin-bottom of the widget and margin-top of the video's wrapper.
2. On http://localhost:3000/, measure the same gap.
3. Compare the two values. The gap on the original should be the target.
**Context:** Both blocks are inside the same `section-centered` section in `content/index.plain.html`. The global spacing rule `main > .section > .default-content-wrapper + *` adds `var(--block-padding)` (64px) between sibling wrappers. The insights-widget and video may need tighter or different spacing since they're part of the hero flow.  
**Fix approach:** Adjust margin/padding on `.insights-widget-wrapper` bottom margin or `.video-wrapper` (or `.hero-video-wrapper`) top margin within the `section-centered` context to match the original.  
**Acceptance criteria:** Gap between insights-widget and video on localhost matches semrush.com within 2px.

---

### H03 — 🔲 Open — Fix wrong background of 1st video-card block (Semrush One)

**Priority:** P1  
**Type:** Gap  
**Affected files:** `blocks/video-card/video-card.css`, `content/images/semrush-one-bg.svg`  
**Problem:** The first video card (`.video-card-semrush-one`) should have a distinctive purple-to-mint gradient background with an SVG pattern overlay. On the original site, inspect the exact gradient direction, color stops, and SVG pattern.  
**Investigation steps:**
1. On https://www.semrush.com/, find the "Your edge to win every search" card. Use DevTools to inspect the `.video-card-container` (or equivalent parent) computed `background` property. Note the exact `linear-gradient` values and the SVG pattern URL.
2. On http://localhost:3000/, inspect the same element. Compare backgrounds.
3. The current CSS at `video-card.css:92-96` sets:
   ```css
   background:
     url('/content/images/semrush-one-bg.svg') no-repeat 50% 50%,
     linear-gradient(182deg, rgb(193 144 255) -4.72%, rgb(220 238 235) 68.72%, rgb(255 255 255) 152.44%);
   ```
4. Verify the SVG at `/content/images/semrush-one-bg.svg` exists and renders correctly. Check if the pattern positioning or scale differs.
**Acceptance criteria:** Background visually matches the original site's purple-to-mint gradient with pattern overlay.

---

### H04 — 🔲 Open — Fix video not playing in 1st video-card block

**Priority:** P1  
**Type:** Gap  
**Affected files:** `blocks/video-card/video-card.js`, `content/index.plain.html`  
**Problem:** The Semrush One video card should show an autoplaying video. On the original site, confirm the video at `https://www.semrush.com/static/index/videos/semrush_one.mp4` loads and autoplays. In the current implementation, the `<video>` element may not be created or the source URL may be unreachable.  
**Investigation steps:**
1. On https://www.semrush.com/, find the Semrush One video card. Confirm a `<video>` element exists and is playing.
2. On http://localhost:3000/, inspect the same card in DevTools. Check:
   - Does the `.video-card-glass` contain a `<video>` element or just an `<img>`?
   - If `<video>` exists, are there any console errors about the source URL?
   - The video URL in `content/index.plain.html` line 96 is: `https://www.semrush.com/static/index/videos/semrush_one.mp4` — this is an external URL that should be reachable.
3. The `video-card.js` `getVideoSources()` function checks `link.href` (which EDS may rewrite) and then `link.textContent` (the original URL). Verify the URL extraction works for this content structure.
**Context:** EDS rewrites link `href` attributes but leaves `textContent` intact. The `getVideoSources()` function at `video-card.js:1-16` has a fallback that checks `link.textContent` — verify this fallback triggers correctly.  
**Acceptance criteria:** Video autoplays within the glass frame of the Semrush One card, matching the original site behavior.

---

### H05 — 🔲 Open — Fix missing background of 2nd video-card block (Enterprise)

**Priority:** P1  
**Type:** Gap  
**Affected files:** `blocks/video-card/video-card.css`, `content/images/enterprise-bg.svg`  
**Problem:** The Enterprise video card (`.video-card-enterprise`) should have a black background with an SVG pattern overlay. On the original site, this card has a dark/black base with a subtle decorative SVG in the bottom-right area.  
**Investigation steps:**
1. On https://www.semrush.com/, find the "Bigger scale. Bigger advantage." card. Inspect its background.
2. On http://localhost:3000/, inspect the same card. Compare.
3. Current CSS at `video-card.css:101-107`:
   ```css
   background:
     url('/content/images/enterprise-bg.svg') no-repeat 100% 100% / contain,
     rgb(0 0 0);
   ```
4. Verify `/content/images/enterprise-bg.svg` exists (it does — confirmed in file listing) and renders correctly. Check if the SVG itself has visual content or is transparent/empty.
**Fix approach:** If the SVG is empty or wrong, extract the correct SVG pattern from the original site and replace it. If the CSS positioning/sizing is wrong, adjust.  
**Acceptance criteria:** Enterprise card shows black background with the correct SVG pattern overlay matching the original.

---

### H06 — 🔲 Open — Fix wrong background on carousel-slider-expansible items

**Priority:** P1  
**Type:** Gap  
**Affected files:** `blocks/carousel-slider/carousel-slider.css`, `content/images/pattern-toolkit-card.svg`  
**Problem:** The expandable carousel cards (Solutions section) should have a specific background color and pattern. On the original site, each card has a mint-green background (`rgb(220, 238, 235)`) with an SVG pattern.  
**Investigation steps:**
1. On https://www.semrush.com/, scroll to the "Get seen. Get cited. Be the answer." solutions carousel. Inspect a collapsed card's background — note both the background-color and background-image.
2. On http://localhost:3000/, inspect the same cards.
3. Current CSS at `carousel-slider.css:197-199`:
   ```css
   background-color: rgb(220 238 235);
   background-image: url('/content/images/pattern-toolkit-card.svg');
   ```
4. Compare the SVG pattern — check if the current `pattern-toolkit-card.svg` renders correctly. On the original site, the pattern may be a different SVG or positioned differently.
5. Check if the issue is the SVG pattern itself (wrong/missing content) or the CSS positioning (background-position, background-size).
**Acceptance criteria:** Carousel cards have the same background color + pattern as the original site.

---

### H07 — 🔲 Open — Fix "The data you need to outrank the competition" section width

**Priority:** P1  
**Type:** Gap  
**Affected files:** `blocks/stats-facts/stats-facts.css`, `styles/lazy-styles.css`  
**Problem:** The stats-facts section is rendering wider than the allowed max-width (`--container-max-width: 1440px`). On the original site, this section is constrained within the global container width.  
**Investigation steps:**
1. On https://www.semrush.com/, scroll to "The data you need to outrank the competition". Measure the section's total width and its inner content width.
2. On http://localhost:3000/, measure the same. The section container (`.section.stats-facts-container`) may have `max-width: none` or `padding: 0` causing it to span the full viewport.
3. Check `stats-facts.css:146-152`: the `@media (width >= 1024px)` rule sets `.section.stats-facts-container` to `display: grid; grid-template-columns: 1fr 2fr;` — this grid is applied to the `.section` itself, which in EDS gets `max-width: var(--container-max-width)` from `styles.css:409-413`. But the section's child `> div` wrappers also get `max-width` and `padding` — the grid on the section may override this.
4. The issue likely is that `.section.stats-facts-container` applies grid directly on the section (which is `main > .section`) but the container constraint is on `main > .section > div`. The grid makes the section itself wider than intended, or the inner divs escape their container.
**Fix approach:** Ensure the stats-facts section respects `--container-max-width`. The grid layout should be applied in a way that preserves the container constraint — either by wrapping the grid inside the max-width container, or by applying `max-width` to the section itself when it uses this grid.  
**Acceptance criteria:** The stats-facts section content is constrained to `1440px` max-width plus padding, matching the original site.

---

### H08 — 🔲 Open — Fix stats-facts title placement (title and stats side-by-side incorrectly)

**Priority:** P1  
**Type:** Gap  
**Affected files:** `blocks/stats-facts/stats-facts.css`, `styles/lazy-styles.css`  
**Problem:** On the original site, the "The data you need to outrank the competition" title is in a left column and the stats-facts block is in the right column, using a 2-column layout. Currently the section uses `grid-template-columns: 1fr 2fr` on the `.section.stats-facts-container`, which makes the title's `.default-content-wrapper` and the `.stats-facts-wrapper` grid children — BUT they should not overlap or appear misaligned.  
**Investigation steps:**
1. On https://www.semrush.com/, inspect the layout of this section. Note:
   - Is the heading ("The data you need...") in the left column?
   - Is the stats block (28B Keywords, 43T Backlinks...) in the right column?
   - Does the heading stick on scroll (position: sticky)?
   - What's the gap between the two columns?
2. On http://localhost:3000/, inspect the same layout. If the title and stats are overlapping, not side-by-side, or misaligned, document the difference.
3. The CSS at `stats-facts.css:146-157` creates the 2-col grid. The `.default-content-wrapper` gets `position: sticky; top: 120px`. Verify this sticky behavior works correctly and the heading stays in the left column.
**Context:** The user reports "the two should not be next to each other" — this may mean the title and stats are rendering side-by-side when they shouldn't be at certain viewport widths, OR it may mean the vertical alignment is wrong (e.g., title should be at top of its column, not vertically centered alongside the first stat). Inspect the original carefully before implementing.  
**Acceptance criteria:** Title column (left) and stats column (right) match the original site's layout, alignment, and sticky behavior.

---

### H09 — 🔲 Open — Fix missing background on stats-facts items

**Priority:** P1  
**Type:** Gap  
**Affected files:** `blocks/stats-facts/stats-facts.css`  
**Problem:** On the original site, each stat row's number area (`.stat-number`) has a visible background — at minimum the active row has a dark background, but even inactive rows have a subtle background on the arrow area. Currently, inactive rows may lack the expected background treatment.  
**Investigation steps:**
1. On https://www.semrush.com/, inspect each stat row (both active and inactive). Note:
   - What background does the `.stat-number` wrapper have on inactive rows?
   - What background does the `.stat-arrow` have on inactive rows? (Currently set to `rgb(240 241 242)`)
   - Does the active row's `.stat-number` have a dark background? (Currently set to `var(--stats-active-bg)`)
2. On http://localhost:3000/, compare. The issue may be that `stat-number` on inactive rows has no visible background (transparent), while the original shows a light gray or subtle fill.
3. Also check if the arrow SVG pattern (`/icons/pattern-stats.svg`) renders correctly on the arrow indicator.
**Acceptance criteria:** Stat row backgrounds (both active and inactive states) match the original site.

---

### H10 — 🔲 Open — Fix missing margin between stats-facts items

**Priority:** P1  
**Type:** Gap  
**Affected files:** `blocks/stats-facts/stats-facts.css`  
**Problem:** On the original site, there is visible spacing (margin/gap) between each stat row. Currently the stat rows may be touching each other vertically with no gap.  
**Investigation steps:**
1. On https://www.semrush.com/, measure the vertical gap between stat rows (bottom of one `.stat-row` to top of the next). Use DevTools computed styles.
2. On http://localhost:3000/, measure the same gap.
3. Currently `stats-facts.css` does not set any `margin-bottom` or `gap` on `.stat-row` elements. The only padding is `padding: 0` on `.stat-row`.
**Fix approach:** Add appropriate `margin-bottom` (or use `gap` on the parent flex/grid) to `.stat-row` elements to match the original site spacing.  
**Acceptance criteria:** Gap between stat rows matches the original site (likely 8-16px, confirm by measuring).

---

### H11 — 🔲 Open — Fix missing centering of "AI Visibility Index" section via section-ai-visibility

**Priority:** P1  
**Type:** Gap  
**Affected files:** `styles/styles.css` or `styles/lazy-styles.css`, `blocks/stats-visibility/stats-visibility.css`  
**Problem:** The "AI Visibility Index" section uses `section-dark` and `section-ai-visibility` section styles. According to `PROJECT-BLOCKS.md`, `section-ai-visibility` was "removed — fully replaced by section-dark + section-pattern-bars". However, the content at `index.plain.html:454-459` still references `section-ai-visibility`. The section needs to be centered.  
**Investigation steps:**
1. On https://www.semrush.com/, inspect the "AI Visibility Index" section. Is the heading, description, and CTA centered? What about the bar chart table — is it centered within the section?
2. On http://localhost:3000/, check whether the content is left-aligned or centered. The `stats-visibility.css:15-17` sets `.section.section-dark.section-pattern-bars > .default-content-wrapper { text-align: center; }` and also adds a `::before` icon — but if `section-ai-visibility` is not defined as a CSS class, it may still be in the HTML but have no effect.
3. The issue: `section-ai-visibility` is listed in the content's section-metadata but has no CSS definition (it was removed). Either re-add CSS for `section-ai-visibility` or ensure the centering comes from `section-pattern-bars`.
**Fix approach:** Since the content already references `section-ai-visibility`, add CSS rules for `.section.section-ai-visibility` that center the section content. Alternatively, if `section-pattern-bars` already handles centering, verify it's applied correctly.  
**Acceptance criteria:** The AI Visibility Index section heading, description, CTA, and table are all centered, matching the original site.

---

### H12 — 🔲 Open — Fix missing icon above "AI Visibility Index" title

**Priority:** P1  
**Type:** Gap  
**Affected files:** `blocks/stats-visibility/stats-visibility.css`, `icons/ai-visibility-index.svg`  
**Problem:** On the original site, there should be a decorative icon above the "AI Visibility Index" heading. This icon should be injected via CSS `::before` pseudo-element on the section's `.default-content-wrapper`, tied to the `section-ai-visibility` style class.  
**Investigation steps:**
1. On https://www.semrush.com/, look above the "AI Visibility Index" heading. Is there an icon/badge? What does it look like? Measure its size.
2. Currently `stats-visibility.css:18-26` has:
   ```css
   .section.section-dark.section-pattern-bars > .default-content-wrapper::before {
     content: '';
     display: block;
     width: 136px;
     height: 136px;
     margin: 0 auto 32px;
     background: url('/icons/ai-visibility-index.svg') no-repeat center / contain;
   }
   ```
3. Verify that `/icons/ai-visibility-index.svg` exists (confirmed — it does) and contains the correct icon artwork.
4. On http://localhost:3000/, check if the `::before` pseudo-element is being generated. If the section doesn't have the `section-pattern-bars` class applied, the selector won't match. Check the section's actual classes in the rendered DOM.
**Fix approach:** Either ensure the section gets both `section-dark` and `section-pattern-bars` classes (check section-metadata processing), or change the CSS selector to target `section-ai-visibility` instead/additionally.  
**Acceptance criteria:** A decorative icon appears above the "AI Visibility Index" heading, matching the original site.

---

### H13 — 🔲 Open — Fix missing section background image at bottom of section-ai-visibility

**Priority:** P1  
**Type:** Gap  
**Affected files:** `styles/styles.css`, `blocks/stats-visibility/stats-visibility.css`, `icons/pattern-ai-vis-index.svg`  
**Problem:** The AI Visibility Index section should have a decorative background image/pattern at the bottom of the section. The current CSS at `styles.css:452-455` sets:
```css
main .section.section-pattern-bars {
  background-image: url('/icons/pattern-ai-vis-index.svg');
  background-repeat: repeat-x;
  background-position: 0% 100%;
}
```
**Investigation steps:**
1. On https://www.semrush.com/, scroll to the bottom of the AI Visibility Index dark section. Is there a decorative bar/stripe pattern at the bottom edge?
2. On http://localhost:3000/, check if the same pattern appears. If not, verify:
   - Does the section have the `section-pattern-bars` class? (Check the rendered DOM.)
   - Does `/icons/pattern-ai-vis-index.svg` contain visible artwork?
   - Is the SVG being loaded (check Network tab)?
   - Is `background-image` on `.section-dark` overriding `background-image` from `.section-pattern-bars`? (Specificity: both are `main .section.section-X` — the later rule should win if ordering is correct.)
3. Check if the `background-color` from `section-dark` and the `background-image` from `section-pattern-bars` work together correctly (they should — `background-color` and `background-image` are different properties).
**Acceptance criteria:** A decorative pattern is visible at the bottom of the AI Visibility Index dark section, matching the original.

---

### H14 — 🔲 Open — Fix missing testimonials block content (ZoomInfo logo, quote mark, author info, stats)

**Priority:** P1 (most visible content gap)  
**Type:** Gap  
**Affected files:** `blocks/testimonials/testimonials.js`, `blocks/testimonials/testimonials.css`, `content/index.plain.html`  
**Problem:** Multiple content elements are missing from the testimonials block:  
1. **ZoomInfo logo** — should appear at the top of the dark quote card
2. **Pink quote mark** — a single prominent pink/magenta opening quote mark before "Semrush for Enterprise…"
3. **Author info** — "James Roth\nCRO at ZoomInfo" with circular headshot photo to the left, at the bottom of the dark card
4. **Stats card "+373%"** — the right grey card should show the "+373%" number prominently
5. **Hatched background** — the grey stats card should have a diagonal hatched pattern at the top-right (SVG pattern)
6. **"Increase in share of voice"** text — at the bottom of the grey stats card

**Investigation steps:**
1. On https://www.semrush.com/, find the testimonials section ("How we help marketers win"). For the quote card (dark/black box), note:
   - Is there a company logo (ZoomInfo) at the top?
   - Is there a pink/magenta decorative quote mark? What color exactly?
   - Where is the author photo, name, and role positioned?
2. For the stats card (grey box on the right), note:
   - Is "+373%" displayed? At what size and position?
   - Is there a hatched/diagonal pattern at the top-right?
   - Is "Increase in share of voice" at the bottom?
3. On http://localhost:3000/, compare. Check the `testimonials.js` row parsing logic:
   - `content/index.plain.html` lines 465-491 define 3 rows: Row 0 = blockquote, Row 1 = author image + name, Row 2 = stat number + label.
   - `testimonials.js` currently expects Row 0 = quote (logo, blockquote, author), Row 1 = stats. But the content has 3 rows (Row 0 = blockquote only, Row 1 = author, Row 2 = stats). **This mismatch is likely the root cause.**
4. The JS at `testimonials.js:7-8` takes `rows[0]` as quoteRow and `rows[1]` as statsRow, but the content has the blockquote in row 0, author in row 1, and stats in row 2. Row 2 (stats) is never read.

**Fix approach:** Update `testimonials.js` to handle the 3-row content model:
- Row 0: blockquote
- Row 1: author image + name/role (currently expects logo + blockquote + author all in row 0)
- Row 2: stats number + label

Additionally:
- The ZoomInfo logo is missing from the content — it may need to be added to `content/index.plain.html` or extracted from the original site.
- The pink quote mark can be styled via CSS `::before` with `color: magenta/pink` (check exact color on original).
- Author role "CRO at ZoomInfo" — check if the content has it or if it needs to be added.

**Acceptance criteria:** All 6 listed elements render correctly in the testimonials block matching the original site's layout and content.

---

### H15 — 🔲 Open — Fix missing text descriptions on 2nd carousel-slider (resources)

**Priority:** P1  
**Type:** Gap  
**Affected files:** `blocks/carousel-slider/carousel-slider.css`, `content/index.plain.html`  
**Problem:** The resources carousel (default variant, no `.carousel-slider-expansible`) cards should show a text description paragraph below the title. Currently, each card shows only the title (h3 with link) and a category label (p), but no description text.  
**Investigation steps:**
1. On https://www.semrush.com/, scroll to the "Stay ahead of what's next" resources carousel. Click on or inspect a card. Does each card have:
   - An image
   - A title (linked)
   - A short description paragraph
   - A category label?
2. On http://localhost:3000/, inspect the same cards. What content is in each card's text cell?
3. Check `content/index.plain.html` lines 496-585 — each carousel row has a `<div>` with image, then a `<div>` with `<h3>` (linked title) + `<p>` (category label). There is **no description paragraph** in the authored content — only title and category.
4. Compare with the original site to see if the description comes from the original page content (and was not imported) or if it's dynamically loaded.

**Fix approach:** If the original site shows descriptions, the content in `index.plain.html` is incomplete — the descriptions need to be added to each resource card's second cell (between the h3 and the category p). This is a **content gap**, not a CSS gap.  
**Note:** Content changes must go through the import script, not manual edits. The fix may involve updating the import parser to extract descriptions from the original page.  
**Acceptance criteria:** Each resource card shows title, description, and category label matching the original site.

---

### H16 — 🔲 Open — Fix footer "Get started with Semrush today" alignment

**Priority:** P2  
**Type:** Gap  
**Affected files:** `blocks/footer/footer.css`  
**Problem:** The footer CTA heading "Get started with Semrush today" should be left-aligned, not centered.  
**Investigation steps:**
1. On https://www.semrush.com/, scroll to the footer. Is "Get started with Semrush today" left-aligned within its column? On the original site, the footer uses a 2-column layout: CTA on the left (~1/3 width), link columns on the right (~2/3 width). The heading within the CTA area should be left-aligned.
2. On http://localhost:3000/, check the alignment. Look at computed `text-align` on the heading and its parent containers.
3. The current CSS at `footer.css:33-39` doesn't set `text-align: center` explicitly, but a parent may inherit centering. Check if `footer.css:117-137` grid layout at `>=1024px` properly positions the CTA column.
**Fix approach:** Ensure `text-align: left` on the CTA heading and its container. The overall footer layout (grid columns 1fr 2fr) should naturally left-align the CTA column contents.  
**Acceptance criteria:** "Get started with Semrush today" is left-aligned in the footer, matching the original site.

---

### H17 — 🔲 Open — Add social media icons to footer

**Priority:** P2  
**Type:** Gap  
**Affected files:** `blocks/footer/footer.js`, `blocks/footer/footer.css`, `content/footer.plain.html`  
**Problem:** The original site's footer has social media icons (Facebook, Instagram, X/Twitter, LinkedIn, YouTube, TikTok). The current implementation has the SVG icon files in `icons/` directory (facebook.svg, instagram.svg, x-twitter.svg, linkedin.svg, youtube.svg, tiktok.svg) but they are not rendered in the footer.  
**Investigation steps:**
1. On https://www.semrush.com/, scroll to the bottom of the footer. Where exactly are the social icons positioned? Are they in the bottom bar next to the copyright text? Are they next to the link columns?
2. Note the icon size, spacing, and whether they are colored or monochrome.
3. On http://localhost:3000/, confirm the social icons are absent.
4. Check `content/footer.plain.html` — are social media links present in the content? If not, they need to be added (as regular `<a>` links with social platform URLs).
5. The `PROJECT-BLOCKS.md` mentions `decorateSocialLinks()` — search for this function in `footer.js` or `scripts.js`. Currently `footer.js` does NOT have this function (only 30 lines, loads fragment and creates reveal).

**Fix approach:** Either:
- Add social links to `content/footer.plain.html` and implement `decorateSocialLinks()` in `footer.js` to detect href patterns and render icon SVGs, OR
- Hardcode social icons in the footer JS decoration if they're not in the authored content.
The social icons need CSS styling (size, spacing, hover effects).  
**Acceptance criteria:** Social media icons appear in the footer matching the original site's position, size, and icons.

---

### H18 — 🔲 Open — Add Adobe logo to footer

**Priority:** P2  
**Type:** Gap  
**Affected files:** `blocks/footer/footer.css`, `blocks/footer/footer.js` or `content/footer.plain.html`  
**Problem:** The original site's footer includes an Adobe logo. The CSS for this was provided:
```css
.adobe-logo {
    background: url(data:image/svg+xml;base64,...) no-repeat 50% / contain;
    display: block;
    flex-shrink: 0;
    height: 15px;
    margin-bottom: 48px;
    width: 62px;
}
```
**Investigation steps:**
1. On https://www.semrush.com/, find the Adobe logo in the footer. Where is it positioned? Is it near the CTA text, in the bottom bar, or elsewhere?
2. Note the exact position relative to other footer elements.
3. The repo has `icons/adobe.svg` — this may already be the logo. Check if it can be used instead of the base64 data URI.
**Fix approach:** Add an element with class `.adobe-logo` to the footer DOM (either via content or JS decoration). Apply the provided CSS. Position it correctly relative to other footer elements per the original site layout.  
**Acceptance criteria:** Adobe logo appears in the footer at the correct position, matching the original.

---

### H19 — 🔲 Open — Add language selector to footer

**Priority:** P2  
**Type:** Gap  
**Affected files:** `blocks/footer/footer.js`, `blocks/footer/footer.css`, `content/footer.plain.html`  
**Problem:** After the "Cookies Settings" link in the footer bottom bar, the original site has a language selector (typically a globe icon + "English" dropdown or similar).  
**Investigation steps:**
1. On https://www.semrush.com/, scroll to the very bottom of the footer. After "Privacy Policy", "Terms of Service", "Cookies Settings" — is there a language selector? What does it look like? Is it a `<select>`, a button with dropdown, or just text?
2. Note the exact content and behavior (does it open a dropdown of languages?).
3. On http://localhost:3000/, confirm this element is absent.
**Fix approach:** Add a language selector element after the Cookies Settings link. This could be:
- A simple text link "English" with a globe icon (static, since this is a migration demo)
- A full dropdown (if the original has one, replicate the visual appearance even if non-functional)
**Acceptance criteria:** A language selector appears after "Cookies Settings" in the footer bottom bar, visually matching the original.

---

### H20 — 🔲 Open — Add SEMRUSH SVG wordmark to footer reveal

**Priority:** P2  
**Type:** Enhancement  
**Affected files:** `blocks/footer/footer.js`, `blocks/footer/footer.css`  
**Problem:** The footer reveal currently shows "SEMRUSH" as text in the `<span>`. The user wants the actual SEMRUSH SVG wordmark (provided below) rendered instead. The SVG is a 1376×192 artboard with the full SEMRUSH letterforms.  
**SVG provided:** (see user message — 1376×192 SVG with path data for "SEMRUSH" letters in `fill="#181e15"`)  
**Investigation steps:**
1. On https://www.semrush.com/, scroll to the very bottom to reveal the SEMRUSH element. Is it an SVG or text? What size does it render at?
2. On http://localhost:3000/, the current reveal uses `<span>SEMRUSH</span>` styled with `font-size: clamp(120px, 15vw, 220px)`. Should this be replaced with the SVG?
3. The SVG needs to be positioned at the bottom of the page with `position: sticky; bottom: 0` so it gets revealed as the footer scrolls away.
**Fix approach:** Replace the `<span>SEMRUSH</span>` with the inline SVG or an `<img>` referencing a saved SVG file. Adjust CSS to size and position the SVG appropriately. Ensure the sticky reveal behavior is preserved.  
**Acceptance criteria:** SEMRUSH SVG wordmark appears in the footer reveal area, correctly sized and revealed on scroll, matching the original.

---

### H21 — 🔲 Open — Add vertical hatched background behind SEMRUSH reveal

**Priority:** P2  
**Type:** Gap  
**Affected files:** `blocks/footer/footer.css`, possibly new SVG asset  
**Problem:** Behind the SEMRUSH reveal wordmark, the original site has a vertical hatched/striped background pattern that spans the full width of the page. Currently the reveal has a solid mint-green background (`rgb(220 238 235)`) with no pattern.  
**Investigation steps:**
1. On https://www.semrush.com/, scroll to the very bottom to fully reveal the SEMRUSH area. Is there a hatched/striped/diagonal-line pattern behind or around the wordmark? What does the pattern look like — vertical lines, diagonal lines, crosshatch?
2. What color is the pattern? Is it the same mint-green with slightly darker lines, or a different pattern?
3. Does the pattern span the full viewport width?
**Fix approach:** Create or extract the hatched SVG pattern. Apply it as a `background-image` on `.footer-reveal` alongside the existing `background-color`. Use `background-repeat: repeat` if it's a tiling pattern.  
**Acceptance criteria:** The footer reveal area shows the hatched background pattern across the full viewport width, matching the original site.

---

### H22 — 🔲 Open — Add external-link arrow icon on nav items pointing to other domains

**Priority:** P1  
**Type:** Gap  
**Affected files:** `blocks/header/header.js`, `blocks/header/header.css`

**What's wrong:** On the original site, the "Enterprise" top-level nav entry displays a small diagonal-arrow icon (↗) after the label, indicating it navigates to a different domain (`enterprise.semrush.com`). On the current implementation, the "Enterprise" nav item has no arrow — it looks identical to the internal nav items (Products, Pricing, Resources).

**Evidence:** 
- The nav content at `content/nav.plain.html:85` defines `<a href="https://enterprise.semrush.com/">Enterprise</a>` — a cross-domain link.
- The CSS at `header.css:365-375` already contains the arrow SVG as a `::after` pseudo-element, BUT it targets `.nav-items > .nav-item:last-child a::after`. This selector doesn't match because `header.js:115-117` replaces the `<a>` element with a `<span class="nav-item-label">` during `buildNavFromHeadings()` — so there is no `<a>` inside the `.nav-item` for the CSS to attach the `::after` to.
- On the original site, the arrow is applied via `[target=_blank]:after` — it targets any link with `target="_blank"`. This means any link pointing to an external domain should get the arrow automatically.

**Root cause:** Two problems:
1. **JS replaces `<a>` with `<span>`:** `header.js:115-117` creates `<span class="nav-item-label">` and stores the href in `label.dataset.href`. The original `<a>` tag is discarded. CSS `::after` on `a` never matches because there is no `<a>` in the rendered DOM.
2. **CSS targets `:last-child` instead of external links:** Even if the `<a>` were preserved, the selector `.nav-item:last-child a::after` only targets the last nav item. If "Enterprise" isn't last, or if new nav items are added, the arrow breaks. The original site's approach is better: `[target=_blank]:after` applies to any external link generically.

**Fix approach:** 
- **Option A (preferred — generic):** In `header.js` `buildNavFromHeadings()`, for nav items that have no mega-panel (no dropdown content between H2s), render the label as an `<a>` element instead of a `<span>`. If the href points to a different domain, add `target="_blank"` and `rel="noopener"`. Then change the CSS to use `[target="_blank"]::after` instead of `.nav-item:last-child a::after`, so the arrow appears automatically on any external-domain link in the nav. This matches the original site's pattern and is future-proof.
- **Option B (targeted):** Keep the current span approach but add JS that detects external hrefs and injects the arrow SVG as an `<img>` or inline SVG element. Less clean but avoids changing the nav item rendering pattern.

The arrow SVG CSS (from original site):
```css
[target="_blank"]::after {
  content: '';
  display: inline-block;
  vertical-align: middle;
  margin-left: 4px;
  block-size: 16px;
  inline-size: 16px;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggc3Ryb2tlPSIjMTgxZTE1IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiIGQ9Im00IDEyIDgtOCIvPjxwYXRoIHN0cm9rZT0iIzE4MWUxNSIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNNS41IDRIMTJ2Ni41Ii8+PC9zdmc+");
  background-size: contain;
  background-repeat: no-repeat;
}
```

**Verification (implementing agent MUST do all of these):**
1. Open https://www.semrush.com/ → look at the top nav bar. Confirm the "Enterprise" entry has a small diagonal arrow icon (↗) to the right of the text. Note its size (~16×16px) and spacing from the label text.
2. Open http://localhost:3000/ → look at the same nav bar. Confirm the "Enterprise" entry has NO arrow icon — it looks the same as "Products", "Pricing", "Resources".
3. Implement the fix in `blocks/header/header.js` and `blocks/header/header.css`.
4. Reload localhost → confirm "Enterprise" now shows the arrow icon. Inspect the element — confirm the icon is 16×16px, appears as a `::after` pseudo-element or inline element, and matches the original site's appearance.
5. Confirm the arrow is NOT shown on internal nav items (Products, Pricing, Resources).
6. Also check `content/nav.plain.html` for other external links inside mega-menu panels (e.g., `https://developer.semrush.com/api/` on line 29, `https://ai-visibility-index.semrush.com/` on line 55). If these are visible in the mega-menu dropdown, they should also get arrows on the original site — verify whether they do and replicate if so.
7. Test on mobile (< 1024px viewport) — verify the arrow appears or is appropriately hidden, matching the original site's mobile behavior.
8. If the fix doesn't work after 2 attempts, stop and ask the user. Document what was tried.

**Acceptance criteria:** All nav links pointing to external domains show a 16×16px diagonal arrow icon after the label text. Internal links show no arrow. The approach is generic (based on the link's domain, not hardcoded to a specific item).

---

## Completed work (summary)

| Area | Completed |
|------|-----------|
| Merge fix: testimonials JS+CSS, footer separator | P01–P05 |
| Skills library consolidation and meta-work | M01–M08 |
| Mobile nav closeOnFocusLost fix | T01 |
| Testimonials: quote size, marks, stats card | T02–T04 |
| Section style: section-pattern-bars definition | T05 |
| Stats-visibility h2 display size + spacing | T06 |
| Stats-facts active number 180px | T07 |
| Remove !important from all blocks; JS full-width pattern | T08 |
| Header transparent bg + desktop spec | T09 |
| Hero pattern calc() breakpoints | T10 |
| Redirect block CSS cleanup | T11 |
| Video-card glass shrink-wraps media | T12 |
| Enterprise video-card white outline CTA | T13 |
| Stats-facts 2-col section grid | T14 |
| Footer full requirements | T15 |
| Glass-surface utility in styles.css | T16 |
| Section vertical spacing via padding | T17 |
| Marquee logo size, animation, spacing | T18 |
| Enterprise: testimonials-carousel block | E01 |
| Enterprise: tabs block | E02 |
| Enterprise: video-card-enterprise-platform variant | E03 |
| Enterprise: case-study block | E04 |
| Video-card background SVG assets | V01 |
| Hero section breakpoint verification | V02 |

---

## Next priorities (not yet planned)

- **Semrush One page** — re-import content when ready, then verify columns-stats / cards-icon / cards-awards
- **PageSpeed 100** — performance validation on feature branch
- **Accessibility WCAG 2.1 AA** — audit and fix
- **Bulk import** — additional pages (Pricing, SEO, Features)
