export const FeatureController = (Base = class {}) =>
  class extends Base {
    static get properties () {
      return {
        headline: {
          type: String,
          reflect: true
        }
      };
    }

    render () {
      return this.currentView.use(this);
    }
  };
