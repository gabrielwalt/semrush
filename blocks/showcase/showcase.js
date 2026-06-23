// Showcase — large frameless image + text rows that alternate sides ("See what you can do").
// Each authored row is one item: a cell holding the screenshot image, an h3 title, body
// paragraphs and a CTA. The block lays each item as a 2-column row; odd items put the image
// on the right, even items on the left (CSS), matching the original's alternating rhythm.
export default function decorate(block) {
  [...block.children].forEach((row, i) => {
    row.classList.add('showcase-item');
    if (i % 2 === 1) row.classList.add('showcase-item-flip');

    const cell = row.querySelector(':scope > div');
    if (!cell) return;

    const media = document.createElement('div');
    media.className = 'showcase-media';
    const pic = cell.querySelector('picture, img');
    if (pic) {
      const picEl = pic.closest('picture') || pic;
      const wrapP = picEl.closest('p');
      media.appendChild(picEl);
      if (wrapP && !wrapP.textContent.trim() && !wrapP.querySelector('img, picture')) wrapP.remove();
    }

    const text = document.createElement('div');
    text.className = 'showcase-text';
    while (cell.firstChild) text.appendChild(cell.firstChild);

    cell.append(media, text);
  });
}
