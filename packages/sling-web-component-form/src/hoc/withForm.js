import { getIn } from 'sling-helpers';
import { withReducer } from './withReducer.js';

import {
  formReducer,
  validateField,
  updateFieldValue,
  updateFieldTouched,
  setValues,
} from '../state/formReducer.js';

const FORM_FIELD_TYPES = [
  'SLING-FIELD',
  'SLING-INPUT',
  'SLING-SELECT',
  'INPUT',
  'SELECT',
  'TEXTAREA',
];

export const withForm = Base => class extends withReducer(formReducer)(Base) {
  constructor() {
    super();
    this.handleStateUpdate = this.handleStateUpdate.bind(this);
    this.handleDomUpdate = this.handleDomUpdate.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._mo = new MutationObserver(this.handleDomUpdate);
    this._mo.observe(this, { childList: true, subtree: true });
    this.handleDomUpdate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mo.disconnect();
  }

  static get properties() {
    return {
      state: {
        type: Object,
        reflectToAttribute: false,
        observer: 'handleStateUpdate',
      },
    };
  }

  static isFormField(target) {
    return FORM_FIELD_TYPES.includes(target.nodeName);
  }

  static getFieldId(field) {
    return field.getAttribute('name') ||
      field.name ||
      field.getAttribute('id') ||
      field.id;
  }

  get fields() {
    return Array
      .from(this.shadowRoot.querySelectorAll('*'))
      .filter(this.constructor.isFormField);
  }

  setValues(values) {
    this.dispatchAction(setValues(values));
  }

  handleStateUpdate(nextState) {
    this.fields.forEach((field) => {
      const fieldId = this.constructor.getFieldId(field);
      field.value = getIn(nextState.values, fieldId);
    });
  }

  handleDomUpdate() {
    this.fields.forEach((field) => {
      field.oninput = this.handleInput;
      field.onblur = this.handleBlur;
    });
  }

  handleBlur({ target: field }) {
    if (this.constructor.isFormField(field)) {
      const fieldId = this.constructor.getFieldId(field);
      const { value, validation } = field;
      this.dispatchAction(updateFieldTouched(fieldId, true));
      this.dispatchAction(validateField(fieldId, validation, value));
    }
  }

  handleInput({ target: field }) {
    if (this.constructor.isFormField(field)) {
      const fieldId = this.constructor.getFieldId(field);
      const { value, validation } = field;
      this.dispatchAction(updateFieldValue(fieldId, value));
      this.dispatchAction(validateField(fieldId, validation, value));
    }
  }
};
