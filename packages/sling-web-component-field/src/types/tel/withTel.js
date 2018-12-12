import { validateTel } from './validateTel.js';
import { maskTel } from './maskTel.js';

export const withTel = Base => class extends Base {
  attributeChangedCallback(attrName, ...args) {
    super.attributeChangedCallback(attrName, ...args);

    if (attrName === 'type' && this.type === 'tel') {
      this.updateDefaultValidation(validateTel);
      this.updateMask(maskTel);
    }
  }
};
