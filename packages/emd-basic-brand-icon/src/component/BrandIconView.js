import { html } from '@stone-payments/lit-element';

export const BrandIconView = ({
  iconSvg,
  icon,
  stoneIcon,
  isUnknownIcon
}) => {
  let wrapperClass = 'emd-brand-icon__wrapper';
  wrapperClass += ` emd-brand-icon__wrapper_${icon}`;
  wrapperClass += isUnknownIcon ? ' emd-brand-icon__wrapper_unknown' : '';

  return html`
    <style>
      @import url("emd-basic-brand-icon/src/component/BrandIcon.css")
    </style>
    ${!isUnknownIcon ? html`
      <div class="${wrapperClass}">${iconSvg || stoneIcon}</div>
    ` : ''}
  `;
};
