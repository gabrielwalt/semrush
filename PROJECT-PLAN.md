# PROJECT-PLAN.md — Implementation Gap Tasks

Actionable backlog derived from the requirements audit (May 2026).  
**Pick the first `🔲 Open` task, implement it fully, mark it `✅ Done`, then move to the next.**  
Each task is self-contained: file paths, required values, and acceptance criteria are all inline.

---

## How to work this list

1. Read the task. Read the files it references before touching anything.
2. Implement the change. Run `npm run lint` after every code change.
3. Verify visually at `localhost:3000` against the original at `https://www.semrush.com/`.
4. Mark the task `✅ Done` and update `PROJECT-STATUS.md` if the task closes a known issue.
5. Move to the next `🔲 Open` task.

---

## Active tasks

*No open tasks. All homepage, enterprise, and visual polish tasks are complete.*

*When new work is identified, add tasks here with a unique ID, status, priority, affected files, problem description, fix, and acceptance criteria.*

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
