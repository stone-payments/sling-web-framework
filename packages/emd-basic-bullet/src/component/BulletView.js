import { html } from '@stone-payments/lit-element';

export const BulletView = () => html`
  <style>
    @import url("emd-basic-bullet/src/component/Bullet.css")
  </style>

  <div class="emd-bullet__wrapper">
    <div class="emd-bullet__bullet">
      <div class="emd-bullet__bullet-icon"></div>
    </div>
    <span class="emd-bullet__text">
      <slot></slot>
    </span>
  </div>
`;
