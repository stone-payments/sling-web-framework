import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { TooltipController } from './component/TooltipController.js';
import { TooltipView } from './component/TooltipView.js';

const Tooltip = compose(
  TooltipController,
  withComponent
)(LitElement);

Tooltip.views = TooltipView;

export {
  Tooltip,
  TooltipController,
  TooltipView
};
