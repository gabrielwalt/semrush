export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cell = row.firstElementChild;
    if (!cell) return;

    const img = cell.querySelector('img');
    const stats = cell.querySelectorAll('p');

    if (img && !stats.length) {
      // Video thumbnail row
      row.classList.add('case-study-video');
      const picture = img.closest('picture') || img;
      const wrapper = document.createElement('div');
      wrapper.className = 'case-study-video-wrapper';
      const playBtn = document.createElement('button');
      playBtn.className = 'case-study-play';
      playBtn.setAttribute('aria-label', 'Play video');
      playBtn.type = 'button';
      wrapper.appendChild(picture.cloneNode(true));
      wrapper.appendChild(playBtn);
      cell.replaceWith(wrapper);
    } else if (stats.length) {
      // Stats row
      row.classList.add('case-study-stats');
      const grid = document.createElement('div');
      grid.className = 'case-study-stats-grid';
      stats.forEach((p) => {
        const strong = p.querySelector('strong');
        if (!strong) return;
        const stat = document.createElement('div');
        stat.className = 'case-study-stat';
        const num = document.createElement('p');
        num.className = 'case-study-stat-number';
        num.textContent = strong.textContent.trim();
        const label = document.createElement('p');
        label.className = 'case-study-stat-label';
        label.textContent = p.textContent.replace(strong.textContent, '').trim();
        stat.appendChild(num);
        stat.appendChild(label);
        grid.appendChild(stat);
      });
      cell.replaceWith(grid);
    }
  });
}
