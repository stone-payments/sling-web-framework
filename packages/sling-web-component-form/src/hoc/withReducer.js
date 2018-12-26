import { isFunction, isPromise } from 'sling-helpers';

export const withReducer = reducer => Base => class extends Base {
  constructor() {
    super();
    this.reducer = reducer;
    this.state = this.reducer();
  }

  dispatchAction(action) {
    let resolvedAction = action;
    const getState = () => this.state;

    if (isFunction(resolvedAction)) {
      resolvedAction = action(this.dispatchAction.bind(this), getState);
    }

    if (isPromise(resolvedAction)) {
      resolvedAction.then((asyncAction) => {
        this.state = this.reducer(this.state, asyncAction);
      });
    }

    this.state = this.reducer(this.state, resolvedAction);
  }
};
