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

  // tools/importer/import-feature.js
  var import_feature_exports = {};
  __export(import_feature_exports, {
    default: () => import_feature_default
  });
  function absUrl(src) {
    if (!src || src === "about:error") return "";
    if (src.startsWith("//")) return "https:" + src;
    return src.startsWith("/") ? "https://www.semrush.com" + src : src;
  }
  function wrapImg(src, alt, document) {
    var p = document.createElement("p");
    var pic = document.createElement("picture");
    var img = document.createElement("img");
    img.src = absUrl(src);
    img.alt = alt || "";
    pic.appendChild(img);
    p.appendChild(pic);
    return p;
  }
  function ctaP(link, kind, document) {
    if (!link) return null;
    var href = link.getAttribute("href") || "";
    var text = link.textContent.trim();
    if (!text) return null;
    var p = document.createElement("p");
    var wrap = document.createElement(kind === "secondary" ? "em" : "strong");
    var a = document.createElement("a");
    a.href = absUrl(href);
    a.textContent = text;
    wrap.appendChild(a);
    p.appendChild(wrap);
    return p;
  }
  function richP(sourceP, document) {
    if (!sourceP) return null;
    var p = document.createElement("p");
    p.innerHTML = sourceP.innerHTML;
    p.querySelectorAll("a").forEach(function(a) {
      a.href = absUrl(a.getAttribute("href") || "");
      a.removeAttribute("target");
    });
    p.querySelectorAll("[data-ga-event-onclick], [data-ga-category], [data-test]").forEach(function(el) {
      el.removeAttribute("data-ga-event-onclick");
      el.removeAttribute("data-ga-category");
      el.removeAttribute("data-ga-action");
      el.removeAttribute("data-ga-label");
      el.removeAttribute("data-test");
    });
    return p;
  }
  function heroParser(element, { document }) {
    var wrapper = document.createElement("div");
    var h1 = element.querySelector("h1");
    if (h1) {
      var heading = document.createElement("h1");
      heading.textContent = h1.textContent.trim();
      wrapper.appendChild(heading);
    }
    var subtitle = element.querySelector(".subtitle, p");
    var rp = richP(subtitle, document);
    if (rp) wrapper.appendChild(rp);
    var cta = element.querySelector("a.button");
    var cp = ctaP(cta, "primary", document);
    if (cp) wrapper.appendChild(cp);
    var meta = WebImporter.DOMUtils.createTable(
      [["Section Metadata"], ["Style", "section-centered"]],
      document
    );
    element.replaceWith(wrapper, document.createElement("hr"));
    wrapper.parentNode.insertBefore(meta, wrapper.nextSibling);
  }
  function toolCardsParser(listEl, { document }) {
    var items = listEl.querySelectorAll(".tools__item, li");
    var rows = [["Cards Icon (cards-icon-tools)"]];
    items.forEach(function(item) {
      var cell = document.createElement("div");
      var img = item.querySelector("img.tool-card__img, img");
      if (img) cell.appendChild(wrapImg(img.getAttribute("src"), img.getAttribute("alt") || "", document));
      var title = item.querySelector(".tool-card__title, h2, h3");
      if (title) {
        var pt = document.createElement("p");
        var strong = document.createElement("strong");
        strong.textContent = title.textContent.trim();
        pt.appendChild(strong);
        cell.appendChild(pt);
      }
      var desc = item.querySelector('.tool-card__content p, p[data-test*="description"], p');
      if (desc) {
        var pd = document.createElement("p");
        pd.textContent = desc.textContent.trim();
        cell.appendChild(pd);
      }
      var btnRow = item.querySelector(".tool-card__btns") || item;
      var links = [...btnRow.querySelectorAll("a")];
      var primary = links.find(function(a) {
        return /button/.test(a.className);
      }) || links[0];
      var secondary = links.find(function(a) {
        return a !== primary;
      });
      var pc = ctaP(primary, "primary", document);
      if (pc) cell.appendChild(pc);
      var sc = ctaP(secondary, "secondary", document);
      if (sc) cell.appendChild(sc);
      rows.push([cell]);
    });
    var table = WebImporter.DOMUtils.createTable(rows, document);
    listEl.replaceWith(table);
  }
  function midCtaParser(element, { document }) {
    var wrapper = document.createElement("div");
    var h2 = element.querySelector("h2");
    if (h2) {
      var heading = document.createElement("h2");
      heading.textContent = h2.textContent.replace(/ /g, " ").trim();
      wrapper.appendChild(heading);
    }
    var cta = element.querySelector("a.button, a");
    var cp = ctaP(cta, "primary", document);
    if (cp) wrapper.appendChild(cp);
    element.replaceWith(wrapper);
  }
  function relatedParser(element, { document }) {
    var heading = element.querySelector("#related-features-title, h2");
    var intro = element.querySelector(":scope > * p, p");
    var dc = document.createElement("div");
    if (heading) {
      var h2 = document.createElement("h2");
      h2.textContent = heading.textContent.trim();
      dc.appendChild(h2);
    }
    if (intro) {
      var pIntro = document.createElement("p");
      pIntro.textContent = intro.textContent.trim();
      dc.appendChild(pIntro);
    }
    var rows = [["Cards Icon (cards-icon-related)"]];
    element.querySelectorAll(".related-links__item, li").forEach(function(item) {
      var cell = document.createElement("div");
      var title = item.querySelector(".feature-card__title, h3");
      if (title) {
        var pt = document.createElement("p");
        var strong = document.createElement("strong");
        strong.textContent = title.textContent.trim();
        pt.appendChild(strong);
        cell.appendChild(pt);
      }
      var desc = item.querySelector(".feature-card__text, p");
      if (desc) {
        var pd = document.createElement("p");
        pd.textContent = desc.textContent.trim();
        cell.appendChild(pd);
      }
      var count = item.querySelector(".feature-card__count");
      if (count) {
        var pc = document.createElement("p");
        pc.textContent = count.textContent.trim();
        cell.appendChild(pc);
      }
      var link = item.querySelector("a");
      if (link) {
        var learn = item.querySelector(".feature-card__footer-link");
        var p = document.createElement("p");
        var em = document.createElement("em");
        var a = document.createElement("a");
        a.href = absUrl(link.getAttribute("href") || "");
        a.textContent = learn ? learn.textContent.trim() : "Learn more";
        em.appendChild(a);
        p.appendChild(em);
        cell.appendChild(p);
      }
      rows.push([cell]);
    });
    var table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(dc, table);
  }
  function cleanupTransformer(hookName, element) {
    if (hookName !== "beforeTransform") return;
    element.querySelectorAll('script, style, noscript, iframe, link[rel="stylesheet"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('header, footer, nav, [class*="srf-header"], [class*="srf-footer"], [class*="srf-layout__footer"], [class*="srf-layout__header"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('[class*="outdated"], [class*="skip-to"], [aria-hidden="true"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('nav[aria-label="Breadcrumbs"], .breadcrumbs').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('img[src*="analytics"], img[src*="bat.bing"], img[src*="pixel"]').forEach(function(el) {
      var parent = el.closest("p") || el.closest("picture") || el;
      parent.remove();
    });
  }
  function afterTransformer(hookName, element, payload) {
    if (hookName !== "afterTransform") return;
    var document = payload.document;
    var midHeading = null;
    element.querySelectorAll("h2").forEach(function(h) {
      if (/win the serps|win the serp/i.test(h.textContent || "")) midHeading = h;
    });
    if (midHeading) {
      var midBlock = midHeading.closest("div") || midHeading;
      midBlock.parentNode.insertBefore(document.createElement("hr"), midBlock);
      var darkMeta = WebImporter.DOMUtils.createTable([["Section Metadata"], ["Style", "section-dark"]], document);
      midBlock.parentNode.insertBefore(darkMeta, midBlock.nextSibling);
      midBlock.parentNode.insertBefore(document.createElement("hr"), darkMeta.nextSibling);
    }
    element.appendChild(document.createElement("hr"));
    var pageMeta = WebImporter.DOMUtils.createTable(
      [["Metadata"], ["template", "template-feature"], ["nav", "../nav"], ["footer", "../footer"]],
      document
    );
    element.appendChild(pageMeta);
  }
  var PAGE_TEMPLATE = {
    name: "feature",
    blocks: [
      { name: "tool-cards", instances: [".tools__list", "ul.tools__list"] },
      { name: "related", instances: ["section.related-links", ".related-links"] }
    ]
  };
  var import_feature_default = {
    transform: function(payload) {
      var document = payload.document;
      var params = payload.params;
      var main = document.body;
      cleanupTransformer("beforeTransform", main);
      var hero = main.querySelector(".hero");
      if (hero) heroParser(hero, { document });
      var toolsList = main.querySelector(".tools__list");
      if (toolsList) toolCardsParser(toolsList, { document });
      var mid = main.querySelector(".get-trial__inner, .get-trial");
      if (mid) midCtaParser(mid, { document });
      var related = main.querySelector("section.related-links, .related-links");
      if (related) relatedParser(related, { document });
      afterTransformer("afterTransform", main, payload);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, payload.url, params.originalURL);
      var path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/features/index"
      );
      return [{
        element: main,
        path,
        report: { title: document.title, template: PAGE_TEMPLATE.name }
      }];
    }
  };
  return __toCommonJS(import_feature_exports);
})();
