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
        },
        multipleclicks: {
          type: Boolean,
          reflect: true
        }
      };
    }

    handleClick (evt) {
      const clickCount = evt.detail || 1;

      if (this.disabled || this.loading ||
        (!this.multipleclicks && clickCount > 1)) {
        evt.stopPropagation();
      }
    }

    render () {
      return this.currentView.apply(this);
    }
  };
