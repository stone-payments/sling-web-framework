import { html } from '@stone-payments/lit-element';

export const FieldWrapperView = ({
  label,
  hint,
  emptyhint,
  message
}) => html`
  <style>
    @import url("emd-basic-field-wrapper/src/component/FieldWrapper.css")
  </style>
  ${label ? html`
    <div class="emd-field-wrapper__label">${label}</div>
  ` : ''}
  <slot></slot>
  ${message ? html`
    <div class="emd-field-wrapper__message">${message}</div>
  ` : (hint != null && hint !== '') || emptyhint ? html`
    <div class="emd-field-wrapper__hint">${hint}</div>
  ` : ''}
`;
