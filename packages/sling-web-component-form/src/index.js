import { registerComponent } from 'sling-helpers';
import { Form } from './component/Form.js';

registerComponent('sling-form', Form(HTMLElement));

export { withForm } from './hoc/withForm.js';
export { cancelableDelay } from './helpers/cancelableDelay.js';
