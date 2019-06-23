import { expect } from 'chai';
import { flatten } from './flatten.js';

describe('flatten', () => {
  it('Should return the expected flat result', () => {
    const obj = { a: ['art', 'ant'], b: { basic: true } };
    const expectResult = { 'a[0]': 'art', 'a[1]': 'ant', 'b.basic': true };
    expect(flatten(obj)).to.eql(expectResult);
  });
});
