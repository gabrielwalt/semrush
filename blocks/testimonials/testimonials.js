/* Testimonials — dark quote card + grey stats card (homepage) */
export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 1) return;

  // Row 0: optional logo + blockquote, Row 1: author photo + name + role, Row 2: stats
  const quoteRow = rows[0];
  const authorRow = rows[1];
  const statsRow = rows[2];

  const quoteCell = quoteRow?.querySelector(':scope > div');
  const authorCell = authorRow?.querySelector(':scope > div');
  const statsCell = statsRow?.querySelector(':scope > div');

  const logoImg = quoteCell?.querySelector('picture img');
  const blockquoteEl = quoteCell?.querySelector('blockquote');
  const authorImg = authorCell?.querySelector('img');
  const strongEl = authorCell?.querySelector('strong');
  const authorName = strongEl?.textContent?.trim();

  // Use all descendant <p> (not :scope > p) — EDS wrapTextNodes() may wrap the cell's
  // picture+paragraphs in an outer <p>, so the role paragraph is no longer a direct child.
  const authorParagraphs = authorCell ? [...authorCell.querySelectorAll('p')] : [];
  const roleP = authorParagraphs.find((p) => !p.querySelector('picture, strong, p') && p.textContent.trim());
  const authorRole = roleP?.textContent?.trim();

  block.innerHTML = '';

  const layout = document.createElement('div');
  layout.className = 'testimonials-layout';

  const quoteCard = document.createElement('div');
  quoteCard.className = 'quote-card';

  if (logoImg) {
    const logoWrap = document.createElement('div');
    logoWrap.className = 'quote-logo';
    // Reuse the authored <picture> (preserves srcset) instead of rebuilding a bare <img>.
    logoImg.loading = 'lazy';
    logoWrap.appendChild(logoImg.closest('picture') || logoImg);
    quoteCard.appendChild(logoWrap);
  }

  if (blockquoteEl) {
    quoteCard.appendChild(blockquoteEl);
  }

  const authorDiv = document.createElement('div');
  authorDiv.className = 'quote-author';

  if (authorImg) {
    const imgWrap = document.createElement('div');
    imgWrap.className = 'quote-author-img';
    authorImg.style.cssText = '';
    imgWrap.appendChild(authorImg);
    authorDiv.appendChild(imgWrap);
  }

  if (authorName || authorRole) {
    const cite = document.createElement('cite');
    if (authorName) {
      const b = document.createElement('b');
      b.textContent = authorName;
      cite.appendChild(b);
    }
    if (authorRole) {
      const span = document.createElement('span');
      span.textContent = authorRole;
      cite.appendChild(span);
    }
    authorDiv.appendChild(cite);
  }

  quoteCard.appendChild(authorDiv);
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
    }

    layout.appendChild(statsCard);
  }

  block.appendChild(layout);
}
