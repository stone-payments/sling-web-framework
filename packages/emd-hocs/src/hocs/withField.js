import { setAttr, toString } from '@stone-payments/emd-helpers';

const BOOLEAN_ATTRS = [
  'disabled',
  'required',
  'readonly',
  'hidden',
  'validating',
  'hideicon'
];

const STRING_ATTRS = [
  'autocomplete',
  'type',
  'name',
  'id',
  'placeholder',
  'validationstatus'
];

export const withField = (Base = class {}) => class extends Base {
  constructor () {
    super();
    this._initializeGettersAndSetters();
    this._handleFieldInput = this._handleFieldInput.bind(this);
    this._handleFieldChange = this._handleFieldChange.bind(this);
  }

  static get observedAttributes () {
    return [
      ...BOOLEAN_ATTRS,
      ...STRING_ATTRS
    ];
  }

  static get _gettersAndSetterConfig () {
    return {
      boolean: BOOLEAN_ATTRS,
      string: STRING_ATTRS
    };
  }

  focus () {
    if (this.field) {
      this.field.focus();
    }
  }

  connectedCallback () {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    this._updateView();
    this._initializeValue();

    this.field.addEventListener('input', this._handleFieldInput);
    this.field.addEventListener('change', this._handleFieldChange);
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }

    this.field.removeEventListener('input', this._handleFieldInput);
    this.field.removeEventListener('change', this._handleFieldChange);
  }

  _initializeGettersAndSetters () {
    const config = this.constructor._gettersAndSetterConfig;

    Object
      .entries(config)
      .forEach(([type, attrNames]) => {
        attrNames.forEach(attrName => {
          Object.defineProperty(this, attrName, {
            get () {
              return type === 'boolean'
                ? this.hasAttribute(attrName)
                : this.getAttribute(attrName);
            },
            set (value) { setAttr(this, attrName, value); }
          });
        });
      });
  }

  _upgradeProperty (propName) {
    if (this.hasOwnProperty(propName)) {
      let value = this[propName];
      delete this[propName];
      this[propName] = value;
    }
  }

  _initializeValue () {
    if (this.hasAttribute('value')) {
      this.value = this.getAttribute('value');
    } else if (this._initialValue) {
      this.value = this._initialValue;
    }
    delete this._initialValue;
  }

  attributeChangedCallback (attrName, pastValue, nextValue) {
    if (super.attributeChangedCallback) {
      super.attributeChangedCallback(attrName, pastValue, nextValue);
    }

    if (pastValue !== nextValue) {
      if (this.field) {
        setAttr(this.field, attrName, nextValue);
      } else {
        Promise.resolve().then(() => {
          if (this.field) {
            setAttr(this.field, attrName, nextValue);
          }
        });
      }
    }

    this._updateView();
  }

  static withRequired (validatorFunc) {
    return value => !value
      ? 'Campo obrigatório'
      : validatorFunc(value);
  }

  get validation () {
    const noop = () => undefined;
    const validatorFn = this._validation || this.defaultValidation || noop;

    return (this.hasAttribute('required'))
      ? this.constructor.withRequired(validatorFn)
      : validatorFn;
  }

  set validation (value) {
    this._validation = value;
  }

  get _processedFieldValue () {
    return this.field
      ? toString(this.field.value)
      : '';
  }
};
