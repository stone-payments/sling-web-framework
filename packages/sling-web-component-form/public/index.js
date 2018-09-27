import 'sling-web-component-input';
import 'sling-web-component-button';

import {
  isNotEmpty,
  isValidEmail,
  isValidPhone,
  isValidCPF,
  isValidCNPJ,
} from 'sling-helpers';

const $form = document.querySelector('sling-form');

$form.validation = [
  isNotEmpty('name'),
  isNotEmpty('email'),
  isValidEmail('email'),
  isNotEmpty('phone'),
  isValidPhone('phone'),
  isNotEmpty('cpf'),
  isValidCPF('cpf'),
  isNotEmpty('cnpj'),
  isValidCNPJ('cnpj'),
];
