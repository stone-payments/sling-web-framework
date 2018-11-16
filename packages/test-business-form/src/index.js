import { SlingElement } from 'sling-framework';
import { registerComponent } from 'sling-helpers';
import { TestBusinessForm } from './component/TestBusinessForm.js';

registerComponent('test-business-form', TestBusinessForm(SlingElement));
