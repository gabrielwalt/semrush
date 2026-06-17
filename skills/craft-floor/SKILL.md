---
name: craft-floor
description: The anti-slop craft floor — concrete, checkable typography/color/spacing/state thresholds to apply when an import does NOT need to be pixel-perfect (Refined or Reimagined fidelity). Distilled from impeccable.style's Typeset/Colorize/Layout/Distill/Polish skills. Use when building or auditing the global foundation, regularizing a weak source design, or reviewing a style system for "AI slop". NOT for Faithful pixel-match imports (mirror the source instead).
---

When fidelity is **Refined or Reimagined** (not Faithful — read it from `PROJECT-DESIGN.md` → Migration Strategy, first-match-wins per-page → site default), you have license to *regularize toward craft* rather than mirror the source. This is the floor every such foundation must clear. At **Faithful**, skip this — reproduce the measured source and fix only outright defects.

Each rule is named so you can cite it, and carries a number so it can be checked. Measure, don't eyeball (`measure-then-implement`).

## Typography
- **The One-Ratio Rule.** One consistent ratio across the whole scale, **≥ 1.25×** between adjacent steps. A 2× cliff mid-scale (e.g. 48→24 then 24→18) = two systems stitched together → regularize.
- **The No-Twin-Sizes Rule.** No two scale tokens may resolve to the **same px**. Two heading levels that render identically (or a heading == body) is a dead hierarchy level → collapse or respace. Slop.
- **The Real-Font Rule.** If the heading font differs from body, it **MUST have a loaded `@font-face`** (verify in preview: `[...document.fonts].some(f=>/name/i.test(f.family) && f.status==='loaded')`). A declared-but-unloaded heading font silently falls back to the body default — the named slop *"invisible default (Inter/Roboto/Arial)"*. Also keep ≥ 2 weight-steps OR a font change between body and headings, or hierarchy reads flat.
- **Sizes:** body **≥ 16px**; line-height **~1.5–1.6** body, **~1.1** display/heading; line length **45–75ch**.
- **No scattered one-off `font-size`.** Sizes come from tokens. An off-scale per-component size (`21px`, `46px`) is slop unless it's a documented one-off.

## Color
- **The Distinct-Link Rule.** In-text link color **MUST differ from body ink** (use the brand hue, or a non-hover underline). `--link-color == --text-color` makes links invisible until hover. Slop.
- **The One-Token-One-Home Rule.** Each token defined **exactly once**. Two `:root` owners defining the same token with different values → one is dead, and it's usually the one you wanted. Consolidate.
- **The Tokenize-Inverse Rule.** Dark-surface text uses a `--color-inverse` token, not `#fff` scattered across N files. Same for any repeated literal.
- **Palette restraint:** one brand hue + tinted neutrals + (if charts) ≤ 3 matched-lightness hues. Not a rainbow; not the AI defaults (purple→pink gradient, cyan neon, dark-mode glow).
- **Contrast with headroom:** body **≥ 4.5:1** (aim higher); large text ≥ 3:1; **muted text still ≥ 4.5:1** — a "muted" value sitting exactly at 5:1 has no margin for a later tint.

## Spacing & Layout
- **The One-Spacing-Scale Rule.** A single scale (e.g. `8 / 16 / 24 / 48 / 96`). No **near-duplicate steps** (32 *and* 40 compete) and no **off-scale gaps** (a stray `12px`/`13px` between your 8 and 16 is the canonical "random gap" slop).
- **Rhythm, not uniformity.** Alternate tight and generous spacing; equal padding everywhere with everything shouting at one weight is slop.
- **The One-Radius Rule.** One radius system. `8` vs `10` vs `12px` fighting across components is noise no one perceives as intentional — pick the token values and hold them.

## State & motion (Polish)
- **The All-Elements-Focus Rule.** `:focus-visible` on **every** interactive element (links, inputs, custom buttons, carousel nav) — not buttons only. Hover alone is not focus.
- **The Reduced-Motion-Baseline Rule.** Every animation/transition needs a `@media (prefers-reduced-motion: reduce)` fallback. An infinite marquee or hover transition with no reduced-motion guard is incomplete, not polished.
- **Tokenize durations.** Replace literal `0.2s`/`0.3s` with the transition token. A magic-number duration used once is slop.
- No `lorem`, no `TODO`, no placeholder strings in shipped CSS/content.

## Distill (remove what doesn't earn its place)
- **0-use tokens, dead `@font-face` (e.g. leftover Roboto fallbacks), and alias-token layers** that just re-point to real tokens — delete. Every token/rule must justify its existence.
- **Competing treatments** (multiple card styles, button variants doing the same job) → consolidate to one. Three fonts where one works → one.

## Verify (Bookend)
- [ ] Fidelity is Refined/Reimagined (else this skill doesn't apply).
- [ ] Type scale: single ratio ≥1.25, no twin sizes, heading font actually loaded — confirmed in preview.
- [ ] Links visually distinct from text; every token defined once; contrast ≥4.5:1 incl. muted.
- [ ] One spacing scale + one radius system; no off-scale gaps.
- [ ] focus-visible + reduced-motion on all interactive/animated elements.
- [ ] No dead tokens / `@font-face` / alias layers left behind.

## Pitfalls
- Applying this to a **Faithful** import → you "improve" the brand away from its spec. Check fidelity first.
- Treating these as taste → they're a floor, not a redesign. Reimagined goes *above* the floor; Refined just *clears* it.
- Hardcoding project values into this skill or into fixes — read the actual scale/tokens from `PROJECT-DESIGN.md` and the project's token files.

See also: `global-style-foundation` (builds the workbench this floor is checked against), `measure-then-implement` (measure before asserting any value), `migration-orientation` (sets the fidelity that gates this skill), `vertical-spacing-system` (the spacing half), `eds-content-patterns` (default-content/link auto-styles), `writing-skills` (the impeccable-derived authoring habits behind these named rules)
