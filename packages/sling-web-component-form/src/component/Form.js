import { withEventDispatch } from 'sling-framework';

const isFormField = target =>
  ['SLING-INPUT', 'SLING-SELECT', 'INPUT', 'SELECT']
    .includes(target.nodeName);

const getFieldId = target => target.getAttribute('name') ||
  target.name ||
  target.getAttribute('id') ||
  target.id;

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

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  connectedCallback() {
    if (typeof super.connectedCallback === 'function') {
      super.connectedCallback();
    }

    this.addEventListener('input', this.handleUpdate);
    this.addEventListener('blur', this.handleBlur, true);

    Promise.resolve().then(() => {
      this.initForm();
    });
  }

  disconnectedCallback() {
    if (typeof super.disconnectedCallback === 'function') {
      super.disconnectedCallback();
    }

    this.removeEventListener('input', this.handleUpdate);
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

    const initialValues = this.fields
      .map(target => ({ [getFieldId(target)]: target.value }))
      .reduce((result, current) => ({ ...result, ...current }), {});

    this.formdata = {
      ...initialValues,
    };
  }

  handleBlur({ target }) {
    console.log(this, target, 'blur');
  }

  handleUpdate({ target }) {
    const fieldId = getFieldId(target);

    if (fieldId != null) {
      this.formdata = {
        ...this.formdata,
        [fieldId]: target.value,
      };
    }
  }
}
