import { LitElement } from '../../../lib/lit-element.bundle.js';
import { withEventDispatch } from './withEventDispatch.js';
import { withAttributeToCss } from './withAttributeToCss.js';
import { withObservedProperties } from './withObservedProperties.js';
import { withPropertyToAttribute } from './withPropertyToAttribute.js';

export const SlingElement = withEventDispatch(withAttributeToCss(
  withObservedProperties(withPropertyToAttribute(LitElement))));
