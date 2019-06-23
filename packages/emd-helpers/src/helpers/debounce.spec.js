import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { debounce } from './debounce.js';

chai.use(sinonChai);
const { expect } = chai;

describe('debounce', () => {
  it('Should call a function once at the end of a delay', done => {
    const fn = sinon.spy();
    const debounced = debounce(fn, 10);

    debounced(5);
    debounced(4, 5);
    debounced(3, 4, 5);
    debounced(2, 3, 4, 5);
    debounced(1, 2, 3, 4, 5);

    expect(fn).not.to.have.been.called;

    setTimeout(() => {
      expect(fn).to.have.been.calledOnceWithExactly(1, 2, 3, 4, 5);
      done();
    }, 20);
  });

  it('Should have a default value of zero for timer', done => {
    const fn = sinon.spy();
    const debounced = debounce(fn);

    debounced(5);
    debounced(4, 5);
    debounced(3, 4, 5);
    debounced(2, 3, 4, 5);
    debounced(1, 2, 3, 4, 5);

    expect(fn).not.to.have.been.called;

    setTimeout(() => {
      expect(fn).to.have.been.calledOnceWithExactly(1, 2, 3, 4, 5);
      done();
    }, 10);
  });
});
