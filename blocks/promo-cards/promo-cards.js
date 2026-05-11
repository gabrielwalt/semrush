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

function buildVideo(sources, img) {
  const video = document.createElement('video');
  video.setAttribute('playsinline', '');
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  video.className = 'promo-cards-video';
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
  return video;
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
  container.className = 'promo-cards-container';

  const textCol = document.createElement('div');
  textCol.className = 'promo-cards-text';
  textParts.forEach((cell) => {
    while (cell.firstChild) textCol.appendChild(cell.firstChild);
  });
  container.appendChild(textCol);

  const mediaCol = document.createElement('div');
  mediaCol.className = 'promo-cards-media';

  if (mediaPart && mediaPart.sources.length > 0) {
    const video = buildVideo(mediaPart.sources, mediaPart.img);
    mediaCol.appendChild(video);
  } else if (mediaPart && mediaPart.img) {
    const picture = mediaPart.img.closest('picture') || mediaPart.img;
    picture.querySelector('img')?.classList.add('promo-cards-video');
    mediaCol.appendChild(picture);
  } else {
    const isSemrushOne = block.classList.contains('promo-cards-semrush-one');
    const videoSrc = isSemrushOne
      ? 'https://www.semrush.com/static/index/videos/semrush_one.mp4'
      : 'https://www.semrush.com/static/index/videos/enterprise.mp4';
    const posterSrc = isSemrushOne
      ? '/content/images/semrush-one-poster.webp'
      : '/content/images/enterprise-poster.webp';
    const video = document.createElement('video');
    video.setAttribute('playsinline', '');
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.poster = posterSrc;
    video.className = 'promo-cards-video';
    const source = document.createElement('source');
    source.src = videoSrc;
    source.type = 'video/mp4';
    video.appendChild(source);
    mediaCol.appendChild(video);
  }

  container.appendChild(mediaCol);
  block.appendChild(container);
}
