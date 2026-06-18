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

  // Reduced-motion: skip the scroll-scrub entirely. The block renders in its resting
  // layout with the first row active (the static, accessible fallback).
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // How much scroll each row holds for, as a fraction of the viewport height. Pinning the
  // block over a viewport-scaled runway is what makes the pacing feel deliberate (and tunable)
  // instead of flicking to the next row on a few pixels of scroll. 0.7 → a row advances roughly
  // every 70% of a screen-height of scrolling, so taller viewports require proportionally more.
  const PER_ROW_VH = 0.7;
  const wrapper = block.parentElement;
  let runway = 0;

  // Pin the block centered in the viewport and stretch its wrapper to create the scroll runway.
  // While the wrapper scrolls through `runway` px, the sticky block stays put and the active
  // row advances. Recomputed on resize so the distance always tracks the visitor's viewport.
  function layout() {
    if (reduceMotion.matches) {
      block.style.position = '';
      block.style.top = '';
      wrapper.style.minHeight = '';
      runway = 0;
      activateStat(0);
      return;
    }
    const viewportH = window.innerHeight;
    const blockH = block.offsetHeight;
    runway = viewportH * PER_ROW_VH * statRows.length;
    block.style.position = 'sticky';
    block.style.top = `${Math.max(0, (viewportH - blockH) / 2)}px`;
    wrapper.style.minHeight = `${blockH + runway}px`;
  }

  function onScroll() {
    if (runway <= 0) return;
    const viewportH = window.innerHeight;
    const blockH = block.offsetHeight;
    const pinTop = Math.max(0, (viewportH - blockH) / 2);
    // Distance the wrapper's top has travelled past the pin point (0 → runway).
    const scrolled = pinTop - wrapper.getBoundingClientRect().top;
    const progress = Math.max(0, Math.min(1, scrolled / runway));
    const index = Math.min(statRows.length - 1, Math.floor(progress * statRows.length));
    activateStat(index);
  }

  let ticking = false;
  function onScrollRaf() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }

  layout();
  window.addEventListener('resize', () => { layout(); onScroll(); }, { passive: true });
  reduceMotion.addEventListener('change', () => { layout(); onScroll(); });

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
