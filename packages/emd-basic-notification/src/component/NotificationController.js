export const NotificationController = (Base = class {}) =>
  class extends Base {
    static get properties () {
      return {
        view: {
          type: String,
          reflect: true
        },
        text: {
          type: String,
          reflect: false
        },
        icon: {
          type: String,
          reflect: false
        },
        iconStyle: {
          type: String,
          reflect: false
        },
        borderColor: {
          type: String,
          reflect: false
        },
        backgroundColor: {
          type: String,
          reflect: false
        }
      };
    }

    render () {
      return this.currentView.use(this);
    }
  };
