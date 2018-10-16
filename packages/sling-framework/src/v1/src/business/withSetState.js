import { isFunction } from 'sling-helpers';

export const withSetState = (Base = class {}) => class extends Base {
  setState(arg) {
    this.state = {
      ...(this.state || {}),
      ...(isFunction(arg) ? arg(this.state) : arg),
    };
  }
};
