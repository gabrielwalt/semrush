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

  // tools/importer/import-case-study.js
  var import_case_study_exports = {};
  __export(import_case_study_exports, {
    default: () => import_case_study_default
  });
  function absUrl(src) {
    if (!src || src === "about:error") return "";
    if (src.startsWith("//")) return "https:" + src;
    return src.startsWith("/") ? "https://www.semrush.com" + src : src;
  }
  function decodeNextImg(src) {
    if (!src) return "";
    var m = src.match(/[?&]url=([^&]+)/);
    if (m) {
      try {
        return decodeURIComponent(m[1]);
      } catch (e) {
        return absUrl(src);
      }
    }
    return absUrl(src);
  }
  function ctaP(link, kind, document) {
    if (!link) return null;
    var href = link.getAttribute("href") || "";
    var text = link.textContent.trim();
    if (!text || !href) return null;
    var p = document.createElement("p");
    var wrap = document.createElement(kind === "secondary" ? "em" : "strong");
    var a = document.createElement("a");
    a.href = absUrl(href);
    a.textContent = text;
    wrap.appendChild(a);
    p.appendChild(wrap);
    return p;
  }
  function heroLogoParser(band, { document }) {
    var wrapper = document.createElement("div");
    var logo = band.querySelector("img");
    if (logo) {
      var p = document.createElement("p");
      var pic = document.createElement("picture");
      var img = document.createElement("img");
      img.src = decodeNextImg(logo.getAttribute("src"));
      img.alt = logo.getAttribute("alt") || "";
      pic.appendChild(img);
      p.appendChild(pic);
      wrapper.appendChild(p);
    }
    return wrapper;
  }
  function cleanArticle(article, { document }) {
    var clone = article.cloneNode(true);
    clone.querySelectorAll('nav[aria-label="Contents of the article"]').forEach(function(el) {
      el.remove();
    });
    clone.querySelectorAll('[aria-label^="Share the article"]').forEach(function(el) {
      el.remove();
    });
    clone.querySelectorAll('span[data-menu="heading"]').forEach(function(el) {
      el.remove();
    });
    clone.querySelectorAll("section.gch-1dwyxx3").forEach(function(el) {
      el.remove();
    });
    clone.querySelectorAll('button, [data-ui-name="Button"]:not(a)').forEach(function(el) {
      el.remove();
    });
    clone.querySelectorAll("iframe").forEach(function(frame) {
      var src = frame.getAttribute("src") || "";
      if (/youtube|youtu\.be|vimeo/.test(src)) {
        var p = document.createElement("p");
        var a = document.createElement("a");
        var clean = src.split("?")[0];
        a.href = clean;
        a.textContent = clean;
        p.appendChild(a);
        (frame.closest("div") || frame).replaceWith(p);
      } else {
        (frame.closest("div") || frame).remove();
      }
    });
    clone.querySelectorAll("img").forEach(function(img) {
      var src = img.getAttribute("src") || "";
      if (/\.svg(\?|$)/i.test(src) && !img.getAttribute("alt")) {
        (img.closest("p") || img).remove();
        return;
      }
      img.src = decodeNextImg(src);
      img.removeAttribute("srcset");
      if (!img.closest("picture")) {
        var pic = document.createElement("picture");
        img.parentNode.insertBefore(pic, img);
        pic.appendChild(img);
      }
    });
    clone.querySelectorAll("a").forEach(function(a) {
      a.href = absUrl(a.getAttribute("href") || "");
      a.removeAttribute("target");
      ["data-ga-event-onclick", "data-ga-category", "data-ga-action", "data-ga-label", "data-test", "data-ui-name"].forEach(function(attr) {
        a.removeAttribute(attr);
      });
    });
    return clone;
  }
  function promoParser(section, { document }) {
    var wrapper = document.createElement("div");
    var heading = section.querySelector("h2, h3, h4");
    if (heading) {
      var h = document.createElement(heading.tagName.toLowerCase());
      h.textContent = heading.textContent.trim();
      wrapper.appendChild(h);
    }
    section.querySelectorAll("p").forEach(function(p) {
      var t = p.textContent.trim();
      if (t && t.length > 20) {
        var np = document.createElement("p");
        np.textContent = t;
        wrapper.appendChild(np);
      }
    });
    var link = section.querySelector("a[href]");
    var cp = ctaP(link, "primary", document);
    if (cp) wrapper.appendChild(cp);
    return wrapper;
  }
  function cleanupTransformer(hookName, element) {
    if (hookName !== "beforeTransform") return;
    element.querySelectorAll('script, style, noscript, link[rel="stylesheet"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('header, footer, nav[class*="srf"], [class*="srf-header"], [class*="srf-footer"], [class*="srf-layout__footer"], [class*="srf-layout__header"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('img[src*="analytics"], img[src*="bat.bing"], img[src*="pixel"]').forEach(function(el) {
      var parent = el.closest("p") || el.closest("picture") || el;
      parent.remove();
    });
  }
  var import_case_study_default = {
    transform: function(payload) {
      var document = payload.document;
      var params = payload.params;
      var sourceMain = document.body;
      cleanupTransformer("beforeTransform", sourceMain);
      var out = document.createElement("div");
      var band = sourceMain.querySelector("div.gch-k18f9v");
      if (band) {
        out.appendChild(heroLogoParser(band, { document }));
        out.appendChild(document.createElement("hr"));
      }
      var article = sourceMain.querySelector("article");
      var promoSection = article ? article.querySelector("section.gch-1dwyxx3") : null;
      if (article) {
        out.appendChild(cleanArticle(article, { document }));
      }
      if (promoSection) {
        out.appendChild(document.createElement("hr"));
        out.appendChild(promoParser(promoSection, { document }));
        out.appendChild(WebImporter.DOMUtils.createTable([["Section Metadata"], ["Style", "section-dark"]], document));
      }
      out.appendChild(document.createElement("hr"));
      out.appendChild(WebImporter.DOMUtils.createTable(
        [["Metadata"], ["template", "template-default, template-case-study"], ["nav", "../../nav"], ["footer", "../../footer"]],
        document
      ));
      sourceMain.innerHTML = "";
      sourceMain.appendChild(out);
      WebImporter.rules.transformBackgroundImages(sourceMain, document);
      WebImporter.rules.adjustImageUrls(sourceMain, payload.url, params.originalURL);
      var path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: sourceMain,
        path,
        report: { title: document.title, template: "case-study" }
      }];
    }
  };
  return __toCommonJS(import_case_study_exports);
})();
