import { withEventDispatch } from 'sling-framework';
import { isFunction, isPromise, toFlatEntries } from 'sling-helpers';

const isFormField = target =>
  ['SLING-INPUT', 'SLING-SELECT', 'INPUT', 'SELECT']
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
    this.updateValue = this.updateValue.bind(this);
    this.updateErrors = this.updateErrors.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validateField = this.validateField.bind(this);

    this.formdata = {
      initialValues: {},
      errors: {},
      values: {},
      touched: {},
      dirty: false,
      isValid: false,
    };
  }

  connectedCallback() {
    if (isFunction(super.connectedCallback)) {
      super.connectedCallback();
    }

    this.addEventListener('input', this.handleInput);
    this.addEventListener('blur', this.handleBlur, true);

    Promise.resolve().then(() => {
      this.initForm();
    });
  }

  disconnectedCallback() {
    if (isFunction(super.disconnectedCallback)) {
      super.disconnectedCallback();
    }

    this.removeEventListener('input', this.handleInput);
    this.removeEventListener('blur', this.handleBlur, true);
  }

  get fields() {
    return Array
      .from(this.querySelectorAll('*'))
      .filter(isFormField);
  }

  get formdata() {
    return this.__formdata;
  }

  set formdata(value) {
    const hasChanged = this.formdata !== value;

    this.__formdata = value;

    if (hasChanged) {
      this.dispatchEventAndMethod('formupdate', this.formdata);
    }
  }

  initForm() {
    const allFieldsHaveNameOrId = this.fields.every(getFieldId);

    if (!allFieldsHaveNameOrId) {
      throw new Error('All fields must have "name" or "id".');
    }

    this.fields.forEach(this.updateValue);

    this.formdata = {
      ...this.formdata,
      initialValues: {
        ...this.formdata.values,
      },
    };
  }

  updateValue(field) {
    const fieldId = getFieldId(field);

    const values = {
      ...this.formdata.values,
      [fieldId]: field.value || '',
    };

    this.formdata = {
      ...this.formdata,
      values,
    };
  }

  updateTouched(field) {
    const fieldId = getFieldId(field);

    if (!this.formdata.touched[fieldId]) {
      this.formdata = {
        ...this.formdata,
        touched: {
          ...this.formdata.touched,
          [fieldId]: true,
        },
      };
    }
  }

  updateDirty(dirty) {
    if (dirty !== this.formdata.dirty) {
      this.formdata = {
        ...this.formdata,
        dirty,
      };
    }
  }

  updateErrors(errors) {
    if (errors) {
      this.formdata = {
        ...this.formdata,
        errors,
        isValid: Object.keys(errors).length === 0,
      };
    }
  }

  updateIsValid() {
    const hasNoErrors = Object
      .values(this.formdata.errors)
      .filter(value => value != null)
      .length === 0;

    const isValid = hasNoErrors && this.formdata.dirty;

    this.formdata = {
      ...this.formdata,
      isValid,
    };
  }

  validateForm() {
    if (isFunction(this.validation)) {
      const errors = this.validation(this.formdata.values);

      this.formdata = {
        ...this.formdata,
        errors,
      };

      this.fields.forEach(this.validateField);
    }
  }

  validateField(field) {
    if (isFunction(field.validation)) {
      const fieldId = getFieldId(field);
      const error = field.validation(field.value);

      const errors = {
        ...this.formdata.errors,
        [fieldId]: error,
      };

      this.formdata = {
        ...this.formdata,
        errors,
      };
    }
  }

  handleBlur({ target }) {
    if (isFormField(target)) {
      this.updateDirty(true);
      this.updateTouched(target);
      this.validateForm();
      this.updateIsValid();
    }
  }

  handleInput({ target }) {
    if (isFormField(target)) {
      this.updateValue(target);
      this.validateForm();
      this.updateIsValid();
    }
  }
}
