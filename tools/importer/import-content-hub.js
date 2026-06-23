/* eslint-disable */
/* global WebImporter */

// Generic import parser for the LEGACY Semrush "goodcontent" editorial template — every
// /content-hub/* and /free-tools/* page on the Next.js "goodcontent" app (build-hashed gch-*
// classes, semantic <section aria-label="…"> region wrappers). These are NOT comparison pages
// (those are handled by import-comparison.js's legacy dispatch and relocated to /vs/); these
// are the marketing/editorial pages:
//   • content-hub landing, AI prompt library, AI content report, can-AI-rank research,
//     ebook/starter-kit, content-marketing-blog index + articles, and the free-tools generators.
// We migrate them onto the MAIN marketing template (template-default), reproducing each page's
// content with the existing toolbox: hero/prose/CTA → default content; card grids (blog cards,
// free-tool cards, resource cards) → `cards-icon`; stat bands → `columns-stats`. The parser is
// REGION-DRIVEN and GENERIC: it walks the page's top-level content blocks in order and classifies
// each by shape (has a card list? a stat list? just prose?), so one script covers all page types.
// Icons are inline SVGs the html2md pipeline strips — that's fine, they're decorative.

// HELPERS

function absUrl(src) {
  if (!src || src === 'about:error') return '';
  var m = /[?&]url=([^&]+)/.exec(src); // Next.js /_next/image proxy
  if (m) { try { src = decodeURIComponent(m[1]); } catch (e) {} }
  if (src.startsWith('//')) return 'https:' + src;
  return src.startsWith('/') ? 'https://www.semrush.com' + src : src;
}

function textP(text, document) {
  var p = document.createElement('p');
  p.textContent = (text || '').replace(/\s+/g, ' ').trim();
  return p;
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

function ctaP(text, href, kind, document) {
  if (!text || !href) return null;
  var p = document.createElement('p');
  var wrap = document.createElement(kind === 'secondary' ? 'em' : 'strong');
  var a = document.createElement('a');
  a.href = absUrl(href);
  a.textContent = text.replace(/\s+/g, ' ').trim();
  wrap.appendChild(a);
  p.appendChild(wrap);
  return p;
}

// A "card list" = a <ul>/<list> of link cards, each with a heading + blurb (+ optional CTA).
// Returns an array of { img, title, desc, ctaText, ctaHref } or null if the region has none.
function extractCards(region, document) {
  // Card lists come in two shapes: <ul><li><a> (goodcontent card grids) and <article><a>
  // (the newer tool-grid hub pages, e.g. /free-tools/seo). Match a heading-bearing anchor in
  // either. De-dupe so a card counted once.
  var anchors = [].slice.call(region.querySelectorAll('li a[href], ul a[href], article a[href]'))
    .filter(function (a, i, arr) { return arr.indexOf(a) === i; });
  if (anchors.length < 2) return null;
  var cards = [];
  anchors.forEach(function (a) {
    var title = a.querySelector('h2, h3, h4');
    if (!title) return;
    var card = {
      href: a.getAttribute('href') || '',
      title: title.textContent.replace(/\s+/g, ' ').trim(),
      img: (a.querySelector('img') || {}).src ? a.querySelector('img').getAttribute('src') : null,
      desc: '',
      cta: '',
    };
    a.querySelectorAll('p').forEach(function (p) {
      var t = p.textContent.replace(/\s+/g, ' ').trim();
      if (t && t !== card.title) card.desc = card.desc ? card.desc : t;
    });
    // The card's button label (e.g. "Read now", "Generate content") — a button or trailing span.
    var btn = a.querySelector('button');
    if (btn) card.cta = btn.textContent.replace(/\s+/g, ' ').trim();
    cards.push(card);
  });
  return cards.length ? cards : null;
}

// A "stat list" = 2–4 items each leading with a big number/percentage (10M, 14, 30%).
function extractStats(region) {
  var items = region.querySelectorAll('li');
  if (items.length < 2 || items.length > 4) return null;
  var stats = [];
  var ok = true;
  items.forEach(function (li) {
    var t = li.textContent.replace(/\s+/g, ' ').trim();
    var m = /^([\d.,]+\s*[%MKkМ+]*)\s+(.+)$/.exec(t);
    if (m) stats.push({ num: m[1].trim(), label: m[2].trim() });
    else ok = false;
  });
  return ok && stats.length ? stats : null;
}

// BLOCK BUILDERS

// Card grid → `cards-icon`. Each card: optional image, bold title (linked), desc, secondary CTA.
// When the cards carry a full COVER/banner image (blog post covers, product screenshots) rather
// than a small glyph icon, emit the `cards-icon-feature` variant so the image renders full-width
// at the top of the card instead of as a 48px icon. Heuristic: source banner/cover images live
// under /banners/ or /uploads/media/ (editorial covers); small tool glyphs live under
// /static/media/. If a majority of the cards' images are covers, the whole grid is a feature grid.
function cardsBlock(cards, document) {
  // Test the DECODED url (absUrl unwraps the Next.js /_next/image?url=<encoded> proxy form the
  // card img often carries at parse time) so cover detection sees the real /banners/ path.
  var withImg = cards.filter(function (c) { return c.img; });
  var covers = withImg.filter(function (c) { return /\/banners\/|\/uploads\/media\//.test(absUrl(c.img || '')); });
  var feature = withImg.length >= 2 && covers.length > withImg.length / 2;
  var rows = [[feature ? 'Cards Icon (cards-icon-feature)' : 'Cards Icon']];
  cards.forEach(function (c) {
    var cell = document.createElement('div');
    if (c.img) cell.appendChild(wrapImg(c.img, c.title, document));
    var pt = document.createElement('p');
    var strong = document.createElement('strong');
    if (c.href) {
      var a = document.createElement('a');
      a.href = absUrl(c.href);
      a.textContent = c.title;
      strong.appendChild(a);
    } else {
      strong.textContent = c.title;
    }
    pt.appendChild(strong);
    cell.appendChild(pt);
    if (c.desc) cell.appendChild(textP(c.desc, document));
    var cp = ctaP(c.cta || (c.href ? 'Learn more' : ''), c.href, 'secondary', document);
    if (cp) cell.appendChild(cp);
    rows.push([cell]);
  });
  return WebImporter.DOMUtils.createTable(rows, document);
}

// Stat band → `columns-stats`. ONE row, ONE CELL PER STAT — columns-stats.js reads the first
// row's children AS the columns (and sets `columns-stats-N-cols`). Emitting all stats in a
// single cell collapses them into one stacked column, so each stat must be its own cell.
function statsBlock(stats, document) {
  var rows = [['Columns Stats']];
  var row = stats.map(function (s) {
    var cell = document.createElement('div');
    var h3 = document.createElement('h3');
    h3.textContent = s.num;
    cell.appendChild(h3);
    cell.appendChild(textP(s.label, document));
    return cell;
  });
  rows.push(row);
  return WebImporter.DOMUtils.createTable(rows, document);
}

// A prose/editorial/FAQ region → default content, emitting ALL headings, paragraphs and
// plain lists in DOM order (so h3 sub-headings and FAQ questions are NOT dropped — the
// single-heading regionHeading() below is only for the intro line above a stats/cards block).
// Skips anything inside a link or list item (card internals) and re-emits a plain list once.
function proseRegion(region, wrapper, document) {
  region.querySelectorAll('h1, h2, h3, h4, p, ul, ol').forEach(function (el) {
    if (el.closest('a')) return;
    var tag = el.tagName.toLowerCase();
    if (/^h[1-4]$/.test(tag)) {
      if (el.closest('li')) return;
      var ht = el.textContent.replace(/\s+/g, ' ').trim();
      if (!ht) return;
      var hh = document.createElement(tag === 'h1' ? 'h2' : tag); // never re-emit an h1 inside a region
      hh.textContent = ht;
      wrapper.appendChild(hh);
      return;
    }
    if (tag === 'ul' || tag === 'ol') {
      if (el.closest('li')) return; // nested list — emitted with its parent
      // Feature-grid list: items carry a nested heading (label) + description. Emit each as a
      // sub-heading + paragraph so "LabelDescription" doesn't render glued into one bullet.
      if (el.querySelector('li h3, li h4')) {
        el.querySelectorAll(':scope > li').forEach(function (li) {
          var h = li.querySelector('h3, h4');
          var label = h ? h.textContent.replace(/\s+/g, ' ').trim() : '';
          if (label) {
            var hh = document.createElement('h3');
            hh.textContent = label;
            wrapper.appendChild(hh);
          }
          var full = li.textContent.replace(/\s+/g, ' ').trim();
          var desc = label && full.indexOf(label) === 0 ? full.slice(label.length).trim() : full;
          if (desc && desc !== label) wrapper.appendChild(textP(desc, document));
        });
        return;
      }
      var list = document.createElement(tag);
      el.querySelectorAll(':scope > li').forEach(function (li) {
        // A list item often wraps several block children (a "Step N" label <p> + a description
        // <p>, an icon + text). li.textContent concatenates them with NO separator → "Step1Choose
        // …". Collect the block descendants' text and join with a separator so nothing glues.
        var parts = [].slice.call(li.querySelectorAll('p, h2, h3, h4, span, div'))
          .filter(function (n) { return !n.querySelector('p, h2, h3, h4, span, div, img'); })
          .map(function (n) { return n.textContent.replace(/\s+/g, ' ').trim(); })
          .filter(function (s) { return s; });
        // de-dupe consecutive identical fragments (nested wrappers repeating the same text)
        var seen = [];
        parts.forEach(function (s) { if (seen[seen.length - 1] !== s) seen.push(s); });
        // Drop a standalone "Step"/"N"/"Step N" ordinal label (the <ol> numbering conveys it).
        seen = seen.filter(function (s) { return !/^(step\s*\d*|\d+)$/i.test(s); });
        // Join fragments; concatenate (no separator) when the prior fragment already ends in
        // separating punctuation (a "Label:" lead-in), else join with an em-dash so a label and
        // its description don't glue into one word.
        var lt = '';
        seen.forEach(function (s, i) {
          if (i === 0) { lt = s; return; }
          lt += /[:—\-.]$/.test(lt) ? ' ' + s : ' — ' + s;
        });
        if (!lt) lt = li.textContent.replace(/\s+/g, ' ').trim();
        if (lt) {
          var liEl = document.createElement('li');
          liEl.textContent = lt;
          list.appendChild(liEl);
        }
      });
      if (list.childNodes.length) wrapper.appendChild(list);
      return;
    }
    // paragraph — skip ones already covered by a list item
    if (el.closest('li')) return;
    if (el.closest('ul, ol')) return;
    var t = el.textContent.replace(/\s+/g, ' ').trim();
    if (t && t.length > 1) wrapper.appendChild(textP(t, document));
  });

  // Numbered "How to use" steps: each step is a (number + description) block where the
  // description sits in a bare <div> the tag-walk above misses (so the band would render as an
  // orphaned heading). Detect ≥2 number-only <p>s and emit their step copy as an <ol>.
  var numbered = [].slice.call(region.querySelectorAll('p')).filter(function (p) {
    return /^\d+$/.test(p.textContent.replace(/\s+/g, '')) && !p.closest('a, li');
  });
  if (numbered.length >= 2) {
    var ol = document.createElement('ol');
    numbered.forEach(function (p) {
      var num = p.textContent.replace(/\s+/g, '');
      var full = (p.parentElement ? p.parentElement.textContent : '').replace(/\s+/g, ' ').trim();
      var desc = full.replace(new RegExp('^' + num + '[.)]?\\s*'), '').trim();
      if (desc) {
        var li2 = document.createElement('li');
        li2.textContent = desc;
        ol.appendChild(li2);
      }
    });
    if (ol.childNodes.length) wrapper.appendChild(ol);
  }

  // region-level CTA — a STANDALONE link (a direct child of the band, NOT inside prose/a list).
  // The button label is often wrapped in a nested <span>, so match by "not inside p/li/heading"
  // rather than parent-text equality; inline prose/FAQ links live inside <p> and are excluded.
  var cta = null;
  region.querySelectorAll('a[href]').forEach(function (a) {
    if (cta || a.closest('p, li, ul, ol, h1, h2, h3, h4')) return;
    var at = a.textContent.replace(/\s+/g, ' ').trim();
    if (at && at.length <= 60) cta = a;
  });
  if (cta) {
    var cp = ctaP(cta.textContent, cta.getAttribute('href'), 'primary', document);
    if (cp) wrapper.appendChild(cp);
  }
}

// Hero lead text. Prefer <p> siblings of the h1 (goodcontent section-shape pages); if there
// are none (the newer checker/generator tools render the lead as a bare <div>), find the first
// prose element near the h1 that carries no form controls (so the tool widget — input/button/
// combobox/usage-counter — is never mistaken for the lead). Returns an array of strings.
function heroLead(heroBox, h1) {
  var WIDGET = 'input, button, select, textarea, [role="combobox"], [role="button"], [contenteditable]';
  var out = [];
  heroBox.querySelectorAll('p').forEach(function (p) {
    if (p.querySelector(WIDGET)) return;
    var t = p.textContent.replace(/\s+/g, ' ').trim();
    if (t && t.length > 1) out.push(t);
  });
  if (out.length) return out;
  var kids = heroBox.querySelectorAll('div, span');
  for (var i = 0; i < kids.length; i += 1) {
    var el = kids[i];
    if (el.contains(h1) || el.querySelector(WIDGET + ', h1, ul, ol, a[href]')) continue;
    var t2 = el.textContent.replace(/\s+/g, ' ').trim();
    if (t2.length >= 20 && t2.length <= 400 && !/^\d+\s*\/\s*\d+$/.test(t2)) { out.push(t2); break; }
  }
  return out;
}

// The newer checker/generator tools use NO <section>/[role=region] wrappers — content lives in
// background-banded sibling <div>s (bg_white / bg-c_main.lavender / …) under a content column.
// Find those bands generically: climb from the h1 until we reach a level whose siblings include
// ≥2 heading-bearing blocks, and return all those sibling bands (the hero band among them, which
// the caller skips via contains(h1)). Returns null when the page uses the section-shape instead.
function findContentBands(h1) {
  var node = h1;
  while (node && node.parentElement && node.parentElement.tagName !== 'BODY') {
    var sibs = [].slice.call(node.parentElement.children);
    var headed = sibs.filter(function (s) { return s.querySelector('h1, h2, h3'); });
    if (headed.length >= 2) return sibs;
    node = node.parentElement;
  }
  return null;
}

// Heading + intro paragraph(s) for a region → default-content nodes appended to a wrapper.
function regionHeading(region, wrapper, document, level) {
  var h = region.querySelector('h1, h2, h3');
  if (h) {
    var hh = document.createElement(level || 'h2');
    hh.textContent = h.textContent.replace(/\s+/g, ' ').trim();
    wrapper.appendChild(hh);
  }
  // intro paragraph(s): the region's <p>s that are NOT inside a card list (ul/ol/list) and
  // NOT inside a link or list item — those belong to cards, not the region intro.
  var ul = region.querySelector('ul, ol, [role="list"]');
  region.querySelectorAll('p').forEach(function (p) {
    if (ul && ul.contains(p)) return;
    if (p.closest('a, li')) return;
    if (h && p.textContent.trim() === h.textContent.trim()) return;
    var t = p.textContent.replace(/\s+/g, ' ').trim();
    if (t && t.length > 1) wrapper.appendChild(textP(t, document));
  });
  // region-level CTA (a link directly in the region, not in a card list or list item)
  var cta = null;
  region.querySelectorAll('a[href]').forEach(function (a) {
    if (ul && ul.contains(a)) return;
    if (a.closest('li')) return;
    if (!cta && a.textContent.trim()) cta = a;
  });
  if (cta) {
    var cp = ctaP(cta.textContent, cta.getAttribute('href'), 'primary', document);
    if (cp) wrapper.appendChild(cp);
  }
}

// CLEANUP — strip chrome (header, footer, the goodcontent sub-nav, cookie banners).
function cleanupTransformer(hookName, element) {
  if (hookName !== 'beforeTransform') return;
  element.querySelectorAll('script, style, noscript, link[rel="stylesheet"]').forEach(function (el) { el.remove(); });
  element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach(function (el) { el.remove(); });
  element.querySelectorAll('header, footer, [class*="srf-header"], [class*="srf-footer"]').forEach(function (el) { el.remove(); });
  element.querySelectorAll('nav').forEach(function (el) { el.remove(); });
  element.querySelectorAll('[aria-label*="browser"], complementary').forEach(function (el) { el.remove(); });
}

export default {
  transform: function (payload) {
    var document = payload.document;
    var params = payload.params;
    var sourceMain = document.body;

    cleanupTransformer('beforeTransform', sourceMain);

    var main = sourceMain.querySelector('main') || sourceMain;
    var out = document.createElement('div');
    function pushSection(node, metaStyle) {
      if (!node) return;
      out.appendChild(node);
      if (metaStyle) {
        out.appendChild(WebImporter.DOMUtils.createTable([['Section Metadata'], ['Style', metaStyle]], document));
      }
      out.appendChild(document.createElement('hr'));
    }

    // HERO — the first content block that holds the page h1. Default content, centered.
    var h1 = main.querySelector('h1');
    if (h1) {
      var heroWrap = document.createElement('div');
      var hh = document.createElement('h1');
      hh.textContent = h1.textContent.replace(/\s+/g, ' ').trim();
      heroWrap.appendChild(hh);
      // lead text: <p> siblings, or (newer tools) the nearest bare-<div> lead — never the widget.
      var heroBox = h1.parentElement;
      if (heroBox) {
        heroLead(heroBox, h1).forEach(function (t) { heroWrap.appendChild(textP(t, document)); });
      }
      pushSection(heroWrap, 'section-centered');
    }

    // BLOG-ARTICLE branch — some /content-hub/* URLs 301-redirect to the Semrush BLOG template
    // (e.g. can-ai-content-rank → /blog/…). Those render their body in an <article>, not in
    // goodcontent <section>s. Capture the article as flowing default content (headings, prose,
    // lists, blockquotes, images) and skip the section walk.
    var article = main.querySelector('article');
    if (article) {
      var aw = document.createElement('div');
      article.querySelectorAll(':scope h2, :scope h3, :scope h4, :scope p, :scope ul, :scope ol, :scope blockquote, :scope figure img').forEach(function (el) {
        var tag = el.tagName.toLowerCase();
        if (tag === 'img') {
          aw.appendChild(wrapImg(el.getAttribute('src'), el.getAttribute('alt') || '', document));
          return;
        }
        if (/^h[2-4]$/.test(tag)) {
          var hh2 = document.createElement(tag);
          hh2.textContent = el.textContent.replace(/\s+/g, ' ').trim();
          if (hh2.textContent) aw.appendChild(hh2);
          return;
        }
        if (tag === 'ul' || tag === 'ol') {
          var list = document.createElement(tag);
          el.querySelectorAll(':scope > li').forEach(function (li) {
            var liEl = document.createElement('li');
            liEl.textContent = li.textContent.replace(/\s+/g, ' ').trim();
            if (liEl.textContent) list.appendChild(liEl);
          });
          if (list.childNodes.length) aw.appendChild(list);
          return;
        }
        if (tag === 'blockquote') {
          var bq = document.createElement('blockquote');
          el.querySelectorAll('p').forEach(function (p) {
            var t = p.textContent.replace(/\s+/g, ' ').trim();
            if (t) bq.appendChild(textP(t, document));
          });
          if (!bq.childNodes.length) bq.appendChild(textP(el.textContent, document));
          aw.appendChild(bq);
          return;
        }
        // paragraph (skip ones nested inside a list/blockquote already handled)
        if (el.closest('ul, ol, blockquote') && article.contains(el.closest('ul, ol, blockquote'))) return;
        var t = el.textContent.replace(/\s+/g, ' ').trim();
        if (t) {
          var pp = document.createElement('p');
          // preserve a single inline CTA link if the paragraph is just a link
          var only = el.querySelector('a[href]');
          if (only && only.textContent.trim() === t) {
            var a = document.createElement('a');
            a.href = absUrl(only.getAttribute('href'));
            a.textContent = t;
            pp.appendChild(a);
          } else {
            pp.textContent = t;
          }
          aw.appendChild(pp);
        }
      });
      if (aw.childNodes.length) pushSection(aw, null);

      out.appendChild(WebImporter.DOMUtils.createTable(
        [['Metadata'], ['template', 'template-default'], ['nav', '/nav'], ['footer', '/footer']],
        document,
      ));
      sourceMain.innerHTML = '';
      sourceMain.appendChild(out);
      WebImporter.rules.transformBackgroundImages(sourceMain, document);
      WebImporter.rules.adjustImageUrls(sourceMain, payload.url, params.originalURL);
      var apath = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/content-hub/index',
      );
      return [{ element: sourceMain, path: apath, report: { title: document.title, template: 'content-hub-article' } }];
    }

    // CONTENT BODY — the goodcontent app uses two DOM shapes for the body, and which one a given
    // page renders can even vary between headless runs (lazy hydration leaves a stray transient
    // <section>/[role=region]). So DON'T branch on a region count — build BOTH candidate bodies
    // into throwaway fragments and KEEP whichever captured more content (headings + blocks). This
    // is robust to a single stray hydrated region that would otherwise starve the band walk.
    //   Shape A — section-shape: every content block wrapped in a top-level <section>/[role=region]
    //             (writing-tools, content-hub editorial). Walk top-level regions.
    //   Shape B — banded-div: NO section wrappers; content in background-banded sibling <div>s
    //             (the newer checker/generator + tool-grid hub pages). Walk the hero's sibling bands.
    function classifyInto(region, frag) {
      var stats = extractStats(region);
      if (stats) {
        var sw = document.createElement('div');
        regionHeading(region, sw, document);
        if (sw.childNodes.length) frag.push([sw, null]);
        frag.push([statsBlock(stats, document), null]);
        return;
      }
      var cards = extractCards(region, document);
      if (cards) {
        var cw = document.createElement('div');
        regionHeading(region, cw, document);
        if (cw.childNodes.length) frag.push([cw, null]);
        frag.push([cardsBlock(cards, document), null]);
        return;
      }
      // Prose / editorial / FAQ → default content. Walk ALL headings/paragraphs/lists in DOM
      // order so sub-headings (h3 feature labels) and FAQ questions survive.
      var pw = document.createElement('div');
      proseRegion(region, pw, document);
      if (pw.childNodes.length) frag.push([pw, null]);
    }

    // Shape A candidate
    var allSections = [].slice.call(main.querySelectorAll('section, [role="region"]'));
    var topRegions = allSections.filter(function (s) {
      return !allSections.some(function (other) { return other !== s && other.contains(s); });
    });
    var fragA = [];
    topRegions.forEach(function (region) {
      if (h1 && region.contains(h1)) return; // hero handled above
      classifyInto(region, fragA);
    });

    // Shape B candidate
    var fragB = [];
    if (h1) {
      var bands = findContentBands(h1);
      if (bands) {
        bands.forEach(function (band) {
          if (band.contains(h1)) return;
          if (band.tagName === 'SCRIPT' || band.tagName === 'STYLE') return;
          classifyInto(band, fragB);
        });
      }
    }

    // Pick the richer body by total captured text length (shape-agnostic — works whether the
    // body is prose, cards, or stats); ties favor Shape A (section-shape).
    function weigh(frag) {
      var n = 0;
      frag.forEach(function (pair) { n += (pair[0].textContent || '').replace(/\s+/g, ' ').trim().length; });
      return n;
    }
    var chosen = weigh(fragB) > weigh(fragA) ? fragB : fragA;
    chosen.forEach(function (pair) { pushSection(pair[0], pair[1]); });

    // Page template metadata. Content-hub CARD-GRID LANDINGS (the hub home + the blog index —
    // they lead with a `cards-icon-feature` blog-cover grid) get a `template-content-hub` class
    // STACKED on the marketing base, so their layout (centered section headers, framed cards,
    // tightened rhythm) can be styled without touching the shared `template-default` the frozen
    // homepage uses. Free-tool pages (no feature grid) stay on the bare marketing template.
    var hasFeatureGrid = !!out.querySelector('.cards-icon-feature, [class*="cards-icon-feature"]')
      || /cards-icon-feature/.test(out.innerHTML);
    var tmpl = hasFeatureGrid ? 'template-default, template-content-hub' : 'template-default';
    out.appendChild(WebImporter.DOMUtils.createTable(
      [['Metadata'], ['template', tmpl], ['nav', '/nav'], ['footer', '/footer']],
      document,
    ));

    sourceMain.innerHTML = '';
    sourceMain.appendChild(out);

    WebImporter.rules.transformBackgroundImages(sourceMain, document);
    WebImporter.rules.adjustImageUrls(sourceMain, payload.url, params.originalURL);

    var path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/content-hub/index',
    );

    return [{
      element: sourceMain,
      path: path,
      report: { title: document.title, template: 'content-hub' },
    }];
  },
};
