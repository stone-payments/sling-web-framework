export const MoneyCardController = (Base = class {}) => class extends Base {
  static get properties () {
    return {
      headline: {
        type: String,
        reflect: true
      },
      currency: {
        type: String,
        reflect: true
      },
      value: {
        type: Number,
        reflect: true
      },
      colorblock: {
        type: Boolean,
        reflect: true
      },
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
