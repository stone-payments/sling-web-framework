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
        },
        value: {
          type: String,
          reflect: false
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

    get inputElements () {
      return Array.from(this.renderRoot.querySelectorAll('input'));
    }

    get value () {
      return this.inputElements
        .map(({ value }) => value)
        .join('');
    }

    set value (value) {
      const pastValue = this.value;

      String(value).split('').forEach((char, index) => {
        if (this.inputElements[index]) {
          this.inputElements[index].value = char;
        }
      });

      this.requestUpdate('value', pastValue);
    }

    handleKeyDown (evt) {
      const { target, code, ctrlKey, metaKey } = evt;

      if (code === 'Space') {
        evt.preventDefault();
      } else if (code === 'Backspace') {
        evt.preventDefault();
        target.value = '';
        if (target.previousElementSibling) {
          target.previousElementSibling.focus();
          target.previousElementSibling.select();
        }
      } else if (target.type === 'number' &&
        code.startsWith('Key') && !(ctrlKey || metaKey)) {
        evt.preventDefault();
      }
    }

    handleInput ({ target, data }) {
      target.value = data;

      if (target.value !== '' && target.nextElementSibling) {
        target.nextElementSibling.focus();
        target.nextElementSibling.select();
      }
    }

    render () {
      return this.currentView.use(this);
    }
  };
