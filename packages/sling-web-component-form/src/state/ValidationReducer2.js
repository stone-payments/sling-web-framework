import { setIn } from '../helpers/immutableHelper.js';

const isFunction = arg => typeof arg === 'function';
const isPromise = arg => arg && arg.then && isFunction(arg.then);
const isFalse = val => val === false;

const GENERAL = '__GENERAL__';

const formValidator = {
  pending: {},
  isExecuting: {},
  get isValidating() {
    return !Object.values(this.isExecuting).every(isFalse);
  },
  validate(validatorFn, value, path = GENERAL) {
    this.queue(validatorFn, value, path);
    this.executeNext(path);
  },
  queue(validatorFn, value, path) {
    this.pending[path] = this.pending[path] || [];
    this.pending[path].push(() => validatorFn(value));
  },
  async executeNext(path) {
    if (!this.isExecuting[path]) {
      if (this.pending[path].length > 0) {
        this.isExecuting[path] = true;
        const nextValidatorFn = this.pending[path].pop();
        this.pending[path] = [];
        await nextValidatorFn();
        this.isExecuting[path] = false;
        this.executeNext(path);
      } else {
        console.log([path, 'validations finished']);

        if (!this.isValidating) {
          console.log('stopped validation');
        }
      }
    }
  },
};

const treatError = error =>
  (error.constructor === Error ? error.message : error);

const validateWithErrorWrapper = wrapperFn => (validatorFn, value, path) => {
  if (validatorFn == null) return {};

  const maybeError = validatorFn(value);

  return (isPromise(maybeError))
    ? maybeError.catch(treatError).then(wrapperFn(path))
    : wrapperFn(path)(maybeError);
};

const validateAtFieldLevel = (...args) => {
  const wrapperFn = path => errorStr => setIn({}, path, errorStr || null);
  return validateWithErrorWrapper(wrapperFn)(...args);
};

const validateAtFormLevel = (...args) => {
  const wrapperFn = () => errorObj => errorObj || {};
  return validateWithErrorWrapper(wrapperFn)(...args);
};

// TESTS

const firstValidator = value => new Promise((resolve) => {
  setTimeout(() => { console.log(`faster ${value}`); resolve(); }, 1000);
});

const secondValidator = value => new Promise((resolve) => {
  setTimeout(() => { console.log(`longer ${value}`); resolve(); }, 2000);
});

const thirdValidator = (value) => {
  console.log(`immediate ${value}`);
};

formValidator.validate(firstValidator, '1admin', 'name');
formValidator.validate(secondValidator, '1zadmin', 'name');
formValidator.validate(firstValidator, '1admin', 'name');
formValidator.validate(thirdValidator, '2zadmin', 'email');
formValidator.validate(secondValidator, '2admin', 'email');
formValidator.validate(firstValidator, '2zadmin', 'email');
formValidator.validate(secondValidator, '3admin', 'email');
formValidator.validate(firstValidator, '3zadmin', 'email');
formValidator.validate(secondValidator, '4admin', 'name');
formValidator.validate(thirdValidator, '4zadmin', 'name');
