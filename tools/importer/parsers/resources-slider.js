/* global WebImporter */
export default function parse(element, { document }) {
  const wrapper = document.createElement('div');

  // Section default content: eyebrow + h2
  const sectionTitle = element.querySelector('h2');
  const sectionSubtitle = element.querySelector('h3');

  if (sectionTitle) {
    const p = document.createElement('p');
    p.textContent = `Resources ( ${element.querySelectorAll('article, .mp-resources__item').length} )`;
    wrapper.appendChild(p);
  }
  if (sectionSubtitle) {
    const h2 = document.createElement('h2');
    h2.textContent = sectionSubtitle.textContent.trim();
    wrapper.appendChild(h2);
  }

  // Build resources-slider block rows
  const articles = element.querySelectorAll('article, .mp-resources__item');
  const rows = [['Resources Slider']];

  articles.forEach((article) => {
    const img = article.querySelector('img');
    const titleLink = article.querySelector('h3 a, a[class*="title"]');
    const tags = article.querySelectorAll('.mp-resources__item-info-tag, [class*="tag"]');

    const imgCell = document.createElement('div');
    if (img) {
      const src = img.getAttribute('src') || '';
      if (src && src !== 'about:error') {
        const pic = document.createElement('picture');
        const imgEl = document.createElement('img');
        imgEl.src = src.startsWith('/') ? `https://www.semrush.com${src}` : src;
        imgEl.alt = img.alt || titleLink?.textContent?.trim() || '';
        pic.appendChild(imgEl);
        imgCell.appendChild(pic);
      }
    }

    const textCell = document.createElement('div');
    if (titleLink) {
      const h3 = document.createElement('h3');
      const a = document.createElement('a');
      a.href = titleLink.href;
      a.textContent = titleLink.textContent.trim();
      h3.appendChild(a);
      textCell.appendChild(h3);
    }

    // Capture description paragraph (sibling <p> of h3, not inside a tag container)
    const paragraphs = article.querySelectorAll(':scope > p, :scope > div > p');
    let descText = '';
    paragraphs.forEach((para) => {
      const isInsideTagContainer = para.closest('[class*="tag"], [class*="info-tag"]');
      if (!isInsideTagContainer && para.textContent.trim()) {
        descText = para.textContent.trim();
      }
    });
    if (descText) {
      const descP = document.createElement('p');
      descP.textContent = descText;
      textCell.appendChild(descP);
    }

    const tagText = [...tags].map((t) => t.textContent.trim()).join(' · ');
    if (tagText) {
      const p = document.createElement('p');
      p.textContent = tagText;
      textCell.appendChild(p);
    }

    rows.push([imgCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  wrapper.appendChild(table);
  element.replaceWith(wrapper);
}
