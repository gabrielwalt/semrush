/**
 * Wrap every <img> not already under a <picture> ancestor in <picture>...</picture>.
 *
 * Runs after WebImporter md2da(), which can emit bare <img> tags that block markup expects
 * inside <picture>.
 *
 * @param {DocumentFragment | Element} root
 * @param {Document} doc
 */
export function wrapBareImgInPicture(root, doc) {
  const imgs = [...root.querySelectorAll('img')];
  for (const img of imgs) {
    if (img.closest('picture')) continue;
    const parent = img.parentNode;
    if (!parent) continue;
    const picture = doc.createElement('picture');
    parent.insertBefore(picture, img);
    picture.appendChild(img);
  }
}
