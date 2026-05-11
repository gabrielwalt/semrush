export default async function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const cell = row.querySelector(':scope > div');
  if (!cell) return;

  const items = [];
  cell.querySelectorAll(':scope > *').forEach((el) => {
    if (el.tagName === 'PICTURE') {
      items.push(el);
    } else if (el.querySelector('picture')) {
      items.push(el.querySelector('picture'));
    } else if (el.textContent.trim()) {
      items.push(el);
    }
  });

  row.textContent = '';
  row.classList.add('marquee-track');
  items.forEach((item) => row.appendChild(item));

  const clone = row.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  block.appendChild(clone);
}
