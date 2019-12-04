import { toString, setAttr } from '@stone-payments/emd-helpers';
import { render } from '@stone-payments/lit-html';

const TAB_KEY = 9;

export const SelectController = (Base = class {}) => class extends Base {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    this.renderRoot = this.shadowRoot;
    this.renderer = render;
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  connectedCallback () {
    this._upgradeProperty('options');
    this._upgradeProperty('value');
    super.connectedCallback();
  }

  get autoselectsingle () {
    return this.hasAttribute('autoselectsingle');
  }

  set autoselectsingle (value) {
    setAttr(this, 'autoselectsingle', value);
  }

  get autoreadonly () {
    return this.hasAttribute('autoreadonly');
  }

  set autoreadonly (value) {
    setAttr(this, 'autoreadonly', value);
  }

  get field () {
    return this.renderRoot.querySelector('select');
  }

  get options () {
    return this._options || [];
  }

  set options (options) {
    if (this._valueBeingSet != null) {
      const nextValue = this._valueBeingSet;

      Promise.resolve().then(() => {
        this.value = nextValue;
      });
    }

    const currentValue = this.value;
    this._options = options;

    if (!this._isValidValue(currentValue)) {
      this.value = undefined;
    }

    this.autoreadonly = false;

    if (this.autoselectsingle && this.parsedOptions.length === 1) {
      this.value = this.parsedOptions[0].value;
      this.autoreadonly = true;
    }

    this._updateView();
  }

  get parsedOptions () {
    return this.options
      .map(item => {
        const value = toString(item.value || item);
        const content = toString(item.content || item);
        return { value, content };
      });
  }

  _isValidValue (value) {
    return !value || this.parsedOptions
      .map(item => item.value)
      .includes(value);
  }

  get value () {
    return this._processedFieldValue;
  }

  set value (value) {
    this._valueBeingSet = value;

    Promise.resolve().then(() => {
      this._valueBeingSet = undefined;
    });

    const pastValue = this._processedFieldValue;

    const nextValue = this._isValidValue(toString(value))
      ? toString(value)
      : '';

    if (!this.field) {
      this._initialValue = value;
    } else if (pastValue !== nextValue) {
      this.field.value = nextValue;
      this.dispatchEventAndMethod('update', nextValue);
      this._handleFieldValidation(nextValue);
      this._updateView();
    }
  }

  get selection () {
    const currentOption = (this.field && this.field.value)
      ? this.parsedOptions.find(option => option.value === this.field.value)
      : undefined;

    return currentOption
      ? currentOption.content
      : toString(this.placeholder);
  }

  _handleFieldInput (evt) {
    evt.stopPropagation();
  }

  _handleFieldChange (evt) {
    this.dispatchEventAndMethod('update', this.field.value);
    this._handleFieldValidation(this.field.value);
    this._updateView();
    evt.stopPropagation();
  }

  _handleFieldBlur () {
    this._handleFieldValidation(this.field.value);
  }

  _updateView () {
    this.renderer(this.render(), this.renderRoot);
  }

  handleKeydown (evt) {
    if (this.readonly && evt.which !== TAB_KEY) {
      evt.preventDefault();
    }
  }

  render () {
    return this.currentView.apply(this);
  }
};
