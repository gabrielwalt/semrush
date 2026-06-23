// Reviews — single-testimonial carousel ("Here's why marketers love Semrush").
// Shows one review at a time, centered, with prev/next arrows and an "N / total" counter.
// Each authored row is one review: blockquote + avatar image + name (strong) + role/company.
export default function decorate(block) {
  const slides = [...block.children];
  if (!slides.length) return;

  slides.forEach((slide, i) => {
    slide.classList.add('reviews-slide');
    if (i !== 0) slide.classList.add('reviews-slide-hidden');
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
  });

  let current = 0;
  const total = slides.length;

  const nav = document.createElement('div');
  nav.className = 'reviews-nav';

  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'reviews-arrow reviews-prev';
  prev.setAttribute('aria-label', 'Previous review');
  prev.textContent = '‹';

  const counter = document.createElement('span');
  counter.className = 'reviews-counter';

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'reviews-arrow reviews-next';
  next.setAttribute('aria-label', 'Next review');
  next.textContent = '›';

  nav.append(prev, counter, next);

  const show = (idx) => {
    slides[current].classList.add('reviews-slide-hidden');
    current = (idx + total) % total;
    slides[current].classList.remove('reviews-slide-hidden');
    counter.textContent = `${current + 1} / ${total}`;
  };

  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));

  counter.textContent = `1 / ${total}`;
  block.prepend(nav);
}
