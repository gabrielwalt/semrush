export default async function decorate(block) {
  const section = block.closest('.section');
  const wrapper = block.closest('.resources-slider-wrapper');

  // Create header area with title and nav
  const headerArea = document.createElement('div');
  headerArea.className = 'resources-slider-header';

  // Move section headings (h2 + h3) into header area
  const headings = document.createElement('div');
  headings.className = 'resources-slider-headings';

  // Get the h2 and h3 that are siblings before the wrapper
  const sectionDiv = section.querySelector(':scope > div');
  const h2 = sectionDiv.querySelector(':scope > h2');
  const h3 = sectionDiv.querySelector(':scope > h3');
  if (h2) headings.append(h2);
  if (h3) headings.append(h3);

  // Add navigation buttons
  const nav = document.createElement('div');
  nav.className = 'resources-slider-nav';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'resources-slider-prev';
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.innerHTML = '&#8249;';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'resources-slider-next';
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.innerHTML = '&#8250;';

  nav.append(prevBtn, nextBtn);

  headerArea.append(headings, nav);

  // Insert header before the wrapper
  wrapper.before(headerArea);

  // Scroll behavior
  const cardWidth = 268 + 12; // card width + gap

  prevBtn.addEventListener('click', () => {
    block.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    block.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });
}
