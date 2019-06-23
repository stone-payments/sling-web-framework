import { html } from '@stone-payments/lit-element';

export const DrawerView = ({
  direction,
  delay
}) => {
  const directionClass = ` emd-drawer__wrapper_direction_${direction}`;
  const customDelayStyle = delay ? `transition-duration: ${delay}ms` : '';

  return html`
    <style>
      @import url("emd-basic-drawer/src/component/Drawer.css")
    </style>
    <div
      class="emd-drawer__wrapper${directionClass}"
      style="${customDelayStyle}">
      <slot></slot>
    </div>
  `;
};
