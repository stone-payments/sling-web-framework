import { withEventDispatch } from 'sling-framework';

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

    this.formdata = {
      initialValues: {},
      values: {},
      dirty: false,
    };
  }

  connectedCallback() {
    if (typeof super.connectedCallback === 'function') {
      super.connectedCallback();
    }

    this.addEventListener('input', this.handleInput);
    this.addEventListener('blur', this.handleBlur, true);

    Promise.resolve().then(() => {
      this.initForm();
    });
  }

  disconnectedCallback() {
    if (typeof super.disconnectedCallback === 'function') {
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
    this.fields = Array
      .from(this.querySelectorAll('*'))
      .filter(isFormField);

    const allFieldsHaveNameOrId = this.fields.every(getFieldId);

    if (!allFieldsHaveNameOrId) {
      throw new Error('All fields must have "name" or "id".');
    }

    this.fields
      .filter(field => field.value != null)
      .forEach((field) => {
        this.updateFormData(field);
      });

    this.formdata = {
      ...this.formdata,
      initialValues: {
        ...this.formdata.values,
      },
    };

    console.log(this.formdata);
  }

  updateFormData(field) {
    const fieldId = getFieldId(field);

    const values = {
      ...this.formdata.values,
      [fieldId]: field.value,
    };

    this.formdata = {
      ...this.formdata,
      values,
      dirty: Object.keys(values).length > 0,
    };
  }

  handleBlur({ target }) {
    console.log(this, target, 'blur');
  }

  handleInput({ target }) {
    this.updateFormData(target);
  }
}
