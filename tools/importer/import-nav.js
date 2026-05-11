/* eslint-disable */
/* global WebImporter */

export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    document.querySelectorAll('script, style, noscript, iframe, link[rel="stylesheet"]').forEach((el) => el.remove());

    const result = document.createElement('div');

    // Brand div (logo)
    const brandDiv = document.createElement('div');
    const logoP = document.createElement('p');
    const logoA = document.createElement('a');
    logoA.href = '/';
    const logoPic = document.createElement('picture');
    const logoImg = document.createElement('img');
    logoImg.src = '/content/images/semrush-logo.svg';
    logoImg.alt = 'Semrush';
    logoPic.appendChild(logoImg);
    logoA.appendChild(logoPic);
    logoP.appendChild(logoA);
    brandDiv.appendChild(logoP);
    result.appendChild(brandDiv);

    // Sections div (H2/H3/UL structure)
    const sectionsDiv = document.createElement('div');

    const menuContainer = document.querySelector('#srf-header-desktop-menu-container, srf-header-menu');
    const topLevelItems = menuContainer
      ? menuContainer.querySelectorAll(':scope ul > li')
      : [];

    const dropdowns = document.querySelectorAll('srf-header-dropdown-items.srf-header-dropdown-popover');
    let dropdownIndex = 0;

    topLevelItems.forEach((item) => {
      const btn = item.querySelector('button.srf-header__menu-item, a.srf-header__menu-item');
      if (!btn) return;

      const label = btn.textContent.trim();
      const isButton = btn.tagName.toLowerCase() === 'button';
      const href = btn.href || `/${label.toLowerCase()}/`;

      // H2 for top-level item
      const h2 = document.createElement('h2');
      const h2Link = document.createElement('a');
      h2Link.href = href;
      h2Link.textContent = label;
      h2.appendChild(h2Link);
      sectionsDiv.appendChild(h2);

      // If it has a dropdown, add H3/UL columns + promo
      if (isButton && dropdownIndex < dropdowns.length) {
        const dropdown = dropdowns[dropdownIndex];
        dropdownIndex++;

        const columns = dropdown.querySelectorAll('.srf-header__menu-sublist-column');
        columns.forEach((col) => {
          const heading = col.querySelector('.srf-header__menu-sublist-column-title, h3');
          const links = col.querySelectorAll('.srf-header__menu-sublist-item');

          if (heading && links.length > 0) {
            const h3 = document.createElement('h3');
            h3.textContent = heading.textContent.trim();
            sectionsDiv.appendChild(h3);

            const ul = document.createElement('ul');
            links.forEach((a) => {
              const li = document.createElement('li');
              const newA = document.createElement('a');
              newA.href = a.href;
              newA.textContent = a.textContent.trim();
              li.appendChild(newA);
              ul.appendChild(li);
            });
            sectionsDiv.appendChild(ul);
          }
        });

        // Promo tile
        const promo = dropdown.querySelector('.srf-header__dropdown-promo');
        if (promo) {
          const promoImg = promo.querySelector('.srf-header__dropdown-promo-image');
          const promoTitle = promo.querySelector('.srf-header__dropdown-promo-title');
          const promoDesc = promo.querySelector('.srf-header__dropdown-promo-description');
          const promoDate = promo.querySelector('.srf-header__dropdown-promo-date-and-place');

          if (promoImg || promoTitle) {
            const imgP = document.createElement('p');
            const imgA = document.createElement('a');
            imgA.href = promo.href || '#';
            const pic = document.createElement('picture');
            const img = document.createElement('img');
            const bgImage = promoImg?.style?.backgroundImage || '';
            const urlMatch = bgImage.match(/url\(["']?([^"')]+)["']?\)/);
            img.src = urlMatch ? urlMatch[1] : (promo.href || '#');
            img.alt = promoTitle ? promoTitle.textContent.trim() : '';
            pic.appendChild(img);
            imgA.appendChild(pic);
            imgP.appendChild(imgA);
            sectionsDiv.appendChild(imgP);
          }

          if (promoTitle) {
            const titleP = document.createElement('p');
            const strong = document.createElement('strong');
            strong.textContent = promoTitle.textContent.trim();
            titleP.appendChild(strong);
            sectionsDiv.appendChild(titleP);
          }

          if (promoDesc) {
            const descP = document.createElement('p');
            descP.textContent = promoDesc.textContent.trim();
            sectionsDiv.appendChild(descP);
          }

          if (promoDate) {
            const dateP = document.createElement('p');
            dateP.textContent = promoDate.textContent.trim();
            sectionsDiv.appendChild(dateP);
          }
        }
      }
    });

    result.appendChild(sectionsDiv);

    // Tools div (Log In / Sign Up)
    const toolsDiv = document.createElement('div');
    const buttonsDiv = document.querySelector('.srf-header__buttons');
    if (buttonsDiv) {
      const p = document.createElement('p');
      const loginLink = buttonsDiv.querySelector('a[href*="/login"]');
      const signupLink = buttonsDiv.querySelector('a[href*="/signup"]');
      if (loginLink) {
        const a = document.createElement('a');
        a.href = loginLink.href;
        a.textContent = loginLink.textContent.trim() || 'Log In';
        p.appendChild(a);
      }
      if (loginLink && signupLink) {
        p.appendChild(document.createTextNode(' | '));
      }
      if (signupLink) {
        const a = document.createElement('a');
        a.href = signupLink.href;
        a.textContent = signupLink.textContent.trim() || 'Sign Up';
        p.appendChild(a);
      }
      toolsDiv.appendChild(p);
    }
    result.appendChild(toolsDiv);

    return [{
      element: result,
      path: '/nav',
      report: {
        title: 'Navigation',
        template: 'nav',
        blocks: ['nav'],
      },
    }];
  },
};
