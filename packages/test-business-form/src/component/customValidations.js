export const validatePhones = (values) => {
  const errors = {};

  if (Object.values(values.phone).every(phone => !phone)) {
    errors.phoneMinimum = 'Please enter at least one phone number';
  }

  return errors;
};

export const validateUsernameAvailability = value =>
  fetch(`https://api.github.com/users/${value}`)
    .then(res => (res.ok ? 'Username already taken' : undefined))
    .catch(() => undefined);