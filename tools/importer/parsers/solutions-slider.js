/* global WebImporter */
export default function parse(element, { document }) {
  const wrapper = document.createElement('div');

  const sectionH2 = element.querySelector('h2');
  const sectionSubtitle = element.querySelector('h2 ~ h3, h3');
  const slides = element.querySelectorAll('.mp-toolkit, .swiper-slide');

  if (sectionH2) {
    const eyebrow = document.createElement('p');
    const h2Text = sectionH2.textContent.trim();
    eyebrow.textContent = /\(\s*\d+\s*\)/.test(h2Text) ? h2Text : `${h2Text} ( ${slides.length} )`;
    wrapper.appendChild(eyebrow);
  }
  if (sectionSubtitle) {
    const h2 = document.createElement('h2');
    h2.textContent = sectionSubtitle.textContent.trim();
    wrapper.appendChild(h2);
  }

  const rows = [['Carousel Slider (carousel-slider-expansible)']];

  slides.forEach((slide) => {
    const title = slide.querySelector('h3');
    const subtitle = slide.querySelector('h4');
    const desc = slide.querySelector('.mp-toolkit__description');
    const cta = slide.querySelector('a.mp-button, a.mp-toolkit__cta');

    // Small image (poster — visible when collapsed)
    const posterWrapper = slide.querySelector('.mp-toolkit__poster');
    const smallImg = posterWrapper ? posterWrapper.querySelector('img') : null;

    // Large image (content area — visible when expanded, use desktop source)
    const contentImgWrapper = slide.querySelector('.mp-toolkit__content .mp-toolkit__img-wrapper');
    const largeSource = contentImgWrapper ? contentImgWrapper.querySelector('source[media="(min-width: 768px)"]') : null;
    const largeImg = contentImgWrapper ? contentImgWrapper.querySelector('img') : null;
    let largeSrc = '';
    if (largeSource) largeSrc = largeSource.srcset;
    else if (largeImg) largeSrc = largeImg.src;

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
    if (smallImg) {
      const pic = document.createElement('picture');
      const imgEl = document.createElement('img');
      imgEl.src = smallImg.src;
      imgEl.alt = smallImg.alt || '';
      pic.appendChild(imgEl);
      col1.appendChild(pic);
    }

    // Column 2: large image + description + CTA
    const col2 = document.createElement('div');
    if (largeSrc) {
      const pic = document.createElement('picture');
      const imgEl = document.createElement('img');
      imgEl.src = largeSrc;
      imgEl.alt = largeImg ? largeImg.alt || '' : '';
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
