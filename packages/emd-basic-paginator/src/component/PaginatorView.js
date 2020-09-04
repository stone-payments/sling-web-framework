import { html } from '@stone-payments/lit-element';

export const PaginatorView = ({
  paginate,
  total,
  selected,
  isFirstSelected,
  isLastSelected,
  currentRange
}) => html`
  <style>
    @import url("emd-basic-paginator/src/component/Paginator.css")
  </style>
  <div class="emd-pag">
    <button
      @click="${paginate('previous')}"
      ?disabled="${isFirstSelected}"
      class="emd-pag__button ${isFirstSelected ? 'emd-pag__button_disabled' : ''}">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </button>
    ${(total > 1) ? currentRange.map(label => (label != null ? html`
      <button
        @click="${paginate('index', label)}"
        class="emd-pag__button ${label === selected ? 'emd-pag__button_selected' : ''} emd-pag__button_type_label">
        ${label}
      </button>
    ` : html`
      <button class="emd-pag__button emd-pag__button_type_ellipsis">...</button>
    `)) : ''}
    <button
      @click="${paginate('next')}"
      ?disabled="${isLastSelected}"
      class="emd-pag__button ${isLastSelected ? 'emd-pag__button_disabled' : ''} emd-pag__button_type_arrow">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </button>
  </div>
`;
