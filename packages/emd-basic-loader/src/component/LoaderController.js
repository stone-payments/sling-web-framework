export const LoaderController = (Base = class {}) => class extends Base {
  static get properties () {
    return {
      loading: {
        type: Boolean,
        reflect: true
      }
    };
  }

  render () {
    return this.currentView.apply(this);
  }
};
