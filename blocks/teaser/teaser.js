import getVideoSources from '../../scripts/video-utils.js';

export default async function decorate(block) {
  const rows = [...block.children];
  const textParts = [];
  let mediaPart = null;
  // Track authored order: if the media row precedes the text rows, the author wants
  // the media on the LEFT. Default (text authored first) keeps media on the right.
  let mediaAuthoredFirst = false;

  rows.forEach((row) => {
    const cell = row.querySelector(':scope > div');
    if (!cell) return;
    const sources = getVideoSources(cell);
    const hasVideo = sources.length > 0;
    const hasImage = cell.querySelector('picture, img');

    if (hasVideo || (hasImage && !cell.querySelector('h2, h3, p > a'))) {
      mediaPart = { cell, sources, img: cell.querySelector('img') };
      if (textParts.length === 0) mediaAuthoredFirst = true;
    } else {
      textParts.push(cell);
    }
  });

  // DOM is always built text-then-media (so the default media-right path is unchanged);
  // media-left is expressed purely via this modifier class + CSS column flip.
  if (mediaAuthoredFirst) block.classList.add('teaser-media-left');

  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'teaser-container';

  const textCol = document.createElement('div');
  textCol.className = 'teaser-text';
  textParts.forEach((cell) => {
    while (cell.firstChild) textCol.appendChild(cell.firstChild);
  });
  container.appendChild(textCol);

  const mediaCol = document.createElement('div');
  mediaCol.className = 'teaser-media';

  const glassFrame = document.createElement('div');
  glassFrame.className = 'teaser-glass';

  if (mediaPart && mediaPart.sources.length > 0) {
    const { img } = mediaPart;
    if (img) {
      img.loading = 'eager';
      img.classList.add('teaser-media-el');
      const picture = img.closest('picture') || img;
      glassFrame.appendChild(picture);
    }

    const buildVideo = () => {
      const video = document.createElement('video');
      video.setAttribute('playsinline', '');
      video.muted = true;
      video.loop = true;
      video.preload = 'auto';
      video.className = 'teaser-media-el';
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

      const poster = glassFrame.querySelector('.teaser-media-el');
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
    picture.querySelector('img')?.classList.add('teaser-media-el');
    glassFrame.appendChild(picture);
  }

  // No media authored → text-only teaser. Skip the (empty) glass frame and let the text
  // span the card; frozen teasers all carry media, so this branch never affects them.
  if (mediaPart) {
    mediaCol.appendChild(glassFrame);
    container.appendChild(mediaCol);
  } else {
    block.classList.add('teaser-text-only');
  }
  block.appendChild(container);
}
