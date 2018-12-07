import { isFunction, setIn, mergeDeep, isDeeplyEmpty } from 'sling-helpers';

const FORM = '__FORM__';

const INITIAL_STATE = {
  pending: [],
  isValidating: false,
  error: null,
};

export class FormValidator {
  constructor() {
    this.state = {};
  }

  get errors() {
    const fieldErrors = Object
      .entries(this.state)
      .filter(([fieldId]) => fieldId !== FORM)
      .reduce((result, [fieldId, { error }]) =>
        setIn(result, fieldId, error), {});

    const formErrors = this.state[FORM]
      ? this.state[FORM].error || {}
      : {};

    return mergeDeep(formErrors, fieldErrors);
  }

  get isValidating() {
    return Object.values(this.state)
      .some(({ isValidating }) => isValidating === true);
  }

  get isValid() {
    return isDeeplyEmpty(this.errors);
  }

  addFieldId(fieldId) {
    this.state[fieldId] = this.state[fieldId] || { ...INITIAL_STATE };
  }

  removeFieldId(fieldId) {
    delete this.state[fieldId];
  }

  validate(validatorThunk, fieldId = FORM) {
    if (isFunction(this.onValidationStart)) {
      this.onValidationStart({
        errors: this.errors,
        isValidating: this.isValidating,
        isValid: this.isValid,
      });
    }

    this.queue(validatorThunk, fieldId);
    this.executeNext(fieldId);
  }

  queue(validatorThunk, fieldId) {
    this.addFieldId(fieldId);
    this.state[fieldId].pending.push(validatorThunk);
  }

  async executeNext(fieldId, error = {}) {
    if (!this.state[fieldId].isValidating) {
      if (this.state[fieldId].pending.length > 0) {
        this.state[fieldId].isValidating = true;

        const nextValidator = this.state[fieldId].pending.pop();
        this.state[fieldId].pending = [];

        const nextError = await nextValidator();

        this.state[fieldId].isValidating = false;

        this.executeNext(fieldId, nextError);
      } else {
        this.state[fieldId].error = error;

        if (isFunction(this.onValidationComplete)) {
          this.onValidationComplete({
            errors: this.errors,
            isValidating: this.isValidating,
            isValid: this.isValid,
          });
        }
      }
    }
  }
}
