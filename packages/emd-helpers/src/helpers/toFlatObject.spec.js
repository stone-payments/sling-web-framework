import { expect } from 'chai';
import { toFlatObject } from './toFlatObject.js';

describe('toFlatObject', () => {
  it('Should flatten an array of objects', () => {
    const flattenedObject = [
      { a: 1 },
      { b: 3 },
      { a: 5, c: 6 }
    ].reduce(toFlatObject, {});

    expect(flattenedObject).to.eql({
      a: 5,
      b: 3,
      c: 6
    });
  });
});
