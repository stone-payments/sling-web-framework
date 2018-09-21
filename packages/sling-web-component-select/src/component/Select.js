import { SlingElement, html } from 'sling-framework';

export class Select extends SlingElement {
  constructor() {
    super();
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static get properties() {
    return {
      disabled: {
        type: Boolean,
        reflectToAttribute: true,
      },
      label: {
        type: String,
        reflectToAttribute: true,
      },
      name: {
        type: String,
        reflectToAttribute: true,
      },
      placeholder: {
        type: String,
        reflectToAttribute: true,
      },
      srcoptions: {
        type: Array,
      },
      size: {
        type: Number,
        reflectToAttribute: true,
      },
      value: {
        type: String,
        reflectToAttribute: true,
        observer: 'dispatchUpdateEvent',
      },
      validationmessage: {
        type: String,
        reflectToAttribute: true,
      },
      validationstatus: {
        type: String,
        reflectToAttribute: true,
      },
    };
  }

  handleChange({ target }) {
    this.value = target.value;
  }

  handleBlur({ target }) {
    this.dispatchEventAndMethod('fieldblur', { target });
  }

  handleFocus({ target }) {
    this.dispatchEventAndMethod('fieldfocus', { target });
  }

  dispatchUpdateEvent(newValue, oldValue) {
    if (oldValue !== newValue) {
      this.dispatchEventAndMethod('update', { value: this.value });
    }
  }

  render() {
    const { srcoptions = [] } = this;

    return html`
      <style>
        @import url('sling-web-component-select/src/index.css');
      </style>

      <label class="emd-select__label">${this.label}
        <select
          class="emd-select"
          onblur="${this.handleBlur}"
          onfocus="${this.handleFocus}"
          onchange="${this.handleChange}"
          disabled="${this.disabled}"
          name="${this.name}"
          size="${this.size}"
          value="${this.value}">
          <option value="" disabled hidden selected="${this.value == null}">
            ${this.placeholder || 'Select a value'}
          </option>
          ${srcoptions.map(option => html`
            <option value="${option.id}" selected="${String(option.id) === String(this.value)}">
              ${option.name}
            </option>
          `)}
        </select>
        <p class="emd-select__tips">${this.validationmessage}</p>
      </label>
    `;
  }
}
