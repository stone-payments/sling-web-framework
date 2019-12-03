import { toString } from '@stone-payments/emd-helpers';

export const PillSelectController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.handleClick = this.handleClick.bind(this);
    }

    static get properties () {
      return {
        value: {
          type: String,
          reflect: true
        },
        options: {
          type: Object,
          reflect: false
        },
        fixed: {
          type: Boolean,
          reflect: true
        }
      };
    }

    get value () {
      return this._value;
    }

    set value (value) {
      const pastValue = this.value;
      this._value = this._validateValue(value);

      if (pastValue !== this._value) {
        this.dispatchEventAndMethod('update', this._value);
        this._handleFieldValidation(this._value);
      }

      this.requestUpdate('value', pastValue);
    }

    get parsedOptions () {
      return (this.options || [])
        .map(item => {
          const value = toString(item.value || item);
          const content = toString(item.content || item);
          return { value, content };
        });
    }

    get selectedValue () {
      const selectedOption = this.parsedOptions
        .find(item => item.value === this.value) || {};

      return selectedOption.value;
    }

    _validateValue (value) {
      return this.parsedOptions.some(item => item.value === value)
        ? value
        : undefined;
    }

    handleClick (value) {
      return () => {
        this.value = value;
      };
    }

    render () {
      return this.currentView.use(this);
    }
  };
