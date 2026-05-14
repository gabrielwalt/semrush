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
  const bottomBlock = block.querySelector('.footer-bottom');
  if (!bottomBlock) return;

  const patterns = Object.values(SOCIAL_PATTERNS);
  const firstList = [...bottomBlock.querySelectorAll('ul')].find((list) => {
    const links = list.querySelectorAll('a');
    return [...links].some((a) => patterns.some((re) => re.test(a.href)));
  });
  if (!firstList) return;

  firstList.classList.add('footer-social');
  firstList.querySelectorAll('a').forEach((a) => {
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

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : `${getContentRoot()}/footer`;
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  decorateSocialLinks(block);

  const bottomInner = block.querySelector('.footer-bottom > div > div');
  if (bottomInner) {
    const copyrightP = bottomInner.querySelector('p');
    const legalUl = [...bottomInner.querySelectorAll('ul')].find((ul) => !ul.classList.contains('footer-social'));
    if (copyrightP && legalUl) {
      const legalRow = document.createElement('div');
      legalRow.className = 'footer-bottom-legal';
      legalRow.appendChild(copyrightP);
      legalRow.appendChild(legalUl);
      bottomInner.appendChild(legalRow);
    }
  }

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
