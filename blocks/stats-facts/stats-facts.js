export default async function decorate(block) {
  const statRows = [...block.children];

  function activateStat(idx) {
    statRows.forEach((r) => r.classList.remove('active'));
    if (statRows[idx]) statRows[idx].classList.add('active');
  }

  statRows.forEach((row, index) => {
    row.classList.add('stat-row');
    if (index === 0) row.classList.add('active');

    const cell = row.querySelector(':scope > div');
    const paragraphs = [...cell.querySelectorAll('p')];

    const countP = paragraphs[0];
    const titleP = paragraphs[1];
    const descP = paragraphs[2];

    const countText = countP?.textContent?.trim() || '';
    const titleText = titleP?.textContent?.trim() || '';
    const descText = descP?.textContent?.trim() || '';

    cell.innerHTML = '';

    const numberDiv = document.createElement('div');
    numberDiv.className = 'stat-number';

    const arrow = document.createElement('div');
    arrow.className = 'stat-arrow';
    numberDiv.appendChild(arrow);

    const countWrapper = document.createElement('div');
    countWrapper.className = 'stat-count-wrapper';

    const countSpan = document.createElement('span');
    countSpan.className = 'stat-count';
    countSpan.textContent = countText;
    countWrapper.appendChild(countSpan);

    const titleEl = document.createElement('p');
    titleEl.className = 'stat-title';
    titleEl.textContent = titleText;
    countWrapper.appendChild(titleEl);

    numberDiv.appendChild(countWrapper);
    cell.appendChild(numberDiv);

    const descEl = document.createElement('p');
    descEl.className = 'stat-description';
    descEl.textContent = descText;
    cell.appendChild(descEl);

    row.setAttribute('role', 'button');
    row.setAttribute('tabindex', '0');
    row.addEventListener('click', () => activateStat(index));
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateStat(index);
      }
    });
  });

  // Reduced-motion: don't track scroll — the block renders normally with the first row
  // active (static, accessible fallback).
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // The block scrolls with the page like any content — NOTHING is pinned. As the rows scroll
  // past, whichever row's center is closest to a focal line (the viewport's vertical middle)
  // becomes the active/enlarged one — a vertical "dock magnification" that follows the scroll.
  function onScroll() {
    const focalY = window.innerHeight / 2;
    let bestIdx = 0;
    let bestDist = Infinity;
    statRows.forEach((row, i) => {
      const r = row.getBoundingClientRect();
      const dist = Math.abs((r.top + r.bottom) / 2 - focalY);
      if (dist < bestDist) { bestDist = dist; bestIdx = i; }
    });
    activateStat(bestIdx);
  }

  let ticking = false;
  function onScrollRaf() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !reduceMotion.matches) {
        window.addEventListener('scroll', onScrollRaf, { passive: true });
        onScroll();
      } else {
        window.removeEventListener('scroll', onScrollRaf);
      }
    });
  }, { threshold: 0, rootMargin: '200px 0px 200px 0px' });

  observer.observe(block);
}
