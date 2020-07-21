import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { SimulatorResultController } from './component/SimulatorResultController.js';
import { SimulatorResultView } from './component/SimulatorResultView.js';

const SimulatorResult = compose(
  SimulatorResultController,
  withComponent
)(LitElement);

SimulatorResult.views = SimulatorResultView;

export {
  SimulatorResult,
  SimulatorResultController,
  SimulatorResultView
};
