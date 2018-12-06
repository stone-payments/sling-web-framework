import 'sling-web-component-input';
import 'sling-web-component-button';

const form = document.querySelector('sling-form');
const userNameField = document.querySelector('sling-input[name=username]');
const debug = document.getElementById('debug');

form.addEventListener('update', ({ detail }) => {
  console.log('update', detail);
  debug.innerHTML = JSON.stringify(detail, null, 2);
});

form.addEventListener('formsubmit', ({ detail }) => {
  console.log(JSON.stringify(detail, null, 2));
});

console.log('direct selection', form.state);

const validateForm = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.cellphone && !values.homephone) {
    errors.phone = 'Fill in at least one phone number';
  }

  return errors;
};

const validateUserName = (value) => {
  if (value === 'admin') {
    return 'Please do not use admin!';
  }

  return undefined;
};

form.validation = validateForm;
userNameField.validation = validateUserName;
