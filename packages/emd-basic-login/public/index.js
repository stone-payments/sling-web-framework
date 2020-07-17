import '../src/index.js';

const loginComponent = document.querySelector('emd-login');

loginComponent.addEventListener('emailsubmitsuccess', ({ target }) => {
  target.nextStep();
});

loginComponent.addEventListener('passwordsubmitsuccess', ({ detail }) => {

});
