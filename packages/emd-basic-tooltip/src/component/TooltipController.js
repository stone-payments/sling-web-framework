export const TooltipController = (Base = class {}) =>
  class extends Base {
    static get properties () {
      return {
        view: {
          type: String,
          reflect: true
        },
        position: {
          type: String,
          reflect: true
        },
        text: {
          type: String,
          reflect: true
        }
      };
    }

    render () {
      return this.currentView.use(this);
    }
  };
