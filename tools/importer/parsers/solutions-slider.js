/* global WebImporter */
export default function parse(element, { document }) {
  const wrapper = document.createElement('div');

  // Section default content: eyebrow + h2
  const sectionTitle = element.querySelector('h2.mp-section-title, h2');
  const sectionSubtitle = element.querySelector('h3');

  if (sectionTitle || sectionSubtitle) {
    if (sectionTitle) {
      const p = document.createElement('p');
      p.textContent = 'Solutions';
      wrapper.appendChild(p);
    }
    if (sectionSubtitle) {
      const h2 = document.createElement('h2');
      h2.textContent = sectionSubtitle.textContent.trim();
      wrapper.appendChild(h2);
    }
  }

  // Build solutions-slider block rows from each toolkit slide
  const slides = element.querySelectorAll('.mp-toolkit, .swiper-slide');
  const rows = [['Solutions Slider']];

  slides.forEach((slide) => {
    const title = slide.querySelector('h3');
    const subtitle = slide.querySelector('h4');
    const desc = slide.querySelector('.mp-toolkit__description, p');
    const img = slide.querySelector('img');

    const textCell = document.createElement('div');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      textCell.appendChild(h3);
    }
    if (subtitle) {
      const p = document.createElement('p');
      p.textContent = subtitle.textContent.trim();
      textCell.appendChild(p);
    }
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      textCell.appendChild(p);
    }

    // CTA
    const cta = slide.querySelector('a.mp-button');
    if (cta) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      const a = document.createElement('a');
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      strong.appendChild(a);
      p.appendChild(strong);
      textCell.appendChild(p);
    }

    const imgCell = document.createElement('div');
    if (img) {
      const pic = document.createElement('picture');
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      pic.appendChild(imgEl);
      imgCell.appendChild(pic);
    }

    rows.push([textCell, imgCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  wrapper.appendChild(table);
  element.replaceWith(wrapper);
}
