import '../src/index.js';

const button = document.querySelector('button');
const loader = document.querySelector('emd-loader');

button.onclick = () => {
  loader.loading = !loader.loading;
};
