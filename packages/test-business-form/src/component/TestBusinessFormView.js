import { html } from 'sling-framework';
import 'sling-web-component-form';
import 'sling-web-component-input';
import 'sling-web-component-button';

export const TestBusinessFormView = ({
  values = {},
  errors = {},
  isValid,
  isSubmitting,
  validateRequiredField,
  validateRequiredEmail,
  validateOptionalPhone,
  validateForm,
  handleFormUpdate,
  handleFormSubmission,
  friends,
  addFriend,
  removeFriend,
}) => html`
  <sling-form
    validation="${validateForm}"
    onformupdate="${handleFormUpdate}"
    onformsubmit="${handleFormSubmission}">
    <label>
      <h4>Apelido</h4>
      <sling-input
        name="username"
        type="text"
        value="${values.username}"
        validation="${validateRequiredField}"></sling-input>
    </label>

    ${errors.username ? html`
      <p>${errors.username}</p>
    ` : ''}

    <label>
      <h4>E-mail</h4>
      <sling-input
        name="email"
        type="email"
        value="${values.email}"
        validation="${validateRequiredEmail}"></sling-input>
    </label>

    ${errors.email ? html`
      <p>${errors.email}</p>
    ` : ''}

    <h4>Telefone(s)</h4>

    ${errors.onePhoneMinimum ? html`
      <p>${errors.onePhoneMinimum}</p>
    ` : ''}

    <label>
      <span>Pessoal</span>
      <sling-input
        name="phone.personal"
        type="phone"
        value="${values.phone && values.phone.personal}"
        validation="${validateOptionalPhone}"></sling-input>
    </label>

    ${errors.phone && errors.phone.personal ? html`
      <p>${errors.phone.personal}</p>
    ` : ''}

    <label>
      <span>Trabalho</span>
      <sling-input
        name="phone.work"
        type="phone"
        value="${values.phone && values.phone.work}"
        validation="${validateOptionalPhone}"></sling-input>
    </label>

    ${errors.phone && errors.phone.work ? html`
      <p>${errors.phone.work}</p>
    ` : ''}
  
    <h4>Amigos</h4>
    <sling-button
      style="width: 150px;"
      type="button"
      onclick="${() => addFriend()}">
      Adicionar amigo
    </sling-button>

    ${friends.map(id => html`
      <sling-input
        style="width: calc(100% - 200px); float: left;"
        name="friends[${id}].name"
        type="text"
        value="${values.friends && values.friends[id] && values.friends[id].name}"
        validation="${validateRequiredField}"></sling-input>
      
      <sling-button
        style="width: 150px; float: right;"
        type="button"
        onclick="${() => removeFriend(id)}">
        Remover amigo
      </sling-button>

      ${errors.friends && errors.friends[id] && errors.friends[id].name ? html`
        <p>${errors.friends[id].name}</p>
      ` : ''}
    `)}

    <sling-button
      type="submit"
      disabled="${!isValid || isSubmitting}">
      Enviar
    </sling-button>
  </sling-form>
`;
