export default async function decorate(block) {
  block.closest('.announcement-bar-wrapper')?.classList.add('full-width');
}
