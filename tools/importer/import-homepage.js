/* eslint-disable */
/* global WebImporter */

(function() {
  // PARSERS

  function announcementBarParser(element, { document }) {
    const text = element.querySelector('.srf_announcement_banner__long')?.textContent
      || element.textContent.trim();
    const a = document.createElement('a');
    a.href = element.href || element.querySelector('a')?.href || '';
    a.textContent = text;
    const p = document.createElement('p');
    p.appendChild(a);
    const cells = [['Announcement Bar'], [p]];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }

  function heroParser(element, { document }) {
    const h1 = element.querySelector('h1');
    if (!h1) return;
    const subtitle = element.querySelector('.mp-hero__subtitle');
    const wrapper = document.createElement('div');

    const content = document.createElement('div');
    const heading = document.createElement('h1');
    heading.textContent = h1.textContent.trim();
    content.appendChild(heading);
    if (subtitle) {
      const p = document.createElement('p');
      p.textContent = subtitle.textContent.trim();
      content.appendChild(p);
    }
    const ctaP = document.createElement('p');
    const strong = document.createElement('strong');
    const a = document.createElement('a');
    a.href = 'https://www.semrush.com/signup/';
    a.textContent = 'Get insights';
    strong.appendChild(a);
    ctaP.appendChild(strong);
    content.appendChild(ctaP);
    const heroTable = WebImporter.DOMUtils.createTable([['Hero'], [content]], document);
    wrapper.appendChild(heroTable);

    const video = element.querySelector('video');
    const pic = document.createElement('picture');
    const img = document.createElement('img');
    img.src = video ? (video.poster || video.getAttribute('src')) : 'https://www.semrush.com/static/plg_toolkits.webp';
    img.alt = 'Semrush platform toolkits overview';
    pic.appendChild(img);
    const heroVideoTable = WebImporter.DOMUtils.createTable([['Hero Video'], [pic]], document);
    wrapper.appendChild(heroVideoTable);

    element.replaceWith(wrapper);
  }

  function logoMarqueeParser(element, { document }) {
    const firstGroup = element.querySelector('.mp-logo-marquee__group');
    if (!firstGroup) return;
    const logos = firstGroup.querySelectorAll('img');
    if (logos.length === 0) return;
    const content = document.createElement('div');
    logos.forEach((img) => {
      const picture = document.createElement('picture');
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      picture.appendChild(imgEl);
      content.appendChild(picture);
    });
    const cells = [['Logo Marquee'], [content]];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }

  function promoCardsSemrushOneParser(element, { document }) {
    const h2 = element.querySelector('h2');
    const description = element.querySelector('.mp-promo-cards__text, p:not([class*="button"])');
    const ctaLink = element.querySelector('a.mp-button');

    const textContent = document.createElement('div');
    if (h2) {
      const heading = document.createElement('h2');
      heading.innerHTML = h2.innerHTML;
      textContent.appendChild(heading);
    }
    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      textContent.appendChild(p);
    }
    if (ctaLink) {
      const p = document.createElement('p');
      const em = document.createElement('em');
      const a = document.createElement('a');
      a.href = ctaLink.href;
      a.textContent = ctaLink.textContent.trim();
      em.appendChild(a);
      p.appendChild(em);
      textContent.appendChild(p);
    }
    const rows = [['Promo Cards (semrush-one)'], [textContent]];
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }

  function promoCardsEnterpriseParser(element, { document }) {
    const h2 = element.querySelector('h2');
    const description = element.querySelector('.mp-promo-cards__text, p:not([class*="button"])');
    const ctaLink = element.querySelector('a.mp-button');

    const headingContent = document.createElement('div');
    if (h2) {
      const heading = document.createElement('h2');
      heading.innerHTML = h2.innerHTML;
      headingContent.appendChild(heading);
    }
    const bodyContent = document.createElement('div');
    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      bodyContent.appendChild(p);
    }
    if (ctaLink) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      const a = document.createElement('a');
      a.href = ctaLink.href;
      a.textContent = ctaLink.textContent.trim();
      strong.appendChild(a);
      p.appendChild(strong);
      bodyContent.appendChild(p);
    }
    const rows = [['Promo Cards (enterprise)'], [headingContent], [bodyContent]];
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }

  function solutionsSliderParser(element, { document }) {
    const sectionSubtitle = element.querySelector('h3');
    const wrapper = document.createElement('div');

    const eyebrow = document.createElement('p');
    eyebrow.textContent = 'Solutions';
    wrapper.appendChild(eyebrow);
    if (sectionSubtitle) {
      const h2 = document.createElement('h2');
      h2.textContent = sectionSubtitle.textContent.trim();
      wrapper.appendChild(h2);
    }

    const slides = element.querySelectorAll('.mp-toolkit.swiper-slide');
    const rows = [['Solutions Slider']];
    slides.forEach((slide) => {
      const title = slide.querySelector('h3');
      const subtitle = slide.querySelector('h4');
      const img = slide.querySelector('img');
      const textCell = document.createElement('div');
      if (title) {
        const h3 = document.createElement('h3');
        h3.textContent = title.textContent.trim();
        textCell.appendChild(h3);
      }
      if (subtitle) {
        const p = document.createElement('p');
        p.textContent = subtitle.textContent.trim();
        textCell.appendChild(p);
      }
      const desc = slide.querySelector('.mp-toolkit__description');
      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc.textContent.trim();
        textCell.appendChild(p);
      }
      const cta = slide.querySelector('a.mp-button');
      if (cta) {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        const a = document.createElement('a');
        a.href = cta.href;
        a.textContent = cta.textContent.trim();
        strong.appendChild(a);
        p.appendChild(strong);
        textCell.appendChild(p);
      }
      const imgCell = document.createElement('div');
      if (img) {
        const pic = document.createElement('picture');
        const imgEl = document.createElement('img');
        imgEl.src = img.src;
        imgEl.alt = img.alt || '';
        pic.appendChild(imgEl);
        imgCell.appendChild(pic);
      }
      rows.push([textCell, imgCell]);
    });
    const table = WebImporter.DOMUtils.createTable(rows, document);
    wrapper.appendChild(table);
    element.replaceWith(wrapper);
  }

  function statsParser(element, { document }) {
    const sectionSubtitle = element.querySelector('h3');
    const learnMoreLink = element.querySelector('a[href*="/stats/"]');
    const statItems = element.querySelectorAll('li');

    const headerContent = document.createElement('div');
    const eyebrow = document.createElement('p');
    eyebrow.textContent = 'Stats and facts';
    headerContent.appendChild(eyebrow);
    if (sectionSubtitle) {
      const h2 = document.createElement('h2');
      h2.textContent = sectionSubtitle.textContent.trim();
      headerContent.appendChild(h2);
    }
    if (learnMoreLink) {
      const p = document.createElement('p');
      const em = document.createElement('em');
      const a = document.createElement('a');
      a.href = learnMoreLink.href;
      a.textContent = learnMoreLink.textContent.trim();
      em.appendChild(a);
      p.appendChild(em);
      headerContent.appendChild(p);
    }
    const rows = [['Stats'], [headerContent]];
    statItems.forEach((item) => {
      const countEl = item.querySelector('.mp-stats__item-count, b');
      const titleEl = item.querySelector('.mp-stats__item-title');
      const descEl = item.querySelector('.mp-stats__item-description');
      const value = countEl ? countEl.textContent.trim() : '';
      const title = titleEl ? titleEl.textContent.trim() : '';
      const desc = descEl ? descEl.textContent.trim() : '';
      if (value) {
        const cell = document.createElement('div');
        const pVal = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = value;
        pVal.appendChild(strong);
        cell.appendChild(pVal);
        const pTitle = document.createElement('p');
        pTitle.textContent = title;
        cell.appendChild(pTitle);
        const pDesc = document.createElement('p');
        pDesc.textContent = desc;
        cell.appendChild(pDesc);
        rows.push([cell]);
      }
    });
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }

  function aiVisibilityIndexParser(element, { document }) {
    const h2 = element.querySelector('h2');
    const subtitle = element.querySelector('.mp-ai-visibility-index__subtitle, h2 + p');
    const ctaLink = element.querySelector('a.mp-button, a[href*="ai-visibility-index"]');
    const iconImg = element.querySelector('.mp-ai-visibility-index__img img');
    const tableRows = element.querySelectorAll('tbody tr');

    const rows = [['AI Visibility Index']];
    const headerRow = document.createElement('div');
    const headerText = document.createElement('div');
    if (iconImg) {
      const iconDiv = document.createElement('div');
      const pic = document.createElement('picture');
      const img = document.createElement('img');
      img.src = iconImg.src;
      img.alt = '';
      pic.appendChild(img);
      iconDiv.appendChild(pic);
      headerRow.appendChild(iconDiv);
    }
    if (h2) {
      const heading = document.createElement('h2');
      heading.textContent = h2.textContent.trim();
      headerText.appendChild(heading);
    }
    if (subtitle) {
      const p = document.createElement('p');
      p.textContent = subtitle.textContent.trim();
      headerText.appendChild(p);
    }
    if (ctaLink) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      const a = document.createElement('a');
      a.href = ctaLink.href;
      a.textContent = ctaLink.textContent.trim();
      strong.appendChild(a);
      p.appendChild(strong);
      headerText.appendChild(p);
    }
    rows.push([headerRow, headerText]);

    const hBrand = document.createElement('div');
    hBrand.textContent = 'Brand';
    const hSov = document.createElement('div');
    hSov.textContent = '% Share of Voice';
    rows.push([hBrand, hSov]);

    tableRows.forEach((tr) => {
      const cells = tr.querySelectorAll('td');
      if (cells.length >= 2) {
        const brand = cells[0].textContent.trim();
        const valueEl = cells[1].querySelector('[class*="value"]');
        const value = valueEl ? valueEl.textContent.trim() : cells[1].textContent.trim();
        const brandCell = document.createElement('div');
        brandCell.textContent = brand;
        const valueCell = document.createElement('div');
        valueCell.textContent = value;
        rows.push([brandCell, valueCell]);
      }
    });
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }

  function testimonialsParser(element, { document }) {
    const sectionSubtitle = element.querySelector('h3');
    const logoImg = element.querySelector('.mp-client-testimonials__logo-img img');
    const quote = element.querySelector('blockquote, .mp-client-testimonials__quote');
    const authorImg = element.querySelector('.mp-client-testimonials__author-img');
    const authorCite = element.querySelector('.mp-client-testimonials__quote-author cite');
    const authorName = authorCite ? authorCite.querySelector('b') : null;
    const authorRole = authorCite ? authorCite.querySelector('span') : null;
    const statNumber = element.querySelector('.mp-client-testimonials__stats-block-number');
    const statText = element.querySelector('.mp-client-testimonials__stats-block-text');

    const rows = [['Testimonials']];
    const headingCell = document.createElement('div');
    const eyebrow = document.createElement('p');
    eyebrow.textContent = 'Our customers';
    headingCell.appendChild(eyebrow);
    if (sectionSubtitle) {
      const h2el = document.createElement('h2');
      h2el.textContent = sectionSubtitle.textContent.trim();
      headingCell.appendChild(h2el);
    }
    rows.push([headingCell]);

    const quoteCell = document.createElement('div');
    if (logoImg) {
      const pic = document.createElement('picture');
      const img = document.createElement('img');
      img.src = logoImg.src;
      img.alt = logoImg.alt || 'Zoominfo';
      pic.appendChild(img);
      quoteCell.appendChild(pic);
    }
    if (quote) {
      const bq = document.createElement('blockquote');
      bq.textContent = quote.textContent.trim();
      quoteCell.appendChild(bq);
    }
    rows.push([quoteCell]);

    const authorCell = document.createElement('div');
    if (authorImg) {
      const pic = document.createElement('picture');
      const img = document.createElement('img');
      img.src = authorImg.src || '';
      img.alt = authorName ? authorName.textContent.trim() : 'James Roth';
      pic.appendChild(img);
      authorCell.appendChild(pic);
    }
    if (authorName) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = authorName.textContent.trim();
      p.appendChild(strong);
      authorCell.appendChild(p);
    }
    if (authorRole) {
      const p = document.createElement('p');
      p.textContent = authorRole.textContent.trim();
      authorCell.appendChild(p);
    }
    rows.push([authorCell]);

    if (statNumber || statText) {
      const statCell = document.createElement('div');
      if (statNumber) {
        const p = document.createElement('p');
        p.textContent = statNumber.textContent.trim();
        statCell.appendChild(p);
      }
      if (statText) {
        const p = document.createElement('p');
        p.textContent = statText.textContent.trim();
        statCell.appendChild(p);
      }
      rows.push([statCell]);
    }
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }

  function resourcesSliderParser(element, { document }) {
    const sectionSubtitle = element.querySelector('h3');
    const wrapper = document.createElement('div');

    const articles = element.querySelectorAll('article');
    const eyebrow = document.createElement('p');
    eyebrow.textContent = 'Resources ( ' + articles.length + ' )';
    wrapper.appendChild(eyebrow);
    if (sectionSubtitle) {
      const h2 = document.createElement('h2');
      h2.textContent = sectionSubtitle.textContent.trim();
      wrapper.appendChild(h2);
    }

    const rows = [['Resources Slider']];
    articles.forEach((article) => {
      const img = article.querySelector('img');
      const titleLink = article.querySelector('h3 a');
      const tags = article.querySelectorAll('.mp-resources__item-info-tag, [class*="tag"]');

      const imgCell = document.createElement('div');
      if (img) {
        const pic = document.createElement('picture');
        const imgEl = document.createElement('img');
        imgEl.src = img.src;
        imgEl.alt = img.alt || '';
        pic.appendChild(imgEl);
        imgCell.appendChild(pic);
      }
      const textCell = document.createElement('div');
      if (titleLink) {
        const h3 = document.createElement('h3');
        const a = document.createElement('a');
        a.href = titleLink.href;
        a.textContent = titleLink.textContent.trim();
        h3.appendChild(a);
        textCell.appendChild(h3);
      }
      const tagText = [...tags].map((t) => t.textContent.trim()).join(' · ');
      if (tagText) {
        const p = document.createElement('p');
        p.textContent = tagText;
        textCell.appendChild(p);
      }
      rows.push([imgCell, textCell]);
    });
    const table = WebImporter.DOMUtils.createTable(rows, document);
    wrapper.appendChild(table);
    element.replaceWith(wrapper);
  }

  // CLEANUP TRANSFORMER
  function cleanupTransformer(hookName, element, payload) {
    if (hookName !== 'beforeTransform') return;
    const { document } = payload;

    element.querySelectorAll('script, style, noscript, iframe, link[rel="stylesheet"]').forEach((el) => el.remove());
    element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach((el) => el.remove());

    const announcement = element.querySelector('.srf_announcement_banner');
    if (announcement) {
      const main = element.querySelector('main') || element;
      main.prepend(announcement);
    }

    element.querySelectorAll('header, footer, nav[class*="menu"]').forEach((el) => el.remove());
    element.querySelectorAll('[aria-hidden="true"], .mp-visually-hidden').forEach((el) => el.remove());

    const marquee = element.querySelector('.mp-logo-marquee');
    if (marquee) {
      const lists = marquee.querySelectorAll('ul');
      if (lists.length > 1) {
        for (let i = 1; i < lists.length; i++) lists[i].remove();
      }
    }

    element.querySelectorAll('.swiper-button-next, .swiper-button-prev, .swiper-pagination').forEach((el) => el.remove());
    element.querySelectorAll('.mp-search, form').forEach((el) => el.remove());
    element.querySelectorAll('[class*="outdated"], [class*="skip-to"]').forEach((el) => el.remove());
  }

  // CONFIGURATION
  const parsers = {
    'announcement-bar': announcementBarParser,
    'hero': heroParser,
    'logo-marquee': logoMarqueeParser,
    'promo-cards-semrush-one': promoCardsSemrushOneParser,
    'promo-cards-enterprise': promoCardsEnterpriseParser,
    'solutions-slider': solutionsSliderParser,
    'stats': statsParser,
    'ai-visibility-index': aiVisibilityIndexParser,
    'testimonials': testimonialsParser,
    'resources-slider': resourcesSliderParser,
  };

  const PAGE_TEMPLATE = {
    name: 'homepage',
    blocks: [
      { name: 'announcement-bar', instances: ['.srf_announcement_banner'] },
      { name: 'hero', instances: ['.mp-hero'] },
      { name: 'logo-marquee', instances: ['.mp-logo-marquee'] },
      { name: 'promo-cards-semrush-one', instances: ['.mp-promo-cards.mp-semrush-one'] },
      { name: 'promo-cards-enterprise', instances: ['.mp-promo-cards.mp-enterprise'] },
      { name: 'solutions-slider', instances: ['.mp-section.mp-toolkits'] },
      { name: 'stats', instances: ['.mp-section.mp-stats'] },
      { name: 'ai-visibility-index', instances: ['.mp-section.mp-ai-visibility-index'] },
      { name: 'testimonials', instances: ['.mp-section.mp-client-testimonials'] },
      { name: 'resources-slider', instances: ['.mp-section.mp-resources'] },
    ],
  };

  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          pageBlocks.push({ name: blockDef.name, selector, element: el });
        });
      });
    });
    return pageBlocks;
  }

  window.CustomImportScript = {
    default: {
      transform: (payload) => {
        const { document, url, params } = payload;
        const main = document.body;

        cleanupTransformer('beforeTransform', main, payload);

        const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
        pageBlocks.forEach((block) => {
          const parser = parsers[block.name];
          if (parser) {
            try {
              parser(block.element, { document, url, params });
            } catch (e) {
              console.error('Failed to parse ' + block.name + ':', e);
            }
          }
        });

        WebImporter.rules.transformBackgroundImages(main, document);
        WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

        const path = WebImporter.FileUtils.sanitizePath(
          new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
        );

        return [{
          element: main,
          path,
          report: {
            title: document.title,
            template: PAGE_TEMPLATE.name,
            blocks: pageBlocks.map((b) => b.name),
          },
        }];
      },
    },
  };
})();
