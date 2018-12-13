import { html } from 'sling-framework';
import 'sling-web-component-form';
import 'sling-web-component-field';
import 'sling-web-component-field-message';
import 'sling-web-component-button';

const till = (index = 0) => Array.from(Array(index).keys());

export const TestBusinessFormView = ({
  friendsCount,
  validatePhones,
  validateUsernameAvailability,
}) => html`
  <style>
    @import url('test-business-form/src/index.css');
  </style>
  <sling-form validation="${validatePhones}">
    <label>
      <h4>Nome de usuário</h4>
      <sling-field
        validation="${validateUsernameAvailability}"
        validationdelay="3000"
        name="username"
        type="text"
        required></sling-field>
      <sling-field-message name="username"></sling-field-message>
    </label>

    <label>
      <h4>E-mail</h4>
      <sling-field name="email" type="email" required></sling-field>
      <sling-field-message name="email"></sling-field-message>
    </label>

    <label>
      <h4>CPF</h4>
      <sling-field name="cpf" type="cpf" required></sling-field>
      <sling-field-message name="cpf"></sling-field-message>
    </label>

    <label>
      <h4>CNPJ</h4>
      <sling-field name="cnpj" type="cnpj" required></sling-field>
      <sling-field-message name="cnpj"></sling-field-message>
    </label>

    <div>
      <h4>Telefones</h4>
      <sling-field-message name="phoneMinimum"></sling-field-message>
    </div>

    <label>
      <h3>Celular</h3>
      <sling-field name="phone.cell" type="tel"></sling-field>
      <sling-field-message name="phone.cell"></sling-field-message>
    </label>

    <label>
      <h3>Casa</h3>
      <sling-field name="phone.home" type="tel"></sling-field>
      <sling-field-message name="phone.home"></sling-field-message>
    </label>
  
    ${friendsCount ? html`
      <div>
        <h4>Amigos</h4>
      </div>
    ` : ''}

    ${till(friendsCount).map(index => html`
      <label>
        <h3>Nome</h3>
        <sling-field name="friends[${index}].name" type="text" required></sling-field>
        <sling-field-message name="friends[${index}].name"></sling-field-message>
      </label>
      <label>
        <h3>Telefone</h3>
        <sling-field name="friends[${index}].phone" type="tel" required></sling-field>
        <sling-field-message name="friends[${index}].phone"></sling-field-message>
      </label>
    `)}

    <sling-button type="submit">Enviar</sling-button>
  </sling-form>
`;
