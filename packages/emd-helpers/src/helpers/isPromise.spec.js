import { expect } from 'chai';
import { isPromise } from './isPromise.js';

describe('isPromise', () => {
  it('Should return false for a string', () => {
    expect(isPromise('a')).to.be.false;
  });

  it('Should return false for an object', () => {
    expect(isPromise({})).to.be.false;
  });

  it('Should return false for an array', () => {
    expect(isPromise([])).to.be.false;
  });

  it('Should return false for a number', () => {
    expect(isPromise(2)).to.be.false;
  });

  it('Should return false for null', () => {
    expect(isPromise(null)).to.be.false;
  });

  it('Should return false for undefined', () => {
    expect(isPromise(undefined)).to.be.false;
  });

  it('Should return false for a function', () => {
    expect(isPromise(() => 'a')).to.be.false;
  });

  it('Should return true for a Promise', () => {
    const testPromise = Promise.resolve('a');
    expect(isPromise(testPromise)).to.be.true;
  });

  it('Should return false for false', () => {
    expect(isPromise(false)).to.be.false;
  });

  it('Should return false for true', () => {
    expect(isPromise(true)).to.be.false;
  });
});
