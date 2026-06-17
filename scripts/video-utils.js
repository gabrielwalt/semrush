/* Shared video utilities for blocks that detect video URLs in authored link text. */

/**
 * Extracts video sources from a content cell. Checks for explicit video
 * extensions in link hrefs first, then falls back to parsing the link
 * textContent (EDS rewrites external media hrefs to relative slugs).
 */
export default function getVideoSources(cell) {
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

  if (sources.length) return sources;

  // Builder.io CDN video assets have no file extension: `cdn.builder.io/o/...?alt=media`.
  // The `/o/` path + `alt=media` distinguishes a stored asset (video here) from the
  // `/api/v1/image/` image transform endpoint. Default to mp4 (Builder serves H.264).
  cell.querySelectorAll('a').forEach((link) => {
    const text = link.textContent.trim();
    if (/cdn\.builder\.io\/o\/.*alt=media/.test(text)) {
      sources.push({ src: text, type: 'video/mp4' });
    }
  });

  return sources;
}

/**
 * Builds a muted, looping, inline <video> from extracted sources, with the poster image's
 * src as the video poster and its alt as aria-label. Shared by blocks that show an autoplay
 * background video (teaser, media). Does NOT set the `autoplay` attribute or attach a play
 * controller — the caller owns play/pause (IntersectionObserver, matchMedia, etc.), which
 * differs per block. Returns the <video> element.
 * @param {{src:string,type:string}[]} sources video sources
 * @param {HTMLImageElement|null} posterImg image whose src/alt seed poster + aria-label
 * @param {string} className class to set on the <video>
 */
export function createVideo(sources, posterImg, className) {
  const video = document.createElement('video');
  video.setAttribute('playsinline', '');
  video.muted = true;
  video.loop = true;
  video.preload = 'auto';
  if (className) video.className = className;
  if (posterImg) {
    video.poster = posterImg.src;
    if (posterImg.alt) video.setAttribute('aria-label', posterImg.alt);
  }
  sources.forEach(({ src, type }) => {
    const source = document.createElement('source');
    source.src = src;
    source.type = type;
    video.appendChild(source);
  });
  return video;
}
