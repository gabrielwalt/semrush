/* global WebImporter */
export default function parse(element, { document }) {
  const h2 = element.querySelector('h2');
  const subtitle = element.querySelector('.mp-ai-visibility-index__subtitle, h2 + p');
  const ctaLink = element.querySelector('a.mp-button, a[href*="ai-visibility-index"]');
  const iconImg = element.querySelector('.mp-ai-visibility-index__img img, img[src*="ai_visibility_index"]');
  const tableRows = element.querySelectorAll('tbody tr, .mp-ai-visibility-index__sov');

  const rows = [['AI Visibility Index']];

  // Row 1: icon + heading + description + CTA
  const headerRow = document.createElement('div');
  const headerText = document.createElement('div');

  if (iconImg) {
    const iconDiv = document.createElement('div');
    const pic = document.createElement('picture');
    const img = document.createElement('img');
    img.src = iconImg.src;
    img.alt = '';
    pic.appendChild(img);
    iconDiv.appendChild(pic);
    headerRow.appendChild(iconDiv);
  }

  if (h2) {
    const heading = document.createElement('h2');
    heading.textContent = h2.textContent.trim();
    headerText.appendChild(heading);
  }
  if (subtitle) {
    const p = document.createElement('p');
    p.textContent = subtitle.textContent.trim();
    headerText.appendChild(p);
  }
  if (ctaLink) {
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    const a = document.createElement('a');
    a.href = ctaLink.href;
    a.textContent = ctaLink.textContent.trim();
    strong.appendChild(a);
    p.appendChild(strong);
    headerText.appendChild(p);
  }

  rows.push([headerRow, headerText]);

  // Row 2: table headers
  const headerCellBrand = document.createElement('div');
  headerCellBrand.textContent = 'Brand';
  const headerCellSov = document.createElement('div');
  headerCellSov.textContent = '% Share of Voice';
  rows.push([headerCellBrand, headerCellSov]);

  // Data rows from the table
  tableRows.forEach((tr) => {
    const cells = tr.querySelectorAll('td');
    if (cells.length >= 2) {
      const brand = cells[0].textContent.trim();
      const valueEl = cells[1].querySelector('[class*="value"]');
      const value = valueEl ? valueEl.textContent.trim() : cells[1].textContent.trim();
      const barEl = cells[1].querySelector('[class*="bar-track"], [style*="width"]');
      const barWidth = barEl ? barEl.style.width?.replace('%', '') : '';

      const brandCell = document.createElement('div');
      brandCell.textContent = brand;
      const valueCell = document.createElement('div');
      valueCell.textContent = barWidth ? `${value}|${barWidth}` : value;
      rows.push([brandCell, valueCell]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
