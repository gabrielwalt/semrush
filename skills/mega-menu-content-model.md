# Mega Menu Content Model

## When to load
Editing nav content, adding/removing mega menu items, or debugging why a dropdown column isn't rendering.

## Key insight
Nav uses heading hierarchy as the single source of truth. H2 = top nav item. H3 = column heading. UL = column links. Promo = picture paragraph followed by bold + plain paragraphs. JS aggregates H2s to build the visible nav bar — no separate nav list needed.

## Content structure (nav.plain.html)
```html
<div><!-- brand section: logo --></div>
<div><!-- sections: the mega menu content -->
  <h2><a href="/products">Products</a></h2>
  <h3>Column Title</h3>
  <ul><li><a href="...">Link</a></li>...</ul>
  <h3>Another Column</h3>
  <ul>...</ul>
  <p><a href="..."><picture>...</picture></a></p>  <!-- promo image -->
  <p><strong>Promo Title</strong></p>               <!-- promo title -->
  <p>Promo description text</p>                     <!-- promo desc -->

  <h2><a href="/pricing">Pricing</a></h2>           <!-- no content after = no dropdown -->

  <h2><a href="https://external.com">Enterprise</a></h2>  <!-- external = arrow icon -->
</div>
<div><!-- tools section: Log In | Sign Up --></div>
```

## JS logic (`buildNavFromHeadings`)
1. Find all `<h2>` in the sections wrapper
2. For each H2: create `.nav-item`, collect siblings until next H2
3. If siblings exist → `.nav-drop` with `.nav-mega-panel`
4. H3 → `.nav-mega-column` + `.nav-mega-heading`
5. UL → appended to current column
6. P with `<picture>` → `.nav-mega-promo` (+ following P elements for title/desc)

## Pitfalls
- An H2 with NO following content before the next H2 = simple nav item (no dropdown, no chevron)
- Last `.nav-item` gets an arrow icon via `:last-child a::after` — works because Enterprise is intentionally last
- Promo parsing looks ahead at next P elements — if content order changes, promo breaks
