# PROJECT-TEMPLATES.md — Canonical Template Hierarchy & Branding Map

The **authoritative list of page templates we will build**, distilled from the 47 raw templates that catalog discovery produced over 169 pages (`catalog/template-catalog.json`). The raw 47 are *discovery output*; this file is the *decision*.

**Why this exists.** Catalog discovery over-splits — the same look/purpose lands in several clusters that differ only by incidental block count/order (drift accumulated as Semrush expanded over years). A migration **reduces that entropy** rather than reproducing it. We retain a template only when it is a **distinct visual appearance AND a distinct purpose** — never because its block count differs. See `import-template-consolidation` (**The Entropy-Reduction Rule**).

**The model is a three-level hierarchy, not a flat list** (`import-template-consolidation`):
1. **Chrome** — the page frame (nav/sidebar/footer system). A hard boundary; a template never spans chromes.
2. **Template** — within a chrome, a distinct appearance + purpose (dominant element + composition skeleton).
3. **Sub-category** — within a template, a recurring, *author-meaningful* variation (a variant/section-style of the parent, `{template}:{sub}`), never a separate template+parser. Block-count differences are NOT sub-categories — they're drift.

**Companion docs:** `PROJECT-DESIGN.md` (the global foundation these templates sit on), `PROJECT-BLOCKS.md` (block inventory), `catalog/` (raw discovery).

---

## The three chromes (top level — the hard boundary)

Bucketed **empirically** from each page's rendered framing class signature — App-shell pages carry CSS-module classes (`Header_header__`, `CollectionTags_`, `ItemsList_`, `SmbLayout_`), marketing pages carry brand classes (`bg_gradientLobby`/`gch-`), careers pages live on `careers.semrush.com`. **Never bucketed by URL path** (chrome is a product property, not a path property). Page totals: **Marketing 67 · App-shell 71 · Careers 31 = 169.**

| Chrome | Frame | Hosts / surface | Decision |
|--------|-------|-----------------|----------|
| **Marketing** | sticky top nav + mega-menu, brand page gradient (teal→lavender→white), full footer with `SEMRUSH` scroll-reveal | `www.semrush.com` + `enterprise.semrush.com` | **Canonical brand.** Reproduce. |
| **App-shell** | light near-white **left product rail** (Home / SEO / AI / Traffic & Market / Local / Content / Ad / AI PR / Social / Reports / App Center) + contextual sub-nav, no gradient, minimal footer | all `/apps/*` (App Center product application — detail AND collection) | **KEEP as a separate chrome** (user decision). It is the product application surface; build its templates within this chrome, do NOT fold onto marketing. |
| **Careers** | careers sub-nav ("Semrush life / Values & Impact / Teams / Offices / Blog" + "Search jobs") + own footer | `careers.semrush.com` | **KEEP as a sub-brand chrome** (user decision). |

**Confirmed (user, this pass):** App-shell stays its own chrome (templates built natively in it). Careers stays a sub-brand chrome. `/content-hub/vs-*` pages are marketing chrome (they carry a comparison spec table — see `comparison`).

---

## Canonical templates by chrome (12 templates + 2 deferred)

### Marketing chrome — 6 templates (67 pages)

| Template | Purpose | Dominant element / signature | Sub-categories | Pages |
|----------|---------|------------------------------|----------------|------:|
| `marketing-landing` | Persuade & convert (top-of-funnel) | hero → alternating carousel/cards → quote → dark CTA band, on brand gradient | `:light` (default) · `:dark` (enterprise solution pages — same composition, inverted) | ~24 |
| `comparison` | Competitor head-to-head | **feature-comparison spec table** (purple-highlighted own-column) + ratings + tool showcase | — (incl. `/content-hub/vs-*`) | ~8 |
| `tool-detail` | Free-tool landing — explain + run it | centered tool hero + "How to use" steps + tool cards + purple CTA band | `:hub` (multi-tool grid, e.g. ai-writing-tools) · `:single` (one tool, e.g. word-counter) | 19 |
| `article` | Long-form editorial (incl. its section indexes) | branded title band → single measured text column + inline media; index sub-cat = card grid | `:standard` · `:with-video` · `:index` (blog/content-hub landing card grid) | ~8 |
| `case-study-detail` | Customer success story (incl. its index) | logo/quote hero → narrative columns → results stat band; index sub-cat = card grid | `:detail` · `:index` (success-spotlights landing) | ~5 |
| `resource-detail` | Gated/downloadable asset | **drenched-purple hero** + stat band + download/lead form | `:gated` (form) · `:ungated` | ~3 |

> **No marketing `text-page`:** the only long-form prose pages in scope (privacy-policy, sustainability) are **careers-hosted** → they are `careers-text`. There is no `www`-hosted legal/info page in scope, so the marketing chrome has no `text-page` template (resolved by data, not assumption). If one is later discovered on `www`, add `text-page` back as a 7th marketing template.

### App-shell chrome — 2 templates (71 pages)

| Template | Purpose | Dominant element / signature | Sub-categories | Pages |
|----------|---------|------------------------------|----------------|------:|
| `app-detail` | Describe one app/integration | icon+title+screenshot-strip hero, "Info" left column + "Key Features" 3-col + pricing card | — (the `-b/-c/-d/-e` raw splits are drift) | 50 |
| `app-listing` | Browse the app store | filter chips + uniform app-card grid | `:storefront-home` (multi curated rows + "See all", e.g. `/apps/`) · `:category` (single filtered grid, e.g. `/apps/collection/advertising`) | 21 |

### Careers chrome — 4 templates (31 pages)

| Template | Purpose | Dominant element / signature | Sub-categories | Pages |
|----------|---------|------------------------------|----------------|------:|
| `careers-landing` | Careers home / recruit | hero → roles stats → culture cards → office map → CTA | — | 2 |
| `careers-content` | Careers narrative page (values, teams, DEI) | eyebrow+big-title hero → image/text → content blocks → jobs-search band | — | ~5 |
| `careers-office-detail` | Single office location | location hero + photo carousel + benefits grid + **map embed** + roles table | — | 23 |
| `careers-text` | Careers legal/policy prose | TOC + long-form headings/paragraphs, minimal blocks | — | 2 |

### Deferred (2) — import as default-content one-offs only if asked
`enterprise-demo-ungated` (marketing — one-off video+form demo), `product-sample-page` (app-shell — one-off sandbox).

> **Long-form prose lives only on careers** → `careers-text` (privacy-policy, sustainability). No marketing `text-page` template (resolved by data). The card-grid index purpose recurs in two chromes → it's the app store's `app-listing` (app-shell) and, in marketing, a `:index` sub-category of whatever section it heads (article/case-study). Chrome always splits (`import-template-consolidation`).

### `/content-hub/*` routing (resolved by sub-path — verified by screenshot)

The content hub mixes three page types under one path; route by sub-path, not by the `/content-hub/` prefix:

| Sub-path | Template (sub-category) | Why |
|----------|-------------------------|-----|
| `/content-hub/`, `/content-hub/content-marketing-blog/`, `/content-hub/success-spotlights/` | `article:index` / `case-study:index` | section landing card grids |
| `/content-hub/success-spotlights/{name}/` | `case-study-detail:detail` | customer stories (verified: lottiefiles) |
| `/content-hub/vs-{competitor}/` | `comparison` | carry the feature-comparison spec table (verified: vs-chatgpt) |
| `/content-hub/content-marketing-blog/{post}/`, `/content-hub/can-ai-content-rank-on-google/` | `article` | long-form editorial |
| `/content-hub/ai-content-marketing-report/`, `/ai-prompt-library/`, `/ebooks-templates/{kit}/` | `resource-detail` | gated/downloadable assets (verified: ai-content-marketing-report) |

---

## Mapping: every raw template → canonical (all 47 accounted for)

| Canonical (chrome) | Raw templates folded in | Drift / sub-category normalized |
|--------------------|-------------------------|---------------------------------|
| `marketing-landing` (mkt) | homepage, enterprise-homepage, enterprise-solution-page, enterprise-marketing-page, product-landing | enterprise-solution vs -marketing differ only by block COUNT → same composition; enterprise pages → `:dark` sub-category. |
| `comparison` (mkt) | comparison-landing, comparison-detail, + `/content-hub/vs-*` (from case-study-detail-b) | the `/vs/` and `/content-hub/vs-*` pages center on a spec table. |
| `tool-detail` (mkt) | free-tool-detail, free-tool-checker, free-tool-generator, free-tool-counter, free-tool-rewriter, free-tool-rewriter-b/-c, free-tool-generator-b/-c, free-tools-home | hub vs single = sub-categories; rewriter/generator/counter are single-tool copy variants. Reconcile onto existing `template-feature`. |
| `article` (mkt) | blog-article, blog-article-b, content-hub-article, blog-index | `-b` = `:with-video`; blog-index → `:index` (card grid). |
| `case-study-detail` (mkt) | case-study-detail, case-study-detail-b (minus `/vs-*`), case-study-index | `-b`'s non-vs pages stay; `/vs-*` → `comparison`; case-study-index → `:index`. |
| `resource-detail` (mkt) | content-hub-resource, content-hub-resource-b, content-hub-home | `-b` = `:gated` (search/form); content-hub-home is the hub landing. |
| `app-detail` (app) | app-detail, app-detail-b, app-detail-c, app-detail-d, app-detail-e | `-b/-c/-d/-e` are pure count/order drift on one layout (verified). |
| `app-listing` (app) | apps-marketplace-home, app-collection-category, app-collection-category-b, app-collection-b, app-collection-c, app-collection-d | marketplace-home → `:storefront-home`; collections → `:category`. |
| `careers-landing` (careers) | careers-landing | — |
| `careers-content` (careers) | careers-content-page | values/teams/DEI narrative. |
| `careers-office-detail` (careers) | careers-office-detail | genuinely distinct (map embed). |
| `careers-text` (careers) | legal-text-page, info-text-page | privacy-policy + sustainability — both careers-hosted prose (the only long-form prose in scope; no www text-page). |
| *(DEFER)* | enterprise-demo-ungated, product-sample-page | one-off utility pages. |

**Reference page per template** (the frozen exemplar new work reconciles onto — prefer an already-LOCKED page):

| Template | Reference page | Status |
|----------|----------------|--------|
| `marketing-landing` | `https://www.semrush.com/` | ✅ LOCKED — design touchstone |
| `comparison` | `https://www.semrush.com/vs/semrush-vs-moz/` | not built |
| `tool-detail` | `https://www.semrush.com/features/keyword-research-toolkit/` (`template-feature`) | imported, awaiting GATE 2 |
| `article` | `https://www.semrush.com/content-hub/content-marketing-blog/how-to-use-chatgpt/` | not built |
| `case-study-detail` | `https://www.semrush.com/content-hub/success-spotlights/lottiefiles/` | not built |
| `resource-detail` | `https://www.semrush.com/content-hub/ai-content-marketing-report/` | not built |
| `app-detail` | `https://www.semrush.com/apps/adclarity-advertising-intelligence/` | not built |
| `app-listing` | `https://www.semrush.com/apps/` (storefront-home) | not built |
| `careers-landing` | `https://careers.semrush.com/` | not built |
| `careers-content` | `https://careers.semrush.com/core-values/` | not built |
| `careers-office-detail` | `https://careers.semrush.com/offices/munich/` | not built |
| `careers-text` | `https://careers.semrush.com/privacy-policy/` | not built |

---

## Branding rules per template

All templates inherit the **global foundation** (`PROJECT-DESIGN.md`: Inter/Lazzer type scale, `--space-*` rhythm, pill buttons, body ≥4.5:1) and the **Brand Gist (B1–B7)** + **Expression Intensity Scale (R1–R4)** defined there. Below are the **deltas** each template adds. Each gets a `body.template-{name}` class (`page-template-metadata`); CSS is scoped to that class so it can't move a frozen page. Sub-categories are a variant/section-style modifier on the parent, not a new class tree.

**Each template names its `Register` (R1–R4), the `Gist` concepts it dials up (B1–B7), and the `Liberties` we grant** — the interpretive freedom to take at our fidelity (Refined/Reimagined) *within* that register. Liberties are how we reinterpret rather than photocopy; the register is the guardrail that keeps a loud page loud and a quiet page quiet.

### Marketing chrome

**`marketing-landing` — body class `template-default` (marketing-chrome base, all marketing pages) + page-specific `template-oneoff-homepage` (www home) / `template-one` / `template-enterprise`**
- **Register: R4 Flagship.** **Gist:** B1 display · B2 gradient+purple · B3 product imagery · B4 dark closing moment · B5 reveal · B6 motion — the full kit. *Verified against the LOCKED homepage 2026-06-18 — it embodies every R4 concept.*
- Surface: the **global page gradient** (`--color-teal`→lavender→white, `100% 2814px`, on `main`) is shared by ALL pages, not a marketing-landing-only treatment; the homepage layers `pattern-hero.svg` over it. `:dark` sub-category inverts via `section-dark` + (enterprise) `body.template-dark` header inversion.
- Type: display **84 desktop → 56 <1024** (`--font-size-display`), weight 600, tracking −0.04em (`--tracking-tight`). `text-wrap: balance` on the two-line hero. Eyebrow (`--tracking-wide`) + uppercase section heading (`project-section-heading-pattern`).
- Block toolbox (homepage, verified): `announcement-bar`, `insights-widget` (hero tool), `media`, `marquee` (logo strip), `carousel` + `carousel-expansible` (the 9-solution accordion), `stats-facts`, `stats-visibility` (AI Visibility Index), `testimonials`, `teaser` (`teaser-oneoff-semrush-one`, `teaser-oneoff-enterprise`).
- Section styles in use: `section-centered`, `section-flush`, `section-dark` (closing CTA), `section-oneoff-ai-visibility`.
- **Liberties:** re-sequence/curate the section order for a stronger narrative arc; we need not reproduce every band. Free to choose `:light` vs `:dark` per page's mood. One signature entrance motion is welcome. The closing dark CTA + footer `SEMRUSH` reveal are *required* anchors — don't drop them.
- ⚠️ **Frozen:** the homepage is style-validated. Reuse these blocks/variants/section-styles **additively** for other marketing-landing pages (`styling-additively`); never edit the homepage's tools to suit a new page.
- Differs: the highest-variety template — full gradient composition, the 9-solution expansible carousel, dual stat blocks, and the dark closing CTA. The R4 exemplar.

**`comparison` — `body.template-comparison`**
- **Register: R3 Campaign.** **Gist:** B1 hero · B2 purple as the *highlighted own-column* · B3 tool showcase · B5 reveal.
- Surface: marketing chrome + brand gradient; centerpiece is a **feature-comparison spec table** (sticky header, Semrush column highlighted purple, competitor muted, check/cross glyphs).
- Type: hero h1 `--font-size-heading-xl`; row labels `--font-size-body-m`; group labels as eyebrows.
- Layout: hero → logo strip → comparison table (dominant) → ratings band → tool showcase → CTA.
- **Liberties:** redesign the table treatment for clarity (our purple-highlight, our glyphs, our row grouping) rather than copying the source table's chrome; condense long spec lists into grouped, scannable sections. Keep the own-column-wins purple signal unmistakable.
- Tightening: ONE comparison-table treatment reusable across `/vs/` and `/content-hub/vs-*`.
- Differs: the spec table IS the page (vs marketing-landing's supporting bands); a feature matrix, not a customer narrative (vs case-study).

**`tool-detail` — `body.template-feature` (reuse existing)**
- **Register: R3 Campaign.** **Gist:** B1 centered display · B2 gradient + purple CTA band · B3 the live tool as hero · B5 reveal · B6 step motion. `:single` trims to a lighter R3 than `:hub`.
- Surface: full marketing chrome + brand gradient + `SEMRUSH` reveal.
- Layout: centered hero, numbered "How to use" steps, tool cards (`cards-icon-tools`), "more tools" (`cards-icon-related`), purple `section-dark` CTA. Reconcile onto the built `template-feature` — don't fork.
- Sub-categories: `:hub` (multi-tool grid) · `:single` (one tool + "what is / when to use" copy bands). Same skeleton, author supplies one tool vs many.
- Type: centered hero h1 `--font-size-display`; step numbers are bespoke large numerals (literal).
- **Liberties:** design our own "How to use" step treatment (big numerals are a brand motif, the exact layout is ours); `:single` may drop the multi-tool grid entirely and lean on copy bands. The purple CTA band is the required close.
- Differs: marketing chrome + conversion focus (vs app-detail); fixed steps+tool-grid (vs marketing-landing).

**`article` — `body.template-article`**
- **Register: R2 Editorial.** **Gist:** B1 at reduced scale (title band only) · B2 ambient gradient, no drench · B3 product imagery only where the story needs it. Reading comfort leads over impact.
- Surface: marketing chrome; branded title band above a single measured text column (`--measure` 60ch).
- Sub-categories: `:standard` · `:with-video` (inline video block) · `:index` (section landing card grid — blog/content-hub home).
- Type: body `--font-size-body-l` / line-height 1.5; h2/h3 for section breaks; full-column images.
- **Liberties:** choose the title-band color/treatment per article mood; pull-quotes and inline stats may borrow the brand display voice sparingly for rhythm. Don't let marketing chrome theatrics intrude on the reading column.
- Tightening: one reading measure + foundation rhythm; no mid-article card grids except a related row (or the `:index` grid).
- Differs: general editorial (vs case-study's narrative+stats); ungated reading (vs resource's gate).

**`case-study-detail` — `body.template-case-study`**
- **Register: R2 Editorial** (with one R3 moment: the results stat band). **Gist:** B1 quote voice · B3 the *customer's* results as product proof (big stat numerals) · B2 ambient.
- Surface: marketing chrome; logo/quote hero (often customer brand band) → narrative columns → results **stat band**.
- Sub-categories: `:detail` (the story) · `:index` (success-spotlights landing card grid).
- Type: pull-quote `--font-size-quote` (26); result numerals bespoke display literals; body `--font-size-body-l`.
- **Liberties:** let the customer's brand color theme the hero band; design the results stat band as a high-impact moment even though the rest reads editorial. One quote style, our treatment.
- Tightening: standardize the results stat band + one quote style.
- Differs: structured challenge→solution→results with a stat payoff.

**`resource-detail` — `body.template-resource`**
- **Register: R4 Flagship** (the `:gated` purple drench is a peak brand moment). **Gist:** B2 purple as the *field* (the one deliberate 60-30-10 exception) · B1 display on purple · B3 the asset preview.
- Surface: **drenched-purple hero** (brand accent dominant, `color-craft` "Committed"), stat band, download/lead form.
- Sub-categories: `:gated` (form/search) · `:ungated`.
- Type: hero h1 on purple uses `--color-inverse` (tokenized, not ad-hoc white); apply light-on-dark line-height/tracking compensation (body already 500 → don't bump weight, `typography-craft`).
- **Liberties:** own the drench — choose the purple intensity and the asset-preview treatment; the stat band can go big. `:ungated` may soften the drench toward the standard gradient if no gate creates the "reward" framing.
- Tightening: gated form = EDS Form block; CTA = pill system on purple.
- Differs: single-asset focus + gate; the purple drench is its signature.

### App-shell chrome

**`app-detail` — `body.template-app-detail` (app-shell)**
- **Register: R1 Utility (B7 — quiet).** Deliberately calm: function-first, flat type, minimal color. The brand's confidence shown by *restraint*.
- Surface: **App-shell chrome** (left product rail + App Center sub-nav, light near-white). Build natively in this chrome (per user decision — do NOT migrate to marketing).
- Type: app name h1 `--font-size-heading-l` (48) — NOT display 84; lead `--font-size-body-l`. No oversized display, no gradient drench.
- Layout: icon+title+CTA+screenshot-strip hero, "Info" left column (label/value) + "Key Features" 3-up `cards-icon` grid + pricing card (`--radius-l`).
- **Liberties:** tidy the catalog layout (consistent info column, one card style, clean pricing card) and apply brand purple only to CTAs + the app icon — but resist making it loud. B3 product screenshots are welcome (it's a product page); B1/B2/B4 theatrics are not.
- Tightening: ONE app-detail skeleton across all 50 (the `-b/-c/-d/-e` drift collapses); reuse `cards-icon` for features; pill CTAs.
- Differs: ONE item in depth (vs app-listing's grid); product-app surface (vs marketing tool-detail).

**`app-listing` — `body.template-app-listing` (app-shell)**
- **Register: R1 Utility (B7).** Browse efficiency over impact — whitespace, scannable grid, quiet chrome.
- Surface: App-shell chrome; filter-chip row (pill) + uniform app-card grid.
- Sub-categories: `:storefront-home` (multiple curated rows each with "See all", e.g. `/apps/`) · `:category` (single filtered grid, e.g. `/apps/collection/advertising`).
- Type: page h1 `--font-size-heading-xl`; card titles `--font-size-heading-s`.
- **Liberties:** `:storefront-home` may give its top row a slightly richer "featured" treatment (the one place the store gets a little louder); `:category` stays flat and utilitarian. One app-card style everywhere.
- Tightening: unify the collection filter variants into one chip component; ONE app-card style.
- Differs: storefront browse (vs app-detail's single item).

### Careers chrome

**`careers-landing` — `body.template-careers-landing` (careers)**
- **Register: R3 Campaign.** **Gist:** B1 display ("One team. All ambition.") · B2 ambient gradient · B3 roles-count stats + office map · B6 the dark "All ambition" reveal band. The recruiting front door gets to be loud.
- Surface: careers chrome; hero → roles-count stats → culture cards → office map → "Join the team" CTA.
- Type: display hero; stat numerals bespoke display literals.
- **Liberties:** lean into the human/photographic imagery and the bold recruiting headline; the dark reveal band is a welcome signature moment. Stay in careers chrome (not marketing) but borrow marketing's display confidence.
- Differs: recruiting home; the only careers page with the stats+map composition.

**`careers-content` — `body.template-careers-content` (careers)**
- **Register: R2 Editorial.** **Gist:** B1 eyebrow+big-title hero · B2 ambient gradient · human imagery. Narrative warmth over sell.
- Surface: careers chrome; eyebrow+big-title hero → split image/text → content blocks → jobs-search band.
- Type: eyebrow (`--tracking-wide`) + heading-xl title.
- **Liberties:** playful display moments are on-brand here (the "RUSH with us!" giant-letters treatment) — interpret the culture story expressively while keeping body copy readable.
- Differs: narrative culture page (values/teams/DEI); lighter than careers-landing (no stats/map).

**`careers-office-detail` — `body.template-careers-office` (careers)**
- **Register: R1 Utility (B7 — quiet).** A location info page: photography carries the warmth, the layout stays calm and functional across all 23 offices.
- Surface: careers chrome; location hero + photo carousel + benefits grid + **map embed** + roles table.
- Type: office name h1 `--font-size-heading-xl`; address/meta `--font-size-body-m`.
- **Liberties:** one polished photo-carousel + benefits-grid treatment reused everywhere; the city photo gives each office identity without bespoke per-office design. No display theatrics.
- Tightening: one map-embed + one photo-carousel across all 23 offices.
- Differs: the only template with a map embed + location identity.

**`careers-text` — `body.template-careers-text` (careers)**
- **Register: R1 Utility (B7 — quietest).** Pure reading: legal/policy prose. The brand shows only in type + the careers chrome; zero marketing energy.
- Surface: careers chrome; TOC + long-form legal/policy prose, minimal blocks.
- Type: h1 heading-l; body `--font-size-body-l`, `--measure`-constrained.
- **Liberties:** essentially none beyond clean default-content styling + a sticky TOC — this template proves the foundation auto-styles read on-brand unadorned (`eds-content-patterns`).
- Differs: utilitarian careers prose; same chrome as careers-content but no hero imagery/jobs band.
- Differs: utilitarian careers prose; same chrome as careers-content but no hero imagery/jobs band.

---

## How the hierarchy reduces entropy (at a glance)

- **47 raw templates → 12 canonical templates** (+2 deferred), across **3 chromes** (Marketing 6 · App-shell 2 · Careers 4), with sub-categories that ride as variants (not new parsers).
- **Chrome is the hard split:** the card-grid purpose appears in both marketing and app-shell → the app store's `app-listing` (app-shell) vs marketing `:index` sub-categories of the section they head. Long-form prose appears only on careers → `careers-text` (no marketing `text-page`).
- **Sub-categories absorb meaningful variation** (`tool-detail:hub`/`:single`, `app-listing:storefront-home`/`:category`, `resource-detail:gated`/`:ungated`, `article:with-video`, `marketing-landing:dark`) **without** new templates.
- **Block count is never a split** — the `app-detail -b/-c/-d/-e` and `free-tool-*` suffix families collapse entirely.

---

## Open confirmations (user)
None. All template-routing questions are resolved by data (below). The hierarchy is ready to build from.

## Resolved
- **App-shell kept as its own chrome** — `app-detail` + `app-listing` built natively in it; NOT migrated to marketing.
- **Careers kept as a sub-brand chrome** — 4 careers templates.
- **No marketing `text-page`** — the only long-form prose pages in scope (privacy-policy, sustainability) are careers-hosted → `careers-text`. Marketing = 6 templates. (Resolved by data: no `www` legal/info page exists in scope.)
- **`/content-hub/*` routing fixed by sub-path** (see routing table above) — vs-* → `comparison`; success-spotlights/{name} → `case-study-detail`; report/library/ebooks → `resource-detail`; blog posts + can-ai-rank → `article`; section landings → `:index` sub-categories. All verified by screenshot.
- **Sub-categories introduced** as the third hierarchy level (variants, not templates).
- **`marketing-landing` merge holds**; **`comparison` is its own template**; **chrome bucketed empirically (67/71/31)**.
