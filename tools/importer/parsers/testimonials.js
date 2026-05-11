/* global WebImporter */
export default function parse(element, { document }) {
  const sectionSubtitle = element.querySelector('h3');
  const logoImg = element.querySelector('.mp-client-testimonials__logo-img img');
  const quote = element.querySelector('blockquote, .mp-client-testimonials__quote');
  const authorImg = element.querySelector('.mp-client-testimonials__author-img, .mp-client-testimonials__quote-author-img img');
  const authorCite = element.querySelector('.mp-client-testimonials__quote-author cite');
  const authorName = authorCite ? authorCite.querySelector('b') : null;
  const authorRole = authorCite ? authorCite.querySelector('span') : null;
  const statNumber = element.querySelector('.mp-client-testimonials__stats-block-number');
  const statText = element.querySelector('.mp-client-testimonials__stats-block-text');

  const rows = [['Testimonials']];

  // Row 1: heading
  const headingCell = document.createElement('div');
  const eyebrow = document.createElement('p');
  eyebrow.textContent = 'Our customers';
  headingCell.appendChild(eyebrow);
  if (sectionSubtitle) {
    const h2 = document.createElement('h2');
    h2.textContent = sectionSubtitle.textContent.trim();
    headingCell.appendChild(h2);
  }
  rows.push([headingCell]);

  // Row 2: logo + quote
  const quoteCell = document.createElement('div');
  if (logoImg) {
    const pic = document.createElement('picture');
    const img = document.createElement('img');
    img.src = logoImg.src;
    img.alt = logoImg.alt || 'Zoominfo';
    pic.appendChild(img);
    quoteCell.appendChild(pic);
  }
  if (quote) {
    const bq = document.createElement('blockquote');
    bq.textContent = quote.textContent.trim();
    quoteCell.appendChild(bq);
  }
  rows.push([quoteCell]);

  // Row 3: author image + name + title
  const authorCell = document.createElement('div');
  if (authorImg) {
    const pic = document.createElement('picture');
    const img = document.createElement('img');
    img.src = authorImg.src || authorImg.querySelector?.('img')?.src || '';
    img.alt = authorName ? authorName.textContent.trim() : 'James Roth';
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

  // Row 4: stat
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
  element.replaceWith(table);
}
