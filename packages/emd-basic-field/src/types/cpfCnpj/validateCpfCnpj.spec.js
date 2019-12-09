import { expect } from 'chai';
import { validateCpfCnpj } from './validateCpfCnpj.js';

describe('validateCpfCnpj', () => {
  it('Should return undefined when receiving no arguments', () => {
    expect(validateCpfCnpj()).to.be.undefined;
  });

  it('Should return undefined when receiving an empty string', () => {
    expect(validateCpfCnpj('')).to.be.undefined;
  });

  it('Should return undefined when receiving an correct CPF', () => {
    expect(validateCpfCnpj('13415968006')).to.be.undefined;
  });

  it('Should return undefined when receiving an correct CNPJ', () => {
    expect(validateCpfCnpj('92275304000180')).to.be.undefined;
  });

  it('Should use a custom validation error if available', () => {
    expect(validateCpfCnpj('bogus', { defaulterror: 'Invalid CPF or CNPJ' }))
      .to.equal('Invalid CPF or CNPJ');
  });

  it('Should use the default validation error', () => {
    expect(validateCpfCnpj('bogus'))
      .to.equal('Deve ser um CPF ou um CNPJ válido');
  });
});
