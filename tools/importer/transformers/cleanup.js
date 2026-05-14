// eslint-disable-next-line no-unused-vars
export default function transform(hookName, element, payload) {
  if (hookName !== 'beforeTransform') return;

  // Remove scripts, styles, noscript, iframes
  element.querySelectorAll('script, style, noscript, iframe, link[rel="stylesheet"]').forEach((el) => el.remove());

  // Remove cookie banners, consent dialogs
  element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach((el) => el.remove());

  // Preserve announcement banner before removing header
  const announcement = element.querySelector('.srf_announcement_banner, .srf_top_banner');
  if (announcement) {
    const main = element.querySelector('main') || element;
    main.prepend(announcement);
  }

  // Remove header, footer, and mega-menu flyout panels
  element.querySelectorAll('header, footer, nav[class*="menu"], srf-header-menu, [class*="srf-header"], [class*="srf-footer"], [class*="srf-layout__footer"]').forEach((el) => el.remove());

  // Remove hidden elements
  element.querySelectorAll('[aria-hidden="true"], .mp-visually-hidden').forEach((el) => el.remove());

  // Remove duplicate marquee lists (the second is a clone for animation)
  const marquee = element.querySelector('.mp-logo-marquee');
  if (marquee) {
    const lists = marquee.querySelectorAll('ul');
    if (lists.length > 1) {
      for (let i = 1; i < lists.length; i += 1) {
        lists[i].remove();
      }
    }
  }

  // Remove swiper navigation buttons and pagination
  element.querySelectorAll('.swiper-button-next, .swiper-button-prev, .swiper-pagination').forEach((el) => el.remove());

  // Remove form elements from the hero (search box)
  element.querySelectorAll('.mp-search, form').forEach((el) => el.remove());

  // Remove outdated browser notice
  element.querySelectorAll('[class*="outdated"]').forEach((el) => el.remove());

  // Remove skip-to-content buttons
  element.querySelectorAll('[class*="skip-to"]').forEach((el) => el.remove());
}
