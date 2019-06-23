import { delay, isFunction } from '@stone-payments/emd-helpers';
import { withEventDispatch } from './withEventDispatch.js';

export const withIO = (Base = class {}) =>
  class extends withEventDispatch(Base) {
    constructor () {
      super();

      ['input', 'source', 'output'].forEach(propName => {
        Object.defineProperty(this, propName, {
          get () {
            return this[`_${propName}`];
          },
          async set (value) {
            const pastValue = this[propName];
            this[`_${propName}`] = value;

            // LitElement compatibility
            if (isFunction(this.requestUpdate)) {
              this.requestUpdate(propName, pastValue);
            }

            const callbackName = `${propName}ChangedCallback`;

            if (isFunction(this[callbackName])) {
              this[callbackName](pastValue, value);
            }

            // Guarantees a single dispatch even if
            // multiple changes are made at the same time
            await delay();

            if (this[`_${propName}`] === value) {
              this.dispatchEventAndMethod(`${propName}change`, value);
            }
          }
        });
      });
    }
  };
