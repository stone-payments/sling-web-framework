import { isFunction } from '@stone-payments/emd-helpers';

export const withEventDispatch = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.bubbleEvent = this.bubbleEvent.bind(this);
    }

    dispatchEventAndMethod (evtName, detail, target = this) {
      const event = new CustomEvent(evtName, {
        bubbles: true,
        detail
      });

      target.dispatchEvent(event);

      const method = target[`on${evtName}`];

      if (isFunction(method)) {
        method(event);
      }
    }

    bubbleEvent (evt) {
      this.dispatchEvent(evt);
    }
  };
