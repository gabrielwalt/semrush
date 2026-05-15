/* global WebImporter */
export default function parse(element, { document }) {
  const sectionH2 = element.querySelector('h2');
  const sectionSubtitle = element.querySelector('h3');
  const quote = element.querySelector('blockquote, .mp-client-testimonials__quote');
  const authorImgEl = element.querySelector('.mp-client-testimonials__author-img img, .mp-client-testimonials__quote-author-img img');
  const authorCite = element.querySelector('.mp-client-testimonials__quote-author cite');
  const authorName = authorCite ? authorCite.querySelector('b') : null;
  const authorRole = authorCite ? authorCite.querySelector('span') : null;
  const statNumber = element.querySelector('.mp-client-testimonials__stats-block-number');
  const statText = element.querySelector('.mp-client-testimonials__stats-block-text');

  const wrapper = document.createElement('div');

  if (sectionH2) {
    const eyebrow = document.createElement('p');
    eyebrow.textContent = sectionH2.textContent.trim();
    wrapper.appendChild(eyebrow);
  }
  if (sectionSubtitle) {
    const h2 = document.createElement('h2');
    h2.textContent = sectionSubtitle.textContent.trim();
    wrapper.appendChild(h2);
  }

  const logoImgEl = element.querySelector('img.mp-client-testimonials__logo-img, .mp-client-testimonials__logo img');

  const rows = [['Testimonials']];

  // Row 1: logo + quote
  const quoteCell = document.createElement('div');
  if (logoImgEl) {
    const pic = document.createElement('picture');
    const img = document.createElement('img');
    const logoSrc = logoImgEl.getAttribute('src') || '';
    img.src = logoSrc.startsWith('/') ? `https://www.semrush.com${logoSrc}` : logoSrc;
    img.alt = logoImgEl.alt || '';
    pic.appendChild(img);
    const p = document.createElement('p');
    p.appendChild(pic);
    quoteCell.appendChild(p);
  }
  if (quote) {
    const bq = document.createElement('blockquote');
    bq.textContent = quote.textContent.trim();
    quoteCell.appendChild(bq);
  }
  rows.push([quoteCell]);

  // Row 2: author image + name + role
  const authorCell = document.createElement('div');
  if (authorImgEl) {
    const pic = document.createElement('picture');
    const img = document.createElement('img');
    const src = authorImgEl.getAttribute('src') || '';
    img.src = src.startsWith('/') ? `https://www.semrush.com${src}` : src;
    img.alt = authorName ? authorName.textContent.trim() : '';
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

  // Row 3: stat
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
  wrapper.appendChild(table);
  element.replaceWith(wrapper);
}
