import { html } from 'sling-framework';
import { getIn, omit } from 'sling-helpers';
import { withForm } from 'sling-web-component-form';
import 'sling-web-component-icon';

import {
  validateUsernameAvailability,
  validateRequired,
  validateEmail,
  validateCpf,
  validateCnpj,
} from './customValidations.js';

// deve virar um selector mais tarde

const getValidationStatus = (fieldId, state) => {
  const { isValidatingField, errors, touched } = state;

  if (!getIn(touched, fieldId)) {
    return fieldId;
  }

  if (getIn(isValidatingField, fieldId)) {
    return 'validating';
  }

  return getIn(errors, fieldId) ? 'error' : 'success';
};

const FieldIconView = (fieldId, state) => html`
  <sling-icon
    className="field__icon field__icon_validating
    ${getValidationStatus(fieldId, state) === 'validating' ? '' : 'field__icon_hidden'}"
    icon="ellipsis"></sling-icon>

  <sling-icon
    className="field__icon field__icon_error
    ${getValidationStatus(fieldId, state) === 'error' ? '' : 'field__icon_hidden'}"
    icon="warning"></sling-icon>

  <sling-icon
    className="field__icon field__icon_success
    ${getValidationStatus(fieldId, state) === 'success' ? '' : 'field__icon_hidden'}"
    icon="success"></sling-icon>
`;

const FieldView = (fieldId, validation, state) => html`
  <div className="field field_${getValidationStatus(fieldId, state)}">
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

const FieldMessageView = (fieldId, {
  isValidatingField,
  touched,
  errors,
}) => html`
  <p>
    ${!getIn(isValidatingField, fieldId) && getIn(touched, fieldId) ? html`
      ${getIn(errors, fieldId)}
    ` : ''}
  </p>
`;

export const TestLitForm = Base => class extends withForm(Base) {
  constructor() {
    super();

    this.setValues({
      name: '',
      lastName: '',
      userName: '',
      email: '',
      cpf: '',
      cnpj: '',
      phones: {
        work: '',
        home: '',
      },
      games: [],
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
    const { values } = this.formState;
    const common = { ...this.formState, ...this };

    return html`
      <style>
        @import url('test-lit-form/src/index.css');
      </style>

      <div class="form">
        <div>
          <h4>Nome</h4>
          ${FieldView('name', validateRequired, common)}
          ${FieldMessageView('name', common)}
        </div>

        <div>
          <h4>Sobrenome</h4>
          ${FieldView('lastName', validateRequired, common)}
          ${FieldMessageView('lastName', common)}
        </div>

        <div>
          <h4>Apelido</h4>
          ${FieldView('userName', validateUsernameAvailability, common)}
          ${FieldMessageView('userName', common)}
        </div>

        <div>
          <h4>E-mail</h4>
          ${FieldView('email', validateEmail, common)}
          ${FieldMessageView('email', common)}
        </div>

        <div>
          <h4>CPF</h4>
          ${FieldView('cpf', validateCpf, common)}
          ${FieldMessageView('cpf', common)}
        </div>

        <div>
          <h4>CNPJ</h4>
          ${FieldView('cnpj', validateCnpj, common)}
          ${FieldMessageView('cnpj', common)}
        </div>

        <div>
          <h4>Jogos preferidos</h4>
          ${values.games && values.games.map((_, index) => html`
            ${FieldView(`games[${index}]`, validateRequired, common)}
            ${FieldMessageView(`games[${index}]`, common)}
          `)}
        </div>
      </div>

      <pre>${JSON.stringify(omit(this.formState, 'byId'), null, 2)}</pre>
    `;
  }
};
