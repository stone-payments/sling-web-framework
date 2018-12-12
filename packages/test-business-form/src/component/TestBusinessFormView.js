import { html } from 'sling-framework';
import 'sling-web-component-form';
import 'sling-web-component-field';
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
      <sling-field
        name="username"
        type="text"
        validation="${validateTakenUsername}"></sling-field>
    </label>

    <label>
      <h4>E-mail</h4>
      <sling-field
        name="email"
        type="email"
        validation="${validateRequiredEmail}"></sling-field>
    </label>

    <h4>Telefone(s)</h4>

    <label>
      <span>Pessoal</span>
      <sling-field
        name="phone.personal"
        type="tel"
        validation="${validateOptionalPhone}"></sling-field>
    </label>

    <label>
      <span>Trabalho</span>
      <sling-field
        name="phone.work"
        type="tel"
        validation="${validateOptionalPhone}"></sling-field>
    </label>

    <sling-button
      type="submit">
      Enviar
    </sling-button>
  </sling-form>
`;
