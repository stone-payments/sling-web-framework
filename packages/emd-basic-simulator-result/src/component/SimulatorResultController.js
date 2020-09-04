export const SimulatorResultController = (Base = class {}) =>
  class extends Base {
    static get properties () {
      return {
        charged: {
          type: Number,
          reflect: true
        },
        received: {
          type: Number,
          reflect: true
        },
        currency: {
          type: String,
          reflect: true
        },
        date: {
          type: String,
          reflect: true
        }
      };
    }

    render () {
      return this.currentView.use(this);
    }
  };
