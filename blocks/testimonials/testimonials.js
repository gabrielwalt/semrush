export default async function decorate(block) {
  const rows = [...block.children];

  // Row 0: quote cell — logo img, blockquote, author img, author name (strong), author role
  // Row 1: stats cell — stat number, stat label
  const quoteRow = rows[0];
  const statsRow = rows[1];

  const quoteCell = quoteRow?.querySelector(':scope > div');
  const statsCell = statsRow?.querySelector(':scope > div');

  const logoImg = quoteCell?.querySelector('img');
  const blockquoteEl = quoteCell?.querySelector('blockquote');

  // Author image is the second image (after logo)
  const allImgs = quoteCell ? [...quoteCell.querySelectorAll('img')] : [];
  const authorImg = allImgs.length > 1 ? allImgs[1] : null;

  // Author name is in <strong>, role is the paragraph after <strong>
  const strongEl = quoteCell?.querySelector('strong');
  const authorName = strongEl?.textContent?.trim();
  const roleParagraphs = quoteCell ? [...quoteCell.querySelectorAll(':scope > p')] : [];
  const roleP = roleParagraphs.find((p) => !p.querySelector('picture') && !p.querySelector('strong') && p.textContent.trim());
  const authorRole = roleP?.textContent?.trim();

  block.innerHTML = '';

  const layout = document.createElement('div');
  layout.className = 'testimonials-layout';

  // Quote card
  const quoteCard = document.createElement('div');
  quoteCard.className = 'quote-card';

  if (logoImg) {
    const logoWrap = document.createElement('div');
    logoWrap.className = 'quote-logo';
    logoWrap.appendChild(logoImg);
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
    }

    layout.appendChild(statsCard);
  }

  block.appendChild(layout);
}
