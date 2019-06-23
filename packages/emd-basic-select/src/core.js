import { compose } from '@stone-payments/emd-helpers';
import { withComponent, withField } from '@stone-payments/emd-hocs';

import { SelectController } from './component/SelectController.js';
import { SelectView } from './component/SelectView.js';

const Select = compose(
  SelectController,
  withField,
  withComponent
)(HTMLElement);

Select.views = SelectView;

export {
  Select,
  SelectController,
  SelectView
};
