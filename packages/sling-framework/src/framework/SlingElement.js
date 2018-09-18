import { LitElement } from 'lit-element';
import { withInitialValue } from './withInitialValue.js';
import { withPropertyToAttribute } from './withPropertyToAttribute.js';
import { withObservedProperties } from './withObservedProperties.js';
import { withAttributeToCss } from './withAttributeToCss.js';
import { withEventDispatch } from './withEventDispatch.js';

export const SlingElement = withEventDispatch(withAttributeToCss(
  withObservedProperties(withPropertyToAttribute(withInitialValue(
    LitElement)))));
