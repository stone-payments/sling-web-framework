import { html } from 'sling-framework';
import 'sling-web-component-form';
import 'sling-web-component-input';
import 'sling-web-component-button';

export const TestBusinessFormView = ({
  form,
  errors,
  touched,
  isValid,
  isValidating,
  isSubmitting,
  values,
  validateUserName,
  validateEmailAsync,
  validateFormAsync,
  handleFormUpdate,
  handleFormSubmission,
}) => html`
  <style>
    :host {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
    }
  </style>

  <sling-form
    validation="${validateFormAsync}"
    onformupdate="${handleFormUpdate}"
    onformsubmit="${handleFormSubmission}">
    <h4>Form${isValidating ? ' validating' : ''}</h4>

    <label>
      <h4>Nome de usuário</h4>
      <sling-input
        name="username"
        type="text"
        value="${values.username}"
        validation="${validateUserName}"></sling-input>
    </label>

    ${touched.username && errors.username ? html`
      <p>${errors.username}</p>
    ` : ''}

    <label>
      <h4>E-mail</h4>
      <sling-input
        name="email"
        type="email"
        value="${values.email}"
        validation="${validateEmailAsync}"></sling-input>
    </label>

    ${touched.email && errors.email ? html`
      <p>${errors.email}</p>
    ` : ''}

    <h4>Telefone</h4>

    <label>
      <span>Celular</span>
      <sling-input
        name="cellphone"
        type="text"
        value="${values.cellphone}"></sling-input>
    </label>

    <label>
      <span>Casa</span>
      <sling-input
        name="homephone"
        type="text"
        value="${values.homephone}"></sling-input>
    </label>

    <label>
      <span>Trabalho</span>
      <sling-input
        name="workphone"
        type="text"
        value="${values.workphone}"></sling-input>
    </label>

    ${touched.workphone && errors.phone ? html`
      <p>${errors.phone}</p>
    ` : ''}

    <label>
      <h4>Valor</h4>
      <sling-input
        name="value"
        type="money"
        value="${values.money}"></sling-input>
    </label>

    <sling-button
      type="submit"
      disabled="${!isValid || isSubmitting}">
      Enviar
    </sling-button>
  </sling-form>

  <pre id="debug">${JSON.stringify(form, null, 2)}</pre>
`;
