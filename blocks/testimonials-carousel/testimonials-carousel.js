export default function decorate(block) {
  block.closest('.testimonials-carousel-wrapper')?.classList.add('full-width');

  [...block.children].forEach((row) => {
    row.classList.add('testimonials-carousel-card');
    const cell = row.firstElementChild;
    if (cell) cell.classList.add('testimonials-carousel-logo');
  });
}
