import { html } from 'sling-framework';
import 'sling-web-component-form';
import 'sling-web-component-input';
import 'sling-web-component-button';

const initialValues = {
  username: 'leofavre',
  phone: { cell: '39043' },
  laser: ['10', '20', '30'],
};

export const TestBusinessFormView = ({
  form,
  values = {},
  errors = {},
  touched = {},
  isValid,
  isValidating,
  isSubmitting,
  validateUserName,
  validateEmail,
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
    initialvalues="${initialValues}"
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
        validation="${validateEmail}"></sling-input>
    </label>

    ${touched.email && errors.email ? html`
      <p>${errors.email}</p>
    ` : ''}

    <h4>Telefone</h4>

    <label>
      <span>Celular</span>
      <sling-input
        name="phone.cell"
        type="text"
        value="${values.phone && values.phone.cell}"></sling-input>
    </label>

    <label>
      <span>Casa</span>
      <sling-input
        name="phone.home"
        type="text"
        value="${values.phone && values.phone.home}"></sling-input>
    </label>

    <label>
      <span>Trabalho</span>
      <sling-input
        name="phone.work"
        type="text"
        value="${values.phone && values.phone.work}"></sling-input>
    </label>

    ${touched.phone && touched.phone.work && errors.phone ? html`
      <p>${errors.phone}</p>
    ` : ''}

    <label>
      <h4>Valor</h4>
      <sling-input
        name="money"
        type="money"
        value="${values.money}"></sling-input>
    </label>

    ${[0, 1, 2].map(idx => html`
      <sling-input
        name="laser[${idx}]"
        type="text"
        value="${values.laser && values.laser[idx]}"></sling-input>
    `)}

    <sling-button
      type="submit"
      disabled="${!isValid || isSubmitting}">
      Enviar
    </sling-button>
  </sling-form>

  <pre id="debug">${JSON.stringify(form, null, 2)}</pre>
`;
