import { html } from '@stone-payments/lit-element';
import { getViewCssVariant } from '../helpers/getViewCssVariant.js';

export const StateWrapperEmptyView = ({ view }) => html`
  <span class="${getViewCssVariant(view, 'text')}">
    Não há nada aqui.
  </span>
`;
