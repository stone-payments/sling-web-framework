import { v0 as sdk } from 'customer-js-sdk';
import '../src/index.js';
import '@stone-payments/emd-business-weekly-calendar';

sdk.authorization.set(sdk.BEARER, ``);

let currentButton = 'default';

const wrappers = Array.from(document.querySelectorAll('emd-state-wrapper'));
const businesses = Array.from(document.querySelectorAll('emd-weekly-calendar'));

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
});

updateStateButtons();

businesses.forEach(business => {
  business.source = [
    {
      date: '2019-01-31',
      value: 48.96,
      currency: 'BRL'
    },
    {
      date: '2019-02-01',
      value: 73.3,
      currency: 'BRL'
    },
    {
      date: '2019-02-04',
      value: 0,
      currency: 'BRL'
    },
    {
      date: '2019-02-05',
      value: 0,
      currency: 'BRL'
    },
    {
      date: '2019-02-06',
      value: 265.01,
      currency: 'BRL'
    },
    {
      date: '2019-02-01',
      value: 73.3,
      currency: 'BRL'
    },
    {
      date: '2019-02-04',
      value: 0,
      currency: 'BRL'
    },
    {
      date: '2019-02-05',
      value: 0,
      currency: 'BRL'
    },
    {
      date: '2019-02-06',
      value: 265.01,
      currency: 'BRL'
    }
  ];
});
