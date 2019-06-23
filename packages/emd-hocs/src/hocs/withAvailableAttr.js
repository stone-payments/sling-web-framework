import { withEventDispatch } from './withEventDispatch.js';

export const withAvailableAttr = (Base = class {}) =>
  class extends withEventDispatch(Base) {
    connectedCallback () {
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      this.setAttribute('available', '');
      this.dispatchEventAndMethod('available');
    }

    disconnectedCallback () {
      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }

      this.removeAttribute('available');
    }
  };
