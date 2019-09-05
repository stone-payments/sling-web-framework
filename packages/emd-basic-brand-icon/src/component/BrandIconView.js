import { html } from '@stone-payments/lit-element';

export const BrandIconView = ({ iconSvg, icon }) => html`
  <style>
    @import url("emd-basic-brand-icon/src/component/BrandIcon.css")
  </style>
  <div class="emd-brand-icon__wrapper emd-brand-icon__wrapper_${icon}">
    ${iconSvg}
  </div>
`;
