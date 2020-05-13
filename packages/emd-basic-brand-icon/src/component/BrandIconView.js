import { html } from '@stone-payments/lit-element';

export const BrandIconView = ({
  iconView,
  iconKey,
  stoneIconView,
  isUnknownIcon
}) => {
  let iconClass = iconView
    ? `emd-brand-icon__${iconKey.toLowerCase()}`
    : 'emd-brand-icon__unknown';
  iconClass += ' emd-brand-icon__wrapper';

  return html`
    <style>
      @import url("emd-basic-brand-icon/src/component/BrandIcon.css")
    </style>
    ${!isUnknownIcon ? html`
      <div class="${iconClass}">
        ${iconView || stoneIconView}
      </div>
    ` : ''}
  `;
};
