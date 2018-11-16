import { html } from 'sling-framework';
import 'sling-web-component-form';
import 'sling-web-component-input';
import 'sling-web-component-button';

export const TestBusinessFormView = ({
  touched,
  errors,
  validateUserName,
}) => html`
  <sling-form>
    <label>
      <h4>Nome de usuário</h4>
      <sling-input
        name="username"
        type="text"
        validate="${validateUserName}"></sling-input>
    </label>

    ${touched.username && errors.username ? html`
      <div>
        ${errors.username}
      </div>
    ` : ''}

    <label>
      <h4>E-mail</h4>
      <sling-input name="email" type="text"></sling-input>
    </label>

    <h4>Telefone</h4>

    <label>
      <span>Celular</span>
      <sling-input name="cellphone" type="text"></sling-input>
    </label>

    <label>
      <span>Casa</span>
      <sling-input name="homephone" type="text"></sling-input>
    </label>

    <label>
      <h4>Valor</h4>
      <sling-input name="value" type="money"></sling-input>
    </label>

    <sling-button type="submit">Enviar</sling-button>
  </sling-form>

  <pre id="debug"></pre>
`;
