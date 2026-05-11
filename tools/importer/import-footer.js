/* eslint-disable */
/* global WebImporter */

export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    document.querySelectorAll('script, style, noscript, iframe, link[rel="stylesheet"]').forEach((el) => el.remove());

    const footer = document.querySelector('footer.srf-footer');
    if (!footer) {
      const main = document.createElement('div');
      main.textContent = 'Footer not found';
      return [{ element: main, path: '/footer' }];
    }

    const result = document.createElement('div');

    // --- Footer CTA block ---
    const ctaSection = footer.querySelector('.srf-footer__get-started');
    if (ctaSection) {
      const ctaContent = document.createElement('div');

      const heading = ctaSection.querySelector('.srf-footer__get-started-title, h2');
      if (heading) {
        const h2 = document.createElement('h2');
        h2.textContent = heading.textContent.trim();
        ctaContent.appendChild(h2);
      }

      const subtitle = ctaSection.querySelector('.srf-footer__get-started-subtitle, p');
      if (subtitle) {
        const p = document.createElement('p');
        p.textContent = subtitle.textContent.trim();
        ctaContent.appendChild(p);
      }

      const ctaLink = ctaSection.querySelector('.srf-footer__get-started-button, a');
      if (ctaLink) {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        const a = document.createElement('a');
        a.href = ctaLink.href;
        a.textContent = ctaLink.textContent.trim();
        strong.appendChild(a);
        p.appendChild(strong);
        ctaContent.appendChild(p);
      }

      const ctaTable = WebImporter.DOMUtils.createTable([['Footer CTA'], [ctaContent]], document);
      result.appendChild(ctaTable);
      result.appendChild(document.createElement('hr'));
    }

    // --- Footer Links block ---
    const menuBlocks = footer.querySelectorAll('.srf-footer__menu-block');
    if (menuBlocks.length > 0) {
      const linksRow = [];

      menuBlocks.forEach((block) => {
        const titleEl = block.querySelector('p.srf-footer__menu-block-title');
        const list = block.querySelector('.srf-footer__menu-list');

        if (titleEl && list) {
          const cell = document.createElement('div');

          const headingP = document.createElement('p');
          const strong = document.createElement('strong');
          strong.textContent = titleEl.textContent.trim();
          headingP.appendChild(strong);
          cell.appendChild(headingP);

          const ul = document.createElement('ul');
          list.querySelectorAll('a').forEach((a) => {
            if (a.textContent.trim()) {
              const li = document.createElement('li');
              const newA = document.createElement('a');
              newA.href = a.href;
              newA.textContent = a.textContent.trim();
              li.appendChild(newA);
              ul.appendChild(li);
            }
          });
          cell.appendChild(ul);
          linksRow.push(cell);
        }
      });

      if (linksRow.length > 0) {
        const linksTable = WebImporter.DOMUtils.createTable([['Footer Links'], linksRow], document);
        result.appendChild(linksTable);
        result.appendChild(document.createElement('hr'));
      }
    }

    // --- Footer Bottom block ---
    const bottomContent = document.createElement('div');

    // Social links
    const socialList = footer.querySelector('.srf-footer__social-list');
    if (socialList) {
      const socialLinks = socialList.querySelectorAll('a');
      if (socialLinks.length > 0) {
        const socialP = document.createElement('p');
        socialLinks.forEach((a, i) => {
          const newA = document.createElement('a');
          newA.href = a.href;
          newA.textContent = a.getAttribute('aria-label') || a.textContent.trim() || a.href.split('/')[2];
          if (i > 0) socialP.appendChild(document.createTextNode(' '));
          socialP.appendChild(newA);
        });
        bottomContent.appendChild(socialP);
      }
    }

    // Copyright
    const copyright = footer.querySelector('.srf-footer__copyright');
    if (copyright) {
      const p = document.createElement('p');
      p.textContent = copyright.textContent.trim();
      bottomContent.appendChild(p);
    }

    // Legal links
    const legalList = footer.querySelector('.srf-footer__legal-list');
    if (legalList) {
      const legalUl = document.createElement('ul');
      legalList.querySelectorAll('a').forEach((a) => {
        if (a.textContent.trim()) {
          const li = document.createElement('li');
          const newA = document.createElement('a');
          newA.href = a.href;
          newA.textContent = a.textContent.trim();
          li.appendChild(newA);
          legalUl.appendChild(li);
        }
      });
      bottomContent.appendChild(legalUl);
    }

    if (bottomContent.children.length > 0) {
      const bottomTable = WebImporter.DOMUtils.createTable([['Footer Bottom'], [bottomContent]], document);
      result.appendChild(bottomTable);
    }

    return [{
      element: result,
      path: '/footer',
      report: {
        title: 'Footer',
        template: 'footer',
        blocks: ['footer-cta', 'footer-links', 'footer-bottom'],
      },
    }];
  },
};
