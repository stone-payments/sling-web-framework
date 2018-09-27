import { isFunction } from 'sling-helpers';
import 'sling-web-component-button';
import 'sling-web-component-input';

export class ScLogin extends HTMLElement {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.attachShadow({ mode: 'open' });
  }

  get errorMessage() {
    return this._errorMessage;
  }

  set errorMessage(value) {
    this._errorMessage = value;
    this.handleError(value);
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('sling-web-component-login/src/index.css');
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

  handleClick() {
    if (isFunction(this.onSubmit)) {
      this.$login__error.innerText = '';
      const email = this.$email.value;
      const password = this.$password.value;
      this.onSubmit({ email, password });
    }
  }

  handleError(value) {
    this.$login__error.innerText = value;
  }

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
