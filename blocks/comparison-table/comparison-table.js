// Comparison table block — the spec matrix on /vs/<competitor>/ pages.
// Authored rows are either:
//   • a category group header — 1 cell, OR 3 cells with the 2nd/3rd empty (e.g. "Technical SEO")
//   • the column header row — feature label + "Semrush" + competitor (detected by 2nd cell text)
//   • a feature row — feature name + Semrush value + competitor value
// Values "Yes"/"No" become ✓/✗ glyphs; other text (counts, prices, partial support) passes through.
// The Semrush (middle) column is marked so CSS can highlight it (gist B2 — the one purple column).

function isEmpty(cell) {
  return !cell || cell.textContent.trim() === '';
}

export default function decorate(block) {
  const rows = [...block.children];
  let columnHeaderSeen = false;

  rows.forEach((row) => {
    const cells = [...row.children];

    // Group header: single cell, or a 3-cell row whose value cells are empty.
    const isGroup = cells.length === 1
      || (cells.length === 3 && isEmpty(cells[1]) && isEmpty(cells[2]));

    if (isGroup) {
      row.className = 'comparison-row comparison-group';
      const label = cells[0];
      label.className = 'comparison-group-label';
      // Keep a purple spacer in the Semrush column so the highlight band stays continuous
      // behind group rows (matches the original); drop the competitor cell.
      const spacer = cells[1] || document.createElement('div');
      spacer.className = 'comparison-cell comparison-own comparison-group-spacer';
      spacer.textContent = '';
      if (cells[2]) cells[2].remove();
      // ensure exactly: [label, spacer]
      if (!cells[1]) row.append(spacer);
      return;
    }

    // Column header row: the first non-group 3-cell row whose value cells are short brand
    // labels (not Yes/No glyphs, not empty). Covers both "Semrush" (/vs/ pages) and other
    // own-column names like "Content Hub" (/content-hub/vs-* pages) without a brittle name match.
    const v1 = (cells[1].textContent || '').trim();
    const v2 = ((cells[2] && cells[2].textContent) || '').trim();
    const isHeader = !columnHeaderSeen
      && cells.length === 3
      && v1 !== '' && v2 !== ''
      && !/^(yes|no)$/i.test(v1) && !/^(yes|no)$/i.test(v2);

    if (isHeader) {
      columnHeaderSeen = true;
      row.className = 'comparison-row comparison-head';
    } else {
      row.className = 'comparison-row';
    }

    cells.forEach((cell, i) => {
      cell.classList.add('comparison-cell');
      if (i === 0) cell.classList.add('comparison-feature');
      if (i === 1) cell.classList.add('comparison-own'); // Semrush — the highlighted column
      if (i === 2) cell.classList.add('comparison-other'); // competitor

      // Map Yes/No value cells to glyphs (only on data rows, not the header).
      if (i > 0 && !isHeader) {
        // A value cell may be authored two ways:
        //   • bare "Yes"/"No"            → glyph only (the modern moz/ahrefs pages)
        //   • "Yes"/"No" + a description → glyph ABOVE a caption paragraph (legacy /vs/* pages
        //     carry an explanatory sentence per cell, e.g. "Generates SEO-rich articles…").
        // Detect the leading Yes/No either as the whole text OR as the first paragraph.
        const paras = [...cell.querySelectorAll(':scope > p')];
        const firstText = (paras[0] ? paras[0].textContent : cell.textContent).trim();
        const glyphMatch = /^(Yes|No)$/i.exec(firstText);
        const v = cell.textContent.trim();

        if (glyphMatch && (v === 'Yes' || v === 'No')) {
          // Bare glyph cell — unchanged from before (keeps moz/ahrefs byte-rendering).
          const yes = /^yes$/i.test(v);
          cell.classList.add(yes ? 'is-yes' : 'is-no');
          cell.textContent = '';
          const glyph = document.createElement('span');
          glyph.className = 'comparison-glyph';
          glyph.setAttribute('aria-label', yes ? 'Yes' : 'No');
          glyph.setAttribute('role', 'img');
          cell.append(glyph);
        } else if (glyphMatch && paras.length >= 2) {
          // Glyph + caption: first paragraph is "Yes"/"No", the rest is the description.
          const yes = /^yes$/i.test(firstText);
          cell.classList.add(yes ? 'is-yes' : 'is-no', 'comparison-has-caption');
          const glyph = document.createElement('span');
          glyph.className = 'comparison-glyph';
          glyph.setAttribute('aria-label', yes ? 'Yes' : 'No');
          glyph.setAttribute('role', 'img');
          paras[0].replaceWith(glyph); // swap the "Yes"/"No" word for the glyph
          paras.slice(1).forEach((p) => p.classList.add('comparison-caption'));
        } else if (v) {
          cell.classList.add('comparison-text'); // counts/prices/partial-support text
        }
      }
    });
  });
}
