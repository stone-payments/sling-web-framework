export const PinCodeController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();

      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleInput = this.handleInput.bind(this);
      this.handleFocus = this.handleFocus.bind(this);
      this.handlePaste = this.handlePaste.bind(this);
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
          this.cases = 1;
        } else if (numericNextValue !== Math.round(numericNextValue)) {
          this.cases = Math.round(numericNextValue);
        }
      } else if (attrName === 'forceuppercase') {
        this.value = this.applyRestrictions(this.value);
      }
    }

    get casesArray () {
      return Array.from(Array(this.cases).keys());
    }

    get restrictions () {
      return (this.type === 'number')
        ? new RegExp('[^0-9]', 'g')
        : new RegExp('[^a-zA-Z0-9]', 'g');
    }

    get caseElements () {
      return Array.from(this.renderRoot.querySelectorAll('input'));
    }

    get firstEmptyCase () {
      return this.caseElements.find(inputEl => inputEl.value === '');
    }

    get lastCase () {
      return this.caseElements[this.caseElements.length - 1];
    }

    get isComplete () {
      return this.value.length === this.cases;
    }

    get value () {
      return this.caseElements
        .map(({ value }) => value)
        .join('');
    }

    set value (value) {
      const nextValue = this.applyRestrictions(value);

      this.casesArray.forEach(index => {
        if (this.caseElements[index]) {
          this.caseElements[index].value = nextValue[index] || '';
        }
      });

      if (this.isComplete) {
        this.dispatchEventAndMethod('complete', this.value);
      }
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
        }
      }
    }

    handleInput ({ target, data }) {
      target.value = this.applyRestrictions(data);

      if (target.value !== '' && target.nextElementSibling) {
        target.nextElementSibling.focus();
      }

      if (this.isComplete) {
        this.blur();
        this.dispatchEventAndMethod('complete', this.value);
      }
    }

    handleFocus ({ target }) {
      if (target.value === '') {
        this.focusFirstEmptyCase();
      }
    }

    handlePaste (evt) {
      evt.preventDefault();

      const { target } = evt;
      const index = this.caseElements.indexOf(target);
      const pastedText = evt.clipboardData.getData('text');

      const nextValue = this.casesArray
        .map(idx => pastedText[idx - index] || this.value[idx] || '')
        .join();

      this.value = nextValue;

      if (this.isComplete) {
        this.blur();
      } else {
        this.focusFirstEmptyCase();
      }
    }

    async focusFirstEmptyCase () {
      await this.updateComplete;
      if (this.firstEmptyCase) {
        this.firstEmptyCase.focus();
      }
    }

    async focus () {
      await this.updateComplete;

      if (this.firstEmptyCase) {
        this.firstEmptyCase.focus();
      } else {
        this.lastCase.focus();
      }
    }

    async blur () {
      await this.updateComplete;
      this.caseElements.forEach(inputEl => {
        inputEl.blur();
      });
    }

    render () {
      return this.currentView.use(this);
    }
  };
