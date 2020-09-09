import { createRangeArray } from './createRangeArray.js';
import { expect } from 'chai';

describe('createRangeArray', () => {
  it('Should create an array of numbers given a start and an end.', () => {
    expect(createRangeArray(1, 5)).to.eql([1, 2, 3, 4, 5]);
  });

  it('Should create an array of a single integer if passed ' +
    'only the start parameter is passed.', () => {
    expect(createRangeArray(5)).to.eql([5]);
  });

  it('Should throw an error if parameters are not integers.', () => {
    expect(() => createRangeArray(1.1, 5.5)).to.throw();
  });

  it('Should throw an error if the end is smaller than the start.', () => {
    expect(() => createRangeArray(5, 1)).to.throw();
  });
});
