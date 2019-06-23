import { expect } from 'chai';
import { isFunction } from './isFunction.js';

describe('isFunction', () => {
  it('Should return false for a string', () => {
    expect(isFunction('a')).to.be.false;
  });

  it('Should return false for an object', () => {
    expect(isFunction({})).to.be.false;
  });

  it('Should return false for an array', () => {
    expect(isFunction([])).to.be.false;
  });

  it('Should return false for a number', () => {
    expect(isFunction(2)).to.be.false;
  });

  it('Should return false for null', () => {
    expect(isFunction(null)).to.be.false;
  });

  it('Should return false for undefined', () => {
    expect(isFunction(undefined)).to.be.false;
  });

  it('Should return true for a function', () => {
    expect(isFunction(() => 'a')).to.be.true;
  });

  it('Should return false for a Promise', () => {
    const testPromise = Promise.resolve('a');
    expect(isFunction(testPromise)).to.be.false;
  });

  it('Should return false for false', () => {
    expect(isFunction(false)).to.be.false;
  });

  it('Should return false for true', () => {
    expect(isFunction(true)).to.be.false;
  });
});
