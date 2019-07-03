export const MoneyPromoController = (Base = class {}) =>
  class extends Base {
    static get properties () {
      return {
        value: {
          value: String,
          reflect: true
        },
        period: {
          value: String,
          reflect: true
        }
      };
    }

    get valueInteger () {
      return this.value.split('.')[0];
    }

    get valueCents () {
      return this.value.split('.')[1];
    }

    render () {
      return this.currentView.apply(this);
    }
  };
