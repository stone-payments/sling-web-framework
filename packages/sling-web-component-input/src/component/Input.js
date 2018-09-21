import { html, SlingElement } from '../../node_modules/sling-web-framework/src/index.js';
import { imask } from '../../node_modules/sling-web-helpers/src/index.js';

export class Input extends SlingElement {
  constructor() {
    super();
    this.mask = { resolve: value => value };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.formatType = this.formatType.bind(this);
  }

  static get properties() {
    return {
      autocomplete: {
        type: String,
        reflectToAttribute: true,
      },
      checked: {
        type: Boolean,
        reflectToAttribute: true,
      },
      disabled: {
        type: Boolean,
        reflectToAttribute: true,
      },
      label: {
        type: String,
        reflectToAttribute: true,
      },
      type: {
        type: String,
        reflectToAttribute: true,
        observer: 'formatType',
      },
      required: {
        type: Boolean,
        reflectToAttribute: true,
      },
      max: {
        type: Number,
        reflectToAttribute: true,
      },
      maxlength: {
        type: Number,
        reflectToAttribute: true,
      },
      min: {
        type: Number,
        reflectToAttribute: true,
      },
      minlength: {
        type: Number,
        reflectToAttribute: true,
      },
      name: {
        type: String,
        reflectToAttribute: true,
      },
      pattern: {
        type: String,
        reflectToAttribute: true,
      },
      placeholder: {
        type: String,
        reflectToAttribute: true,
      },
      readonly: {
        type: Boolean,
        reflectToAttribute: true,
      },
      size: {
        type: Number,
        reflectToAttribute: true,
      },
      src: {
        type: String,
        reflectToAttribute: true,
      },
      step: {
        type: Number,
        reflectToAttribute: true,
      },
      validationmessage: {
        type: String,
        reflectToAttribute: true,
      },
      validationstatus: {
        type: String,
        reflectToAttribute: true,
      },
      value: {
        type: String,
        reflectToAttribute: true,
        observer: 'updateValue',
      },
    };
  }

  handleInput({ target }) {
    this.value = target.value;
  }

  handleBlur({ target }) {
    this.dispatchEventAndMethod('fieldblur', { target });
  }

  handleFocus({ target }) {
    this.dispatchEventAndMethod('fieldfocus', { target });
  }

  formatType(type = '') {
    if (type) {
      switch (type) {
        case 'cnpj': {
          this.mask = imask.createMask({
            mask: '00.000.000/0000-00',
          });
          this.maxlength = 18;
          break;
        }
        case 'cpf': {
          this.mask = imask.createMask({
            mask: '000.000.000-00',
          });
          this.maxlength = 14;
          break;
        }
        case 'phone': {
          this.mask = imask.createMask({
            mask: [{
              mask: '(00) 0000-0000',
            }, {
              mask: '(00) 00000-0000',
            }],
            dispatch(appended, dynamicMasked) {
              if (appended.length < 15) {
                return dynamicMasked.compiledMasks[0];
              }
              return dynamicMasked.compiledMasks[1];
            },
          });
          this.maxlength = 15;
          break;
        }
        case 'cep': {
          this.mask = imask.createMask({
            mask: '00000-000',
          });
          break;
        }
        case 'digits': {
          this.mask = imask.createMask({
            mask: /^\d+$/,
          });
          break;
        }
        default: {
          break;
        }
      }
    }
    return type;
  }

  updateValue(value, oldValue) {
    if (value !== oldValue) {
      this.value = this.mask.resolve(value);
      this.dispatchEventAndMethod('update', { value });
    }
  }

  render() {
    return html`
    <style>
      @import url('../sling-web-component-input/src/index.css');
    </style>
    
    <label class="emd-input__label">${this.label} 
      <input 
        autocomplete="${this.autocomplete}"
        checked="${this.checked}"
        class="emd-input"
        disabled="${this.disabled}"
        max="${this.max}"
        maxLength="${this.maxlength}" 
        min="${this.min}"
        minLength="${this.minlength}"
        name="${this.name}"
        onblur="${this.handleBlur}"
        onfocus="${this.handleFocus}"
        oninput="${this.handleInput}"
        pattern="${this.pattern}"
        placeholder="${this.placeholder}"
        readOnly="${this.readonly}"
        required="${this.required}"
        size="${this.size}"
        src="${this.src}"
        step="${this.step}"
        type="${this.type}"
        value="${this.value || ''}">
      <p class="emd-input__tips">${this.validationmessage}</p>
    </label>
   `;
  }
}
