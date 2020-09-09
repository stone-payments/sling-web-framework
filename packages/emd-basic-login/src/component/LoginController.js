import { isValidEmail } from '@stone-payments/emd-helpers';

export const LoginController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.step = 1;

      this.setStep = this.setStep.bind(this);
      this.handleForgotEmail = this.handleForgotEmail.bind(this);
      this.handleForgotPassword = this.handleForgotPassword.bind(this);
      this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this);
      this.handleSubmitError = this.handleSubmitError.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    }

    static get properties () {
      return {
        email: {
          type: String,
          reflect: true
        },
        step: {
          type: Number,
          reflect: true
        },
        loading: {
          type: Boolean,
          reflect: true
        }
      };
    }

    get maxSteps () {
      return Array
        .from(this.renderRoot.querySelectorAll('.emd-login__slide'))
        .length;
    }

    get emailForm () {
      return this.renderRoot.querySelector('.emd-login__form_email');
    }

    get currentForm () {
      return this.renderRoot
        .querySelector('.emd-login__slide_current emd-form');
    }

    get currentField () {
      return this.renderRoot
        .querySelector('.emd-login__slide_current emd-field');
    }

    attributeChangedCallback (attrName, pastValue, nextValue) {
      if (super.attributeChangedCallback) {
        super.attributeChangedCallback(attrName, pastValue, nextValue);
      }

      if (pastValue !== nextValue) {
        if (attrName === 'email') {
          this._updateEmail();
        }

        if (attrName === 'email' || attrName === 'step') {
          this._validateStep();
        }
      }
    }

    async _updateEmail () {
      if (!this.emailForm) {
        await this.updateComplete;
      }

      this.emailForm.setValues({
        email: this.email
      });
    }

    async _validateStep () {
      if (!this.email || !this.emailForm) {
        await this.updateComplete;
      }

      if (this.step < 1) {
        this.step = 1;
        return undefined;
      }

      if (this.step > this.maxSteps) {
        this.step = this.maxSteps;
        return undefined;
      }

      if (!isValidEmail(this.email) && this.step === 2) {
        this.step = 1;
        this.emailForm.submitForm();
      }
    }

    setStep (step) {
      return () => {
        this.step = step;
      };
    }

    quit () {
      Promise.resolve().then(() => {
        this.currentForm.finishSubmission();
        this.loading = false;
      });
    }

    async nextStep () {
      await this.quit();
      this.step += 1;
    }

    handleForgotEmail () {
      this.dispatchEventAndMethod('forgotemail');
    }

    handleForgotPassword () {
      this.dispatchEventAndMethod('forgotpassword');
    }

    handleSubmitSuccess ({ detail }) {
      const [propName] = Object.keys(detail);

      const nextDetail = (propName === 'email')
        ? { ...detail }
        : { email: this.email, ...detail };

      this.dispatchEventAndMethod(`${propName}submitsuccess`, nextDetail);
      this.loading = true;

      if (propName === 'email') {
        this.email = detail.email;
      }
    }

    handleSubmitError ({ target }) {
      target.finishSubmission();
    }

    handleKeyPress ({ keyCode, which }) {
      const ENTER = 13;
      const key = keyCode || which;

      if (key === ENTER) {
        this.currentForm.submitForm();
      }
    }

    handleTransitionEnd () {
      this.currentField.focus();
    }

    render () {
      return this.currentView.use(this);
    }
  };
