import { html } from 'sling-framework';
import { omit } from 'sling-helpers';
import { withForm } from 'sling-web-component-form';

import {
  validateUsernameAvailability,
  validateRequired,
} from './customValidations.js';

export const TestLitForm = Base => class extends withForm(Base) {
  constructor() {
    super();

    this.setValues({
      username: '',
      friends: ['augusto', 'alberto'],
    });
  }

  render() {
    const { values, errors, isValidatingField } = this.state;

    return html`
      <input
        name="username"
        value="${values.username}"
        className="${isValidatingField.username ? 'validating' : ''}"
        validation="${validateUsernameAvailability}"
        oninput="${this.handleInput}"
        onblur="${this.handleBlur}"
        autocomplete="off">

      <p>${!isValidatingField.username ? errors.username : ''}</p>

      ${values.friends && values.friends.map((_, index) => html`
        <input
          name="friends[${index}]"
          value="${values.friends[index]}"
          className="${isValidatingField.friends[index] ? 'validating' : ''}"
          validation="${validateRequired}"
          oninput="${this.handleInput}"
          onblur="${this.handleBlur}">

        <p>${!isValidatingField.friends[index] ? errors.friends[index] : ''}</p>
      `)}

      <pre>
        ${JSON.stringify(omit(this.state, 'byId'), null, 2)}
      </pre>
    `;
  }
};
