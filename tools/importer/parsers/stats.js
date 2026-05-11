/* global WebImporter */
export default function parse(element, { document }) {
  const sectionSubtitle = element.querySelector('h3');
  const learnMoreLink = element.querySelector('a[href*="/stats/"]');
  const statItems = element.querySelectorAll('li');

  // Header row: eyebrow + title + CTA
  const headerContent = document.createElement('div');

  const eyebrow = document.createElement('p');
  eyebrow.textContent = 'Stats and facts';
  headerContent.appendChild(eyebrow);

  if (sectionSubtitle) {
    const h2 = document.createElement('h2');
    h2.textContent = sectionSubtitle.textContent.trim();
    headerContent.appendChild(h2);
  }

  if (learnMoreLink) {
    const p = document.createElement('p');
    const em = document.createElement('em');
    const a = document.createElement('a');
    a.href = learnMoreLink.href;
    a.textContent = learnMoreLink.textContent.trim();
    em.appendChild(a);
    p.appendChild(em);
    headerContent.appendChild(p);
  }

  const rows = [['Stats'], [headerContent]];

  statItems.forEach((item) => {
    const countEl = item.querySelector('.mp-stats__item-count, b');
    const titleEl = item.querySelector('.mp-stats__item-title');
    const descEl = item.querySelector('.mp-stats__item-description');

    const value = countEl ? countEl.textContent.trim() : '';
    const title = titleEl ? titleEl.textContent.trim() : '';
    const desc = descEl ? descEl.textContent.trim() : '';

    if (value) {
      const cell = document.createElement('div');
      const pVal = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = value;
      pVal.appendChild(strong);
      cell.appendChild(pVal);

      const pTitle = document.createElement('p');
      pTitle.textContent = title;
      cell.appendChild(pTitle);

      const pDesc = document.createElement('p');
      pDesc.textContent = desc;
      cell.appendChild(pDesc);

      rows.push([cell]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
