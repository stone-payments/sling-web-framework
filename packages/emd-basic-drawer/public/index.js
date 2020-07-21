import '../src/index.js';

const buttons = Array.from(document.querySelectorAll('button'));
const drawers = Array.from(document.querySelectorAll('emd-drawer'));

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    drawers[index].open = !drawers[index].open;
  });
});
