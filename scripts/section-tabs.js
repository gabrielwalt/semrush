/* section-tabs — a SECTION STYLE (not a block) that turns the section's top-level blocks
   into tab panels with a tab list. Because panels are real top-level blocks, EDS decorates
   them normally (teaser, cards, anything) — unlike a tabs *block*, whose nested cells would
   never be decorated. Authoring: intro default content, then one block per tab whose first
   heading is the tab label, then `Section Metadata > Style: section-tabs`. */

function activate(tabs, panels, index) {
  tabs.forEach((tab, i) => {
    const selected = i === index;
    tab.setAttribute('aria-selected', selected ? 'true' : 'false');
    tab.setAttribute('tabindex', selected ? '0' : '-1');
  });
  panels.forEach((panel, i) => { panel.hidden = i !== index; });
}

function decorateSection(section) {
  // Panels are the section's top-level block wrappers (e.g. .teaser-wrapper). The intro is
  // a .default-content-wrapper and is left in place above the tab list.
  const panels = [...section.children].filter((child) => (
    child.matches('[class$="-wrapper"]') && !child.classList.contains('default-content-wrapper')
  ));
  if (panels.length === 0) return;

  const tabList = document.createElement('div');
  tabList.className = 'tabs-nav';
  tabList.setAttribute('role', 'tablist');

  const tabs = [];
  panels.forEach((panel, index) => {
    const heading = panel.querySelector('h2, h3, h4, h5, h6');
    const label = heading?.textContent.trim() || `Tab ${index + 1}`;
    if (heading) heading.remove();

    const tabId = `tabs-nav-tab-${index}`;
    const panelId = `tabs-nav-panel-${index}`;
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);

    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'tabs-nav-tab';
    tab.id = tabId;
    tab.textContent = label;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panelId);
    tab.setAttribute('aria-selected', 'false');
    tab.setAttribute('tabindex', '-1');
    tab.addEventListener('click', () => activate(tabs, panels, index));
    tabs.push(tab);
    tabList.appendChild(tab);
  });

  tabList.addEventListener('keydown', (e) => {
    const current = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    let next = -1;
    if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    if (next >= 0) {
      e.preventDefault();
      activate(tabs, panels, next);
      tabs[next].focus();
    }
  });

  panels[0].before(tabList);
  activate(tabs, panels, 0);
}

export default function decorateTabsSections(main) {
  main.querySelectorAll('.section.section-tabs').forEach(decorateSection);
}
