import sinon from 'sinon';
import { withBusinessLogic } from './withBusinessLogic.js';

let $dummy;
let spy;

class BusinessTester extends withBusinessLogic() {
  static get properties() {
    return {
      token: {
        callSdk: 'required',
      },
      id: {
        callSdk: 'required',
      },
      state: {
        callSdk: 'optional',
      },
      loading: {
        type: Boolean,
      },
    };
  }

  render() {}
}

window.customElements.define('business-tester', BusinessTester);

describe('withBusinessLogic', () => {
  beforeEach(() => {
    spy = sinon.spy();
    $dummy = document.createElement('business-tester');
    document.body.appendChild($dummy);
  });

  afterEach(() => {
    document.body.removeChild($dummy);
    $dummy = null;
    spy = null;
  });

  describe('#_observedRequestParams', () => {
    it('Should observe some properties that are either required ' +
      'or optional to make requests.', () => {
      expect($dummy.constructor._observedRequestParams)
        .to.eql({
          token: {
            callSdk: 'required',
          },
          id: {
            callSdk: 'required',
          },
          state: {
            callSdk: 'optional',
          },
        });
    });
  });

  describe('#_observedRequiredRequestParams', () => {
    it('Should observe some properties that are required ' +
      'to make requests.', () => {
      expect($dummy.constructor._observedRequiredRequestParams)
        .to.eql({
          token: {
            callSdk: 'required',
          },
          id: {
            callSdk: 'required',
          },
        });
    });
  });

  describe('._propertiesChanged', () => {
    it('Should run _triggerSdkCall if a required ' +
      'parameter changes.', (done) => {
      $dummy._triggerSdkCall = spy;
      expect(spy).not.to.have.been.called;

      $dummy.token = '111222333444';
      setTimeout(() => {
        expect(spy).to.have.been.calledOnce;
        done();
      });
    });

    it('Should run _triggerSdkCall if an optional ' +
      'parameter changes.', (done) => {
      $dummy._triggerSdkCall = spy;
      expect(spy).not.to.have.been.called;

      $dummy.state = 'level';
      setTimeout(() => {
        expect(spy).to.have.been.calledOnce;
        done();
      });
    });

    it('Should not run _triggerSdkCall if an unrelated ' +
      'property changes.', (done) => {
      $dummy._triggerSdkCall = spy;
      expect(spy).not.to.have.been.called;

      $dummy.loading = true;
      setTimeout(() => {
        expect(spy).not.to.have.been.called;
        done();
      });
    });
  });

  describe('._shouldTriggerSdkCall', () => {
    it('Should return true if the last request was made with ' +
      'different parameters and all required ones are present.', () => {
      $dummy.token = '111222333444';
      $dummy.id = '12345';

      $dummy.requestParams = {
        token: $dummy.token,
        id: $dummy.id,
      };

      $dummy.lastRequestParams = {};

      expect($dummy._shouldTriggerSdkCall).to.be.true;
    });

    it('Should return true if an optional parameter is added.', () => {
      $dummy.token = '111222333444';
      $dummy.id = '12345';

      $dummy.requestParams = {
        token: $dummy.token,
        id: $dummy.id,
      };

      $dummy.lastRequestParams = {
        ...$dummy.requestParams,
      };

      expect($dummy._shouldTriggerSdkCall).to.be.false;

      $dummy.state = '12345';

      $dummy.lastRequestParams = { ...$dummy.requestParams };

      $dummy.requestParams = {
        token: $dummy.token,
        id: $dummy.id,
        state: $dummy.state,
      };

      expect($dummy._shouldTriggerSdkCall).to.be.true;
    });

    it('Should return false if the last request has been made ' +
      'with the same parameters.', () => {
      $dummy.token = '111222333444';
      $dummy.id = '12345';

      $dummy.requestParams = {
        token: $dummy.token,
        id: $dummy.id,
      };

      $dummy.lastRequestParams = {
        ...$dummy.requestParams,
      };

      expect($dummy._shouldTriggerSdkCall).to.be.false;
    });

    it('Should return false if the request is missing ' +
      'required parameters.', () => {
      $dummy.token = '111222333444';

      $dummy.requestParams = {
        token: $dummy.token,
      };

      $dummy.lastRequestParams = {};

      expect($dummy._shouldTriggerSdkCall).to.be.false;
    });
  });
});
