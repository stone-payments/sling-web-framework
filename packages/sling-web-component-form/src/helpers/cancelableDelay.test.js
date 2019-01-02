import sinon from 'sinon';

import { cancelableDelay } from './cancelableDelay.js';

describe('cancelableDelay', () => {
  it('Should resolve after some delay.', (done) => {
    const myDelay = cancelableDelay(10);
    const afterDelay = sinon.spy();

    myDelay.then(afterDelay);

    setTimeout(() => {
      expect(afterDelay).to.have.been.calledOnceWith();
      done();
    }, 25);
  });

  it('Should be cancelable.', (done) => {
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
