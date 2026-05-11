export default async function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  const paragraphs = cell ? cell.querySelectorAll('p') : [];
  const placeholder = (paragraphs[0] ? paragraphs[0].textContent.trim() : '') || 'Enter your website';
  const buttonLabel = (paragraphs[1] ? paragraphs[1].textContent.trim() : '') || 'Get insights';

  const wrapper = document.createElement('div');
  wrapper.className = 'insights-widget-form';

  const form = document.createElement('div');
  form.className = 'insights-widget-search';

  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'insights-widget-input';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = placeholder;
  input.setAttribute('aria-label', placeholder);
  inputWrapper.appendChild(input);

  const countryBtn = document.createElement('button');
  countryBtn.type = 'button';
  countryBtn.className = 'insights-widget-country';
  countryBtn.setAttribute('aria-label', 'Filter by country');
  countryBtn.innerHTML = '<span>us</span>';
  inputWrapper.appendChild(countryBtn);

  const countries = ['us', 'uk', 'de', 'fr', 'es', 'it', 'br', 'au', 'ca', 'in', 'jp'];
  const dropdown = document.createElement('div');
  dropdown.className = 'insights-widget-dropdown';
  dropdown.hidden = true;

  countries.forEach((code) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.textContent = code;
    option.addEventListener('click', (ev) => {
      ev.stopPropagation();
      countryBtn.querySelector('span').textContent = code;
      dropdown.hidden = true;
    });
    dropdown.appendChild(option);
  });

  countryBtn.addEventListener('click', (ev) => {
    ev.stopPropagation();
    dropdown.hidden = !dropdown.hidden;
  });

  document.addEventListener('click', () => {
    dropdown.hidden = true;
  });

  inputWrapper.appendChild(dropdown);
  form.appendChild(inputWrapper);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.className = 'insights-widget-submit';
  submitBtn.textContent = buttonLabel;
  form.appendChild(submitBtn);

  submitBtn.addEventListener('click', () => {
    const domain = input.value.trim();
    const country = countryBtn.querySelector('span').textContent.trim();
    const redirectTo = domain
      ? encodeURIComponent(`/seo/?domain=${domain}&db=${country}`)
      : '';
    const url = redirectTo
      ? `https://www.semrush.com/signup/?src=main_cta&tk=seo&redirect_to=${redirectTo}`
      : 'https://www.semrush.com/signup/?src=main_cta&tk=seo';
    window.location.href = url;
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitBtn.click();
  });

  wrapper.appendChild(form);
  block.textContent = '';
  block.appendChild(wrapper);
}
