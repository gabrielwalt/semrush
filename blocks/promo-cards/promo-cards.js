export default async function decorate(block) {
  const rows = [...block.children];

  // Identify rows by content
  rows.forEach((row) => {
    const hasImage = row.querySelector('picture, img');
    if (hasImage) {
      row.classList.add('promo-cards-media');
    } else {
      row.classList.add('promo-cards-text');
    }
  });
}
