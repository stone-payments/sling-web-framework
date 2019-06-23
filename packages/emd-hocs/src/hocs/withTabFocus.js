export const withTabFocus = (Base = class {}) => class extends Base {
  constructor () {
    super();
    this._setTabFocus = this._setTabFocus.bind(this);
    this._setTabPressed = this._setTabPressed.bind(this);
    this._unsetTabFocus = this._unsetTabFocus.bind(this);
  }

  connectedCallback () {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    this.addEventListener('keyup', this._setTabPressed);
    this.addEventListener('focus', this._setTabFocus);
    this.addEventListener('blur', this._unsetTabFocus);
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }

    this.removeEventListener('keyup', this._setTabPressed);
    this.removeEventListener('focus', this._setTabFocus);
    this.removeEventListener('blur', this._unsetTabFocus);
  }

  _setTabPressed () {
    if (this._gotFocused) {
      this.setAttribute('tab-focus', '');
    }
  }

  _setTabFocus () {
    this._gotFocused = true;
  }

  _unsetTabFocus () {
    this._gotFocused = false;
    this.removeAttribute('tab-focus');
  }
};
