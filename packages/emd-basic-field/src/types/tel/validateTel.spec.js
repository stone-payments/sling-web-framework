import { expect } from 'chai';
import { validateTel } from './validateTel.js';

describe('validateTel', () => {
  it('Should return undefined when receiving no arguments', () => {
    expect(validateTel()).to.be.undefined;
  });

  it('Should return undefined when receiving an empty string', () => {
    expect(validateTel('')).to.be.undefined;
  });

  it('Should return undefined when receiving an correct value', () => {
    expect(validateTel('21999999999')).to.be.undefined;
  });

  it('Should return undefined when receiving an correct value', () => {
    expect(validateTel('2123333333')).to.be.undefined;
  });

  it('Should use a custom validation error if available', () => {
    expect(validateTel('bogus', { defaulterror: 'Invalid phone number' }))
      .to.equal('Invalid phone number');
  });

  it('Should use the default validation error', () => {
    expect(validateTel('bogus'))
      .to.equal('Deve ser um número de telefone válido');
  });
});
