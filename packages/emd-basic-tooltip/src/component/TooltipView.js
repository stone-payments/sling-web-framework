import { html } from '@stone-payments/lit-element';

export const TooltipView = ({ position, text }) => html`
  <style>
    @import url("emd-basic-tooltip/src/component/Tooltip.css")
  </style>
  <div class="emd-tooltip__wrapper">
    <slot></slot>
    <span class="emd-tooltip__text emd-tooltip__text_position_${position || 'right'}">
      ${text}
    </span>
  </div>
`;
