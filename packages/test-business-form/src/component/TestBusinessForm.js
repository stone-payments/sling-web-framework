import * as validations from './customValidations';
import { TestBusinessFormView } from './TestBusinessFormView.js';

export const TestBusinessForm = Base => class extends Base {
  connectedCallback() {
    super.connectedCallback();
    this.formElement = this.shadowRoot.querySelector('sling-form');
    this.friendsCount = 0;
  }

  static get properties() {
    return {
      friendsCount: {
        type: Number,
        reflectToAttribute: false,
      },
    };
  }

  render() {
    const { friendsCount } = this;

    return TestBusinessFormView({
      ...validations,
      friendsCount,
    });
  }
};
