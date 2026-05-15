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

  return sources;
}
