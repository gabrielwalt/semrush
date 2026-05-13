import marqueeDecorate from '../marquee/marquee.js';

export default async function decorate(block) {
  block.closest('.logo-marquee-wrapper')?.classList.add('full-width');
  return marqueeDecorate(block);
}
