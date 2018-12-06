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
  validateTakenUsername,
  handleFormUpdate,
  handleFormSubmitSucess,
  addFriend,
  removeFriend,
}) => html`
  <sling-form
    validation="${validateForm}"
    onformupdate="${handleFormUpdate}"
    onformsubmitsuccess="${handleFormSubmitSucess}">
    <label>
      <h4>Apelido</h4>
      <sling-input
        name="username"
        type="text"
        value="${values.username}"
        validation="${validateTakenUsername}"></sling-input>
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
  
    <h4>
      Amigos
      <sling-button
        type="button"
        onclick="${addFriend}">
        Adicionar
      </sling-button>
    </h4>

    ${values.friends && values.friends.map((friend, index) => html`
      <label style="display: grid; grid-template-columns: 4fr 1fr">
        <span style="grid-column: 1 / span 2">Nome do amigo</span>
        <sling-input
          name="friends[${index}].name"
          type="text"
          value="${friend && friend.name}"
          validation="${validateRequiredField}"></sling-input>
        <sling-button
          type="button"
          onclick="${removeFriend(index)}">
          Remover amigo
        </sling-button>
      </label>

      ${errors.friends && errors.friends[index] && errors.friends[index].name ? html`
        <p>${errors.friends[index].name}</p>
      ` : ''}
    `)}

    <sling-button
      type="submit"
      disabled="${!isValid || isSubmitting}">
      Enviar
    </sling-button>
  </sling-form>
`;
