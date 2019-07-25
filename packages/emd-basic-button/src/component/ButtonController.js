export const ButtonController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.type = 'button';
      this._handleClick = this._handleClick.bind(this);
    }

    static get properties () {
      return {
        type: {
          type: String,
          reflect: true
        },
        disabled: {
          type: Boolean,
          reflect: true
        },
        loading: {
          type: Boolean,
          reflect: true
        },
        href: {
          type: String,
          reflect: true
        },
        target: {
          type: String,
          reflect: true
        }
      };
    }

    connectedCallback () {
      super.connectedCallback();
      this.addEventListener('click', this._handleClick);
    }

    disconnectedCallback () {
      super.disconnectedCallback();
      this.removeEventListener('click', this._handleClick);
    }

    _handleClick (evt) {
      if (this.disabled || this.loading) {
        evt.stopPropagation();
      }
    }

    render () {
      return this.currentView.apply(this);
    }
  };
