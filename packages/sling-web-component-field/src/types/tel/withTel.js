import { validateTel } from './validateTel.js';
import { maskTel } from './maskTel.js';

export const withTel = Base => class extends Base {
  constructor() {
    super();
    this.mask = maskTel(this.inputElement);
  }

  attributeChangedCallback(attrName, ...args) {
    super.attributeChangedCallback(attrName, ...args);

    if (attrName === 'type' && this.type === 'tel') {
      this.defaultValidation = validateTel;
    }
  }
};
