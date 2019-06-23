import { compose } from '@stone-payments/emd-helpers';
import { withComponent, withField } from '@stone-payments/emd-hocs';
import { withFieldType } from './hocs/withFieldType.js';

import { FieldController } from './component/FieldController.js';
import { FieldView } from './component/FieldView.js';

import { validateEmail } from './types/email/validateEmail.js';

import { validateTel } from './types/tel/validateTel.js';
import { maskTel } from './types/tel/maskTel.js';

import { validateCpf } from './types/cpf/validateCpf.js';
import { maskCpf } from './types/cpf/maskCpf.js';

import { validateCnpj } from './types/cnpj/validateCnpj.js';
import { maskCnpj } from './types/cnpj/maskCnpj.js';

import { validateCep } from './types/cep/validateCep.js';
import { maskCep } from './types/cep/maskCep.js';

import { maskMoney } from './types/money/maskMoney.js';

const withComponentAndFields = compose(
  withFieldType('email', validateEmail, undefined),
  withFieldType('tel', validateTel, maskTel),
  withFieldType('cpf', validateCpf, maskCpf),
  withFieldType('cnpj', validateCnpj, maskCnpj),
  withFieldType('cep', validateCep, maskCep),
  withFieldType('money', undefined, maskMoney),
  withField,
  withComponent
);

const Field = FieldController(withComponentAndFields(HTMLElement));
Field.views = FieldView;

export {
  Field,
  FieldController,
  FieldView
};
