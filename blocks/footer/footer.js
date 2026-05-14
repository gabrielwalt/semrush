import { getMetadata } from '../../scripts/aem.js';
import { getContentRoot } from '../../scripts/scripts.js';
import { loadFragment } from '../fragment/fragment.js';

const SOCIAL_PATTERNS = {
  linkedin: /linkedin\.com/,
  instagram: /instagram\.com/,
  tiktok: /tiktok\.com/,
  youtube: /youtube\.com/,
  facebook: /facebook\.com/,
  'x-twitter': /x\.com|twitter\.com/,
};

function decorateSocialLinks(block) {
  const bottomSection = block.querySelector('.footer-bottom-container');
  if (!bottomSection) return;

  const lists = bottomSection.querySelectorAll('ul');
  if (lists.length === 0) return;

  const firstList = lists[0];
  const links = firstList.querySelectorAll('a');
  const patterns = Object.values(SOCIAL_PATTERNS);
  const isSocial = [...links].some(
    (a) => patterns.some((re) => re.test(a.href)),
  );

  if (isSocial) {
    firstList.classList.add('footer-social');
    links.forEach((a) => {
      const entry = Object.entries(SOCIAL_PATTERNS).find(([, re]) => re.test(a.href));
      if (entry) {
        const [name] = entry;
        const img = document.createElement('img');
        img.src = `/icons/${name}.svg`;
        img.alt = a.textContent;
        img.loading = 'lazy';
        a.textContent = '';
        a.appendChild(img);
      }
    });
  }
}

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : `${getContentRoot()}/footer`;
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  decorateSocialLinks(block);

  const reveal = document.createElement('div');
  reveal.className = 'footer-reveal';
  const wordmark = document.createElement('img');
  wordmark.src = '/icons/semrush-wordmark.svg';
  wordmark.alt = 'SEMRUSH';
  reveal.appendChild(wordmark);
  const footerEl = block.closest('footer');
  if (footerEl) {
    footerEl.append(reveal);
  }
}
