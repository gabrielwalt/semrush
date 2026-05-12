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
  function wrapCta(ctaLink, document) {
    var p = document.createElement("p");
    var a = document.createElement("a");
    a.href = ctaLink.href;
    a.textContent = ctaLink.textContent.trim();
    var isOutline = ctaLink.classList.contains("mp-button--outline") || ctaLink.classList.contains("mp-button--ghost") || ctaLink.classList.contains("mp-button--secondary");
    if (isOutline) {
      var em = document.createElement("em");
      em.appendChild(a);
      p.appendChild(em);
    } else {
      var strong = document.createElement("strong");
      strong.appendChild(a);
      p.appendChild(strong);
    }
    return p;
  }
  function announcementBarParser(element, { document }) {
    var _a, _b;
    const text = ((_a = element.querySelector(".srf_announcement_banner__long")) == null ? void 0 : _a.textContent) || element.textContent.trim();
    const a = document.createElement("a");
    a.href = element.href || ((_b = element.querySelector("a")) == null ? void 0 : _b.href) || "";
    a.textContent = text;
    const p = document.createElement("p");
    p.appendChild(a);
    const cells = [["Announcement Bar"], [p]];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
  function heroParser(element, { document }) {
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
    var widgetContent = document.createElement("div");
    var wp1 = document.createElement("p");
    wp1.textContent = "Enter your website";
    widgetContent.appendChild(wp1);
    var wp2 = document.createElement("p");
    wp2.textContent = "Get insights";
    widgetContent.appendChild(wp2);
    var insightsTable = WebImporter.DOMUtils.createTable([["Insights Widget"], [widgetContent]], document);
    wrapper.appendChild(insightsTable);
    var video = element.querySelector("video");
    var videoCell = document.createElement("div");
    if (video) {
      var videoSrc = video.src || "";
      var source = video.querySelector("source");
      if (source) videoSrc = source.src || source.getAttribute("src") || "";
      if (videoSrc) {
        var vp = document.createElement("p");
        var va = document.createElement("a");
        va.href = videoSrc;
        va.textContent = videoSrc;
        vp.appendChild(va);
        videoCell.appendChild(vp);
      }
      var posterSrc = video.poster || "https://www.semrush.com/static/plg_toolkits.webp";
      var pp = document.createElement("p");
      var ppic = document.createElement("picture");
      var pimg = document.createElement("img");
      pimg.src = posterSrc;
      pimg.alt = "Semrush platform toolkits overview";
      ppic.appendChild(pimg);
      pp.appendChild(ppic);
      videoCell.appendChild(pp);
    } else {
      var fp = document.createElement("p");
      var fpic = document.createElement("picture");
      var fimg = document.createElement("img");
      fimg.src = "https://www.semrush.com/static/plg_toolkits.webp";
      fimg.alt = "Semrush platform toolkits overview";
      fpic.appendChild(fimg);
      fp.appendChild(fpic);
      videoCell.appendChild(fp);
    }
    var heroVideoTable = WebImporter.DOMUtils.createTable([["Hero Video"], [videoCell]], document);
    wrapper.appendChild(heroVideoTable);
    var sectionMetaTable = WebImporter.DOMUtils.createTable(
      [["Section Metadata"], ["Style", "section-centered"]],
      document
    );
    wrapper.appendChild(sectionMetaTable);
    wrapper.appendChild(document.createElement("hr"));
    element.replaceWith(wrapper);
  }
  function marqueeParser(element, { document }) {
    const firstGroup = element.querySelector(".mp-logo-marquee__group, ul");
    if (!firstGroup) {
      element.remove();
      return;
    }
    const logos = firstGroup.querySelectorAll("img");
    if (logos.length === 0) {
      element.remove();
      return;
    }
    const content = document.createElement("div");
    logos.forEach((img) => {
      const p = document.createElement("p");
      const pic = document.createElement("picture");
      const imgEl = document.createElement("img");
      const src = img.getAttribute("src") || "";
      imgEl.src = src.startsWith("/") ? "https://www.semrush.com" + src : src;
      imgEl.alt = img.alt || "";
      pic.appendChild(imgEl);
      p.appendChild(pic);
      content.appendChild(p);
    });
    const cells = [["Marquee"], [content]];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
  function promoCardsSemrushOneParser(element, { document }) {
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
      textContent.appendChild(wrapCta(ctaLink, document));
    }
    const rows = [["Video Card (video-card-semrush-one)"], [textContent]];
    if (video) {
      var mediaContent = document.createElement("div");
      var source = video.querySelector('source[type="video/mp4"]') || video.querySelector("source");
      var videoUrl = source ? source.getAttribute("src") || source.getAttribute("data-src") || "" : video.getAttribute("src") || "";
      if (videoUrl) {
        var vp = document.createElement("p");
        var va = document.createElement("a");
        var fullVideoUrl = videoUrl.startsWith("/") ? "https://www.semrush.com" + videoUrl : videoUrl;
        va.href = fullVideoUrl;
        va.textContent = fullVideoUrl;
        vp.appendChild(va);
        mediaContent.appendChild(vp);
      }
      var posterSrc = video.getAttribute("poster") || "";
      if (posterSrc) {
        var pp = document.createElement("p");
        var ppic = document.createElement("picture");
        var pimg = document.createElement("img");
        pimg.src = posterSrc.startsWith("/") ? "https://www.semrush.com" + posterSrc : posterSrc;
        pimg.alt = video.getAttribute("aria-label") || "";
        ppic.appendChild(pimg);
        pp.appendChild(ppic);
        mediaContent.appendChild(pp);
      }
      if (mediaContent.children.length > 0) rows.push([mediaContent]);
    }
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
  function promoCardsEnterpriseParser(element, { document }) {
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
      textContent.appendChild(wrapCta(ctaLink, document));
    }
    const rows = [["Video Card (video-card-enterprise)"], [textContent]];
    if (video) {
      var mediaContent = document.createElement("div");
      var source = video.querySelector('source[type="video/mp4"]') || video.querySelector("source");
      var videoUrl = source ? source.getAttribute("src") || source.getAttribute("data-src") || "" : video.getAttribute("src") || "";
      if (videoUrl) {
        var vp = document.createElement("p");
        var va = document.createElement("a");
        var fullVideoUrl = videoUrl.startsWith("/") ? "https://www.semrush.com" + videoUrl : videoUrl;
        va.href = fullVideoUrl;
        va.textContent = fullVideoUrl;
        vp.appendChild(va);
        mediaContent.appendChild(vp);
      }
      var posterSrc = video.getAttribute("poster") || "";
      if (posterSrc) {
        var pp = document.createElement("p");
        var ppic = document.createElement("picture");
        var pimg = document.createElement("img");
        pimg.src = posterSrc.startsWith("/") ? "https://www.semrush.com" + posterSrc : posterSrc;
        pimg.alt = video.getAttribute("aria-label") || "";
        ppic.appendChild(pimg);
        pp.appendChild(ppic);
        mediaContent.appendChild(pp);
      }
      if (mediaContent.children.length > 0) rows.push([mediaContent]);
    }
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
  function solutionsSliderParser(element, { document }) {
    const wrapper = document.createElement("div");
    const sectionH2 = element.querySelector("h2");
    const sectionSubtitle = element.querySelector("h2 ~ h3, h3");
    const slides = element.querySelectorAll(".mp-toolkit.swiper-slide");
    if (sectionH2) {
      const eyebrow = document.createElement("p");
      eyebrow.textContent = sectionH2.textContent.trim() + " ( " + slides.length + " )";
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
      const img = slide.querySelector("img");
      const textCell = document.createElement("div");
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        textCell.appendChild(h3);
      }
      if (subtitle) {
        const p = document.createElement("p");
        p.textContent = subtitle.textContent.trim();
        textCell.appendChild(p);
      }
      const desc = slide.querySelector(".mp-toolkit__description");
      if (desc) {
        const p = document.createElement("p");
        p.textContent = desc.textContent.trim();
        textCell.appendChild(p);
      }
      const cta = slide.querySelector("a.mp-button");
      if (cta) {
        textCell.appendChild(wrapCta(cta, document));
      }
      const imgCell = document.createElement("div");
      if (img) {
        const pic = document.createElement("picture");
        const imgEl = document.createElement("img");
        imgEl.src = img.src;
        imgEl.alt = img.alt || "";
        pic.appendChild(imgEl);
        imgCell.appendChild(pic);
      }
      rows.push([textCell, imgCell]);
    });
    const table = WebImporter.DOMUtils.createTable(rows, document);
    wrapper.appendChild(table);
    element.replaceWith(wrapper);
  }
  function statsParser(element, { document }) {
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
      wrapper.appendChild(wrapCta(learnMoreLink, document));
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
  function aiVisibilityIndexParser(element, { document }) {
    const h2 = element.querySelector("h2");
    const subtitle = element.querySelector(".mp-ai-visibility-index__subtitle, h2 + p");
    const ctaLink = element.querySelector('a.mp-button, a[href*="ai-visibility-index"]');
    const tableRows = element.querySelectorAll("tbody tr");
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
      wrapper.appendChild(wrapCta(ctaLink, document));
    }
    const rows = [["Stats Visibility"]];
    const hBrand = document.createElement("div");
    hBrand.textContent = "Brand";
    const hSov = document.createElement("div");
    hSov.textContent = "% Share of Voice";
    rows.push([hBrand, hSov]);
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
    var sectionMeta = WebImporter.DOMUtils.createTable(
      [["Section Metadata"], ["Style", "section-dark"]],
      document
    );
    wrapper.appendChild(sectionMeta);
    element.replaceWith(wrapper);
  }
  function testimonialsParser(element, { document }) {
    const sectionH2 = element.querySelector("h2");
    const sectionSubtitle = element.querySelector("h3");
    const logoImg = element.querySelector(".mp-client-testimonials__logo-img img");
    const quote = element.querySelector("blockquote, .mp-client-testimonials__quote");
    const authorImg = element.querySelector(".mp-client-testimonials__author-img");
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
      const h2el = document.createElement("h2");
      h2el.textContent = sectionSubtitle.textContent.trim();
      wrapper.appendChild(h2el);
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
    if (authorImg) {
      const pic = document.createElement("picture");
      const img = document.createElement("img");
      img.src = authorImg.src || "";
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
  function resourcesSliderParser(element, { document }) {
    const sectionH2 = element.querySelector("h2");
    const sectionSubtitle = element.querySelector("h3");
    const wrapper = document.createElement("div");
    const articles = element.querySelectorAll("article");
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
    const rows = [["Carousel Slider"]];
    articles.forEach((article) => {
      const img = article.querySelector("img");
      const titleLink = article.querySelector("h3 a");
      const tags = article.querySelectorAll('.mp-resources__item-info-tag, [class*="tag"]');
      const imgCell = document.createElement("div");
      if (img) {
        const src = img.getAttribute("src") || "";
        if (src && src !== "about:error") {
          const pic = document.createElement("picture");
          const imgEl = document.createElement("img");
          imgEl.src = src.startsWith("/") ? "https://www.semrush.com" + src : src;
          imgEl.alt = img.alt || "";
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
  function cleanupTransformer(hookName, element, payload) {
    if (hookName !== "beforeTransform") return;
    const { document } = payload;
    element.querySelectorAll('script, style, noscript, iframe, link[rel="stylesheet"]').forEach((el) => el.remove());
    element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach((el) => el.remove());
    const announcement = element.querySelector(".srf_announcement_banner");
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
    "announcement-bar": announcementBarParser,
    "hero": heroParser,
    "marquee": marqueeParser,
    "promo-cards-semrush-one": promoCardsSemrushOneParser,
    "promo-cards-enterprise": promoCardsEnterpriseParser,
    "solutions-slider": solutionsSliderParser,
    "stats-facts": statsParser,
    "stats-visibility": aiVisibilityIndexParser,
    "testimonials": testimonialsParser,
    "resources-slider": resourcesSliderParser
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    blocks: [
      { name: "announcement-bar", instances: [".srf_announcement_banner"] },
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
