import { withEventDispatch } from 'sling-framework';
import { isFunction } from 'sling-helpers';
import { setIn, mergeDeep, isDeeplyEmpty } from '../helpers/immutableHelper.js';

export class Form extends withEventDispatch(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        @import url('sling-web-component-form/src/index.css');
      </style>
      <slot></slot>
    `;

    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateTouched = this.updateTouched.bind(this);

    this.state = {
      errors: {},
      values: {},
      touched: {},
      dirty: false,
      isValid: false,
      isSubmitting: false,
      isValidating: false,
      submitCount: 0,
      validateForm: this.validateForm.bind(this),
      validateField: this.validateField.bind(this),
      submitForm: this.submitForm.bind(this),
      finishSubmission: this.finishSubmission.bind(this),
    };
  }

  connectedCallback() {
    if (isFunction(super.connectedCallback)) {
      super.connectedCallback();
    }

    this.addEventListener('click', this.handleClick);
    this.addEventListener('input', this.handleInput);
    this.addEventListener('blur', this.handleBlur, true);

    this.initForm();
  }

  disconnectedCallback() {
    if (isFunction(super.disconnectedCallback)) {
      super.disconnectedCallback();
    }

    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('input', this.handleInput);
    this.removeEventListener('blur', this.handleBlur, true);
  }

  async initForm() {
    const allFieldsHaveNameOrId = this.fields
      .every(this.constructor.getFieldId);

    if (!allFieldsHaveNameOrId) {
      throw new Error('All fields must have "name" or "id".');
    }

    const fieldValues = this.fields.reduce((result, field) => {
      const fieldId = this.constructor.getFieldId(field);
      return setIn(result, fieldId, field.value || '');
    }, {});

    const userValues = this.initialvalues;
    this.state.values = mergeDeep(fieldValues, userValues);

    await Promise.resolve(); /* avoids LitElement warning */
    this.dispatchFormUpdate();
  }

  static isFormField(target) {
    return ['SLING-INPUT', 'SLING-SELECT', 'INPUT', 'SELECT', 'TEXTAREA']
      .includes(target.nodeName);
  }

  static getFieldId(field) {
    return field.getAttribute('name') ||
      field.name ||
      field.getAttribute('id') ||
      field.id;
  }

  static async getFieldError(field) {
    if (isFunction(field.validation)) {
      let error;
      const fieldId = this.getFieldId(field);

      try {
        error = await Promise.resolve(field.validation(field.value));
      } catch (err) {
        error = (err.constructor === Error) ? err.message : err;
      }

      return setIn({}, fieldId, error);
    }

    return {};
  }

  get fields() {
    return Array
      .from(this.querySelectorAll('*'))
      .filter(this.constructor.isFormField);
  }

  get values() {
    return this.state.values;
  }

  set values(values) {
    this.state = setIn(this.state, 'values', values);
    this.dispatchFormUpdate();
  }

  get skipvalidationonchange() {
    return this.hasAttribute('skipvalidationonchange');
  }

  set skipvalidationonchange(value) {
    if (value != null && value !== false) {
      this.setAttribute('skipvalidationonchange', '');
    } else {
      this.removeAttribute('skipvalidationonchange');
    }
  }

  get skipvalidationonblur() {
    return this.hasAttribute('skipvalidationonblur');
  }

  set skipvalidationonblur(value) {
    if (value != null && value !== false) {
      this.setAttribute('skipvalidationonblur', '');
    } else {
      this.removeAttribute('skipvalidationonblur');
    }
  }

  dispatchFormUpdate() {
    this.dispatchEventAndMethod('formupdate', this.state);
  }

  dispatchFormSubmission() {
    this.dispatchEventAndMethod('formsubmit');
  }

  updateValue(field) {
    const fieldId = this.constructor.getFieldId(field);
    this.state = setIn(this.state, `values.${fieldId}`, field.value || '');
  }

  updateTouched(field) {
    const fieldId = this.constructor.getFieldId(field);
    this.state = setIn(this.state, `touched.${fieldId}`, true);
  }

  updateDirty(dirty) {
    this.state = setIn(this.state, 'dirty', dirty);
  }

  updateIsValid() {
    this.state = setIn(this.state, 'isValid',
      isDeeplyEmpty(this.state.errors) && this.state.dirty);
  }

  updateIsSubmitting(isSubmitting) {
    this.state = setIn(this.state, 'isSubmitting', isSubmitting);
  }

  updateIsValidating(isValidating) {
    this.state = setIn(this.state, 'isValidating', isValidating);
  }

  incrementSubmitCount() {
    this.state = setIn(this.state, 'submitCount', this.state.submitCount + 1);
  }

  async validateForm() {
    let formErrors = {};

    this.updateIsValidating(true);
    this.dispatchFormUpdate();

    if (isFunction(this.validation)) {
      try {
        formErrors = await Promise.resolve(this.validation(this.state.values));
      } catch (err) {
        formErrors = (err.constructor === Error) ? err.message : err;
      }
    }

    const fieldErrors = await Promise.all(this.fields
      .map(this.constructor.getFieldError.bind(this.constructor)));

    this.state = setIn(this.state, 'errors', {
      ...formErrors,
      ...fieldErrors.reduce((result, obj) => mergeDeep(result, obj), {}),
    });

    this.updateIsValid();
    this.updateIsValidating(false);
    this.dispatchFormUpdate();
  }

  async validateField(fieldId) {
    const field = this.fields
      .find(fi => this.constructor.getFieldId(fi) === fieldId);

    if (field) {
      this.updateIsValidating(true);
      this.dispatchFormUpdate();

      const error = await this.constructor.getFieldError(field);

      this.state = setIn(this.state, 'errors', {
        ...this.state.errors,
        ...error,
      });

      this.updateIsValid();
      this.updateIsValidating(false);
      this.dispatchFormUpdate();
    } else {
      throw new Error(`The field "${fieldId}" does not exist.`);
    }
  }

  async submitForm() {
    this.fields.forEach(this.updateTouched);
    this.updateIsSubmitting(true);
    this.incrementSubmitCount();
    this.dispatchFormUpdate();

    await this.validateForm();

    return new Promise((resolve, reject) => {
      if (this.state.isValid) {
        resolve(this.state.values);
      } else {
        this.updateIsSubmitting(false);
        this.dispatchFormUpdate();
        reject(this.state.errors);
      }
    });
  }

  finishSubmission() {
    this.updateIsSubmitting(false);
    this.dispatchFormUpdate();
  }

  handleClick({ target }) {
    if (target.type === 'submit') {
      this.dispatchFormSubmission();
    }
  }

  async handleBlur({ target }) {
    if (this.constructor.isFormField(target)) {
      this.updateDirty(true);
      this.updateTouched(target);

      if (!this.skipvalidationonblur) {
        await this.validateForm();
      }
    }
  }

  async handleInput({ target }) {
    if (this.constructor.isFormField(target)) {
      this.updateValue(target);

      if (!this.skipvalidationonchange) {
        await this.validateForm();
      }
    }
  }
}
