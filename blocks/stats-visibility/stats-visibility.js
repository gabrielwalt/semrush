export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  // Row 0: table column headers (Brand | % Share of Voice | optional platform info)
  const colHeaderRow = rows[0];
  const headerCells = [...colHeaderRow.children].map((c) => c.textContent.trim());
  const colHeaders = headerCells.slice(0, 2);
  const platformText = headerCells[2] || '';

  // Build table container
  const tableDiv = document.createElement('div');
  tableDiv.className = 'stats-visibility-table';

  // Table header
  const tableHeader = document.createElement('div');
  tableHeader.className = 'stats-visibility-table-header';

  const labels = document.createElement('div');
  labels.className = 'table-labels';
  colHeaders.forEach((label) => {
    const span = document.createElement('span');
    span.textContent = label;
    labels.appendChild(span);
  });
  tableHeader.appendChild(labels);

  if (platformText) {
    const platform = document.createElement('span');
    platform.className = 'table-platform';
    platform.textContent = platformText;
    tableHeader.appendChild(platform);
  }

  tableDiv.appendChild(tableHeader);

  // Collect data rows and find max value for proportional bars
  const dataItems = [];
  for (let i = 1; i < rows.length; i += 1) {
    const cells = [...rows[i].children];
    const brand = cells[0]?.textContent.trim();
    const valueStr = cells[1]?.textContent.trim() || '0';
    const [value, barPct] = valueStr.split('|');
    dataItems.push({ brand, value: value.trim(), barPct: barPct?.trim() });
  }

  const maxValue = Math.max(...dataItems.map((d) => parseFloat(d.value) || 0));

  dataItems.forEach(({ brand, value, barPct }, index) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = `stats-visibility-row ${index % 2 === 0 ? 'bar-cyan' : 'bar-purple'}`;

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

  // Replace all rows with the table
  rows.forEach((row) => row.remove());
  block.appendChild(tableDiv);
}
