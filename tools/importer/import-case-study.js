/* eslint-disable */
/* global WebImporter */

// Import parser for a Semrush /content-hub/success-spotlights/<name>/ case study (server-rendered, Next.js).
// Shape: pink logo hero band → long-form editorial article → closing blue promo CTA band.
// An editorial article maps onto DEFAULT CONTENT (most faithful, zero new blocks): the article
// body is cloned and cleaned, so every heading/paragraph/list/image/quote/link is captured in
// document order. The YouTube iframe becomes a plain link (EDS auto-embeds; video-in-eds), and
// the closing promo becomes default content under section-dark. Template: template-default, template-case-study.

// HELPERS

function absUrl(src) {
  if (!src || src === 'about:error') return '';
  if (src.startsWith('//')) return 'https:' + src;
  return src.startsWith('/') ? 'https://www.semrush.com' + src : src;
}

// Next.js wraps images as `/content-hub/_next/image/?url=<ENCODED>&w=…&q=75`. Decode the real
// underlying asset URL (static.semrush.com) so the imported <img> points at the source asset.
function decodeNextImg(src) {
  if (!src) return '';
  var m = src.match(/[?&]url=([^&]+)/);
  if (m) {
    try { return decodeURIComponent(m[1]); } catch (e) { return absUrl(src); }
  }
  return absUrl(src);
}

function ctaP(link, kind, document) {
  if (!link) return null;
  var href = link.getAttribute('href') || '';
  var text = link.textContent.trim();
  if (!text || !href) return null;
  var p = document.createElement('p');
  var wrap = document.createElement(kind === 'secondary' ? 'em' : 'strong');
  var a = document.createElement('a');
  a.href = absUrl(href);
  a.textContent = text;
  wrap.appendChild(a);
  p.appendChild(wrap);
  return p;
}

// PARSERS

// Logo hero band → default content holding only the brand logo image (the source hero is a
// pink band with the customer's logo, no heading). The h1 lives inside the article (added next).
function heroLogoParser(band, { document }) {
  var wrapper = document.createElement('div');
  var logo = band.querySelector('img');
  if (logo) {
    var p = document.createElement('p');
    var pic = document.createElement('picture');
    var img = document.createElement('img');
    img.src = decodeNextImg(logo.getAttribute('src'));
    img.alt = logo.getAttribute('alt') || '';
    pic.appendChild(img);
    p.appendChild(pic);
    wrapper.appendChild(p);
  }
  return wrapper;
}

// Clone the editorial article and clean framework cruft, leaving clean default content
// (headings, paragraphs, lists, images, links) for the html2md pipeline to convert.
function cleanArticle(article, { document }) {
  var clone = article.cloneNode(true);

  // Remove the in-article TOC, share rail, and heading-anchor spans (framework chrome).
  clone.querySelectorAll('nav[aria-label="Contents of the article"]').forEach(function (el) { el.remove(); });
  clone.querySelectorAll('[aria-label^="Share the article"]').forEach(function (el) { el.remove(); });
  clone.querySelectorAll('span[data-menu="heading"]').forEach(function (el) { el.remove(); });

  // Remove the closing promo block — it becomes its OWN section-dark region (handled separately).
  clone.querySelectorAll('section.gch-1dwyxx3').forEach(function (el) { el.remove(); });

  // Buttons that are not links are framework UI (share/copy) — drop them. Keep real <a>.
  clone.querySelectorAll('button, [data-ui-name="Button"]:not(a)').forEach(function (el) { el.remove(); });

  // YouTube iframe → a plain link (EDS auto-embeds a bare video link; video-in-eds).
  clone.querySelectorAll('iframe').forEach(function (frame) {
    var src = frame.getAttribute('src') || '';
    if (/youtube|youtu\.be|vimeo/.test(src)) {
      var p = document.createElement('p');
      var a = document.createElement('a');
      var clean = src.split('?')[0];
      a.href = clean;
      a.textContent = clean;
      p.appendChild(a);
      (frame.closest('div') || frame).replaceWith(p);
    } else {
      (frame.closest('div') || frame).remove();
    }
  });

  // Normalize images: decode Next.js wrappers, wrap bare <img> in <picture>, drop decorative SVGs.
  clone.querySelectorAll('img').forEach(function (img) {
    var src = img.getAttribute('src') || '';
    if (/\.svg(\?|$)/i.test(src) && !img.getAttribute('alt')) { // decorative pink SVGs have empty alt
      (img.closest('p') || img).remove();
      return;
    }
    img.src = decodeNextImg(src);
    img.removeAttribute('srcset');
    if (!img.closest('picture')) {
      var pic = document.createElement('picture');
      img.parentNode.insertBefore(pic, img);
      pic.appendChild(img);
    }
  });

  // Absolutize inline links + strip tracking attributes.
  clone.querySelectorAll('a').forEach(function (a) {
    a.href = absUrl(a.getAttribute('href') || '');
    a.removeAttribute('target');
    ['data-ga-event-onclick', 'data-ga-category', 'data-ga-action', 'data-ga-label', 'data-test', 'data-ui-name'].forEach(function (attr) { a.removeAttribute(attr); });
  });

  return clone;
}

// Closing blue promo → default content (h4 heading + body + primary CTA), under section-dark.
function promoParser(section, { document }) {
  var wrapper = document.createElement('div');
  var heading = section.querySelector('h2, h3, h4');
  if (heading) {
    var h = document.createElement(heading.tagName.toLowerCase());
    h.textContent = heading.textContent.trim();
    wrapper.appendChild(h);
  }
  // body paragraph(s): the descriptive text that isn't the heading or button label
  section.querySelectorAll('p').forEach(function (p) {
    var t = p.textContent.trim();
    if (t && t.length > 20) {
      var np = document.createElement('p');
      np.textContent = t;
      wrapper.appendChild(np);
    }
  });
  var link = section.querySelector('a[href]');
  var cp = ctaP(link, 'primary', document);
  if (cp) wrapper.appendChild(cp);
  return wrapper;
}

// CLEANUP
function cleanupTransformer(hookName, element) {
  if (hookName !== 'beforeTransform') return;
  element.querySelectorAll('script, style, noscript, link[rel="stylesheet"]').forEach(function (el) { el.remove(); });
  element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach(function (el) { el.remove(); });
  element.querySelectorAll('header, footer, nav[class*="srf"], [class*="srf-header"], [class*="srf-footer"], [class*="srf-layout__footer"], [class*="srf-layout__header"]').forEach(function (el) { el.remove(); });
  element.querySelectorAll('img[src*="analytics"], img[src*="bat.bing"], img[src*="pixel"]').forEach(function (el) {
    var parent = el.closest('p') || el.closest('picture') || el;
    parent.remove();
  });
}

export default {
  transform: function (payload) {
    var document = payload.document;
    var params = payload.params;
    var sourceMain = document.body;

    cleanupTransformer('beforeTransform', sourceMain);

    // Build a FRESH output container so section breaks are explicit (per Section-break rule in
    // PROJECT-IMPORT: append each region's wrapper + <hr>/Section Metadata in order).
    var out = document.createElement('div');

    // 1. Logo hero band.
    var band = sourceMain.querySelector('div.gch-k18f9v');
    if (band) {
      out.appendChild(heroLogoParser(band, { document: document }));
      out.appendChild(document.createElement('hr'));
    }

    // 2. The editorial article → cleaned default content.
    var article = sourceMain.querySelector('article');
    var promoSection = article ? article.querySelector('section.gch-1dwyxx3') : null;
    if (article) {
      out.appendChild(cleanArticle(article, { document: document }));
    }

    // 3. Closing blue promo → default content + section-dark (its own section).
    if (promoSection) {
      out.appendChild(document.createElement('hr'));
      out.appendChild(promoParser(promoSection, { document: document }));
      out.appendChild(WebImporter.DOMUtils.createTable([['Section Metadata'], ['Style', 'section-dark']], document));
    }

    // 4. Page template metadata in its own last section.
    out.appendChild(document.createElement('hr'));
    out.appendChild(WebImporter.DOMUtils.createTable(
      [['Metadata'], ['template', 'template-default, template-case-study'], ['nav', '../../nav'], ['footer', '../../footer']],
      document,
    ));

    // Swap the body content for our clean output.
    sourceMain.innerHTML = '';
    sourceMain.appendChild(out);

    WebImporter.rules.transformBackgroundImages(sourceMain, document);
    WebImporter.rules.adjustImageUrls(sourceMain, payload.url, params.originalURL);

    var path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index',
    );

    return [{
      element: sourceMain,
      path: path,
      report: { title: document.title, template: 'case-study' },
    }];
  },
};
