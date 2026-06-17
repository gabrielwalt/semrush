/* eslint-disable */
/* global WebImporter */

// =============================================================================
// TOOLKIT TEMPLATE IMPORT — shared by /seo/, /content/, /advertising/,
// /social-media/, /pr-toolkit/, /analytics/traffic/, /local-business/start/,
// /ai-seo/overview/. One generic marker-driven parser; see PROJECT-IMPORT.md.
//
// Source structure: main > .landing > .wrapper > [ .hero, (.projects hidden),
//   .ai-banner, .discoveries, .infographics, .howmany, .faq ]
// =============================================================================

const ORIGIN = 'https://www.semrush.com';

function abs(src) {
  if (!src) return '';
  if (src.startsWith('//')) return `https:${src}`;
  if (src.startsWith('/')) return `${ORIGIN}${src}`;
  return src;
}

function pic(document, src, alt) {
  const picture = document.createElement('picture');
  const img = document.createElement('img');
  img.src = abs(src);
  img.alt = alt || '';
  picture.appendChild(img);
  return picture;
}

// Heavy SVGs can't live in the document — DA/html2md rejects oversized images during
// validation. The big SEO feature screenshots are committed to the repo under /svg/ and
// referenced from content with a plain link that scripts.js (decorateSvgReferences) expands
// into an <img> at render time. Map a known source filename stem to its /svg/ link.
// Returns an <a> reference when the src is a known repo SVG, else null.
const SVG_REF_NAMES = ['competitors', 'backlinks', 'audit', 'content', 'positions', 'health'];
function svgRef(document, src, alt) {
  const m = (src || '').match(/\/img\/([a-z0-9]+)\./i);
  if (!m || !SVG_REF_NAMES.includes(m[1])) return null;
  const a = document.createElement('a');
  a.href = `/svg/seo-${m[1]}.svg`;
  a.textContent = alt && alt !== 'icon' && alt !== 'card' ? alt : m[1];
  return a;
}

function ctaPara(document, text, href, primary) {
  const p = document.createElement('p');
  const wrap = document.createElement(primary ? 'strong' : 'em');
  const a = document.createElement('a');
  a.href = abs(href || '#');
  a.textContent = text;
  wrap.appendChild(a);
  p.appendChild(wrap);
  return p;
}

// ---- CLEANUP ----------------------------------------------------------------
function cleanupTransformer(hookName, element) {
  if (hookName !== 'beforeTransform') return;
  element.querySelectorAll('script, style, noscript, iframe, link[rel="stylesheet"]').forEach((el) => el.remove());
  element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach((el) => el.remove());
  element.querySelectorAll('header, footer, nav, [class*="srf-header"], [class*="srf-footer"], [class*="snav-"]').forEach((el) => el.remove());
  element.querySelectorAll('[aria-hidden="true"].mp-visually-hidden, .visually-hidden').forEach((el) => el.remove());
  element.querySelectorAll('[class*="outdated"], [class*="skip-to"]').forEach((el) => el.remove());
  // Hidden / logged-in-only sections are not part of the marketing page
  element.querySelectorAll('.projects.hidden, section.hidden').forEach((el) => el.remove());
}

// ---- SECTION PARSERS --------------------------------------------------------

// HERO: h1 + subtitle (default content) → insights-widget placeholder → marquee (logos)
function parseHero(section, document) {
  const out = document.createElement('div');

  const h1 = section.querySelector('h1');
  if (h1) { const h = document.createElement('h1'); h.textContent = h1.textContent.trim(); out.appendChild(h); }
  const sub = [...section.querySelectorAll('p')].find((p) => p.textContent.trim().length > 30);
  if (sub) { const p = document.createElement('p'); p.textContent = sub.textContent.trim(); out.appendChild(p); }

  // insights-widget placeholder — author controls only the CTA label + input placeholder
  const input = section.querySelector('input');
  const btn = section.querySelector('button');
  const widget = document.createElement('div');
  const wInner = document.createElement('div');
  const wp1 = document.createElement('p'); wp1.textContent = (input && input.getAttribute('placeholder')) || 'Enter domain';
  const wp2 = document.createElement('p'); wp2.textContent = (btn && btn.textContent.trim()) || 'Get started';
  wInner.append(wp1, wp2);
  widget.appendChild(wInner);
  out.appendChild(WebImporter.DOMUtils.createTable([['Insights Widget'], [widget]], document));

  // Hero section closes with its own Section Metadata (last element in the section).
  out.appendChild(WebImporter.DOMUtils.createTable([['Section Metadata'], ['Style', 'section-centered']], document));

  // logos → marquee — MUST be its own section (one Section Metadata per section).
  const logos = [...section.querySelectorAll('img')].filter((i) => i.alt && i.getAttribute('src'));
  if (logos.length) {
    out.appendChild(document.createElement('hr'));
    const strip = document.createElement('div');
    logos.forEach((img) => { const p = document.createElement('p'); p.appendChild(pic(document, img.getAttribute('src'), img.alt)); strip.appendChild(p); });
    out.appendChild(WebImporter.DOMUtils.createTable([['Marquee'], [strip]], document));
    out.appendChild(WebImporter.DOMUtils.createTable([['Section Metadata'], ['Style', 'section-flush']], document));
  }

  return out;
}

// AI-BANNER: value prop → teaser (heading + list + CTA), dark section
function parseValueProp(section, document) {
  const out = document.createElement('div');
  const cell = document.createElement('div');
  const h = section.querySelector('h2, h3');
  if (h) { const el = document.createElement('h2'); el.textContent = h.textContent.trim(); cell.appendChild(el); }
  const sub = [...section.querySelectorAll('p, div')].map((d) => d.childNodes.length === 1 ? d.textContent.trim() : '').find((t) => t.length > 30);
  if (sub) { const p = document.createElement('p'); p.textContent = sub; cell.appendChild(p); }
  const li = [...section.querySelectorAll('li')];
  if (li.length) { const ul = document.createElement('ul'); li.forEach((x) => { const item = document.createElement('li'); item.textContent = x.textContent.trim(); ul.appendChild(item); }); cell.appendChild(ul); }
  const cta = section.querySelector('button, a');
  if (cta) cell.appendChild(ctaPara(document, cta.textContent.trim(), cta.getAttribute('href'), false));

  // Bare teaser (no variant): it sits in a section-dark section, so it auto-inverts to the
  // dark look via teaser.css "context-adaptive dark" — no teaser-dark variant needed.
  out.appendChild(WebImporter.DOMUtils.createTable([['Teaser'], [cell]], document));
  out.appendChild(WebImporter.DOMUtils.createTable([['Section Metadata'], ['Style', 'section-dark']], document));
  return out;
}

// DISCOVERIES: 3-step cards → cards-icon (img + title + desc)
function parseSteps(section, document) {
  const out = document.createElement('div');
  const h = section.querySelector('h2, h3');
  if (h) { const el = document.createElement('h2'); el.textContent = h.textContent.trim(); out.appendChild(el); }
  const items = [...section.querySelectorAll('.discovery, [class*="discovery"]')].filter((el) => el.querySelector('[class*="__title"], [class*="title"]'));
  const rows = [['Cards Icon']];
  items.forEach((it) => {
    const cell = document.createElement('div');
    const img = it.querySelector('img');
    if (img) cell.appendChild(pic(document, img.getAttribute('src'), img.alt));
    const title = it.querySelector('[class*="title"]');
    const desc = it.querySelector('[class*="description"]');
    if (title) { const t = document.createElement('p'); const s = document.createElement('strong'); s.textContent = title.textContent.trim(); t.appendChild(s); cell.appendChild(t); }
    if (desc) { const d = document.createElement('p'); d.textContent = desc.textContent.trim(); cell.appendChild(d); }
    rows.push([cell]);
  });
  if (rows.length > 1) out.appendChild(WebImporter.DOMUtils.createTable(rows, document));
  return out;
}

// INFOGRAPHICS: feature rows → cards-icon (cards-icon-feature variant — these carry a
// full product SCREENSHOT, not a small icon, so the variant shows the image full-width).
function parseFeatures(section, document) {
  const out = document.createElement('div');
  const list = section.querySelector('.infographics__list') || section;
  const items = [...list.children].filter((c) => c.querySelector('h2, h3, a'));
  const rows = [['Cards Icon (cards-icon-feature)']];
  items.forEach((it) => {
    const cell = document.createElement('div');
    const img = it.querySelector('img');
    if (img) {
      const src = img.getAttribute('src');
      // Heavy feature SVGs → /svg/ link reference; everything else stays an embedded image.
      cell.appendChild(svgRef(document, src, img.alt) || pic(document, src, img.alt));
    }
    const h = it.querySelector('h2, h3');
    if (h) { const el = document.createElement('p'); const s = document.createElement('strong'); s.textContent = h.textContent.trim(); el.appendChild(s); cell.appendChild(el); }
    const desc = [...it.querySelectorAll('p, div')].map((d) => d.childNodes.length === 1 ? d.textContent.trim() : '').find((t) => t.length > 25);
    if (desc) { const d = document.createElement('p'); d.textContent = desc; cell.appendChild(d); }
    const a = it.querySelector('a');
    if (a) cell.appendChild(ctaPara(document, a.textContent.trim(), a.getAttribute('href'), false));
    rows.push([cell]);
  });
  if (rows.length > 1) out.appendChild(WebImporter.DOMUtils.createTable(rows, document));
  return out;
}

// HOWMANY: stats CTA → heading + insights-widget placeholder + stats-facts
function parseStatsCta(section, document) {
  const out = document.createElement('div');
  const h = section.querySelector('h2, h3');
  if (h) { const el = document.createElement('h2'); el.textContent = h.textContent.trim(); out.appendChild(el); }

  const input = section.querySelector('input');
  const btn = section.querySelector('button');
  const widget = document.createElement('div'); const wi = document.createElement('div');
  const wp1 = document.createElement('p'); wp1.textContent = (input && input.getAttribute('placeholder')) || 'Enter domain';
  const wp2 = document.createElement('p'); wp2.textContent = (btn && btn.textContent.trim()) || 'Get started';
  wi.append(wp1, wp2); widget.appendChild(wi);
  out.appendChild(WebImporter.DOMUtils.createTable([['Insights Widget'], [widget]], document));

  // stat pairs → Columns Stats (one row, N cells: h3 number + p label).
  // Use only the column wrapper to avoid duplicates; dedupe by number text.
  const statCols = [...section.querySelectorAll('[class*="advantages__column"]')]
    .filter((el) => el.querySelector('[class*="advantages__title"]'));
  const seen = new Set();
  const cells = [];
  statCols.forEach((it) => {
    const num = it.querySelector('[class*="advantages__title"]');
    const label = it.querySelector('[class*="advantages__description"]');
    if (!num) return;
    const key = num.textContent.trim();
    if (seen.has(key)) return;
    seen.add(key);
    const cell = document.createElement('div');
    const h3 = document.createElement('h3'); h3.textContent = key; cell.appendChild(h3);
    if (label) { const lp = document.createElement('p'); lp.textContent = label.textContent.trim(); cell.appendChild(lp); }
    cells.push(cell);
  });
  if (cells.length) out.appendChild(WebImporter.DOMUtils.createTable([['Columns Stats'], cells], document));
  return out;
}

// FAQ: accordion (button = question, .accordion__content = answer)
function parseFaq(section, document) {
  const out = document.createElement('div');
  const h = section.querySelector('h2, h3');
  if (h) { const el = document.createElement('h2'); el.textContent = h.textContent.trim(); out.appendChild(el); }
  const triggers = [...section.querySelectorAll('button')];
  const rows = [['Accordion']];
  triggers.forEach((btn) => {
    const q = document.createElement('div');
    const qp = document.createElement('p'); qp.textContent = btn.textContent.trim(); q.appendChild(qp);
    const ans = btn.nextElementSibling || btn.parentElement.querySelector('[class*="content"], [class*="answer"]');
    const a = document.createElement('div');
    if (ans) { [...ans.children].forEach((c) => a.appendChild(c.cloneNode(true))); if (!a.children.length) { const ap = document.createElement('p'); ap.textContent = ans.textContent.trim(); a.appendChild(ap); } }
    rows.push([q, a]);
  });
  if (rows.length > 1) out.appendChild(WebImporter.DOMUtils.createTable(rows, document));
  return out;
}

// ---- SECTION ROUTING (markers) ----------------------------------------------
const SECTION_RULES = [
  { match: (el) => el.classList.contains('hero') || /\bhero\b/.test(el.className), parse: parseHero },
  { match: (el) => /ai-banner|js-aiBanner/.test(el.className), parse: parseValueProp },
  { match: (el) => /discoveries/.test(el.className), parse: parseSteps },
  { match: (el) => /infographics/.test(el.className), parse: parseFeatures },
  { match: (el) => /howmany/.test(el.className), parse: parseStatsCta },
  { match: (el) => /\bfaq\b/.test(el.className), parse: parseFaq },
];

export default {
  transform: (payload) => {
    const { document, params } = payload;
    const main = document.body;
    cleanupTransformer('beforeTransform', main);

    const wrapper = document.querySelector('.landing .wrapper') || document.querySelector('main') || main;
    const result = document.createElement('div');
    const HR = () => result.appendChild(document.createElement('hr'));

    let first = true;
    [...wrapper.children].forEach((section) => {
      const rule = SECTION_RULES.find((r) => { try { return r.match(section); } catch (e) { return false; } });
      if (!rule) return;
      const built = rule.parse(section, document);
      if (built && built.childNodes.length) {
        if (!first) HR();
        while (built.firstChild) result.appendChild(built.firstChild);
        first = false;
      }
    });

    // Page template (cascade level 1) — own section so EDS treats it as page metadata
    result.appendChild(document.createElement('hr'));
    result.appendChild(WebImporter.DOMUtils.createTable(
      [['Metadata'], ['template', 'template-toolkit']], document,
    ));

    main.innerHTML = '';
    main.appendChild(result);

    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, payload.url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index',
    );
    return [{ element: main, path, report: { title: document.title, template: 'toolkit' } }];
  },
};
