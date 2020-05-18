import { html } from '@stone-payments/lit-element';

export const PinCodeView = ({
  type = 'text',
  cases,
  casesArray,
  handleInput,
  handleKeyDown,
  handleFocus,
  handlePaste
}) => html`
  <style>
    @import url("emd-basic-pin-code/src/component/PinCode.css")
  </style>
  <div
    class="emd-pin-code__wrapper"
    part="wrapper"
    style="grid-template-columns: repeat(${cases}, min-content);"
  >
    ${casesArray.map(() => html`
      <input
        @keydown="${handleKeyDown}"
        @input="${handleInput}"
        @focus="${handleFocus}"
        @paste="${handlePaste}"
        type="${type}"
        size="1"
        part="case"
      />
    `)}
  </div>
`;
