/* eslint-disable */
/* global WebImporter */

import announcementBarParser from './parsers/announcement-bar.js';
import heroParser from './parsers/hero.js';
import marqueeParser from './parsers/marquee.js';
import promoCardsSemrushOneParser from './parsers/promo-cards-semrush-one.js';
import promoCardsEnterpriseParser from './parsers/promo-cards-enterprise.js';
import solutionsSliderParser from './parsers/solutions-slider.js';
import statsFactsParser from './parsers/stats-facts.js';
import statsVisibilityParser from './parsers/stats-visibility.js';
import testimonialsParser from './parsers/testimonials.js';
import resourcesSliderParser from './parsers/resources-slider.js';

// CLEANUP TRANSFORMER
function cleanupTransformer(hookName, element, payload) {
  if (hookName !== 'beforeTransform') return;
  const { document } = payload;

  element.querySelectorAll('script, style, noscript, iframe, link[rel="stylesheet"]').forEach((el) => el.remove());
  element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach((el) => el.remove());

  const announcement = element.querySelector('.srf_announcement_banner, .srf_top_banner');
  if (announcement) {
    const main = element.querySelector('main') || element;
    main.prepend(announcement);
  }

  element.querySelectorAll('header, footer, nav[class*="menu"], srf-header-menu, srf-header-dropdown-items, [class*="srf-header"], [class*="srf-footer"], [class*="srf-layout__footer"]').forEach((el) => el.remove());
  element.querySelectorAll('[aria-hidden="true"], .mp-visually-hidden').forEach((el) => el.remove());

  const marquee = element.querySelector('.mp-logo-marquee, .mp-marquee');
  if (marquee) {
    // The marquee is nested INSIDE .mp-hero on the source. The hero parser runs first
    // and replaceWith()s .mp-hero, which would destroy the marquee. Move it out to be a
    // sibling right after the hero so both blocks survive and keep source order.
    const hero = marquee.closest('.mp-hero');
    if (hero && hero.parentElement) {
      hero.after(marquee);
    }
    // Keep only the first logo group (second is an animation duplicate).
    const lists = marquee.querySelectorAll('ul');
    if (lists.length > 1) {
      for (let i = 1; i < lists.length; i++) lists[i].remove();
    }
  }

  element.querySelectorAll('.swiper-button-next, .swiper-button-prev, .swiper-pagination').forEach((el) => el.remove());
  element.querySelectorAll('.mp-search, form').forEach((el) => el.remove());
  element.querySelectorAll('[class*="outdated"], [class*="skip-to"]').forEach((el) => el.remove());
  element.querySelectorAll('img[src*="analytics"], img[src*="bat.bing"], img[src*="pixel"], img[class*="ywa"]').forEach((el) => {
    const parent = el.closest('p') || el.closest('picture') || el;
    parent.remove();
  });
}

// PARSER REGISTRY — maps block names to selectors and parse functions
const parsers = {
  'announcement-bar': announcementBarParser,
  'hero': heroParser,
  'marquee': marqueeParser,
  'promo-cards-semrush-one': promoCardsSemrushOneParser,
  'promo-cards-enterprise': promoCardsEnterpriseParser,
  'solutions-slider': solutionsSliderParser,
  'stats-facts': statsFactsParser,
  'stats-visibility': statsVisibilityParser,
  'testimonials': testimonialsParser,
  'resources-slider': resourcesSliderParser,
};

const PAGE_TEMPLATE = {
  name: 'homepage',
  blocks: [
    { name: 'announcement-bar', instances: ['.srf_announcement_banner', '.srf_top_banner'] },
    { name: 'hero', instances: ['.mp-hero'] },
    { name: 'marquee', instances: ['.mp-logo-marquee'] },
    { name: 'promo-cards-semrush-one', instances: ['.mp-promo-cards.mp-semrush-one'] },
    { name: 'promo-cards-enterprise', instances: ['.mp-promo-cards.mp-enterprise'] },
    { name: 'solutions-slider', instances: ['.mp-section.mp-toolkits'] },
    { name: 'stats-facts', instances: ['.mp-section.mp-stats'] },
    { name: 'stats-visibility', instances: ['.mp-section.mp-ai-visibility-index'] },
    { name: 'testimonials', instances: ['.mp-section.mp-client-testimonials'] },
    { name: 'resources-slider', instances: ['.mp-section.mp-resources'] },
  ],
};

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        pageBlocks.push({ name: blockDef.name, selector, element: el });
      });
    });
  });
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    cleanupTransformer('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error('Failed to parse ' + block.name + ':', e);
        }
      }
    });

    // Cascade level 1 — page template: emit the template metadata so the imported page
    // carries body.template-default (the marketing-chrome base class: gradient + marketing
    // globals) PLUS body.template-oneoff-homepage (the homepage-only hero pattern overlay).
    // decorateTemplateAndTheme splits this comma list into both classes.
    const templateMeta = WebImporter.DOMUtils.createTable(
      [['Metadata'], ['template', 'template-default, template-oneoff-homepage']],
      document,
    );
    main.append(templateMeta);

    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
