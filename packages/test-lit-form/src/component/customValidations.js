import { cancelableDelay } from 'sling-web-component-form';

export const validateRequired = value => (!value
  ? 'Required'
  : undefined);

export const validateUsernameAvailability = value =>
  cancelableDelay(3000)
    .then(() => fetch(`https://api.github.com/users/${value}`))
    .then(response => (response.ok ? 'User exists' : undefined))
    .catch(() => undefined);
