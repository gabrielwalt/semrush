export default async function decorate(block) {
  // The announcement bar is a simple single-row block with centered link text.
  // No DOM restructuring needed — the CSS handles all styling.
  block.closest('.announcement-bar-wrapper')?.classList.add('full-width');
}
