import { html } from '@stone-payments/lit-element';

export const PillSelectView = ({
  parsedOptions = [],
  selectedValue,
  handleClick
}) => html`
  <style>
    @import url("emd-basic-pill-select/src/component/PillSelect.css")
  </style>
  <div class="pill-select">
    ${parsedOptions.map(item => html`
      <li class="${item.value === selectedValue ? 'selected' : ''}">
        <button @click="${handleClick(item.value)}">
          ${item.content}
        </button>
      </li>
    `)}
  </div>
`;
