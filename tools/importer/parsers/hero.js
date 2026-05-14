/* global WebImporter */

function createVideoLink(fullUrl, document) {
  const p = document.createElement('p');
  const a = document.createElement('a');
  try {
    const url = new URL(fullUrl);
    const slug = url.pathname.replace(/[_.]/g, '-').replace(/\/$/, '');
    a.href = slug;
  } catch (e) {
    a.href = fullUrl;
  }
  a.textContent = fullUrl;
  p.appendChild(a);
  return p;
}

export default function parse(element, { document }) {
  const h1 = element.querySelector('h1');
  if (!h1) return;

  const subtitle = element.querySelector('.mp-hero__subtitle');
  const wrapper = document.createElement('div');

  const heading = document.createElement('h1');
  heading.textContent = h1.textContent.trim();
  wrapper.appendChild(heading);

  if (subtitle) {
    const p = document.createElement('p');
    p.textContent = subtitle.textContent.trim();
    wrapper.appendChild(p);
  }

  // Insights Widget block — extract placeholder + button text from source DOM
  const widgetContent = document.createElement('div');
  const searchInput = element.querySelector('input[placeholder]');
  const searchBtn = element.querySelector('button[type="submit"], .mp-hero__search-button');
  const p1 = document.createElement('p');
  p1.textContent = searchInput?.getAttribute('placeholder') || 'Enter your website';
  widgetContent.appendChild(p1);
  const p2 = document.createElement('p');
  p2.textContent = searchBtn?.textContent?.trim() || 'Get insights';
  widgetContent.appendChild(p2);
  const insightsTable = WebImporter.DOMUtils.createTable([['Insights Widget'], [widgetContent]], document);
  wrapper.appendChild(insightsTable);

  // Video block — output as link (video URL) + picture (poster)
  const video = element.querySelector('video');
  const videoCell = document.createElement('div');

  if (video) {
    const source = video.querySelector('source[type="video/mp4"]') || video.querySelector('source');
    const videoUrl = source?.getAttribute('src') || video.getAttribute('src') || '';
    if (videoUrl) {
      const fullUrl = videoUrl.startsWith('/') ? `https://www.semrush.com${videoUrl}` : videoUrl;
      videoCell.appendChild(createVideoLink(fullUrl, document));
    }
    const posterSrc = video.getAttribute('poster') || '';
    if (posterSrc) {
      const p = document.createElement('p');
      const pic = document.createElement('picture');
      const img = document.createElement('img');
      img.src = posterSrc.startsWith('/') ? `https://www.semrush.com${posterSrc}` : posterSrc;
      img.alt = video.getAttribute('aria-label') || 'Semrush platform toolkits overview';
      pic.appendChild(img);
      p.appendChild(pic);
      videoCell.appendChild(p);
    }
  } else {
    const posterImg = element.querySelector('.mp-hero__video-wrapper img');
    const posterSrc = posterImg?.getAttribute('src') || 'https://www.semrush.com/static/plg_toolkits.webp';
    videoCell.appendChild(createVideoLink('https://www.semrush.com/static/videos/plg_toolkits_with_pr.mp4', document));
    const pEl = document.createElement('p');
    const pic = document.createElement('picture');
    const img = document.createElement('img');
    img.src = posterSrc.startsWith('/') ? `https://www.semrush.com${posterSrc}` : posterSrc;
    img.alt = posterImg?.alt || 'Semrush platform toolkits overview';
    pic.appendChild(img);
    pEl.appendChild(pic);
    videoCell.appendChild(pEl);
  }

  const videoTable = WebImporter.DOMUtils.createTable([['Video'], [videoCell]], document);
  wrapper.appendChild(videoTable);

  const sectionMetaTable = WebImporter.DOMUtils.createTable(
    [['Section Metadata'], ['Style', 'section-centered']],
    document,
  );
  wrapper.appendChild(sectionMetaTable);

  element.replaceWith(wrapper);
}
