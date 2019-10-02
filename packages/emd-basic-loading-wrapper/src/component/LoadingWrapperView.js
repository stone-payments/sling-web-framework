import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-loader';

export const LoadingWrapperView = () => html`
  <style>
    @import url("emd-basic-loading-wrapper/src/component/LoadingWrapper.css")
  </style>
  <div class="emd-loading-wrapper__wrapper">
    <span><emd-loader loading></emd-loader></span>
    <slot></slot>
  </div>
`;
