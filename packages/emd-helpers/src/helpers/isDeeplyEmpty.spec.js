import { expect } from 'chai';
import { isDeeplyEmpty } from './isDeeplyEmpty.js';

describe('isDeeplyEmpty', () => {
  it('Should return true for empty properties', () => {
    const obj = { a: null, b: undefined, c: [], d: [null, undefined] };
    expect(isDeeplyEmpty(obj)).to.be.true;
  });

  it('Should check if have at least one property', () => {
    const obj = { a: null, b: undefined, c: [], d: ['str', undefined] };
    expect(isDeeplyEmpty(obj)).to.be.false;
  });

  it('Should deeply check object properties', () => {
    const obj = { a: { b: { c: {} } } };
    expect(isDeeplyEmpty(obj)).to.be.true;
  });

  it('Should deeply check object and arays', () => {
    const obj = { a: { b: [ {} ] } };
    expect(isDeeplyEmpty(obj)).to.be.true;
  });
});
