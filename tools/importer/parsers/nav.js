export default function parse(element, { document }) {
  const navEl = element.querySelector('nav, [class*="nav"], header');
  if (!navEl) return;

  const wrapper = document.createElement('div');

  // Brand / logo
  const logo = navEl.querySelector('[class*="logo"] img, [class*="brand"] img, a[href="/"] img');
  if (logo) {
    const brandP = document.createElement('p');
    const brandA = document.createElement('a');
    brandA.href = '/';
    const pic = document.createElement('picture');
    const img = document.createElement('img');
    img.src = logo.src;
    img.alt = logo.alt || 'Semrush';
    pic.appendChild(img);
    brandA.appendChild(pic);
    brandP.appendChild(brandA);
    const brandSection = document.createElement('div');
    brandSection.appendChild(brandP);
    wrapper.appendChild(brandSection);
  }

  // Main nav sections
  const mainNav = navEl.querySelector('[class*="sections"], [class*="menu-list"], ul');
  if (mainNav) {
    const navSection = document.createElement('div');
    const rootUl = document.createElement('ul');

    const topItems = mainNav.querySelectorAll(':scope > li, :scope > ul > li');
    topItems.forEach((topLi) => {
      const topLink = topLi.querySelector(':scope > a');
      if (!topLink) return;

      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = topLink.href;
      a.textContent = topLink.textContent.trim();
      li.appendChild(a);

      // Check for submenu groups
      const subMenu = topLi.querySelector(':scope > ul, :scope > [class*="mega"], :scope > [class*="dropdown"]');
      if (subMenu) {
        const subUl = document.createElement('ul');
        const groups = subMenu.querySelectorAll(':scope > li[class*="group"], :scope > [class*="column"], :scope > div');
        if (groups.length > 0) {
          groups.forEach((group) => {
            const heading = group.querySelector(':scope > [class*="heading"], :scope > h3, :scope > h4, :scope > p:first-child');
            const groupLinks = group.querySelectorAll('a');
            const promoImg = group.querySelector('img[class*="promo"], picture img');

            if (promoImg && groupLinks.length <= 1) {
              // Promo tile
              const promoLi = document.createElement('li');
              const promoA = document.createElement('a');
              promoA.href = groupLinks[0] ? groupLinks[0].href : '#';
              const pic = document.createElement('picture');
              const img = document.createElement('img');
              img.src = promoImg.src;
              img.alt = promoImg.alt || '';
              pic.appendChild(img);
              promoA.appendChild(pic);
              promoLi.appendChild(promoA);
              subUl.appendChild(promoLi);
            } else if (heading && groupLinks.length > 0) {
              // Column group with heading
              const groupLi = document.createElement('li');
              groupLi.textContent = heading.textContent.trim();
              const innerUl = document.createElement('ul');
              groupLinks.forEach((link) => {
                const innerLi = document.createElement('li');
                const innerA = document.createElement('a');
                innerA.href = link.href;
                innerA.textContent = link.textContent.trim();
                innerLi.appendChild(innerA);
                innerUl.appendChild(innerLi);
              });
              groupLi.appendChild(innerUl);
              subUl.appendChild(groupLi);
            } else {
              // Flat list of links
              groupLinks.forEach((link) => {
                const innerLi = document.createElement('li');
                const innerA = document.createElement('a');
                innerA.href = link.href;
                innerA.textContent = link.textContent.trim();
                innerLi.appendChild(innerA);
                subUl.appendChild(innerLi);
              });
            }
          });
        } else {
          // Simple flat submenu
          const subLinks = subMenu.querySelectorAll(':scope > li > a');
          subLinks.forEach((link) => {
            const innerLi = document.createElement('li');
            const innerA = document.createElement('a');
            innerA.href = link.href;
            innerA.textContent = link.textContent.trim();
            innerLi.appendChild(innerA);
            subUl.appendChild(innerLi);
          });
        }
        if (subUl.children.length > 0) li.appendChild(subUl);
      }

      rootUl.appendChild(li);
    });

    navSection.appendChild(rootUl);
    wrapper.appendChild(navSection);
  }

  // Tools section (Log In / Sign Up)
  const loginLink = navEl.querySelector('a[href*="/login"], a[href*="login"]');
  const signupLink = navEl.querySelector('a[href*="/signup"], a[href*="signup"]');
  if (loginLink || signupLink) {
    const toolsSection = document.createElement('div');
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
    toolsSection.appendChild(p);
    wrapper.appendChild(toolsSection);
  }

  element.replaceWith(wrapper);
}
