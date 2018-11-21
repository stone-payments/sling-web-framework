import { INITIAL_STATE as initialFormState } from 'sling-web-component-form';
import { isValidEmail } from 'sling-helpers/src/form/isValidEmail.js';
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

export const TestBusinessForm = Base => class extends Base {
  constructor() {
    super();
    this.form = initialFormState;
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  static get properties() {
    return {
      form: {
        type: Object,
        reflectToAttribute: false,
      },
    };
  }

  handleFormUpdate({ detail }) {
    this.form = detail;
  }

  handleFormSubmission() {
    this.form.submitForm()
      .then((values) => {
        console.log('valid', values);
      })
      .catch((errors) => {
        console.log('invalid', errors);
      })
      .then(this.form.finishSubmission);
  }

  render() {
    const { form, handleFormUpdate, handleFormSubmission } = this;

    return TestBusinessFormView({
      form,
      ...form,
      validateUserName,
      validateEmail,
      validateEmailAsync,
      validateForm,
      validateFormAsync,
      handleFormUpdate,
      handleFormSubmission,
    });
  }
};
