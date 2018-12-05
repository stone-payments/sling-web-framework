import { setIn, isDeeplyEmpty } from '../helpers/immutableHelper.js';

const isFunction = arg => typeof arg === 'function';
const isPromise = arg => arg && arg.then && isFunction(arg.then);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const FORM_LEVEL = '__FORM_LEVEL__';

class FormValidator {
  constructor() {
    this.pending = {};
    this.isValidatingLevel = {};
    this.fieldLevelErrors = {};
    this.formLevelErrors = {};
  }

  get isValidating() {
    return Object.values(this.isValidatingLevel).some(val => val === true);
  }

  get isValid() {
    return isDeeplyEmpty(this.errors);
  }

  get errors() {
    return {
      ...this.formLevelErrors,
      ...this.fieldLevelErrors,
    };
  }

  validate(validatorThunk, path = FORM_LEVEL) {
    this.queue(validatorThunk, path);
    this.executeNext(path);
  }

  queue(validatorThunk, path) {
    this.pending[path] = this.pending[path] || [];
    this.pending[path].push(validatorThunk);
  }

  async executeNext(path, levelErrors = {}) {
    if (!this.isValidatingLevel[path]) {
      if (this.pending[path].length > 0) {
        this.isValidatingLevel[path] = true;
        const nextValidatorThunk = this.pending[path].pop();
        this.pending[path] = [];
        const nextErrors = await nextValidatorThunk();
        this.isValidatingLevel[path] = false;
        this.executeNext(path, nextErrors);
      } else {
        if (path === FORM_LEVEL) {
          this.formLevelErrors = levelErrors;
        } else {
          this.fieldLevelErrors = {
            ...this.fieldLevelErrors,
            ...levelErrors,
          };
        }

        const result = {
          errors: this.errors,
          isValidating: this.isValidating,
          isValid: this.isValid,
        };

        if (isFunction(this.onPartialValidationComplete)) {
          this.onPartialValidationComplete(result);
        }

        if (!this.isValidating && isFunction(this.onValidationComplete)) {
          this.onValidationComplete(result);
        }
      }
    }
  }
}

const treatError = error =>
  (error.constructor === Error ? error.message : error);

const atLevel = wrapperFn => async (validatorFn, value, path) => {
  if (validatorFn == null) return {};

  const maybeError = validatorFn(value);

  await sleep(50); // avoids too much processing while typing

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


// VALIDATION FUNCTIONS

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


// MUST BE INSTANTIATED

const formValidator = new FormValidator();


// MUST BE IMPLEMENTED

formValidator.onPartialValidationComplete = ({ errors }) => console.log(errors);

formValidator.onValidationComplete = ({ isValid }) => console.log(isValid);


// TYPING SIMULATION

(async () => {
  formValidator.validate(() =>
    atFieldLevel(validateTakenUsername, 'a', 'name'), 'name');

  await sleep(30);

  formValidator.validate(() =>
    atFieldLevel(validateTakenUsername, 'ad', 'name'), 'name');

  await sleep(30);

  formValidator.validate(() =>
    atFieldLevel(validateTakenUsername, 'adm', 'name'), 'name');

  await sleep(30);

  formValidator.validate(() =>
    atFieldLevel(validateTakenUsername, 'admi', 'name'), 'name');

  await sleep(30);

  formValidator.validate(() =>
    atFieldLevel(validateTakenUsername, 'admin', 'name'), 'name');

  await sleep(30);

  formValidator.validate(() =>
    atFieldLevel(validateTakenUsername, 'zadmin', 'name'), 'name');

  await sleep(30);

  formValidator.validate(() =>
    atFieldLevel(validateRequiredField, '', 'email'), 'email');

  await sleep(30);

  formValidator.validate(() =>
    atFieldLevel(validateRequiredField, 'leo', 'email'), 'email');

  await sleep(30);

  formValidator.validate(() =>
    atFieldLevel(validateRequiredField, 'leo@leo', 'email'), 'email');

  await sleep(30);

  formValidator.validate(() =>
    atFieldLevel(validateRequiredField, 'leo@leofa', 'email'), 'email');

  await sleep(30);

  formValidator.validate(() =>
    atFieldLevel(validateRequiredField, 'leo@leofavre', 'email'), 'email');

  await sleep(30);

  formValidator.validate(() =>
    atFormLevel(validateForm, {}));

  await sleep(300);

  formValidator.validate(() =>
    atFormLevel(validateForm, { phone: { personal: 'a' } }));

  await sleep(30);

  formValidator.validate(() =>
    atFormLevel(validateForm, { phone: { personal: 'alter' } }));

  await sleep(30);

  formValidator.validate(() =>
    atFormLevel(validateForm, { phone: { personal: 'altern8' } }));

  await sleep(30);

  formValidator.validate(() =>
    atFormLevel(validateForm, { phone: { personal: 'altern8 express2' } }));
})();
