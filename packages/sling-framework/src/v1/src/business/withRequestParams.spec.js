import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { withRequestParams } from './withRequestParams.js';

chai.use(sinonChai);
const { expect } = chai;

let spy;

describe('withRequestParams', () => {
  beforeEach(() => {
    spy = sinon.spy();
  });

  afterEach(() => {
    spy = undefined;
  });

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

      getAttribute(attrName) {
        spy('getAttr', attrName, this);
      }

      removeAttribute(attrName) {
        spy('removeAttr', attrName, this);
      }

      setAttribute(attrName, value) {
        spy('setAttr', attrName, value, this);
      }
    }

    const dummy = new Dummy();

    it('Should define getters and setters.', () => {
      let descriptor;

      descriptor = Object.getOwnPropertyDescriptor(dummy, 'bassplayer');
      expect(descriptor.get).to.be.a('function');
      expect(descriptor.set).to.be.a('function');

      descriptor = Object.getOwnPropertyDescriptor(dummy, 'drummer');
      expect(descriptor.get).to.be.a('function');
      expect(descriptor.set).to.be.a('function');

      descriptor = Object.getOwnPropertyDescriptor(dummy, 'guitarplayer');
      expect(descriptor.get).to.be.a('function');
      expect(descriptor.set).to.be.a('function');
    });

    it('Expect getters to trigger getAttribute.', () => {
      const { bassplayer, guitarplayer, drummer } = dummy;

      expect(spy).to.have.been.calledThrice;

      expect(spy).to.have.been.calledWith('getAttr', 'bassplayer');
      expect(spy).to.have.been.calledWith('getAttr', 'guitarplayer');
      expect(spy).to.have.been.calledWith('getAttr', 'drummer');

      expect(bassplayer).to.be.undefined;
      expect(guitarplayer).to.be.undefined;
      expect(drummer).to.be.undefined;
    });

    it('Expect setters to trigger setAttribute if passed strings.', () => {
      dummy.bassplayer = 'Ben Adamo';
      dummy.guitarplayer = 'Miyagi';
      dummy.drummer = 'Ed Chivers';

      expect(spy).to.have.been.calledThrice;

      expect(spy).to.have.been.calledWith('setAttr', 'bassplayer', 'Ben Adamo');
      expect(spy).to.have.been.calledWith('setAttr', 'guitarplayer', 'Miyagi');
      expect(spy).to.have.been.calledWith('setAttr', 'drummer', 'Ed Chivers');
    });

    it('Expect setters to trigger removeAttribute if passed ' +
      'null or undefined, but not false.', () => {
      dummy.bassplayer = false;
      dummy.guitarplayer = null;
      dummy.drummer = undefined;

      expect(spy).to.have.been.calledThrice;

      expect(spy).to.have.been.calledWith('setAttr', 'bassplayer', false);
      expect(spy).to.have.been.calledWith('removeAttr', 'guitarplayer');
      expect(spy).to.have.been.calledWith('removeAttr', 'drummer');
    });
  });

  describe('#attributeChangedCallback()', () => {
    it('Should call inherited attributeChangedCallback.', () => {

    });

    it('Should call requestParamsChangedCallback if a request ' +
      'param changes.', () => {

    });

    it('Should not break if requestParamsChangedCallback ' +
      'is not a function.', () => {

    });

    it('Should not call requestParamsChangedCallback if a request param ' +
      'changes to the previous value.', () => {

    });

    it('Should not call requestParamsChangedCallback if a changed attribute ' +
      'is not a request param.', () => {

    });

    it('Should receive an object containing all the request parameters ' +
      'as the first argument.', () => {

    });

    it('Should exclude parameters with empty values ' +
      'at the first argument.', () => {

    });

    it('Should receive an object containing only the changed parameters ' +
      'as the second argument.', () => {

    });

    it('Should not exclude parameters with empty or undefined values ' +
      'at the second argument.', () => {

    });
  });
});
