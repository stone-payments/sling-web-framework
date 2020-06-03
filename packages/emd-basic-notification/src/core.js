import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { NotificationController } from './component/NotificationController.js';
import { NotificationView } from './component/NotificationView.js';

const Notification = compose(
  NotificationController,
  withComponent
)(LitElement);

Notification.views = NotificationView;

export {
  Notification,
  NotificationController,
  NotificationView
};
