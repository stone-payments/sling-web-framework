import { html, LitElement } from '@stone-payments/lit-element';
import { withComponent } from '@stone-payments/emd-hocs';
import { registerComponent } from '@stone-payments/emd-helpers';
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
      _formValues: {
        type: Object,
        reflect: false
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

  _updateField (field) {
    const path = field.name;
    const maskedValue = field.value;
    const unmaskedValue = field.mask
      ? field.mask.unmaskedValue
      : field.value;

    const { masked = {}, unmasked = {} } = this._formValues || {};

    this._formValues = {
      ...this._formValues,
      masked: { ...masked, [path]: maskedValue },
      unmasked: { ...unmasked, [path]: unmaskedValue }
    };
  }

  get formValues () {
    const { unmasked = {} } = this._formValues || {};
    return unmasked;
  }

  set formValues (values) {
    console.log('VALUES CHANGED FROM OUTSIDE');

    const lastFieldsCount = this.formFields.length;

    Object
      .entries(values)
      .forEach(([key, value]) => {
        const field = this.formFields.find(field => field.name === key);
        if (field) {
          field.value = value;
        }
      });

    this.updateComplete.then(() => {
      if (lastFieldsCount !== this.formFields.length) {
        console.log('FIELDS CHANGED WHILE UPDATING');
        this.formValues = values;
      }
    });
  }

  handleFieldUpdate ({ target: field }) {
    console.log('VALUES CHANGED FROM INSIDE');

    this._updateField(field);
  }

  handleChildrenUpdate () {
    console.log('FIELD(S) ADDED OR REMOVED');

    this._formValues = {};
    this.formFields.forEach(field => {
      this._updateField(field);
    });
  }

  render () {
    console.log('RENDER TRIGGERED');

    return html`
      <div @update="${this.handleFieldUpdate}">
        <label>
          <p>Primeiro nome</p>
          <emd-field
            name="firstName"
          ></emd-field>
        </label>

        ${this.formValues.firstName === 'Leonardo' ? html`
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
      </div>
    `;
  }
};

registerComponent('form-example',
  withComponent(TestLitForm(LitElement)));
