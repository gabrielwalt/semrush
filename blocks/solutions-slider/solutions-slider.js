export default async function decorate(block) {
  const rows = [...block.children];
  let currentIndex = 0;

  if (rows.length > 0) {
    rows[0].classList.add('active');
  }

  const nav = document.createElement('div');
  nav.className = 'slider-nav';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'slider-prev';
  prevBtn.textContent = '‹';
  prevBtn.setAttribute('aria-label', 'Previous slide');

  const nextBtn = document.createElement('button');
  nextBtn.className = 'slider-next';
  nextBtn.textContent = '›';
  nextBtn.setAttribute('aria-label', 'Next slide');

  const dots = document.createElement('div');
  dots.style.display = 'flex';
  dots.style.gap = '8px';
  dots.style.alignItems = 'center';

  function goToSlide(index) {
    rows[currentIndex].classList.remove('active');
    dots.children[currentIndex].classList.remove('active');
    currentIndex = (index + rows.length) % rows.length;
    rows[currentIndex].classList.add('active');
    dots.children[currentIndex].classList.add('active');
  }

  rows.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dots.appendChild(dot);
  });

  nav.appendChild(prevBtn);
  nav.appendChild(dots);
  nav.appendChild(nextBtn);
  block.appendChild(nav);

  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  let interval = setInterval(() => goToSlide(currentIndex + 1), 5000);

  block.addEventListener('mouseenter', () => clearInterval(interval));
  block.addEventListener('mouseleave', () => {
    interval = setInterval(() => goToSlide(currentIndex + 1), 5000);
  });
}
