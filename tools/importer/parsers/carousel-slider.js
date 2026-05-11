/* global WebImporter */
export default function parse(element, { document }) {
  const wrapper = document.createElement('div');

  const slides = element.querySelectorAll('.mp-toolkit, .swiper-slide');
  const rows = [['Carousel Slider']];

  slides.forEach((slide) => {
    const title = slide.querySelector('h3');
    const subtitle = slide.querySelector('h4');
    const desc = slide.querySelector('.mp-toolkit__description, p');
    const img = slide.querySelector('img');
    const cta = slide.querySelector('a.mp-button');

    // Column 1: eyebrow + title + small image
    const col1 = document.createElement('div');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      col1.appendChild(h3);
    }
    if (subtitle) {
      const p = document.createElement('p');
      p.textContent = subtitle.textContent.trim();
      col1.appendChild(p);
    }
    if (img) {
      const pic = document.createElement('picture');
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      pic.appendChild(imgEl);
      col1.appendChild(pic);
    }

    // Column 2: large image + description + CTA
    const col2 = document.createElement('div');
    if (img) {
      const pic = document.createElement('picture');
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      pic.appendChild(imgEl);
      col2.appendChild(pic);
    }
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      col2.appendChild(p);
    }
    if (cta) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      const a = document.createElement('a');
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      strong.appendChild(a);
      p.appendChild(strong);
      col2.appendChild(p);
    }

    rows.push([col1, col2]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  wrapper.appendChild(table);
  element.replaceWith(wrapper);
}
