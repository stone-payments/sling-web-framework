import { html } from '@stone-payments/lit-element';

export const SlideshowView = ({ delay = 300 }) => html`
  <style>
    @import url("emd-basic-slideshow/src/component/Slideshow.css")
  </style>
  <div class="emd-slideshow__wrapper" style="--emd-slideshow-delay: ${delay}ms">
    <div class="container">
      <slot></slot>
    </div>
  </div>
`;
