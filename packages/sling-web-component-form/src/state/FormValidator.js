import { isFunction, mergeDeep, isDeeplyEmpty } from 'sling-helpers';

const FORM_LEVEL = '__FORM_LEVEL__';

export class FormValidator {
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
    return mergeDeep(this.formLevelErrors, this.fieldLevelErrors);
  }

  validate(validatorThunk, path = FORM_LEVEL) {
    if (isFunction(this.onValidationStart)) {
      this.onValidationStart({
        errors: this.errors,
        isValidating: this.isValidating,
        isValid: this.isValid,
      });
    }

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
        const nextLevelErrors = await nextValidatorThunk();
        this.isValidatingLevel[path] = false;
        this.executeNext(path, nextLevelErrors);
      } else {
        if (path === FORM_LEVEL) {
          this.formLevelErrors = levelErrors;
        } else {
          this.fieldLevelErrors = mergeDeep(this.fieldLevelErrors, levelErrors);
        }

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
