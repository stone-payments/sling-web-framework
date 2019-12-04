import { html, LitElement } from '@stone-payments/lit-element';
import { registerComponent, cancelableDelay } from '@stone-payments/emd-helpers';
import '@stone-payments/emd-basic-button';
import '@stone-payments/emd-basic-field';
import '@stone-payments/emd-basic-field-wrapper';
import '@stone-payments/emd-basic-field-message';
import '@stone-payments/emd-basic-select';
import '@stone-payments/emd-basic-pill-select';
import '../src/index.js';

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
      minphones: 'Fill in at least one phone number'
    };
  }

  return {};
};

const validateTruth = value => value !== true
  ? 'You must accept the terms and conditions'
  : undefined;

const musketeerOptions = ['Athos', 'Porthos', 'Aramis'];

const stateOptions = [{
  value: 'MG',
  content: 'Minas Gerais'
}, {
  value: 'RJ',
  content: 'Rio de Janeiro'
}, {
  value: 'SP',
  content: 'São Paulo'
}];

const citiesByState = {
  MG: ['Belo Horizonte'],
  RJ: ['Angra dos Reis', 'Búzios', 'Rio de Janeiro'],
  SP: ['Campinas', 'Guarulhos', 'São Paulo']
};

const seasonOptions = ['Spring', 'Summer', 'Autumn', 'Winter'];

const TestLitForm = (Base = class {}) => class extends Base {
  constructor () {
    super();

    this.log = '';

    this.addGame = this.addGame.bind(this);
    this.removeGame = this.removeGame.bind(this);
    this.updateLog = this.updateLog.bind(this);
    this.handleFormStateChange = this.handleFormStateChange.bind(this);
  }

  static get properties () {
    return {
      log: {
        type: String,
        reflect: false
      },
      formState: {
        type: Object,
        reflect: false
      }
    };
  }

  get form () {
    return this.renderRoot.querySelector('emd-form');
  }

  addGame () {
    const { games } = this.formState.values;
    const index = games ? games.length : 0;
    this.form.addField(`games[${index}]`);
  }

  removeGame (index) {
    return () => {
      this.form.removeFields(`games[${index}]`);
    };
  }

  updateLog ({ detail }) {
    this.log = detail;
    this.form.finishSubmission();
  }

  handleFormStateChange ({ detail: formState }) {
    this.formState = formState;
  }

  render () {
    const { values, touched } = this.formState || {};

    return html`
      <style>
        emd-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 2em;
          justify-items: stretch;
          align-items: flex-start;
        }

        .form__headline {
          grid-column-end: span 2;
        }

        h4 {
          margin: 0.75em 0;
        }

        emd-field,
        emd-select {
          width: 100%;
        }

        emd-field-message {
          display: flex;
          align-items: center;
          height: 2.125em;
          color: #e74c3c;
        }

        emd-button {
          font-size: 14px;
          font-weight: normal;
        }
      </style>

      <pre>${JSON.stringify(this.log, null, 2)}</pre>

      <emd-form
        @formstatechange="${this.handleFormStateChange}"
        @submiterror="${this.updateLog}"
        @submitsuccess="${this.updateLog}"
        .validation="${validatePresenceOfAnyTel}">

        <div class="form__headline">
          <h3>Information</h3>
        </div>

        <div>
          <emd-field-wrapper emptyhint label="First Name">
            <emd-field name="name" required></emd-field>
          </emd-field-wrapper>
        </div>

        <div>
          <emd-field-wrapper emptyhint label="Last Name">
            <emd-field name="lastname" required></emd-field>
          </emd-field-wrapper>
        </div>

        <div>
          <emd-field-wrapper emptyhint label="User Name">
            <emd-field
              name="username"
              .validation="${validateUsernameAvailability}"
              required>
            </emd-field>
          </emd-field-wrapper>
        </div>

        <div>
          <emd-field-wrapper emptyhint label="E-mail">
            <emd-field name="email" type="email" required></emd-field>
          </emd-field-wrapper>
        </div>

        <div>
          <emd-field-wrapper emptyhint label="CPF" hint="000.000.000-00">
            <emd-field name="cpf" type="cpf" required></emd-field>
          </emd-field-wrapper>
        </div>

        <div>
          <emd-field-wrapper emptyhint label="CEP" hint="00000-00">
            <emd-field name="cep" type="cep" required></emd-field>
          </emd-field-wrapper>
        </div>

        <div>
          <emd-field-wrapper emptyhint label="CNPJ" hint="00.000.000/0000-00">
            <emd-field name="cnpj" type="cnpj" required></emd-field>
          </emd-field-wrapper>
        </div>

        <div>
          <emd-field-wrapper emptyhint label="Document" hint="CPF ou CNPJ">
            <emd-field name="document" type="cpf-cnpj" required></emd-field>
          </emd-field-wrapper>
        </div>

        <div>
          <emd-field-wrapper emptyhint label="Money">
            <emd-field name="money" type="money" required></emd-field>
          </emd-field-wrapper>
        </div>

        <div>
          <emd-field-wrapper emptyhint label="States">
            <emd-select
              name="state"
              placeholder="Choose a state"
              .options="${stateOptions}"
              required>
            </emd-select>
          </emd-field-wrapper>
        </div>

        <div>
          <emd-field-wrapper emptyhint label="Cities">
            <emd-select
              name="city"
              placeholder="Choose a city"
              autoselectsingle
              .options="${values && values.state ? citiesByState[values.state] : []}"
              required>
            </emd-select>
          </emd-field-wrapper>
        </div>

        <div>
          <emd-field-wrapper emptyhint label="Musketeer">
            <emd-select
              name="musketeer"
              placeholder="Choose a musketeer"
              .options="${musketeerOptions}"
              required>
            </emd-select>
          </emd-field-wrapper>
        </div>

        <emd-field
          hidden
          name="hiddenValue"
          value="Cloak of invisibility">
        </emd-field>

        <div class="form__headline">
          <h3>Telephones</h3>
          <emd-field-message
            name="minphones"
            style="${touched && touched.phones && touched.phones.cell && touched.phones.land ? 'visibility: visible' : 'visibility: hidden'}">
          </emd-field-message>
        </div>

        <div>
          <emd-field-wrapper emptyhint label="Cellphone">
            <emd-field name="phones.cell" type="tel"></emd-field>
          </emd-field-wrappe>
        </div>

        <div>
          <emd-field-wrapper emptyhint label="Landline">
            <emd-field name="phones.land" type="tel"></emd-field>
          </emd-field-wrappe>
        </div>

        <div>
          <emd-field-wrapper emptyhint label="Season">
            <emd-pill-select name="season" .options="${seasonOptions}">
            </emd-emd-pill-select>
          </emd-field-wrappe>
        </div>

        <div class="form__headline">
          <h3>
            Favorite Games
            <emd-button
              type="button"
              @click="${this.addGame}"
              slim
              size="small"
              layout="outline">
              Add
            </emd-button>
          </h3>
        </div>

        ${values && values.games && values.games.map((_, index) => html`
          <div>
            <h4>
              Nome
              <emd-button
                type="button"
                @click="${this.removeGame(index)}"
                tabindex="-1"
                slim
                size="small"
                layout="outline">
                Remove
              </emd-button>
            </h4>
            <emd-field-wrapper emptyhint>
              <emd-field name="games[${index}]" required></emd-field>
            </emd-field-wrapper>
          </div>
        `)}

        <div class="form__headline">
          <emd-field-wrapper emptyhint label="Contract">
            <span style="display: inline">
              I accept the terms and conditions
            </span>
            <input
              style="display: inline"
              type="checkbox"
              name="bool"
              .validation="${validateTruth}"
            />
          </emd-field-wrapper>
        </div>

        <div class="form__headline">
          <emd-button type="submit">Enviar</emd-button>
        </div>
      </emd-form>
    `;
  }
};

registerComponent('form-example', TestLitForm(LitElement));
