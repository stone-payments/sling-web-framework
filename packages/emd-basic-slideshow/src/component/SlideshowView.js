import { html } from '@stone-payments/lit-element';

export const SlideshowView = () => html`
  <style>
    @import url("emd-basic-slideshow/src/component/Slideshow.css")
  </style>
  <div class="emd-slideshow__wrapper">
    <div class="container">
      <slot></slot>
    </div>
  </div>
`;
