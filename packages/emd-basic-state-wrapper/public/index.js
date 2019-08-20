import { rows } from './rows.js';
import '@stone-payments/emd-basic-table';
import '../src/index.js';

let currentButton = 'default';

const wrappers = Array.from(document.querySelectorAll('emd-state-wrapper'));
const tables = Array.from(document.querySelectorAll('emd-table'));

const header = ['Movie', 'Year'];

const appearance = {
  align: ['left', 'right'],
  valign: 'middle'
};

const adapter = ({ name, year }) => [
  name,
  year
];

tables.forEach(table => {
  table.rows = rows;
  table.adapter = adapter;
  table.appearance = appearance;
  table.header = header;
});

const stateButtons = Array
  .from(document.querySelectorAll('button'))
  .filter(button => button.innerText !== 'loading');

const updateStateButtons = () => {
  stateButtons.forEach(button => {
    button.disabled = button.innerText === currentButton;
  });
};

const loadingButton = Array
  .from(document.querySelectorAll('button'))
  .find(button => button.innerText === 'loading');

const loadingState = document.querySelector('span');

loadingButton.onclick = () => {
  wrappers.forEach(wrapper => {
    wrapper.isLoading = !wrapper.isLoading;
  });
  loadingState.innerHTML = wrappers[0].isLoading ? 'on' : 'off';
};

stateButtons.forEach(button => {
  button.onclick = ({ target }) => {
    currentButton = target.innerText;
    updateStateButtons();

    wrappers.forEach(wrapper => {
      wrapper.currentState = currentButton;
    });
  };

  wrappers.forEach(wrapper => {
    wrapper.currentState = 'default';
    wrapper.recovery = () => window.alert('custom recovery method');
  });
});

updateStateButtons();
