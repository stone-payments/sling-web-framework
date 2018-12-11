import { html } from 'sling-framework';
import 'sling-web-component-form';
import 'sling-web-component-input';
import 'sling-web-component-button';

export const TestBusinessFormView = ({
  validateTakenUsername,
  validateRequiredEmail,
  validateOptionalPhone,
  validateForm,
}) => html`
  <sling-form
    validation="${validateForm}">
    <label>
      <h4>Apelido</h4>
      <sling-input
        name="username"
        type="text"
        validation="${validateTakenUsername}"></sling-input>
    </label>

    <label>
      <h4>E-mail</h4>
      <sling-input
        name="email"
        type="email"
        validation="${validateRequiredEmail}"></sling-input>
    </label>

    <h4>Telefone(s)</h4>

    <label>
      <span>Pessoal</span>
      <sling-input
        name="phone.personal"
        type="phone"
        validation="${validateOptionalPhone}"></sling-input>
    </label>

    <label>
      <span>Trabalho</span>
      <sling-input
        name="phone.work"
        type="phone"
        validation="${validateOptionalPhone}"></sling-input>
    </label>

    <sling-button
      type="submit">
      Enviar
    </sling-button>
  </sling-form>
`;
