import { compose } from '@stone-payments/emd-helpers';
import { withComponent, withObservedChildren } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { StateWrapperController } from './component/StateWrapperController.js';
import { StateWrapperView } from './component/StateWrapperView.js';
import { StateWrapperPristineView } from './component/views/StateWrapperPristineView.js';
import { StateWrapperEmptyView } from './component/views/StateWrapperEmptyView.js';
import { StateWrapperRecoveryView } from './component/views/StateWrapperRecoveryView.js';
import { StateWrapperErrorView } from './component/views/StateWrapperErrorView.js';
import { stateNames } from './constants/stateNames.js';

const { DEFAULT, PRISTINE, EMPTY, RECOVERY, ERROR } = stateNames;

const StateWrapper = compose(
  StateWrapperController,
  withObservedChildren,
  withComponent
)(LitElement);

StateWrapper.views = StateWrapperView;

StateWrapper.states = [{
  name: DEFAULT
}, {
  name: PRISTINE,
  view: StateWrapperPristineView
}, {
  name: EMPTY,
  view: StateWrapperEmptyView
}, {
  name: RECOVERY,
  view: StateWrapperRecoveryView,
  action: 'buildSource'
}, {
  name: ERROR,
  view: StateWrapperErrorView
}];

export {
  StateWrapper,
  StateWrapperController,
  StateWrapperView
};
