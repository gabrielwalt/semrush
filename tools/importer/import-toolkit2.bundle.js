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

  // tools/importer/import-toolkit2.js
  var import_toolkit2_exports = {};
  __export(import_toolkit2_exports, {
    default: () => import_toolkit2_default
  });
  var ORIGIN = "https://www.semrush.com";
  var abs = (s) => !s ? "" : s.startsWith("//") ? `https:${s}` : s.startsWith("/") ? `${ORIGIN}${s}` : s;
  function pic(document, src, alt) {
    const p = document.createElement("picture");
    const img = document.createElement("img");
    img.src = abs(src);
    img.alt = alt || "";
    p.appendChild(img);
    return p;
  }
  function para(document, text) {
    const p = document.createElement("p");
    p.textContent = text;
    return p;
  }
  function ctaPara(document, text, href, primary) {
    const p = document.createElement("p");
    const w = document.createElement(primary ? "strong" : "em");
    const a = document.createElement("a");
    a.href = abs(href || "#");
    a.textContent = text;
    w.appendChild(a);
    p.appendChild(w);
    return p;
  }
  function firstText(el, min) {
    return [...el.querySelectorAll("p, div")].map((d) => d.childNodes.length === 1 ? d.textContent.trim() : "").find((t) => t.length > (min || 25)) || "";
  }
  function cleanup(hookName, element) {
    if (hookName !== "beforeTransform") return;
    element.querySelectorAll('script, style, noscript, iframe, link[rel="stylesheet"]').forEach((el) => el.remove());
    element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach((el) => el.remove());
    element.querySelectorAll('header, footer, nav, [class*="srf-header"], [class*="srf-footer"], [class*="snav-"]').forEach((el) => el.remove());
    element.querySelectorAll('[class*="outdated"], [class*="skip-to"], .visually-hidden').forEach((el) => el.remove());
  }
  function collectSections(document) {
    const main = document.querySelector("main") || document.body;
    const SECTION_SEL = 'section, [role="region"]';
    let secs = [...main.querySelectorAll(SECTION_SEL)].filter((s) => s.querySelector("h1, h2, h3")).filter((s) => !s.parentElement.closest(SECTION_SEL));
    if (secs.length >= 3) return secs;
    const cands = [...main.querySelectorAll("div, section")].filter((el) => el.children.length >= 3 && el.children.length <= 16);
    let best = null;
    let score = 0;
    cands.forEach((c) => {
      const s = [...c.children].filter((ch) => ch.tagName === "SECTION" || ch.querySelector("h1, h2, h3")).length;
      if (s > score) {
        score = s;
        best = c;
      }
    });
    if (best) {
      secs = [...best.children].filter((c) => c.tagName === "SECTION" || c.querySelector("h1, h2, h3"));
      if (secs.length >= 3) return secs;
    }
    const headed = [...main.querySelectorAll("div, section")].filter((el) => el.querySelector(":scope > h1, :scope > h2, :scope > * > h1, :scope > * > h2")).filter((el, _i, arr) => !arr.some((o) => o !== el && o.contains(el)));
    return headed;
  }
  function buildHero(sec, document, out) {
    const h1 = sec.querySelector("h1") || sec.querySelector("h2");
    const eyebrow = sec.querySelector("p");
    if (eyebrow && eyebrow.textContent.trim() && (!h1 || !h1.contains(eyebrow))) {
      const pre = eyebrow.textContent.trim();
      if (pre.length < 60) out.appendChild(para(document, pre));
    }
    if (h1) {
      const h = document.createElement("h1");
      h.textContent = h1.textContent.trim();
      out.appendChild(h);
    }
    const sub = firstText(sec, 30);
    if (sub) out.appendChild(para(document, sub));
    const cta = [...sec.querySelectorAll("a")].find((a) => a.textContent.trim() && !/log ?in/i.test(a.textContent));
    if (cta) out.appendChild(ctaPara(document, cta.textContent.trim(), cta.getAttribute("href"), true));
    out.appendChild(WebImporter.DOMUtils.createTable([["Section Metadata"], ["Style", "section-centered"]], document));
  }
  function buildAccordion(sec, document, out) {
    const h = sec.querySelector("h2");
    if (h) {
      const el = document.createElement("h2");
      el.textContent = h.textContent.trim();
      out.appendChild(el);
    }
    let qNodes = [...sec.querySelectorAll("button")].filter((b) => b.textContent.trim().length > 8);
    if (!qNodes.length) qNodes = [...sec.querySelectorAll("h3")];
    const rows = [["Accordion"]];
    qNodes.forEach((q) => {
      var _a;
      const qDiv = document.createElement("div");
      qDiv.appendChild(para(document, q.textContent.trim()));
      const aDiv = document.createElement("div");
      let n = q.nextElementSibling;
      if (!n && q.parentElement) n = q.parentElement.nextElementSibling;
      while (n && n.tagName !== "H3" && !((_a = n.querySelector) == null ? void 0 : _a.call(n, "button"))) {
        aDiv.appendChild(n.cloneNode(true));
        n = n.nextElementSibling;
      }
      if (!aDiv.children.length && q.parentElement) {
        const sib = q.parentElement.nextElementSibling;
        if (sib) aDiv.appendChild(sib.cloneNode(true));
      }
      rows.push([qDiv, aDiv]);
    });
    if (rows.length > 1) out.appendChild(WebImporter.DOMUtils.createTable(rows, document));
  }
  function findCardItems(sec) {
    const articles = [...sec.querySelectorAll("article")].filter((a) => a.querySelector("h3, h4"));
    if (articles.length >= 2) return articles;
    const lis = [...sec.querySelectorAll("li")].filter((li) => !li.parentElement.closest("li, article")).filter((li) => li.querySelector("h3, h4") || li.textContent.trim().length > 20);
    if (lis.length >= 3) return lis;
    const groups = [...sec.querySelectorAll("div")].filter((g) => {
      const kids = [...g.children].filter((c) => c.querySelector(":scope h3, :scope h4") || c.querySelector("p") && c.querySelector("img"));
      return kids.length >= 3;
    });
    if (groups.length) {
      const best = groups.find((x) => !groups.some((o) => o !== x && o.contains(x))) || groups[0];
      return [...best.children].filter((c) => c.querySelector("h3, h4") || c.querySelector("p") && c.querySelector("img"));
    }
    return [];
  }
  function buildFeatureCards(sec, document, out) {
    const h = sec.querySelector("h2");
    if (h) {
      const el = document.createElement("h2");
      el.textContent = h.textContent.trim();
      out.appendChild(el);
    }
    const sub = firstText(sec, 30);
    if (sub) out.appendChild(para(document, sub));
    const items = findCardItems(sec);
    const rows = [["Cards Icon"]];
    items.forEach((li) => {
      const cell = document.createElement("div");
      const img = li.querySelector("img");
      if (img) cell.appendChild(pic(document, img.getAttribute("src"), img.alt));
      const hh = li.querySelector("h3, h4");
      const eyebrow = li.querySelector("p");
      if (eyebrow && hh && eyebrow.compareDocumentPosition(hh) & Node.DOCUMENT_POSITION_FOLLOWING && eyebrow.textContent.trim().length < 30) {
        cell.appendChild(para(document, eyebrow.textContent.trim()));
      }
      if (hh) {
        const t = para(document, "");
        const s = document.createElement("strong");
        s.textContent = hh.textContent.trim();
        t.appendChild(s);
        cell.appendChild(t);
      }
      const subList = li.querySelector("ul, ol");
      if (subList) {
        const ul = document.createElement("ul");
        [...subList.querySelectorAll("li")].forEach((x) => {
          const i = document.createElement("li");
          i.textContent = x.textContent.trim();
          ul.appendChild(i);
        });
        cell.appendChild(ul);
      } else {
        const d = firstText(li, 20);
        if (d) cell.appendChild(para(document, d));
      }
      const a = li.querySelector("a");
      if (a) cell.appendChild(ctaPara(document, a.textContent.trim(), a.getAttribute("href"), false));
      if (cell.children.length) rows.push([cell]);
    });
    if (rows.length > 1) out.appendChild(WebImporter.DOMUtils.createTable(rows, document));
  }
  function buildTestimonials(sec, document, out) {
    const h = sec.querySelector("h2");
    if (h) {
      const el = document.createElement("h2");
      el.textContent = h.textContent.trim();
      out.appendChild(el);
    }
    const quoteRe = /["“”]/;
    const rows = [["Testimonials Carousel"]];
    let quotes = [...sec.querySelectorAll('article, li, figure, blockquote, [role="tabpanel"]')].filter((q) => quoteRe.test(q.textContent) && q.querySelector("p, img")).filter((q, _i, arr) => !arr.some((o) => o !== q && o.contains(q)));
    if (quotes.length >= 2) {
      quotes.forEach((q) => {
        const cell = document.createElement("div");
        const quoteText = [...q.querySelectorAll("p")].map((p) => p.textContent.trim()).find((t) => t.length > 40 && quoteRe.test(t));
        if (quoteText) {
          const bq = document.createElement("blockquote");
          bq.appendChild(para(document, quoteText));
          cell.appendChild(bq);
        }
        const img = q.querySelector("img");
        if (img) cell.appendChild(pic(document, img.getAttribute("src"), img.alt));
        const ps = [...q.querySelectorAll("p")].map((p) => p.textContent.trim()).filter((t) => t.length <= 40 && t.length > 2 && !quoteRe.test(t));
        if (ps[0]) {
          const np = para(document, "");
          const s = document.createElement("strong");
          s.textContent = ps[0];
          np.appendChild(s);
          cell.appendChild(np);
        }
        if (ps[1]) cell.appendChild(para(document, ps[1]));
        if (cell.children.length) rows.push([cell]);
      });
    } else {
      const slideRe = /^\d+\s*\/\s*\d+$/;
      const ps = [...sec.querySelectorAll("p")].map((p) => p.textContent.trim()).filter((t) => t.length > 1 && !slideRe.test(t));
      let cell = null;
      ps.forEach((t) => {
        const isQuote = t.length > 60 || quoteRe.test(t) && t.length > 40;
        if (isQuote) {
          if (cell && cell.children.length) rows.push([cell]);
          cell = document.createElement("div");
          const bq = document.createElement("blockquote");
          bq.appendChild(para(document, t));
          cell.appendChild(bq);
        } else if (cell) {
          if (!cell.querySelector("strong")) {
            const np = para(document, "");
            const s = document.createElement("strong");
            s.textContent = t;
            np.appendChild(s);
            cell.appendChild(np);
          } else if (cell.querySelectorAll("p").length < 2) cell.appendChild(para(document, t));
        }
      });
      if (cell && cell.children.length) rows.push([cell]);
    }
    if (rows.length > 1) out.appendChild(WebImporter.DOMUtils.createTable(rows, document));
  }
  function buildComparisonTable(sec, document, out) {
    const h = sec.querySelector("h2");
    if (h) {
      const el = document.createElement("h2");
      el.textContent = h.textContent.trim();
      out.appendChild(el);
    }
    const sub = firstText(sec, 30);
    if (sub) out.appendChild(para(document, sub));
    const table = sec.querySelector("table");
    if (table) {
      const clean = table.cloneNode(true);
      clean.querySelectorAll("button, a").forEach((b) => {
        if (/log ?in|get started/i.test(b.textContent)) b.remove();
      });
      out.appendChild(clean);
    }
  }
  function buildDefaultCta(sec, document, out) {
    const h = sec.querySelector("h2");
    if (h) {
      const el = document.createElement("h2");
      el.textContent = h.textContent.trim();
      out.appendChild(el);
    }
    const sub = firstText(sec, 25);
    if (sub) out.appendChild(para(document, sub));
    const cta = [...sec.querySelectorAll("a")].find((a) => a.textContent.trim() && !/log ?in/i.test(a.textContent));
    if (cta) out.appendChild(ctaPara(document, cta.textContent.trim(), cta.getAttribute("href"), true));
    out.appendChild(WebImporter.DOMUtils.createTable([["Section Metadata"], ["Style", "section-centered"]], document));
  }
  function classify(sec, isFirst) {
    var _a;
    if (isFirst && sec.querySelector("h1, h2")) return "hero";
    if (sec.querySelector("table")) return "table";
    const qButtons = [...sec.querySelectorAll("button")].filter((b) => /\?$/.test(b.textContent.trim())).length;
    const qHeads = [...sec.querySelectorAll("h3")].filter((b) => /\?$/.test(b.textContent.trim())).length;
    if (qButtons >= 2 || qHeads >= 2) return "faq";
    const hText = (((_a = sec.querySelector("h2")) == null ? void 0 : _a.textContent) || "").toLowerCase().trim();
    const headingSaysTestimonial = /testimonial|customers love|users love|what .* say/.test(hText);
    if (hText === "testimonials") return "testimonials";
    const quoteRe = /["“”']/;
    const quoteItems = [...sec.querySelectorAll('article, li, figure, blockquote, [role="tabpanel"]')].filter((q) => quoteRe.test(q.textContent)).length;
    const quoteParas = [...sec.querySelectorAll("p")].filter((p) => /["“”]/.test(p.textContent) && p.textContent.trim().length > 40).length;
    if (quoteItems >= 2 || headingSaysTestimonial && quoteParas >= 1 || quoteParas >= 3) return "testimonials";
    if (findCardItems(sec).length >= 2) return "cards";
    return "default";
  }
  var import_toolkit2_default = {
    transform: (payload) => {
      const { document, params } = payload;
      const main = document.body;
      cleanup("beforeTransform", main);
      const sections = collectSections(document);
      const result = document.createElement("div");
      let first = true;
      sections.forEach((sec, idx) => {
        const kind = classify(sec, idx === 0);
        const out = document.createElement("div");
        if (kind === "hero") buildHero(sec, document, out);
        else if (kind === "faq") buildAccordion(sec, document, out);
        else if (kind === "testimonials") buildTestimonials(sec, document, out);
        else if (kind === "table") buildComparisonTable(sec, document, out);
        else if (kind === "cards") buildFeatureCards(sec, document, out);
        else buildDefaultCta(sec, document, out);
        if (out.childNodes.length) {
          if (!first) result.appendChild(document.createElement("hr"));
          while (out.firstChild) result.appendChild(out.firstChild);
          first = false;
        }
      });
      result.appendChild(document.createElement("hr"));
      result.appendChild(WebImporter.DOMUtils.createTable([["Metadata"], ["template", "template-toolkit"]], document));
      main.innerHTML = "";
      main.appendChild(result);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, payload.url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{ element: main, path, report: { title: document.title, template: "toolkit-v2" } }];
    }
  };
  return __toCommonJS(import_toolkit2_exports);
})();
