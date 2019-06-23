import '../src/index.js';

const body = document.querySelector('body');
const Icon = customElements.get('emd-icon');

const iconsLine = Object
  .keys(Icon.icons)
  .map(key => key.toLowerCase().replace(/_/g, '-'))
  .map(icon => `<emd-icon icon=${icon}></emd-icon>\n`)
  .join('');

body.innerHTML = `
  <h1>Icon</h1>
  <div>${iconsLine}</div>
  <div>${iconsLine}</div>
  <div>${iconsLine}</div>

  <h1>Icon&thinsp;—&thinsp;Colored</h1>
  <div>${iconsLine}</div>
  <div>${iconsLine}</div>
  <div>${iconsLine}</div>
`;
