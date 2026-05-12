function getVideoSources(cell) {
  const sources = [];

  // 1. Links with explicit video extension in href
  cell.querySelectorAll('a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"]').forEach((link) => {
    sources.push({ src: link.href, type: `video/${link.href.split('.').pop()}` });
  });

  if (sources.length) return sources;

  // 2. Links whose text content is a video URL (EDS rewrites hrefs for external media)
  cell.querySelectorAll('a').forEach((link) => {
    const text = link.textContent.trim();
    const match = text.match(/\.(mp4|webm|ogg)(\?|$)/);
    if (match) {
      sources.push({ src: text, type: `video/${match[1]}` });
    }
  });

  return sources;
}

export default async function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const cell = row.querySelector(':scope > div');
  if (!cell) return;

  const img = cell.querySelector('img');
  const existingVideo = cell.querySelector('video');
  const sources = getVideoSources(cell);

  const wrapper = document.createElement('div');
  wrapper.className = 'video-frame glass-surface';

  if (existingVideo) {
    existingVideo.setAttribute('playsinline', '');
    existingVideo.muted = true;
    existingVideo.loop = true;
    existingVideo.autoplay = true;
    existingVideo.className = 'video-player';
    wrapper.appendChild(existingVideo);
  } else if (sources.length > 0) {
    // Show poster image immediately for performance
    if (img) {
      img.loading = 'eager';
      img.className = 'video-player';
      const picture = img.closest('picture') || img;
      wrapper.appendChild(picture);
    }

    const buildVideo = () => {
      const video = document.createElement('video');
      video.setAttribute('playsinline', '');
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.className = 'video-player';
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

      const poster = wrapper.querySelector('.video-player');
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
    img.className = 'video-player';
    const picture = img.closest('picture') || img;
    wrapper.appendChild(picture);
  }

  block.textContent = '';
  block.appendChild(wrapper);
}
