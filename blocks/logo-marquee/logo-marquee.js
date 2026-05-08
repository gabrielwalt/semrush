export default async function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  // unwrap the inner cell div and any wrapping <p> so pictures sit directly in the track
  const cell = row.querySelector(':scope > div');
  if (cell) {
    const pictures = cell.querySelectorAll('picture');
    row.textContent = '';
    row.classList.add('logo-marquee-track');
    pictures.forEach((pic) => row.appendChild(pic));
  }

  // duplicate the track for seamless infinite scroll
  const clone = row.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  block.appendChild(clone);
}
