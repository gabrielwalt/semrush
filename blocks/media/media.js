import getVideoSources from '../../scripts/video-utils.js';

export default async function decorate(block) {
  block.closest('.media-wrapper')?.classList.add('full-width');

  const row = block.querySelector(':scope > div');
  if (!row) return;

  const cell = row.querySelector(':scope > div');
  if (!cell) return;

  const img = cell.querySelector('img');
  const existingVideo = cell.querySelector('video');
  const sources = getVideoSources(cell);

  const wrapper = document.createElement('div');
  wrapper.className = 'media-frame glass-surface';

  if (existingVideo) {
    existingVideo.setAttribute('playsinline', '');
    existingVideo.muted = true;
    existingVideo.loop = true;
    existingVideo.autoplay = true;
    existingVideo.className = 'media-player';
    wrapper.appendChild(existingVideo);
  } else if (sources.length > 0) {
    // Show poster image immediately for performance
    if (img) {
      img.loading = 'eager';
      img.className = 'media-player';
      const picture = img.closest('picture') || img;
      wrapper.appendChild(picture);
    }

    const buildVideo = () => {
      const video = document.createElement('video');
      video.setAttribute('playsinline', '');
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.className = 'media-player';
      if (img) {
        video.poster = img.src;
        if (img.alt) video.setAttribute('aria-label', img.alt);
      }

      sources.forEach(({ src, type }) => {
        const source = document.createElement('source');
        source.src = src;
        source.type = type;
        video.appendChild(source);
      });

      const poster = wrapper.querySelector('.media-player');
      if (poster) poster.replaceWith(video);
      else wrapper.appendChild(video);

      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq.matches) {
        video.pause();
        video.removeAttribute('autoplay');
      }
      mq.addEventListener('change', (e) => {
        if (e.matches) video.pause();
        else video.play();
      });
    };

    if (document.readyState === 'complete') {
      buildVideo();
    } else {
      window.addEventListener('load', buildVideo, { once: true });
      setTimeout(() => { if (!wrapper.querySelector('video')) buildVideo(); }, 4000);
    }
  } else if (img) {
    img.loading = 'eager';
    img.className = 'media-player';
    const picture = img.closest('picture') || img;
    wrapper.appendChild(picture);
  }

  block.textContent = '';
  block.appendChild(wrapper);
}
