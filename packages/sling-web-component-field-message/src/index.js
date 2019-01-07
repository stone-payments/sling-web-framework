import { registerComponent } from 'sling-helpers';
import { FieldMessage } from './component/FieldMessage.js';

registerComponent('sling-field-message', FieldMessage(HTMLElement));
