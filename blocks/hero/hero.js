export default async function decorate(block) {
  // Hero block is decorative only — heading + subtitle are default content
  // in the centered section. The form lives in the insights-widget block.
  block.closest('.hero-wrapper')?.classList.add('full-width');
}
