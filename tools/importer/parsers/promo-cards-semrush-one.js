/* global WebImporter */
export default function parse(element, { document }) {
  const h2 = element.querySelector('h2');
  const description = element.querySelector('.mp-promo-cards__text, p:not([class*="button"])');
  const ctaLink = element.querySelector('a.mp-button');
  const img = element.querySelector('img');

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

  const rows = [['Promo Cards (promo-cards-semrush-one)'], [textContent]];

  if (img) {
    const pic = document.createElement('picture');
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt || 'Semrush One platform preview';
    pic.appendChild(imgEl);
    rows.push([pic]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
