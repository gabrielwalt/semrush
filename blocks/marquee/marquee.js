// Infinite-scroll logo marquee with cloned track for seamless loop
export default async function decorate(block) {
  const wrapper = block.closest('.marquee-wrapper');
  if (wrapper) wrapper.style.overflow = 'hidden';

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
    } else if (el.querySelector('img')) {
      items.push(el.querySelector('img'));
    } else if (el.textContent.trim()) {
      items.push(el);
    }
  });

  items.forEach((item) => {
    const img = item.tagName === 'IMG' ? item : item.querySelector('img');
    if (img && (img.src.includes('about:error') || img.src.includes('about:blank'))) {
      const slug = (img.alt || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (slug) img.src = `/content/images/${slug}-logo.svg`;
    }
  });

  row.textContent = '';
  row.classList.add('marquee-track');
  items.forEach((item) => row.appendChild(item));

  const clone = row.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  block.appendChild(clone);
}
