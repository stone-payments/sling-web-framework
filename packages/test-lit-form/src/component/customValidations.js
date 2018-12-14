import CancelablePromise from 'bluebird';

CancelablePromise.config({
  cancellation: true,
});

const zzz = new CancelablePromise((resolve) => {
  setTimeout(() => resolve('lady gaga'), 3000);
}).then((resolved) => {
  console.log(resolved);

  return new CancelablePromise((resolve) => {
    setTimeout(() => resolve('anchients of mumu'), 3000);
  });
}).then((resolved) => {
  console.log(resolved);
});

setTimeout(() => zzz.cancel(), 1000);

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

const checkUser = user => fetch(`https://api.github.com/users/${user}`);

export const validateUsernameAvailability = value =>
  new CancelablePromise(resolve => setTimeout(() =>
    resolve(checkUser(value).then(() =>
      'User exists').catch(() => undefined)), 3000));
