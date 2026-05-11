export default async function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const cell = row.querySelector(':scope > div');
  if (!cell) return;

  const links = cell.querySelectorAll('a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"]');
  const img = cell.querySelector('img');
  const existingVideo = cell.querySelector('video');

  const wrapper = document.createElement('div');
  wrapper.className = 'hero-video-frame glass-surface';

  if (existingVideo) {
    existingVideo.setAttribute('playsinline', '');
    existingVideo.muted = true;
    existingVideo.loop = true;
    existingVideo.autoplay = true;
    existingVideo.className = 'hero-video-player';
    wrapper.appendChild(existingVideo);
  } else if (links.length > 0) {
    // Show poster image immediately for performance
    if (img) {
      img.loading = 'eager';
      img.className = 'hero-video-player';
      const picture = img.closest('picture') || img;
      wrapper.appendChild(picture);
    }

    // Build and swap in video after page load
    const buildVideo = () => {
      const video = document.createElement('video');
      video.setAttribute('playsinline', '');
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.className = 'hero-video-player';
      if (img) {
        video.poster = img.src;
        if (img.alt) video.setAttribute('aria-label', img.alt);
      }

      links.forEach((link) => {
        const source = document.createElement('source');
        source.src = link.href;
        const ext = link.href.split('.').pop();
        source.type = `video/${ext}`;
        video.appendChild(source);
      });

      const poster = wrapper.querySelector('.hero-video-player');
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
    }
  } else if (img) {
    img.loading = 'eager';
    img.className = 'hero-video-player';
    const picture = img.closest('picture') || img;
    wrapper.appendChild(picture);
  }

  block.textContent = '';
  block.appendChild(wrapper);
}
