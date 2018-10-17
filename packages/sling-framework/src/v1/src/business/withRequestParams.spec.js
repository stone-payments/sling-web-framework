import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { withRequestParams } from './withRequestParams.js';

chai.use(sinonChai);
const { expect } = chai;

describe('withRequestParams', () => {
  describe('.requestParamNames', () => {
    class Empty extends withRequestParams() {}

    it('Should return an empty array if not set.', () => {
      expect(Empty.requestParamNames).to.deep.equal([]);
    });

    it('Should not override super.requestParamNames.', () => {
      class Parent {
        static get requestParamNames() {
          return ['bassPlayer'];
        }
      }

      class Child extends withRequestParams(Parent) {}

      expect(Child.requestParamNames).to.deep.equal(['bassPlayer']);
    });
  });

  describe('.requestAttrNames', () => {
    it('Should return all param names converted to lowercase.', () => {
      class Dummy extends withRequestParams() {
        static get requestParamNames() {
          return ['bassPlayer', 'guitarPlayer', 'drummer'];
        }
      }

      expect(Dummy.requestAttrNames)
        .to.deep.equal(['bassplayer', 'guitarplayer', 'drummer']);
    });
  });

  describe('.observedAttributes', () => {
    class Empty extends withRequestParams() {}

    it('Should return an empty array if not set.', () => {
      expect(Empty.observedAttributes).to.deep.equal([]);
    });

    it('Should add param names converted to lowercase to ' +
      'super.observedAttributes.', () => {
      class Parent {
        static get observedAttributes() {
          return ['concert'];
        }
      }

      class Child extends withRequestParams(Parent) {
        static get requestAttrNames() {
          return ['bassplayer', 'guitarplayer', 'drummer'];
        }
      }

      expect(Child.observedAttributes)
        .to.deep.equal(['concert', 'bassplayer', 'guitarplayer', 'drummer']);
    });
  });

  describe('#constructor()', () => {
    class Dummy extends withRequestParams() {
      static get requestAttrNames() {
        return ['bassplayer', 'guitarplayer', 'drummer'];
      }
    }

    let dummy;

    beforeEach(() => {
      Dummy.prototype.getAttribute = sinon.spy();
      Dummy.prototype.removeAttribute = sinon.spy();
      Dummy.prototype.setAttribute = sinon.spy();
      dummy = new Dummy();
    });

    afterEach(() => {
      dummy = null;
      Dummy.prototype.getAttribute = null;
      Dummy.prototype.removeAttribute = null;
      Dummy.prototype.setAttribute = null;
    });

    it('Should define getters and setters.', () => {
      const descriptor = Object.getOwnPropertyDescriptor(dummy, 'bassplayer');

      descriptor.get.call(dummy);
      expect(dummy.getAttribute).to.have.been.calledOnce;

      descriptor.set.call(dummy, 'string');
      expect(dummy.setAttribute).to.have.been.calledOnce;

      descriptor.set.call(dummy);
      expect(dummy.removeAttribute).to.have.been.calledOnce;
    });

    it('Expect getters to trigger getAttribute.', () => {
      const { bassplayer, guitarplayer, drummer } = dummy;

      expect(dummy.getAttribute).to.have.been.calledThrice;

      expect(dummy.getAttribute)
        .to.have.been.calledWith('bassplayer');

      expect(dummy.getAttribute)
        .to.have.been.calledWith('guitarplayer');

      expect(dummy.getAttribute)
        .to.have.been.calledWith('drummer');

      expect(bassplayer).to.be.undefined;
      expect(guitarplayer).to.be.undefined;
      expect(drummer).to.be.undefined;
    });

    it('Expect setters to trigger setAttribute if passed strings.', () => {
      dummy.bassplayer = 'Ben Adamo';
      dummy.guitarplayer = 'Miyagi';
      dummy.drummer = 'Ed Chivers';

      expect(dummy.setAttribute).to.have.been.calledThrice;

      expect(dummy.setAttribute)
        .to.have.been.calledWith('bassplayer', 'Ben Adamo');

      expect(dummy.setAttribute)
        .to.have.been.calledWith('guitarplayer', 'Miyagi');

      expect(dummy.setAttribute)
        .to.have.been.calledWith('drummer', 'Ed Chivers');
    });

    it('Expect setters to trigger removeAttribute if passed ' +
      'null or undefined, but not false.', () => {
      dummy.bassplayer = false;
      dummy.guitarplayer = null;
      dummy.drummer = undefined;

      expect(dummy.setAttribute)
        .to.have.been.calledWith('bassplayer', false);

      expect(dummy.removeAttribute)
        .to.have.been.calledWith('guitarplayer');

      expect(dummy.removeAttribute)
        .to.have.been.calledWith('drummer');
    });
  });

  describe('#attributeChangedCallback()', () => {
    class Dummy extends withRequestParams() {
      static get requestParamNames() {
        return ['affiliationCode', 'startDate', 'finalDate'];
      }
    }

    it('Should call inherited attributeChangedCallback.', () => {
      class Parent {}
      Parent.prototype.attributeChangedCallback = sinon.spy();

      class Child extends withRequestParams(Parent) {}
      const child = new Child();
      child.attributeChangedCallback();

      expect(Parent.prototype.attributeChangedCallback)
        .to.have.been.calledOnce;
    });

    it('Should call requestParamsChangedCallback if a request ' +
      'param changes.', () => {
      const dummy = new Dummy();
      dummy.requestParamsChangedCallback = sinon.spy();
      dummy.attributeChangedCallback('startdate', '20180901', '20180915');
      expect(dummy.requestParamsChangedCallback).to.have.been.called;
    });

    it('Should not call requestParamsChangedCallback if a request param ' +
      'changes to the previous value.', () => {
      const dummy = new Dummy();
      dummy.requestParamsChangedCallback = sinon.spy();
      dummy.attributeChangedCallback('startdate', 'sameDate', 'sameDate');
      expect(dummy.requestParamsChangedCallback).not.to.have.been.called;
    });

    it('Should not call requestParamsChangedCallback if a changed attribute ' +
      'is not a request param.', () => {
      const dummy = new Dummy();
      dummy.requestParamsChangedCallback = sinon.spy();
      dummy.attributeChangedCallback('notSet', 'oldValue', 'newValue');
      expect(dummy.requestParamsChangedCallback).not.to.have.been.called;
    });

    it('Should receive an object containing all the request parameters ' +
      'as the first argument.', () => {
      const dummy = new Dummy();
      dummy.requestParamsChangedCallback = sinon.spy();
      dummy.attributeChangedCallback('startdate', '20180901', '20180915');

      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({
        startDate: '20180915',
      });

      dummy.attributeChangedCallback('finaldate', '20200901', '20200915');

      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({
        startDate: '20180915',
        finalDate: '20200915',
      });
    });

    it('Should exclude parameters with empty values ' +
      'at the first argument.', () => {
      const dummy = new Dummy();
      dummy.requestParamsChangedCallback = sinon.spy();

      dummy.attributeChangedCallback('startdate', '20180901', null);
      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({});

      dummy.attributeChangedCallback('finaldate', '20200901', '');
      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({});

      dummy.attributeChangedCallback('affiliationcode', '', '123456789');
      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({
        affiliationCode: '123456789',
      });
    });

    it('Should receive an object containing only the changed parameters ' +
      'as the second argument.', () => {
      const dummy = new Dummy();
      dummy.requestParamsChangedCallback = sinon.spy();
      dummy.attributeChangedCallback('startdate', '20180901', '20180915');

      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({
        startDate: '20180915',
      }, {
        startDate: '20180915',
      });

      dummy.attributeChangedCallback('finaldate', '20200901', '20200915');

      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({
        startDate: '20180915',
        finalDate: '20200915',
      }, {
        finalDate: '20200915',
      });
    });

    it('Should not exclude parameters with empty or undefined values ' +
      'at the second argument.', () => {

    });

    it('Should not break if requestParamsChangedCallback ' +
      'is not a function.', () => {

    });
  });
});
