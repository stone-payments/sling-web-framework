export const ButtonController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.type = 'button';
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

    render () {
      return this.currentView.apply(this);
    }
  };
