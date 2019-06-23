import { expect } from 'chai';
import { isBoolean } from './isBoolean.js';

describe('isBoolean', () => {
  it('Should return false for a string', () => {
    expect(isBoolean('a')).to.be.false;
  });

  it('Should return false for an object', () => {
    expect(isBoolean({})).to.be.false;
  });

  it('Should return false for an array', () => {
    expect(isBoolean([])).to.be.false;
  });

  it('Should return false for a number', () => {
    expect(isBoolean(2)).to.be.false;
  });

  it('Should return false for null', () => {
    expect(isBoolean(null)).to.be.false;
  });

  it('Should return false for undefined', () => {
    expect(isBoolean(undefined)).to.be.false;
  });

  it('Should return false for a function', () => {
    expect(isBoolean(() => 'a')).to.be.false;
  });

  it('Should return false for a Promise', () => {
    const testPromise = Promise.resolve('a');
    expect(isBoolean(testPromise)).to.be.false;
  });

  it('Should return true for false', () => {
    expect(isBoolean(false)).to.be.true;
  });

  it('Should return true for true', () => {
    expect(isBoolean(true)).to.be.true;
  });
});
