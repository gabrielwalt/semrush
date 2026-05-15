/* Tabs block — horizontal tab list with ARIA tab pattern (Enterprise page) */

function activateTab(tabList, panels, index) {
  tabList.querySelectorAll('[role="tab"]').forEach((tab, i) => {
    const selected = i === index;
    tab.setAttribute('aria-selected', selected ? 'true' : 'false');
    tab.setAttribute('tabindex', selected ? '0' : '-1');
    tab.classList.toggle('tabs-tab-active', selected);
  });
  panels.forEach((panel, i) => {
    panel.hidden = i !== index;
  });
}

export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  const tabList = document.createElement('div');
  tabList.className = 'tabs-list';
  tabList.setAttribute('role', 'tablist');

  const panels = [];

  rows.forEach((row, index) => {
    const cell = row.firstElementChild;
    const h3 = cell?.querySelector('h3');
    const tabName = h3?.textContent.trim() || `Tab ${index + 1}`;
    const tabId = `tabs-tab-${index}`;
    const panelId = `tabs-panel-${index}`;

    const tab = document.createElement('button');
    tab.className = 'tabs-tab';
    tab.id = tabId;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', 'false');
    tab.setAttribute('aria-controls', panelId);
    tab.setAttribute('tabindex', '-1');
    tab.textContent = tabName;
    tab.addEventListener('click', () => activateTab(tabList, panels, index));
    tabList.appendChild(tab);

    if (h3) h3.remove();
    const panel = document.createElement('div');
    panel.className = 'tabs-panel';
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
    panel.hidden = true;
    panel.append(...cell.children);
    panels.push(panel);
  });

  tabList.addEventListener('keydown', (e) => {
    const tabs = [...tabList.querySelectorAll('[role="tab"]')];
    const current = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    let next = -1;
    if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    if (next >= 0) {
      e.preventDefault();
      activateTab(tabList, panels, next);
      tabs[next].focus();
    }
  });

  block.innerHTML = '';
  block.appendChild(tabList);
  panels.forEach((panel) => block.appendChild(panel));

  activateTab(tabList, panels, 0);
}
