import { html, LitElement } from '@stone-payments/lit-element';
import { withComponent } from '@stone-payments/emd-hocs';
import { registerComponent, flatten, unflatten, getIn } from '@stone-payments/emd-helpers';
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

const TestLitForm = (Base = class {}) => class extends Base {
  constructor () {
    super();
    this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
    this.handleChildrenUpdate = this.handleChildrenUpdate.bind(this);
  }

  connectedCallback () {
    super.connectedCallback();
    this._observer = new MutationObserver(this.handleChildrenUpdate);

    this._observer.observe(this.renderRoot, {
      childList: true,
      subtree: true
    });
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    this._observer.disconnect();
  }

  static get properties () {
    return {
      formValues: {
        type: Object,
        reflect: false
      }
    };
  }

  static get fieldSelector () {
    return FIELD_TYPES.join(', ');
  }

  get formValues () {
    return {
      masked: unflatten(getIn(this, '_formValues.masked') || {}),
      unmasked: unflatten(getIn(this, '_formValues.unmasked') || {})
    };
  }

  set formValues (values = {}) {
    console.log('VALUE CHANGED FROM OUTSIDE');
    const oldValues = this._formValues;

    this._formValues = {
      masked: flatten(values),
      unmasked: flatten(values)
    };

    this.requestUpdate('formValues', oldValues);
  }

  get formFields () {
    return Array.from(this.renderRoot
      .querySelectorAll(this.constructor.fieldSelector) || []);
  }

  _updateFormValueWithField (field) {
    const path = field.name;
    const maskedValue = field.value;
    const unmaskedValue = field.mask
      ? field.mask.unmaskedValue
      : field.value;

    const { masked = {}, unmasked = {} } = this._formValues || {};

    const oldValues = this._formValues;

    this._formValues = {
      masked: { ...masked, [path]: maskedValue },
      unmasked: { ...unmasked, [path]: unmaskedValue }
    };

    this.requestUpdate('formValues', oldValues);
  }

  handleFieldUpdate ({ target: field }) {
    console.log('VALUE CHANGED FROM INSIDE');
    this._updateFormValueWithField(field);
  }

  handleChildrenUpdate () {
    console.log('FIELD(S) ADDED OR REMOVED');
    this._formValues = {};

    this.formFields.forEach(field => {
      this._updateFormValueWithField(field);
    });
  }

  render () {
    console.log('RENDER TRIGGERED');
    const { masked = {} } = this.formValues || {};

    return html`
      <div @update="${this.handleFieldUpdate}">
        <label>
          <p>Primeiro nome</p>
          <emd-field
            name="firstName"
            .value="${masked.firstName}"
          ></emd-field>
        </label>

        ${masked.firstName === 'Leonardo' ? html`
          <label>
            <p>Secret</p>
            <emd-field
              name="secret"
              .value="${masked.secret}"
            ></emd-field>
          </label>
        ` : ''}

        <label>
          <p>Último nome</p>
          <emd-field
            name="lastName"
            .value="${masked.lastName}"
          ></emd-field>
        </label>

        <label>
          <p>Document</p>
          <emd-field
            type="cpf-cnpj"
            name="document"
            .value="${masked.document}"
          ></emd-field>
        </label>

        <label>
          <p>Telefone</p>
          <emd-field
            type="tel"
            name="phone"
            .value="${masked.phone}"
          ></emd-field>
        </label>

        <label>
          <p>Dinheiro</p>
          <emd-field
            type="money"
            name="money"
            .value="${masked.money}"
          ></emd-field>
        </label>

        ${(masked.games || []).map((game, index) => html`
          <label>
            <p>Jogo ${index + 1}</p>
            <emd-field
              name="games[${index}]"
              .value="${game}"
            ></emd-field>
          </label>
        `)}
      </div>
    `;
  }
};

registerComponent('form-example',
  withComponent(TestLitForm(LitElement)));
