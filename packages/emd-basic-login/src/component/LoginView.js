import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-button';
import '@stone-payments/emd-basic-field';
import '@stone-payments/emd-basic-field-wrapper';
import '@stone-payments/emd-basic-form';
import '@stone-payments/emd-basic-icon';

const getSlideClass = (index, step) => {
  if (index + 1 === step) {
    return ' emd-login__slide_current';
  }

  return (index + 1 < step)
    ? ' emd-login__slide_before'
    : ' emd-login__slide_after';
};

export const LoginView = ({
  setStep,
  handleForgotEmail,
  handleForgotPassword,
  handleSubmitSuccess,
  handleSubmitError,
  handleKeyPress,
  handleTransitionEnd,
  email,
  step,
  loading
}) => html`
  <style>
    @import url("emd-basic-login/src/component/Login.css")
  </style>
  <div class="emd-login__slideshow">
    <div
      @transitionend="${handleTransitionEnd}"
      class="emd-login__slide${getSlideClass(0, step)} emd-login__slide_email">
      <h1 class="emd-login__title">
        <span
          class="emd-login__title-text">
          <slot>Acesse sua Conta</slot>
        </span>
      </h1>
      <emd-form
        @submitsuccess="${handleSubmitSuccess}"
        @submiterror="${handleSubmitError}"
        @keypress="${handleKeyPress}"
        class="emd-login__form emd-login__form_email">
        <emd-field-wrapper
          label="E-mail"
          class="emd-login__field-wrapper"
          emptyhint>
          <emd-field
            name="email"
            type="email"
            class="emd-login__field"
            required
            hideicon>
          </emd-field>
        </emd-field-wrapper>
        <emd-button
          ontouchstart
          type="button"
          @click="${handleForgotEmail}"
          class="emd-login__button emd-login__button_secondary">
          Esqueci meu&nbsp;e&#8209;mail
        </emd-button>
        <emd-button
          ontouchstart
          type="submit"
          ?loading="${loading}"
          class="emd-login__button emd-login__button_primary">
          Próximo
        </emd-button>
      </emd-form>
    </div>
    <div
      @transitionend="${handleTransitionEnd}"
      class="emd-login__slide${getSlideClass(1, step)} emd-login__slide_password">
      <span
        ontouchstart
        @click="${setStep(1)}"
        class="emd-login__title">
        <emd-button
          type="button"
          class="emd-login__title-text">
          ${email}
        </emd-button>
        <emd-icon
          icon="edit"
          class="emd-login__icon">
        </emd-icon>
      </span>
      <emd-form
        @submitsuccess="${handleSubmitSuccess}"
        @submiterror="${handleSubmitError}"
        @keypress="${handleKeyPress}"
        class="emd-login__form emd-login__form_password">
        <emd-field-wrapper
          label="Senha"
          class="emd-login__field-wrapper"
          emptyhint>
          <emd-field
            name="password"
            type="password"
            class="emd-login__field"
            required
            hideicon>
          </emd-field>
        </emd-field-wrapper>
        <emd-button
          ontouchstart
          type="button"
          @click="${handleForgotPassword}"
          class="emd-login__button emd-login__button_secondary">
          Esqueci minha&nbsp;senha
        </emd-button>
        <emd-button
          ontouchstart
          type="submit"
          ?loading="${loading}"
          class="emd-login__button emd-login__button_primary">
          Entrar
        </emd-button>
      </emd-form>
    </div>
  </div>
`;
