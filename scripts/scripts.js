import {
  loadHeader,
  loadFooter,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
} from './aem.js';
import decorateTabsSections from './section-tabs.js';

export function getContentRoot() {
  const { pathname } = window.location;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 1) {
    return `/${segments.slice(0, -1).join('/')}`;
  }
  return '';
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Inlines repo-hosted SVGs referenced from authored content.
 *
 * Large SVGs can't live in the document (DA/html2md rejects oversized images during
 * validation), so they're committed to the code repo under `/svg/` and referenced from
 * content with a plain link to the file. This converts every such link into an <img>
 * (wrapped in <picture>, matching EDS's image shape) so blocks that scan for `picture, img`
 * keep working. Generic + block-agnostic: runs on the whole `main`, works anywhere.
 *
 * Authoring syntax (deliberately minimal): a normal link whose href is an `.svg` path under
 * `/svg/`. The link TEXT becomes the alt. Examples:
 *   /svg/graph-1.svg            → <img src="<codeBase>/svg/graph-1.svg" alt="">
 *   [Own every result](/svg/graph-1.svg) → alt="Own every result"
 * @param {Element} main The container element
 */
function decorateSvgReferences(main) {
  main.querySelectorAll('a[href]').forEach((a) => {
    let path;
    try {
      path = new URL(a.href, window.location.href).pathname;
    } catch {
      return;
    }
    // Only our repo SVG convention: a path under /svg/ ending in .svg.
    if (!/\/svg\/[^/]+\.svg$/i.test(path)) return;

    const alt = a.textContent.trim();
    // Skip when the link text is itself the URL (EDS's media-link display form): no alt then.
    const altText = (() => {
      try { return new URL(alt, window.location.href).pathname === path ? '' : alt; } catch { return alt; }
    })();

    const img = document.createElement('img');
    img.src = `${window.hlx.codeBasePath}${path}`;
    img.alt = altText;
    img.loading = 'lazy';
    const picture = document.createElement('picture');
    picture.append(img);

    // Replace the link in place. If the link was the sole content of its <p>, swap the <p>
    // too so we don't leave an empty paragraph wrapper around the image.
    const p = a.closest('p');
    if (p && p.textContent.trim() === alt && !p.querySelector(':scope > :not(a)')) {
      p.replaceWith(picture);
    } else {
      a.replaceWith(picture);
    }
  });
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    // auto load `*/fragments/*` references
    const fragments = [...main.querySelectorAll('a[href*="/fragments/"]')].filter((f) => !f.closest('.fragment'));
    if (fragments.length > 0) {
      // eslint-disable-next-line import/no-cycle
      import('../blocks/fragment/fragment.js').then(({ loadFragment }) => {
        fragments.forEach(async (fragment) => {
          try {
            const { pathname } = new URL(fragment.href);
            const frag = await loadFragment(pathname);
            fragment.parentElement.replaceWith(...frag.children);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Fragment loading failed', error);
          }
        });
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates formatted links to style them as buttons.
 * @param {HTMLElement} main The main container element
 */
function decorateButtons(main) {
  main.querySelectorAll('p a[href]').forEach((a) => {
    a.title = a.title || a.textContent;
    const p = a.closest('p');
    const text = a.textContent.trim();

    // quick structural checks
    if (a.querySelector('img') || p.textContent.trim() !== text) return;

    // skip URL display links
    try {
      if (new URL(a.href).href === new URL(text, window.location).href) return;
    } catch { /* continue */ }

    // require authored formatting for buttonization
    const strong = a.closest('strong') || a.querySelector(':scope > strong');
    const em = a.closest('em') || a.querySelector(':scope > em');
    if (!strong && !em) return;

    p.className = 'button-wrapper';
    a.className = 'button';
    if (strong && em) { // high-impact call-to-action
      a.classList.add('accent');
      const outer = a.closest('strong') || a.closest('em');
      if (outer) outer.replaceWith(a);
      else a.replaceChildren(a.textContent);
    } else if (strong) {
      a.classList.add('primary');
      const outer = a.closest('strong');
      if (outer) outer.replaceWith(a);
      else a.replaceChildren(a.textContent);
    } else {
      a.classList.add('secondary');
      const outer = a.closest('em');
      if (outer) outer.replaceWith(a);
      else a.replaceChildren(a.textContent);
    }
  });
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  decorateIcons(main);
  decorateSvgReferences(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
  decorateButtons(main);
  decorateTabsSections(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  // `template-default` is the marketing-chrome base class: it carries the marketing page
  // gradient and any future marketing-wide styling. EVERY marketing-chrome page gets it
  // (homepage, /one/, feature, comparison, …) so app-shell + careers chromes can opt out
  // by simply not having it. The page's specific template class stacks on top.
  // Homepage styling is driven by the authored `template: template-default,
  // template-oneoff-homepage` metadata (applied by decorateTemplateAndTheme). Fallback: if a
  // page carries the insights-widget but lacks the metadata, apply the classes anyway.
  if (doc.querySelector('.insights-widget, main .insights-widget')) {
    document.body.classList.add('template-default', 'template-oneoff-homepage');
  }
  // Semrush One styling: the page-wide gradient (fading to white past the hero) lives on the
  // template, so the hero teaser shows no box of its own. /one/ overrides the marketing
  // gradient with its own but is still a marketing page → carries template-default too.
  // Fallback when metadata is absent: the testimonials-oneoff-one block is unique to /one/.
  if (doc.querySelector('.testimonials-oneoff-one')) {
    document.body.classList.add('template-default', 'template-one');
  }
  // Enterprise (enterprise.semrush.com root) styling lives on its stacked template
  // (template-dark + template-enterprise). It overrides main's background to dark, so it
  // does NOT carry template-default (its surface is not the marketing gradient). Fallback
  // when the metadata is absent: the enterprise-platform teaser variant is unique to that page.
  if (doc.querySelector('.teaser-oneoff-enterprise-platform')) {
    document.body.classList.add('template-dark', 'template-enterprise');
  }
  // Feature landing pages (/features/<tool>/) — marketing chrome, inherit the gradient.
  // Fallback when metadata is absent: the cards-icon-tools variant is unique to this template.
  if (doc.querySelector('.cards-icon-tools')) {
    document.body.classList.add('template-default', 'template-feature');
  }
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);

    // move announcement-bar above the header
    const announcementSection = main.querySelector('.announcement-bar-container');
    if (announcementSection) {
      const header = doc.querySelector('header');
      if (header) header.before(announcementSection);
      await loadSection(announcementSection);
    }

    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  loadHeader(doc.querySelector('header'));

  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();

  // Scroll & data animations (dynamic-brand layer). Loaded after sections so every block is
  // decorated; self-guards on prefers-reduced-motion and never gates content visibility.
  try {
    const { default: initScrollAnimations } = await import('./scroll-animations.js');
    initScrollAnimations(main);
  } catch (e) {
    // animations are enhancement-only; never block the page on them
  }
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
