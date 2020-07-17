import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement, html } from '@stone-payments/lit-element';

import { IconSvgController } from '@stone-payments/emd-assets';
import { IconController } from './component/IconController.js';
import { IconView } from './component/IconView.js';

const Icon = compose(
  IconController,
  withComponent
)(LitElement);

Icon.views = IconView;
Icon.icons = IconSvgController(html);

export {
  Icon,
  IconController,
  IconView
};
