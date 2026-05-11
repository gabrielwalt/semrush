export default async function decorate(block) {
  const sections = block.querySelectorAll(':scope > div > div');

  sections.forEach((section) => {
    const heading = section.querySelector('p:has(strong)');
    const list = section.querySelector('ul');
    if (!heading || !list) return;

    heading.classList.add('footer-links-heading');
    heading.addEventListener('click', () => {
      heading.classList.toggle('footer-links-expanded');
      list.classList.toggle('footer-links-visible');
    });
  });
}
