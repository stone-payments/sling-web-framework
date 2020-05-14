export const PinCodeController = (Base = class {}) =>
  class extends Base {
    static get properties () {
      return {
        view: {
          type: String,
          reflect: true
        }
      };
    }

    render () {
      return this.currentView.use(this);
    }
  };
