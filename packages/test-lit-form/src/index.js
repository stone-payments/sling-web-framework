import { SlingElement } from 'sling-framework';
import { registerComponent } from 'sling-helpers';
import { TestLitForm } from './component/TestLitForm.js';

registerComponent('test-lit-form', TestLitForm(SlingElement));
