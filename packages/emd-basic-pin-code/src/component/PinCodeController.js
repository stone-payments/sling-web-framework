export const PinCodeController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.handleInput = this.handleInput.bind(this);
    }

    static get properties () {
      return {
        cases: {
          type: Number,
          reflect: true
        },
        type: {
          type: String,
          reflect: true
        }
      };
    }

    attributeChangedCallback (attrName, prevValue, nextValue) {
      super.attributeChangedCallback(attrName, prevValue, nextValue);

      if (attrName === 'cases') {
        const numericNextValue = Number(nextValue);

        if (Number.isNaN(numericNextValue) || numericNextValue < 1) {
          this.setAttribute('cases', 1);
        } else if (numericNextValue !== Math.round(numericNextValue)) {
          this.setAttribute('cases', Math.round(numericNextValue));
        }
      }
    }

    get casesArray () {
      return Array.from(Array(this.cases).keys());
    }

    get prevToFocus () {
      const { activeElement } = this.renderRoot;
      return activeElement.previousElementSibling || activeElement;
    }

    get nextToFocus () {
      const { activeElement } = this.renderRoot;
      return activeElement.nextElementSibling || activeElement;
    }

    handleInput ({ target }) {
      target.value = target.value.slice(-1);

      if (target.value === '') {
        this.prevToFocus.focus();
      } else {
        this.nextToFocus.focus();
      }
    }

    render () {
      return this.currentView.use(this);
    }
  };
