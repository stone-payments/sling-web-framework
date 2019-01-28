import { validateCep } from './validateCep.js';

describe('validateCep', () => {
  it('Should return undefined when there is no value', () => {
    expect(validateCep('')).to.be.undefined;
  });

  it('Should return message when receiving invalid value', () => {
    expect(validateCep('123')).to.not.be.undefined;
  });

  it('Should return message when receiving a string with invalid length',
    () => {
      expect(validateCep('123')).to.not.be.undefined;
      expect(validateCep('123456789')).to.not.be.undefined;
    });

  it('Should return message when receiving an invalid string', () => {
    expect(validateCep('ABC45678')).to.not.be.undefined;
    expect(validateCep('11111111')).to.not.be.undefined;
  });

  it('Should return undefined when receiving a valid string', () => {
    expect(validateCep('12345678')).to.be.undefined;
  });
});
