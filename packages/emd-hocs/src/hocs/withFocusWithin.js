export const withFocusWithin = (Base = class {}) => class extends Base {
  constructor () {
    super();
    this._setFocusWithin = this._setFocusWithin.bind(this);
    this._unsetFocusWithin = this._unsetFocusWithin.bind(this);
  }

  connectedCallback () {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    this.addEventListener('focus', this._setFocusWithin);
    this.addEventListener('blur', this._unsetFocusWithin);
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }

    this.removeEventListener('focus', this._setFocusWithin);
    this.removeEventListener('blur', this._unsetFocusWithin);
  }

  _setFocusWithin () {
    this.setAttribute('focus-within', '');
  }

  _unsetFocusWithin () {
    this.removeAttribute('focus-within');
  }
};
