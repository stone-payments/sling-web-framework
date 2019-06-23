import { expect } from 'chai';
import { arraysEqual } from './arraysEqual.js';

describe('arraysEqual', () => {
  it('Should return true if two arrays have the same items', () => {
    expect(arraysEqual(['a', 'b', 'c'], ['a', 'b', 'c'])).to.be.true;
  });

  it('Should consider the order of the items', () => {
    expect(arraysEqual(['a', 'b', 'c'], ['c', 'b', 'a'])).to.be.false;
  });

  it('Should consider the type of the items', () => {
    expect(arraysEqual([1, 2, 3], ['1', '2', '3'])).to.be.false;
  });
});
