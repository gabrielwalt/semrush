export default async function decorate(block) {
  const rows = [...block.children];

  // Row 1: text content (heading, subtitle, CTA) — no restructuring needed
  // Row 2: image — no restructuring needed
  // Row 3: logos — set up for horizontal scroll/marquee display
  if (rows[2]) {
    const logosCell = rows[2].querySelector('div');
    if (logosCell) {
      logosCell.classList.add('hero-logos');
    }
  }
}
