export default async function decorate(block) {
  const rows = [...block.children];

  // Row 0: blockquote (single cell)
  // Row 1: author image + name + title (single cell)
  // Row 2: stat number + label (single cell)

  const quoteRow = rows[0];
  const authorRow = rows[1];
  const statsRow = rows[2];

  const logoImgEl = quoteRow ? quoteRow.querySelector('img') : null;
  const blockquoteEl = quoteRow ? quoteRow.querySelector('blockquote') : null;
  const authorImgEl = authorRow ? authorRow.querySelector('img') : null;
  const authorParagraphs = authorRow ? [...authorRow.querySelectorAll('p')] : [];
  const statsCell = statsRow ? statsRow.querySelector(':scope > div') : null;

  block.innerHTML = '';

  const layout = document.createElement('div');
  layout.className = 'testimonials-layout';

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

  if (authorImgEl || authorParagraphs.length) {
    const authorDiv = document.createElement('div');
    authorDiv.className = 'author';

    if (authorImgEl) {
      authorDiv.appendChild(authorImgEl);
    }

    if (authorParagraphs.length) {
      const authorInfo = document.createElement('div');
      authorInfo.className = 'author-info';
      authorParagraphs.forEach((p) => authorInfo.appendChild(p));
      authorDiv.appendChild(authorInfo);
    }

    quoteCard.appendChild(authorDiv);
  }

  layout.appendChild(quoteCard);

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
