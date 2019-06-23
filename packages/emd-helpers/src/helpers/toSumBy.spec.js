import { expect } from 'chai';
import { toSumBy } from './toSumBy.js';

describe('toSumBy', () => {
  it('Should return a function', () => {
    expect(toSumBy()).to.be.a('function');
  });

  it('Should add an object propoerty to a previous value', () => {
    expect(toSumBy('value')(4, { value: 3 })).to.equal(7);
  });

  it('Should add zero if the property is not available', () => {
    expect(toSumBy('value')(4, {})).to.equal(4);
  });

  it('Should be usable inside reduce', () => {
    const values = [{
      value: 59
    }, {
      value: 120
    }, {
      value: 36
    }];

    expect(values.reduce(toSumBy('value'), 0)).to.equal(59 + 120 + 36);
  });
});
