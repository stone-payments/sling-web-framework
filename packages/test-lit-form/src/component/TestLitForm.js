import { html } from 'sling-framework';
import { getIn, omit } from 'sling-helpers';
import { withForm } from 'sling-web-component-form';
import 'sling-web-component-icon';

import {
  validateUsernameAvailability,
  validateRequired,
} from './customValidations.js';

// deve virar um selector mais tarde

const getValidationStatus = (fieldId, state) => {
  const { isValidatingField, errors, touched } = state;

  if (!getIn(touched, fieldId)) {
    return fieldId;
  }

  if (getIn(isValidatingField, fieldId)) {
    return 'ellipsis';
  }

  return getIn(errors, fieldId) ? 'danger' : 'success';
};

const FieldIconView = (fieldId, state) => html`
  <sling-icon
    className="field__icon
    ${getValidationStatus(fieldId, state) === 'ellipsis' ? '' : 'field__icon_hidden'}"
    icon="ellipsis"></sling-icon>

  <sling-icon
    className="field__icon
    ${getValidationStatus(fieldId, state) === 'danger' ? '' : 'field__icon_hidden'}"
    icon="danger"></sling-icon>

  <sling-icon
    className="field__icon
    ${getValidationStatus(fieldId, state) === 'success' ? '' : 'field__icon_hidden'}"
    icon="success"></sling-icon>
`;

const FieldView = (fieldId, validation, state) => html`
  <div className="field${getIn(state.isValidatingField, fieldId) ? ' field_validating' : ''}">
    <input
      validation="${validation}"
      oninput="${state.handleInput}"
      onblur="${state.handleBlur}"
      name="${fieldId}"
      value="${getIn(state.values, fieldId)}"
      class="field__input"
      autocomplete="off">
    ${FieldIconView(fieldId, state)}
  </div>
`;

export const TestLitForm = Base => class extends withForm(Base) {
  constructor() {
    super();

    this.setValues({
      username: '',
      friends: ['augusto', 'alberto'],
    });
  }

  static get properties() {
    return {
      formState: {
        type: Object,
        reflectToAttribute: false,
      },
    };
  }

  render() {
    const { values, errors, touched, isValidatingField } = this.formState;
    const common = { ...this.formState, ...this };

    return html`
      <style>
        @import url('test-lit-form/src/index.css');
      </style>

      <div class="form">
        ${FieldView('username', validateUsernameAvailability, common)}
        <p>${!isValidatingField.username && touched.username ? errors.username : ''}</p>

        ${values.friends && values.friends.map((_, index) => html`
          ${FieldView(`friends[${index}]`, validateRequired, common)}
          <p>${!isValidatingField.friends[index] && touched.friends[index] ? errors.friends[index] : ''}</p>
        `)}
      </div>

      <pre>${JSON.stringify(omit(this.formState, 'byId'), null, 2)}</pre>
    `;
  }
};
