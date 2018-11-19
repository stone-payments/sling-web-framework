import { isValidEmail } from 'sling-helpers/src/form/isValidEmail.js';
import { withForm } from './withForm.js';
import { TestBusinessFormView } from './TestBusinessFormView.js';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const validateUserName = value => (value === 'admin'
  ? 'Please do not use admin'
  : undefined);

export const validateEmail = value => (!isValidEmail(value)
  ? 'Please enter a valid e-mail'
  : undefined);

export const validateEmailAsync = value => sleep(500)
  .then(() => {
    if (!isValidEmail(value)) {
      throw new Error('Please enter a valid e-mail');
    }
  });

export const validateForm = (values) => {
  const errors = {};

  if (!values.cellphone && !values.workphone && !values.homephone) {
    errors.phone = 'Please enter at least one valid phone number';
  }

  return errors;
};

export const validateFormAsync = values => Promise.resolve()
  .then(() => {
    const errors = {};

    if (!values.cellphone && !values.workphone && !values.homephone) {
      errors.phone = 'Please enter at least one valid phone number';
    }

    if (Object.keys(errors).length > 0) {
      throw errors;
    }
  });

export const TestBusinessForm = Base => class extends withForm(Base) {
  static get properties() {
    return {
      formState: {
        type: Object,
        reflectToAttribute: false,
      },
    };
  }

  render() {
    const { formState } = this;
    const {
      values,
      errors,
      touched,
      isValid,
      isValidating,
      isSubmitting,
    } = formState;

    return TestBusinessFormView({
      formState,
      values,
      errors,
      touched,
      isValid,
      isValidating,
      isSubmitting,
      validateUserName,
      validateEmail,
      validateEmailAsync,
      validateForm,
      validateFormAsync,
    });
  }
};
