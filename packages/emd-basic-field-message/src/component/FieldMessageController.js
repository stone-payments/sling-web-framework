export const FieldMessageController = (Base = class {}) => class extends Base {
  static get properties () {
    return {
      message: {
        type: String,
        reflect: true
      },
      name: {
        type: String,
        reflect: true
      }
    };
  }

  render () {
    return this.currentView.use(this);
  }
};
