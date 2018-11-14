import 'sling-web-component-input';
import 'sling-web-component-button';

const form = document.querySelector('sling-form');
const debug = document.getElementById('debug');

form.addEventListener('formupdate', (evt) => {
  debug.innerHTML = JSON.stringify(evt.target.formdata, null, 2);
});

export const desiredResult = {
  values: {
    email: 'contato@',
  },
  errors: {
    email: 'email must be a valid email',
  },
  touched: {
    email: true,
  },
  isSubmitting: false,
  isValidating: false,
  submitCount: 0,
  dirty: true,
  isValid: false,
  initialValues: {
    email: '',
  },
  validateOnChange: true,
  validateOnBlur: true,
};
