import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { withRequestParams } from './withRequestParams.js';

chai.use(sinonChai);
const { expect } = chai;

describe('withRequestParams', () => {
  describe('.requestParamNames', () => {
    class Empty extends withRequestParams() {}

    it('Should return an empty array if not set', () => {
      expect(Empty.requestParamNames).to.deep.equal([]);
    });

    it('Should not override super.requestParamNames', () => {
      class Parent {
        static get requestParamNames () {
          return ['bassPlayer'];
        }
      }

      class Child extends withRequestParams(Parent) {}

      expect(Child.requestParamNames).to.deep.equal(['bassPlayer']);
    });
  });

  describe('._requestAttrNames', () => {
    it('Should return all param names converted to lowercase', () => {
      class Dummy extends withRequestParams() {
        static get requestParamNames () {
          return ['bassPlayer', 'guitarPlayer', 'drummer'];
        }
      }

      expect(Dummy._requestAttrNames)
        .to.deep.equal(['bassplayer', 'guitarplayer', 'drummer']);
    });
  });

  describe('.observedAttributes', () => {
    class Empty extends withRequestParams() {}

    it('Should return an empty array if not set', () => {
      expect(Empty.observedAttributes).to.deep.equal([]);
    });

    it('Should add param names converted to lowercase to ' +
      'super.observedAttributes', () => {
      class Parent {
        static get observedAttributes () {
          return ['concert'];
        }
      }

      class Child extends withRequestParams(Parent) {
        static get _requestAttrNames () {
          return ['bassplayer', 'guitarplayer', 'drummer'];
        }
      }

      expect(Child.observedAttributes)
        .to.deep.equal(['concert', 'bassplayer', 'guitarplayer', 'drummer']);
    });
  });

  describe('#constructor()', () => {
    class Dummy extends withRequestParams() {
      static get requestParamNames () {
        return ['bassPlayer', 'guitarPlayer', 'drummer'];
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

    it('Should define getters and setters to params', () => {
      const descriptor = Object.getOwnPropertyDescriptor(dummy, 'bassPlayer');

      descriptor.get.call(dummy);
      expect(dummy.getAttribute).to.have.been.calledOnce;

      descriptor.set.call(dummy, 'string');
      expect(dummy.setAttribute).to.have.been.calledOnce;

      descriptor.set.call(dummy);
      expect(dummy.removeAttribute).to.have.been.calledOnce;
    });

    it('Should also define getters and setters to lowercase params', () => {
      const descriptor = Object.getOwnPropertyDescriptor(dummy, 'bassplayer');

      descriptor.get.call(dummy);
      expect(dummy.getAttribute).to.have.been.calledOnce;

      descriptor.set.call(dummy, 'drummer');
      expect(dummy.setAttribute).to.have.been.calledOnce;

      descriptor.set.call(dummy);
      expect(dummy.removeAttribute).to.have.been.calledOnce;
    });

    it('Expect getters to trigger getAttribute', () => {
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

    it('Expect setters to trigger setAttribute if passed strings', () => {
      dummy.bassPlayer = 'Ben Adamo';
      dummy.guitarPlayer = 'Miyagi';
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
      'null or undefined, but not false', () => {
      dummy.bassPlayer = false;
      dummy.guitarPlayer = null;
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
      static get requestParamNames () {
        return ['affiliationCode', 'startDate', 'finalDate'];
      }
    }

    it('Should call inherited attributeChangedCallback', () => {
      class Parent {}
      Parent.prototype.attributeChangedCallback = sinon.spy();

      class Child extends withRequestParams(Parent) {}
      const child = new Child();
      child.attributeChangedCallback();

      expect(Parent.prototype.attributeChangedCallback)
        .to.have.been.calledOnce;
    });

    it('Should call requestParamsChangedCallback if a request ' +
      'param changes', async () => {
      const dummy = new Dummy();
      dummy.requestParamsChangedCallback = sinon.spy();
      await dummy.attributeChangedCallback('startdate', '20180901', '20180915');
      expect(dummy.requestParamsChangedCallback).to.have.been.called;
    });

    it('Should not call requestParamsChangedCallback if a request param ' +
      'changes to the previous value', async () => {
      const dummy = new Dummy();
      dummy.requestParamsChangedCallback = sinon.spy();
      await dummy.attributeChangedCallback('startdate', 'sameDate', 'sameDate');
      expect(dummy.requestParamsChangedCallback).not.to.have.been.called;
    });

    it('Should not call requestParamsChangedCallback if a changed attribute ' +
      'is not a request param', async () => {
      const dummy = new Dummy();
      dummy.requestParamsChangedCallback = sinon.spy();
      await dummy.attributeChangedCallback('notSet', 'pastValue', 'nextValue');
      expect(dummy.requestParamsChangedCallback).not.to.have.been.called;
    });

    it('Should receive an object containing all the request parameters ' +
      'as the first argument', async () => {
      const dummy = new Dummy();
      dummy.requestParamsChangedCallback = sinon.spy();
      await dummy.attributeChangedCallback('startdate', '20180901', '20180915');

      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({
        startDate: '20180915'
      });

      await dummy.attributeChangedCallback('finaldate', '20200901', '20200915');

      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({
        startDate: '20180915',
        finalDate: '20200915'
      });
    });

    it('Should exclude parameters with empty values ' +
      'at the first argument', async () => {
      const dummy = new Dummy();
      dummy.requestParamsChangedCallback = sinon.spy();

      await dummy.attributeChangedCallback('startdate', '20180901', null);
      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({});

      await dummy.attributeChangedCallback('finaldate', '20200901', '');
      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({});

      await dummy.attributeChangedCallback('affiliationcode', '', '123456789');
      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({
        affiliationCode: '123456789'
      });
    });

    it('Should receive an object containing only the changed parameters ' +
      'as the second argument', async () => {
      const dummy = new Dummy();
      dummy.requestParamsChangedCallback = sinon.spy();
      await dummy.attributeChangedCallback('startdate', '20180901', '20180915');

      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({
        startDate: '20180915'
      }, {
        startDate: '20180915'
      });

      await dummy.attributeChangedCallback('finaldate', '20200901', '20200915');

      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({
        startDate: '20180915',
        finalDate: '20200915'
      }, {
        finalDate: '20200915'
      });

      expect(dummy.requestParams).to.deep.equal({
        startDate: '20180915',
        finalDate: '20200915'
      });
    });

    it('Should not exclude parameters with empty or undefined values ' +
      'at the second argument', async () => {
      const dummy = new Dummy();
      dummy.requestParamsChangedCallback = sinon.spy();
      await dummy.attributeChangedCallback('startdate', '20180901', null);

      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({}, {
        startDate: null
      });

      await dummy.attributeChangedCallback('finaldate', '20200901', '');

      expect(dummy.requestParamsChangedCallback).to.have.been.calledWith({}, {
        finalDate: null
      });

      expect(dummy.requestParams).to.deep.equal({});
    });

    it('Should not break if requestParamsChangedCallback ' +
      'is not a function', async () => {
      const dummy = new Dummy();
      await dummy.attributeChangedCallback('startdate', '20180901', '20200915');

      expect(dummy.requestParams).to.deep.equal({
        startDate: '20200915'
      });
    });

    it('Should change requestParams only once after many ' +
      'attribute changes', async () => {
      const dummy = new Dummy();

      dummy.attributeChangedCallback('affiliationcode', '123', '321');
      dummy.attributeChangedCallback('startdate', '20180901', '20180915');
      dummy.attributeChangedCallback('finaldate', '20200901', '20200915');

      expect(dummy.requestParams).to.deep.equal({});

      await Promise.resolve();

      expect(dummy.requestParams).to.deep.equal({
        affiliationCode: '321',
        startDate: '20180915',
        finalDate: '20200915'
      });
    });

    it('Should trigger requestParamsChangedCallback only once after many ' +
      'attribute changes', async () => {
      const dummy = new Dummy();
      dummy.requestParamsChangedCallback = sinon.spy();

      dummy.attributeChangedCallback('affiliationcode', '123', '321');
      dummy.attributeChangedCallback('startdate', '20180901', '20180915');
      dummy.attributeChangedCallback('finaldate', '20200901', '20200915');

      expect(dummy.requestParamsChangedCallback).not.to.have.been.called;

      await Promise.resolve();

      const changes = {
        affiliationCode: '321',
        startDate: '20180915',
        finalDate: '20200915'
      };

      expect(dummy.requestParamsChangedCallback)
        .to.have.been.calledWith(changes, changes);
    });
  });

  describe('.receivedAllRequestParams', () => {
    class Dummy extends withRequestParams() {
      static get requestParamNames () {
        return ['bassPlayer', 'guitarPlayer', 'drummer'];
      }
    }

    let dummy;

    beforeEach(() => {
      dummy = new Dummy();
      dummy._attributes = {};
      dummy.getAttribute = attrName => dummy._attributes[attrName];

      dummy.setAttribute = (attrName, value) => {
        const lowerAttrName = attrName.toLowerCase();
        dummy._attributes[lowerAttrName] = value;

        if (dummy.constructor.observedAttributes.includes(lowerAttrName)) {
          dummy.attributeChangedCallback(lowerAttrName, null, value);
        }
      };
    });

    afterEach(() => {
      dummy = null;
    });

    it('Should return true if all params were passed ' +
      'via attribute', async () => {
      dummy.setAttribute('bassplayer', 'Ben Adamo');
      dummy.setAttribute('guitarplayer', 'Miyagi');
      dummy.setAttribute('drummer', 'Ed Chivers');

      await Promise.resolve();
      expect(dummy.receivedAllRequestParams).to.be.true;
    });

    it('Should return true if all params were passed ' +
      'via property', async () => {
      dummy.bassPlayer = 'Ben Adamo';
      dummy.guitarPlayer = 'Miyagi';
      dummy.drummer = 'Ed Chivers';

      await Promise.resolve();
      expect(dummy.receivedAllRequestParams).to.be.true;
    });

    it('Should return true if all params were passed ' +
      'via lowercase property', async () => {
      dummy.bassplayer = 'Ben Adamo';
      dummy.guitarplayer = 'Miyagi';
      dummy.drummer = 'Ed Chivers';

      await Promise.resolve();
      expect(dummy.receivedAllRequestParams).to.be.true;
    });

    it('Should return false if not all params were passed', async () => {
      dummy.bassplayer = 'Ben Adamo';
      dummy.guitarplayer = 'Miyagi';

      await Promise.resolve();
      expect(dummy.receivedAllRequestParams).to.be.false;
    });
  });

  describe('.receivedSomeRequestParams()', () => {
    class Dummy extends withRequestParams() {
      static get requestParamNames () {
        return ['bassPlayer', 'guitarPlayer', 'drummer'];
      }
    }

    let dummy;

    beforeEach(() => {
      dummy = new Dummy();
      dummy._attributes = {};
      dummy.getAttribute = attrName => dummy._attributes[attrName];

      dummy.setAttribute = (attrName, value) => {
        const lowerAttrName = attrName.toLowerCase();
        dummy._attributes[lowerAttrName] = value;

        if (dummy.constructor.observedAttributes.includes(lowerAttrName)) {
          dummy.attributeChangedCallback(lowerAttrName, null, value);
        }
      };
    });

    afterEach(() => {
      dummy = null;
    });

    it('Should return true if expected params were passed ' +
      'via attribute', async () => {
      dummy.setAttribute('bassplayer', 'Ben Adamo');
      dummy.setAttribute('drummer', 'Ed Chivers');

      await Promise.resolve();
      expect(dummy.receivedSomeRequestParams(['bassPlayer', 'drummer']))
        .to.be.true;
    });

    it('Should return true if expected params were passed ' +
      'via property', async () => {
      dummy.bassPlayer = 'Ben Adamo';
      dummy.drummer = 'Ed Chivers';

      await Promise.resolve();
      expect(dummy.receivedSomeRequestParams(['bassPlayer', 'drummer']))
        .to.be.true;
    });

    it('Should return true if expected params were passed ' +
      'via lowercase property', async () => {
      dummy.bassplayer = 'Ben Adamo';
      dummy.drummer = 'Ed Chivers';

      await Promise.resolve();
      expect(dummy.receivedSomeRequestParams(['bassPlayer', 'drummer']))
        .to.be.true;
    });

    it('Should return false if not all expected were passed', async () => {
      dummy.drummer = 'Ed Chivers';

      await Promise.resolve();
      expect(dummy.receivedSomeRequestParams(['bassPlayer', 'drummer']))
        .to.be.false;
    });
  });
});
