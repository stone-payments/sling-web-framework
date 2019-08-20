import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-icon';

const content = html`
  <emd-icon
    icon="refresh"
    class="emd-state-wrapper__icon">
  </emd-icon>
  <span class="emd-state-wrapper__text">
    Falha no carregamento.<br/>
    Tentar novamente.
  </span>
`;

export const StateWrapperRecoveryView = ({ action }) => {
  return action ? html`
    <div
      @click="${action}"
      class="emd-state-wrapper__action">
      ${content}
    </div>
  ` : content;
};
