import { globalHelper } from 'sling-helpers';

export class SdkConnect extends HTMLElement {
  static isValidStore(store) {
    return store && [store.dispatch, store.subscribe, store.getState]
      .every(globalHelper.isFunction);
  }

  get store() {
    return this._store;
  }

  set store(value) {
    if (SdkConnect.isValidStore(value)) {
      this._store = value;
      const event = new CustomEvent('storecreated');
      document.dispatchEvent(event);
    }
  }

  get state() {
    return this._store.getState();
  }

  get dispatch() {
    return this._store.dispatch;
  }

  get subscribe() {
    return this._store.subscribe;
  }
}
