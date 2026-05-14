/* global WebImporter */
export default function parse(element, { document }) {
  const longText = element.querySelector('.srf_announcement_banner__long, .srf_top_banner__long');
  const text = longText ? longText.textContent.trim() : element.textContent.trim();

  const linkEl = element.tagName === 'A' ? element : element.querySelector('a');
  const a = document.createElement('a');
  a.href = linkEl?.href || '';
  a.textContent = text;

  const p = document.createElement('p');
  p.appendChild(a);

  const cells = [['Announcement Bar'], [p]];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
