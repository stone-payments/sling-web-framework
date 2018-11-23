import { isValidEmail } from 'sling-helpers/src/form/isValidEmail.js';
import { isValidPhone } from 'sling-helpers/src/form/isValidPhone.js';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const validateRequiredField = value => (!value
  ? 'This field is required'
  : undefined);

export const validateRequiredEmail = (value) => {
  if (!value) {
    return 'This field is required';
  }

  return !isValidEmail(value)
    ? 'Please enter a valid e-mail'
    : undefined;
};

export const validateOptionalPhone = (value) => {
  if (!value) {
    return undefined;
  }

  return !isValidPhone(value)
    ? 'Please enter a valid phone number'
    : undefined;
};

export const validateTakenUsername = value => sleep(2000).then(() => {
  if (value === 'admin' || value === 'leofavre' || value === 'user') {
    throw new Error('This username is already taken');
  }
});

export const validateForm = (values) => {
  const errors = {};

  if (!values.phone || (!values.phone.personal && !values.phone.work)) {
    errors.onePhoneMinimum = 'Please enter at least one phone number';
  }

  return errors;
};
