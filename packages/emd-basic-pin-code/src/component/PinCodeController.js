export const PinCodeController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.handleInput = this.handleInput.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
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

    handleKeyDown (evt) {
      const { target, code } = evt;

      if (code.toUpperCase() === 'BACKSPACE') {
        evt.preventDefault();
        target.value = '';
        if (target.previousElementSibling) {
          target.previousElementSibling.focus();
          target.previousElementSibling.select();
        }
      }
    }

    handleInput ({ target }) {
      target.value = target.value.slice(-1);

      if (target.value !== '' && target.nextElementSibling) {
        target.nextElementSibling.focus();
        target.nextElementSibling.select();
      }
    }

    render () {
      return this.currentView.use(this);
    }
  };
