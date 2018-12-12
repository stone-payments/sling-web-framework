import { registerComponent, compose } from 'sling-helpers';
import { Field } from './component/Field.js';
import { addType } from './component/addType.js';

import { validateEmail } from './types/email/validateEmail.js';

import { validateTel } from './types/tel/validateTel.js';
import { maskTel } from './types/tel/maskTel.js';

import { validateCpf } from './types/cpf/validateCpf.js';
import { maskCpf } from './types/cpf/maskCpf.js';

import { validateCnpj } from './types/cnpj/validateCnpj.js';
import { maskCnpj } from './types/cnpj/maskCnpj.js';

const FieldWithTypes = compose(
  addType('email', validateEmail),
  addType('tel', validateTel, maskTel),
  addType('cpf', validateCpf, maskCpf),
  addType('cnpj', validateCnpj, maskCnpj),
  Field,
);

registerComponent('sling-field', FieldWithTypes(HTMLElement));
