import { toString } from '@stone-payments/emd-helpers';

export const PillSelectController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.handleClick = this.handleClick.bind(this);
    }

    static get properties () {
      return {
        view: {
          type: String,
          reflect: true
        },
        value: {
          type: String,
          reflect: true
        },
        options: {
          type: Object,
          reflect: false
        },
        autoselectsingle: {
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
      const pastSelectedValue = this.selectedValue;
      this._value = value;

      Promise.resolve().then(() => {
        const nextSelectedValue = this.selectedValue;
        if (pastSelectedValue !== nextSelectedValue) {
          this.dispatchEventAndMethod('update', nextSelectedValue);
        }
      });

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
      return this.parsedOptions
        .find(item => item.value === this.value)
        .value;
    }

    handleClick (value) {
      return () => {
        this.value = value;
      };
    }

    render () {
      console.log('HERE', this.currentView);
      return this.currentView.use(this);
    }
  };
