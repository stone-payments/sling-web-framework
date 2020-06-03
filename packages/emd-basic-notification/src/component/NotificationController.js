export const NotificationController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.handleButtonClick = this.handleButtonClick.bind(this);
    }

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
        },
        buttonText: {
          type: String,
          reflect: false
        },
        buttonStyle: {
          type: String,
          reflect: false
        }
      };
    }

    handleButtonClick () {
      this.dispatchEventAndMethod('buttonclicked');
    }

    render () {
      return this.currentView.use(this);
    }
  };
