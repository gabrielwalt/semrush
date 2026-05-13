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

  // tools/importer/import-semrush-one.js
  var import_semrush_one_exports = {};
  __export(import_semrush_one_exports, {
    default: () => import_semrush_one_default
  });
  function absUrl(src) {
    if (!src || src === "about:error") return "";
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
  function wrapCta(link, document) {
    var p = document.createElement("p");
    var a = document.createElement("a");
    a.href = link.href || link.getAttribute("href") || "";
    a.textContent = link.textContent.trim();
    var strong = document.createElement("strong");
    strong.appendChild(a);
    p.appendChild(strong);
    return p;
  }
  function heroParser(element, { document }) {
    var wrapper = document.createElement("div");
    var h1 = element.querySelector("h1");
    var subtitle = element.querySelector(".subtitle");
    var ctaLink = element.querySelector("a.button");
    var underButton = element.querySelector(".under-button");
    if (h1) {
      var heading = document.createElement("h1");
      heading.textContent = h1.textContent.trim();
      wrapper.appendChild(heading);
    }
    if (subtitle) {
      var p = document.createElement("p");
      p.textContent = subtitle.textContent.trim();
      wrapper.appendChild(p);
    }
    if (ctaLink) wrapper.appendChild(wrapCta(ctaLink, document));
    if (underButton) {
      var up = document.createElement("p");
      up.textContent = underButton.textContent.trim();
      wrapper.appendChild(up);
    }
    var video = element.querySelector("video");
    var mediaCell = document.createElement("div");
    if (video) {
      var sources = video.querySelectorAll("source");
      sources.forEach(function(source) {
        var src = source.getAttribute("src") || "";
        if (src) {
          var vp = document.createElement("p");
          var va = document.createElement("a");
          va.href = absUrl(src);
          va.textContent = absUrl(src);
          vp.appendChild(va);
          mediaCell.appendChild(vp);
        }
      });
    }
    var rows = [["Video Card (video-card-semrush-one)"], [wrapper]];
    if (mediaCell.children.length > 0) rows.push([mediaCell]);
    var table = WebImporter.DOMUtils.createTable(rows, document);
    element.querySelector(".main-screen__content").replaceWith(table);
    var oneSection = element.querySelector(".main-screen__one");
    if (oneSection) {
      var dcWrapper = document.createElement("div");
      var badgeImg = oneSection.querySelector("img");
      if (badgeImg) dcWrapper.appendChild(wrapImg(badgeImg.getAttribute("src"), badgeImg.alt, document));
      var h4 = oneSection.querySelector("h4");
      if (h4) {
        var h4El = document.createElement("h4");
        h4El.textContent = h4.textContent.trim();
        dcWrapper.appendChild(h4El);
      }
      var descP = oneSection.querySelector("p");
      if (descP) {
        var dp = document.createElement("p");
        dp.textContent = descP.textContent.trim();
        dcWrapper.appendChild(dp);
      }
      oneSection.replaceWith(dcWrapper);
    }
  }
  function featureCardsParser(element, { document }) {
    var textDiv = element.querySelector(".cards__item--text");
    var graphDiv = element.querySelector(".cards__item--graph");
    if (!textDiv) return;
    var textCell = document.createElement("div");
    var icon = textDiv.querySelector("img.icon");
    if (icon) textCell.appendChild(wrapImg(icon.getAttribute("src"), icon.alt, document));
    var h3 = textDiv.querySelector("h3");
    if (h3) {
      var heading = document.createElement("h3");
      heading.textContent = h3.textContent.trim();
      textCell.appendChild(heading);
    }
    var desc = textDiv.querySelector("p:not(.subtitle)");
    if (desc) {
      var p = document.createElement("p");
      p.textContent = desc.textContent.trim();
      textCell.appendChild(p);
    }
    var imgCell = document.createElement("div");
    var graphImg = graphDiv ? graphDiv.querySelector("img") : null;
    if (graphImg) imgCell.appendChild(wrapImg(graphImg.getAttribute("src"), graphImg.alt, document));
    var rows = [["Video Card Feature"], [textCell, imgCell]];
    var table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
  function statsColumnsParser(element, { document }) {
    var items = element.querySelectorAll(".numbers__wrapper--item");
    var rows = [["Columns Stats"]];
    var cells = [];
    items.forEach(function(item) {
      var num = item.querySelector("h3");
      var text = item.querySelector("p");
      var cell = document.createElement("div");
      if (num) {
        var h3 = document.createElement("h3");
        h3.textContent = num.textContent.trim();
        cell.appendChild(h3);
      }
      if (text) {
        var p = document.createElement("p");
        p.textContent = text.textContent.trim();
        cell.appendChild(p);
      }
      cells.push(cell);
    });
    if (cells.length > 0) rows.push(cells);
    var table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
  function iconsGridParser(element, { document }) {
    var items = element.querySelectorAll(".icons__wrapper--item");
    var rows = [["Cards Icon"]];
    items.forEach(function(item) {
      var icon = item.querySelector("img.icon");
      var subtitle = item.querySelector(".subtitle");
      var desc = item.querySelector(".item-text p:not(.subtitle)");
      var cell = document.createElement("div");
      if (icon) cell.appendChild(wrapImg(icon.getAttribute("src"), icon.alt, document));
      if (subtitle) {
        var strong = document.createElement("p");
        var b = document.createElement("strong");
        b.textContent = subtitle.textContent.trim();
        strong.appendChild(b);
        cell.appendChild(strong);
      }
      if (desc) {
        var p = document.createElement("p");
        p.textContent = desc.textContent.trim();
        cell.appendChild(p);
      }
      rows.push([cell]);
    });
    var table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
  function testimonialsParser(element, { document }) {
    var wrapper = document.createElement("div");
    var statNum = element.querySelector(".icons__testimonial--number h5");
    var statText = element.querySelector(".icons__testimonial--number p");
    var logoImg = element.querySelector(".icons__testimonial--testimonial-logo img");
    var quoteText = element.querySelector(".testimonial-text span");
    var authorImg = element.querySelector(".testimonial-photo");
    var authorName = element.querySelector(".testimonial-info .name");
    var authorRole = element.querySelector(".testimonial-info .position");
    var rows = [["Testimonials"]];
    var quoteCell = document.createElement("div");
    if (quoteText) {
      var bq = document.createElement("blockquote");
      bq.textContent = quoteText.textContent.trim();
      quoteCell.appendChild(bq);
    }
    rows.push([quoteCell]);
    var authorCell = document.createElement("div");
    if (authorImg) {
      var pic = document.createElement("picture");
      var img = document.createElement("img");
      img.src = absUrl(authorImg.getAttribute("src"));
      img.alt = authorName ? authorName.textContent.trim() : "";
      pic.appendChild(img);
      authorCell.appendChild(pic);
    }
    if (authorName) {
      var pn = document.createElement("p");
      var strong = document.createElement("strong");
      strong.textContent = authorName.textContent.trim();
      pn.appendChild(strong);
      authorCell.appendChild(pn);
    }
    if (authorRole) {
      var pr = document.createElement("p");
      pr.textContent = authorRole.textContent.trim();
      authorCell.appendChild(pr);
    }
    rows.push([authorCell]);
    if (statNum || statText) {
      var statCell = document.createElement("div");
      if (statNum) {
        var ps = document.createElement("p");
        ps.textContent = statNum.textContent.trim();
        statCell.appendChild(ps);
      }
      if (statText) {
        var pt = document.createElement("p");
        pt.textContent = statText.textContent.trim();
        statCell.appendChild(pt);
      }
      rows.push([statCell]);
    }
    var table = WebImporter.DOMUtils.createTable(rows, document);
    wrapper.appendChild(table);
    element.replaceWith(wrapper);
  }
  function awardsParser(element, { document }) {
    var desktopWrapper = element.querySelector(".awards__wrapper:not(.mobile-awards)");
    if (!desktopWrapper) desktopWrapper = element.querySelector(".awards__wrapper");
    var items = desktopWrapper ? desktopWrapper.querySelectorAll(".awards__wrapper--award") : [];
    var rows = [["Cards Awards"]];
    items.forEach(function(item) {
      var img = item.querySelector("img");
      var text = item.querySelector(".awards__wrapper--award-text");
      var cell = document.createElement("div");
      if (img) {
        var src = img.getAttribute("src") || "";
        if (src && !src.startsWith("data:")) {
          cell.appendChild(wrapImg(src, text ? text.textContent.trim() : "", document));
        }
      }
      if (text) {
        var p = document.createElement("p");
        p.textContent = text.textContent.trim().replace(/\n/g, " ");
        cell.appendChild(p);
      }
      rows.push([cell]);
    });
    var table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
  function ctaParser(element, { document }) {
    var wrapper = document.createElement("div");
    var h2 = element.querySelector("h2");
    if (h2) {
      var heading = document.createElement("h2");
      heading.textContent = h2.textContent.trim();
      wrapper.appendChild(heading);
    }
    var ctaLink = element.querySelector("a.button");
    if (ctaLink) wrapper.appendChild(wrapCta(ctaLink, document));
    element.replaceWith(wrapper);
  }
  function cleanupTransformer(hookName, element, payload) {
    if (hookName !== "beforeTransform") return;
    var document = payload.document;
    element.querySelectorAll('script, style, noscript, iframe, link[rel="stylesheet"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="ch2-"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('header, footer, nav, srf-header-menu, srf-header-dropdown-items, [class*="srf-header"], [class*="srf-footer"], [class*="srf-layout__footer"], [class*="srf-layout__header"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('.sticky-header, [class*="sticky-header"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('[aria-hidden="true"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll('[class*="outdated"], [class*="skip-to"]').forEach(function(el) {
      el.remove();
    });
    element.querySelectorAll(".pin-spacer").forEach(function(el) {
      while (el.firstChild) el.parentNode.insertBefore(el.firstChild, el);
      el.remove();
    });
    element.querySelectorAll(".mobile-awards").forEach(function(el) {
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
    var ctaSection = element.querySelector("section.cta");
    if (ctaSection) {
      var sectionMeta = WebImporter.DOMUtils.createTable(
        [["Section Metadata"], ["Style", "section-dark"]],
        document
      );
      var awardsSection = element.querySelector("section.awards");
      if (awardsSection && awardsSection.nextSibling) {
        awardsSection.parentNode.insertBefore(sectionMeta, awardsSection.nextSibling);
      }
    }
  }
  var parsers = {
    "video-card-semrush-one": heroParser,
    "video-card-feature": featureCardsParser,
    "columns-stats": statsColumnsParser,
    "cards-icon": iconsGridParser,
    "testimonials": testimonialsParser,
    "cards-awards": awardsParser
  };
  var PAGE_TEMPLATE = {
    name: "semrush-one",
    blocks: [
      { name: "video-card-semrush-one", instances: ["section.main-screen"] },
      { name: "video-card-feature", instances: ["section.cards .cards__item", "section.cards-2 .cards__item"] },
      { name: "columns-stats", instances: ["section.numbers"] },
      { name: "cards-icon", instances: ["section.icons .icons__wrapper"] },
      { name: "testimonials", instances: [".icons__testimonial"] },
      { name: "cards-awards", instances: ["section.awards"] }
    ]
  };
  function findBlocksOnPage(document, template) {
    var pageBlocks = [];
    template.blocks.forEach(function(blockDef) {
      blockDef.instances.forEach(function(selector) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function(el) {
          pageBlocks.push({ name: blockDef.name, selector, element: el });
        });
      });
    });
    return pageBlocks;
  }
  var import_semrush_one_default = {
    transform: function(payload) {
      var document = payload.document;
      var url = payload.url;
      var params = payload.params;
      var main = document.body;
      cleanupTransformer("beforeTransform", main, payload);
      var cardsTitle = main.querySelectorAll(".cards__title");
      cardsTitle.forEach(function(title) {
        var wrapper2 = document.createElement("div");
        var h22 = title.querySelector("h2");
        if (h22) {
          var heading2 = document.createElement("h2");
          heading2.textContent = h22.textContent.trim();
          wrapper2.appendChild(heading2);
        }
        var sub2 = title.querySelector(".subtitle");
        if (sub2) {
          var p2 = document.createElement("p");
          p2.textContent = sub2.textContent.trim();
          wrapper2.appendChild(p2);
        }
        title.replaceWith(wrapper2);
      });
      var iconsTitle = main.querySelector(".icons__title");
      if (iconsTitle) {
        var wrapper = document.createElement("div");
        var h2 = iconsTitle.querySelector("h2");
        if (h2) {
          var heading = document.createElement("h2");
          heading.textContent = h2.textContent.trim();
          wrapper.appendChild(heading);
        }
        var sub = iconsTitle.querySelector(".subtitle");
        if (sub) {
          var p = document.createElement("p");
          p.textContent = sub.textContent.trim();
          wrapper.appendChild(p);
        }
        iconsTitle.replaceWith(wrapper);
      }
      var ctaSection = main.querySelector("section.cta");
      if (ctaSection) ctaParser(ctaSection, { document });
      var pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach(function(block) {
        var parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error("Failed to parse " + block.name + ":", e);
          }
        }
      });
      afterTransformer("afterTransform", main, payload);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      var path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/one/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map(function(b) {
            return b.name;
          })
        }
      }];
    }
  };
  return __toCommonJS(import_semrush_one_exports);
})();
