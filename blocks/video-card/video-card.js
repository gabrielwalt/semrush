function getVideoSources(cell) {
  const sources = [];
  cell.querySelectorAll('a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"]').forEach((link) => {
    sources.push({ src: link.href, type: `video/${link.href.split('.').pop()}` });
  });
  if (sources.length) return sources;

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
  const rows = [...block.children];
  const textParts = [];
  let mediaPart = null;

  rows.forEach((row) => {
    const cell = row.querySelector(':scope > div');
    if (!cell) return;
    const sources = getVideoSources(cell);
    const hasVideo = sources.length > 0;
    const hasImage = cell.querySelector('picture, img');

    if (hasVideo || (hasImage && !cell.querySelector('h2, h3, p > a'))) {
      mediaPart = { cell, sources, img: cell.querySelector('img') };
    } else {
      textParts.push(cell);
    }
  });

  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'video-card-container';

  const textCol = document.createElement('div');
  textCol.className = 'video-card-text';
  textParts.forEach((cell) => {
    while (cell.firstChild) textCol.appendChild(cell.firstChild);
  });
  container.appendChild(textCol);

  const mediaCol = document.createElement('div');
  mediaCol.className = 'video-card-media';

  const glassFrame = document.createElement('div');
  glassFrame.className = 'video-card-glass';

  if (mediaPart && mediaPart.sources.length > 0) {
    const { img } = mediaPart;
    if (img) {
      img.loading = 'eager';
      img.classList.add('video-card-video');
      const picture = img.closest('picture') || img;
      glassFrame.appendChild(picture);
    }

    const buildVideo = () => {
      const video = document.createElement('video');
      video.setAttribute('playsinline', '');
      video.muted = true;
      video.loop = true;
      video.preload = 'auto';
      video.className = 'video-card-video';
      if (img) {
        video.poster = img.src;
        if (img.alt) video.setAttribute('aria-label', img.alt);
      }
      mediaPart.sources.forEach(({ src, type }) => {
        const source = document.createElement('source');
        source.src = src;
        source.type = type;
        video.appendChild(source);
      });

      const poster = glassFrame.querySelector('.video-card-video');
      if (poster) poster.replaceWith(video);
      else glassFrame.appendChild(video);

      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

      // IntersectionObserver is the sole play/pause controller — no autoplay attribute
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (mq.matches) return;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.25 });
      observer.observe(block);
    };

    if (document.readyState === 'complete') {
      buildVideo();
    } else {
      window.addEventListener('load', buildVideo, { once: true });
      setTimeout(() => { if (!glassFrame.querySelector('video')) buildVideo(); }, 4000);
    }
  } else if (mediaPart && mediaPart.img) {
    const picture = mediaPart.img.closest('picture') || mediaPart.img;
    picture.querySelector('img')?.classList.add('video-card-video');
    glassFrame.appendChild(picture);
  }

  mediaCol.appendChild(glassFrame);
  container.appendChild(mediaCol);
  block.appendChild(container);
}
