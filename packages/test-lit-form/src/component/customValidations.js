export const validatePhones = (values) => {
  const errors = {};

  if (Object.values(values.phone).every(phone => !phone)) {
    errors.phoneMinimum = 'Please enter at least one phone number';
  }

  return errors;
};

export const validateRequired = value => (!value
  ? 'Required'
  : undefined);

export const validateNotAdmin = (value) => {
  if (!value) {
    return 'Required';
  }

  return value === 'admin' ? 'Do not use admin!' : undefined;
};

export const validateUsernameAvailability = value =>
  fetch(`https://api.github.com/users/${value}`)
    .then(res => (res.ok ? 'Username already taken' : undefined))
    .catch(() => undefined);
