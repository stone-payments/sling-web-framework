import { expect } from 'chai';
import { unique } from './unique.js';

describe('unique', () => {
  it('Should remove duplicates from an array', () => {
    expect(unique([1, 1, 2, 2, 3, 3])).to.deep.equal([1, 2, 3]);
  });
});
