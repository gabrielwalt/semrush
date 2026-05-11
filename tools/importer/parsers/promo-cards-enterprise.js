/* global WebImporter */
export default function parse(element, { document }) {
  const h2 = element.querySelector('h2');
  const description = element.querySelector('.mp-promo-cards__text, p:not([class*="button"])');
  const ctaLink = element.querySelector('a.mp-button');
  const img = element.querySelector('img');

  // Row 1: heading
  const headingContent = document.createElement('div');
  if (h2) {
    const heading = document.createElement('h2');
    heading.innerHTML = h2.innerHTML;
    headingContent.appendChild(heading);
  }

  // Row 2: description + CTA
  const bodyContent = document.createElement('div');
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    bodyContent.appendChild(p);
  }
  if (ctaLink) {
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    const a = document.createElement('a');
    a.href = ctaLink.href;
    a.textContent = ctaLink.textContent.trim();
    strong.appendChild(a);
    p.appendChild(strong);
    bodyContent.appendChild(p);
  }

  const rows = [['Promo Cards (enterprise)'], [headingContent], [bodyContent]];

  if (img) {
    const pic = document.createElement('picture');
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt || 'Enterprise project dashboard';
    pic.appendChild(imgEl);
    rows.push([pic]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
