/* eslint-disable */
/* global WebImporter */

// Import parser for a Semrush /features/<tool>/ landing page (server-rendered).
// Shape: hero → 6 tool cards → mid CTA band → related-features cards → footer get-started.
// Models entirely onto the EXISTING toolbox (Toolbox-First): default content + cards-icon,
// no new block. See PROJECT-BLOCKS.md.

// HELPERS

function absUrl(src) {
  if (!src || src === 'about:error') return '';
  if (src.startsWith('//')) return 'https:' + src;
  return src.startsWith('/') ? 'https://www.semrush.com' + src : src;
}

function wrapImg(src, alt, document) {
  var p = document.createElement('p');
  var pic = document.createElement('picture');
  var img = document.createElement('img');
  img.src = absUrl(src);
  img.alt = alt || '';
  pic.appendChild(img);
  p.appendChild(pic);
  return p;
}

// Emit a CTA as <strong><a> (primary) or <em><a> (secondary) so decorateButtons() buttonizes
// it (eds-content-patterns). Resolve relative hrefs to absolute. kind = 'primary' | 'secondary'.
function ctaP(link, kind, document) {
  if (!link) return null;
  var href = link.getAttribute('href') || '';
  var text = link.textContent.trim();
  if (!text) return null;
  var p = document.createElement('p');
  var wrap = document.createElement(kind === 'secondary' ? 'em' : 'strong');
  var a = document.createElement('a');
  a.href = absUrl(href);
  a.textContent = text;
  wrap.appendChild(a);
  p.appendChild(wrap);
  return p;
}

// Clone a paragraph preserving inline <a> markup (the hero subtitle has an inline link).
function richP(sourceP, document) {
  if (!sourceP) return null;
  var p = document.createElement('p');
  p.innerHTML = sourceP.innerHTML;
  // absolutize any inline links
  p.querySelectorAll('a').forEach(function (a) {
    a.href = absUrl(a.getAttribute('href') || '');
    a.removeAttribute('target');
  });
  // strip attributes the pipeline doesn't need
  p.querySelectorAll('[data-ga-event-onclick], [data-ga-category], [data-test]').forEach(function (el) {
    el.removeAttribute('data-ga-event-onclick');
    el.removeAttribute('data-ga-category');
    el.removeAttribute('data-ga-action');
    el.removeAttribute('data-ga-label');
    el.removeAttribute('data-test');
  });
  return p;
}

// PARSERS

// Hero → default content (h1 + subtitle + primary CTA), section-centered.
function heroParser(element, { document }) {
  var wrapper = document.createElement('div');
  var h1 = element.querySelector('h1');
  if (h1) {
    var heading = document.createElement('h1');
    heading.textContent = h1.textContent.trim();
    wrapper.appendChild(heading);
  }
  var subtitle = element.querySelector('.subtitle, p');
  var rp = richP(subtitle, document);
  if (rp) wrapper.appendChild(rp);
  // The hero CTA is the <a class="button">, NOT the subtitle's inline link — match it
  // explicitly (a comma selector would pick the inline link first in document order).
  var cta = element.querySelector('a.button');
  var cp = ctaP(cta, 'primary', document);
  if (cp) wrapper.appendChild(cp);

  // Section Metadata: centered hero (last in section).
  var meta = WebImporter.DOMUtils.createTable(
    [['Section Metadata'], ['Style', 'section-centered']],
    document,
  );
  element.replaceWith(wrapper, document.createElement('hr'));
  // re-attach meta + the break: wrapper, meta, hr handled by afterTransformer section logic
  wrapper.parentNode.insertBefore(meta, wrapper.nextSibling);
}

// 6 tool cards → one Cards Icon block (one row per card: icon, strong title, desc, 2 CTAs).
function toolCardsParser(listEl, { document }) {
  var items = listEl.querySelectorAll('.tools__item, li');
  var rows = [['Cards Icon (cards-icon-tools)']];
  items.forEach(function (item) {
    var cell = document.createElement('div');
    var img = item.querySelector('img.tool-card__img, img');
    if (img) cell.appendChild(wrapImg(img.getAttribute('src'), img.getAttribute('alt') || '', document));
    var title = item.querySelector('.tool-card__title, h2, h3');
    if (title) {
      var pt = document.createElement('p');
      var strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      pt.appendChild(strong);
      cell.appendChild(pt);
    }
    var desc = item.querySelector('.tool-card__content p, p[data-test*="description"], p');
    if (desc) {
      var pd = document.createElement('p');
      pd.textContent = desc.textContent.trim();
      cell.appendChild(pd);
    }
    // dual CTAs — scope to the card's button row so the description's inline links
    // (e.g. "SERPs") are never mistaken for a CTA. Primary = .button; secondary = the
    // "Learn more" / tool link.
    var btnRow = item.querySelector('.tool-card__btns') || item;
    var links = [...btnRow.querySelectorAll('a')];
    var primary = links.find(function (a) { return /button/.test(a.className); }) || links[0];
    var secondary = links.find(function (a) { return a !== primary; });
    var pc = ctaP(primary, 'primary', document);
    if (pc) cell.appendChild(pc);
    var sc = ctaP(secondary, 'secondary', document);
    if (sc) cell.appendChild(sc);
    rows.push([cell]);
  });
  var table = WebImporter.DOMUtils.createTable(rows, document);
  listEl.replaceWith(table);
}

// Mid CTA band → default content (h2 + primary CTA), section-dark.
function midCtaParser(element, { document }) {
  var wrapper = document.createElement('div');
  var h2 = element.querySelector('h2');
  if (h2) {
    var heading = document.createElement('h2');
    heading.textContent = h2.textContent.replace(/ /g, ' ').trim();
    wrapper.appendChild(heading);
  }
  var cta = element.querySelector('a.button, a');
  var cp = ctaP(cta, 'primary', document);
  if (cp) wrapper.appendChild(cp);
  element.replaceWith(wrapper);
}

// Related features → default content heading + intro, then a Cards Icon block (title, desc,
// secondary "Learn more" CTA, and the "N tools" count as a caption paragraph).
function relatedParser(element, { document }) {
  var heading = element.querySelector('#related-features-title, h2');
  var intro = element.querySelector(':scope > * p, p');
  var dc = document.createElement('div');
  if (heading) {
    var h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    dc.appendChild(h2);
  }
  if (intro) {
    var pIntro = document.createElement('p');
    pIntro.textContent = intro.textContent.trim();
    dc.appendChild(pIntro);
  }

  var rows = [['Cards Icon (cards-icon-related)']];
  element.querySelectorAll('.related-links__item, li').forEach(function (item) {
    var cell = document.createElement('div');
    var title = item.querySelector('.feature-card__title, h3');
    if (title) {
      var pt = document.createElement('p');
      var strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      pt.appendChild(strong);
      cell.appendChild(pt);
    }
    var desc = item.querySelector('.feature-card__text, p');
    if (desc) {
      var pd = document.createElement('p');
      pd.textContent = desc.textContent.trim();
      cell.appendChild(pd);
    }
    var count = item.querySelector('.feature-card__count');
    if (count) {
      var pc = document.createElement('p');
      pc.textContent = count.textContent.trim();
      cell.appendChild(pc);
    }
    // The whole card is one <a> wrapping title+desc+footer, so link.textContent is the
    // entire card. Build the secondary CTA from the href but force the visible label to
    // the "Learn more" footer affordance (fallback to "Learn more").
    var link = item.querySelector('a');
    if (link) {
      var learn = item.querySelector('.feature-card__footer-link');
      var p = document.createElement('p');
      var em = document.createElement('em');
      var a = document.createElement('a');
      a.href = absUrl(link.getAttribute('href') || '');
      a.textContent = learn ? learn.textContent.trim() : 'Learn more';
      em.appendChild(a);
      p.appendChild(em);
      cell.appendChild(p);
    }
    rows.push([cell]);
  });
  var table = WebImporter.DOMUtils.createTable(rows, document);
  // default content first, then the cards block, then section break before whatever follows
  element.replaceWith(dc, table);
}

// CLEANUP
function cleanupTransformer(hookName, element) {
  if (hookName !== 'beforeTransform') return;
  element.querySelectorAll('script, style, noscript, iframe, link[rel="stylesheet"]').forEach(function (el) { el.remove(); });
  element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach(function (el) { el.remove(); });
  element.querySelectorAll('header, footer, nav, [class*="srf-header"], [class*="srf-footer"], [class*="srf-layout__footer"], [class*="srf-layout__header"]').forEach(function (el) { el.remove(); });
  element.querySelectorAll('[class*="outdated"], [class*="skip-to"], [aria-hidden="true"]').forEach(function (el) { el.remove(); });
  element.querySelectorAll('nav[aria-label="Breadcrumbs"], .breadcrumbs').forEach(function (el) { el.remove(); });
  element.querySelectorAll('img[src*="analytics"], img[src*="bat.bing"], img[src*="pixel"]').forEach(function (el) {
    var parent = el.closest('p') || el.closest('picture') || el;
    parent.remove();
  });
}

// AFTER-TRANSFORM: section breaks (hr) between regions + section-dark on the mid CTA band +
// the page template metadata.
function afterTransformer(hookName, element, payload) {
  if (hookName !== 'afterTransform') return;
  var document = payload.document;

  // Mark the mid-CTA region dark by keying off its surviving "Win the SERPs" heading.
  var midHeading = null;
  element.querySelectorAll('h2').forEach(function (h) {
    if (/win the serps|win the serp/i.test(h.textContent || '')) midHeading = h;
  });
  if (midHeading) {
    var midBlock = midHeading.closest('div') || midHeading;
    midBlock.parentNode.insertBefore(document.createElement('hr'), midBlock);
    var darkMeta = WebImporter.DOMUtils.createTable([['Section Metadata'], ['Style', 'section-dark']], document);
    // place the metadata right after the mid block (end of that section) — a break follows before Related
    midBlock.parentNode.insertBefore(darkMeta, midBlock.nextSibling);
    midBlock.parentNode.insertBefore(document.createElement('hr'), darkMeta.nextSibling);
  }

  // Page metadata in its OWN last section — EDS's decorateTemplateAndTheme only treats it as
  // page metadata when it's section-isolated, so break before it with an <hr> (the pipeline
  // turns <hr> into a section divider). Without the break it merges into the related-features
  // section and renders as visible text.
  //   - template: applies body.template-feature.
  //   - nav/footer: this page lives a directory deep (/features/<tool>/), but the shared nav
  //     and footer fragments live at the content root. header.js/footer.js default to
  //     `${getContentRoot()}/nav` which (stripping the last segment) would look in
  //     /features/ and 404. A RELATIVE `../nav` value resolves correctly in BOTH environments
  //     — `/content/nav` locally and `/nav` on the published site — via new URL(meta, location).
  element.appendChild(document.createElement('hr'));
  var pageMeta = WebImporter.DOMUtils.createTable(
    [['Metadata'], ['template', 'template-feature'], ['nav', '../nav'], ['footer', '../footer']],
    document,
  );
  element.appendChild(pageMeta);
}

// CONFIGURATION
var PAGE_TEMPLATE = {
  name: 'feature',
  blocks: [
    { name: 'tool-cards', instances: ['.tools__list', 'ul.tools__list'] },
    { name: 'related', instances: ['section.related-links', '.related-links'] },
  ],
};

export default {
  transform: function (payload) {
    var document = payload.document;
    var params = payload.params;
    var main = document.body;

    cleanupTransformer('beforeTransform', main);

    // Hero (default content) — first.
    var hero = main.querySelector('.hero');
    if (hero) heroParser(hero, { document: document });

    // Tool cards.
    var toolsList = main.querySelector('.tools__list');
    if (toolsList) toolCardsParser(toolsList, { document: document });

    // Mid CTA band (default content).
    var mid = main.querySelector('.get-trial__inner, .get-trial');
    if (mid) midCtaParser(mid, { document: document });

    // Related features (default content + cards).
    var related = main.querySelector('section.related-links, .related-links');
    if (related) relatedParser(related, { document: document });

    afterTransformer('afterTransform', main, payload);

    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, payload.url, params.originalURL);

    var path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/features/index',
    );

    return [{
      element: main,
      path: path,
      report: { title: document.title, template: PAGE_TEMPLATE.name },
    }];
  },
};
