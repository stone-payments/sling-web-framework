import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { TableController } from './component/TableController.js';
import { withTableStyleParser } from './hocs/withTableStyleParser.js';
import { TableView } from './component/TableView.js';

const Table = compose(
  TableController,
  withTableStyleParser,
  withComponent
)(LitElement);

Table.views = TableView;

export {
  Table,
  TableController,
  TableView
};
