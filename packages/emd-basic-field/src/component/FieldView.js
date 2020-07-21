import { html } from '@stone-payments/lit-html';
import '@stone-payments/emd-basic-icon';
import '@stone-payments/emd-basic-loader';

export const FieldView = ({
  validating,
  validationstatus,
  hideicon
}) => {
  let show = validating ? 'validating' : undefined;

  show = (validationstatus != null && validationstatus !== '')
    ? validationstatus
    : show;

  show = hideicon && show !== 'validating' ? undefined : show;

  const showClass = 'emd-field__states' +
    (show ? ` emd-field__states_show_${show}` : '');

  const iconsClass = show
    ? ' emd-field__wrapper_icons_1'
    : '';

  return html`
    <style>
      @import url("emd-basic-field/src/component/Field.css")
    </style>
    <div class="emd-field__wrapper${iconsClass}">
      <input class="emd-field__text"/>
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
      </div>
    </div>
  `;
};
