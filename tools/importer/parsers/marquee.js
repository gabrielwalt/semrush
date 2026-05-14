/* global WebImporter */
export default function parse(element, { document }) {
  // Get only the first group of logos (second is a duplicate for animation)
  const firstGroup = element.querySelector('.mp-logo-marquee__group, ul');
  if (!firstGroup) return;

  const logos = firstGroup.querySelectorAll('img');
  if (logos.length === 0) return;

  const content = document.createElement('div');
  logos.forEach((img) => {
    const p = document.createElement('p');
    const picture = document.createElement('picture');
    const imgEl = document.createElement('img');
    const source = img.closest('picture')?.querySelector('source[srcset]');
    const src = source?.getAttribute('srcset') || img.getAttribute('src') || '';
    imgEl.src = src.startsWith('/') ? `https://www.semrush.com${src}` : src;
    imgEl.alt = img.alt || '';
    picture.appendChild(imgEl);
    p.appendChild(picture);
    content.appendChild(p);
  });

  const cells = [['Marquee'], [content]];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
