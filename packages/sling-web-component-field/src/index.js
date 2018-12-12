import { registerComponent } from 'sling-helpers';
import { Field } from './component/Field.js';

import { withEmail } from './types/email/withEmail.js';
import { withTel } from './types/tel/withTel.js';
import { withCpf } from './types/cpf/withCpf.js';
import { withCnpj } from './types/cnpj/withCnpj.js';

registerComponent('sling-field', withCnpj(
  withCpf(withTel(withEmail(Field(HTMLElement))))));
