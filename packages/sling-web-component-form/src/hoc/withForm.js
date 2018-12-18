import { getIn } from 'sling-helpers';
import { withReducer } from './withReducer.js';

import {
  formReducer,
  validateField,
  validateForm,
  updateFieldValue,
  updateFieldTouched,
  updateFieldUsed,
  setValues,
} from '../state/formReducer.js';

const FORM_TYPES = [
  'SLING-FORM',
];

const FORM_FIELD_TYPES = [
  'SLING-FIELD',
  'SLING-INPUT',
  'SLING-SELECT',
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
    this._mo.observe(this.shadowRoot, { childList: true, subtree: true });
    this.handleDomUpdate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mo.disconnect();
  }

  static isForm(target) {
    return FORM_TYPES.includes(target.nodeName);
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

  get form() {
    return this.shadowRoot
      ? Array
        .from(this.shadowRoot.querySelectorAll('*'))
        .find(this.constructor.isForm)
      : [];
  }

  get fields() {
    return this.shadowRoot
      ? Array
        .from(this.shadowRoot.querySelectorAll('*'))
        .filter(this.constructor.isFormField)
      : [];
  }

  get state() {
    return this._state;
  }

  set state(value) {
    this._state = value;
    this.formState = this._state;
    this.handleStateUpdate(this._state);
  }

  setValues(values) {
    this.dispatchAction(setValues(values));
  }

  getFieldById(fieldId) {
    return this.fields.find(field =>
      this.constructor.getFieldId(field) === fieldId);
  }

  validateFieldByElement(field) {
    this.dispatchAction(validateField(
      this.constructor.getFieldId(field),
      field.validation,
      field.value,
    ));
  }

  validateField(fieldId) {
    this.validateFieldByElement(this.getFieldById(fieldId));
  }

  validateForm() {
    this.dispatchAction(validateForm(
      this.form.validation,
      this.state.values,
    ));
  }

  handleStateUpdate(nextState) {
    this.fields.forEach((field) => {
      const fieldId = this.constructor.getFieldId(field);
      const wasTouched = getIn(nextState.touched, fieldId);
      field.value = getIn(nextState.values, fieldId);

      if (wasTouched) {
        field.validating = getIn(nextState.isValidatingField, fieldId);

        if (!field.validating) {
          field.validationstatus = getIn(nextState.errors, fieldId) != null
            ? 'error'
            : 'success';
        } else {
          field.validationstatus = undefined;
        }
      }
    });
  }

  handleDomUpdate() {
    console.log('dom update');

    this.fields.forEach((field) => {
      field.oninput = this.handleInput;
      field.onblur = this.handleBlur;
    });
  }

  handleBlur({ target: field }) {
    if (this.constructor.isFormField(field)) {
      const fieldId = this.constructor.getFieldId(field);

      this.dispatchAction(updateFieldTouched(fieldId, true));
      this.validateFieldByElement(field);
      this.validateForm();
    }
  }

  handleInput({ target: field }) {
    if (this.constructor.isFormField(field)) {
      const fieldId = this.constructor.getFieldId(field);
      const { value } = field;

      this.dispatchAction(updateFieldUsed(fieldId, true));
      this.dispatchAction(updateFieldValue(fieldId, value));
      this.validateFieldByElement(field);
      this.validateForm();
    }
  }
};
