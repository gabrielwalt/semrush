/* eslint-disable */
/* global WebImporter */

// =============================================================================
// TOOLKIT v2 TEMPLATE IMPORT — newer toolkit design used by /content/,
// /advertising/, /social-media/, /pr-toolkit/, /analytics/traffic/,
// /local-business/start/, /ai-seo/overview/.
//
// These pages use CSS-module-obfuscated classes, so detection is by CONTENT
// SHAPE (structural markers) not class names. Sections are <section> children
// of a flex wrapper. See PROJECT-IMPORT.md → toolkit-v2 marker map.
// =============================================================================

const ORIGIN = 'https://www.semrush.com';
const abs = (s) => (!s ? '' : s.startsWith('//') ? `https:${s}` : s.startsWith('/') ? `${ORIGIN}${s}` : s);

function pic(document, src, alt) {
  const p = document.createElement('picture');
  const img = document.createElement('img');
  img.src = abs(src); img.alt = alt || '';
  p.appendChild(img);
  return p;
}
function para(document, text) { const p = document.createElement('p'); p.textContent = text; return p; }
function ctaPara(document, text, href, primary) {
  const p = document.createElement('p');
  const w = document.createElement(primary ? 'strong' : 'em');
  const a = document.createElement('a'); a.href = abs(href || '#'); a.textContent = text;
  w.appendChild(a); p.appendChild(w); return p;
}
function firstText(el, min) {
  return [...el.querySelectorAll('p, div')]
    .map((d) => (d.childNodes.length === 1 ? d.textContent.trim() : ''))
    .find((t) => t.length > (min || 25)) || '';
}

function cleanup(hookName, element) {
  if (hookName !== 'beforeTransform') return;
  element.querySelectorAll('script, style, noscript, iframe, link[rel="stylesheet"]').forEach((el) => el.remove());
  element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach((el) => el.remove());
  element.querySelectorAll('header, footer, nav, [class*="srf-header"], [class*="srf-footer"], [class*="snav-"]').forEach((el) => el.remove());
  element.querySelectorAll('[class*="outdated"], [class*="skip-to"], .visually-hidden').forEach((el) => el.remove());
}

// Collect the page's top-level sections, depth-independent.
// Strategy: prefer real <section> elements anywhere in main; else fall back to
// the wrapper whose direct children are heading-led.
function collectSections(document) {
  const main = document.querySelector('main') || document.body;

  // 1. Real <section> or [role=region] blocks that carry a heading — outermost only.
  const SECTION_SEL = 'section, [role="region"]';
  let secs = [...main.querySelectorAll(SECTION_SEL)]
    .filter((s) => s.querySelector('h1, h2, h3'))
    .filter((s) => !s.parentElement.closest(SECTION_SEL));
  if (secs.length >= 3) return secs;

  // 2. Fallback: find the wrapper with the most heading-led direct children.
  const cands = [...main.querySelectorAll('div, section')]
    .filter((el) => el.children.length >= 3 && el.children.length <= 16);
  let best = null; let score = 0;
  cands.forEach((c) => {
    const s = [...c.children].filter((ch) => ch.tagName === 'SECTION' || ch.querySelector('h1, h2, h3')).length;
    if (s > score) { score = s; best = c; }
  });
  if (best) {
    secs = [...best.children].filter((c) => c.tagName === 'SECTION' || c.querySelector('h1, h2, h3'));
    if (secs.length >= 3) return secs;
  }

  // 3. Last resort: heading-led blocks at any depth (dedupe ancestors).
  const headed = [...main.querySelectorAll('div, section')]
    .filter((el) => el.querySelector(':scope > h1, :scope > h2, :scope > * > h1, :scope > * > h2'))
    .filter((el, _i, arr) => !arr.some((o) => o !== el && o.contains(el)));
  return headed;
}

// ---- block builders ----
function buildHero(sec, document, out) {
  const h1 = sec.querySelector('h1') || sec.querySelector('h2');
  const eyebrow = sec.querySelector('p');
  if (eyebrow && eyebrow.textContent.trim() && (!h1 || !h1.contains(eyebrow))) {
    // small text before heading → eyebrow (auto-style)
    const pre = eyebrow.textContent.trim();
    if (pre.length < 60) out.appendChild(para(document, pre));
  }
  if (h1) { const h = document.createElement('h1'); h.textContent = h1.textContent.trim(); out.appendChild(h); }
  const sub = firstText(sec, 30);
  if (sub) out.appendChild(para(document, sub));
  const cta = [...sec.querySelectorAll('a')].find((a) => a.textContent.trim() && !/log ?in/i.test(a.textContent));
  if (cta) out.appendChild(ctaPara(document, cta.textContent.trim(), cta.getAttribute('href'), true));
  out.appendChild(WebImporter.DOMUtils.createTable([['Section Metadata'], ['Style', 'section-centered']], document));
}

function buildAccordion(sec, document, out) {
  const h = sec.querySelector('h2');
  if (h) { const el = document.createElement('h2'); el.textContent = h.textContent.trim(); out.appendChild(el); }
  // Q markers: buttons OR h3 toggles
  let qNodes = [...sec.querySelectorAll('button')].filter((b) => b.textContent.trim().length > 8);
  if (!qNodes.length) qNodes = [...sec.querySelectorAll('h3')];
  const rows = [['Accordion']];
  qNodes.forEach((q) => {
    const qDiv = document.createElement('div'); qDiv.appendChild(para(document, q.textContent.trim()));
    // answer = next sibling block(s) until next q
    const aDiv = document.createElement('div');
    let n = q.nextElementSibling;
    // climb to a common container if q is inside a header wrapper
    if (!n && q.parentElement) n = q.parentElement.nextElementSibling;
    while (n && n.tagName !== 'H3' && !n.querySelector?.('button')) {
      aDiv.appendChild(n.cloneNode(true));
      n = n.nextElementSibling;
    }
    if (!aDiv.children.length && q.parentElement) {
      // answer may be a sibling of the q's wrapper
      const sib = q.parentElement.nextElementSibling;
      if (sib) aDiv.appendChild(sib.cloneNode(true));
    }
    rows.push([qDiv, aDiv]);
  });
  if (rows.length > 1) out.appendChild(WebImporter.DOMUtils.createTable(rows, document));
}

// Find repeated "card" items: prefer <li>; else a group of sibling divs that
// each contain a sub-heading (h3/h4). Covers both <ul> lists and div grids.
function findCardItems(sec) {
  // 1. <article> items (each a feature card) — common in newer toolkit pages
  const articles = [...sec.querySelectorAll('article')].filter((a) => a.querySelector('h3, h4'));
  if (articles.length >= 2) return articles;
  // 2. Top-level <li> items (a heading or substantial text). Exclude <li>s that
  //    are nested inside another <li>/<article> — those are a card's own sub-bullets,
  //    not separate cards (prevents over-extraction of bullet items as cards).
  const lis = [...sec.querySelectorAll('li')]
    .filter((li) => !li.parentElement.closest('li, article'))
    .filter((li) => li.querySelector('h3, h4') || li.textContent.trim().length > 20);
  if (lis.length >= 3) return lis;
  // 3. div/group grid: a parent whose direct children each hold a sub-heading
  const groups = [...sec.querySelectorAll('div')].filter((g) => {
    const kids = [...g.children].filter((c) => c.querySelector(':scope h3, :scope h4') || (c.querySelector('p') && c.querySelector('img')));
    return kids.length >= 3;
  });
  if (groups.length) {
    const best = groups.find((x) => !groups.some((o) => o !== x && o.contains(x))) || groups[0];
    return [...best.children].filter((c) => c.querySelector('h3, h4') || (c.querySelector('p') && c.querySelector('img')));
  }
  return [];
}

function buildFeatureCards(sec, document, out) {
  const h = sec.querySelector('h2');
  if (h) { const el = document.createElement('h2'); el.textContent = h.textContent.trim(); out.appendChild(el); }
  const sub = firstText(sec, 30);
  if (sub) out.appendChild(para(document, sub));
  const items = findCardItems(sec);
  const rows = [['Cards Icon']];
  items.forEach((li) => {
    const cell = document.createElement('div');
    const img = li.querySelector('img');
    if (img) cell.appendChild(pic(document, img.getAttribute('src'), img.alt));
    // eyebrow (small <p> before the heading)
    const hh = li.querySelector('h3, h4');
    const eyebrow = li.querySelector('p');
    if (eyebrow && hh && eyebrow.compareDocumentPosition(hh) & Node.DOCUMENT_POSITION_FOLLOWING
        && eyebrow.textContent.trim().length < 30) {
      cell.appendChild(para(document, eyebrow.textContent.trim()));
    }
    if (hh) { const t = para(document, ''); const s = document.createElement('strong'); s.textContent = hh.textContent.trim(); t.appendChild(s); cell.appendChild(t); }
    // bullet sub-list
    const subList = li.querySelector('ul, ol');
    if (subList) {
      const ul = document.createElement('ul');
      [...subList.querySelectorAll('li')].forEach((x) => { const i = document.createElement('li'); i.textContent = x.textContent.trim(); ul.appendChild(i); });
      cell.appendChild(ul);
    } else {
      const d = firstText(li, 20); if (d) cell.appendChild(para(document, d));
    }
    const a = li.querySelector('a');
    if (a) cell.appendChild(ctaPara(document, a.textContent.trim(), a.getAttribute('href'), false));
    if (cell.children.length) rows.push([cell]);
  });
  if (rows.length > 1) out.appendChild(WebImporter.DOMUtils.createTable(rows, document));
}

function buildTestimonials(sec, document, out) {
  const h = sec.querySelector('h2');
  if (h) { const el = document.createElement('h2'); el.textContent = h.textContent.trim(); out.appendChild(el); }
  const quoteRe = /["“”]/;
  const rows = [['Testimonials Carousel']];

  // Prefer wrapped quote items (article/li/figure/blockquote/tabpanel)
  let quotes = [...sec.querySelectorAll('article, li, figure, blockquote, [role="tabpanel"]')]
    .filter((q) => quoteRe.test(q.textContent) && q.querySelector('p, img'))
    // outermost only (avoid a quote item nested inside another)
    .filter((q, _i, arr) => !arr.some((o) => o !== q && o.contains(q)));

  if (quotes.length >= 2) {
    quotes.forEach((q) => {
      const cell = document.createElement('div');
      const quoteText = [...q.querySelectorAll('p')].map((p) => p.textContent.trim()).find((t) => t.length > 40 && quoteRe.test(t));
      if (quoteText) { const bq = document.createElement('blockquote'); bq.appendChild(para(document, quoteText)); cell.appendChild(bq); }
      const img = q.querySelector('img');
      if (img) cell.appendChild(pic(document, img.getAttribute('src'), img.alt));
      const ps = [...q.querySelectorAll('p')].map((p) => p.textContent.trim()).filter((t) => t.length <= 40 && t.length > 2 && !quoteRe.test(t));
      if (ps[0]) { const np = para(document, ''); const s = document.createElement('strong'); s.textContent = ps[0]; np.appendChild(s); cell.appendChild(np); }
      if (ps[1]) cell.appendChild(para(document, ps[1]));
      if (cell.children.length) rows.push([cell]);
    });
  } else {
    // Fallback: no wrappers — paragraphs in a quote → name → role rhythm.
    // A "quote" is a long paragraph (with or without quote marks); skip slide
    // markers like "1 / 5". Start a new card on each long paragraph.
    const slideRe = /^\d+\s*\/\s*\d+$/;
    const ps = [...sec.querySelectorAll('p')]
      .map((p) => p.textContent.trim())
      .filter((t) => t.length > 1 && !slideRe.test(t));
    let cell = null;
    ps.forEach((t) => {
      const isQuote = t.length > 60 || (quoteRe.test(t) && t.length > 40);
      if (isQuote) {
        if (cell && cell.children.length) rows.push([cell]);
        cell = document.createElement('div');
        const bq = document.createElement('blockquote'); bq.appendChild(para(document, t)); cell.appendChild(bq);
      } else if (cell) {
        // author name (first short line) then role
        if (!cell.querySelector('strong')) { const np = para(document, ''); const s = document.createElement('strong'); s.textContent = t; np.appendChild(s); cell.appendChild(np); }
        else if (cell.querySelectorAll('p').length < 2) cell.appendChild(para(document, t));
      }
    });
    if (cell && cell.children.length) rows.push([cell]);
  }

  if (rows.length > 1) out.appendChild(WebImporter.DOMUtils.createTable(rows, document));
}

function buildComparisonTable(sec, document, out) {
  const h = sec.querySelector('h2');
  if (h) { const el = document.createElement('h2'); el.textContent = h.textContent.trim(); out.appendChild(el); }
  const sub = firstText(sec, 30); if (sub) out.appendChild(para(document, sub));
  // Keep the source table — EDS renders tables natively as default content.
  const table = sec.querySelector('table');
  if (table) {
    const clean = table.cloneNode(true);
    clean.querySelectorAll('button, a').forEach((b) => {
      if (/log ?in|get started/i.test(b.textContent)) b.remove();
    });
    out.appendChild(clean);
  }
}

function buildDefaultCta(sec, document, out) {
  const h = sec.querySelector('h2');
  if (h) { const el = document.createElement('h2'); el.textContent = h.textContent.trim(); out.appendChild(el); }
  const sub = firstText(sec, 25); if (sub) out.appendChild(para(document, sub));
  const cta = [...sec.querySelectorAll('a')].find((a) => a.textContent.trim() && !/log ?in/i.test(a.textContent));
  if (cta) out.appendChild(ctaPara(document, cta.textContent.trim(), cta.getAttribute('href'), true));
  out.appendChild(WebImporter.DOMUtils.createTable([['Section Metadata'], ['Style', 'section-centered']], document));
}

// ---- shape-based router ----
function classify(sec, isFirst) {
  if (isFirst && sec.querySelector('h1, h2')) return 'hero';
  if (sec.querySelector('table')) return 'table';
  // FAQ: many h3 or buttons that look like questions
  const qButtons = [...sec.querySelectorAll('button')].filter((b) => /\?$/.test(b.textContent.trim())).length;
  const qHeads = [...sec.querySelectorAll('h3')].filter((b) => /\?$/.test(b.textContent.trim())).length;
  if (qButtons >= 2 || qHeads >= 2) return 'faq';
  const hText = (sec.querySelector('h2')?.textContent || '').toLowerCase().trim();
  const headingSaysTestimonial = /testimonial|customers love|users love|what .* say/.test(hText);
  if (hText === 'testimonials') return 'testimonials';
  const quoteRe = /["“”']/;
  const quoteItems = [...sec.querySelectorAll('article, li, figure, blockquote, [role="tabpanel"]')]
    .filter((q) => quoteRe.test(q.textContent)).length;
  // quote-bearing paragraphs (when there are no article/li wrappers)
  const quoteParas = [...sec.querySelectorAll('p')].filter((p) => /["“”]/.test(p.textContent) && p.textContent.trim().length > 40).length;
  if (quoteItems >= 2 || (headingSaysTestimonial && quoteParas >= 1) || quoteParas >= 3) return 'testimonials';
  if (findCardItems(sec).length >= 2) return 'cards';
  return 'default';
}

export default {
  transform: (payload) => {
    const { document, params } = payload;
    const main = document.body;
    cleanup('beforeTransform', main);

    const sections = collectSections(document);

    const result = document.createElement('div');
    let first = true;
    sections.forEach((sec, idx) => {
      const kind = classify(sec, idx === 0);
      const out = document.createElement('div');
      if (kind === 'hero') buildHero(sec, document, out);
      else if (kind === 'faq') buildAccordion(sec, document, out);
      else if (kind === 'testimonials') buildTestimonials(sec, document, out);
      else if (kind === 'table') buildComparisonTable(sec, document, out);
      else if (kind === 'cards') buildFeatureCards(sec, document, out);
      else buildDefaultCta(sec, document, out);

      if (out.childNodes.length) {
        if (!first) result.appendChild(document.createElement('hr'));
        while (out.firstChild) result.appendChild(out.firstChild);
        first = false;
      }
    });

    result.appendChild(document.createElement('hr'));
    result.appendChild(WebImporter.DOMUtils.createTable([['Metadata'], ['template', 'template-toolkit']], document));

    main.innerHTML = '';
    main.appendChild(result);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, payload.url, params.originalURL);
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index',
    );
    return [{ element: main, path, report: { title: document.title, template: 'toolkit-v2' } }];
  },
};
