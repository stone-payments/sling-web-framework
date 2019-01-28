import { html, SlingElement } from 'sling-framework';
import { registerComponent } from 'sling-helpers';
import 'sling-web-component-field';
import 'sling-web-component-field-message';
import 'sling-web-component-button';
import { withForm, cancelableDelay } from '../src/index.js';

const validateUsernameAvailability = (value) => {
  if (!value) {
    return 'Required';
  }

  if (value.length < 3) {
    return 'Type at least 3 characters';
  }

  return cancelableDelay(3000)
    .then(() => fetch(`https://api.github.com/users/${value}`))
    .then(response => (response.ok ? 'User exists' : undefined))
    .catch(() => undefined);
};

const validatePresenceOfAnyTel = (values) => {
  if (!values.phones || (!values.phones.cell && !values.phones.land)) {
    return {
      minphones: 'Fill in at least one phone number',
    };
  }

  return {};
};

const TestLitForm = Base => class extends withForm(Base) {
  constructor() {
    super();

    this.setValues({
      name: '',
      lastname: '',
      username: '',
      email: '',
      cpf: '',
      cep: '',
      cnpj: '',
      phones: {
        cell: '',
        land: '',
      },
      games: [],
    });

    this.addGame = this.addGame.bind(this);
  }

  static get properties() {
    return {
      formState: {
        type: Object,
        reflectToAttribute: false,
      },
    };
  }

  addGame() {
    const { games } = this.formState.values;
    const index = games ? games.length : 0;
    this.addField(`games[${index}]`);
  }

  removeGame(index) {
    return () => {
      this.removeFields(`games[${index}]`);
    };
  }

  render() {
    const {
      values,
      touched,
    } = this.formState;

    return html`
      <style>
        sling-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1em;
          justify-items: stretch;
          align-items: flex-start;
        }

        .form__title {
          grid-column-end: span 2;
        }

        h4 {
          margin: 0.75em 0;
        }

        sling-field-message {
          display: flex;
          align-items: center;
          height: 2.125em;
          color: #e74c3c;
        }
      </style>

      <sling-form validation="${validatePresenceOfAnyTel}">
        <div class="form__title">
          <h3>Dados</h3>
        </div>

        <div>
          <h4>Nome</h4>
          <sling-field name="name" required></sling-field>
          <sling-field-message name="name"></sling-field-message>
        </div>

        <div>
          <h4>Sobrenome</h4>
          <sling-field name="lastname" required></sling-field>
          <sling-field-message name="lastname"></sling-field-message>
        </div>

        <div>
          <h4>Apelido</h4>
          <sling-field
            name="username"
            validation="${validateUsernameAvailability}"
            required></sling-field>
          <sling-field-message name="username"></sling-field-message>
        </div>

        <div>
          <h4>E-mail</h4>
          <sling-field name="email" type="email" required></sling-field>
          <sling-field-message name="email"></sling-field-message>
        </div>

        <div>
          <h4>CPF</h4>
          <sling-field name="cpf" type="cpf" required></sling-field>
          <sling-field-message name="cpf"></sling-field-message>
        </div>

        <div>
          <h4>CEP</h4>
          <sling-field name="cep" type="cep" required></sling-field>
          <sling-field-message name="cep"></sling-field-message>
        </div>

        <div>
          <h4>CNPJ</h4>
          <sling-field name="cnpj" type="cnpj" required></sling-field>
          <sling-field-message name="cnpj"></sling-field-message>
        </div>

        <div class="form__title">
          <h3>Telefones</h3>
          <sling-field-message
            name="minphones"
            style="${touched.phones.cell && touched.phones.land ? 'visibility: visible' : 'visibility: hidden'}">
          </sling-field-message>
        </div>

        <div>
          <h4>Celular</h4>
          <sling-field name="phones.cell" type="tel"></sling-field>
          <sling-field-message name="phones.cell"></sling-field-message>
        </div>

        <div>
          <h4>Fixo</h4>
          <sling-field name="phones.land" type="tel"></sling-field>
          <sling-field-message name="phones.land"></sling-field-message>
        </div>

        <div class="form__title">
          <h3>
            Jogos preferidos
            <sling-button
              type="button"
              onclick="${this.addGame}"
              slim
              size="small"
              layout="outline">
              Adicionar</sling-button>
          </h3>
        </div>

        ${values.games && values.games.map((_, index) => html`
          <div>
            <h4>
              Nome
              <sling-button
                type="button"
                onclick="${this.removeGame(index)}"
                tabindex="-1"
                slim
                size="small"
                layout="outline">
                Remover</sling-button>
            </h4>
            <sling-field name="games[${index}]" required></sling-field>
            <sling-field-message name="games[${index}]"></sling-field-message>
          </div>
        `)}

        <div class="form__title">
          <sling-button
            type="submit">Enviar</sling-button>
        </div>
      </sling-form>
    `;
  }
};

registerComponent('form-example', TestLitForm(SlingElement));
