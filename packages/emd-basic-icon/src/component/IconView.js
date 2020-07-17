import { html } from '@stone-payments/lit-element';

export const IconView = ({ iconSvg, icon }) => html`
  <style>
    @import url("emd-basic-icon/src/component/Icon.css")
  </style>
  <div class="emd-icon__wrapper emd-icon__wrapper_${icon}">
    ${iconSvg}
  </div>
`;
