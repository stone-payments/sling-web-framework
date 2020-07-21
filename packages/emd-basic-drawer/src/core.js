import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { DrawerController } from './component/DrawerController.js';
import { DrawerView } from './component/DrawerView.js';

const Drawer = compose(
  DrawerController,
  withComponent
)(LitElement);

Drawer.views = DrawerView;

export {
  Drawer,
  DrawerController,
  DrawerView
};
