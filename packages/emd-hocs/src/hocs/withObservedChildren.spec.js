import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { withObservedChildren } from './withObservedChildren.js';

chai.use(sinonChai);
const { expect } = chai;

describe('withObservedChildren', () => {
  describe('.childrenObserverController()', () => {
    beforeEach(() => {
      global.MutationObserver = sinon.spy();
    });

    afterEach(() => {
      delete global.MutationObserver;
    });

    it('Should return a new MutationObserver receiving a callback', () => {
      const Component = withObservedChildren(undefined, { MutationObserver });
      const callback = () => {};

      Component.childrenObserverController(callback);

      expect(MutationObserver).to.have.been.calledWithNew;
      expect(MutationObserver).to.have.been.calledOnceWithExactly(callback);
    });
  });
});
