import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-loader';
import { stateNames } from '../constants/stateNames.js';
import { isFunction } from '@stone-payments/emd-helpers/dist/cjs/es5/helpers/isFunction';

const getStateClass = (state, currentState) => 'emd-state-wrapper__state' +
  ` emd-state-wrapper__state_${state.name}` +
  (currentState === state.name ? ' emd-state-wrapper__state_current' : '');

const getWrapperClass = isLoading => 'emd-state-wrapper__wrapper' +
  (isLoading ? ' emd-state-wrapper__wrapper_loading' : '');

const prepareView = (state, wrapped, recovery) => {
  const legacyRecovery = wrapped && isFunction(wrapped[state.action])
    ? wrapped[state.action].bind(wrapped)
    : undefined;

  const action = (state.name === stateNames.RECOVERY)
    ? recovery || legacyRecovery
    : undefined;

  return wrapped && state.view
    ? state.view({ wrapped, action })
    : '';
};

export const StateWrapperView = ({
  states,
  isLoading,
  currentState,
  wrapped,
  recovery
}) => html`
  <style>
    @import url("emd-basic-state-wrapper/src/component/StateWrapper.css")
  </style>
  <div class="${getWrapperClass(isLoading)}">
    <div class="emd-state-wrapper__overlay">
      <emd-loader loading></emd-loader>
    </div>
    ${states.map(state => html`
      <div class="${getStateClass(state, currentState)}">
        <div class="emd-state-wrapper__inner">
          ${state.name !== stateNames.DEFAULT ? html`
            <slot name="${state.name}">
              ${prepareView(state, wrapped, recovery)}
            </slot>
          ` : html`
            <slot>
              ${prepareView(state, wrapped, recovery)}
            </slot>
          `}
        </div>
      </div>
    `)}
  </div>
`;
