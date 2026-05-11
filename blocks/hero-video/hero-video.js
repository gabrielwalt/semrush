export default async function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const cell = row.querySelector(':scope > div');
  if (!cell) return;

  const videoEl = cell.querySelector('video');
  const img = cell.querySelector('img');

  const wrapper = document.createElement('div');
  wrapper.className = 'hero-video-frame';

  if (videoEl) {
    videoEl.setAttribute('playsinline', '');
    videoEl.muted = true;
    videoEl.loop = true;
    videoEl.autoplay = true;
    videoEl.className = 'hero-video-player';

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      videoEl.pause();
      videoEl.removeAttribute('autoplay');
    }
    mq.addEventListener('change', (e) => {
      if (e.matches) videoEl.pause();
      else videoEl.play();
    });

    wrapper.appendChild(videoEl);
  } else if (img) {
    img.loading = 'eager';
    img.className = 'hero-video-player';
    const picture = img.closest('picture') || img;
    wrapper.appendChild(picture);
  }

  block.textContent = '';
  block.appendChild(wrapper);
}
