function createGlassFrame(child, className) {
  const frame = document.createElement('div');
  frame.className = `carousel-slider-glass ${className || ''}`;
  frame.appendChild(child);
  return frame;
}

export default async function decorate(block) {
  const rows = [...block.children];
  const items = [];

  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length < 2) return;

    const col1 = cols[0];
    const col2 = cols[1];

    const eyebrow = col1.querySelector('h3')?.textContent?.trim() || '';
    const title = col1.querySelector('p')?.textContent?.trim() || '';
    const smallPic = col1.querySelector('picture') || col2.querySelector('picture');
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

  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'carousel-slider-section-header';
  const countBadge = `<span class="carousel-slider-count">( ${items.length} )</span>`;
  sectionHeader.innerHTML = `<h2>Solutions ${countBadge}</h2><p class="carousel-slider-subtitle">Get seen. Get cited. Be the answer.</p>`;
  block.appendChild(sectionHeader);

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
    expandBtn.innerHTML = '<span>Expand</span>';
    header.appendChild(expandBtn);
    card.appendChild(header);

    if (item.smallPic) {
      const poster = createGlassFrame(item.smallPic.cloneNode(true), 'carousel-slider-poster');
      card.appendChild(poster);
    }

    const content = document.createElement('div');
    content.className = 'carousel-slider-content';

    if (item.largePic) {
      const largeFrame = createGlassFrame(item.largePic.cloneNode(true), 'carousel-slider-large-img');
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
        c.querySelector('.carousel-slider-expand span').textContent = 'Expand';
      });
      if (!isExpanded) {
        card.classList.add('carousel-slider-card-expanded');
        expandBtn.setAttribute('aria-expanded', 'true');
        expandBtn.querySelector('span').textContent = 'Minimize';
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

  const nav = document.createElement('div');
  nav.className = 'carousel-slider-nav';
  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-slider-prev';
  prevBtn.textContent = '‹';
  prevBtn.setAttribute('aria-label', 'Previous slide');
  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-slider-next';
  nextBtn.textContent = '›';
  nextBtn.setAttribute('aria-label', 'Next slide');
  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -450, behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: 450, behavior: 'smooth' });
  });

  block.appendChild(nav);
  block.appendChild(track);
}
