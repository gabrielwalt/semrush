import { getMetadata } from '../../scripts/aem.js';
import { getContentRoot } from '../../scripts/scripts.js';
import { loadFragment } from '../fragment/fragment.js';

const SOCIAL_ICONS = {
  linkedin: 'linkedin',
  instagram: 'instagram',
  tiktok: 'tiktok',
  youtube: 'youtube',
  facebook: 'facebook',
  'x.com': 'x-twitter',
};

function decorateSocialLinks(block) {
  const bottomSection = block.querySelector('.footer-bottom-wrapper');
  if (!bottomSection) return;

  const socialRow = bottomSection.querySelector('.footer-bottom > div:first-child');
  if (!socialRow) return;

  socialRow.classList.add('footer-social-row');
  const links = socialRow.querySelectorAll('a');
  links.forEach((a) => {
    const href = a.getAttribute('href') || '';
    const match = Object.entries(SOCIAL_ICONS).find(([key]) => href.includes(key));
    if (match) {
      const [, iconName] = match;
      const img = document.createElement('img');
      img.src = `/icons/${iconName}.svg`;
      img.alt = a.textContent.trim();
      img.width = 24;
      img.height = 24;
      a.textContent = '';
      a.appendChild(img);
      a.classList.add('footer-social-icon');
    }
  });
}

function decorateAdobeLogo(block) {
  const adobeLink = block.querySelector('.footer-bottom a[href*="adobe"]');
  if (!adobeLink) return;

  const img = document.createElement('img');
  img.src = '/icons/adobe.svg';
  img.alt = 'Adobe';
  img.width = 62;
  img.height = 15;
  adobeLink.textContent = '';
  adobeLink.appendChild(img);
  adobeLink.classList.add('footer-adobe-logo');
}

function decorateBottomBar(block) {
  const bottomBlock = block.querySelector('.footer-bottom');
  if (!bottomBlock) return;

  const copyrightRow = bottomBlock.querySelector(':scope > div:last-child');
  if (copyrightRow) {
    copyrightRow.classList.add('footer-legal-row');
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
  decorateAdobeLogo(block);
  decorateBottomBar(block);

  // Reveal must be a sibling of .footer, not a child — the footer's z-index:1 + white bg hides it
  const reveal = document.createElement('div');
  reveal.className = 'footer-reveal';
  reveal.innerHTML = '<span>SEMRUSH</span>';
  const footerEl = block.closest('footer');
  if (footerEl) {
    footerEl.append(reveal);
  }
}
