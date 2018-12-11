import { validateEmail } from './validateEmail.js';

export const withEmail = Base => class extends Base {
  attributeChangedCallback(attrName, previousValue, nextValue) {
    super.attributeChangedCallback(attrName, previousValue, nextValue);

    if (attrName === 'type' && this.type === 'email') {
      this.defaultValidation = validateEmail;
    }
  }
};
