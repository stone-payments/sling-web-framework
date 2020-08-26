import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-loader';

export const ButtonView = ({
  type,
  disabled,
  loading,
  href,
  target = '',
  handleClick,
  showIcon
}) => {
  let wrapperClass = 'emd-button__wrapper';
  wrapperClass += loading ? ' emd-button__wrapper_loading' : '';
  wrapperClass += disabled ? ' emd-button__wrapper_disabled' : '';

  return html`
    <style>
      @import url("emd-basic-button/src/component/Button.css")
    </style>
    <div
      class="${wrapperClass}"
      @click="${handleClick}">
      <emd-loader
        ?loading="${loading}"
        class="emd-button__loader">
      </emd-loader>
      ${href ? html`
        <a
          href="${href}"
          target="${target}"
          class="emd-button__button emd-button__button_href">
          ${showIcon ? html`
            <span class="emd-button__icon">
              <slot name="icon"></slot>
            </span>
          ` : ''}
          <span class="emd-button__text">
            <slot></slot>
          </span>
        </a>
      ` : html`
        <button
          .type="${type}"
          ?disabled="${disabled}"
          class="emd-button__button">
          ${showIcon ? html`
            <span class="emd-button__icon">
              <slot name="icon"></slot>
            </span>
          ` : ''}
          <span class="emd-button__text">
            <slot></slot>
          </span>
        </button>
      `}
    </div>
  `;
};
