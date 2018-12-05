import { setIn } from '../helpers/immutableHelper.js';

const isFunction = arg => typeof arg === 'function';
const isPromise = arg => arg && arg.then && isFunction(arg.then);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const FORM_LEVEL = '__FORM_LEVEL__';

const formValidator = {
  pending: {},
  isExecuting: {},
  get isValidating() {
    return Object.values(this.isExecuting).some(val => val === true);
  },
  validate(validatorThunk, path = FORM_LEVEL) {
    this.queue(validatorThunk, path);
    this.executeNext(path);
  },
  queue(validatorThunk, path) {
    this.pending[path] = this.pending[path] || [];
    this.pending[path].push(validatorThunk);
  },
  async executeNext(path, errors = {}) {
    if (!this.isExecuting[path]) {
      if (this.pending[path].length > 0) {
        this.isExecuting[path] = true;
        const nextValidatorThunk = this.pending[path].pop();
        this.pending[path] = [];
        const nextErrors = await nextValidatorThunk();
        this.isExecuting[path] = false;
        this.executeNext(path, nextErrors);
      } else {
        if (path === FORM_LEVEL) {
          if (isFunction(this.onFormLevelValidationComplete)) {
            this.onFormLevelValidationComplete({ errors });
          }
        } else if (isFunction(this.onFieldLevelValidationComplete)) {
          this.onFieldLevelValidationComplete({ errors, path });
        }

        if (!this.isValidating) {
          if (isFunction(this.onValidationComplete)) {
            this.onValidationComplete();
          }
        }
      }
    }
  },
};

formValidator.onFormLevelValidationComplete = ({ errors }) =>
  console.log('acabei form level!', errors);

formValidator.onFieldLevelValidationComplete = ({ errors, path }) =>
  console.log(`acabei field level: ${path}!`, errors);

formValidator.onValidationComplete = () => console.log('acabei!');

const treatError = error =>
  (error.constructor === Error ? error.message : error);

const atLevel = wrapperFn => (validatorFn, value, path) => {
  if (validatorFn == null) return {};

  const maybeError = validatorFn(value);

  return (isPromise(maybeError))
    ? maybeError.catch(treatError).then(wrapperFn(path))
    : Promise.resolve(wrapperFn(path)(maybeError));
};

const atFieldLevel = (...args) => {
  const wrapperFn = path => errorStr => setIn({}, path, errorStr || null);
  return atLevel(wrapperFn)(...args);
};

const atFormLevel = (...args) => {
  const wrapperFn = () => errorObj => errorObj || {};
  return atLevel(wrapperFn)(...args);
};

// TESTS

const validateTakenUsername = value => sleep(200).then(() => {
  if (value === 'admin' || value === 'leofavre' || value === 'user') {
    throw new Error('This username is already taken');
  }
});

const validateRequiredField = value => (!value
  ? 'This field is required'
  : undefined);

const validateForm = (values) => {
  const errors = {};

  if (!values.phone || (!values.phone.personal && !values.phone.work)) {
    errors.onePhoneMinimum = 'Please enter at least one phone number';
  }

  return errors;
};

formValidator.validate(() =>
  atFieldLevel(validateTakenUsername, 'a', 'name'), 'name');

formValidator.validate(() =>
  atFieldLevel(validateTakenUsername, 'ad', 'name'), 'name');

formValidator.validate(() =>
  atFieldLevel(validateTakenUsername, 'adm', 'name'), 'name');

formValidator.validate(() =>
  atFieldLevel(validateTakenUsername, 'admi', 'name'), 'name');

formValidator.validate(() =>
  atFieldLevel(validateTakenUsername, 'admin', 'name'), 'name');

formValidator.validate(() =>
  atFieldLevel(validateTakenUsername, 'zadmin', 'name'), 'name');

formValidator.validate(() =>
  atFieldLevel(validateRequiredField, '', 'email'), 'email');

formValidator.validate(() =>
  atFieldLevel(validateRequiredField, 'leo', 'email'), 'email');

formValidator.validate(() =>
  atFieldLevel(validateRequiredField, 'leo@leo', 'email'), 'email');

formValidator.validate(() =>
  atFieldLevel(validateRequiredField, 'leo@leofa', 'email'), 'email');

formValidator.validate(() =>
  atFieldLevel(validateRequiredField, 'leo@leofavre', 'email'), 'email');

formValidator.validate(() =>
  atFormLevel(validateForm, {}));

formValidator.validate(() =>
  atFormLevel(validateForm, { phone: { personal: 'a' } }));

formValidator.validate(() =>
  atFormLevel(validateForm, { phone: { personal: 'alter' } }));

formValidator.validate(() =>
  atFormLevel(validateForm, { phone: { personal: 'altern8' } }));
