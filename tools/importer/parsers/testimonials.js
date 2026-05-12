/* global WebImporter */
export default function parse(element, { document }) {
  const sectionH2 = element.querySelector('h2');
  const sectionSubtitle = element.querySelector('h3');
  const quote = element.querySelector('blockquote, .mp-client-testimonials__quote');
  const authorImg = element.querySelector('.mp-client-testimonials__author-img, .mp-client-testimonials__quote-author-img img');
  const authorCite = element.querySelector('.mp-client-testimonials__quote-author cite');
  const authorName = authorCite ? authorCite.querySelector('b') : null;
  const statNumber = element.querySelector('.mp-client-testimonials__stats-block-number');
  const statText = element.querySelector('.mp-client-testimonials__stats-block-text');

  const wrapper = document.createElement('div');

  // Default content: eyebrow + title
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

  const rows = [['Testimonials']];

  // Row 1: quote
  const quoteCell = document.createElement('div');
  if (quote) {
    const bq = document.createElement('blockquote');
    bq.textContent = quote.textContent.trim();
    quoteCell.appendChild(bq);
  }
  rows.push([quoteCell]);

  // Row 2: author image + name + title
  const authorCell = document.createElement('div');
  if (authorImg) {
    const pic = document.createElement('picture');
    const img = document.createElement('img');
    img.src = authorImg.src || authorImg.querySelector?.('img')?.src || '';
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
