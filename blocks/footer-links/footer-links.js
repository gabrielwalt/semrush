/* Footer Links — mobile accordion for link column headings */
export default async function decorate(block) {
  const sections = block.querySelectorAll(':scope > div > div');

  sections.forEach((section) => {
    const heading = section.querySelector('p:has(strong)');
    const list = section.querySelector('ul');
    if (!heading || !list) return;

    heading.classList.add('footer-links-heading');
    heading.setAttribute('role', 'button');
    heading.setAttribute('tabindex', '0');
    heading.setAttribute('aria-expanded', 'false');

    const toggle = () => {
      const expanded = heading.classList.toggle('footer-links-expanded');
      heading.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      list.classList.toggle('footer-links-visible', expanded);
    };

    heading.addEventListener('click', toggle);
    heading.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}
