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

function heroParser(el, { document }) {
  var wrapper = document.createElement('div');
  var eyebrow = el.querySelector('p');
  var h1 = el.querySelector('h1');
  var desc = el.querySelectorAll('p');
  var cta = el.querySelector('a[href*="demo"]');

  if (eyebrow && eyebrow.textContent.includes('Enterprise')) {
    var ep = document.createElement('p');
    ep.textContent = eyebrow.textContent.trim();
    wrapper.appendChild(ep);
  }
  if (h1) {
    var heading = document.createElement('h1');
    heading.textContent = h1.textContent.trim();
    wrapper.appendChild(heading);
  }
  // Description paragraph (skip eyebrow)
  for (var i = 0; i < desc.length; i++) {
    var text = desc[i].textContent.trim();
    if (text && !text.includes('Enterprise') && text.length > 30) {
      var dp = document.createElement('p');
      dp.textContent = text;
      wrapper.appendChild(dp);
      break;
    }
  }
  if (cta) {
    wrapper.appendChild(wrapCta(cta, document));
  }
  el.replaceWith(wrapper);
}

function marqueeParser(el, { document }) {
  var logos = el.querySelectorAll('img');
  var seen = {};
  var rows = [['Marquee']];
  for (var i = 0; i < logos.length; i++) {
    var src = logos[i].getAttribute('src');
    var alt = logos[i].getAttribute('alt') || '';
    if (!src || src === 'about:error' || seen[alt]) continue;
    seen[alt] = true;
    var pic = createImg(document, src, alt.replace(' logo', ''));
    if (pic) rows.push([pic]);
    if (Object.keys(seen).length >= 7) break;
  }
  var table = WebImporter.DOMUtils.createTable(rows, document);
  el.replaceWith(table);
}

function testimonialsCarouselParser(el, { document }) {
  var h2 = el.querySelector('h2');
  var wrapper = document.createElement('div');

  if (h2) {
    var heading = document.createElement('h2');
    heading.textContent = h2.textContent.trim();
    wrapper.appendChild(heading);
  }

  var cards = el.querySelectorAll('[role="group"]');
  var rows = [['Testimonials Carousel']];
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
  el.replaceWith(wrapper);
}

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

  // Build tabs block - each tab is a row with: tab name | content
  var rows = [['Tabs']];
  for (var i = 0; i < tabs.length; i++) {
    var tabName = tabs[i].textContent.trim();
    var tabTitle = tabs[i].getAttribute('aria-label') || tabName;
    // Extract the subtitle from aria-label (e.g. "SEO: Power your rise up the rankings")
    var subtitle = tabTitle.includes(':') ? tabTitle.split(':').slice(1).join(':').trim() : '';

    var cell = document.createElement('div');
    var h3 = document.createElement('h3');
    h3.textContent = tabName;
    cell.appendChild(h3);
    if (subtitle) {
      var sp = document.createElement('p');
      sp.textContent = subtitle;
      cell.appendChild(sp);
    }
    rows.push([cell]);
  }

  // Also extract the visible tab panel content for the first tab
  if (tabpanel) {
    var panelH3 = tabpanel.querySelector('h3');
    var panelDesc = tabpanel.querySelector('p');
    var panelFeatures = tabpanel.querySelectorAll('li');
    var panelLink = tabpanel.querySelector('a');
    var panelImg = tabpanel.querySelector('img');

    // Update the first row's cell with full content
    if (rows.length > 1 && panelH3) {
      var firstCell = rows[1][0];
      if (typeof firstCell === 'object' && firstCell.nodeType) {
        if (panelDesc) {
          var pdp = document.createElement('p');
          pdp.textContent = panelDesc.textContent.trim();
          firstCell.appendChild(pdp);
        }
        if (panelFeatures.length > 0) {
          var ul = document.createElement('ul');
          for (var j = 0; j < panelFeatures.length; j++) {
            var li = document.createElement('li');
            li.textContent = panelFeatures[j].textContent.trim();
            ul.appendChild(li);
          }
          firstCell.appendChild(ul);
        }
        if (panelLink) {
          var lp = document.createElement('p');
          var la = document.createElement('a');
          la.href = resolveUrl(panelLink.getAttribute('href'));
          la.textContent = panelLink.textContent.trim();
          lp.appendChild(la);
          firstCell.appendChild(lp);
        }
      }
    }
  }

  var table = WebImporter.DOMUtils.createTable(rows, document);
  wrapper.appendChild(table);
  el.replaceWith(wrapper);
}

function platformParser(el, { document }) {
  var eyebrow = el.querySelector('.semrush-eyebrow') || el.querySelector('[class*="eyebrow"]');
  var h2 = el.querySelector('h2');
  var link = el.querySelector('a[href*="discover"]');
  var img = el.querySelector('img[alt*="Connect"]') || el.querySelector('figure img');

  var rows = [['Video Card (enterprise-platform)']];
  var textCell = document.createElement('div');

  if (eyebrow) {
    var ep = document.createElement('p');
    ep.textContent = eyebrow.textContent.trim();
    textCell.appendChild(ep);
  }
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

  rows.push([textCell, imgCell]);
  var table = WebImporter.DOMUtils.createTable(rows, document);
  el.replaceWith(table);
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
  for (var k = 0; k < statPairs.length; k++) {
    var sp = document.createElement('p');
    var sstrong = document.createElement('strong');
    sstrong.textContent = statPairs[k].num;
    sp.appendChild(sstrong);
    sp.appendChild(document.createTextNode(' ' + statPairs[k].label));
    statsCell.appendChild(sp);
  }
  if (statsCell.children.length > 0) {
    rows.push([statsCell]);
  }

  var table = WebImporter.DOMUtils.createTable(rows, document);
  wrapper.appendChild(table);
  el.replaceWith(wrapper);
}

function ctaParser(el, { document }) {
  var wrapper = document.createElement('div');
  var h2 = el.querySelector('h2');
  var desc = null;
  var paragraphs = el.querySelectorAll('p');
  for (var i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i].textContent.trim().length > 20) {
      desc = paragraphs[i];
      break;
    }
  }

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
  // CTA
  var cta = el.querySelector('a[href*="demo"]') || el.querySelector('button');
  if (cta && cta.tagName === 'A') {
    wrapper.appendChild(wrapCta(cta, document));
  } else if (cta) {
    var cp = document.createElement('p');
    var ca = document.createElement('a');
    ca.href = ORIGIN + '/demo/';
    ca.textContent = cta.textContent.trim();
    var cs = document.createElement('strong');
    cs.appendChild(ca);
    cp.appendChild(cs);
    wrapper.appendChild(cp);
  }

  el.replaceWith(wrapper);
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
}

// MAIN

export default {
  transform: function ({ document, url }) {
    cleanup(document);

    var main = document.querySelector('main') || document.body;

    // Parse each section by aria-label
    var hero = main.querySelector('[aria-label="Scale up your brand visibility, everywhere search happens"]');
    if (hero) heroParser(hero, { document });

    var marquee = main.querySelector('[aria-label="Company logos infinite slider"]');
    if (marquee) marqueeParser(marquee.closest('section') || marquee, { document });

    var testimonials = main.querySelector('[aria-label="How leaders get ahead and stay untouchable"]');
    if (testimonials) testimonialsCarouselParser(testimonials, { document });

    var tabs = main.querySelector('[aria-label="Product overview with tabs"]');
    if (tabs) tabsParser(tabs, { document });

    var platform = main.querySelector('[aria-label="Connect marketing data, tools, and teams with one AI-powered platform"]');
    if (platform) platformParser(platform, { document });

    var caseStudy = main.querySelector('[aria-label="Outperform from day one"]');
    if (caseStudy) caseStudyParser(caseStudy, { document });

    // CTA — find the marketo form section
    var ctaSection = main.querySelector('section.marketoForm') || main.querySelector('[aria-label="Ready to move first?"]');
    if (!ctaSection) {
      // Fallback: find section containing "Ready to move first?"
      var h2s = main.querySelectorAll('h2');
      for (var i = 0; i < h2s.length; i++) {
        if (h2s[i].textContent.includes('Ready to move first')) {
          ctaSection = h2s[i].closest('section');
          break;
        }
      }
    }
    if (ctaSection) ctaParser(ctaSection, { document });

    // Metadata
    var meta = {};
    meta.Template = 'enterprise';
    var title = document.querySelector('title');
    if (title) meta.Title = title.textContent.trim();
    var desc = document.querySelector('meta[name="description"]');
    if (desc) meta.Description = desc.getAttribute('content');

    return [{
      element: main,
      path: '/enterprise/index',
      report: { title: meta.Title || 'Enterprise' },
    }];
  },
};
