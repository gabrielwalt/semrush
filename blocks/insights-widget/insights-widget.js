const COUNTRIES = [
  { id: 'us', name: 'United States, Google', flag: '🇺🇸' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { id: 'de', name: 'Germany', flag: '🇩🇪' },
  {
    id: 'fr', name: 'France', flag: '🇫🇷', divider: true,
  },
  { id: 'af', name: 'Afghanistan', flag: '🇦🇫' },
  { id: 'al', name: 'Albania', flag: '🇦🇱' },
  { id: 'dz', name: 'Algeria', flag: '🇩🇿' },
  { id: 'ao', name: 'Angola', flag: '🇦🇴' },
  { id: 'ar', name: 'Argentina', flag: '🇦🇷' },
  { id: 'am', name: 'Armenia', flag: '🇦🇲' },
  { id: 'au', name: 'Australia', flag: '🇦🇺' },
  { id: 'at', name: 'Austria', flag: '🇦🇹' },
  { id: 'az', name: 'Azerbaijan', flag: '🇦🇿' },
  { id: 'bs', name: 'Bahamas', flag: '🇧🇸' },
  { id: 'bh', name: 'Bahrain', flag: '🇧🇭' },
  { id: 'bd', name: 'Bangladesh', flag: '🇧🇩' },
  { id: 'by', name: 'Belarus', flag: '🇧🇾' },
  { id: 'be', name: 'Belgium', flag: '🇧🇪' },
  { id: 'bz', name: 'Belize', flag: '🇧🇿' },
  { id: 'bo', name: 'Bolivia', flag: '🇧🇴' },
  { id: 'ba', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { id: 'bw', name: 'Botswana', flag: '🇧🇼' },
  { id: 'br', name: 'Brazil', flag: '🇧🇷' },
  { id: 'bn', name: 'Brunei', flag: '🇧🇳' },
  { id: 'bg', name: 'Bulgaria', flag: '🇧🇬' },
  { id: 'cv', name: 'Cabo Verde', flag: '🇨🇻' },
  { id: 'kh', name: 'Cambodia', flag: '🇰🇭' },
  { id: 'cm', name: 'Cameroon', flag: '🇨🇲' },
  { id: 'ca', name: 'Canada', flag: '🇨🇦' },
  { id: 'cl', name: 'Chile', flag: '🇨🇱' },
  { id: 'co', name: 'Colombia', flag: '🇨🇴' },
  { id: 'cd', name: 'Congo', flag: '🇨🇩' },
  { id: 'cr', name: 'Costa Rica', flag: '🇨🇷' },
  { id: 'hr', name: 'Croatia', flag: '🇭🇷' },
  { id: 'cy', name: 'Cyprus', flag: '🇨🇾' },
  { id: 'cz', name: 'Czech Republic', flag: '🇨🇿' },
  { id: 'dk', name: 'Denmark', flag: '🇩🇰' },
  { id: 'do', name: 'Dominican Republic', flag: '🇩🇴' },
  { id: 'ec', name: 'Ecuador', flag: '🇪🇨' },
  { id: 'eg', name: 'Egypt', flag: '🇪🇬' },
  { id: 'sv', name: 'El Salvador', flag: '🇸🇻' },
  { id: 'ee', name: 'Estonia', flag: '🇪🇪' },
  { id: 'et', name: 'Ethiopia', flag: '🇪🇹' },
  { id: 'fi', name: 'Finland', flag: '🇫🇮' },
  { id: 'ge', name: 'Georgia', flag: '🇬🇪' },
  { id: 'gh', name: 'Ghana', flag: '🇬🇭' },
  { id: 'gr', name: 'Greece', flag: '🇬🇷' },
  { id: 'gt', name: 'Guatemala', flag: '🇬🇹' },
  { id: 'gy', name: 'Guyana', flag: '🇬🇾' },
  { id: 'ht', name: 'Haiti', flag: '🇭🇹' },
  { id: 'hn', name: 'Honduras', flag: '🇭🇳' },
  { id: 'hk', name: 'Hong Kong', flag: '🇭🇰' },
  { id: 'hu', name: 'Hungary', flag: '🇭🇺' },
  { id: 'is', name: 'Iceland', flag: '🇮🇸' },
  { id: 'in', name: 'India', flag: '🇮🇳' },
  { id: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { id: 'ie', name: 'Ireland', flag: '🇮🇪' },
  { id: 'il', name: 'Israel', flag: '🇮🇱' },
  { id: 'it', name: 'Italy', flag: '🇮🇹' },
  { id: 'jm', name: 'Jamaica', flag: '🇯🇲' },
  { id: 'jp', name: 'Japan', flag: '🇯🇵' },
  { id: 'jo', name: 'Jordan', flag: '🇯🇴' },
  { id: 'kz', name: 'Kazakhstan', flag: '🇰🇿' },
  { id: 'kw', name: 'Kuwait', flag: '🇰🇼' },
  { id: 'lv', name: 'Latvia', flag: '🇱🇻' },
  { id: 'lb', name: 'Lebanon', flag: '🇱🇧' },
  { id: 'ly', name: 'Libya', flag: '🇱🇾' },
  { id: 'lt', name: 'Lithuania', flag: '🇱🇹' },
  { id: 'lu', name: 'Luxembourg', flag: '🇱🇺' },
  { id: 'mg', name: 'Madagascar', flag: '🇲🇬' },
  { id: 'my', name: 'Malaysia', flag: '🇲🇾' },
  { id: 'mt', name: 'Malta', flag: '🇲🇹' },
  { id: 'mu', name: 'Mauritius', flag: '🇲🇺' },
  { id: 'mx', name: 'Mexico', flag: '🇲🇽' },
  { id: 'md', name: 'Moldova', flag: '🇲🇩' },
  { id: 'mn', name: 'Mongolia', flag: '🇲🇳' },
  { id: 'me', name: 'Montenegro', flag: '🇲🇪' },
  { id: 'ma', name: 'Morocco', flag: '🇲🇦' },
  { id: 'mz', name: 'Mozambique', flag: '🇲🇿' },
  { id: 'na', name: 'Namibia', flag: '🇳🇦' },
  { id: 'np', name: 'Nepal', flag: '🇳🇵' },
  { id: 'nl', name: 'Netherlands', flag: '🇳🇱' },
  { id: 'nz', name: 'New Zealand', flag: '🇳🇿' },
  { id: 'ni', name: 'Nicaragua', flag: '🇳🇮' },
  { id: 'ng', name: 'Nigeria', flag: '🇳🇬' },
  { id: 'no', name: 'Norway', flag: '🇳🇴' },
  { id: 'om', name: 'Oman', flag: '🇴🇲' },
  { id: 'pk', name: 'Pakistan', flag: '🇵🇰' },
  { id: 'py', name: 'Paraguay', flag: '🇵🇾' },
  { id: 'pe', name: 'Peru', flag: '🇵🇪' },
  { id: 'ph', name: 'Philippines', flag: '🇵🇭' },
  { id: 'pl', name: 'Poland', flag: '🇵🇱' },
  { id: 'pt', name: 'Portugal', flag: '🇵🇹' },
  { id: 'ro', name: 'Romania', flag: '🇷🇴' },
  { id: 'ru', name: 'Russia', flag: '🇷🇺' },
  { id: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
  { id: 'sn', name: 'Senegal', flag: '🇸🇳' },
  { id: 'rs', name: 'Serbia', flag: '🇷🇸' },
  { id: 'sg', name: 'Singapore', flag: '🇸🇬' },
  { id: 'sk', name: 'Slovakia', flag: '🇸🇰' },
  { id: 'si', name: 'Slovenia', flag: '🇸🇮' },
  { id: 'za', name: 'South Africa', flag: '🇿🇦' },
  { id: 'kr', name: 'South Korea', flag: '🇰🇷' },
  { id: 'es', name: 'Spain', flag: '🇪🇸' },
  { id: 'lk', name: 'Sri Lanka', flag: '🇱🇰' },
  { id: 'se', name: 'Sweden', flag: '🇸🇪' },
  { id: 'ch', name: 'Switzerland', flag: '🇨🇭' },
  { id: 'th', name: 'Thailand', flag: '🇹🇭' },
  { id: 'tt', name: 'Trinidad and Tobago', flag: '🇹🇹' },
  { id: 'tn', name: 'Tunisia', flag: '🇹🇳' },
  { id: 'tr', name: 'Turkey', flag: '🇹🇷' },
  { id: 'ua', name: 'Ukraine', flag: '🇺🇦' },
  { id: 'ae', name: 'United Arab Emirates', flag: '🇦🇪' },
  { id: 'uy', name: 'Uruguay', flag: '🇺🇾' },
  { id: 've', name: 'Venezuela', flag: '🇻🇪' },
  { id: 'vn', name: 'Vietnam', flag: '🇻🇳' },
  { id: 'zm', name: 'Zambia', flag: '🇿🇲' },
  { id: 'zw', name: 'Zimbabwe', flag: '🇿🇼' },
];

function buildCountryOption(country, selected) {
  const li = document.createElement('li');
  li.className = `insights-widget-option${selected ? ' insights-widget-option-selected' : ''}`;
  if (country.divider) li.classList.add('insights-widget-option-divider');
  li.dataset.id = country.id;
  li.setAttribute('role', 'option');
  li.setAttribute('aria-selected', selected ? 'true' : 'false');
  li.innerHTML = `<span class="insights-widget-option-flag">${country.flag}</span><span class="insights-widget-option-text">${country.name}</span>`;
  return li;
}

function renderOptions(list, filter, selectedId) {
  list.innerHTML = '';
  const query = filter.toLowerCase();
  COUNTRIES.forEach((country) => {
    if (query && !country.name.toLowerCase().includes(query) && !country.id.includes(query)) return;
    list.appendChild(buildCountryOption(country, country.id === selectedId));
  });
}

export default async function decorate(block) {
  block.closest('.insights-widget-wrapper')?.classList.add('full-width');
  const cell = block.querySelector(':scope > div > div');
  const paragraphs = cell ? cell.querySelectorAll('p') : [];
  const placeholder = (paragraphs[0] ? paragraphs[0].textContent.trim() : '') || 'Enter your website';
  const buttonLabel = (paragraphs[1] ? paragraphs[1].textContent.trim() : '') || 'Get insights';

  let selectedCountry = COUNTRIES[0];

  const wrapper = document.createElement('div');
  wrapper.className = 'insights-widget-form glass-surface';

  const form = document.createElement('div');
  form.className = 'insights-widget-search';

  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'insights-widget-input';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = placeholder;
  input.setAttribute('aria-label', placeholder);
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-expanded', 'false');
  input.autocomplete = 'off';
  inputWrapper.appendChild(input);

  const cursor = document.createElement('span');
  cursor.className = 'insights-widget-input-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  inputWrapper.appendChild(cursor);

  const positionCursor = () => {
    const font = window.getComputedStyle(input);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = `${font.fontSize} ${font.fontFamily}`;
    const textWidth = ctx.measureText(placeholder).width;
    cursor.style.left = `${24 + textWidth + 1}px`;
  };
  requestAnimationFrame(positionCursor);

  input.addEventListener('focus', () => { cursor.style.display = 'none'; });
  input.addEventListener('blur', () => {
    cursor.style.display = input.value ? 'none' : '';
  });
  input.addEventListener('input', () => {
    cursor.style.display = input.value ? 'none' : '';
  });

  const countryWrapper = document.createElement('div');
  countryWrapper.className = 'insights-widget-country-wrapper';

  const countryBtn = document.createElement('button');
  countryBtn.type = 'button';
  countryBtn.className = 'insights-widget-country';
  countryBtn.setAttribute('aria-label', 'Filter by country');
  countryBtn.setAttribute('aria-haspopup', 'listbox');
  countryBtn.setAttribute('aria-expanded', 'false');
  countryBtn.innerHTML = `<span class="insights-widget-country-code">${selectedCountry.id}</span><span class="insights-widget-country-arrow" aria-hidden="true"></span>`;
  countryWrapper.appendChild(countryBtn);

  const dropdown = document.createElement('div');
  dropdown.className = 'insights-widget-dropdown';
  dropdown.hidden = true;

  const searchWrap = document.createElement('div');
  searchWrap.className = 'insights-widget-dropdown-search';
  const searchIcon = document.createElement('span');
  searchIcon.className = 'insights-widget-dropdown-search-icon';
  searchIcon.setAttribute('aria-hidden', 'true');
  searchIcon.innerHTML = '<svg viewBox="0 0 16 16" width="16" height="16"><path d="M2.5 6.5c0-2.206 1.794-4 4-4s4 1.794 4 4-1.794 4-4 4-4-1.794-4-4m12.207 6.793l-3.677-3.677c.611-.886.97-1.959.97-3.116 0-3.037-2.462-5.5-5.5-5.5s-5.5 2.463-5.5 5.5 2.462 5.5 5.5 5.5c1.158 0 2.23-.359 3.116-.97l3.677 3.677c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414" fill="currentColor"></path></svg>';
  searchWrap.appendChild(searchIcon);
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'insights-widget-dropdown-search-input';
  searchInput.placeholder = 'Enter country';
  searchInput.setAttribute('role', 'combobox');
  searchInput.setAttribute('aria-autocomplete', 'list');
  searchInput.setAttribute('aria-expanded', 'true');
  searchInput.setAttribute('aria-controls', 'insights-country-list');
  searchWrap.appendChild(searchInput);
  dropdown.appendChild(searchWrap);

  const list = document.createElement('ul');
  list.className = 'insights-widget-dropdown-list';
  list.id = 'insights-country-list';
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-label', 'Countries');
  renderOptions(list, '', selectedCountry.id);
  dropdown.appendChild(list);

  function openDropdown() {
    dropdown.hidden = false;
    countryBtn.setAttribute('aria-expanded', 'true');
    cursor.style.display = 'none';
    searchInput.value = '';
    renderOptions(list, '', selectedCountry.id);
    requestAnimationFrame(() => searchInput.focus());
  }

  function closeDropdown() {
    dropdown.hidden = true;
    countryBtn.setAttribute('aria-expanded', 'false');
    if (!input.value && document.activeElement !== input) {
      cursor.style.display = '';
    }
  }

  function selectCountry(id) {
    const country = COUNTRIES.find((c) => c.id === id);
    if (!country) return;
    selectedCountry = country;
    countryBtn.querySelector('.insights-widget-country-code').textContent = country.id;
    closeDropdown();
  }

  countryBtn.addEventListener('click', (ev) => {
    ev.stopPropagation();
    if (dropdown.hidden) openDropdown();
    else closeDropdown();
  });

  searchInput.addEventListener('input', () => {
    renderOptions(list, searchInput.value, selectedCountry.id);
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDropdown();
  });

  list.addEventListener('click', (ev) => {
    const option = ev.target.closest('[data-id]');
    if (option) {
      ev.stopPropagation();
      selectCountry(option.dataset.id);
    }
  });

  document.addEventListener('click', (ev) => {
    if (!countryWrapper.contains(ev.target)) closeDropdown();
  });

  countryWrapper.appendChild(dropdown);
  inputWrapper.appendChild(countryWrapper);
  form.appendChild(inputWrapper);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.className = 'insights-widget-submit';
  submitBtn.textContent = buttonLabel;
  form.appendChild(submitBtn);

  submitBtn.addEventListener('click', () => {
    const domain = input.value.trim();
    const country = selectedCountry.id;
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
