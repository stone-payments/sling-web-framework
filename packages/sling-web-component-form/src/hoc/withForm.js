import { isFunction, isPromise } from 'sling-helpers';

import {
  formReducer,
  validateField,
  updateFieldValue,
  setValues,
} from '../state/formReducer.js';

export const withForm = Base => class extends Base {
  constructor() {
    super();
    this.reducer = formReducer;
    this.state = this.reducer();

    this.dispatchAction = this.dispatchAction.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  static get properties() {
    return {
      state: {
        type: Object,
        reflectToAttribute: false,
      },
    };
  }

  get values() {
    return this.state.values;
  }

  set values(nextValues) {
    this.dispatchAction(setValues(nextValues));
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

  handleInput({ target }) {
    this.dispatchAction(updateFieldValue(target.name, target.value));

    this.dispatchAction(validateField(
      target.name,
      target.validation,
      target.value,
    ));
  }
};
