import { isValidEmail } from 'sling-helpers/src/form/isValidEmail.js';
import { withForm } from './withForm.js';
import { TestBusinessFormView } from './TestBusinessFormView.js';

const validateUserName = value => (value === 'admin'
  ? 'Please do not use admin'
  : undefined);

const validateEmail = value => (!isValidEmail(value)
  ? 'Please enter a valid e-mail'
  : undefined);

const validateForm = (values) => {
  const errors = {};

  if (!values.cellphone && !values.workphone && !values.homephone) {
    errors.phone = 'Please enter at least one valid phone number';
  }

  return errors;
};

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
    const { values, errors, touched, focused, isValid } = formState;

    return TestBusinessFormView({
      formState,
      values,
      errors,
      touched,
      focused,
      isValid,
      validateUserName,
      validateEmail,
      validateForm,
    });
  }
};
