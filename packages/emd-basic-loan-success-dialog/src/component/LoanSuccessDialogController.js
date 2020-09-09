export const LoanSuccessDialogController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();

      this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    static get properties () {
      return {
        amount: {
          type: String,
          reflect: true
        },
        deadline: {
          type: String,
          reflect: true
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
