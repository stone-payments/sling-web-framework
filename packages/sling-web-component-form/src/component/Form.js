import { withEventDispatch } from 'sling-framework';
import { isFunction, isPromise } from 'sling-helpers';

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

  get formdata() {
    return this.__formdata;
  }

  set formdata(value) {
    const hasValueChanged = this.formdata !== value;

    this.__formdata = value;

    if (hasValueChanged) {
      this.dispatchEventAndMethod('formupdate', this.formdata);
    }
  }

  initForm() {
    const fields = Array
      .from(this.querySelectorAll('*'))
      .filter(isFormField);

    const allFieldsHaveNameOrId = fields.every(getFieldId);

    if (!allFieldsHaveNameOrId) {
      throw new Error('All fields must have "name" or "id".');
    }

    fields.forEach(this.updateValue);

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

  applyValidation(field) {
    const validateFn = field
      ? field.validate
      : this.validate;

    const values = field
      ? this.formdata.values[getFieldId(field)]
      : this.formdata.values;

    if (isFunction(validateFn)) {
      const maybeErrors = validateFn(values);

      if (isPromise(maybeErrors)) {
        maybeErrors.catch((err) => {
          const errors = field
            ? { [getFieldId(field)]: err }
            : err;

          this.updateErrors(errors);
        });
      } else {
        const errors = field
          ? { [getFieldId(field)]: maybeErrors }
          : maybeErrors;

        this.updateErrors(errors);
      }
    }
  }

  validateForm() {
    this.applyValidation();
  }

  validateField(field) {
    this.applyValidation(field);
  }

  handleBlur({ target }) {
    if (isFormField(target)) {
      this.updateDirty(true);
      this.updateTouched(target);
      this.validateForm();
      this.validateField(target);
    }
  }

  handleInput({ target }) {
    if (isFormField(target)) {
      this.updateValue(target);
      this.validateForm();
      this.validateField(target);
    }
  }
}
