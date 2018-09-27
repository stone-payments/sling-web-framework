import { SlingElement, html } from 'sling-framework';

export class Select extends SlingElement {
  constructor() {
    super();
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

  dispatchUpdateEvent(newValue, oldValue) {
    if (oldValue !== newValue) {
      this.dispatchEventAndMethod('input', { value: this.value });
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
