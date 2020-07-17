import '../src/index.js';

const hideAllButton = document.querySelector('button');

hideAllButton.addEventListener('click', () => {
  Array
    .from(document.querySelectorAll('emd-money'))
    .forEach(money => {
      if (money.hasAttribute('hidevalue')) {
        money.removeAttribute('hidevalue');
      } else {
        money.setAttribute('hidevalue', '');
      }
    });
});
