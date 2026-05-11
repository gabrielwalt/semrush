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

  // tools/importer/import-nav.js
  var import_nav_exports = {};
  __export(import_nav_exports, {
    default: () => import_nav_default
  });
  var import_nav_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      document.querySelectorAll('script, style, noscript, iframe, link[rel="stylesheet"]').forEach((el) => el.remove());
      const result = document.createElement("div");
      const brandDiv = document.createElement("div");
      const logoP = document.createElement("p");
      const logoA = document.createElement("a");
      logoA.href = "/";
      const logoPic = document.createElement("picture");
      const logoImg = document.createElement("img");
      logoImg.src = "https://www.semrush.com/static/logos/semrush_logo.svg";
      logoImg.alt = "Semrush";
      logoPic.appendChild(logoImg);
      logoA.appendChild(logoPic);
      logoP.appendChild(logoA);
      brandDiv.appendChild(logoP);
      result.appendChild(brandDiv);
      const sectionsDiv = document.createElement("div");
      const menuContainer = document.querySelector("#srf-header-desktop-menu-container, srf-header-menu");
      const topLevelItems = menuContainer ? menuContainer.querySelectorAll(":scope ul > li") : [];
      const dropdowns = document.querySelectorAll("srf-header-dropdown-items.srf-header-dropdown-popover");
      let dropdownIndex = 0;
      topLevelItems.forEach((item) => {
        var _a;
        const btn = item.querySelector("button.srf-header__menu-item, a.srf-header__menu-item");
        if (!btn) return;
        const label = btn.textContent.trim();
        const isButton = btn.tagName.toLowerCase() === "button";
        const href = btn.href || `/${label.toLowerCase()}/`;
        const h2 = document.createElement("h2");
        const h2Link = document.createElement("a");
        h2Link.href = href;
        h2Link.textContent = label;
        h2.appendChild(h2Link);
        sectionsDiv.appendChild(h2);
        if (isButton && dropdownIndex < dropdowns.length) {
          const dropdown = dropdowns[dropdownIndex];
          dropdownIndex++;
          const columns = dropdown.querySelectorAll(".srf-header__menu-sublist-column");
          columns.forEach((col) => {
            const heading = col.querySelector(".srf-header__menu-sublist-column-title, h3");
            const links = col.querySelectorAll(".srf-header__menu-sublist-item");
            if (heading && links.length > 0) {
              const h3 = document.createElement("h3");
              h3.textContent = heading.textContent.trim();
              sectionsDiv.appendChild(h3);
              const ul = document.createElement("ul");
              links.forEach((a) => {
                const li = document.createElement("li");
                const newA = document.createElement("a");
                newA.href = a.href;
                newA.textContent = a.textContent.trim();
                li.appendChild(newA);
                ul.appendChild(li);
              });
              sectionsDiv.appendChild(ul);
            }
          });
          const promo = dropdown.querySelector(".srf-header__dropdown-promo");
          if (promo) {
            const promoImg = promo.querySelector(".srf-header__dropdown-promo-image");
            const promoTitle = promo.querySelector(".srf-header__dropdown-promo-title");
            const promoDesc = promo.querySelector(".srf-header__dropdown-promo-description");
            const promoDate = promo.querySelector(".srf-header__dropdown-promo-date-and-place");
            if (promoImg || promoTitle) {
              const imgP = document.createElement("p");
              const imgA = document.createElement("a");
              imgA.href = promo.href || "#";
              const pic = document.createElement("picture");
              const img = document.createElement("img");
              const bgImage = ((_a = promoImg == null ? void 0 : promoImg.style) == null ? void 0 : _a.backgroundImage) || "";
              const urlMatch = bgImage.match(/url\(["']?([^"')]+)["']?\)/);
              img.src = urlMatch ? urlMatch[1] : promo.href || "#";
              img.alt = promoTitle ? promoTitle.textContent.trim() : "";
              pic.appendChild(img);
              imgA.appendChild(pic);
              imgP.appendChild(imgA);
              sectionsDiv.appendChild(imgP);
            }
            if (promoTitle) {
              const titleP = document.createElement("p");
              const strong = document.createElement("strong");
              strong.textContent = promoTitle.textContent.trim();
              titleP.appendChild(strong);
              sectionsDiv.appendChild(titleP);
            }
            if (promoDesc) {
              const descP = document.createElement("p");
              descP.textContent = promoDesc.textContent.trim();
              sectionsDiv.appendChild(descP);
            }
            if (promoDate) {
              const dateP = document.createElement("p");
              dateP.textContent = promoDate.textContent.trim();
              sectionsDiv.appendChild(dateP);
            }
          }
        }
      });
      result.appendChild(sectionsDiv);
      const toolsDiv = document.createElement("div");
      const buttonsDiv = document.querySelector(".srf-header__buttons");
      if (buttonsDiv) {
        const p = document.createElement("p");
        const loginLink = buttonsDiv.querySelector('a[href*="/login"]');
        const signupLink = buttonsDiv.querySelector('a[href*="/signup"]');
        if (loginLink) {
          const a = document.createElement("a");
          a.href = loginLink.href;
          a.textContent = loginLink.textContent.trim() || "Log In";
          p.appendChild(a);
        }
        if (loginLink && signupLink) {
          p.appendChild(document.createTextNode(" | "));
        }
        if (signupLink) {
          const a = document.createElement("a");
          a.href = signupLink.href;
          a.textContent = signupLink.textContent.trim() || "Sign Up";
          p.appendChild(a);
        }
        toolsDiv.appendChild(p);
      }
      result.appendChild(toolsDiv);
      return [{
        element: result,
        path: "/nav",
        report: {
          title: "Navigation",
          template: "nav",
          blocks: ["nav"]
        }
      }];
    }
  };
  return __toCommonJS(import_nav_exports);
})();
