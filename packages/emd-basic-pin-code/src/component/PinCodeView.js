import { html } from '@stone-payments/lit-element';

export const PinCodeView = ({
  type = 'text',
  casesArray,
  handleInput,
  handleKeyDown,
  handleFocus,
  handlePaste
}) => html`
  <style>
    @import url("emd-basic-pin-code/src/component/PinCode.css")
  </style>
  <div class="emd-pin-code__wrapper">
    ${casesArray.map(item => html`
      <input
        @keydown="${handleKeyDown}"
        @input="${handleInput}"
        @focus="${handleFocus}"
        @paste="${handlePaste}"
        type="${type}"
        size="1"
      />
    `)}
  </div>
`;
