import { html } from 'sling-framework';
import 'sling-web-component-form';
import 'sling-web-component-field';
import 'sling-web-component-field-message';
import 'sling-web-component-button';

export const TestBusinessFormView = ({
  validatePhones,
  validateUsernameAvailability,
}) => html`
  <style>
    @import url('test-business-form/src/index.css');
  </style>
  <sling-form validation="${validatePhones}">
    <label>
      <h4>Nome de usuário</h4>
      <sling-field validation="${validateUsernameAvailability}" autocomplete="off" name="username" type="text" required></sling-field>
      <sling-field-message name="username"></sling-field-message>
    </label>

    <label>
      <h4>E-mail</h4>
      <sling-field autocomplete="off" name="email" type="email" required></sling-field>
      <sling-field-message name="email"></sling-field-message>
    </label>

    <label>
      <h4>CPF</h4>
      <sling-field autocomplete="off" name="cpf" type="cpf" required></sling-field>
      <sling-field-message name="cpf"></sling-field-message>
    </label>

    <label>
      <h4>CNPJ</h4>
      <sling-field autocomplete="off" name="cnpj" type="cnpj" required></sling-field>
      <sling-field-message name="cnpj"></sling-field-message>
    </label>

    <div>
      <h4>Telefones</h4>
      <sling-field-message name="phoneMinimum"></sling-field-message>
    </div>

    <label>
      <h3>Celular</h3>
      <sling-field autocomplete="off" name="phone.cell" type="tel"></sling-field>
      <sling-field-message name="phone.cell"></sling-field-message>
    </label>

    <label>
      <h3>Casa</h3>
      <sling-field autocomplete="off" name="phone.home" type="tel"></sling-field>
      <sling-field-message name="phone.home"></sling-field-message>
    </label>

    <sling-button type="submit">Enviar</sling-button>
  </sling-form>
`;
