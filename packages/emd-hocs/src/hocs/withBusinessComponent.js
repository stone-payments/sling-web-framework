import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from './withComponent.js';
import { withIO } from './withIO.js';
import { withRequest } from './withRequest.js';

export const withBusinessComponent = (Base = class {}) => compose(
  withComponent,
  withIO,
  withRequest
)(Base);
