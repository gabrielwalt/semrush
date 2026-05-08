export default async function decorate(block) {
  const rows = [...block.children];
  const headerRow = rows[0];
  const ctaRow = rows[rows.length - 1];

  // Stat rows are between header and CTA
  const statRows = rows.slice(1, rows.length - 1);

  // Restructure stat rows
  statRows.forEach((row, index) => {
    row.classList.add('stat-row');
    if (index === 0) row.classList.add('active');

    const cell = row.querySelector(':scope > div');
    const paragraphs = [...cell.querySelectorAll('p')];

    // Extract content: first p has the count (in <strong>), second is title, third is description
    const countP = paragraphs[0];
    const titleP = paragraphs[1];
    const descP = paragraphs[2];

    const countText = countP?.textContent?.trim() || '';
    const titleText = titleP?.textContent?.trim() || '';
    const descText = descP?.textContent?.trim() || '';

    // Rebuild the cell structure
    cell.innerHTML = '';

    // Number area with arrow
    const numberDiv = document.createElement('div');
    numberDiv.className = 'stat-number';

    const arrow = document.createElement('div');
    arrow.className = 'stat-arrow';
    numberDiv.appendChild(arrow);

    const countWrapper = document.createElement('div');
    countWrapper.className = 'stat-count-wrapper';

    const countSpan = document.createElement('span');
    countSpan.className = 'stat-count';
    countSpan.textContent = countText;
    countWrapper.appendChild(countSpan);

    const titleEl = document.createElement('p');
    titleEl.className = 'stat-title';
    titleEl.textContent = titleText;
    countWrapper.appendChild(titleEl);

    numberDiv.appendChild(countWrapper);
    cell.appendChild(numberDiv);

    // Description
    const descEl = document.createElement('p');
    descEl.className = 'stat-description';
    descEl.textContent = descText;
    cell.appendChild(descEl);

    // Click handler to toggle active state
    row.addEventListener('click', () => {
      statRows.forEach((r) => r.classList.remove('active'));
      row.classList.add('active');
    });
  });

  // Mark CTA row
  ctaRow.classList.add('stat-cta');
}
