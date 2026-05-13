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

    row.addEventListener('click', () => activateStat(index));
  });

  function onScroll() {
    const rect = block.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const triggerTop = viewportH * 0.3;
    const sectionVisible = rect.top < triggerTop && rect.bottom > 0;

    if (!sectionVisible) return;

    const scrolled = triggerTop - rect.top;
    const scrollableHeight = rect.height - viewportH * 0.5;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
    const index = Math.min(statRows.length - 1, Math.floor(progress * statRows.length));

    activateStat(index);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    });
  }, { threshold: 0, rootMargin: '200px 0px 200px 0px' });

  observer.observe(block);
}
