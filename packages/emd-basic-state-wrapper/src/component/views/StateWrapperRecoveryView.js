import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-icon';
import { getViewCssVariant } from '../helpers/getViewCssVariant.js';

const StateWrapperContentView = ({ view }) => html`
  <emd-icon
    icon="refresh"
    class="${getViewCssVariant(view, 'icon')}">
  </emd-icon>
  <span class="${getViewCssVariant(view, 'text')}">
    Falha no carregamento.<br/>
    Tentar novamente.
  </span>
`;

export const StateWrapperRecoveryView = ({ action, view }) => {
  return action ? html`
    <div
      @click="${action}"
      class="emd-state-wrapper__action">
      ${StateWrapperContentView({ view })}
    </div>
  ` : StateWrapperContentView({ view });
};
