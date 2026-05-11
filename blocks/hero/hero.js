export default async function decorate(block) {
  const ctaLink = block.querySelector('a[href*="/signup/"]');
  if (!ctaLink) return;

  const ctaWrapper = ctaLink.closest('p');
  if (!ctaWrapper) return;

  const form = document.createElement('div');
  form.className = 'hero-search';

  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'hero-search-input';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter your website';
  input.setAttribute('aria-label', 'Enter your website');
  inputWrapper.appendChild(input);

  const countryBtn = document.createElement('button');
  countryBtn.type = 'button';
  countryBtn.className = 'hero-search-country';
  countryBtn.setAttribute('aria-label', 'Filter by country');
  countryBtn.innerHTML = '<span>us</span>';
  inputWrapper.appendChild(countryBtn);

  const countries = ['us', 'uk', 'de', 'fr', 'es', 'it', 'br', 'au', 'ca', 'in', 'jp'];
  const dropdown = document.createElement('div');
  dropdown.className = 'hero-search-dropdown';
  dropdown.style.display = 'none';

  countries.forEach((code) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.textContent = code;
    option.addEventListener('click', (ev) => {
      ev.stopPropagation();
      countryBtn.querySelector('span').textContent = code;
      dropdown.style.display = 'none';
    });
    dropdown.appendChild(option);
  });

  countryBtn.addEventListener('click', (ev) => {
    ev.stopPropagation();
    dropdown.style.display = dropdown.style.display === 'none' ? 'flex' : 'none';
  });

  document.addEventListener('click', () => {
    dropdown.style.display = 'none';
  });

  inputWrapper.appendChild(dropdown);

  form.appendChild(inputWrapper);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.className = 'hero-search-submit';
  submitBtn.textContent = 'Get insights';
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

  ctaWrapper.replaceWith(form);
}
