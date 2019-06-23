import { expect } from 'chai';
import { setIn } from './setIn.js';

describe('setIn', () => {
  it('Should set a value in an object given a path', () => {
    const object = { a: [{ b: { c: 3 } }] };
    const testResult = setIn(object, 'a[0].b.c', 4);
    expect(testResult.a[0].b.c).to.eql(4);
  });
});
