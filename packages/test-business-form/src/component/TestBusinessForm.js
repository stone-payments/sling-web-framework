import { TestBusinessFormView } from './TestBusinessFormView.js';
import * as validations from './validations.js';

export const TestBusinessForm = Base => class extends Base {
  connectedCallback() {
    super.connectedCallback();
    this.formElement = this.shadowRoot.querySelector('sling-form');
  }

  render() {
    return TestBusinessFormView({ ...validations });
  }
};
