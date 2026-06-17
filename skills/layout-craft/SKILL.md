---
name: layout-craft
description: The positive method for rebuilding elegant spatial composition during migration — hierarchy via combined dimensions, rhythm (tight groupings + generous separations), the squint test, flex/grid/container-query tool choice, and optical alignment. Use when building the layout/composition of a page or block, when a layout feels "off" despite correct colors/fonts, or when hierarchy is unclear. Adapted from impeccable.style's layout. Defers EDS section/block mechanics to vertical-spacing-system and scale/radius thresholds to craft-floor.
---

Space is the most underused design material; layout problems are often the root cause of a page feeling "off" even when color and type are fine. A migration must **rebuild the source's spatial rhythm and hierarchy intentionally** — match the original's composition, regularize it to a coherent system. This is *composition method*; `vertical-spacing-system` owns the EDS section/block margin mechanics and `craft-floor` owns the scale-coherence + radius thresholds — defer to them, don't restate.

## Verify hierarchy with the squint test
Blur your (metaphorical) eyes at the page. Can you still identify the **most important** element, the second, and the **groupings**? If everything has equal weight, hierarchy has failed. Run this before and after any layout change — it's the fastest hierarchy check there is.

## Hierarchy via combined dimensions
The best hierarchy stacks **2–3 dimensions at once** — a heading that's larger AND bolder AND has more space above it reads as primary without trying. Use the fewest needed; space alone is often enough.

| Tool | Strong | Weak |
|------|--------|------|
| **Size** | ≥3:1 ratio | <2:1 |
| **Weight** | Bold vs Regular | Medium vs Regular |
| **Color** | High contrast | Similar tones |
| **Space** | Surrounded by whitespace | Crowded |
| **Position** | Top/left (LTR primary) | Bottom/right |

## Rhythm, not uniformity
Equal padding everywhere = no rhythm (and the AI tell). Vary it:
- **Tight grouping** between related siblings (8–12px).
- **Generous separation** between distinct sections (48–96px).
- **Vary within sections** — not every row needs the same gap.
- Spacing comes from a coherent scale (`craft-floor` One-Spacing-Scale owns the rule); on our EDS sections the section/block rhythm is mechanized — see `vertical-spacing-system`.
- **Every spacing/radius value is a token (craft-floor Systematic-Tokenization Rule).** Single-value `gap`/`padding`/`margin` and `border-radius` use a `--space-*`/`--radius-*` token; snap near-matches (6px→`--radius-s`), add a token for a recurring off-scale gap (12px→`--space-xxs`), leave one-offs literal. Enforced by `craft-token-literal` + `craft-radius-raw` in `detect.mjs`.
- **EDS caveat (field-tested):** "vary the spacing" does NOT mean hand-tuning each section's outer padding. On EDS the **uniform `--section-padding` IS the foundation rhythm** — varying it per-section breaks the system and any validated page. Get rhythm from *within-section* variation (block gaps, card spacing) and the **section-style spacing variants** (`section-flush`, `spacing-*`), not from bespoke per-section padding.

## Choose the right layout tool
- **Flexbox for 1D** (rows/columns of items: navs, button groups, card internals). Don't reach for Grid when `flex-wrap` is simpler.
- **Grid for 2D** (page structure, dashboards — coordinated rows AND columns); named `grid-template-areas` for complex page layout, redefined at breakpoints.
- **Container queries for components, viewport queries for page layout** — a card in a narrow column can stay compact while the same card in a wide region expands, automatically:
  ```css
  .card-container { container-type: inline-size; }
  @container (min-width: 400px) { .card { grid-template-columns: 120px 1fr; } }
  ```
- Breakpoint-free responsive grid: `repeat(auto-fit, minmax(280px, 1fr))`.

## Cards are the lazy answer
Use a card only when content is genuinely distinct and actionable; spacing + alignment group things naturally without a box. **Never nest cards.** Don't repeat identical icon+heading+text card grids endlessly — vary sizes, span columns, or mix card with non-card content. (craft-floor's `craft-layout-cards-lazy` owns the rule.)

## Optical adjustments
- **44×44px touch target minimum** even when the visual element is smaller — expand the hit area with a pseudo-element, don't inflate the visual:
  ```css
  .icon-button { position: relative; } /* 24px visual */
  .icon-button::before { content: ''; position: absolute; inset: -10px; }
  ```
- Text at `margin-left: 0` looks slightly indented (letterform whitespace) — a negative `-0.05em` margin optically aligns a heading to the column edge.
- Geometrically-centered glyphs often look off-center (play icons shift right, arrows toward their direction) — nudge only when it actually looks wrong, never speculatively.

## Verify
- [ ] Squint test passes: primary / secondary / groupings readable when blurred.
- [ ] Hierarchy uses 2–3 combined dimensions where it matters; matches the source's emphasis.
- [ ] Rhythm: tight groupings + generous section separations, not uniform padding.
- [ ] Right tool (flex 1D / grid 2D / container query for components).
- [ ] Touch targets ≥44px via hit-area expansion; optical alignment where needed.
- [ ] `craft-floor` scale + radius clear; EDS section/block rhythm per `vertical-spacing-system`.

## Pitfalls
- Reproducing the source's spacing as arbitrary one-off values instead of snapping to a coherent scale.
- Defaulting everything to cards / a grid when flex-wrap or plain spacing would read better.
- Inflating an icon's visual size to hit 44px instead of expanding only the hit area.
- Restating `vertical-spacing-system`'s EDS mechanics or `craft-floor`'s scale rule here — defer to them.

See also: `vertical-spacing-system` (EDS section padding + `* + *` block-margin mechanics this composition sits on), `craft-floor` (One-Spacing-Scale + One-Radius thresholds), `global-style-foundation` (routes here for the spacing/layout dimension), `measure-then-implement` (measure the source's spacing rhythm first), `carousel-pattern-eds` + `full-width-escape-hatch` (specific layout patterns), `typography-craft` + `color-craft` (the other foundation dimensions)
