import { expect } from 'chai';
import { isValidCep } from './isValidCep.js';

describe('isValidCep', () => {
  it('Should return false when receiving no arguments', () => {
    expect(isValidCep()).to.be.false;
  });

  it('Should return false when receiving empty string', () => {
    expect(isValidCep('')).to.be.false;
  });

  it('Should return false when receiving a string with invalid length', () => {
    expect(isValidCep('123')).to.be.false;
    expect(isValidCep('123456789')).to.be.false;
  });

  it('Should return false when receiving an invalid string', () => {
    expect(isValidCep('ABC45678')).to.be.false;
  });

  it('Should return true when receiving a valid string', () => {
    expect(isValidCep('12345678')).to.be.true;
  });
});
