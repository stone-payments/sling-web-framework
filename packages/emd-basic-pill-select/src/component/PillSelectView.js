import { html } from '@stone-payments/lit-element';

export const PillSelectView = ({
  parsedOptions = [],
  selectedValue,
  handleClick,
  fixed
}) => html`
  <style>
    @import url("emd-basic-pill-select/src/component/PillSelect.css")
  </style>
  <div class="pill-select${fixed ? ' fixed' : ''}">
    ${parsedOptions.map((item, index) => html`
      ${index !== 0 ? html`<span class="separator"></span>` : ''}
      <button
        class="${item.value === selectedValue ? 'selected' : ''}"
        @click="${handleClick(item.value)}">
        ${item.content}
      </button>
    `)}
  </div>
`;
