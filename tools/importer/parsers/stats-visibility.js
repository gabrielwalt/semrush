/* global WebImporter */
export default function parse(element, { document }) {
  const h2 = element.querySelector('h2');
  const subtitle = element.querySelector('.mp-ai-visibility-index__subtitle, h2 + p');
  const ctaLink = element.querySelector('a.mp-button, a[href*="ai-visibility-index"]');
  const tableRows = element.querySelectorAll('tbody tr, .mp-ai-visibility-index__sov');

  const wrapper = document.createElement('div');

  // Default content: heading + description + CTA
  if (h2) {
    const heading = document.createElement('h2');
    heading.textContent = h2.textContent.trim();
    wrapper.appendChild(heading);
  }
  if (subtitle) {
    const p = document.createElement('p');
    p.textContent = subtitle.textContent.trim();
    wrapper.appendChild(p);
  }
  if (ctaLink) {
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    const a = document.createElement('a');
    a.href = ctaLink.href;
    a.textContent = ctaLink.textContent.trim();
    strong.appendChild(a);
    p.appendChild(strong);
    wrapper.appendChild(p);
  }

  // Block table: column headers + data rows
  const rows = [['Stats Visibility']];

  const headerCellBrand = document.createElement('div');
  headerCellBrand.textContent = 'Brand';
  const headerCellSov = document.createElement('div');
  headerCellSov.textContent = '% Share of Voice';
  rows.push([headerCellBrand, headerCellSov]);

  tableRows.forEach((tr) => {
    const cells = tr.querySelectorAll('td');
    if (cells.length >= 2) {
      const brand = cells[0].textContent.trim();
      const valueEl = cells[1].querySelector('[class*="value"]');
      const value = valueEl ? valueEl.textContent.trim() : cells[1].textContent.trim();

      const brandCell = document.createElement('div');
      brandCell.textContent = brand;
      const valueCell = document.createElement('div');
      valueCell.textContent = value;
      rows.push([brandCell, valueCell]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  wrapper.appendChild(table);

  const sectionMeta = WebImporter.DOMUtils.createTable(
    [['Section Metadata'], ['Style', 'section-dark, section-pattern-bars']],
    document,
  );
  wrapper.appendChild(sectionMeta);

  element.replaceWith(wrapper);
}
