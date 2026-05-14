/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/announcement-bar.js
  function parse(element, { document }) {
    const longText = element.querySelector(".srf_announcement_banner__long, .srf_top_banner__long");
    const text = longText ? longText.textContent.trim() : element.textContent.trim();
    const linkEl = element.tagName === "A" ? element : element.querySelector("a");
    const a = document.createElement("a");
    a.href = (linkEl == null ? void 0 : linkEl.href) || "";
    a.textContent = text;
    const p = document.createElement("p");
    p.appendChild(a);
    const cells = [["Announcement Bar"], [p]];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/hero.js
  function createVideoLink(fullUrl, document) {
    const p = document.createElement("p");
    const a = document.createElement("a");
    try {
      const url = new URL(fullUrl);
      const slug = url.pathname.replace(/[_.]/g, "-").replace(/\/$/, "");
      a.href = slug;
    } catch (e) {
      a.href = fullUrl;
    }
    a.textContent = fullUrl;
    p.appendChild(a);
    return p;
  }
  function parse2(element, { document }) {
    var _a;
    const h1 = element.querySelector("h1");
    if (!h1) return;
    const subtitle = element.querySelector(".mp-hero__subtitle");
    const wrapper = document.createElement("div");
    const heading = document.createElement("h1");
    heading.textContent = h1.textContent.trim();
    wrapper.appendChild(heading);
    if (subtitle) {
      const p = document.createElement("p");
      p.textContent = subtitle.textContent.trim();
      wrapper.appendChild(p);
    }
    const widgetContent = document.createElement("div");
    const searchInput = element.querySelector("input[placeholder]");
    const searchBtn = element.querySelector('button[type="submit"], .mp-hero__search-button');
    const p1 = document.createElement("p");
    p1.textContent = (searchInput == null ? void 0 : searchInput.getAttribute("placeholder")) || "Enter your website";
    widgetContent.appendChild(p1);
    const p2 = document.createElement("p");
    p2.textContent = ((_a = searchBtn == null ? void 0 : searchBtn.textContent) == null ? void 0 : _a.trim()) || "Get insights";
    widgetContent.appendChild(p2);
    const insightsTable = WebImporter.DOMUtils.createTable([["Insights Widget"], [widgetContent]], document);
    wrapper.appendChild(insightsTable);
    const video = element.querySelector("video");
    const videoCell = document.createElement("div");
    if (video) {
      const source = video.querySelector('source[type="video/mp4"]') || video.querySelector("source");
      const videoUrl = (source == null ? void 0 : source.getAttribute("src")) || video.getAttribute("src") || "";
      if (videoUrl) {
        const fullUrl = videoUrl.startsWith("/") ? `https://www.semrush.com${videoUrl}` : videoUrl;
        videoCell.appendChild(createVideoLink(fullUrl, document));
      }
      const posterSrc = video.getAttribute("poster") || "";
      if (posterSrc) {
        const p = document.createElement("p");
        const pic = document.createElement("picture");
        const img = document.createElement("img");
        img.src = posterSrc.startsWith("/") ? `https://www.semrush.com${posterSrc}` : posterSrc;
        img.alt = video.getAttribute("aria-label") || "Semrush platform toolkits overview";
        pic.appendChild(img);
        p.appendChild(pic);
        videoCell.appendChild(p);
      }
    } else {
      const posterImg = element.querySelector(".mp-hero__video-wrapper img");
      const posterSrc = (posterImg == null ? void 0 : posterImg.getAttribute("src")) || "https://www.semrush.com/static/plg_toolkits.webp";
      videoCell.appendChild(createVideoLink("https://www.semrush.com/static/videos/plg_toolkits_with_pr.mp4", document));
      const pEl = document.createElement("p");
      const pic = document.createElement("picture");
      const img = document.createElement("img");
      img.src = posterSrc.startsWith("/") ? `https://www.semrush.com${posterSrc}` : posterSrc;
      img.alt = (posterImg == null ? void 0 : posterImg.alt) || "Semrush platform toolkits overview";
      pic.appendChild(img);
      pEl.appendChild(pic);
      videoCell.appendChild(pEl);
    }
    const videoTable = WebImporter.DOMUtils.createTable([["Video"], [videoCell]], document);
    wrapper.appendChild(videoTable);
    const sectionMetaTable = WebImporter.DOMUtils.createTable(
      [["Section Metadata"], ["Style", "section-centered"]],
      document
    );
    wrapper.appendChild(sectionMetaTable);
    element.replaceWith(wrapper);
  }

  // tools/importer/parsers/marquee.js
  function parse3(element, { document }) {
    const firstGroup = element.querySelector(".mp-logo-marquee__group, ul");
    if (!firstGroup) return;
    const logos = firstGroup.querySelectorAll("img");
    if (logos.length === 0) return;
    const content = document.createElement("div");
    logos.forEach((img) => {
      var _a;
      const p = document.createElement("p");
      const picture = document.createElement("picture");
      const imgEl = document.createElement("img");
      const source = (_a = img.closest("picture")) == null ? void 0 : _a.querySelector("source[srcset]");
      const src = (source == null ? void 0 : source.getAttribute("srcset")) || img.getAttribute("src") || "";
      imgEl.src = src.startsWith("/") ? `https://www.semrush.com${src}` : src;
      imgEl.alt = img.alt || "";
      picture.appendChild(imgEl);
      p.appendChild(picture);
      content.appendChild(p);
    });
    const cells = [["Marquee"], [content]];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/promo-cards-semrush-one.js
  function createVideoLink2(fullUrl, document) {
    const p = document.createElement("p");
    const a = document.createElement("a");
    try {
      const url = new URL(fullUrl);
      a.href = url.pathname.replace(/[_.]/g, "-").replace(/\/$/, "");
    } catch (e) {
      a.href = fullUrl;
    }
    a.textContent = fullUrl;
    p.appendChild(a);
    return p;
  }
  function parse4(element, { document }) {
    const h2 = element.querySelector("h2");
    const description = element.querySelector('.mp-promo-cards__text, p:not([class*="button"])');
    const ctaLink = element.querySelector("a.mp-button");
    const video = element.querySelector("video");
    const textContent = document.createElement("div");
    if (h2) {
      const heading = document.createElement("h2");
      heading.innerHTML = h2.innerHTML;
      textContent.appendChild(heading);
    }
    if (description) {
      const p = document.createElement("p");
      p.textContent = description.textContent.trim();
      textContent.appendChild(p);
    }
    if (ctaLink) {
      const p = document.createElement("p");
      const isOutline = ctaLink.classList.contains("mp-button--outline") || ctaLink.classList.contains("mp-button--ghost") || ctaLink.classList.contains("mp-button--secondary");
      const wrapper = isOutline ? document.createElement("em") : document.createElement("strong");
      const a = document.createElement("a");
      a.href = ctaLink.href;
      a.textContent = ctaLink.textContent.trim();
      wrapper.appendChild(a);
      p.appendChild(wrapper);
      textContent.appendChild(p);
    }
    const rows = [["Video Card (video-card-semrush-one)"], [textContent]];
    const mediaContent = document.createElement("div");
    if (video) {
      const source = video.querySelector('source[type="video/mp4"]') || video.querySelector("source");
      const videoUrl = source ? source.getAttribute("src") || source.getAttribute("data-src") || "" : video.getAttribute("src") || "";
      if (videoUrl) {
        const fullUrl = videoUrl.startsWith("/") ? `https://www.semrush.com${videoUrl}` : videoUrl;
        mediaContent.appendChild(createVideoLink2(fullUrl, document));
      }
      const posterSrc = video.getAttribute("poster") || "";
      if (posterSrc) {
        const p = document.createElement("p");
        const pic = document.createElement("picture");
        const img = document.createElement("img");
        img.src = posterSrc.startsWith("/") ? `https://www.semrush.com${posterSrc}` : posterSrc;
        img.alt = video.getAttribute("aria-label") || "";
        pic.appendChild(img);
        p.appendChild(pic);
        mediaContent.appendChild(p);
      }
    }
    if (mediaContent.children.length > 0) {
      rows.push([mediaContent]);
    }
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/promo-cards-enterprise.js
  function createVideoLink3(fullUrl, document) {
    const p = document.createElement("p");
    const a = document.createElement("a");
    try {
      const url = new URL(fullUrl);
      a.href = url.pathname.replace(/[_.]/g, "-").replace(/\/$/, "");
    } catch (e) {
      a.href = fullUrl;
    }
    a.textContent = fullUrl;
    p.appendChild(a);
    return p;
  }
  function parse5(element, { document }) {
    const h2 = element.querySelector("h2");
    const description = element.querySelector('.mp-promo-cards__text, p:not([class*="button"])');
    const ctaLink = element.querySelector("a.mp-button");
    const video = element.querySelector("video");
    const textContent = document.createElement("div");
    if (h2) {
      const heading = document.createElement("h2");
      heading.innerHTML = h2.innerHTML;
      textContent.appendChild(heading);
    }
    if (description) {
      const p = document.createElement("p");
      p.textContent = description.textContent.trim();
      textContent.appendChild(p);
    }
    if (ctaLink) {
      const p = document.createElement("p");
      const isOutline = ctaLink.classList.contains("mp-button--outline") || ctaLink.classList.contains("mp-button--ghost") || ctaLink.classList.contains("mp-button--secondary");
      const wrapper = isOutline ? document.createElement("em") : document.createElement("strong");
      const a = document.createElement("a");
      a.href = ctaLink.href;
      a.textContent = ctaLink.textContent.trim();
      wrapper.appendChild(a);
      p.appendChild(wrapper);
      textContent.appendChild(p);
    }
    const rows = [["Video Card (video-card-enterprise)"], [textContent]];
    const mediaContent = document.createElement("div");
    if (video) {
      const source = video.querySelector('source[type="video/mp4"]') || video.querySelector("source");
      const videoUrl = source ? source.getAttribute("src") || source.getAttribute("data-src") || "" : video.getAttribute("src") || "";
      if (videoUrl) {
        const fullUrl = videoUrl.startsWith("/") ? `https://www.semrush.com${videoUrl}` : videoUrl;
        mediaContent.appendChild(createVideoLink3(fullUrl, document));
      }
      const posterSrc = video.getAttribute("poster") || "";
      if (posterSrc) {
        const p = document.createElement("p");
        const pic = document.createElement("picture");
        const img = document.createElement("img");
        img.src = posterSrc.startsWith("/") ? `https://www.semrush.com${posterSrc}` : posterSrc;
        img.alt = video.getAttribute("aria-label") || "";
        pic.appendChild(img);
        p.appendChild(pic);
        mediaContent.appendChild(p);
      }
    }
    if (mediaContent.children.length > 0) {
      rows.push([mediaContent]);
    }
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/solutions-slider.js
  function parse6(element, { document }) {
    const wrapper = document.createElement("div");
    const sectionH2 = element.querySelector("h2");
    const sectionSubtitle = element.querySelector("h2 ~ h3, h3");
    const slides = element.querySelectorAll(".mp-toolkit, .swiper-slide");
    if (sectionH2) {
      const eyebrow = document.createElement("p");
      const h2Text = sectionH2.textContent.trim();
      eyebrow.textContent = /\(\s*\d+\s*\)/.test(h2Text) ? h2Text : `${h2Text} ( ${slides.length} )`;
      wrapper.appendChild(eyebrow);
    }
    if (sectionSubtitle) {
      const h2 = document.createElement("h2");
      h2.textContent = sectionSubtitle.textContent.trim();
      wrapper.appendChild(h2);
    }
    const rows = [["Carousel Slider (carousel-slider-expansible)"]];
    slides.forEach((slide) => {
      const title = slide.querySelector("h3");
      const subtitle = slide.querySelector("h4");
      const desc = slide.querySelector(".mp-toolkit__description");
      const cta = slide.querySelector("a.mp-button, a.mp-toolkit__cta");
      const posterWrapper = slide.querySelector(".mp-toolkit__poster");
      const smallImg = posterWrapper ? posterWrapper.querySelector("img") : null;
      const contentImgWrapper = slide.querySelector(".mp-toolkit__content .mp-toolkit__img-wrapper");
      const largeSource = contentImgWrapper ? contentImgWrapper.querySelector('source[media="(min-width: 768px)"]') : null;
      const largeImg = contentImgWrapper ? contentImgWrapper.querySelector("img") : null;
      let largeSrc = "";
      if (largeSource) largeSrc = largeSource.srcset;
      else if (largeImg) largeSrc = largeImg.src;
      const col1 = document.createElement("div");
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        col1.appendChild(h3);
      }
      if (subtitle) {
        const p = document.createElement("p");
        p.textContent = subtitle.textContent.trim();
        col1.appendChild(p);
      }
      if (smallImg) {
        const pic = document.createElement("picture");
        const imgEl = document.createElement("img");
        imgEl.src = smallImg.src;
        imgEl.alt = smallImg.alt || "";
        pic.appendChild(imgEl);
        col1.appendChild(pic);
      }
      const col2 = document.createElement("div");
      if (largeSrc) {
        const pic = document.createElement("picture");
        const imgEl = document.createElement("img");
        imgEl.src = largeSrc;
        imgEl.alt = largeImg ? largeImg.alt || "" : "";
        pic.appendChild(imgEl);
        col2.appendChild(pic);
      }
      if (desc) {
        const p = document.createElement("p");
        p.textContent = desc.textContent.trim();
        col2.appendChild(p);
      }
      if (cta) {
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        const a = document.createElement("a");
        a.href = cta.href;
        a.textContent = cta.textContent.trim();
        strong.appendChild(a);
        p.appendChild(strong);
        col2.appendChild(p);
      }
      rows.push([col1, col2]);
    });
    const table = WebImporter.DOMUtils.createTable(rows, document);
    wrapper.appendChild(table);
    element.replaceWith(wrapper);
  }

  // tools/importer/parsers/stats-facts.js
  function parse7(element, { document }) {
    const sectionH2 = element.querySelector("h2");
    const sectionSubtitle = element.querySelector("h3");
    const learnMoreLink = element.querySelector('a[href*="/stats/"]');
    const statItems = element.querySelectorAll("li");
    const wrapper = document.createElement("div");
    if (sectionH2) {
      const eyebrow = document.createElement("p");
      eyebrow.textContent = sectionH2.textContent.trim();
      wrapper.appendChild(eyebrow);
    }
    if (sectionSubtitle) {
      const h2 = document.createElement("h2");
      h2.textContent = sectionSubtitle.textContent.trim();
      wrapper.appendChild(h2);
    }
    if (learnMoreLink) {
      const p = document.createElement("p");
      const em = document.createElement("em");
      const a = document.createElement("a");
      a.href = learnMoreLink.href;
      a.textContent = learnMoreLink.textContent.trim();
      em.appendChild(a);
      p.appendChild(em);
      wrapper.appendChild(p);
    }
    const rows = [["Stats Facts"]];
    statItems.forEach((item) => {
      const countEl = item.querySelector(".mp-stats__item-count, b");
      const titleEl = item.querySelector(".mp-stats__item-title");
      const descEl = item.querySelector(".mp-stats__item-description");
      const value = countEl ? countEl.textContent.trim() : "";
      const title = titleEl ? titleEl.textContent.trim() : "";
      const desc = descEl ? descEl.textContent.trim() : "";
      if (value) {
        const cell = document.createElement("div");
        const pVal = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = value;
        pVal.appendChild(strong);
        cell.appendChild(pVal);
        const pTitle = document.createElement("p");
        pTitle.textContent = title;
        cell.appendChild(pTitle);
        const pDesc = document.createElement("p");
        pDesc.textContent = desc;
        cell.appendChild(pDesc);
        rows.push([cell]);
      }
    });
    const table = WebImporter.DOMUtils.createTable(rows, document);
    wrapper.appendChild(table);
    element.replaceWith(wrapper);
  }

  // tools/importer/parsers/stats-visibility.js
  function parse8(element, { document }) {
    const h2 = element.querySelector("h2");
    const subtitle = element.querySelector(".mp-ai-visibility-index__subtitle, h2 + p");
    const ctaLink = element.querySelector('a.mp-button, a[href*="ai-visibility-index"]');
    const tableRows = element.querySelectorAll("tbody tr, .mp-ai-visibility-index__sov");
    const wrapper = document.createElement("div");
    if (h2) {
      const heading = document.createElement("h2");
      heading.textContent = h2.textContent.trim();
      wrapper.appendChild(heading);
    }
    if (subtitle) {
      const p = document.createElement("p");
      p.textContent = subtitle.textContent.trim();
      wrapper.appendChild(p);
    }
    if (ctaLink) {
      const p = document.createElement("p");
      const strong = document.createElement("strong");
      const a = document.createElement("a");
      a.href = ctaLink.href;
      a.textContent = ctaLink.textContent.trim();
      strong.appendChild(a);
      p.appendChild(strong);
      wrapper.appendChild(p);
    }
    const rows = [["Stats Visibility"]];
    const headerCellBrand = document.createElement("div");
    headerCellBrand.textContent = "Brand";
    const headerCellSov = document.createElement("div");
    headerCellSov.textContent = "% Share of Voice";
    const platformEl = element.querySelector('[class*="platform"], [class*="source"]');
    const platformText = platformEl ? platformEl.textContent.trim() : "";
    if (platformText) {
      const headerCellPlatform = document.createElement("div");
      headerCellPlatform.textContent = platformText;
      rows.push([headerCellBrand, headerCellSov, headerCellPlatform]);
    } else {
      rows.push([headerCellBrand, headerCellSov]);
    }
    tableRows.forEach((tr) => {
      const cells = tr.querySelectorAll("td");
      if (cells.length >= 2) {
        const brand = cells[0].textContent.trim();
        const valueEl = cells[1].querySelector('[class*="value"]');
        const value = valueEl ? valueEl.textContent.trim() : cells[1].textContent.trim();
        const brandCell = document.createElement("div");
        brandCell.textContent = brand;
        const valueCell = document.createElement("div");
        valueCell.textContent = value;
        rows.push([brandCell, valueCell]);
      }
    });
    const table = WebImporter.DOMUtils.createTable(rows, document);
    wrapper.appendChild(table);
    const sectionMeta = WebImporter.DOMUtils.createTable(
      [["Section Metadata"], ["Style", "section-dark, section-ai-visibility"]],
      document
    );
    wrapper.appendChild(sectionMeta);
    element.replaceWith(wrapper);
  }

  // tools/importer/parsers/testimonials.js
  function parse9(element, { document }) {
    const sectionH2 = element.querySelector("h2");
    const sectionSubtitle = element.querySelector("h3");
    const quote = element.querySelector("blockquote, .mp-client-testimonials__quote");
    const authorImgEl = element.querySelector(".mp-client-testimonials__author-img img, .mp-client-testimonials__quote-author-img img");
    const authorCite = element.querySelector(".mp-client-testimonials__quote-author cite");
    const authorName = authorCite ? authorCite.querySelector("b") : null;
    const authorRole = authorCite ? authorCite.querySelector("span") : null;
    const statNumber = element.querySelector(".mp-client-testimonials__stats-block-number");
    const statText = element.querySelector(".mp-client-testimonials__stats-block-text");
    const wrapper = document.createElement("div");
    if (sectionH2) {
      const eyebrow = document.createElement("p");
      eyebrow.textContent = sectionH2.textContent.trim();
      wrapper.appendChild(eyebrow);
    }
    if (sectionSubtitle) {
      const h2 = document.createElement("h2");
      h2.textContent = sectionSubtitle.textContent.trim();
      wrapper.appendChild(h2);
    }
    const rows = [["Testimonials"]];
    const quoteCell = document.createElement("div");
    if (quote) {
      const bq = document.createElement("blockquote");
      bq.textContent = quote.textContent.trim();
      quoteCell.appendChild(bq);
    }
    rows.push([quoteCell]);
    const authorCell = document.createElement("div");
    if (authorImgEl) {
      const pic = document.createElement("picture");
      const img = document.createElement("img");
      const src = authorImgEl.getAttribute("src") || "";
      img.src = src.startsWith("/") ? `https://www.semrush.com${src}` : src;
      img.alt = authorName ? authorName.textContent.trim() : "";
      pic.appendChild(img);
      authorCell.appendChild(pic);
    }
    if (authorName) {
      const p = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = authorName.textContent.trim();
      p.appendChild(strong);
      authorCell.appendChild(p);
    }
    if (authorRole) {
      const p = document.createElement("p");
      p.textContent = authorRole.textContent.trim();
      authorCell.appendChild(p);
    }
    rows.push([authorCell]);
    if (statNumber || statText) {
      const statCell = document.createElement("div");
      if (statNumber) {
        const p = document.createElement("p");
        p.textContent = statNumber.textContent.trim();
        statCell.appendChild(p);
      }
      if (statText) {
        const p = document.createElement("p");
        p.textContent = statText.textContent.trim();
        statCell.appendChild(p);
      }
      rows.push([statCell]);
    }
    const table = WebImporter.DOMUtils.createTable(rows, document);
    wrapper.appendChild(table);
    element.replaceWith(wrapper);
  }

  // tools/importer/parsers/resources-slider.js
  function parse10(element, { document }) {
    const wrapper = document.createElement("div");
    const sectionTitle = element.querySelector("h2");
    const sectionSubtitle = element.querySelector("h3");
    if (sectionTitle) {
      const p = document.createElement("p");
      p.textContent = `Resources ( ${element.querySelectorAll("article, .mp-resources__item").length} )`;
      wrapper.appendChild(p);
    }
    if (sectionSubtitle) {
      const h2 = document.createElement("h2");
      h2.textContent = sectionSubtitle.textContent.trim();
      wrapper.appendChild(h2);
    }
    const articles = element.querySelectorAll("article, .mp-resources__item");
    const rows = [["Carousel Slider"]];
    articles.forEach((article) => {
      var _a;
      const img = article.querySelector("img");
      const titleLink = article.querySelector('h3 a, a[class*="title"]');
      const tags = article.querySelectorAll('.mp-resources__item-info-tag, [class*="tag"]');
      const imgCell = document.createElement("div");
      if (img) {
        const src = img.getAttribute("src") || "";
        if (src && src !== "about:error") {
          const pic = document.createElement("picture");
          const imgEl = document.createElement("img");
          imgEl.src = src.startsWith("/") ? `https://www.semrush.com${src}` : src;
          imgEl.alt = img.alt || ((_a = titleLink == null ? void 0 : titleLink.textContent) == null ? void 0 : _a.trim()) || "";
          pic.appendChild(imgEl);
          imgCell.appendChild(pic);
        }
      }
      const textCell = document.createElement("div");
      if (titleLink) {
        const h3 = document.createElement("h3");
        const a = document.createElement("a");
        a.href = titleLink.href;
        a.textContent = titleLink.textContent.trim();
        h3.appendChild(a);
        textCell.appendChild(h3);
      }
      const descEl = article.querySelector('.mp-resources__item-description, [class*="description"]');
      if (descEl) {
        const descP = document.createElement("p");
        descP.textContent = descEl.textContent.trim();
        textCell.appendChild(descP);
      }
      const tagText = [...tags].map((t) => t.textContent.trim()).join(" \xB7 ");
      if (tagText) {
        const p = document.createElement("p");
        p.textContent = tagText;
        textCell.appendChild(p);
      }
      rows.push([imgCell, textCell]);
    });
    const table = WebImporter.DOMUtils.createTable(rows, document);
    wrapper.appendChild(table);
    element.replaceWith(wrapper);
  }

  // tools/importer/import-homepage.js
  function cleanupTransformer(hookName, element, payload) {
    if (hookName !== "beforeTransform") return;
    const { document } = payload;
    element.querySelectorAll('script, style, noscript, iframe, link[rel="stylesheet"]').forEach((el) => el.remove());
    element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach((el) => el.remove());
    const announcement = element.querySelector(".srf_announcement_banner, .srf_top_banner");
    if (announcement) {
      const main = element.querySelector("main") || element;
      main.prepend(announcement);
    }
    element.querySelectorAll('header, footer, nav[class*="menu"], srf-header-menu, srf-header-dropdown-items, [class*="srf-header"], [class*="srf-footer"], [class*="srf-layout__footer"]').forEach((el) => el.remove());
    element.querySelectorAll('[aria-hidden="true"], .mp-visually-hidden').forEach((el) => el.remove());
    const marquee = element.querySelector(".mp-logo-marquee, .mp-marquee");
    if (marquee) {
      const lists = marquee.querySelectorAll("ul");
      if (lists.length > 1) {
        for (let i = 1; i < lists.length; i++) lists[i].remove();
      }
    }
    element.querySelectorAll(".swiper-button-next, .swiper-button-prev, .swiper-pagination").forEach((el) => el.remove());
    element.querySelectorAll(".mp-search, form").forEach((el) => el.remove());
    element.querySelectorAll('[class*="outdated"], [class*="skip-to"]').forEach((el) => el.remove());
    element.querySelectorAll('img[src*="analytics"], img[src*="bat.bing"], img[src*="pixel"], img[class*="ywa"]').forEach((el) => {
      const parent = el.closest("p") || el.closest("picture") || el;
      parent.remove();
    });
  }
  var parsers = {
    "announcement-bar": parse,
    "hero": parse2,
    "marquee": parse3,
    "promo-cards-semrush-one": parse4,
    "promo-cards-enterprise": parse5,
    "solutions-slider": parse6,
    "stats-facts": parse7,
    "stats-visibility": parse8,
    "testimonials": parse9,
    "resources-slider": parse10
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    blocks: [
      { name: "announcement-bar", instances: [".srf_announcement_banner", ".srf_top_banner"] },
      { name: "hero", instances: [".mp-hero"] },
      { name: "marquee", instances: [".mp-logo-marquee"] },
      { name: "promo-cards-semrush-one", instances: [".mp-promo-cards.mp-semrush-one"] },
      { name: "promo-cards-enterprise", instances: [".mp-promo-cards.mp-enterprise"] },
      { name: "solutions-slider", instances: [".mp-section.mp-toolkits"] },
      { name: "stats-facts", instances: [".mp-section.mp-stats"] },
      { name: "stats-visibility", instances: [".mp-section.mp-ai-visibility-index"] },
      { name: "testimonials", instances: [".mp-section.mp-client-testimonials"] },
      { name: "resources-slider", instances: [".mp-section.mp-resources"] }
    ]
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
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      cleanupTransformer("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error("Failed to parse " + block.name + ":", e);
          }
        }
      });
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
