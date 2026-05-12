export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 3) return;

  // Row 0: header (icon + text)
  const headerRow = rows[0];
  const headerCells = [...headerRow.children];
  headerRow.className = 'ai-visibility-index-header';

  // Get icon from first cell, text from second
  const iconCell = headerCells[0];
  const textCell = headerCells[1];
  headerRow.innerHTML = '';
  let icon = iconCell.querySelector('img');
  if (!icon && !iconCell.textContent.trim()) {
    icon = document.createElement('img');
    icon.src = '/icons/ai-visibility-index.svg';
    icon.alt = '';
    icon.loading = 'lazy';
  }
  if (icon) headerRow.appendChild(icon);
  headerRow.append(...textCell.children);

  // Row 1: table column headers (Brand | % Share of Voice)
  const colHeaderRow = rows[1];
  const colHeaders = [...colHeaderRow.children].map((c) => c.textContent.trim());

  // Build table container
  const tableDiv = document.createElement('div');
  tableDiv.className = 'ai-visibility-index-table';

  // Table header
  const tableHeader = document.createElement('div');
  tableHeader.className = 'ai-visibility-index-table-header';

  const labels = document.createElement('div');
  labels.className = 'table-labels';
  colHeaders.forEach((label) => {
    const span = document.createElement('span');
    span.textContent = label;
    labels.appendChild(span);
  });
  tableHeader.appendChild(labels);

  const platform = document.createElement('span');
  platform.className = 'table-platform';
  platform.textContent = 'AI Platform: ChatGPT, April 2026';
  tableHeader.appendChild(platform);

  tableDiv.appendChild(tableHeader);

  // Collect data rows and find max value for proportional bars
  const dataItems = [];
  for (let i = 2; i < rows.length; i += 1) {
    const cells = [...rows[i].children];
    const brand = cells[0]?.textContent.trim();
    const valueStr = cells[1]?.textContent.trim() || '0';
    const [value, barPct] = valueStr.split('|');
    dataItems.push({ brand, value: value.trim(), barPct: barPct?.trim() });
  }

  const maxValue = Math.max(...dataItems.map((d) => parseFloat(d.value) || 0));

  dataItems.forEach(({ brand, value, barPct }) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'ai-visibility-index-row';

    const brandSpan = document.createElement('span');
    brandSpan.className = 'brand-name';
    brandSpan.textContent = brand;

    const sovContainer = document.createElement('div');
    sovContainer.className = 'sov-container';

    const sovValue = document.createElement('span');
    sovValue.className = 'sov-value';
    sovValue.textContent = value;

    const barTrack = document.createElement('div');
    barTrack.className = 'bar-track';

    const barFill = document.createElement('div');
    barFill.className = 'bar-fill';
    const pct = barPct || (maxValue > 0 ? Math.round((parseFloat(value) / maxValue) * 100) : 0);
    barFill.style.width = `${pct}%`;

    barTrack.appendChild(barFill);
    sovContainer.appendChild(sovValue);
    sovContainer.appendChild(barTrack);
    rowDiv.appendChild(brandSpan);
    rowDiv.appendChild(sovContainer);
    tableDiv.appendChild(rowDiv);
  });

  // Replace rows 1+ with the table
  for (let i = 1; i < rows.length; i += 1) {
    rows[i].remove();
  }
  block.appendChild(tableDiv);
}
