import { html, LitElement } from '@stone-payments/lit-element';
import { withComponent } from '@stone-payments/emd-hocs';
import { registerComponent, unflatten, flatten } from '@stone-payments/emd-helpers';
import '@stone-payments/emd-basic-button';
import '@stone-payments/emd-basic-field';
import '@stone-payments/emd-basic-select';

const FIELD_TYPES = [
  'input',
  'select',
  'emd-field',
  'emd-select',
  'emd-pill-select'
];

const OBSERVER = Symbol('OBSERVER');

const TestLitForm = (Base = class {}) => class extends Base {
  constructor () {
    super();
    this.handleChildrenUpdate = this.handleChildrenUpdate.bind(this);
  }

  connectedCallback () {
    super.connectedCallback();
    this[OBSERVER] = new MutationObserver(this.handleChildrenUpdate);

    this[OBSERVER].observe(this.renderRoot, {
      childList: true,
      subtree: true
    });
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    this[OBSERVER].disconnect();
  }

  static get properties () {
    return {
      formValues: {
        type: Object,
        reflect: true
      }
    };
  }

  static get fieldSelector () {
    return FIELD_TYPES.join(', ');
  }

  get formFields () {
    return Array.from(this.renderRoot
      .querySelectorAll(this.constructor.fieldSelector) || []);
  }

  get formDom () {
    return this.formFields.reduce((result, { name, value, mask }) => ({
      ...result,
      [name]: {
        value,
        unmaskedValue: mask ? mask.unmaskedValue : value
      }
    }), {});
  }

  get formValues () {
    return this._formValues;
  }

  set formValues (values) {
    const oldValues = this._formValues;
    this._formValues = values;
    this.requestUpdate('formValues', oldValues);

    if (!this._valuesChangedInternally) {
      const updater = flatten(values);

      this.updateComplete.then(() => {
        this.formFields
          .forEach(field => {
            if (updater[field.name] != null) {
              field.value = updater[field.name];
            }
          });
      });
    }
  }

  handleFieldUpdate () {
    this._updateFormValues();
  }

  handleChildrenUpdate () {
    this._updateFormValues();
  }

  _updateFormValues () {
    this._valuesChangedInternally = true;

    this.formValues = unflatten(Object
      .entries(this.formDom)
      .reduce((result, [key, value]) => ({
        ...result,
        [key]: value.value
      }), {}));

    this._valuesChangedInternally = false;
  }

  render () {
    const { games = [], firstName } = this.formValues || {};

    return html`
      <style>
        :host {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }
      </style>

      <pre>${JSON.stringify(this.formDom, null, 2)}</pre>
      <pre>${JSON.stringify(this.formValues, null, 2)}</pre>

      <div @update="${this.handleFieldUpdate}">
        <label>
          <p>Primeiro nome</p>
          <emd-field
            name="firstName"
          ></emd-field>
        </label>

        ${firstName === 'Leonardo' ? html`
          <label>
            <p>Secret</p>
            <emd-field
              name="secret"
            ></emd-field>
          </label>
        ` : ''}

        <label>
          <p>Último nome</p>
          <emd-field
            name="lastName"
          ></emd-field>
        </label>

        <label>
          <p>Document</p>
          <emd-field
            type="cpf-cnpj"
            name="document"
          ></emd-field>
        </label>

        <label>
          <p>Telefone</p>
          <emd-field
            type="tel"
            name="phone"
          ></emd-field>
        </label>

        <label>
          <p>Dinheiro</p>
          <emd-field
            type="money"
            name="money"
          ></emd-field>
        </label>

        ${(games).map((game, index) => html`
          <label>
            <p>Game ${index + 1}</p>
            <emd-field
              name="games[${index}]"
            ></emd-field>
          </label>
        `)}
      </div>
    `;
  }
};

registerComponent('form-example',
  withComponent(TestLitForm(LitElement)));
