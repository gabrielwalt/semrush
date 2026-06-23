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

  // tools/importer/import-comparison.js
  var import_comparison_exports = {};
  __export(import_comparison_exports, {
    default: () => import_comparison_default
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
  function textP(text, document) {
    var p = document.createElement("p");
    p.textContent = (text || "").trim();
    return p;
  }
  function heroParser(block, { document }) {
    var wrapper = document.createElement("div");
    var h1 = block.querySelector("h1");
    if (h1) {
      var h = document.createElement("h1");
      h.textContent = h1.textContent.trim();
      wrapper.appendChild(h);
    }
    var lead = block.querySelector("p");
    if (lead) {
      var p = document.createElement("p");
      p.innerHTML = lead.innerHTML.replace(/<(?!br\s*\/?>)[^>]+>/gi, "");
      wrapper.appendChild(p);
    }
    var cta = block.querySelector("a[href]");
    var cp = ctaP(cta, "primary", document);
    if (cp) wrapper.appendChild(cp);
    return wrapper;
  }
  function brandsParser(block, { document }) {
    var cell = document.createElement("div");
    block.querySelectorAll("img").forEach(function(img) {
      cell.appendChild(wrapImg(img.getAttribute("src"), img.getAttribute("alt") || "", document));
    });
    return WebImporter.DOMUtils.createTable([["Marquee"], [cell]], document);
  }
  function comparisonTableParser(block, { document }) {
    var table = block.querySelector("table");
    if (!table) return document.createElement("div");
    function cellValue(td) {
      if (td.querySelector('svg[data-ui-name="Check"]')) return "Yes";
      if (td.querySelector('svg[data-ui-name="Close"]')) return "No";
      return td.textContent.trim();
    }
    var rows = [["Comparison Table"]];
    var headCells = table.querySelectorAll("thead tr td, thead tr th");
    if (headCells.length === 3) {
      rows.push([
        textP(headCells[0].textContent.trim(), document),
        textP(headCells[1].textContent.trim(), document),
        textP(headCells[2].textContent.trim(), document)
      ]);
    }
    table.querySelectorAll('tbody tr[data-test="ComparisonTableRow"], tbody tr').forEach(function(tr) {
      var tds = tr.querySelectorAll('td[data-test="ComparisonTableCell"], td');
      if (tds.length === 1) {
        rows.push([textP(tds[0].textContent.trim(), document)]);
      } else if (tds.length === 3) {
        rows.push([
          textP(tds[0].textContent.trim(), document),
          textP(cellValue(tds[1]), document),
          textP(cellValue(tds[2]), document)
        ]);
      }
    });
    var wrapper = document.createElement("div");
    var sectionH2 = block.querySelector("h2");
    if (sectionH2) {
      var h2 = document.createElement("h2");
      h2.textContent = sectionH2.textContent.trim();
      wrapper.appendChild(h2);
    }
    var sectionSub = sectionH2 ? sectionH2.parentElement.querySelector("p") : null;
    if (sectionSub && sectionSub.textContent.trim()) {
      wrapper.appendChild(textP(sectionSub.textContent.trim(), document));
    }
    var note = block.querySelector('p a[href*="kb/support"]');
    wrapper.appendChild(WebImporter.DOMUtils.createTable(rows, document));
    if (note) {
      var np = document.createElement("p");
      np.innerHTML = (note.closest("p") || note).innerHTML;
      np.querySelectorAll("a").forEach(function(a) {
        a.href = absUrl(a.getAttribute("href") || "");
        a.removeAttribute("target");
      });
      wrapper.appendChild(np);
    }
    return wrapper;
  }
  function reviewsParser(block, headingEl, { document }) {
    var dc = document.createElement("div");
    if (headingEl) {
      var h2 = document.createElement("h2");
      h2.textContent = headingEl.textContent.trim();
      dc.appendChild(h2);
    }
    var rows = [["Reviews"]];
    block.querySelectorAll('[data-test="ReviewItem"]').forEach(function(item) {
      var cell = document.createElement("div");
      var quote = item.querySelector('.textStyle_h5, [class*="textStyle_h5"]');
      if (quote) {
        var bq = document.createElement("blockquote");
        bq.appendChild(textP(quote.textContent.replace(/[“”]/g, "").trim(), document));
        cell.appendChild(bq);
      }
      var avatar = item.querySelector("img");
      if (avatar) cell.appendChild(wrapImg(avatar.getAttribute("src"), avatar.getAttribute("alt") || "", document));
      var name = item.querySelector('.textStyle_smallBold, [class*="textStyle_smallBold"]');
      if (name) {
        var pn = document.createElement("p");
        var strong = document.createElement("strong");
        strong.textContent = name.textContent.trim();
        pn.appendChild(strong);
        cell.appendChild(pn);
      }
      var title = item.querySelector('.textStyle_small:not(.textStyle_smallBold), [class*="textStyle_small"]:not([class*="textStyle_smallBold"])');
      if (title && (!name || title !== name)) cell.appendChild(textP(title.textContent.trim(), document));
      rows.push([cell]);
    });
    var out = document.createElement("div");
    out.appendChild(dc);
    out.appendChild(WebImporter.DOMUtils.createTable(rows, document));
    return out;
  }
  function ratingsParser(block, { document }) {
    var dc = document.createElement("div");
    var heading = block.querySelector("h2");
    if (heading) {
      var h2 = document.createElement("h2");
      h2.textContent = heading.textContent.trim();
      dc.appendChild(h2);
    }
    var rows = [["Ratings"]];
    var columns = block.querySelectorAll(":scope > div > div");
    columns.forEach(function(col) {
      var imgs = col.querySelectorAll("img");
      if (!imgs.length) return;
      var cell = document.createElement("div");
      imgs.forEach(function(img) {
        cell.appendChild(wrapImg(img.getAttribute("src"), img.getAttribute("alt") || "", document));
      });
      var scoreEl = col.querySelector("span, p");
      var score = "";
      col.querySelectorAll("span, p").forEach(function(el) {
        var t = el.textContent.trim();
        if (/out of 5|\/\s*5/i.test(t)) score = t;
      });
      if (score) cell.appendChild(textP(score, document));
      rows.push([cell]);
    });
    var out = document.createElement("div");
    out.appendChild(dc);
    out.appendChild(WebImporter.DOMUtils.createTable(rows, document));
    return out;
  }
  function showcaseParser(block, { document }) {
    var dc = document.createElement("div");
    var heading = block.querySelector("h2");
    if (heading) {
      var h2 = document.createElement("h2");
      h2.textContent = heading.textContent.trim();
      dc.appendChild(h2);
    }
    var sub = block.querySelector("h2 ~ p, p");
    if (sub && (!heading || sub.textContent.trim() !== heading.textContent.trim())) {
      dc.appendChild(textP(sub.textContent.trim(), document));
    }
    var rows = [["Showcase"]];
    block.querySelectorAll('[data-test="DescriptionBlock"]').forEach(function(item) {
      var cell = document.createElement("div");
      var img = item.querySelector("img");
      if (img) cell.appendChild(wrapImg(img.getAttribute("src"), img.getAttribute("alt") || "", document));
      var title = item.querySelector("h3");
      if (title) {
        var h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        cell.appendChild(h3);
      }
      item.querySelectorAll('p[data-test="pNode"], p').forEach(function(p) {
        if (p.textContent.trim() && !p.querySelector("a, img")) cell.appendChild(textP(p.textContent.trim(), document));
      });
      var link = item.querySelector("a[href]");
      var cp = ctaP(link, "secondary", document);
      if (cp) cell.appendChild(cp);
      rows.push([cell]);
    });
    var out = document.createElement("div");
    out.appendChild(dc);
    out.appendChild(WebImporter.DOMUtils.createTable(rows, document));
    return out;
  }
  function finalCtaParser(block, { document }) {
    var wrapper = document.createElement("div");
    var heading = block.querySelector("h2");
    if (heading) {
      var h2 = document.createElement("h2");
      h2.textContent = heading.textContent.trim();
      wrapper.appendChild(h2);
    }
    var body = block.querySelector("p");
    if (body && body.textContent.trim()) wrapper.appendChild(textP(body.textContent.trim(), document));
    var cta = block.querySelector("a[href]");
    var cp = ctaP(cta, "primary", document);
    if (cp) wrapper.appendChild(cp);
    return wrapper;
  }
  function vsCardsParser(cards, headingEl, { document }) {
    var dc = document.createElement("div");
    if (headingEl) {
      var h2 = document.createElement("h2");
      h2.textContent = headingEl.textContent.trim();
      dc.appendChild(h2);
    }
    var rows = [["Cards Icon"]];
    cards.forEach(function(card) {
      var cell = document.createElement("div");
      var title = card.querySelector("h4, h3");
      var pt = document.createElement("p");
      var strong = document.createElement("strong");
      strong.textContent = title ? title.textContent.trim() : "";
      pt.appendChild(strong);
      cell.appendChild(pt);
      var intro = card.querySelector("p");
      if (intro && intro.textContent.trim()) cell.appendChild(textP(intro.textContent.trim(), document));
      var lis = card.querySelectorAll("li");
      if (lis.length) {
        var ul = document.createElement("ul");
        lis.forEach(function(li) {
          var liEl = document.createElement("li");
          liEl.textContent = li.textContent.replace(/\s+/g, " ").trim();
          if (liEl.textContent) ul.appendChild(liEl);
        });
        if (ul.childNodes.length) cell.appendChild(ul);
      }
      var link = card.querySelector("a[href]");
      if (link) {
        var href = link.getAttribute("href") || "";
        var chm = /\/content-hub\/vs-([a-z0-9-]+)\/?$/.exec(href);
        if (chm) href = "/vs/semrush-vs-" + chm[1] + "/";
        var cp = ctaP({ getAttribute: function() {
          return href;
        }, textContent: link.textContent }, "secondary", document);
        if (cp) cell.appendChild(cp);
      }
      rows.push([cell]);
    });
    var out = document.createElement("div");
    out.appendChild(dc);
    out.appendChild(WebImporter.DOMUtils.createTable(rows, document));
    return out;
  }
  function chFindSection(main, labelRe) {
    var sections = main.querySelectorAll("section[aria-label]");
    for (var i = 0; i < sections.length; i++) {
      if (labelRe.test(sections[i].getAttribute("aria-label") || "")) return sections[i];
    }
    return null;
  }
  function chSlug(originalURL) {
    var path0 = new URL(originalURL).pathname.replace(/\/$/, "");
    var raw = path0.split("/").pop() || "vs";
    return "semrush-vs-" + raw.replace(/^vs-/, "");
  }
  function chHeroParser(hero, slug, document) {
    var wrapper = document.createElement("div");
    var h1src = hero.querySelector("h1");
    if (h1src) {
      var h1 = document.createElement("h1");
      h1.textContent = h1src.textContent.replace(/\s+/g, " ").trim();
      wrapper.appendChild(h1);
    }
    var ul = hero.querySelector("ul");
    var leads = [];
    hero.querySelectorAll("p").forEach(function(p) {
      if (ul && ul.contains(p)) return;
      var clone = p.cloneNode(true);
      clone.querySelectorAll("br").forEach(function(br) {
        br.replaceWith(document.createTextNode(" "));
      });
      var t = clone.textContent.replace(/\s+/g, " ").trim();
      if (t) leads.push(t);
    });
    if (leads.length) wrapper.appendChild(textP(leads.join(" "), document));
    wrapper.appendChild(ctaP(
      { getAttribute: function() {
        return "https://www.semrush.com/signup/?src=" + slug.replace(/-/g, "_");
      }, textContent: "Try Semrush for Free" },
      "primary",
      document
    ));
    return wrapper;
  }
  function chReviewsParser(hero, document) {
    var ul = hero.querySelector("ul");
    if (!ul) return null;
    var items = ul.querySelectorAll("li");
    if (!items.length) return null;
    var dc = document.createElement("div");
    var h2 = document.createElement("h2");
    h2.textContent = "Here\u2019s why marketers love Semrush";
    dc.appendChild(h2);
    var rows = [["Reviews"]];
    items.forEach(function(li) {
      var cell = document.createElement("div");
      var ps = li.querySelectorAll("p");
      var quote = ps.length ? ps[0].textContent.trim() : "";
      if (quote) {
        var bq = document.createElement("blockquote");
        bq.appendChild(textP(quote, document));
        cell.appendChild(bq);
      }
      var avatar = li.querySelector("img");
      if (avatar) cell.appendChild(wrapImg(avatar.getAttribute("src"), avatar.getAttribute("alt") || "author-avatar", document));
      if (ps.length >= 2 && ps[1].textContent.trim()) {
        var pn = document.createElement("p");
        var strong = document.createElement("strong");
        strong.textContent = ps[1].textContent.trim();
        pn.appendChild(strong);
        cell.appendChild(pn);
      }
      if (ps.length >= 3 && ps[2].textContent.trim()) cell.appendChild(textP(ps[2].textContent.trim(), document));
      rows.push([cell]);
    });
    var out = document.createElement("div");
    out.appendChild(dc);
    out.appendChild(WebImporter.DOMUtils.createTable(rows, document));
    return out;
  }
  function chComparisonTableParser(region, document) {
    var table = region.querySelector("table");
    if (!table) return null;
    function valueCell(td) {
      var cell = document.createElement("div");
      if (!td) {
        cell.appendChild(textP("", document));
        return cell;
      }
      var glyph = td.querySelector('img[alt="Yes"], img[alt="No"]');
      var desc = "";
      td.querySelectorAll("p").forEach(function(p) {
        var t = p.textContent.replace(/\s+/g, " ").trim();
        if (t) desc = desc ? desc + " " + t : t;
      });
      if (glyph) {
        cell.appendChild(textP(glyph.getAttribute("alt"), document));
        if (desc) cell.appendChild(textP(desc, document));
      } else {
        cell.appendChild(textP(desc || td.textContent.replace(/\s+/g, " ").trim(), document));
      }
      return cell;
    }
    var rows = [["Comparison Table"]];
    var ths = table.querySelectorAll("thead th");
    if (ths.length === 3) {
      rows.push([textP("", document), textP(ths[2].textContent.trim(), document), textP(ths[1].textContent.trim(), document)]);
    }
    table.querySelectorAll("tbody tr").forEach(function(tr) {
      var tds = tr.querySelectorAll(":scope > td");
      if (tds.length !== 3) return;
      rows.push([
        textP(tds[0].textContent.replace(/\s+/g, " ").trim(), document),
        valueCell(tds[2]),
        valueCell(tds[1])
      ]);
    });
    var wrapper = document.createElement("div");
    var h2src = region.querySelector("h2");
    var h2 = document.createElement("h2");
    h2.textContent = "How Does Semrush Compare?";
    wrapper.appendChild(h2);
    if (h2src && h2src.textContent.trim()) wrapper.appendChild(textP(h2src.textContent.replace(/\s+/g, " ").trim(), document));
    wrapper.appendChild(WebImporter.DOMUtils.createTable(rows, document));
    region.querySelectorAll(":scope p, :scope > div > p").forEach(function(p) {
      if (p.closest("table, thead, tbody, td, th")) return;
      if (h2src && p.textContent.trim() === h2src.textContent.trim()) return;
      var t = p.textContent.replace(/\s+/g, " ").trim();
      if (t && t.split(" ").length >= 5) wrapper.appendChild(textP(t, document));
    });
    return wrapper;
  }
  function chProseParser(region, document, opts) {
    opts = opts || {};
    var wrapper = document.createElement("div");
    var h = region.querySelector("h1, h2, h3");
    if (h) {
      var hh = document.createElement(opts.headingTag || "h2");
      hh.textContent = h.textContent.replace(/\s+/g, " ").trim();
      wrapper.appendChild(hh);
    }
    region.querySelectorAll("p").forEach(function(p) {
      if (p.closest("a, li")) return;
      var t = p.textContent.replace(/\s+/g, " ").trim();
      if (t) wrapper.appendChild(textP(t, document));
    });
    if (opts.images) {
      region.querySelectorAll("img").forEach(function(img) {
        var alt = img.getAttribute("alt") || "";
        if (!alt) return;
        wrapper.appendChild(wrapImg(img.getAttribute("src"), alt, document));
      });
    }
    var link = region.querySelector("a[href]");
    if (link && link.textContent.trim()) {
      wrapper.appendChild(ctaP(link, "secondary", document));
    } else {
      var btn = region.querySelector("button");
      var btnText = btn && btn.textContent.replace(/\s+/g, " ").trim();
      if (btnText) {
        var href = "https://www.semrush.com/signup/?src=" + (opts.slug || "semrush_vs").replace(/-/g, "_");
        wrapper.appendChild(ctaP(
          { getAttribute: function() {
            return href;
          }, textContent: btnText },
          "primary",
          document
        ));
      }
    }
    return wrapper.childNodes.length ? wrapper : null;
  }
  function chSuccessParser(region, document) {
    var wrapper = document.createElement("div");
    region.querySelectorAll("h2, h3").forEach(function(h, i) {
      var hh = document.createElement(i === 0 ? "h2" : "h3");
      hh.textContent = h.textContent.replace(/\s+/g, " ").trim();
      if (hh.textContent) wrapper.appendChild(hh);
    });
    region.querySelectorAll("p").forEach(function(p) {
      if (p.closest("a")) return;
      var t = p.textContent.replace(/\s+/g, " ").trim();
      if (t) wrapper.appendChild(textP(t, document));
    });
    var link = region.querySelector("a[href]");
    if (link && link.textContent.trim()) wrapper.appendChild(ctaP(link, "secondary", document));
    return wrapper.childNodes.length ? wrapper : null;
  }
  function chLearnMoreParser(region, document) {
    var wrapper = document.createElement("div");
    var h = region.querySelector("h2, h3");
    if (h) {
      var hh = document.createElement("h2");
      hh.textContent = h.textContent.replace(/\s+/g, " ").trim();
      wrapper.appendChild(hh);
    }
    var links = region.querySelectorAll("a[href]");
    if (!links.length) return chProseParser(region, document);
    links.forEach(function(a) {
      var card = a.closest("div") || a.parentElement;
      if (card) {
        card.querySelectorAll("p").forEach(function(p) {
          if (p.closest("a")) return;
          var t = p.textContent.replace(/\s+/g, " ").trim();
          if (t) wrapper.appendChild(textP(t, document));
        });
      }
      if (a.textContent.trim()) wrapper.appendChild(ctaP(a, "secondary", document));
    });
    return wrapper.childNodes.length ? wrapper : null;
  }
  function cleanupTransformer(hookName, element) {
    if (hookName !== "beforeTransform") return;
    element.querySelectorAll('script, style, noscript, link[rel="stylesheet"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('header, footer, [class*="srf-header"], [class*="srf-footer"], [class*="srf-layout__footer"], [class*="srf-layout__header"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('[data-test="Breadcrumbs"], nav[aria-label="Breadcrumbs"], .breadcrumbs').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('img[src*="analytics"], img[src*="bat.bing"], img[src*="pixel"]').forEach(function(el) {
      var parent = el.closest("p") || el.closest("picture") || el;
      parent.remove();
    });
  }
  var import_comparison_default = {
    transform: function(payload) {
      var document = payload.document;
      var params = payload.params;
      var sourceMain = document.body;
      cleanupTransformer("beforeTransform", sourceMain);
      var out = document.createElement("div");
      function pushSection(node, metaStyle) {
        if (!node) return;
        out.appendChild(node);
        if (metaStyle) {
          out.appendChild(WebImporter.DOMUtils.createTable([["Section Metadata"], ["Style", metaStyle]], document));
        }
        out.appendChild(document.createElement("hr"));
      }
      function pushMetaAndReturn(path, reportTemplate) {
        out.appendChild(WebImporter.DOMUtils.createTable(
          [["Metadata"], ["template", "template-default, template-comparison"], ["nav", "../nav"], ["footer", "../footer"]],
          document
        ));
        sourceMain.innerHTML = "";
        sourceMain.appendChild(out);
        WebImporter.rules.transformBackgroundImages(sourceMain, document);
        WebImporter.rules.adjustImageUrls(sourceMain, payload.url, params.originalURL);
        return [{ element: sourceMain, path: WebImporter.FileUtils.sanitizePath(path), report: { title: document.title, template: reportTemplate } }];
      }
      var legacyHero = !sourceMain.querySelector('[data-test="HeroBlock"]') && chFindSection(sourceMain, /instead of/i);
      if (legacyHero) {
        var slug = chSlug(params.originalURL);
        var tableRegion = chFindSection(sourceMain, /^Comparing /i);
        var advantages = chFindSection(sourceMain, /advantages/i);
        var aiFunc = chFindSection(sourceMain, /functionality/i);
        var createRegion = chFindSection(sourceMain, /^Create /i);
        var successRegion = chFindSection(sourceMain, /success story/i);
        var ctaRegion = chFindSection(sourceMain, /^Try out /i);
        var learnRegion = chFindSection(sourceMain, /^Learn more/i);
        pushSection(chHeroParser(legacyHero, slug, document), "section-centered");
        if (advantages) pushSection(chProseParser(advantages, document, { slug }), null);
        if (aiFunc) pushSection(chProseParser(aiFunc, document, { images: true, slug }), null);
        if (tableRegion) pushSection(chComparisonTableParser(tableRegion, document), null);
        pushSection(chReviewsParser(legacyHero, document), null);
        if (createRegion) pushSection(chProseParser(createRegion, document, { slug }), null);
        if (successRegion) pushSection(chSuccessParser(successRegion, document), null);
        if (learnRegion) pushSection(chLearnMoreParser(learnRegion, document), null);
        if (ctaRegion) pushSection(finalCtaParser(ctaRegion, { document }), "section-violet");
        return pushMetaAndReturn("/vs/" + slug, "comparison-legacy");
      }
      var hero = sourceMain.querySelector('[data-test="HeroBlock"]');
      if (hero) pushSection(heroParser(hero, { document }), "section-centered");
      var brands = sourceMain.querySelector('[data-test="Brands"]');
      if (brands) pushSection(brandsParser(brands, { document }), "section-flush");
      var table = sourceMain.querySelector('[data-test="ComparisonTable"]');
      if (table) pushSection(comparisonTableParser(table, { document }), null);
      var vsCards = sourceMain.querySelectorAll('[data-test="VSCard"]');
      if (vsCards.length) {
        var vsHeading = null;
        var firstCard = vsCards[0];
        var probeC = firstCard;
        while (probeC && !vsHeading) {
          var sibC = probeC.previousElementSibling;
          while (sibC) {
            var hC = sibC.matches && sibC.matches("h2") ? sibC : sibC.querySelector ? sibC.querySelector("h2") : null;
            if (hC && hC.textContent.trim()) {
              vsHeading = hC;
              break;
            }
            sibC = sibC.previousElementSibling;
          }
          probeC = probeC.parentElement;
        }
        pushSection(vsCardsParser([].slice.call(vsCards), vsHeading, { document }), null);
      }
      var reviews = sourceMain.querySelector('[data-test="ReviewsCarousel"]');
      if (reviews) {
        var revHeading = null;
        var probe = reviews;
        while (probe && !revHeading) {
          var sib = probe.previousElementSibling;
          while (sib) {
            var h = sib.matches && sib.matches("h2") ? sib : sib.querySelector ? sib.querySelector("h2") : null;
            if (h && /marketers love/i.test(h.textContent || "")) {
              revHeading = h;
              break;
            }
            sib = sib.previousElementSibling;
          }
          probe = probe.parentElement;
        }
        pushSection(reviewsParser(reviews, revHeading, { document }), null);
      }
      var ratings = sourceMain.querySelector('[data-test="RatingBlock"]');
      if (ratings) pushSection(ratingsParser(ratings, { document }), null);
      var showcase = sourceMain.querySelector('[data-test="FeaturesSection"]');
      if (showcase) pushSection(showcaseParser(showcase, { document }), null);
      var finalCta = sourceMain.querySelector('[data-test="CtaBlock"]');
      if (finalCta) pushSection(finalCtaParser(finalCta, { document }), "section-violet");
      var pathname = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "");
      var outPath = pathname || "/index";
      if (/\/vs$/.test(outPath) || outPath === "") outPath = "/vs/index";
      return pushMetaAndReturn(outPath, "comparison");
    }
  };
  return __toCommonJS(import_comparison_exports);
})();
