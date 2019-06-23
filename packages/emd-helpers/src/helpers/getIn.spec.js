import { expect } from 'chai';
import { getIn } from './getIn.js';

describe('getIn', () => {
  it('Should get a value in an object given a path', () => {
    const object = { a: [{ b: { c: 3 } }] };
    expect(getIn(object, 'a[0].b.c')).to.eql(3);
  });
});
