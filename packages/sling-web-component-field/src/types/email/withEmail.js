import { validateEmail } from './validateEmail.js';

export const withEmail = Base => class extends Base {
  attributeChangedCallback(attrName, ...args) {
    super.attributeChangedCallback(attrName, ...args);

    if (attrName === 'type' && this.type === 'email') {
      this.updateDefaultValidationAndMask(validateEmail);
    }
  }
};
