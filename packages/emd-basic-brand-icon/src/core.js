import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement, html } from '@stone-payments/lit-element';

import { BrandSvgController } from '@stone-payments/emd-assets';
import { BrandIconController } from './component/BrandIconController.js';
import { BrandIconView } from './component/BrandIconView.js';

const BrandIcon = compose(
  BrandIconController,
  withComponent
)(LitElement);

BrandIcon.views = BrandIconView;
BrandIcon.icons = BrandSvgController(html);

export {
  BrandIcon
};
