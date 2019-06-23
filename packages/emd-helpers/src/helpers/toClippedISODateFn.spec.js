import { expect } from 'chai';
import { toClippedISODateFn } from './toClippedISODateFn.js';

describe('toClippedISODateFn', () => {
  it('Should apply toClippedISODate to a function', () => {
    const nowFn = () => new Date();

    expect(toClippedISODateFn(nowFn)())
      .to.equal(nowFn().toISOString().slice(0, 10));
  });
});
