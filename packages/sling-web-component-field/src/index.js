import { registerComponent } from 'sling-helpers';
import { Field } from './component/Field.js';

import { withEmail } from './types/email/withEmail.js';
import { withTel } from './types/tel/withTel.js';

registerComponent('sling-field', withTel(withEmail(Field(HTMLElement))));
