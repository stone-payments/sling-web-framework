import { withLoading } from './withLoading.js';
import { withRequestParams } from './withRequestParams.js';
import { SlingElement } from '../basic/SlingElement.js';

export const SlingBusinessElement =
  withLoading(withRequestParams(SlingElement));
