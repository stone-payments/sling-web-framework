import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { withLoadingAndErrorHandling } from './withLoadingAndErrorHandling.js';

chai.use(sinonChai);
const { expect } = chai;

class Dummy extends withLoadingAndErrorHandling() {}

describe('withLoadingAndErrorHandling', () => {
  describe('#_requestSingle()', () => {
    let dummy;

    beforeEach(() => {
      dummy = new Dummy();
      dummy._startLoading = sinon.spy();
      dummy.dispatchEventAndMethod = sinon.spy();
      dummy._finishLoading = sinon.spy();
    });

    afterEach(() => {
      dummy._startLoading = null;
      dummy.dispatchEventAndMethod = null;
      dummy._finishLoading = null;
      dummy = null;
    });

    it('Should call this._startLoading', () => {
      dummy._requestSingle(Promise.resolve());
      expect(dummy._startLoading).to.have.been.calledOnce;
    });

    it('Should react to request success', async () => {
      const responseData = 'myData';
      const response = await dummy
        ._requestSingle(Promise.resolve(responseData));

      expect(response).to.equal(responseData);

      expect(dummy.dispatchEventAndMethod)
        .to.have.been.calledWith('requestsuccess');

      expect(dummy.dispatchEventAndMethod)
        .to.have.been.calledBefore(dummy._finishLoading);
    });

    it('Should react to request error', async () => {
      const reponseError = 'myError';

      try {
        await dummy._requestSingle(Promise.reject(reponseError));

        expect(dummy.dispatchEventAndMethod)
          .to.have.been.calledWith('requesterror', reponseError);

        expect(dummy.dispatchEventAndMethod)
          .to.have.been.calledBefore(dummy._finishLoading);

        expect(dummy.requestErrors).to.deep.equal([reponseError]);
      } catch (err) {
        expect(err).to.equal(reponseError);
      }
    });
  });

  describe('#_startLoading()', () => {
    let dummy;

    beforeEach(() => {
      dummy = new Dummy();
      dummy.dispatchEventAndMethod = sinon.spy();
    });

    afterEach(() => {
      dummy.dispatchEventAndMethod = null;
      dummy = null;
    });

    it('Should dispatch event if this._loading is zero', () => {
      dummy._loading = 0;
      dummy._startLoading();

      expect(dummy.dispatchEventAndMethod)
        .to.have.been.calledWith('loadingstart');
    });

    it('Should not dispatch event if this._loading is more than zero', () => {
      dummy._loading = 5;
      dummy._startLoading();
      expect(dummy.dispatchEventAndMethod).not.to.have.been.called;
    });

    it('Should increment this._loading', () => {
      dummy._loading = 0;
      dummy._startLoading();
      expect(dummy._loading).to.equal(1);
    });

    it('Should update this.isLoading', () => {
      dummy.isLoading = false;
      dummy._loading = 0;
      dummy._startLoading();
      expect(dummy.isLoading).to.be.true;
    });
  });

  describe('#_finishLoading()', () => {
    let dummy;

    beforeEach(() => {
      dummy = new Dummy();
      dummy.dispatchEventAndMethod = sinon.spy();
    });

    afterEach(() => {
      dummy.dispatchEventAndMethod = null;
      dummy = null;
    });

    it('Should decrement this._loading', () => {
      dummy._loading = 1;
      dummy._finishLoading();
      expect(dummy._loading).to.equal(0);
    });

    it('Should update this.isLoading', () => {
      dummy.isLoading = true;
      dummy._loading = 1;
      dummy._finishLoading();
      expect(dummy.isLoading).to.be.false;
    });

    it('Should dispatch event if this._loading is zero', () => {
      dummy._loading = 1;
      dummy._finishLoading();
      expect(dummy._loading).to.equal(0);

      expect(dummy.dispatchEventAndMethod)
        .to.have.been.calledWith('loadingend');
    });

    it('Should not dispatch event if this._loading is more than zero', () => {
      dummy._loading = 5;
      dummy._finishLoading();
      expect(dummy._loading).to.equal(4);
      expect(dummy.dispatchEventAndMethod).not.to.have.been.called;
    });
  });

  describe('#request()', () => {
    let dummy;

    beforeEach(() => {
      dummy = new Dummy();
      dummy._requestSingle = sinon.spy();
    });

    afterEach(() => {
      dummy._requestSingle = null;
      dummy = null;
    });

    it('Should handle a single request', () => {
      const singleRequest = Promise.resolve();
      dummy.request(singleRequest);

      expect(dummy._requestSingle).to.have.been.calledOnce;
      expect(dummy._requestSingle)
        .to.always.have.been.calledWith(singleRequest);
    });

    it('Should handle many requests', () => {
      const singleRequest = Promise.resolve();
      const manyRequests = [singleRequest, singleRequest, singleRequest];
      dummy.request(manyRequests);

      expect(dummy._requestSingle).to.have.been.calledThrice;
      expect(dummy._requestSingle)
        .to.always.have.been.calledWith(singleRequest);
    });

    it('Should correctly bind this', () => {
      dummy._requestSingle = function named () {
        return this;
      };

      expect(dummy.request()).to.equal(dummy);
    });
  });
});
