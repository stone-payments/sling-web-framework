const { search = '' } = document.location;
const ecmaVersion = (search.match(/[?&]es=(\d)/) || [])[1] || '6';

const insertAfter = (referenceNode, newNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

const docHead = document.querySelector('head');

const originalTag = Array
  .from(document.querySelectorAll('script'))
  .find(domEl => domEl.getAttribute('src') &&
    domEl.getAttribute('src').endsWith('injectDependencies.js'));

const polyPath = '../../../scripts/polyfills';

const babelPolyfillTag = document.createElement('script');
babelPolyfillTag.src = `${polyPath}/babel-polyfill-7.0.0.js`;

const webComponentsPolyfillTag = document.createElement('script');
webComponentsPolyfillTag.src = `${polyPath}/webcomponents-bundle-2.0.2.js`;

const customElementsAdapterTag = document.createElement('script');
customElementsAdapterTag.src = `${polyPath}/custom-elements-es5-adapter-2.0.2.js`;

const index = document.createElement('script');
index.src = `../dist/iife/es${ecmaVersion}/index.js`;

if (ecmaVersion === '5') {
  insertAfter(originalTag, babelPolyfillTag);
}

insertAfter(originalTag, webComponentsPolyfillTag);

if (ecmaVersion === '5') {
  insertAfter(originalTag, customElementsAdapterTag);
}

insertAfter(originalTag, index);

docHead.removeChild(originalTag);
