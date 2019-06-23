import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { cancelableDelay } from './cancelableDelay.js';

chai.use(sinonChai);
const { expect } = chai;

describe('cancelableDelay', () => {
  it('Should resolve after some delay', (done) => {
    const myDelay = cancelableDelay(10);
    const afterDelay = sinon.spy();

    myDelay.then(afterDelay);

    setTimeout(() => {
      expect(afterDelay).to.have.been.calledOnceWith();
      done();
    }, 25);
  });

  it('Should be cancelable', (done) => {
    const myDelay = cancelableDelay(10);
    const afterDelay = sinon.spy();

    myDelay.then(afterDelay);
    myDelay.cancel();

    setTimeout(() => {
      expect(afterDelay).not.to.have.been.called;
      done();
    }, 25);
  });
});
