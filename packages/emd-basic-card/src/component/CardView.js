import { html } from '@stone-payments/lit-html';

export const CardView = ({
  showHeader,
  showBody,
  showFooter,
  expandedbody,
  noscroll
}) => {
  let cardClasses = '';
  cardClasses += showHeader ? ' emd-card__wrapper_with_header' : '';
  cardClasses += showBody ? ' emd-card__wrapper_with_body' : '';
  cardClasses += showFooter ? ' emd-card__wrapper_with_footer' : '';

  const cardHeaderClasses = !showHeader ? ' emd-card__area_hidden' : '';
  const cardFooterClasses = !showFooter ? ' emd-card__area_hidden' : '';

  let cardBodyClasses = '';
  cardBodyClasses += !showBody ? ' emd-card__area_hidden' : '';
  cardBodyClasses += expandedbody ? ' emd-card__area_expanded' : '';
  cardBodyClasses += noscroll ? ' emd-card__area_noscroll' : '';

  return html`
    <style>
      @import url("emd-basic-card/src/component/Card.css")
    </style>
    <div class="emd-card__wrapper${cardClasses}">
      <div class="emd-card__area emd-card__header${cardHeaderClasses}">
        <div class="emd-card__slot emd-card__slot_left">
          <slot name="header"></slot>
        </div>
        <div class="emd-card__slot emd-card__slot_right">
          <slot name="header-extra"></slot>
        </div>
      </div>
      <div class="emd-card__area emd-card__body${cardBodyClasses}">
        <div class="emd-card__slot emd-card__slot_full">
          <slot></slot>
        </div>
      </div>
      <div class="emd-card__area emd-card__footer${cardFooterClasses}">
        <div class="emd-card__slot emd-card__slot_full">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  `;
};
