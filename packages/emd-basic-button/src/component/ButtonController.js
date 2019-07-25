export const ButtonController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.type = 'button';
      this.handleClick = this.handleClick.bind(this);
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
      this.addEventListener('click', this.handleClick);
    }

    disconnectedCallback () {
      super.disconnectedCallback();
      this.removeEventListener('click', this.handleClick);
    }

    handleClick (evt) {
      if (this.disabled || this.loading) {
        evt.stopPropagation();
      }
    }

    render () {
      return this.currentView.apply(this);
    }
  };
