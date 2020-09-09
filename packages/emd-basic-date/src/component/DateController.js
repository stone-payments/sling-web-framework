import { dateTimeFormatter } from '@stone-payments/emd-formatters';

export const DateController = (Base = class {}) => class extends Base {
  constructor () {
    super();
    this.format = 'DD/MM/YYYY';
  }

  static dateTimeFormatter (...args) {
    return dateTimeFormatter(...args);
  }

  static get properties () {
    return {
      format: {
        type: String,
        reflect: true
      },
      date: {
        type: String,
        reflect: true
      }
    };
  }

  get formattedDate () {
    return this.constructor.dateTimeFormatter(this.date, this.format);
  }

  render () {
    return this.currentView.use(this);
  }
};
