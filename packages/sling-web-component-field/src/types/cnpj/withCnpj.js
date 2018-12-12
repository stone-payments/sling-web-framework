import { validateCnpj } from './validateCnpj.js';
import { maskCnpj } from './maskCnpj.js';

export const withCnpj = Base => class extends Base {
  attributeChangedCallback(attrName, ...args) {
    super.attributeChangedCallback(attrName, ...args);

    if (attrName === 'type' && this.type === 'cnpj') {
      this.updateDefaultValidation(validateCnpj);
      this.updateMask(maskCnpj);
    }
  }
};
