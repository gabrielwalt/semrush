/* global WebImporter */

function createVideoLink(fullUrl, document) {
  const p = document.createElement('p');
  const a = document.createElement('a');
  try {
    const url = new URL(fullUrl);
    a.href = url.pathname.replace(/[_.]/g, '-').replace(/\/$/, '');
  } catch (e) {
    a.href = fullUrl;
  }
  a.textContent = fullUrl;
  p.appendChild(a);
  return p;
}

export default function parse(element, { document }) {
  const h2 = element.querySelector('h2');
  const description = element.querySelector('.mp-promo-cards__text, p:not([class*="button"])');
  const ctaLink = element.querySelector('a.mp-button');
  const video = element.querySelector('video');

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
    const isOutline = ctaLink.classList.contains('mp-button--outline')
      || ctaLink.classList.contains('mp-button--ghost')
      || ctaLink.classList.contains('mp-button--secondary');
    const wrapper = isOutline ? document.createElement('em') : document.createElement('strong');
    const a = document.createElement('a');
    a.href = ctaLink.href;
    a.textContent = ctaLink.textContent.trim();
    wrapper.appendChild(a);
    p.appendChild(wrapper);
    textContent.appendChild(p);
  }

  const rows = [['Video Card (video-card-semrush-one)'], [textContent]];

  const mediaContent = document.createElement('div');
  if (video) {
    const source = video.querySelector('source[type="video/mp4"]') || video.querySelector('source');
    const videoUrl = source ? (source.getAttribute('src') || source.getAttribute('data-src') || '') : (video.getAttribute('src') || '');
    if (videoUrl) {
      const fullUrl = videoUrl.startsWith('/') ? `https://www.semrush.com${videoUrl}` : videoUrl;
      mediaContent.appendChild(createVideoLink(fullUrl, document));
    }
    const posterSrc = video.getAttribute('poster') || '';
    if (posterSrc) {
      const p = document.createElement('p');
      const pic = document.createElement('picture');
      const img = document.createElement('img');
      img.src = posterSrc.startsWith('/') ? `https://www.semrush.com${posterSrc}` : posterSrc;
      img.alt = video.getAttribute('aria-label') || '';
      pic.appendChild(img);
      p.appendChild(pic);
      mediaContent.appendChild(p);
    }
  }
  if (mediaContent.children.length > 0) {
    rows.push([mediaContent]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
