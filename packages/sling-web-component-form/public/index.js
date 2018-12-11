import { sleep } from 'sling-helpers';
import 'sling-web-component-field';
import 'sling-web-component-button';

const form = document.querySelector('sling-form');
const userNameField = document.querySelector('[name=username]');
const debug = document.getElementById('debug');

form.addEventListener('update', ({ detail }) => {
  debug.innerHTML = JSON.stringify(detail, null, 2);
});

form.addEventListener('submitsuccess', ({ detail }) => {
  console.log('SUCCESS', JSON.stringify(detail, null, 2));
  form.finishSubmission();
});

form.addEventListener('submiterror', ({ detail }) => {
  console.log('ERRORS', JSON.stringify(detail, null, 2));
  form.finishSubmission();
});

const validateForm = (values) => {
  const errors = {};

  if (!values.phone || (!values.phone.cell && !values.phone.home)) {
    errors.phoneMinimum = 'Fill in at least one phone number';
  }

  return errors;
};

const validateUserName = async (value) => {
  await sleep(500);

  if (value === 'admin') {
    return 'Please do not use admin!';
  }

  return undefined;
};

form.validation = validateForm;
userNameField.validation = validateUserName;
