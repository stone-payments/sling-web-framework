import { expect } from 'chai';
import { toISODate } from './toISODate.js';

describe('toISODate', () => {
  it('Should convert a date to ISO format', () => {
    const now = new Date();
    expect(toISODate(now)).to.equal(now.toISOString());
  });
});
