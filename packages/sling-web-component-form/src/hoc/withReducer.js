import { isFunction, isPromise } from 'sling-helpers';

export const withReducer = reducer => (Base = class {}) =>
  class extends (Base) {
    constructor() {
      super();
      this.state = reducer();
    }

    dispatchAction(action) {
      let resolvedAction = action;
      const getState = () => this.state;

      if (isFunction(resolvedAction)) {
        resolvedAction = action(this.dispatchAction.bind(this), getState);
      }

      if (isPromise(resolvedAction)) {
        resolvedAction.then((asyncAction) => {
          this.state = reducer(this.state, asyncAction);
        });
      }

      this.state = reducer(this.state, resolvedAction);
    }
  };
