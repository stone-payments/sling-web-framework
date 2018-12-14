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
    const { values, errors } = this.state;

    return html`
      <input name="username" validation="${validateUsernameAvailability}">
      <p>${errors.username}</p>

      ${values.friends && values.friends.map((_, index) => html`
        <input name="friends[${index}]" validation="${validateRequired}">
        <p>${errors.friends[index]}</p>
      `)}

      <pre>
        ${JSON.stringify(omit(this.state, 'byId'), null, 2)}
      </pre>
    `;
  }
};
