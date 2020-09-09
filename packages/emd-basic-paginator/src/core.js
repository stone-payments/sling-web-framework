import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { PaginatorController } from './component/PaginatorController.js';
import { PaginatorView } from './component/PaginatorView.js';

const Paginator = compose(
  PaginatorController,
  withComponent
)(LitElement);

Paginator.views = PaginatorView;

export {
  Paginator,
  PaginatorController,
  PaginatorView
};
