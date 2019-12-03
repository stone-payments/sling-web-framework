import { compose } from '@stone-payments/emd-helpers';
import { withComponent, withField, withFieldValidation } from '@stone-payments/emd-hocs';

import { SelectController } from './component/SelectController.js';
import { SelectView } from './component/SelectView.js';

const Select = compose(
  SelectController,
  withFieldValidation,
  withField,
  withComponent
)(HTMLElement);

Select.views = SelectView;

export {
  Select,
  SelectController,
  SelectView
};
