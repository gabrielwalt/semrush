/* eslint-disable */
/* global WebImporter */

// HELPERS

function absUrl(src) {
  if (!src || src === 'about:error') return '';
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

// Heavy SVGs (the graph illustrations) can't live in the document — DA/html2md rejects
// oversized images during validation. They're committed to the code repo under /svg/ and
// referenced from content with a plain link; scripts.js (decorateSvgReferences) expands the
// link into an <img> at render time. Map the source graph-N_en.* file to its /svg/ link.
// Returns a <p><a> reference when the src is a known repo SVG, else null.
function svgRef(src, alt, document) {
  var m = (src || '').match(/graph-(\d)_en/);
  if (!m) return null;
  var p = document.createElement('p');
  var a = document.createElement('a');
  a.href = '/svg/graph-' + m[1] + '.svg';
  a.textContent = alt && alt !== 'icon' && alt !== 'card' ? alt : 'graph ' + m[1];
  p.appendChild(a);
  return p;
}

function wrapCta(link, document) {
  var p = document.createElement('p');
  var a = document.createElement('a');
  a.href = link.href || link.getAttribute('href') || '';
  a.textContent = link.textContent.trim();
  var strong = document.createElement('strong');
  strong.appendChild(a);
  p.appendChild(strong);
  return p;
}

// PARSERS

function heroParser(element, { document }) {
  var wrapper = document.createElement('div');

  // H1 + subtitle + CTA + under-button text
  var h1 = element.querySelector('h1');
  var subtitle = element.querySelector('.subtitle');
  var ctaLink = element.querySelector('a.button');
  var underButton = element.querySelector('.under-button');

  if (h1) {
    var heading = document.createElement('h1');
    heading.textContent = h1.textContent.trim();
    wrapper.appendChild(heading);
  }
  if (subtitle) {
    var p = document.createElement('p');
    p.textContent = subtitle.textContent.trim();
    wrapper.appendChild(p);
  }
  if (ctaLink) wrapper.appendChild(wrapCta(ctaLink, document));
  if (underButton) {
    var up = document.createElement('p');
    up.textContent = underButton.textContent.trim();
    wrapper.appendChild(up);
  }

  // Video sources
  var video = element.querySelector('video');
  var mediaCell = document.createElement('div');
  if (video) {
    var sources = video.querySelectorAll('source');
    sources.forEach(function(source) {
      var src = source.getAttribute('src') || '';
      if (src) {
        var vp = document.createElement('p');
        var va = document.createElement('a');
        va.href = absUrl(src);
        va.textContent = absUrl(src);
        vp.appendChild(va);
        mediaCell.appendChild(vp);
      }
    });
  }

  var rows = [['Teaser (teaser-oneoff-semrush-one)'], [wrapper]];
  if (mediaCell.children.length > 0) rows.push([mediaCell]);
  var table = WebImporter.DOMUtils.createTable(rows, document);
  element.querySelector('.main-screen__content').replaceWith(table);

  // Default content below the block: badge image + h4 + paragraph
  var oneSection = element.querySelector('.main-screen__one');
  if (oneSection) {
    var dcWrapper = document.createElement('div');
    var badgeImg = oneSection.querySelector('img');
    if (badgeImg) dcWrapper.appendChild(wrapImg(badgeImg.getAttribute('src'), badgeImg.alt, document));
    var h4 = oneSection.querySelector('h4');
    if (h4) {
      var h4El = document.createElement('h4');
      h4El.textContent = h4.textContent.trim();
      dcWrapper.appendChild(h4El);
    }
    var descP = oneSection.querySelector('p');
    if (descP) {
      var dp = document.createElement('p');
      dp.textContent = descP.textContent.trim();
      dcWrapper.appendChild(dp);
    }
    oneSection.replaceWith(dcWrapper);
  }
}

function featureCardsParser(element, { document }) {
  var textDiv = element.querySelector('.cards__item--text');
  var graphDiv = element.querySelector('.cards__item--graph');
  if (!textDiv) return;

  var textCell = document.createElement('div');
  var icon = textDiv.querySelector('img.icon');
  if (icon) textCell.appendChild(wrapImg(icon.getAttribute('src'), icon.alt, document));
  var h3 = textDiv.querySelector('h3');
  if (h3) {
    var heading = document.createElement('h3');
    heading.textContent = h3.textContent.trim();
    textCell.appendChild(heading);
  }
  var desc = textDiv.querySelector('p:not(.subtitle)');
  if (desc) {
    var p = document.createElement('p');
    p.textContent = desc.textContent.trim();
    textCell.appendChild(p);
  }

  var imgCell = document.createElement('div');
  var graphImg = graphDiv ? graphDiv.querySelector('img') : null;
  if (graphImg) {
    var gSrc = graphImg.getAttribute('src');
    // Graphs are heavy SVGs: emit a /svg/ link reference instead of an embedded image.
    imgCell.appendChild(svgRef(gSrc, graphImg.alt, document)
      || wrapImg(gSrc, graphImg.alt, document));
  }

  // Media side follows authored order: source `.reverse` cards show media on the LEFT,
  // expressed by emitting the media row BEFORE the text row (block JS → teaser-media-left).
  var mediaLeft = element.classList.contains('reverse');
  var rows = mediaLeft
    ? [['Teaser'], [imgCell], [textCell]]
    : [['Teaser'], [textCell], [imgCell]];
  var table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

function statsColumnsParser(element, { document }) {
  var items = element.querySelectorAll('.numbers__wrapper--item');
  var rows = [['Columns Stats']];
  var cells = [];
  items.forEach(function(item) {
    var num = item.querySelector('h3');
    var text = item.querySelector('p');
    var cell = document.createElement('div');
    if (num) {
      var h3 = document.createElement('h3');
      h3.textContent = num.textContent.trim();
      cell.appendChild(h3);
    }
    if (text) {
      var p = document.createElement('p');
      p.textContent = text.textContent.trim();
      cell.appendChild(p);
    }
    cells.push(cell);
  });
  if (cells.length > 0) rows.push(cells);
  var table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

function iconsGridParser(element, { document }) {
  var items = element.querySelectorAll('.icons__wrapper--item');
  var rows = [['Cards Icon']];
  items.forEach(function(item) {
    var icon = item.querySelector('img.icon');
    var subtitle = item.querySelector('.subtitle');
    var desc = item.querySelector('.item-text p:not(.subtitle)');
    var cell = document.createElement('div');
    if (icon) cell.appendChild(wrapImg(icon.getAttribute('src'), icon.alt, document));
    if (subtitle) {
      var strong = document.createElement('p');
      var b = document.createElement('strong');
      b.textContent = subtitle.textContent.trim();
      strong.appendChild(b);
      cell.appendChild(strong);
    }
    if (desc) {
      var p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      cell.appendChild(p);
    }
    rows.push([cell]);
  });
  var table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

function testimonialsParser(element, { document }) {
  var wrapper = document.createElement('div');

  // Stat card
  var statNum = element.querySelector('.icons__testimonial--number h5');
  var statText = element.querySelector('.icons__testimonial--number p');

  // Quote
  var logoImg = element.querySelector('.icons__testimonial--testimonial-logo img');
  var quoteText = element.querySelector('.testimonial-text span');
  var authorImg = element.querySelector('.testimonial-photo');
  var authorName = element.querySelector('.testimonial-info .name');
  var authorRole = element.querySelector('.testimonial-info .position');

  var rows = [['Testimonials (testimonials-oneoff-one)']];

  var quoteCell = document.createElement('div');
  // Brand logo first (block JS reads it from the quote cell's picture), then the quote.
  if (logoImg) {
    quoteCell.appendChild(wrapImg(logoImg.getAttribute('src'), logoImg.getAttribute('alt') || '', document));
  }
  if (quoteText) {
    var bq = document.createElement('blockquote');
    bq.textContent = quoteText.textContent.trim();
    quoteCell.appendChild(bq);
  }
  rows.push([quoteCell]);

  var authorCell = document.createElement('div');
  if (authorImg) {
    var pic = document.createElement('picture');
    var img = document.createElement('img');
    img.src = absUrl(authorImg.getAttribute('src'));
    img.alt = authorName ? authorName.textContent.trim() : '';
    pic.appendChild(img);
    authorCell.appendChild(pic);
  }
  if (authorName) {
    var pn = document.createElement('p');
    var strong = document.createElement('strong');
    strong.textContent = authorName.textContent.trim();
    pn.appendChild(strong);
    authorCell.appendChild(pn);
  }
  if (authorRole) {
    var pr = document.createElement('p');
    pr.textContent = authorRole.textContent.trim();
    authorCell.appendChild(pr);
  }
  rows.push([authorCell]);

  if (statNum || statText) {
    var statCell = document.createElement('div');
    if (statNum) {
      var ps = document.createElement('p');
      ps.textContent = statNum.textContent.trim();
      statCell.appendChild(ps);
    }
    if (statText) {
      var pt = document.createElement('p');
      pt.textContent = statText.textContent.trim();
      statCell.appendChild(pt);
    }
    rows.push([statCell]);
  }

  var table = WebImporter.DOMUtils.createTable(rows, document);
  wrapper.appendChild(table);
  element.replaceWith(wrapper);
}

function awardsParser(element, { document }) {
  // Only use the desktop awards (not .mobile-awards)
  var desktopWrapper = element.querySelector('.awards__wrapper:not(.mobile-awards)');
  if (!desktopWrapper) desktopWrapper = element.querySelector('.awards__wrapper');
  var items = desktopWrapper ? desktopWrapper.querySelectorAll('.awards__wrapper--award') : [];

  var rows = [['Cards Awards']];
  items.forEach(function(item) {
    var img = item.querySelector('img');
    var text = item.querySelector('.awards__wrapper--award-text');
    var cell = document.createElement('div');
    if (img) {
      var src = img.getAttribute('src') || '';
      // Skip base64 SVG badges — they won't survive the pipeline
      if (src && !src.startsWith('data:')) {
        cell.appendChild(wrapImg(src, text ? text.textContent.trim() : '', document));
      }
    }
    if (text) {
      var p = document.createElement('p');
      p.textContent = text.textContent.trim().replace(/\n/g, ' ');
      cell.appendChild(p);
    }
    rows.push([cell]);
  });
  var table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

function ctaParser(element, { document }) {
  var wrapper = document.createElement('div');
  var h2 = element.querySelector('h2');
  if (h2) {
    var heading = document.createElement('h2');
    heading.textContent = h2.textContent.trim();
    wrapper.appendChild(heading);
  }
  var ctaLink = element.querySelector('a.button');
  if (ctaLink) wrapper.appendChild(wrapCta(ctaLink, document));
  element.replaceWith(wrapper);
}

// CLEANUP TRANSFORMER
function cleanupTransformer(hookName, element, payload) {
  if (hookName !== 'beforeTransform') return;
  var document = payload.document;

  element.querySelectorAll('script, style, noscript, iframe, link[rel="stylesheet"]').forEach(function(el) { el.remove(); });
  element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach(function(el) { el.remove(); });
  element.querySelectorAll('header, footer, nav, srf-header-menu, srf-header-dropdown-items, [class*="srf-header"], [class*="srf-footer"], [class*="srf-layout__footer"], [class*="srf-layout__header"]').forEach(function(el) { el.remove(); });
  element.querySelectorAll('.sticky-header, [class*="sticky-header"]').forEach(function(el) { el.remove(); });
  element.querySelectorAll('[aria-hidden="true"]').forEach(function(el) { el.remove(); });
  element.querySelectorAll('[class*="outdated"], [class*="skip-to"]').forEach(function(el) { el.remove(); });
  element.querySelectorAll('.pin-spacer').forEach(function(el) {
    // Unwrap pin-spacer divs (GSAP scroll-trigger wrappers)
    while (el.firstChild) el.parentNode.insertBefore(el.firstChild, el);
    el.remove();
  });
  // Remove duplicate mobile awards
  element.querySelectorAll('.mobile-awards').forEach(function(el) { el.remove(); });
  // Drop the decorative comb-fade gradient image (.gradient / img[src*="gradient"]) — it is
  // page chrome, reconstructed in CSS via /icons/one-gradient-fade.png, not authored content.
  element.querySelectorAll('.gradient, img[src*="/gradient."], img[alt="gradient" i]').forEach(function(el) {
    var parent = el.closest('.gradient') || el.closest('p') || el;
    parent.remove();
  });
  // Remove tracking pixels
  element.querySelectorAll('img[src*="analytics"], img[src*="bat.bing"], img[src*="pixel"]').forEach(function(el) {
    var parent = el.closest('p') || el.closest('picture') || el;
    parent.remove();
  });
}

// AFTER-TRANSFORM: section breaks and section metadata
function afterTransformer(hookName, element, payload) {
  if (hookName !== 'afterTransform') return;
  var document = payload.document;

  // Split the closing region ("Win every search…" → CTA → awards → legal) into its own
  // section-dark section. NOTE: ctaParser + awardsParser already ran and replaceWith()'d
  // section.cta / section.awards, so those selectors no longer exist here — key off the
  // surviving "Win every search" heading instead. Insert an <hr> before it (the pipeline
  // turns <hr> into a section break) so the dark style scopes ONLY to the closing region,
  // then append the section-dark Section Metadata at the very end of that region.
  var closingHeading = null;
  element.querySelectorAll('h2').forEach(function(h) {
    if (/win every search/i.test(h.textContent || '')) closingHeading = h;
  });
  if (closingHeading) {
    // The heading sits inside ctaParser's wrapper div — break before that wrapper.
    var closingBlock = closingHeading.closest('div') || closingHeading;
    closingBlock.parentNode.insertBefore(document.createElement('hr'), closingBlock);

    var sectionMeta = WebImporter.DOMUtils.createTable(
      [['Section Metadata'], ['Style', 'section-dark']],
      document
    );
    element.appendChild(sectionMeta);
  }

  // Apply the page template: body.template-default (marketing-chrome base) + body.template-one
  // (the /one/ gradient + block refinements). /one/ overrides the marketing gradient with its
  // own but is still a marketing-chrome page, so it carries template-default too.
  // decorateTemplateAndTheme splits this comma list into both classes; scripts.js carries a fallback.
  var templateMeta = WebImporter.DOMUtils.createTable(
    [['Metadata'], ['template', 'template-default, template-one']],
    document
  );
  element.appendChild(templateMeta);
}

// CONFIGURATION
var parsers = {
  'teaser-semrush-one': heroParser,
  'teaser': featureCardsParser,
  'columns-stats': statsColumnsParser,
  'cards-icon': iconsGridParser,
  'testimonials': testimonialsParser,
  'cards-awards': awardsParser,
};

var PAGE_TEMPLATE = {
  name: 'semrush-one',
  blocks: [
    { name: 'teaser-semrush-one', instances: ['section.main-screen'] },
    { name: 'teaser', instances: ['section.cards .cards__item', 'section.cards-2 .cards__item'] },
    { name: 'columns-stats', instances: ['section.numbers'] },
    { name: 'cards-icon', instances: ['section.icons .icons__wrapper'] },
    { name: 'testimonials', instances: ['.icons__testimonial'] },
    { name: 'cards-awards', instances: ['section.awards'] },
  ],
};

function findBlocksOnPage(document, template) {
  var pageBlocks = [];
  template.blocks.forEach(function(blockDef) {
    blockDef.instances.forEach(function(selector) {
      var elements = document.querySelectorAll(selector);
      elements.forEach(function(el) {
        pageBlocks.push({ name: blockDef.name, selector: selector, element: el });
      });
    });
  });
  return pageBlocks;
}

export default {
  transform: function(payload) {
    var document = payload.document;
    var url = payload.url;
    var params = payload.params;
    var main = document.body;

    cleanupTransformer('beforeTransform', main, payload);

    // Parse default content sections first
    // Section: Feature Cards heading
    var cardsTitle = main.querySelectorAll('.cards__title');
    cardsTitle.forEach(function(title) {
      var wrapper = document.createElement('div');
      var h2 = title.querySelector('h2');
      if (h2) {
        var heading = document.createElement('h2');
        heading.textContent = h2.textContent.trim();
        wrapper.appendChild(heading);
      }
      var sub = title.querySelector('.subtitle');
      if (sub) {
        var p = document.createElement('p');
        p.textContent = sub.textContent.trim();
        wrapper.appendChild(p);
      }
      title.replaceWith(wrapper);
    });

    // Section: Icons heading
    var iconsTitle = main.querySelector('.icons__title');
    if (iconsTitle) {
      var wrapper = document.createElement('div');
      var h2 = iconsTitle.querySelector('h2');
      if (h2) {
        var heading = document.createElement('h2');
        heading.textContent = h2.textContent.trim();
        wrapper.appendChild(heading);
      }
      var sub = iconsTitle.querySelector('.subtitle');
      if (sub) {
        var p = document.createElement('p');
        p.textContent = sub.textContent.trim();
        wrapper.appendChild(p);
      }
      iconsTitle.replaceWith(wrapper);
    }

    // CTA section (default content, not a block)
    var ctaSection = main.querySelector('section.cta');
    if (ctaSection) ctaParser(ctaSection, { document: document });

    // Parse blocks
    var pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
    pageBlocks.forEach(function(block) {
      var parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document: document, url: url, params: params });
        } catch (e) {
          console.error('Failed to parse ' + block.name + ':', e);
        }
      }
    });

    afterTransformer('afterTransform', main, payload);

    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    var path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/one/index'
    );

    return [{
      element: main,
      path: path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map(function(b) { return b.name; }),
      },
    }];
  },
};
