function activateTab(tabList, panels, index) {
  tabList.querySelectorAll('[role="tab"]').forEach((tab, i) => {
    tab.setAttribute('aria-selected', i === index ? 'true' : 'false');
    tab.classList.toggle('tabs-tab-active', i === index);
  });
  panels.forEach((panel, i) => {
    panel.hidden = i !== index;
  });
}

export default function decorate(block) {
  const rows = [...block.children];

  const tabList = document.createElement('div');
  tabList.className = 'tabs-list';
  tabList.setAttribute('role', 'tablist');

  const panels = [];

  rows.forEach((row, index) => {
    const cell = row.firstElementChild;
    const h3 = cell?.querySelector('h3');
    const tabName = h3?.textContent.trim() || `Tab ${index + 1}`;

    // Build tab button
    const tab = document.createElement('button');
    tab.className = 'tabs-tab';
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', 'false');
    tab.setAttribute('aria-controls', `tabs-panel-${index}`);
    tab.textContent = tabName;
    tab.addEventListener('click', () => activateTab(tabList, panels, index));
    tabList.appendChild(tab);

    // Build panel — remove h3 (used as tab label), keep remaining content
    if (h3) h3.remove();
    const panel = document.createElement('div');
    panel.className = 'tabs-panel';
    panel.setAttribute('role', 'tabpanel');
    panel.id = `tabs-panel-${index}`;
    panel.hidden = true;
    panel.append(...cell.children);
    panels.push(panel);
  });

  block.innerHTML = '';
  block.appendChild(tabList);
  panels.forEach((panel) => block.appendChild(panel));

  // Activate first tab
  activateTab(tabList, panels, 0);
}
