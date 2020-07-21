import { html } from '@stone-payments/lit-element';

export const LoaderView = ({
  loading
}) => {
  const loadingClass = loading ? ' emd-loader__wrapper_loading' : '';

  return html`
    <style>
      @import url("emd-basic-loader/src/component/Loader.css")
    </style>
    <div class="emd-loader__wrapper${loadingClass}">
      <div class="emd-loader__inner"></div>
    </div>
  `;
};
