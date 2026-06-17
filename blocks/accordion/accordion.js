/* Accordion — FAQ disclosure list (toolkit pages). Each row: question | answer. */
export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  rows.forEach((row, i) => {
    const cells = [...row.children];
    const q = cells[0];
    const a = cells[1];
    if (!q) return;

    const item = document.createElement('div');
    item.className = 'accordion-item';

    const btn = document.createElement('button');
    btn.className = 'accordion-trigger';
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    const panelId = `accordion-panel-${i}`;
    btn.setAttribute('aria-controls', panelId);
    while (q.firstChild) btn.appendChild(q.firstChild);

    const panel = document.createElement('div');
    panel.className = 'accordion-panel';
    panel.id = panelId;
    panel.hidden = true;
    if (a) while (a.firstChild) panel.appendChild(a.firstChild);

    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      panel.hidden = open;
    });

    item.append(btn, panel);
    block.appendChild(item);
  });
}
