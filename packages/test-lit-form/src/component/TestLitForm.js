import { html } from 'sling-framework';
import { omit } from 'sling-helpers';
import { withForm } from 'sling-web-component-form';

import {
  validateNotAdmin,
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
      <input
        type="text"
        name="username"
        value="${values.username}"
        validation="${validateNotAdmin}"
        oninput="${this.handleInput}"
        onblur="${this.handleInput}"
      />
    
      <p>${errors.username}</p>

      ${values.friends && values.friends.map((_, index) => html`
        <input
          type="text"
          name="friends[${index}]"
          value="${values.friends[index]}"
          validation="${validateRequired}"
          oninput="${this.handleInput}"
          onblur="${this.handleInput}"
        />

        <p>${errors.friends[index]}</p>
      `)}

      <pre>
        ${JSON.stringify(omit(this.state, 'byId'), null, 2)}
      </pre>
    `;
  }
};
