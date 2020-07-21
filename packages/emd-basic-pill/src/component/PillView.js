import { html } from '@stone-payments/lit-element';

export const PillView = () => html`
  <style>
    @import url("emd-basic-pill/src/component/Pill.css")
  </style>
  <div class="emd-pill__wrapper">
    <slot></slot>
  </div>
`;
