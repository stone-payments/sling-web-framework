import '../src/index.js';

document.getElementById('focus').addEventListener('click', () => {
  document.querySelector('emd-pin-code').focus();
});

document.getElementById('blur').addEventListener('click', () => {
  document.querySelector('emd-pin-code').blur();
});
