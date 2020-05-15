export const PinCodeController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.handleInput = this.handleInput.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleFocus = this.handleFocus.bind(this);
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
        forceuppercase: {
          type: Boolean,
          reflect: true
        }
      };
    }

    async connectedCallback () {
      super.connectedCallback();
      await this.updateComplete;
      this.value = this.getAttribute('value') || '';
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

    get restrictions () {
      return (this.type === 'number')
        ? new RegExp('[ˆ0-9]', 'g')
        : new RegExp('[^a-zA-Z0-9]', 'g');
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
      const nextValue = this.applyRestrictions(value);

      this.casesArray.forEach(index => {
        if (this.inputElements[index]) {
          this.inputElements[index].value = nextValue[index] || '';
        }
      });
    }

    applyRestrictions (value) {
      const definedValue = value == null ? '' : value;
      const parsedValue = String(definedValue).replace(this.restrictions, '');

      return this.forceuppercase
        ? parsedValue.toUpperCase()
        : parsedValue;
    }

    handleKeyDown (evt) {
      const { target, code } = evt;

      if (code === 'Backspace') {
        evt.preventDefault();
        target.value = '';
        if (target.previousElementSibling) {
          target.previousElementSibling.focus();
          target.previousElementSibling.select();
        }
      }
    }

    handleInput ({ target, data }) {
      target.value = this.applyRestrictions(data);

      if (target.value !== '' && target.nextElementSibling) {
        target.nextElementSibling.focus();
        target.nextElementSibling.select();
      }
    }

    handleFocus ({ target }) {
      if (target.value === '') {
        this.inputElements[this.value.length].focus();
      }
    }

    render () {
      return this.currentView.use(this);
    }
  };
