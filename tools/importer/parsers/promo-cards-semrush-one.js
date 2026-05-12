/* global WebImporter */
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
    const em = document.createElement('em');
    const a = document.createElement('a');
    a.href = ctaLink.href;
    a.textContent = ctaLink.textContent.trim();
    em.appendChild(a);
    p.appendChild(em);
    textContent.appendChild(p);
  }

  const rows = [['Video Card (video-card-semrush-one)'], [textContent]];

  // Video row: URL link + poster image
  const mediaContent = document.createElement('div');
  if (video) {
    const source = video.querySelector('source[type="video/mp4"]') || video.querySelector('source');
    const videoUrl = source?.src || source?.getAttribute('data-src') || video.src || '';
    if (videoUrl) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      const fullUrl = videoUrl.startsWith('/') ? `https://www.semrush.com${videoUrl}` : videoUrl;
      a.href = fullUrl;
      a.textContent = fullUrl;
      p.appendChild(a);
      mediaContent.appendChild(p);
    }
    if (video.poster) {
      const p = document.createElement('p');
      const pic = document.createElement('picture');
      const img = document.createElement('img');
      img.src = video.poster;
      img.alt = 'Semrush One platform';
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
