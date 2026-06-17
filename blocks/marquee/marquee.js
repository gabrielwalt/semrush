export default async function decorate(block) {
  const wrapper = block.closest('.marquee-wrapper');
  if (wrapper) wrapper.style.overflow = 'hidden';

  const row = block.querySelector(':scope > div');
  if (!row) return;

  const cell = row.querySelector(':scope > div');
  if (!cell) return;

  // Pictures plus any loose <img> not already wrapped in a <picture> (avoids
  // double-counting an img inside its picture).
  const items = [...cell.querySelectorAll('picture, img:not(picture img)')];

  if (!items.length) return;

  row.textContent = '';
  row.classList.add('marquee-track');
  items.forEach((item) => row.appendChild(item));

  const clone = row.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  block.appendChild(clone);
}
