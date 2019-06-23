import { compose } from '@stone-payments/emd-helpers';
import { withAvailableAttr } from './withAvailableAttr.js';
import { withEventDispatch } from './withEventDispatch.js';
import { withViews } from './withViews.js';
import { withFocusWithin } from './withFocusWithin.js';
import { withTabFocus } from './withTabFocus.js';

export const withComponent = (Base = class {}) => compose(
  withTabFocus,
  withFocusWithin,
  withAvailableAttr,
  withEventDispatch,
  withViews
)(Base);
