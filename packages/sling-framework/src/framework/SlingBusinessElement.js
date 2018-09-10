import { withBusinessLogic } from './withBusinessLogic.js';
import { withInstanceLogic } from './withInstanceLogic.js';
import { SlingElement } from './SlingElement.js';

export const SlingBusinessElement = withBusinessLogic(withInstanceLogic(
  SlingElement));
