/* global WebImporter */
export default function parse(element, { document }) {
  const h1 = element.querySelector('h1');
  if (!h1) return;

  const subtitle = element.querySelector('.mp-hero__subtitle');
  const wrapper = document.createElement('div');

  // Build hero block content
  const content = document.createElement('div');
  const heading = document.createElement('h1');
  heading.textContent = h1.textContent.trim();
  content.appendChild(heading);

  if (subtitle) {
    const p = document.createElement('p');
    p.textContent = subtitle.textContent.trim();
    content.appendChild(p);
  }

  const ctaP = document.createElement('p');
  const strong = document.createElement('strong');
  const a = document.createElement('a');
  a.href = 'https://www.semrush.com/signup/';
  a.textContent = 'Get insights';
  strong.appendChild(a);
  ctaP.appendChild(strong);
  content.appendChild(ctaP);

  const heroTable = WebImporter.DOMUtils.createTable([['Hero'], [content]], document);
  wrapper.appendChild(heroTable);

  // Build hero-video block from the video/image
  const video = element.querySelector('video');
  const pic = document.createElement('picture');
  const img = document.createElement('img');
  img.src = video ? (video.poster || video.getAttribute('src')) : 'https://www.semrush.com/static/plg_toolkits.webp';
  img.alt = 'Semrush platform toolkits overview';
  pic.appendChild(img);

  const heroVideoTable = WebImporter.DOMUtils.createTable([['Hero Video'], [pic]], document);
  wrapper.appendChild(heroVideoTable);

  element.replaceWith(wrapper);
}
