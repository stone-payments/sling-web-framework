import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { delay } from './delay.js';

chai.use(sinonChai);
const { expect } = chai;

describe('delay', () => {
  it('Should pause execution for a specific delay', done => {
    const spy = sinon.spy();

    const fn = async () => {
      await delay(5);
      spy();
    };

    fn();

    expect(spy).not.to.have.been.called;

    setTimeout(() => {
      expect(spy).to.have.been.calledOnce;
      done();
    }, 10);
  });

  it('Should have a default value of zero for timer', done => {
    const spy = sinon.spy();

    const fn = async () => {
      await delay();
      spy();
    };

    fn();

    expect(spy).not.to.have.been.called;

    setTimeout(() => {
      expect(spy).to.have.been.calledOnce;
      done();
    }, 5);
  });
});
