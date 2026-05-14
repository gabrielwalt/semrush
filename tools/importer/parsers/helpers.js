/* global WebImporter */

/**
 * Wraps a CTA link in the correct EDS button markup.
 * Outline/ghost/secondary buttons → <em><a> (secondary)
 * All others → <strong><a> (primary)
 */
export function wrapCta(ctaLink, document) {
  const p = document.createElement('p');
  const a = document.createElement('a');
  a.href = ctaLink.href;
  a.textContent = ctaLink.textContent.trim();
  const isOutline = ctaLink.classList.contains('mp-button--outline')
    || ctaLink.classList.contains('mp-button--ghost')
    || ctaLink.classList.contains('mp-button--secondary');
  if (isOutline) {
    const em = document.createElement('em');
    em.appendChild(a);
    p.appendChild(em);
  } else {
    const strong = document.createElement('strong');
    strong.appendChild(a);
    p.appendChild(strong);
  }
  return p;
}

/**
 * Creates a video link element with a relative EDS-style slug as the href
 * and the full URL as textContent. Relative href avoids CORB on aem.page.
 */
export function createVideoLink(fullUrl, document) {
  const p = document.createElement('p');
  const a = document.createElement('a');
  try {
    const url = new URL(fullUrl);
    const slug = url.pathname.replace(/[_.]/g, '-').replace(/\/$/, '');
    a.href = slug;
  } catch (e) {
    a.href = fullUrl;
  }
  a.textContent = fullUrl;
  p.appendChild(a);
  return p;
}

/**
 * Wraps an img element in a <picture> tag (required by EDS media pipeline).
 * Returns the <picture> element.
 */
export function wrapInPicture(imgEl, document) {
  const pic = document.createElement('picture');
  pic.appendChild(imgEl);
  return pic;
}

/**
 * Creates a <picture><img> element from a src and alt.
 * Resolves relative paths to absolute using the provided origin.
 */
export function createPicture(src, alt, document, origin = 'https://www.semrush.com') {
  const img = document.createElement('img');
  img.src = src.startsWith('/') ? `${origin}${src}` : src;
  img.alt = alt || '';
  return wrapInPicture(img, document);
}
