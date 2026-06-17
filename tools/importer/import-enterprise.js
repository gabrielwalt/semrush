/* eslint-disable */
/* global WebImporter */

const ORIGIN = 'https://enterprise.semrush.com';

function resolveUrl(src) {
  if (!src || src === 'about:error') return null;
  if (src.startsWith('data:')) return null;
  if (src.startsWith('//')) return 'https:' + src;
  if (src.startsWith('/')) return ORIGIN + src;
  if (src.startsWith('http')) return src;
  return ORIGIN + '/' + src;
}

function createImg(document, src, alt) {
  var url = resolveUrl(src);
  if (!url) return null;
  var pic = document.createElement('picture');
  var img = document.createElement('img');
  img.src = url;
  img.alt = alt || '';
  pic.appendChild(img);
  return pic;
}

function wrapCta(link, document, isSecondary) {
  var p = document.createElement('p');
  var a = document.createElement('a');
  a.href = resolveUrl(link.getAttribute('href')) || link.href;
  a.textContent = link.textContent.trim();
  var wrap = isSecondary ? document.createElement('em') : document.createElement('strong');
  wrap.appendChild(a);
  p.appendChild(wrap);
  return p;
}

// PARSERS

// Published hero copy. The hero is a Builder.io/canvas region whose text is not always
// present in the headless capture, so fall back to the live published strings.
var HERO_FALLBACK = {
  eyebrow: 'Semrush for Enterprise',
  h1: 'Scale your brand visibility, everywhere search happens',
  sub: 'Discovery has changed. Dominate SEO and AI search with the industry’s leading data and decisive automations. Meet your new unfair advantage.',
  ctaText: 'Book a demo',
  ctaHref: ORIGIN + '/demo/',
  // The hero shows an autoplay/loop/muted product video between the CTA and the logo
  // marquee. It's a Builder.io CDN asset with NO file extension, so video-utils.js has a
  // Builder.io-specific detector. The hero is lazy client-rendered, so fall back to the
  // published asset URL when the live capture doesn't include the <video>.
  videoSrc: 'https://cdn.builder.io/o/assets%2Fe84d911e96f94ac7a1e880168d3b5cba%2F4ab951832c0a464092ffc919287efd06?alt=media&token=a62a77ef-83bf-4803-80ff-56669f18abbf&apiKey=e84d911e96f94ac7a1e880168d3b5cba',
};

function heroParser(el, { document }) {
  var wrapper = document.createElement('div');
  var eyebrow = el.querySelector('p');
  var h1 = el.querySelector('h1');
  var desc = el.querySelectorAll('p');
  // Hero CTA points at the in-page form anchor (#cta-form-section), not a /demo URL.
  var cta = el.querySelector('a[href*="demo"]') || el.querySelector('a');

  var ep = document.createElement('p');
  ep.textContent = (eyebrow && eyebrow.textContent.includes('Enterprise'))
    ? eyebrow.textContent.trim() : HERO_FALLBACK.eyebrow;
  wrapper.appendChild(ep);

  var heading = document.createElement('h1');
  heading.textContent = h1 ? h1.textContent.trim() : HERO_FALLBACK.h1;
  wrapper.appendChild(heading);

  // Description paragraph (skip eyebrow)
  var subText = '';
  for (var i = 0; i < desc.length; i++) {
    var text = desc[i].textContent.trim();
    if (text && !text.includes('Enterprise') && text.length > 30) { subText = text; break; }
  }
  var dp = document.createElement('p');
  dp.textContent = subText || HERO_FALLBACK.sub;
  wrapper.appendChild(dp);

  // Hero CTA → the demo page. The source link is an in-page anchor (#cta-form-section),
  // which doesn't resolve in EDS, so point it at the canonical /demo/ URL.
  var cp = document.createElement('p');
  var cstrong = document.createElement('strong');
  var ca = document.createElement('a');
  ca.href = HERO_FALLBACK.ctaHref;
  ca.textContent = cta ? cta.textContent.trim() : HERO_FALLBACK.ctaText;
  cstrong.appendChild(ca);
  cp.appendChild(cstrong);
  wrapper.appendChild(cp);

  // Hero video (autoplay/loop/muted, glass-framed) between the CTA and the marquee.
  // Prefer the live <video> source; fall back to the published Builder.io asset.
  var liveVideo = el.querySelector('video');
  var liveSrc = liveVideo
    && (liveVideo.getAttribute('src')
      || (liveVideo.querySelector('source') && liveVideo.querySelector('source').getAttribute('src')));
  var videoSrc = liveSrc || HERO_FALLBACK.videoSrc;
  // The `media` block reads the URL from the link's textContent (EDS rewrites the href),
  // so put the raw URL as the visible text. See the video-in-eds skill.
  var mediaCell = document.createElement('div');
  var va = document.createElement('a');
  va.href = videoSrc;
  va.textContent = videoSrc;
  mediaCell.appendChild(va);
  wrapper.appendChild(WebImporter.DOMUtils.createTable(
    [['Media'], [mediaCell]], document,
  ));
  return wrapper;
}

function marqueeParser(el, { document }) {
  var logos = el.querySelectorAll('img');
  var seen = {};
  // marquee.js reads the FIRST cell and moves every picture in it into the scroll
  // track. All logos must therefore live in ONE cell, not one row each (one-row-each
  // leaves only the first logo in the decorated track). See blocks/marquee/marquee.js.
  var cell = document.createElement('div');
  for (var i = 0; i < logos.length; i++) {
    var src = logos[i].getAttribute('src');
    var alt = logos[i].getAttribute('alt') || '';
    if (!src || src === 'about:error' || seen[alt]) continue;
    seen[alt] = true;
    var pic = createImg(document, src, alt.replace(' logo', ''));
    if (pic) cell.appendChild(pic);
    if (Object.keys(seen).length >= 7) break;
  }
  var table = WebImporter.DOMUtils.createTable([['Marquee'], [cell]], document);
  return table;
}

function testimonialsCarouselParser(el, { document }) {
  var h2 = el.querySelector('h2');
  var wrapper = document.createElement('div');

  if (h2) {
    var heading = document.createElement('h2');
    heading.textContent = h2.textContent.trim();
    wrapper.appendChild(heading);
  }

  // Reuse the baseline `carousel` block (single horizontal scrolling row), with a
  // `carousel-testimonials` variant for the portrait image-only customer cards. Each card
  // is one row with a single picture cell — matching the default carousel's image-cell.
  var cards = el.querySelectorAll('[role="group"]');
  var rows = [['Carousel (carousel-testimonials)']];
  for (var i = 0; i < cards.length; i++) {
    var img = cards[i].querySelector('img');
    if (!img) continue;
    var src = img.getAttribute('src');
    var alt = img.getAttribute('alt') || '';
    if (!src || src === 'about:error') continue;
    var pic = createImg(document, src, alt);
    if (pic) rows.push([pic]);
  }
  var table = WebImporter.DOMUtils.createTable(rows, document);
  wrapper.appendChild(table);
  return wrapper;
}

// Tabs are modeled as a SECTION STYLE (section-tabs), NOT a block: a block consumes its
// rows as raw cells and EDS never decorates blocks nested inside it, so a tabs *block* could
// not hold real teaser blocks. Instead this emits intro default content + one BARE `teaser`
// block per tab (the panel content); scripts/section-tabs.js builds the tab list from each
// panel's leading heading. addSection(..., 'section-tabs') adds the metadata.
//
// The teasers carry NO dark variant: the page is template-dark, so each bare teaser
// AUTO-INVERTS to the dark look via teaser.css "context-adaptive dark" (see
// eds-content-modeling). Each panel is a 2-column teaser: text cell (h3 label + subtitle
// headline + description + feature list + Explore CTA) and a media cell (illustration).
//
// All six panels are lazy Builder.io content; only the selected tab is in the DOM at import.
// PANEL_FALLBACK holds the published copy + illustration for every tab (harvested by clicking
// through the live tablist), so a re-import reproduces all six fully. When a panel IS present
// in the captured DOM it's preferred; otherwise the fallback fills it in.
var PANEL_FALLBACK = {
  SEO: {
    headline: 'Power your rise up the rankings',
    desc: 'Turn search into your strongest organic growth driver, while productivity skyrockets. Couple the industry’s richest data to customizable reporting and AI-driven automation.',
    feats: ['Search performance and forecasting', 'Market and competitive intelligence', 'Content audits and optimization', 'Automated link building'],
    ctaText: 'Explore SEO', ctaHref: ORIGIN + '/solutions/seo/',
    img: 'https://cdn.builder.io/api/v1/image/assets%2Fe84d911e96f94ac7a1e880168d3b5cba%2F251021dfc0674eb6a06156ef3f71e3db',
    imgAlt: 'Power your rise up the rankings - Product feature illustration',
  },
  'AI Visibility': {
    headline: 'Seize the moment and the AI search future',
    desc: 'Move first and capture new customers. AI Optimization (AIO) tracks every brand mention, source, and competitor, while giving clear optimization actions. Powered by the market’s leading prompt database.',
    feats: ['Brand visibility tracking across AI models', 'Market analysis and competitive benchmarking', 'Content audits and optimization', 'Global coverage with industry-best prompt data'],
    ctaText: 'Explore AIO', ctaHref: ORIGIN + '/solutions/ai-optimization/',
    img: 'https://cdn.builder.io/api/v1/image/assets%2Fe84d911e96f94ac7a1e880168d3b5cba%2Ff6039ebe1c4c42858123fd8128bee55d',
    imgAlt: 'Seize the moment and the AI search future - Product feature illustration',
  },
  'Site Intelligence': {
    headline: 'Find errors, fix, and enhance your website',
    desc: 'Scale growth with a healthy website. Site Intelligence simplifies website performance management, helping teams identify issues, prioritize fixes and optimize in harmony.',
    feats: ['Crawling for up to millions of pages', 'Enriched analyses using market-leading search data', 'Support for search engine and AI bots', 'Audits for accessibility, compliance, and QA'],
    ctaText: 'Explore Site Intelligence', ctaHref: ORIGIN + '/solutions/site-intelligence/',
    img: 'https://cdn.builder.io/api/v1/image/assets%2Fe84d911e96f94ac7a1e880168d3b5cba%2Ffbd66dbf422c45bdb4d2a935c6ad5b6e',
    imgAlt: 'Find errors, fix, and enhance your website - Product feature illustration',
  },
  'Journey Tracking': {
    headline: 'Capture the crowd with panel data',
    desc: 'Outsmart the competition with a detailed view into consumer journeys. Datos delivers powerful, strategy-shaping insights into how people move, compare, and buy.',
    feats: ['See daily privacy-safe panel data for billions of URLs', 'Compare journeys and behavior with competitors', 'Analyze millions of consumer journeys, worldwide'],
    ctaText: 'Explore Datos', ctaHref: ORIGIN + '/solutions/datos/',
    img: 'https://cdn.builder.io/api/v1/image/assets%2Fe84d911e96f94ac7a1e880168d3b5cba%2Fcfc24e7df3534c9399c256496cd6b4b9',
    imgAlt: 'Capture the crowd with panel data - Product feature illustration',
  },
  'Brand Monitoring': {
    headline: 'Know your customer with surveys from the source',
    desc: 'Capture customers’ mindsets with real-time surveys as they’re live and clicking. Shape your messaging and products to exceed expectations, earn their loyalty, and keep them coming back.',
    feats: ['Real-time feedback with flexible triggers', 'Insight into customer intentions, choices, and emotions', 'Data from billions of daily consumer touchpoints'],
    ctaText: 'Explore MFour', ctaHref: ORIGIN + '/solutions/mfour/',
    img: 'https://cdn.builder.io/api/v1/image/assets%2Fe84d911e96f94ac7a1e880168d3b5cba%2F87ac331321a248ccb7316a5b3f294f36',
    imgAlt: 'Know your customer with surveys from the source - Product feature illustration',
  },
  'Social Listening': {
    headline: 'See and shape the narrative in real-time',
    desc: 'Insights24 measures live trends and conversations across digital channels, enabling you to instantly respond and capture more customers with refined messaging and positioning.',
    feats: ['Live monitoring of billions of online conversations', 'Global coverage for over 20 markets', 'Real-time view of markets, competitors, and trends'],
    ctaText: 'Explore Insights24', ctaHref: ORIGIN + '/solutions/insights24/',
    img: 'https://cdn.builder.io/api/v1/image/assets%2Fe84d911e96f94ac7a1e880168d3b5cba%2F6e4a122020a54dff8e35d124c5aac3e5',
    imgAlt: 'See and shape the narrative in real-time - Product feature illustration',
  },
};

function tabsParser(el, { document }) {
  var eyebrow = el.querySelector('.semrush-eyebrow') || el.querySelector('[class*="eyebrow"]');
  var h2 = el.querySelector('h2');
  var tabs = el.querySelectorAll('[role="tab"]');
  var tabpanel = el.querySelector('[role="tabpanel"]');

  var wrapper = document.createElement('div');
  if (eyebrow) {
    var ep = document.createElement('p');
    ep.textContent = eyebrow.textContent.trim();
    wrapper.appendChild(ep);
  }
  if (h2) {
    var heading = document.createElement('h2');
    heading.textContent = h2.textContent.trim();
    wrapper.appendChild(heading);
  }

  // The one panel present in the captured DOM (the selected tab) — preferred over fallback.
  var liveName = tabs.length ? tabs[0].textContent.trim() : null;
  var liveDesc = tabpanel ? tabpanel.querySelector('p') : null;
  var liveFeatures = tabpanel ? tabpanel.querySelectorAll('li') : [];
  var liveLink = tabpanel ? tabpanel.querySelector('a') : null;
  var liveImg = tabpanel ? tabpanel.querySelector('figure img') : null;

  for (var i = 0; i < tabs.length; i++) {
    var tabName = tabs[i].textContent.trim();
    var fb = PANEL_FALLBACK[tabName] || {};
    var useLive = (tabName === liveName) && tabpanel;

    // Text cell: h3 = the tab label (section-tabs.js lifts it into the tab button); then the
    // headline (subtitle), description, feature list, and the Explore CTA.
    var cell = document.createElement('div');
    var h3 = document.createElement('h3');
    h3.textContent = tabName;
    cell.appendChild(h3);

    var headline = fb.headline || '';
    if (headline) {
      var hp = document.createElement('p');
      hp.textContent = headline;
      cell.appendChild(hp);
    }

    var descText = (useLive && liveDesc) ? liveDesc.textContent.trim() : (fb.desc || '');
    if (descText) {
      var pdp = document.createElement('p');
      pdp.textContent = descText;
      cell.appendChild(pdp);
    }

    var feats = (useLive && liveFeatures.length)
      ? Array.prototype.map.call(liveFeatures, function (f) { return f.textContent.trim(); })
      : (fb.feats || []);
    if (feats.length > 0) {
      var ul = document.createElement('ul');
      for (var j = 0; j < feats.length; j++) {
        var li = document.createElement('li');
        li.textContent = feats[j];
        ul.appendChild(li);
      }
      cell.appendChild(ul);
    }

    var ctaText = (useLive && liveLink) ? liveLink.textContent.trim() : (fb.ctaText || '');
    var ctaHref = (useLive && liveLink) ? resolveUrl(liveLink.getAttribute('href')) : (fb.ctaHref || '');
    if (ctaText && ctaHref) {
      var lp = document.createElement('p');
      var la = document.createElement('a');
      la.href = ctaHref;
      la.textContent = ctaText;
      lp.appendChild(la);
      cell.appendChild(lp);
    }

    // Media cell: the panel illustration. Two ROWS so the teaser block renders both
    // columns (a single 2-cell row is not read by the block JS). The MEDIA row is emitted
    // FIRST so teaser.js adds `teaser-media-left` → image on the LEFT, matching the
    // original tab layout (all panels have the illustration on the left).
    var mediaCell = document.createElement('div');
    var imgSrc = (useLive && liveImg) ? liveImg.getAttribute('src') : fb.img;
    var imgAlt = (useLive && liveImg) ? liveImg.getAttribute('alt') : fb.imgAlt;
    if (imgSrc) {
      var pic = createImg(document, imgSrc, imgAlt);
      if (pic) mediaCell.appendChild(pic);
    }

    // Bare teaser (no variant) — auto-inverts on the dark template. Media-row-first.
    var rows = [['Teaser']];
    if (mediaCell.children.length > 0) rows.push([mediaCell]);
    rows.push([cell]);
    var table = WebImporter.DOMUtils.createTable(rows, document);
    wrapper.appendChild(table);
  }

  return wrapper;
}

function platformParser(el, { document }) {
  var eyebrow = el.querySelector('.semrush-eyebrow') || el.querySelector('[class*="eyebrow"]');
  var h2 = el.querySelector('h2');
  var link = el.querySelector('a[href*="discover"]');
  var img = el.querySelector('img[alt*="Connect"]') || el.querySelector('figure img');

  var rows = [['Teaser (teaser-oneoff-enterprise-platform)']];
  var textCell = document.createElement('div');

  // Eyebrow: "MODULAR SOLUTIONS". Client-rendered text node (no .eyebrow class), so fall
  // back to the published label when the class-based lookup misses.
  var ep = document.createElement('p');
  ep.textContent = eyebrow ? eyebrow.textContent.trim() : 'MODULAR SOLUTIONS';
  textCell.appendChild(ep);
  if (h2) {
    var heading = document.createElement('h2');
    heading.textContent = h2.textContent.trim();
    textCell.appendChild(heading);
  }
  if (link) {
    textCell.appendChild(wrapCta(link, document, true));
  }

  var imgCell = document.createElement('div');
  if (img) {
    var pic = createImg(document, img.getAttribute('src'), img.getAttribute('alt'));
    if (pic) imgCell.appendChild(pic);
  }

  // Two distinct rows (content row, then media row) so the teaser block renders both
  // columns; a single row with two cells is not read by the block JS. Text-first =
  // media on the right, matching the enterprise-platform design.
  rows.push([textCell]);
  rows.push([imgCell]);
  var table = WebImporter.DOMUtils.createTable(rows, document);
  return table;
}

function caseStudyParser(el, { document }) {
  var eyebrow = el.querySelector('[class*="eyebrow"]');
  var h2 = el.querySelector('h2');
  var desc = null;
  var paragraphs = el.querySelectorAll('p');
  for (var i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i].textContent.trim().length > 30) {
      desc = paragraphs[i];
      break;
    }
  }

  var wrapper = document.createElement('div');
  // Eyebrow: "Case Studies". It's a client-rendered text node (no .eyebrow class), so fall
  // back to the published label when the class-based lookup misses.
  var ep = document.createElement('p');
  ep.textContent = eyebrow ? eyebrow.textContent.trim() : 'Case Studies';
  wrapper.appendChild(ep);
  if (h2) {
    var heading = document.createElement('h2');
    heading.textContent = h2.textContent.trim();
    wrapper.appendChild(heading);
  }
  if (desc) {
    var dp = document.createElement('p');
    dp.textContent = desc.textContent.trim();
    wrapper.appendChild(dp);
  }

  // Stats cards
  var statGroups = el.querySelectorAll('[class*="flex"][class*="items-center"]');
  var rows = [['Case Study']];

  // Video thumbnail
  var videoArea = el.querySelector('[class*="relative"][class*="rounded"]');
  var videoImg = videoArea ? videoArea.querySelector('img') : null;
  if (videoImg) {
    var vidCell = document.createElement('div');
    var pic = createImg(document, videoImg.getAttribute('src'), videoImg.getAttribute('alt'));
    if (pic) vidCell.appendChild(pic);
    rows.push([vidCell]);
  }

  // Stats
  var statsCell = document.createElement('div');
  var allStats = el.querySelectorAll('p');
  var statPairs = [];
  for (var j = 0; j < allStats.length; j++) {
    var text = allStats[j].textContent.trim();
    if (text.match(/^\d+%?|^\dhrs?/)) {
      statPairs.push({ num: text, label: '' });
    } else if (statPairs.length > 0 && !statPairs[statPairs.length - 1].label && text.length > 3 && text.length < 40) {
      statPairs[statPairs.length - 1].label = text;
    }
  }
  // The source repeats the stat set (carousel duplicate); keep only unique pairs.
  var statSeen = {};
  var uniquePairs = [];
  for (var u = 0; u < statPairs.length; u++) {
    var key = statPairs[u].num + '|' + statPairs[u].label;
    if (statSeen[key]) continue;
    statSeen[key] = true;
    uniquePairs.push(statPairs[u]);
  }
  for (var k = 0; k < uniquePairs.length; k++) {
    var sp = document.createElement('p');
    var sstrong = document.createElement('strong');
    sstrong.textContent = uniquePairs[k].num;
    sp.appendChild(sstrong);
    sp.appendChild(document.createTextNode(' ' + uniquePairs[k].label));
    statsCell.appendChild(sp);
  }
  if (statsCell.children.length > 0) {
    rows.push([statsCell]);
  }

  var table = WebImporter.DOMUtils.createTable(rows, document);
  wrapper.appendChild(table);
  return wrapper;
}

function resourcesParser(headingEl, carouselEl, { document }) {
  // Default content above the block: the "Latest resources" heading + subtitle + View all.
  // The heading region is client-rendered; fall back to published copy when absent.
  var wrapper = document.createElement('div');
  var h2 = headingEl ? headingEl.querySelector('h2') : null;
  var heading = document.createElement('h2');
  heading.textContent = h2 ? h2.textContent.trim() : 'Latest resources';
  wrapper.appendChild(heading);

  // The heading region also contains the carousel, so only inspect nodes that are NOT
  // inside an article card, and reject over-long text (a sign we grabbed card content).
  var subText = '';
  if (headingEl) {
    var subs = headingEl.querySelectorAll('p, div');
    for (var s = 0; s < subs.length; s++) {
      if (subs[s].closest('article')) continue;
      var t = subs[s].textContent.trim();
      if (t && t.length > 20 && t.length < 120
        && t.indexOf('Latest resources') === -1 && t !== 'View all') { subText = t; break; }
    }
  }
  var sp = document.createElement('p');
  sp.textContent = subText || "Discover what's shaping tomorrow's marketing strategies.";
  wrapper.appendChild(sp);

  // "View all" link — must point at the resources index, not a card. Only accept a link
  // outside the article cards.
  var viewAll = null;
  if (headingEl) {
    var links = headingEl.querySelectorAll('a[href*="resources"]');
    for (var v = 0; v < links.length; v++) {
      if (!links[v].closest('article')) { viewAll = links[v]; break; }
    }
  }
  var vp = document.createElement('p');
  var vem = document.createElement('em');
  var va = document.createElement('a');
  va.href = (viewAll && /resources\/?$/.test(viewAll.getAttribute('href') || '')) ? resolveUrl(viewAll.getAttribute('href')) : ORIGIN + '/resources/';
  va.textContent = 'View all';
  vem.appendChild(va);
  vp.appendChild(vem);
  wrapper.appendChild(vp);

  // Carousel block — one row per card: [ image | h3>a + desc + type ], matching the
  // homepage resources `carousel` block shape so it reuses the same styling.
  var rows = [['Carousel']];
  var articles = carouselEl.querySelectorAll('article');
  var seen = {};
  for (var i = 0; i < articles.length; i++) {
    var art = articles[i];
    var link = art.querySelector('a');
    var h3 = art.querySelector('h3');
    var img = art.querySelector('img');
    if (!link || !h3) continue;
    var title = h3.textContent.trim();
    if (seen[title]) continue; // skip the slider's duplicated clones
    seen[title] = true;
    var href = resolveUrl(link.getAttribute('href'));

    // description + type live in sibling divs after the heading
    var desc = '';
    var type = '';
    var divs = art.querySelectorAll('div');
    for (var d = 0; d < divs.length; d++) {
      var dt = divs[d].textContent.trim();
      if (!desc && dt.length > 40 && dt.indexOf(title) === -1) desc = dt;
      if (!type && (dt === 'Article' || dt === 'Whitepaper' || dt === 'Webinar')) type = dt;
    }

    var imgCell = document.createElement('div');
    if (img) {
      var pic = createImg(document, img.getAttribute('src'), '');
      if (pic) imgCell.appendChild(pic);
    }
    var textCell = document.createElement('div');
    var h3el = document.createElement('h3');
    var a = document.createElement('a');
    a.href = href;
    a.textContent = title;
    h3el.appendChild(a);
    textCell.appendChild(h3el);
    if (desc) { var dp = document.createElement('p'); dp.textContent = desc; textCell.appendChild(dp); }
    if (type) { var tp = document.createElement('p'); tp.textContent = type; textCell.appendChild(tp); }
    rows.push([imgCell, textCell]);
  }
  var table = WebImporter.DOMUtils.createTable(rows, document);
  wrapper.appendChild(table);
  return wrapper;
}

function ctaParser(el, { document }) {
  // The closing demo section wraps a lazy-loaded Marketo form. Its heading/intro/eyebrow
  // are client-rendered, so fall back to the published copy when not captured.
  var wrapper = document.createElement('div');
  var h2 = el ? el.querySelector('h2') : null;
  var desc = null;
  var paragraphs = el ? el.querySelectorAll('p') : [];
  for (var i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i].textContent.trim().length > 20) { desc = paragraphs[i]; break; }
  }

  var eyebrow = document.createElement('p');
  eyebrow.textContent = 'Book a Demo';
  wrapper.appendChild(eyebrow);

  var heading = document.createElement('h2');
  heading.textContent = h2 ? h2.textContent.trim() : 'Ready to move first?';
  wrapper.appendChild(heading);

  var dp = document.createElement('p');
  dp.textContent = desc ? desc.textContent.trim()
    : 'The world’s leading brands choose Semrush for Enterprise to stay ahead of shifting markets and technologies.';
  wrapper.appendChild(dp);

  var ctaP = document.createElement('p');
  var ctaStrong = document.createElement('strong');
  var ctaA = document.createElement('a');
  ctaA.href = ORIGIN + '/demo/';
  var ctaSrc = el ? (el.querySelector('a[href*="demo"]') || el.querySelector('button')) : null;
  ctaA.textContent = ctaSrc ? ctaSrc.textContent.trim() : 'Request Demo';
  ctaStrong.appendChild(ctaA);
  ctaP.appendChild(ctaStrong);
  wrapper.appendChild(ctaP);

  return wrapper;
}

// CLEANUP

function cleanup(document) {
  // Remove header, footer, cookie banners, scripts, tracking
  var selectors = [
    'header', '[role="banner"]',
    'footer', '[role="contentinfo"]',
    'script', 'style', 'noscript', 'iframe',
    '[role="dialog"]', '[role="alert"]',
    '[aria-label="Announcement"]',
    '.sticky-header', '[class*="cookie"]',
    'link[rel="preload"]', 'link[rel="prefetch"]',
    'meta[name="viewport"]',
  ];
  for (var i = 0; i < selectors.length; i++) {
    var els = document.querySelectorAll(selectors[i]);
    for (var j = 0; j < els.length; j++) {
      els[j].remove();
    }
  }
  // Tracking pixels (1x1 / analytics / pixel images) — drop with their wrapping <p>.
  var pixels = document.querySelectorAll('img[src*="pixel"], img[src*="analytics"], img[src*="bat.bing"], img[width="1"], img[alt=""][src*="track"]');
  for (var p = 0; p < pixels.length; p++) {
    var par = pixels[p].closest('p') || pixels[p].closest('picture') || pixels[p];
    par.remove();
  }
}

// MAIN

export default {
  transform: function ({ document, url }) {
    cleanup(document);

    var sourceMain = document.querySelector('main') || document.body;

    // Build a FRESH output container in explicit section order. The parsers return their
    // wrapper (they no longer replaceWith in place) — assembling them here, each followed
    // by its own <hr>/Section Metadata, is what produces real top-level sections. (The
    // previous in-place mutation collapsed everything into one giant section.)
    var out = document.createElement('div');

    function sectionBreak() { out.appendChild(document.createElement('hr')); }
    function sectionMeta(style) {
      out.appendChild(WebImporter.DOMUtils.createTable(
        [['Section Metadata'], ['Style', style]], document,
      ));
    }
    function addSection(wrapper, style) {
      if (!wrapper) return;
      out.appendChild(wrapper);
      if (style) sectionMeta(style);
      sectionBreak();
    }

    // Hero — aria-label is "Scale your brand visibility, everywhere search happens"
    // (the previous selector had an extra "up" and never matched, dropping the hero).
    var hero = sourceMain.querySelector('[aria-label="Scale your brand visibility, everywhere search happens"]');
    if (!hero) {
      var h1El = sourceMain.querySelector('h1');
      if (h1El) hero = h1El.closest('section') || h1El.parentElement;
    }
    // Hero is client-rendered; even if the region is missing, emit it from fallback copy.
    addSection(heroParser(hero || document.createElement('div'), { document }), 'section-hero');

    // Helper: locate a region by aria-label, falling back to the heading text (several
    // regions are client-rendered by Builder.io with no stable aria-label). When falling
    // back, climb to an ancestor large enough to also contain the region's body (image
    // cards, stats) which live in siblings outside the heading's immediate wrapper.
    function findRegion(label, headingText, opts) {
      var byLabel = sourceMain.querySelector('[aria-label="' + label + '"]');
      if (byLabel) return byLabel;
      var minDescendants = (opts && opts.minDescendants) || 0;
      var hs = sourceMain.querySelectorAll('h2, h1');
      for (var n = 0; n < hs.length; n++) {
        if (hs[n].textContent.trim().indexOf(headingText) === -1) continue;
        var node = hs[n].closest('section') || hs[n].parentElement;
        // Climb until the container is rich enough to hold the body content.
        while (node && node.parentElement && node !== sourceMain
          && node.querySelectorAll('*').length < minDescendants) {
          node = node.parentElement;
        }
        return node;
      }
      return null;
    }

    var marquee = sourceMain.querySelector('[aria-label="Company logos infinite slider"]');
    if (marquee) addSection(marqueeParser(marquee.closest('section') || marquee, { document }), null);

    var testimonials = findRegion('How leaders get ahead and stay untouchable', 'How leaders get ahead', { minDescendants: 12 });
    if (testimonials) addSection(testimonialsCarouselParser(testimonials, { document }), null);

    var tabs = sourceMain.querySelector('[aria-label="Product overview with tabs"]');
    if (tabs) addSection(tabsParser(tabs, { document }), 'section-tabs');

    var platform = findRegion('Connect marketing data, tools, and teams with one AI-powered platform', 'Connect marketing data', { minDescendants: 6 });
    if (platform) addSection(platformParser(platform, { document }), null);

    var caseStudy = findRegion('Outperform from day one', 'Outperform from day one', { minDescendants: 12 });
    if (caseStudy) addSection(caseStudyParser(caseStudy, { document }), null);

    // Resources — "Latest resources" heading region + the carousel region beside it.
    var resHeading = sourceMain.querySelector('[aria-label="Latest resources"]');
    var resCarousel = sourceMain.querySelector('[aria-label="Resources carousel"]');
    if (resCarousel) addSection(resourcesParser(resHeading, resCarousel, { document }), null);

    // CTA — closing demo section ("Ready to move first?"). The Marketo form is
    // lazy-loaded and not captured; keep the authored heading + intro + CTA.
    var ctaSection = sourceMain.querySelector('section.marketoForm') || sourceMain.querySelector('[aria-label="Ready to move first?"]');
    if (!ctaSection) {
      var h2s = sourceMain.querySelectorAll('h2');
      for (var i = 0; i < h2s.length; i++) {
        if (h2s[i].textContent.includes('Ready to move first')) {
          ctaSection = h2s[i].closest('section') || h2s[i].parentElement;
          break;
        }
      }
    }
    // The final section carries no trailing <hr>; append CTA wrapper + section-dark only.
    out.appendChild(ctaParser(ctaSection, { document }));
    sectionMeta('section-dark');

    // Page template — STACKED: `template-dark` (generic color inversion, any page can use it)
    // + `template-enterprise` (enterprise-specific type/spacing/CTAs). EDS splits the metadata
    // value on commas and applies BOTH as body classes → body.template-dark.template-enterprise.
    // Primary mechanism; scripts.js fallback keys off the enterprise-platform teaser. Emit as
    // its OWN last section.
    sectionBreak();
    var templateSection = document.createElement('div');
    templateSection.appendChild(WebImporter.DOMUtils.createTable(
      [['Metadata'], ['template', 'template-dark, template-enterprise']], document,
    ));
    out.appendChild(templateSection);

    var meta = {};
    var title = document.querySelector('title');
    if (title) meta.Title = title.textContent.trim();

    return [{
      element: out,
      path: '/enterprise/index',
      report: { title: meta.Title || 'Enterprise' },
    }];
  },
};
