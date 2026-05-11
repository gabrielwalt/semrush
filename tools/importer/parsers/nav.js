export default function parse(element, { document }) {
  const wrapper = document.createElement('div');

  // Brand / logo section
  const logoImg = element.querySelector('a[href="/"] img, [class*="logo"] img');
  if (logoImg) {
    const brandDiv = document.createElement('div');
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = '/';
    const pic = document.createElement('picture');
    const img = document.createElement('img');
    img.src = logoImg.src;
    img.alt = logoImg.alt || 'Semrush';
    pic.appendChild(img);
    a.appendChild(pic);
    p.appendChild(a);
    brandDiv.appendChild(p);
    wrapper.appendChild(brandDiv);
  }

  // Nav sections — output as H2/H3/UL structure
  const navDiv = document.createElement('div');

  // Find all top-level menu items (buttons or links in the main nav)
  const menuItems = element.querySelectorAll(
    '[class*="menu-item"], header nav > ul > li, [class*="header"] ul[class*="menu"] > li',
  );

  menuItems.forEach((item) => {
    const btn = item.querySelector('button, :scope > a');
    if (!btn) return;

    const label = btn.textContent.trim();
    const link = item.querySelector(':scope > a');
    const href = link ? link.href : `/${label.toLowerCase()}/`;

    // Create H2 for this top-level item
    const h2 = document.createElement('h2');
    const h2Link = document.createElement('a');
    h2Link.href = href;
    h2Link.textContent = label;
    h2.appendChild(h2Link);
    navDiv.appendChild(h2);

    // Find the dropdown panel for this item
    const dropdown = item.querySelector('[class*="dropdown"]')
      || item.nextElementSibling;
    if (!dropdown || !dropdown.querySelector('h3, [class*="heading"], [class*="column"]')) return;

    // Find all columns/groups in the dropdown
    const columns = dropdown.querySelectorAll(
      '[class*="column"], [class*="group"]:not([class*="promo"])',
    );

    columns.forEach((col) => {
      const heading = col.querySelector('h3, [class*="heading"]');
      const links = col.querySelectorAll('ul a, li > a');

      if (heading && links.length > 0) {
        const h3 = document.createElement('h3');
        h3.textContent = heading.textContent.trim();
        navDiv.appendChild(h3);

        const ul = document.createElement('ul');
        links.forEach((a) => {
          const li = document.createElement('li');
          const newA = document.createElement('a');
          newA.href = a.href;
          newA.textContent = a.textContent.trim();
          li.appendChild(newA);
          ul.appendChild(li);
        });
        navDiv.appendChild(ul);
      }
    });

    // Find promo tile in this dropdown
    const promo = dropdown.querySelector('[class*="promo"]');
    if (promo) {
      const promoLink = promo.querySelector('a');
      const promoImg = promo.querySelector('img');
      const promoTitle = promo.querySelector('[class*="title"]');
      const promoDesc = promo.querySelector('[class*="desc"]');
      const promoMeta = promo.querySelectorAll('[class*="meta"] > *, [class*="date"], [class*="location"]');

      if (promoImg && promoLink) {
        // Image paragraph
        const imgP = document.createElement('p');
        const imgA = document.createElement('a');
        imgA.href = promoLink.href;
        const pic = document.createElement('picture');
        const img = document.createElement('img');
        img.src = promoImg.src;
        img.alt = promoImg.alt || '';
        pic.appendChild(img);
        imgA.appendChild(pic);
        imgP.appendChild(imgA);
        navDiv.appendChild(imgP);

        // Title paragraph (bold)
        if (promoTitle) {
          const titleP = document.createElement('p');
          const strong = document.createElement('strong');
          strong.textContent = promoTitle.textContent.trim();
          titleP.appendChild(strong);
          navDiv.appendChild(titleP);
        }

        // Description paragraph
        if (promoDesc) {
          const descP = document.createElement('p');
          descP.textContent = promoDesc.textContent.trim();
          navDiv.appendChild(descP);
        }

        // Meta (date/location)
        if (promoMeta.length > 0) {
          const metaP = document.createElement('p');
          metaP.textContent = Array.from(promoMeta).map((m) => m.textContent.trim()).join(' · ');
          navDiv.appendChild(metaP);
        }
      }
    }
  });

  wrapper.appendChild(navDiv);

  // Tools section (Log In / Sign Up)
  const loginLink = element.querySelector('a[href*="/login"]');
  const signupLink = element.querySelector('a[href*="/signup"]');
  if (loginLink || signupLink) {
    const toolsDiv = document.createElement('div');
    const p = document.createElement('p');
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
    wrapper.appendChild(toolsDiv);
  }

  element.replaceWith(wrapper);
}
