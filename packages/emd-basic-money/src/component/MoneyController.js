import {
  currencyFormatter,
  moneyFormatter
} from '@stone-payments/emd-formatters';

export const MoneyController = (Base = class {}) => class extends Base {
  static get properties () {
    return {
      currency: {
        type: String,
        reflect: true
      },
      value: {
        type: Number,
        reflect: true
      },
      hidevalue: {
        type: Boolean,
        reflect: true
      },
      hidepositivesign: {
        type: Boolean,
        reflect: true
      }
    };
  }

  get sign () {
    if (this.value > 0) {
      return '+';
    }

    return this.value < 0 ? '-' : undefined;
  }

  get isPositive () {
    return this.value > 0;
  }

  get isNeutral () {
    return this.value === 0;
  }

  get isNegative () {
    return this.value < 0;
  }

  get formattedCurrency () {
    return this.currency
      ? currencyFormatter(this.currency)
      : undefined;
  }

  get formattedValue () {
    return moneyFormatter(Math.abs(this.value));
  }

  render () {
    return this.currentView.use(this);
  }
};
