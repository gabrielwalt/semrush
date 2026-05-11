/* global WebImporter */
export default function parse(element, { document }) {
  const text = element.querySelector('.srf_announcement_banner__long')?.textContent
    || element.textContent.trim();

  const a = document.createElement('a');
  a.href = element.href || element.querySelector('a')?.href || '';
  a.textContent = text;

  const p = document.createElement('p');
  p.appendChild(a);

  const cells = [['Announcement Bar'], [p]];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
