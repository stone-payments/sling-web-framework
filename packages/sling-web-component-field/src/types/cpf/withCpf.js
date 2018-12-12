import { validateCpf } from './validateCpf.js';
import { maskCpf } from './maskCpf.js';

export const withCpf = Base => class extends Base {
  attributeChangedCallback(attrName, ...args) {
    super.attributeChangedCallback(attrName, ...args);

    if (attrName === 'type' && this.type === 'cpf') {
      this.updateDefaultValidation(validateCpf);
      this.updateMask(maskCpf);
    }
  }
};
