function createNav(scrollTarget, scrollAmount) {
  const nav = document.createElement('div');
  nav.className = 'carousel-slider-nav';

  const prevBtn = document.createElement('button');
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.textContent = '‹';

  const nextBtn = document.createElement('button');
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.textContent = '›';

  nav.append(prevBtn, nextBtn);

  prevBtn.addEventListener('click', () => {
    scrollTarget.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    scrollTarget.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  return nav;
}

function decorateExpansible(block, rows) {
  const items = [];

  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length < 2) return;

    const col1 = cols[0];
    const col2 = cols[1];

    const eyebrow = col1.querySelector('h3')?.textContent?.trim() || '';
    const title = col1.querySelector('p')?.textContent?.trim() || '';
    const smallPic = col1.querySelector('picture');
    const largePic = col2.querySelector('picture');
    const paras = [...col2.querySelectorAll('p')];
    const description = paras.find((p) => !p.querySelector('a') && !p.querySelector('picture'))?.textContent?.trim() || '';
    const ctaLink = col2.querySelector('a');

    if (eyebrow) {
      items.push({
        eyebrow, title, smallPic, largePic, description, ctaLink,
      });
    }
  });

  block.textContent = '';

  const track = document.createElement('div');
  track.className = 'carousel-slider-track';

  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'carousel-slider-card';
    card.setAttribute('role', 'group');
    card.setAttribute('aria-label', `${i + 1} / ${items.length}`);

    const header = document.createElement('div');
    header.className = 'carousel-slider-header';
    const h3 = document.createElement('h3');
    h3.textContent = item.eyebrow;
    const h4 = document.createElement('h4');
    h4.textContent = item.title;
    header.appendChild(h3);
    header.appendChild(h4);

    const expandBtn = document.createElement('button');
    expandBtn.className = 'carousel-slider-expand';
    expandBtn.setAttribute('aria-expanded', 'false');
    expandBtn.setAttribute('aria-label', 'Expand');
    expandBtn.textContent = '+';
    card.appendChild(header);
    card.appendChild(expandBtn);

    if (item.smallPic) {
      const poster = document.createElement('div');
      poster.className = 'carousel-slider-glass carousel-slider-poster';
      poster.appendChild(item.smallPic.cloneNode(true));
      card.appendChild(poster);
    }

    const content = document.createElement('div');
    content.className = 'carousel-slider-content';

    if (item.largePic) {
      const largeFrame = document.createElement('div');
      largeFrame.className = 'carousel-slider-glass carousel-slider-large-img';
      largeFrame.appendChild(item.largePic.cloneNode(true));
      content.appendChild(largeFrame);
    }

    if (item.description) {
      const p = document.createElement('p');
      p.className = 'carousel-slider-description';
      p.textContent = item.description;
      content.appendChild(p);
    }

    if (item.ctaLink) {
      const cta = item.ctaLink.cloneNode(true);
      cta.className = 'carousel-slider-cta';
      content.appendChild(cta);
    }

    card.appendChild(content);

    expandBtn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const isExpanded = card.classList.contains('carousel-slider-card-expanded');
      block.querySelectorAll('.carousel-slider-card-expanded').forEach((c) => {
        c.classList.remove('carousel-slider-card-expanded');
        c.querySelector('.carousel-slider-expand').setAttribute('aria-expanded', 'false');
      });
      if (!isExpanded) {
        card.classList.add('carousel-slider-card-expanded');
        expandBtn.setAttribute('aria-expanded', 'true');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });

    card.addEventListener('click', () => {
      if (!card.classList.contains('carousel-slider-card-expanded')) {
        expandBtn.click();
      }
    });

    track.appendChild(card);
  });

  const nav = createNav(track, 450);
  block.appendChild(nav);
  block.appendChild(track);
}

function decorateDefault(block) {
  const track = block;
  const nav = createNav(track, 442);

  const wrapper = block.closest('.carousel-slider-wrapper');
  if (wrapper) wrapper.before(nav);
}

export default async function decorate(block) {
  const isExpansible = block.classList.contains('carousel-slider-expansible');

  if (isExpansible) {
    const rows = [...block.children];
    decorateExpansible(block, rows);
  } else {
    decorateDefault(block);
  }
}
