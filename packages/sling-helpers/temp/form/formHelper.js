import { validate } from './validate.js';
import { isValidCPF as checkCPF } from './isValidCPF.js';
import { isValidCNPJ as checkCNPJ } from './isValidCNPJ.js';
import { isValidEmail as checkEmail } from './isValidEmail.js';
import { isValidPhone as checkPhone } from './isValidPhone.js';

import {
  MANDATORY_FIELDS_ALL,
  MANDATORY_FIELD,
  INVALID_PHONE,
  INVALID_EMAIL,
  INVALID_CPF,
  INVALID_CNPJ,
  MASK_ERROR,
  POSITIVE_NUMBER,
} from './errorMessages.js';

export const replaceNonDigits = value => String(value).replace(/\D/g, '');

const valueIsNotEmpty = value => value != null && value !== '';

const valueIsPositiveNumber = value =>
  !Number.isNaN(value) && Number(value) >= 0;

const valuesAreNotEmpty = values => values.every(valueIsNotEmpty);

const valueIsValidEmail = value => checkEmail(String(value));

const valueIsValidPhone = value => checkPhone(String(value));

const valueIsValidCPF = value => checkCPF(replaceNonDigits(value));

const valueIsValidCNPJ = value => checkCNPJ(replaceNonDigits(value));

const valueIsNumeric = value =>
  replaceNonDigits(String(value)) === String(value);

const valueLengthBetween = (minLength, maxLength) => value =>
  String(value).length >= minLength && String(value).length <= maxLength;

const valueGreaterThan = num => value => Number(value) > num;

export const areNotEmpty = scope => formdata =>
  validate(scope, formdata)
    .with(valuesAreNotEmpty, MANDATORY_FIELDS_ALL);

export const isPositiveNumber = scope => formdata =>
  validate(scope, formdata)
    .with(valueIsPositiveNumber, POSITIVE_NUMBER);

export const isNotEmpty = scope => formdata =>
  validate(scope, formdata)
    .with(valueIsNotEmpty, MANDATORY_FIELD);

export const isValidCPF = scope => formdata =>
  validate(scope, formdata)
    .with(valueIsValidCPF, INVALID_CPF);

export const isValidEmail = scope => formdata =>
  validate(scope, formdata)
    .with(valueIsValidEmail, INVALID_EMAIL);

export const isValidPhone = scope => formdata =>
  validate(scope, formdata)
    .with(valueIsValidPhone, INVALID_PHONE);

export const isValidCNPJ = scope => formdata =>
  validate(scope, formdata)
    .with(valueIsValidCNPJ, INVALID_CNPJ);

export const isValidBankId = scope => formdata =>
  validate(scope, formdata)
    .with([
      valueIsNumeric,
      valueGreaterThan(0),
    ], MASK_ERROR);

export const isValidBankAgencyNumber = scope => formdata =>
  validate(scope, formdata)
    .with([
      valueIsNumeric,
      valueLengthBetween(1, 5),
      valueGreaterThan(0),
    ], MASK_ERROR);

export const isValidBankAccountNumber = scope => formdata =>
  validate(scope, formdata)
    .with([
      valueIsNumeric,
      valueLengthBetween(1, 12),
    ], MASK_ERROR);

export const isValidBankVerificationCode = scope => formdata =>
  validate(scope, formdata)
    .with(valueLengthBetween(1, 2), MASK_ERROR);
