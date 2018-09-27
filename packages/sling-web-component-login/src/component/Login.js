import { globalHelper } from '../../node_modules/sling-web-helpers/src/index.js';
import '../../node_modules/sling-web-component-button/src/index.js';
import '../../node_modules/sling-web-component-input/src/index.js';

/**
 * The Login Component uses the GIM API to log the user and dispatches an event called 'loginResponse', which you can listen, treating the response.
 */
export class ScLogin extends HTMLElement {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.attachShadow({ mode: 'open' });
  }

  /**
   * @return {string} errorMessage.
   */
  get errorMessage() {
    return this._errorMessage;
  }

  /**
   * @param {string} value - new value for the errorMessage variable.
   */
  set errorMessage(value) {
    this._errorMessage = value;
    this.handleError(value);
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('../sling-web-component-login/src/index.css');
      </style>
      <div class="login">
        <p class="login__title">
          Acesse Sua Conta
        </p>
        <sling-input
          id="email"
          required="true"
          type="email"
          label="Email">
        </sling-input>
        <sling-input
          id="pw"
          required="true"
          type="password"
          label="Senha">
        </sling-input>
        <p class="login__error"></p>
        <sling-button color="success">Entrar</sling-button>
      </div>
    `;
    this.setupLogin();
  }

  /**
   * Button click handler. This handler in particular is what actually executes the SDK login function
   */
  handleClick() {
    if (globalHelper.isFunction(this.onSubmit)) {
      this.$login__error.innerText = '';
      const email = this.$email.value;
      const password = this.$password.value;
      this.onSubmit({ email, password });
    }
  }

  /**
   * Updates the error message shown in the Component view
   */
  handleError(value) {
    this.$login__error.innerText = value;
  }

  /**
   * Setup the login component, adding the necessary class variables and the event listeners
   */
  setupLogin() {
    this.$login__error = this.shadowRoot.querySelector('.login__error');
    this.$email = this.shadowRoot.querySelector('#email');
    this.$password = this.shadowRoot.querySelector('#pw');
    this.$button = this.shadowRoot.querySelector('sling-button');
    this.$button.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.$button.removeEventListener('click', this.handleClick);
  }
}
