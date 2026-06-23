// Ratings band — review-platform scores (one column per brand: logo + stars + "X out of 5").
// Each authored row is one brand column; its cell holds the logo image, the star-rating
// image, and the score paragraph. Layout is CSS — JS just tags the pieces for styling.
export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('ratings-item');
    const cell = row.querySelector(':scope > div');
    if (!cell) return;
    const imgs = cell.querySelectorAll('picture, img');
    imgs.forEach((el, i) => {
      const pic = el.closest('picture') || el;
      if (i === 0) pic.classList.add('ratings-logo');
      else pic.classList.add('ratings-stars');
    });
    cell.querySelectorAll('p').forEach((p) => {
      if (!p.querySelector('picture, img')) p.classList.add('ratings-score');
    });
  });
}
