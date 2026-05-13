export default async function decorate(block) {
  block.closest('.hero-wrapper')?.classList.add('full-width');
}
