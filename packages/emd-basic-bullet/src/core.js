import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { BulletController } from './component/BulletController.js';
import { BulletView } from './component/BulletView.js';

const Bullet = compose(
  BulletController,
  withComponent
)(LitElement);

Bullet.views = BulletView;

export {
  Bullet,
  BulletController,
  BulletView
};
