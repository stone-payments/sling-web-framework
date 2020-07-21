import { compose } from '@stone-payments/emd-helpers';
import { withComponent, withObservedChildren } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { FieldWrapperController } from './component/FieldWrapperController.js';
import { FieldWrapperView } from './component/FieldWrapperView.js';

const FieldWrapper = compose(
  FieldWrapperController,
  withObservedChildren,
  withComponent
)(LitElement);

FieldWrapper.views = FieldWrapperView;

export {
  FieldWrapper,
  FieldWrapperController,
  FieldWrapperView
};
