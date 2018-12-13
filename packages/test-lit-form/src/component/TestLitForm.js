import { html } from 'sling-framework';
import { withForm } from 'sling-web-component-form';
import { validateNotAdmin } from './customValidations.js';

export const TestLitForm = Base => class extends withForm(Base) {
  constructor() {
    super();
    this.values = {
      username: '',
      friends: ['augusto', 'alberto'],
    };
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

      ${values.friends.map((_, index) => html`
        <input
          type="text"
          name="friends[${index}]"
          value="${values.friends[index]}"
          oninput="${this.handleInput}"
          onblur="${this.handleInput}"
        />
      `)}

      <pre>
        ${JSON.stringify(this.state, null, 2)}
      </pre>
    `;
  }
};
