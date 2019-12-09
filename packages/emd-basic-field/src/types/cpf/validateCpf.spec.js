import { expect } from 'chai';
import { validateCpf } from './validateCpf.js';

describe('validateCpf', () => {
  it('Should return undefined when receiving no arguments', () => {
    expect(validateCpf()).to.be.undefined;
  });

  it('Should return undefined when receiving an empty string', () => {
    expect(validateCpf('')).to.be.undefined;
  });

  it('Should return undefined when receiving an correct value', () => {
    expect(validateCpf('13415968006')).to.be.undefined;
  });

  it('Should use a custom validation error if available', () => {
    expect(validateCpf('bogus', { defaulterror: 'Invalid CPF' }))
      .to.equal('Invalid CPF');
  });

  it('Should use the default validation error', () => {
    expect(validateCpf('bogus'))
      .to.equal('Deve ser um CPF válido');
  });
});
