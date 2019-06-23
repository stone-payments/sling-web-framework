import { expect } from 'chai';
import { toFlatEntries } from './toFlatEntries.js';

describe('toFlatEntries', () => {
  it('Should flatten an array of object entries', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    };

    const flattenedEntries = Object
      .entries(obj)
      .reduce(toFlatEntries, {});

    expect(flattenedEntries).to.eql({
      a: 1,
      b: 2,
      c: 3
    });
  });
});
