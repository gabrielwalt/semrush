/* global WebImporter */
export default function parse(element, { document }) {
  const h1 = element.querySelector('h1');
  if (!h1) return;

  const subtitle = element.querySelector('.mp-hero__subtitle');
  const wrapper = document.createElement('div');

  // Default content: heading + subtitle
  const heading = document.createElement('h1');
  heading.textContent = h1.textContent.trim();
  wrapper.appendChild(heading);

  if (subtitle) {
    const p = document.createElement('p');
    p.textContent = subtitle.textContent.trim();
    wrapper.appendChild(p);
  }

  // Insights Widget block — placeholder with text strings as paragraphs
  const widgetContent = document.createElement('div');
  const p1 = document.createElement('p');
  p1.textContent = 'Enter your website';
  widgetContent.appendChild(p1);
  const p2 = document.createElement('p');
  p2.textContent = 'Get insights';
  widgetContent.appendChild(p2);
  const insightsTable = WebImporter.DOMUtils.createTable([['Insights Widget'], [widgetContent]], document);
  wrapper.appendChild(insightsTable);

  // Hero Video block with video element if present
  const video = element.querySelector('video');
  const videoCell = document.createElement('div');
  if (video) {
    const videoEl = document.createElement('video');
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('muted', '');
    videoEl.setAttribute('loop', '');
    videoEl.setAttribute('autoplay', '');
    if (video.poster) videoEl.setAttribute('poster', video.poster);
    const source = video.querySelector('source');
    if (source) {
      videoEl.setAttribute('src', source.src || source.getAttribute('src'));
    } else if (video.src) {
      videoEl.setAttribute('src', video.src);
    }
    videoCell.appendChild(videoEl);
  } else {
    const pic = document.createElement('picture');
    const img = document.createElement('img');
    img.src = 'https://www.semrush.com/static/plg_toolkits.webp';
    img.alt = 'Semrush platform toolkits overview';
    pic.appendChild(img);
    videoCell.appendChild(pic);
  }
  const heroVideoTable = WebImporter.DOMUtils.createTable([['Hero Video'], [videoCell]], document);
  wrapper.appendChild(heroVideoTable);

  // Section Metadata for centered style
  const sectionMetaTable = WebImporter.DOMUtils.createTable(
    [['Section Metadata'], ['Style', 'centered']],
    document,
  );
  wrapper.appendChild(sectionMetaTable);

  element.replaceWith(wrapper);
}
