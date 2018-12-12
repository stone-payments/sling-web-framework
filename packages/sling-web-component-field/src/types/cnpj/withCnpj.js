import { validateCnpj } from './validateCnpj.js';
import { maskCnpj } from './maskCnpj.js';

export const withCnpj = Base => class extends Base {
  constructor() {
    super();
    this.mask = maskCnpj(this.inputElement);
  }

  attributeChangedCallback(attrName, ...args) {
    super.attributeChangedCallback(attrName, ...args);

    if (attrName === 'type' && this.type === 'cnpj') {
      this.defaultValidation = validateCnpj;
    }
  }
};
