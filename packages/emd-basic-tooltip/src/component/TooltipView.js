import { html } from '@stone-payments/lit-element';

export const TooltipView = ({ position = 'right', text, target }) => {
  let wrapperClass = 'emd-tooltip__wrapper';
  wrapperClass += target ? ' emd-tooltip__wrapper_targeted' : '';

  let tooltipTextClass = 'emd-tooltip__text';
  tooltipTextClass += ` emd-tooltip__text_position_${position}`;

  return html`
    <style>
      @import url("emd-basic-tooltip/src/component/Tooltip.css")
    </style>
    <div class="${wrapperClass}">
      <slot></slot>
      <span class="${tooltipTextClass}">
        ${text}
      </span>
    </div>
  `;
};
