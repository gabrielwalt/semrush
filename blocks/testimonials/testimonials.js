export default async function decorate(block) {
  const rows = [...block.children];

  // Row 0: heading (keep as-is)
  // Row 1: logo image
  // Row 2: quote text
  // Row 3: author image + info
  // Row 4: stats

  const headingRow = rows[0];
  const logoRow = rows[1];
  const quoteRow = rows[2]; // contains blockquote in cell 1
  const authorRow = rows[3];
  const statsRow = rows[4]; // not present in original, row 3 has stats

  // Get logo image
  const logoImg = logoRow ? logoRow.querySelector('img') : null;

  // Get quote
  const quoteCell = logoRow ? logoRow.querySelector('blockquote') || (rows[1] && rows[1].children[1]) : null;

  // Restructure: we have 4 rows from the plain.html
  // Row 0: heading subtitle + h2
  // Row 1: logo image cell | blockquote cell
  // Row 2: author image cell | author info cell
  // Row 3: stats cell

  const logoImgEl = rows[1] ? rows[1].querySelector('img') : null;
  const blockquoteEl = rows[1] ? rows[1].querySelector('blockquote') : null;
  const authorImgEl = rows[2] ? rows[2].querySelector('img') : null;
  const authorInfoCell = rows[2] ? rows[2].children[1] : null;
  const statsCell = rows[3] ? rows[3].children[0] : null;

  // Clear block and rebuild
  block.innerHTML = '';

  // Re-add heading row
  block.appendChild(headingRow);

  // Create layout container
  const layout = document.createElement('div');
  layout.className = 'testimonials-layout';

  // Quote card
  const quoteCard = document.createElement('div');
  quoteCard.className = 'quote-card';

  if (logoImgEl) {
    const logoWrap = document.createElement('div');
    logoWrap.appendChild(logoImgEl);
    quoteCard.appendChild(logoWrap);
  }

  if (blockquoteEl) {
    quoteCard.appendChild(blockquoteEl);
  }

  // Author section
  if (authorImgEl || authorInfoCell) {
    const authorDiv = document.createElement('div');
    authorDiv.className = 'author';

    if (authorImgEl) {
      authorDiv.appendChild(authorImgEl);
    }

    if (authorInfoCell) {
      const authorInfo = document.createElement('div');
      authorInfo.className = 'author-info';
      authorInfo.innerHTML = authorInfoCell.innerHTML;
      authorDiv.appendChild(authorInfo);
    }

    quoteCard.appendChild(authorDiv);
  }

  layout.appendChild(quoteCard);

  // Stats card
  if (statsCell) {
    const statsCard = document.createElement('div');
    statsCard.className = 'stats-card';

    const paragraphs = statsCell.querySelectorAll('p');
    if (paragraphs.length >= 2) {
      const numEl = document.createElement('p');
      numEl.className = 'stats-number';
      numEl.textContent = paragraphs[0].textContent;
      statsCard.appendChild(numEl);

      const textEl = document.createElement('p');
      textEl.className = 'stats-text';
      textEl.textContent = paragraphs[1].textContent;
      statsCard.appendChild(textEl);
    } else {
      statsCard.innerHTML = statsCell.innerHTML;
    }

    layout.appendChild(statsCard);
  }

  block.appendChild(layout);
}
