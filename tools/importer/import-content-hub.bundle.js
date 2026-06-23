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

  // tools/importer/import-content-hub.js
  var import_content_hub_exports = {};
  __export(import_content_hub_exports, {
    default: () => import_content_hub_default
  });
  function absUrl(src) {
    if (!src || src === "about:error") return "";
    var m = /[?&]url=([^&]+)/.exec(src);
    if (m) {
      try {
        src = decodeURIComponent(m[1]);
      } catch (e) {
      }
    }
    if (src.startsWith("//")) return "https:" + src;
    return src.startsWith("/") ? "https://www.semrush.com" + src : src;
  }
  function textP(text, document) {
    var p = document.createElement("p");
    p.textContent = (text || "").replace(/\s+/g, " ").trim();
    return p;
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
  function ctaP(text, href, kind, document) {
    if (!text || !href) return null;
    var p = document.createElement("p");
    var wrap = document.createElement(kind === "secondary" ? "em" : "strong");
    var a = document.createElement("a");
    a.href = absUrl(href);
    a.textContent = text.replace(/\s+/g, " ").trim();
    wrap.appendChild(a);
    p.appendChild(wrap);
    return p;
  }
  function extractCards(region, document) {
    var anchors = [].slice.call(region.querySelectorAll("li a[href], ul a[href], article a[href]")).filter(function(a, i, arr) {
      return arr.indexOf(a) === i;
    });
    if (anchors.length < 2) return null;
    var cards = [];
    anchors.forEach(function(a) {
      var title = a.querySelector("h2, h3, h4");
      if (!title) return;
      var card = {
        href: a.getAttribute("href") || "",
        title: title.textContent.replace(/\s+/g, " ").trim(),
        img: (a.querySelector("img") || {}).src ? a.querySelector("img").getAttribute("src") : null,
        desc: "",
        cta: ""
      };
      a.querySelectorAll("p").forEach(function(p) {
        var t = p.textContent.replace(/\s+/g, " ").trim();
        if (t && t !== card.title) card.desc = card.desc ? card.desc : t;
      });
      var btn = a.querySelector("button");
      if (btn) card.cta = btn.textContent.replace(/\s+/g, " ").trim();
      cards.push(card);
    });
    return cards.length ? cards : null;
  }
  function extractStats(region) {
    var items = region.querySelectorAll("li");
    if (items.length < 2 || items.length > 4) return null;
    var stats = [];
    var ok = true;
    items.forEach(function(li) {
      var t = li.textContent.replace(/\s+/g, " ").trim();
      var m = /^([\d.,]+\s*[%MKkМ+]*)\s+(.+)$/.exec(t);
      if (m) stats.push({ num: m[1].trim(), label: m[2].trim() });
      else ok = false;
    });
    return ok && stats.length ? stats : null;
  }
  function cardsBlock(cards, document) {
    var withImg = cards.filter(function(c) {
      return c.img;
    });
    var covers = withImg.filter(function(c) {
      return /\/banners\/|\/uploads\/media\//.test(absUrl(c.img || ""));
    });
    var feature = withImg.length >= 2 && covers.length > withImg.length / 2;
    var rows = [[feature ? "Cards Icon (cards-icon-feature)" : "Cards Icon"]];
    cards.forEach(function(c) {
      var cell = document.createElement("div");
      if (c.img) cell.appendChild(wrapImg(c.img, c.title, document));
      var pt = document.createElement("p");
      var strong = document.createElement("strong");
      if (c.href) {
        var a = document.createElement("a");
        a.href = absUrl(c.href);
        a.textContent = c.title;
        strong.appendChild(a);
      } else {
        strong.textContent = c.title;
      }
      pt.appendChild(strong);
      cell.appendChild(pt);
      if (c.desc) cell.appendChild(textP(c.desc, document));
      var cp = ctaP(c.cta || (c.href ? "Learn more" : ""), c.href, "secondary", document);
      if (cp) cell.appendChild(cp);
      rows.push([cell]);
    });
    return WebImporter.DOMUtils.createTable(rows, document);
  }
  function statsBlock(stats, document) {
    var rows = [["Columns Stats"]];
    var row = stats.map(function(s) {
      var cell = document.createElement("div");
      var h3 = document.createElement("h3");
      h3.textContent = s.num;
      cell.appendChild(h3);
      cell.appendChild(textP(s.label, document));
      return cell;
    });
    rows.push(row);
    return WebImporter.DOMUtils.createTable(rows, document);
  }
  function proseRegion(region, wrapper, document) {
    region.querySelectorAll("h1, h2, h3, h4, p, ul, ol").forEach(function(el) {
      if (el.closest("a")) return;
      var tag = el.tagName.toLowerCase();
      if (/^h[1-4]$/.test(tag)) {
        if (el.closest("li")) return;
        var ht = el.textContent.replace(/\s+/g, " ").trim();
        if (!ht) return;
        var hh = document.createElement(tag === "h1" ? "h2" : tag);
        hh.textContent = ht;
        wrapper.appendChild(hh);
        return;
      }
      if (tag === "ul" || tag === "ol") {
        if (el.closest("li")) return;
        if (el.querySelector("li h3, li h4")) {
          el.querySelectorAll(":scope > li").forEach(function(li) {
            var h = li.querySelector("h3, h4");
            var label = h ? h.textContent.replace(/\s+/g, " ").trim() : "";
            if (label) {
              var hh2 = document.createElement("h3");
              hh2.textContent = label;
              wrapper.appendChild(hh2);
            }
            var full = li.textContent.replace(/\s+/g, " ").trim();
            var desc = label && full.indexOf(label) === 0 ? full.slice(label.length).trim() : full;
            if (desc && desc !== label) wrapper.appendChild(textP(desc, document));
          });
          return;
        }
        var list = document.createElement(tag);
        el.querySelectorAll(":scope > li").forEach(function(li) {
          var parts = [].slice.call(li.querySelectorAll("p, h2, h3, h4, span, div")).filter(function(n) {
            return !n.querySelector("p, h2, h3, h4, span, div, img");
          }).map(function(n) {
            return n.textContent.replace(/\s+/g, " ").trim();
          }).filter(function(s) {
            return s;
          });
          var seen = [];
          parts.forEach(function(s) {
            if (seen[seen.length - 1] !== s) seen.push(s);
          });
          seen = seen.filter(function(s) {
            return !/^(step\s*\d*|\d+)$/i.test(s);
          });
          var lt = "";
          seen.forEach(function(s, i) {
            if (i === 0) {
              lt = s;
              return;
            }
            lt += /[:—\-.]$/.test(lt) ? " " + s : " \u2014 " + s;
          });
          if (!lt) lt = li.textContent.replace(/\s+/g, " ").trim();
          if (lt) {
            var liEl = document.createElement("li");
            liEl.textContent = lt;
            list.appendChild(liEl);
          }
        });
        if (list.childNodes.length) wrapper.appendChild(list);
        return;
      }
      if (el.closest("li")) return;
      if (el.closest("ul, ol")) return;
      var t = el.textContent.replace(/\s+/g, " ").trim();
      if (t && t.length > 1) wrapper.appendChild(textP(t, document));
    });
    var numbered = [].slice.call(region.querySelectorAll("p")).filter(function(p) {
      return /^\d+$/.test(p.textContent.replace(/\s+/g, "")) && !p.closest("a, li");
    });
    if (numbered.length >= 2) {
      var ol = document.createElement("ol");
      numbered.forEach(function(p) {
        var num = p.textContent.replace(/\s+/g, "");
        var full = (p.parentElement ? p.parentElement.textContent : "").replace(/\s+/g, " ").trim();
        var desc = full.replace(new RegExp("^" + num + "[.)]?\\s*"), "").trim();
        if (desc) {
          var li2 = document.createElement("li");
          li2.textContent = desc;
          ol.appendChild(li2);
        }
      });
      if (ol.childNodes.length) wrapper.appendChild(ol);
    }
    var cta = null;
    region.querySelectorAll("a[href]").forEach(function(a) {
      if (cta || a.closest("p, li, ul, ol, h1, h2, h3, h4")) return;
      var at = a.textContent.replace(/\s+/g, " ").trim();
      if (at && at.length <= 60) cta = a;
    });
    if (cta) {
      var cp = ctaP(cta.textContent, cta.getAttribute("href"), "primary", document);
      if (cp) wrapper.appendChild(cp);
    }
  }
  function heroLead(heroBox, h1) {
    var WIDGET = 'input, button, select, textarea, [role="combobox"], [role="button"], [contenteditable]';
    var out = [];
    heroBox.querySelectorAll("p").forEach(function(p) {
      if (p.querySelector(WIDGET)) return;
      var t = p.textContent.replace(/\s+/g, " ").trim();
      if (t && t.length > 1) out.push(t);
    });
    if (out.length) return out;
    var kids = heroBox.querySelectorAll("div, span");
    for (var i = 0; i < kids.length; i += 1) {
      var el = kids[i];
      if (el.contains(h1) || el.querySelector(WIDGET + ", h1, ul, ol, a[href]")) continue;
      var t2 = el.textContent.replace(/\s+/g, " ").trim();
      if (t2.length >= 20 && t2.length <= 400 && !/^\d+\s*\/\s*\d+$/.test(t2)) {
        out.push(t2);
        break;
      }
    }
    return out;
  }
  function findContentBands(h1) {
    var node = h1;
    while (node && node.parentElement && node.parentElement.tagName !== "BODY") {
      var sibs = [].slice.call(node.parentElement.children);
      var headed = sibs.filter(function(s) {
        return s.querySelector("h1, h2, h3");
      });
      if (headed.length >= 2) return sibs;
      node = node.parentElement;
    }
    return null;
  }
  function regionHeading(region, wrapper, document, level) {
    var h = region.querySelector("h1, h2, h3");
    if (h) {
      var hh = document.createElement(level || "h2");
      hh.textContent = h.textContent.replace(/\s+/g, " ").trim();
      wrapper.appendChild(hh);
    }
    var ul = region.querySelector('ul, ol, [role="list"]');
    region.querySelectorAll("p").forEach(function(p) {
      if (ul && ul.contains(p)) return;
      if (p.closest("a, li")) return;
      if (h && p.textContent.trim() === h.textContent.trim()) return;
      var t = p.textContent.replace(/\s+/g, " ").trim();
      if (t && t.length > 1) wrapper.appendChild(textP(t, document));
    });
    var cta = null;
    region.querySelectorAll("a[href]").forEach(function(a) {
      if (ul && ul.contains(a)) return;
      if (a.closest("li")) return;
      if (!cta && a.textContent.trim()) cta = a;
    });
    if (cta) {
      var cp = ctaP(cta.textContent, cta.getAttribute("href"), "primary", document);
      if (cp) wrapper.appendChild(cp);
    }
  }
  function cleanupTransformer(hookName, element) {
    if (hookName !== "beforeTransform") return;
    element.querySelectorAll('script, style, noscript, link[rel="stylesheet"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('header, footer, [class*="srf-header"], [class*="srf-footer"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll("nav").forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('[aria-label*="browser"], complementary').forEach(function(el) {
      el.remove();
    });
  }
  var import_content_hub_default = {
    transform: function(payload) {
      var document = payload.document;
      var params = payload.params;
      var sourceMain = document.body;
      cleanupTransformer("beforeTransform", sourceMain);
      var main = sourceMain.querySelector("main") || sourceMain;
      var out = document.createElement("div");
      function pushSection(node, metaStyle) {
        if (!node) return;
        out.appendChild(node);
        if (metaStyle) {
          out.appendChild(WebImporter.DOMUtils.createTable([["Section Metadata"], ["Style", metaStyle]], document));
        }
        out.appendChild(document.createElement("hr"));
      }
      var h1 = main.querySelector("h1");
      if (h1) {
        var heroWrap = document.createElement("div");
        var hh = document.createElement("h1");
        hh.textContent = h1.textContent.replace(/\s+/g, " ").trim();
        heroWrap.appendChild(hh);
        var heroBox = h1.parentElement;
        if (heroBox) {
          heroLead(heroBox, h1).forEach(function(t) {
            heroWrap.appendChild(textP(t, document));
          });
        }
        pushSection(heroWrap, "section-centered");
      }
      var article = main.querySelector("article");
      if (article) {
        var aw = document.createElement("div");
        article.querySelectorAll(":scope h2, :scope h3, :scope h4, :scope p, :scope ul, :scope ol, :scope blockquote, :scope figure img").forEach(function(el) {
          var tag = el.tagName.toLowerCase();
          if (tag === "img") {
            aw.appendChild(wrapImg(el.getAttribute("src"), el.getAttribute("alt") || "", document));
            return;
          }
          if (/^h[2-4]$/.test(tag)) {
            var hh2 = document.createElement(tag);
            hh2.textContent = el.textContent.replace(/\s+/g, " ").trim();
            if (hh2.textContent) aw.appendChild(hh2);
            return;
          }
          if (tag === "ul" || tag === "ol") {
            var list = document.createElement(tag);
            el.querySelectorAll(":scope > li").forEach(function(li) {
              var liEl = document.createElement("li");
              liEl.textContent = li.textContent.replace(/\s+/g, " ").trim();
              if (liEl.textContent) list.appendChild(liEl);
            });
            if (list.childNodes.length) aw.appendChild(list);
            return;
          }
          if (tag === "blockquote") {
            var bq = document.createElement("blockquote");
            el.querySelectorAll("p").forEach(function(p) {
              var t2 = p.textContent.replace(/\s+/g, " ").trim();
              if (t2) bq.appendChild(textP(t2, document));
            });
            if (!bq.childNodes.length) bq.appendChild(textP(el.textContent, document));
            aw.appendChild(bq);
            return;
          }
          if (el.closest("ul, ol, blockquote") && article.contains(el.closest("ul, ol, blockquote"))) return;
          var t = el.textContent.replace(/\s+/g, " ").trim();
          if (t) {
            var pp = document.createElement("p");
            var only = el.querySelector("a[href]");
            if (only && only.textContent.trim() === t) {
              var a = document.createElement("a");
              a.href = absUrl(only.getAttribute("href"));
              a.textContent = t;
              pp.appendChild(a);
            } else {
              pp.textContent = t;
            }
            aw.appendChild(pp);
          }
        });
        if (aw.childNodes.length) pushSection(aw, null);
        out.appendChild(WebImporter.DOMUtils.createTable(
          [["Metadata"], ["template", "template-default"], ["nav", "/nav"], ["footer", "/footer"]],
          document
        ));
        sourceMain.innerHTML = "";
        sourceMain.appendChild(out);
        WebImporter.rules.transformBackgroundImages(sourceMain, document);
        WebImporter.rules.adjustImageUrls(sourceMain, payload.url, params.originalURL);
        var apath = WebImporter.FileUtils.sanitizePath(
          new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/content-hub/index"
        );
        return [{ element: sourceMain, path: apath, report: { title: document.title, template: "content-hub-article" } }];
      }
      function classifyInto(region, frag) {
        var stats = extractStats(region);
        if (stats) {
          var sw = document.createElement("div");
          regionHeading(region, sw, document);
          if (sw.childNodes.length) frag.push([sw, null]);
          frag.push([statsBlock(stats, document), null]);
          return;
        }
        var cards = extractCards(region, document);
        if (cards) {
          var cw = document.createElement("div");
          regionHeading(region, cw, document);
          if (cw.childNodes.length) frag.push([cw, null]);
          frag.push([cardsBlock(cards, document), null]);
          return;
        }
        var pw = document.createElement("div");
        proseRegion(region, pw, document);
        if (pw.childNodes.length) frag.push([pw, null]);
      }
      var allSections = [].slice.call(main.querySelectorAll('section, [role="region"]'));
      var topRegions = allSections.filter(function(s) {
        return !allSections.some(function(other) {
          return other !== s && other.contains(s);
        });
      });
      var fragA = [];
      topRegions.forEach(function(region) {
        if (h1 && region.contains(h1)) return;
        classifyInto(region, fragA);
      });
      var fragB = [];
      if (h1) {
        var bands = findContentBands(h1);
        if (bands) {
          bands.forEach(function(band) {
            if (band.contains(h1)) return;
            if (band.tagName === "SCRIPT" || band.tagName === "STYLE") return;
            classifyInto(band, fragB);
          });
        }
      }
      function weigh(frag) {
        var n = 0;
        frag.forEach(function(pair) {
          n += (pair[0].textContent || "").replace(/\s+/g, " ").trim().length;
        });
        return n;
      }
      var chosen = weigh(fragB) > weigh(fragA) ? fragB : fragA;
      chosen.forEach(function(pair) {
        pushSection(pair[0], pair[1]);
      });
      var hasFeatureGrid = !!out.querySelector('.cards-icon-feature, [class*="cards-icon-feature"]') || /cards-icon-feature/.test(out.innerHTML);
      var tmpl = hasFeatureGrid ? "template-default, template-content-hub" : "template-default";
      out.appendChild(WebImporter.DOMUtils.createTable(
        [["Metadata"], ["template", tmpl], ["nav", "/nav"], ["footer", "/footer"]],
        document
      ));
      sourceMain.innerHTML = "";
      sourceMain.appendChild(out);
      WebImporter.rules.transformBackgroundImages(sourceMain, document);
      WebImporter.rules.adjustImageUrls(sourceMain, payload.url, params.originalURL);
      var path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/content-hub/index"
      );
      return [{
        element: sourceMain,
        path,
        report: { title: document.title, template: "content-hub" }
      }];
    }
  };
  return __toCommonJS(import_content_hub_exports);
})();
