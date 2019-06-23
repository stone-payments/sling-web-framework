import { expect } from 'chai';
import { toISODateFn } from './toISODateFn.js';

describe('toISODateFn', () => {
  it('Should apply toISODate to a function', () => {
    const nowFn = () => new Date('2019-01-01');
    expect(toISODateFn(nowFn)()).to.equal(nowFn().toISOString());
  });
});
