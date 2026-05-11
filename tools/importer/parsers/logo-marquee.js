/* global WebImporter */
export default function parse(element, { document }) {
  // Get only the first group of logos (second is a duplicate for animation)
  const firstGroup = element.querySelector('.mp-logo-marquee__group');
  if (!firstGroup) return;

  const logos = firstGroup.querySelectorAll('img');
  if (logos.length === 0) return;

  const content = document.createElement('div');
  logos.forEach((img) => {
    const picture = document.createElement('picture');
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt || '';
    picture.appendChild(imgEl);
    content.appendChild(picture);
  });

  const cells = [['Logo Marquee'], [content]];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
