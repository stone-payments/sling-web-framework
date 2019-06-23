import { expect } from 'chai';
import { toClippedISODate } from './toClippedISODate.js';

describe('toClippedISODate', () => {
  it('Should convert a date to ISO format and remove timezone', () => {
    const now = new Date();
    expect(toClippedISODate(now)).to.equal(now.toISOString().slice(0, 10));
  });
});
