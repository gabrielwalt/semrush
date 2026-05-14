import { getMetadata } from '../../scripts/aem.js';
import { getContentRoot } from '../../scripts/scripts.js';
import { loadFragment } from '../fragment/fragment.js';

const isDesktop = window.matchMedia('(min-width: 1024px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    if (!navSections) return;
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  if (!isDesktop.matches) return;
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    if (!navSections) return;
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.classList.contains('nav-drop');
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

function toggleAllNavSections(sections, expanded = false) {
  if (!sections) return;
  sections.querySelectorAll('.nav-item').forEach((item) => {
    item.setAttribute('aria-expanded', expanded);
  });
  const wrapper = sections.closest('.nav-wrapper');
  if (wrapper) {
    const hasOpen = sections.querySelector('[aria-expanded="true"]');
    wrapper.classList.toggle('nav-open', !!hasOpen);
    wrapper.closest('header')?.classList.toggle('nav-open', !!hasOpen);
  }
}

function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  if (navSections) {
    const navDrops = navSections.querySelectorAll('.nav-drop');
    if (isDesktop.matches) {
      navDrops.forEach((drop) => {
        if (!drop.hasAttribute('tabindex')) {
          drop.setAttribute('tabindex', 0);
          drop.addEventListener('focus', focusNavSection);
        }
      });
    } else {
      navDrops.forEach((drop) => {
        drop.removeAttribute('tabindex');
        drop.removeEventListener('focus', focusNavSection);
      });
    }
  }
  if (!expanded || isDesktop.matches) {
    window.addEventListener('keydown', closeOnEscape);
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

function buildNavFromHeadings(container) {
  const wrapper = container.querySelector('.default-content-wrapper');
  if (!wrapper) return;

  const navList = document.createElement('ul');
  navList.className = 'nav-items';
  const h2s = wrapper.querySelectorAll('h2');

  h2s.forEach((h2) => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    const link = h2.querySelector('a');
    const label = document.createElement('span');
    label.className = 'nav-item-label';
    label.textContent = link ? link.textContent : h2.textContent;
    if (link) label.dataset.href = link.href;
    li.appendChild(label);

    // Collect siblings between this H2 and the next H2
    const panelContent = [];
    let sibling = h2.nextElementSibling;
    while (sibling && sibling.tagName !== 'H2') {
      panelContent.push(sibling);
      sibling = sibling.nextElementSibling;
    }

    if (panelContent.length > 0) {
      li.classList.add('nav-drop');
      const panel = document.createElement('div');
      panel.className = 'nav-mega-panel';

      let currentColumn = null;
      panelContent.forEach((el) => {
        if (el.tagName === 'H3') {
          currentColumn = document.createElement('div');
          currentColumn.className = 'nav-mega-column';
          const heading = document.createElement('p');
          heading.className = 'nav-mega-heading';
          heading.textContent = el.textContent;
          currentColumn.appendChild(heading);
          panel.appendChild(currentColumn);
        } else if (el.tagName === 'UL') {
          if (currentColumn) {
            currentColumn.appendChild(el.cloneNode(true));
          } else {
            panel.appendChild(el.cloneNode(true));
          }
        } else if (el.tagName === 'P') {
          const pic = el.querySelector('picture');
          const strong = el.querySelector('strong');
          if (pic || strong || !currentColumn) {
            // Promo content — start promo section
            if (!panel.querySelector('.nav-mega-promo')) {
              currentColumn = null;
            }
            let promoDiv = panel.querySelector('.nav-mega-promo');
            if (!promoDiv) {
              promoDiv = document.createElement('div');
              promoDiv.className = 'nav-mega-promo';
              panel.appendChild(promoDiv);
            }
            if (pic) {
              const promoLink = el.querySelector('a');
              if (promoLink) promoDiv.appendChild(promoLink.cloneNode(true));
              else promoDiv.appendChild(el.cloneNode(true));
            } else if (strong) {
              const titleSpan = document.createElement('span');
              titleSpan.className = 'nav-mega-promo-title';
              titleSpan.textContent = strong.textContent;
              promoDiv.appendChild(titleSpan);
            } else {
              const descSpan = document.createElement('span');
              descSpan.className = 'nav-mega-promo-desc';
              descSpan.textContent = el.textContent;
              promoDiv.appendChild(descSpan);
            }
          }
        }
      });

      li.appendChild(panel);
    }

    li.addEventListener('click', (e) => {
      // Let clicks inside the mega panel pass through (links navigate, rest ignored)
      if (e.target.closest('.nav-mega-panel')) return;

      if (isDesktop.matches && li.classList.contains('nav-drop')) {
        e.preventDefault();
        const exp = li.getAttribute('aria-expanded') === 'true';
        toggleAllNavSections(li.closest('.nav-sections'));
        li.setAttribute('aria-expanded', exp ? 'false' : 'true');
        const navWrapper = li.closest('.nav-wrapper');
        if (navWrapper) {
          navWrapper.classList.toggle('nav-open', !exp);
          navWrapper.closest('header')?.classList.toggle('nav-open', !exp);
          if (!exp) navWrapper.style.backgroundColor = '';
        }
      } else if (!isDesktop.matches && li.classList.contains('nav-drop')) {
        e.preventDefault();
        li.classList.toggle('nav-mobile-expanded');
      } else if (label.dataset.href) {
        window.location.href = label.dataset.href;
      }
    });

    navList.appendChild(li);
  });

  wrapper.textContent = '';
  wrapper.appendChild(navList);
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : `${getContentRoot()}/nav`;
  const fragment = await loadFragment(navPath);

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  const sections = nav.querySelectorAll(':scope > .section');
  classes.forEach((c, i) => {
    const section = sections[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    buildNavFromHeadings(navSections);
  }

  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  const announcement = document.querySelector('.announcement-bar-container');
  if (announcement) {
    const updateNavOffset = () => {
      const { bottom } = announcement.getBoundingClientRect();
      navWrapper.style.setProperty('--nav-top-offset', `${Math.max(0, bottom)}px`);
    };
    updateNavOffset();
    window.addEventListener('scroll', updateNavOffset, { passive: true });
  }

  // Fade header bg from gradient start color to white over first 600px of scroll
  if (isDesktop.matches) {
    const start = [220, 238, 235];
    const end = [255, 255, 255];
    const fadeDistance = 600;
    const updateHeaderBg = () => {
      if (navWrapper.classList.contains('nav-open')) return;
      const t = Math.min(window.scrollY / fadeDistance, 1);
      const r = Math.round(start[0] + (end[0] - start[0]) * t);
      const g = Math.round(start[1] + (end[1] - start[1]) * t);
      const b = Math.round(start[2] + (end[2] - start[2]) * t);
      navWrapper.style.backgroundColor = `rgb(${r} ${g} ${b})`;
    };
    updateHeaderBg();
    window.addEventListener('scroll', updateHeaderBg, { passive: true });
  }
}
