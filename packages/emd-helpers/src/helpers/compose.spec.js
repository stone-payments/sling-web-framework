import { expect } from 'chai';
import { compose } from './compose.js';

const addTwo = n => n + 2;
const addFive = n => n + 5;
const multiplyByTwo = n => n * 2;
const multiplyBy = x => n => n * x;

describe('compose', () => {
  it('Should compose a function from other functions', () => {
    const notComposed = addFive(multiplyByTwo(addFive(3)));

    const composed = compose(
      addFive,
      multiplyByTwo,
      addFive
    )(3);

    expect(composed).to.equal(notComposed);
  });

  it('Should work with curried functions', () => {
    const notComposed = addFive(multiplyBy(3)(addFive(3)));

    const composed = compose(
      addFive,
      multiplyBy(3),
      addFive
    )(3);

    expect(composed).to.equal(notComposed);
  });

  it('should call functions from bottom to top', () => {
    const composed = compose(
      addFive,
      multiplyBy(3),
      addTwo
    )(1);

    expect(composed).to.equal(((1 + 2) * 3) + 5);
  });
});
