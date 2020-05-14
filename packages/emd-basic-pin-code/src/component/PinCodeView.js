import { html } from '@stone-payments/lit-element';

export const PinCodeView = ({
  type = 'text',
  casesArray,
  handleInput
}) => html`
  <style>
    @import url("emd-basic-pin-code/src/component/PinCode.css")
  </style>
  <div class="emd-pin-code__wrapper">
    ${casesArray.map(item => html`
      <input
        @input="${handleInput}"
        data-case="${item}"
        type="${type}"
      />
    `)}
  </div>
`;
