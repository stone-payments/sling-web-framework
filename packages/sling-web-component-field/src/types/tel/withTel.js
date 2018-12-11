import { validateTel } from './validateTel.js';

export const withTel = Base => class extends Base {
  attributeChangedCallback(attrName, previousValue, nextValue) {
    super.attributeChangedCallback(attrName, previousValue, nextValue);

    if (attrName === 'type' && this.type === 'tel') {
      this.defaultValidation = validateTel;
    }
  }
};
