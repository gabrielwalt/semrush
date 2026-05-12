/* global WebImporter */
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

  // Insights Widget block
  const widgetContent = document.createElement('div');
  const p1 = document.createElement('p');
  p1.textContent = 'Enter your website';
  widgetContent.appendChild(p1);
  const p2 = document.createElement('p');
  p2.textContent = 'Get insights';
  widgetContent.appendChild(p2);
  const insightsTable = WebImporter.DOMUtils.createTable([['Insights Widget'], [widgetContent]], document);
  wrapper.appendChild(insightsTable);

  // Video block — output as link (video URL) + picture (poster)
  const video = element.querySelector('video');
  const videoCell = document.createElement('div');

  if (video) {
    const source = video.querySelector('source[type="video/mp4"]') || video.querySelector('source');
    const videoUrl = source?.src || source?.getAttribute('src') || video.src;
    if (videoUrl) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = videoUrl;
      a.textContent = videoUrl;
      p.appendChild(a);
      videoCell.appendChild(p);
    }
    if (video.poster) {
      const p = document.createElement('p');
      const pic = document.createElement('picture');
      const img = document.createElement('img');
      img.src = video.poster;
      img.alt = video.getAttribute('aria-label') || 'Semrush platform toolkits overview';
      pic.appendChild(img);
      p.appendChild(pic);
      videoCell.appendChild(p);
    }
  } else {
    const posterImg = element.querySelector('.mp-hero__video-wrapper img');
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = 'https://www.semrush.com/static/index/videos/plg_toolkits_with_pr.mp4';
    a.textContent = 'https://www.semrush.com/static/index/videos/plg_toolkits_with_pr.mp4';
    p.appendChild(a);
    videoCell.appendChild(p);

    const p2el = document.createElement('p');
    const pic = document.createElement('picture');
    const img = document.createElement('img');
    img.src = posterImg?.src || 'https://www.semrush.com/static/plg_toolkits.webp';
    img.alt = posterImg?.alt || 'Semrush platform toolkits overview';
    pic.appendChild(img);
    p2el.appendChild(pic);
    videoCell.appendChild(p2el);
  }

  const heroVideoTable = WebImporter.DOMUtils.createTable([['Video'], [videoCell]], document);
  wrapper.appendChild(heroVideoTable);

  // Section Metadata for centered style
  const sectionMetaTable = WebImporter.DOMUtils.createTable(
    [['Section Metadata'], ['Style', 'centered']],
    document,
  );
  wrapper.appendChild(sectionMetaTable);

  element.replaceWith(wrapper);
}
