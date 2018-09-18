import { globalHelper } from 'sling-helpers';

export const withEventDispatch = (Base = HTMLElement) =>
  class extends Base {
    constructor() {
      super();

      this.bubbleEvent = this.bubbleEvent.bind(this);
    }

    dispatchEventAndMethod(evtName, detail) {
      const event = new CustomEvent(evtName, {
        bubbles: true,
        detail,
      });

      const method = this[`on${evtName}`];

      this.dispatchEvent(event);

      if (globalHelper.isFunction(method)) {
        method(event);
      }
    }

    bubbleEvent(evt) {
      this.dispatchEvent(evt);
    }
  };
