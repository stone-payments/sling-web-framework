import { html } from '@stone-payments/lit-element';

export const TooltipView = ({
  position = 'right',
  text,
  target,
  targetActive,
  isReady
}) => {
  let wrapperClass = 'emd-tooltip__wrapper';

  wrapperClass += target
    ? ' emd-tooltip__wrapper_targeted'
    : ' emd-tooltip__wrapper_legacy';

  wrapperClass += target && targetActive
    ? ' emd-tooltip__wrapper_active'
    : '';

  let tooltipTextClass = 'emd-tooltip__text';

  tooltipTextClass += ` emd-tooltip__text_position_${position}`;

  tooltipTextClass += isReady
    ? ' emd-tooltip__text_ready'
    : '';

  return html`
    <style>
      @import url("emd-basic-tooltip/src/component/Tooltip.css")
    </style>
    ${target ? html`
      <div class="${wrapperClass}">
        <span class="${tooltipTextClass}">
          <slot></slot>
        </span>
      </div>
    ` : html`
      <div class="${wrapperClass}">
        <slot></slot>
        <span class="${tooltipTextClass}">
          ${text}
        </span>
      </div>
    `}
  `;
};
