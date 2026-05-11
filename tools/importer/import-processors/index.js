import { JSDOM } from 'jsdom';
import { wrapBareImgInPicture } from './images.js';

/** @type {Array<(root: Element | DocumentFragment, doc: Document) => void>} */
const processors = [
  wrapBareImgInPicture,
];

/**
 * Run all registered import processors on raw plain HTML.
 *
 * @param {string} html
 * @returns {string}
 */
export function processPlainHtml(html) {
  if (/^\s*<!DOCTYPE/i.test(html) || /^\s*<html[\s>]/i.test(html)) {
    const dom = new JSDOM(html);
    const { document } = dom.window;
    for (const processor of processors) {
      processor(document.documentElement, document);
    }
    return dom.serialize();
  }

  const fragment = JSDOM.fragment(html);
  const doc = fragment.ownerDocument;
  for (const processor of processors) {
    processor(fragment, doc);
  }
  const holder = doc.createElement('div');
  holder.append(fragment);
  return holder.innerHTML;
}
