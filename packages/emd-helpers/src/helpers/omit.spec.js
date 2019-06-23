import { expect } from 'chai';
import { omit } from './omit.js';

describe('omit', () => {
  it('Should return an object minus a specific property', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    expect(omit(obj, 'a')).to.deep.equal({ b: 2, c: 3, d: 4 });
  });

  it('Should return an object minus some properties', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    expect(omit(obj, ['b', 'c'])).to.deep.equal({ a: 1, d: 4 });
  });
});
