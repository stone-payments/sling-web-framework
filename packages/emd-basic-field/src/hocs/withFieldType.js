import { isFunction, delay } from '@stone-payments/emd-helpers';

const noop = () => undefined;

export const withFieldType = (type, validateFn, maskFn) =>
  (Base = class {}) => class extends Base {
    async attributeChangedCallback (attrName, pastValue, nextValue) {
      if (super.attributeChangedCallback) {
        super.attributeChangedCallback(attrName, pastValue, nextValue);
      }

      if (attrName === 'type' && nextValue === type) {
        if (!this.field) {
          await delay(50);
        }

        this.defaultValidation = (isFunction(validateFn))
          ? validateFn
          : noop;

        if (isFunction(maskFn)) {
          this.mask = maskFn(this.field);
        }
      }
    }
  };
