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

export const StateWrapperRecoveryView = ({
  wrapped,
  action
}) => {
  const recoveryAction = wrapped[action];

  return html`
    ${recoveryAction ? html`
      <div
        @click="${recoveryAction.bind(wrapped)}"
        class="emd-state-wrapper__action">
        ${content}
      </div>
    ` : content}
  `;
};
