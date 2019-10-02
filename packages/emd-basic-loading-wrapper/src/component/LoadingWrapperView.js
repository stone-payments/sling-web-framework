import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-loader';

export const LoadingWrapperView = ({
  loading,
  handleLoadingStart,
  handleLoadingEnd
}) => {
  let wrapperClass = 'loading-wrapper';
  wrapperClass += (loading ? ' loading-wrapper_loading' : '');

  return html`
    <style>
      @import url("emd-basic-loading-wrapper/src/component/LoadingWrapper.css")
    </style>
    <div
      class="${wrapperClass}"
      @loadingstart="${handleLoadingStart}"
      @loadingend="${handleLoadingEnd}"
    >
      <div class="loading-wrapper__loader">
        <emd-loader loading></emd-loader>
      </div>
      <div class="loading-wrapper__slot"><slot></slot></div>
    </div>
  `;
};
