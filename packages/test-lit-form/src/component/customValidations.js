import { cancelableDelay } from 'sling-web-component-form';
import { compose } from 'sling-helpers';
import {
  validateEmail,
  validateTel,
  validateCpf,
  validateCnpj,
} from 'sling-web-component-field';

export {
  validateCpf,
  validateCnpj,
};

export const validateRequired = value => (!value
  ? 'Required'
  : undefined);

export const validateRequiredEmail = compose(validateEmail, validateRequired);

export const validateRequiredTel = compose(validateTel, validateRequired);

export const validateUsernameAvailability = (value) => {
  if (!value) {
    return 'Required';
  }

  if (value.length < 3) {
    return 'Type at least 3 characters';
  }

  return cancelableDelay(3000)
    .then(() => fetch(`https://api.github.com/users/${value}`))
    .then(response => (response.ok ? 'User exists' : undefined))
    .catch(() => undefined);
};
