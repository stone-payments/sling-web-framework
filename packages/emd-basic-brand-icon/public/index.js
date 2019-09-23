import '../src/index.js';

const body = document.querySelector('body');
const Brand = customElements.get('emd-brand-icon');

const iconNames = Object
  .keys(Brand.icons)
  .map(key => key.toLowerCase().replace(/_/g, '-'));

const iconsLine = iconNames
  .map(icon => `<emd-brand-icon icon=${icon}></emd-brand-icon>\n`)
  .join('');

body.innerHTML = `
  <h1>Brand Icon</h1>
  <div class="line">${iconsLine}</div>
  <div class="line">${iconsLine}</div>
  <div class="line">${iconsLine}</div>
`;
