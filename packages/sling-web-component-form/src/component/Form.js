import { html, SlingElement } from 'sling-framework';

const isFormField = target =>
  target.nodeName === 'SLING-INPUT' || target.nodeName === 'SLING-SELECT';

const getFieldId = target => target.getAttribute('name') ||
  target.name ||
  target.getAttribute('id') ||
  target.id;

const removeErrorsFrom = (target) => {
  target.validationstatus = null;
  target.validationmessage = null;
};

const applyErrorsTo = (target, message) => {
  if (message != null) {
    target.validationstatus = 'error';
    target.validationmessage = `${message}.`;
  } else {
    removeErrorsFrom(target);
  }
};

export class Form extends SlingElement {
  constructor() {
    super();
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.updateErrorsAndShow = this.updateErrorsAndShow.bind(this);
    this.fields = [];
  }

  static get properties() {
    return {
      formdata: {
        type: Object,
        observer: 'dispatchFormUpdateEvent',
      },
      validation: {
        type: Array,
        value: [],
      },
      open: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.initForm();
    this.addEventListener('update', this.handleUpdate);
    this.addEventListener('click', this.handleClick);
    this.addEventListener('fieldblur', this.handleBlur);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('update', this.handleUpdate);
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('fieldblur', this.handleBlur);
  }

  initForm() {
    this.fields = Array.from(this.children).filter(isFormField);
    const allFieldsHaveNameOrId = this.fields.every(getFieldId);

    if (!allFieldsHaveNameOrId) {
      throw new Error('Todos os campos devem ter "name" ou "id".');
    }

    this.formdata = this.fields
      .map((target) => {
        const fieldId = getFieldId(target);
        return (fieldId)
          ? { [fieldId]: target.value }
          : {};
      })
      .reduce((result, current) => ({ ...result, ...current }), {});
  }

  updateErrorsAndShow(target) {
    const [message] = this.validateField(target)
      .map(assertion => assertion.error);

    applyErrorsTo(target, message);
  }

  handleClick({ target }) {
    const { type } = target;

    if (type === 'submit') {
      if (this.isFormValid()) {
        this.dispatchEventAndMethod('formsubmit', this.formdata);
      } else {
        this.fields.forEach(this.updateErrorsAndShow);
      }
    }
  }

  handleBlur({ target }) {
    if (target.value != null && target.value !== '') {
      this.updateErrorsAndShow(target);
    }
  }

  handleUpdate({ target }) {
    const fieldId = getFieldId(target);

    if (fieldId != null) {
      this.formdata = {
        ...this.formdata,
        [fieldId]: target.value,
      };
    }

    removeErrorsFrom(target);
  }

  isFormValid() {
    const { validation = [] } = this;

    return validation
      .map(assertion => assertion(this.formdata))
      .every(({ isValid }) => isValid);
  }

  validateField(target) {
    const { validation = [] } = this;
    const fieldId = getFieldId(target);

    return validation
      .filter(assertion => !assertion(this.formdata).isValid &&
        assertion(this.formdata).target === fieldId)
      .map(assertion => assertion(this.formdata));
  }

  dispatchFormUpdateEvent(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.dispatchEventAndMethod('formupdate', this.formdata);
    }
  }

  render() {
    return html`
      <style>
        @import url('sling-web-component-form/src/index.css');
      </style>
      <slot></slot>
    `;
  }
}
