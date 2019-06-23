import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-icon';

export const StateWrapperErrorView = () => html`
  <emd-icon
    icon="alert-circle"
    class="emd-state-wrapper__icon">
  </emd-icon>  
  <span class="emd-state-wrapper__text">
    Erro permanente.
  </span>
`;
