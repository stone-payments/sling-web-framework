import { expect } from 'chai';
import { toString } from './toString.js';

describe('toString', () => {
  it('Should return an empty string for undefined', () => {
    expect(toString()).to.equal('');
  });

  it('Should return an empty string for null', () => {
    expect(toString(null)).to.equal('');
  });

  it('Should return an empty string for NaN', () => {
    expect(toString(NaN)).to.equal('');
  });

  it('Should use default javascript conversion for a string', () => {
    expect(toString('str')).to.equal('str');
  });

  it('Should use default javascript conversion for a number', () => {
    expect(toString(25)).to.equal('25');
  });

  it('Should use default javascript conversion for a boolean', () => {
    expect(toString(true)).to.equal('true');
    expect(toString(false)).to.equal('false');
  });

  it('Should use default javascript conversion for an array', () => {
    expect(toString(['a', 'b', 12])).to.equal('a,b,12');
  });
});
