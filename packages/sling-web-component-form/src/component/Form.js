import { withEventDispatch } from 'sling-framework';
import { isFunction, toFlatObject } from 'sling-helpers';

const isFormField = target =>
  ['SLING-INPUT', 'SLING-SELECT', 'INPUT', 'SELECT', 'TEXTAREA']
    .includes(target.nodeName);

const getFieldId = field => field.getAttribute('name') ||
  field.name ||
  field.getAttribute('id') ||
  field.id;

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
    this.validateForm = this.validateForm.bind(this);

    this.state = {
      initialValues: {},
      errors: {},
      values: {},
      touched: {},
      dirty: false,
      isValid: false,
      isSubmitting: false,
      isValidating: false,
      submitCount: 0,
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

  get fields() {
    return Array
      .from(this.querySelectorAll('*'))
      .filter(isFormField);
  }

  dispatchFormUpdate() {
    this.dispatchEventAndMethod('formupdate', this.state);
  }

  dispatchFormSubmit() {
    this.dispatchEventAndMethod('formsubmit', this.state.values);
  }

  async initForm() {
    const allFieldsHaveNameOrId = this.fields.every(getFieldId);

    if (!allFieldsHaveNameOrId) {
      throw new Error('All fields must have "name" or "id".');
    }

    this.fields.forEach(this.updateValue);

    this.state = {
      ...this.state,
      initialValues: {
        ...this.state.values,
      },
    };

    await this.validateForm();
  }

  updateValue(field) {
    const fieldId = getFieldId(field);

    const values = {
      ...this.state.values,
      [fieldId]: field.value || '',
    };

    this.state = {
      ...this.state,
      values,
    };
  }

  updateTouched(field) {
    const fieldId = getFieldId(field);

    if (!this.state.touched[fieldId]) {
      this.state = {
        ...this.state,
        touched: {
          ...this.state.touched,
          [fieldId]: true,
        },
      };
    }
  }

  updateDirty(dirty) {
    this.state = {
      ...this.state,
      dirty,
    };
  }

  updateIsValid() {
    const hasNoErrors = Object
      .values(this.state.errors)
      .filter(value => value != null)
      .length === 0;

    const isValid = hasNoErrors && this.state.dirty;

    this.state = {
      ...this.state,
      isValid,
    };
  }

  updateIsSubmitting(isSubmitting) {
    this.state = {
      ...this.state,
      isSubmitting,
    };
  }

  updateIsValidating(isValidating) {
    this.state = {
      ...this.state,
      isValidating,
    };
  }

  incrementSubmitCount() {
    this.state = {
      ...this.state,
      submitCount: this.state.submitCount + 1,
    };
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
      .map(this.constructor.getFieldError));

    this.state = {
      ...this.state,
      errors: {
        ...formErrors,
        ...fieldErrors.reduce(toFlatObject, {}),
      },
    };

    this.updateIsValid();
    this.updateIsValidating(false);
    this.dispatchFormUpdate();
  }

  async validateField(fieldId) {
    const field = this.fields
      .find(fi => getFieldId(fi) === fieldId);

    if (field) {
      this.updateIsValidating(true);
      this.dispatchFormUpdate();

      const error = await this.constructor.getFieldError(field);

      this.state = {
        ...this.state,
        errors: {
          ...this.state.errors,
          ...error,
        },
      };

      this.updateIsValid();
      this.updateIsValidating(false);
      this.dispatchFormUpdate();
    } else {
      throw new Error(`The field ${fieldId} does not exist.`);
    }
  }

  static async getFieldError(field) {
    if (isFunction(field.validation)) {
      let error;
      const fieldId = getFieldId(field);

      try {
        error = await Promise.resolve(field.validation(field.value));
      } catch (err) {
        error = (err.constructor === Error) ? err.message : err;
      }

      return { [fieldId]: error };
    }

    return {};
  }

  async submitForm() {
    this.fields.forEach(this.updateTouched);
    this.updateIsSubmitting(true);
    this.incrementSubmitCount();
    this.dispatchFormUpdate();

    await this.validateForm();

    if (this.state.isValid) {
      this.dispatchFormSubmit();
    } else {
      this.updateIsSubmitting(false);
      this.dispatchFormUpdate();
    }
  }

  handleClick({ target }) {
    if (target.type === 'submit') {
      this.submitForm();
    }
  }

  finishSubmission() {
    this.updateIsSubmitting(false);
    this.dispatchFormUpdate();
  }

  async handleBlur({ target }) {
    if (isFormField(target)) {
      this.updateDirty(true);
      this.updateTouched(target);
      await this.validateForm();
    }
  }

  async handleInput({ target }) {
    if (isFormField(target)) {
      this.updateValue(target);
      await this.validateForm();
    }
  }
}
