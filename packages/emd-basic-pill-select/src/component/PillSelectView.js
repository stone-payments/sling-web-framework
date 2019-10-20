import { html } from '@stone-payments/lit-element';

export const PillSelectView = ({
  options,
  parsedOptions,
  selectedValue,
  handleClick
}) => html`
  <style>
    @import url("emd-basic-pill-select/src/component/PillSelect.css")
  </style>
  <h1>My Pill</h1>
  <pre>${JSON.stringify(options)}</pre>
  <div class="pill-select">
    ${parsedOptions.map(item => html`
      <li class="${item.value === selectedValue ? 'selected' : ''}">
        <span @click="${handleClick(item.value)}">
          ${item.content}
        </span>
      </li>
    `)}
  </div>
`;
