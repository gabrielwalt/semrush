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
