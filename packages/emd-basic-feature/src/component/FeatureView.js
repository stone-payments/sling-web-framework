import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-icon';

export const FeatureView = ({
  headline
}) => html`
  <style>
    @import url("emd-basic-feature/src/component/Feature.css")
  </style>
  <div class="feature__wrapper">
    <slot name="icon" class="feature__icon">
      <emd-icon icon="success-circle"></emd-icon>
    </slot>
    <div class="feature__content">
      <h4 class="feature__headline">${headline}</h4>
      <slot class="feature__description"></slot>
    </div>
  </div>
`;
