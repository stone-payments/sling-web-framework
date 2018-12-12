import { validateCpf } from './validateCpf.js';
import { maskCpf } from './maskCpf.js';

export const withCpf = Base => class extends Base {
  constructor() {
    super();
    this.mask = maskCpf(this.inputElement);
  }

  attributeChangedCallback(attrName, ...args) {
    super.attributeChangedCallback(attrName, ...args);

    if (attrName === 'type' && this.type === 'cnpj') {
      this.defaultValidation = validateCpf;
    }
  }
};
