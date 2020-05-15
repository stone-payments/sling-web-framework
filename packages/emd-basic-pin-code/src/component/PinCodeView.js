import { html } from '@stone-payments/lit-element';

export const PinCodeView = ({
  type = 'text',
  cases,
  handleInput,
  handleKeyDown
}) => html`
  <style>
    @import url("emd-basic-pin-code/src/component/PinCode.css")
  </style>
  <div class="emd-pin-code__wrapper">
    ${Array.from(Array(cases).keys()).map(item => html`
      <input
        @keydown="${handleKeyDown}"
        @input="${handleInput}"
        data-case="${item}"
        type="${type}"
      />
    `)}
  </div>
`;
