# Global Styles Refactor — data-driven classification

Goal: keep ONLY the common denominator (shared by marketing + app-shell + careers chromes) in the truly-global layer; move marketing-look rules to `body.template-default`. Rename `template-homepage` → `template-default`; the homepage-only hero pattern moves to `template-oneoff-homepage`.

## Dependency evidence (measured, not assumed)

| Rule | Homepage | /one/ | Enterprise | Feature | Verdict |
|------|----------|-------|------------|---------|---------|
| `main { background: teal gradient }` | inherits | **overrides** (own gradient) | **overrides** (`template-dark main` = dark) | inherits | **marketing-look** → `template-default` (only home+feature consume it; both are marketing) |
| `body.template-homepage main { hero pattern }` | uses | — | — | — | **homepage one-off** → rename to `template-oneoff-homepage` |
| `main > .section` padding/rhythm, `> div` container, `* + *` block spacing, spacing variants, `.full-width` | all | all | all | all | **COMMON** → stays global (EDS mechanics, every chrome) |
| `.section.section-flush` (no padding) | uses | — | — | — | structural section style, chrome-agnostic → **stays global** |
| `.section.section-dark` base (dark bg + inverse text + button invert) | uses | re-styles | re-styles | re-styles | **COMMON building block** all chromes can opt into → **stays global** |
| `.section.section-centered` base | uses | — | — | re-styles | marketing-ish but a generic structural helper; both consumers are marketing → keep global (harmless to app/careers: opt-in only) |
| `.section.section-oneoff-ai-visibility` | homepage only | — | — | — | **homepage one-off** → could move to template-default; it's already `oneoff`-named and only the homepage authors it. Keep global (opt-in, no chrome inherits it unless authored). |
| `:root` tokens, reset, base type (h1–h6/body/links/lists/blockquote/pre), `.icon`, `main img`, button system, `:focus-visible`, prose-link, reduced-motion | all | all | all | all | **COMMON** → stays global (the foundation every chrome shares) |
| page gradient COLORS (`--color-teal` etc.) | — | — | — | — | tokens stay global; only the *application* (`main { background }`) moves |

## Decisions
1. **Rename** `template-homepage` → `template-default` everywhere (CSS 3 rules, scripts.js fallback + comment, content metadata, importer PAGE_TEMPLATE, PROJECT docs).
2. **Add `template-oneoff-homepage`**: the 3 hero-pattern rules (base + 2 media queries) re-scope from `template-homepage` to `template-oneoff-homepage`. Homepage carries BOTH `template-default template-oneoff-homepage`.
3. **Move the teal gradient** `main { background }` → `body.template-default main { background }`. Homepage + feature must carry `template-default`.
4. **Marketing chrome pages all carry `template-default`** as a base class (in addition to their specific class). scripts.js applies it; the feature page also gets it.
5. **Stays global (common denominator):** tokens, reset, base type, links, buttons, focus, reduced-motion, EDS section/block spacing mechanics, `.full-width`, `section-flush`, `section-dark` base, `section-centered` base, `section-oneoff-*` (opt-in, authored-only).

## Render-neutrality contract
- Homepage: gains `template-default template-oneoff-homepage` → gradient (now via template-default) + hero pattern (now via template-oneoff-homepage) must resolve identically. Oracle: `.migration/oracle/home.before.json`.
- /one/ + Enterprise: unaffected (they override `main` bg; `section-dark` base unchanged). Oracle: `one.before.json`, `ent.before.json`.
- Feature: gains `template-default` → inherits gradient exactly as it did from the global rule. (Not frozen, but kept identical.)
- Proof: re-capture fingerprints after, diff against `.before.json`. Zero diffs required.
