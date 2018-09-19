const { search = '' } = document.location;
const ecmaVersion = (search.match(/[?&]es=(\d)/) || [])[1] || '6';

const docHead = document.querySelector('head');

const injectScript = Array
  .from(document.querySelectorAll('script'))
  .find(domEl => domEl.getAttribute('src').endsWith('injectDependencies.js'));

const polyfillScript = document.createElement('script');
polyfillScript.src = '../../../polyfills/webcomponents-bundle-2.0.2.js';

const adapterScript = document.createElement('script');
adapterScript.src = '../../../polyfills/custom-elements-es5-adapter-2.0.2.js';

const indexScript = document.createElement('script');
indexScript.src = `../dist/iife/es${ecmaVersion}/index.js`;

docHead.appendChild(polyfillScript);

if (ecmaVersion === '5') {
  docHead.appendChild(adapterScript);
}

docHead.appendChild(indexScript);

docHead.removeChild(injectScript);
