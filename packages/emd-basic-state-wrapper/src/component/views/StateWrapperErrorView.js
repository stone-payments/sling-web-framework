import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-icon';
import { getViewCssVariant } from '../helpers/getViewCssVariant.js';

export const StateWrapperErrorView = ({ view }) => html`
  <emd-icon
    icon="alert-circle"
    class="${getViewCssVariant(view, 'icon')}">
  </emd-icon>  
  <span class="${getViewCssVariant(view, 'text')}">
    Erro permanente.
  </span>
`;
