import { html } from '@stone-payments/lit-element';

export const DrawerView = ({
  direction = 'vertical',
  delay = 360,
  effect = 'sliding'
}) => {
  const directionClass = ` emd-drawer__wrapper_direction_${direction}`;
  const effectClass = ` emd-drawer__wrapper_effect_${effect}`;
  const customDelayStyle = delay ? `transition-duration: ${delay}ms` : '';

  return html`
    <style>
      @import url("emd-basic-drawer/src/component/Drawer.css")
    </style>
    <div
      class="emd-drawer__wrapper${directionClass}${effectClass}"
      style="${customDelayStyle}">
      <slot></slot>
    </div>
  `;
};
