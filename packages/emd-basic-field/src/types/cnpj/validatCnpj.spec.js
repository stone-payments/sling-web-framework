import { expect } from 'chai';
import { validateCnpj } from './validateCnpj.js';

describe('validateCnpj', () => {
  it('Should return undefined when receiving no arguments', () => {
    expect(validateCnpj()).to.be.undefined;
  });

  it('Should return undefined when receiving an empty string', () => {
    expect(validateCnpj('')).to.be.undefined;
  });

  it('Should return undefined when receiving an correct value', () => {
    expect(validateCnpj('92275304000180')).to.be.undefined;
  });

  it('Should use a custom validation error if available', () => {
    expect(validateCnpj('bogus', { defaulterror: 'Invalid CNPJ' }))
      .to.equal('Invalid CNPJ');
  });

  it('Should use the default validation error', () => {
    expect(validateCnpj('bogus'))
      .to.equal('Deve ser um CNPJ válido');
  });
});
