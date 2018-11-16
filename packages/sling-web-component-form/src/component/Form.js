import { withEventDispatch } from 'sling-framework';
import { isFunction } from 'sling-helpers';

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
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validateField = this.validateField.bind(this);

    this.state = {
      initialValues: {},
      errors: {},
      values: {},
      touched: {},
      focused: {},
      dirty: false,
      isValid: false,
    };
  }

  connectedCallback() {
    if (isFunction(super.connectedCallback)) {
      super.connectedCallback();
    }

    this.addEventListener('click', this.handleClick);
    this.addEventListener('input', this.handleInput);
    this.addEventListener('focus', this.handleFocus, true);
    this.addEventListener('blur', this.handleBlur, true);

    Promise.resolve().then(() => {
      this.initForm();
    });
  }

  disconnectedCallback() {
    if (isFunction(super.disconnectedCallback)) {
      super.disconnectedCallback();
    }

    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('input', this.handleInput);
    this.removeEventListener('focus', this.handleFocus, true);
    this.removeEventListener('blur', this.handleBlur, true);
  }

  get fields() {
    return Array
      .from(this.querySelectorAll('*'))
      .filter(isFormField);
  }

  get state() {
    return this.__state;
  }

  set state(state) {
    const hasChanged = this.state !== state;

    this.__state = state;

    if (hasChanged) {
      this.dispatchEventAndMethod('formupdate', state);
    }
  }

  initForm() {
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

    this.validateForm();
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
    if (dirty !== this.state.dirty) {
      this.state = {
        ...this.state,
        dirty,
      };
    }
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

  updateFocused(field, focus) {
    const fieldId = getFieldId(field);

    this.state = {
      ...this.state,
      focused: {
        ...this.state.focused,
        [fieldId]: focus || undefined,
      },
    };
  }

  validateForm() {
    if (isFunction(this.validation)) {
      const errors = this.validation(this.state.values);

      this.state = {
        ...this.state,
        errors,
      };

      this.updateIsValid();
    }

    this.fields.forEach(this.validateField);
  }

  validateField(field) {
    if (isFunction(field.validation)) {
      const fieldId = getFieldId(field);
      const error = field.validation(field.value);

      const errors = {
        ...this.state.errors,
        [fieldId]: error,
      };

      this.state = {
        ...this.state,
        errors,
      };
    }

    this.updateIsValid();
  }

  submitForm() {
    this.validateForm();

    if (this.state.isValid) {
      this.dispatchEventAndMethod('formsubmit', this.state.values);
    }
  }

  handleClick({ target }) {
    if (target.type === 'submit') {
      this.submitForm();
    }
  }

  handleFocus({ target }) {
    if (isFormField(target)) {
      this.updateFocused(target, true);
    }
  }

  handleBlur({ target }) {
    if (isFormField(target)) {
      this.updateFocused(target, false);
      this.updateDirty(true);
      this.updateTouched(target);
      this.validateForm();
    }
  }

  handleInput({ target }) {
    if (isFormField(target)) {
      this.updateValue(target);
      this.validateForm();
    }
  }
}
