import { withRequestParams } from './withRequestParams.js';
import { withLoadingAndErrorHandling } from './withLoadingAndErrorHandling.js';

export const withRequest = (Base = class {}) =>
  withRequestParams(withLoadingAndErrorHandling(Base));
