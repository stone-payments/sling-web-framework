import { sleep } from 'sling-helpers';
import 'sling-web-component-field';
import 'sling-web-component-select';
import 'sling-web-component-button';

const form = document.querySelector('sling-form');
const userNameField = document.querySelector('[name=username]');
const debug = document.getElementById('debug');
const selector = document.querySelector('sling-select');

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

const selectorData = [
  {
    name: 'Option 1',
    id: 1,
  },
  {
    name: 'Option 2',
    id: 2,
  },
  {
    name: 'Option 3',
    id: 3,
  },
  {
    name: 'Option 4',
    id: 4,
  },
  {
    name: 'Option 5',
    id: 5,
  },
  {
    name: 'Option 6',
    id: 6,
  },
  {
    name: 'Option 7',
    id: 7,
  },
  {
    name: 'Option 8',
    id: 8,
  },
];

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
selector.srcoptions = selectorData;
