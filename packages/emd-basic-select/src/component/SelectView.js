import { html } from '@stone-payments/lit-html';
import '@stone-payments/emd-basic-icon';
import '@stone-payments/emd-basic-loader';

export const SelectView = ({
  parsedOptions,
  value,
  placeholder,
  selection,
  validating,
  validationstatus,
  hideicon
}) => {
  let show = validating ? 'validating' : undefined;

  show = (validationstatus != null && validationstatus !== '')
    ? validationstatus
    : show;

  show = hideicon ? undefined : show;

  const showClass = 'emd-field__states emd-field__states_show_unfold' +
    (show ? ` emd-field__states_show_${show}` : '');

  const placeholderClass = placeholder === selection
    ? ' emd-field__text_placeholder'
    : '';

  const iconsClass = ` emd-field__wrapper_icons_${show ? 2 : 1}`;

  return html`
    <style>
      @import url("emd-basic-select/src/component/Select.css")
    </style>
    <div class="emd-field__wrapper${iconsClass}">
      <select class="emd-field__select">
        <option
          value=""
          disabled
          hidden
          ?selected="${value === ''}">
          ${placeholder}
        </option>
        ${parsedOptions.map(option => html`
          <option
            value="${option.value}"
            ?selected="${option.value === value}">
            ${option.content}
          </option>
        `)}
      </select>
      <input
        class="emd-field__text${placeholderClass}"
        value="${selection}"
        tabindex="-1"
        readonly/>
      <div class="${showClass}">
        <div class="emd-field__state">
          <emd-loader
            class="emd-field__icon emd-field__icon_validating"
            loading>
          </emd-loader>
          <emd-icon
            class="emd-field__icon emd-field__icon_error"
            icon="alert-circle">
          </emd-icon>
          <emd-icon
            class="emd-field__icon emd-field__icon_success"
            icon="success-circle">
          </emd-icon>
        </div>
        <div class="emd-field__state">
          <emd-icon
            class="emd-field__icon emd-field__icon_unfold"
            icon="unfold">
          </emd-icon>
        </div>
      </div>
    </div>
  `;
};
