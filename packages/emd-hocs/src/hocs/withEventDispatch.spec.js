import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { withEventDispatch } from './withEventDispatch.js';

chai.use(sinonChai);
const { expect } = chai;

class Dummy extends withEventDispatch() {}

describe('withEventDispatch', () => {
  let dummy;
  let target;

  beforeEach(() => {
    global.CustomEvent = sinon.spy();
    dummy = new Dummy();
    target = { dispatchEvent: sinon.spy() };
  });

  afterEach(() => {
    delete global.CustomEvent;
    dummy = null;
    target = null;
  });

  describe('#dispatchEventAndMethod()', () => {
    it('Should call CustomEvent with new', () => {
      dummy.dispatchEventAndMethod('click', {}, target);
      expect(global.CustomEvent).to.have.been.calledWithNew;
    });

    it('Should pass event name and detail to CustomEvent', () => {
      dummy.dispatchEventAndMethod('click', {}, target);

      expect(global.CustomEvent).to.have.been.calledWith('click', {
        bubbles: true,
        detail: {}
      });
    });

    it('Should call dispatchEvent on target passing the event', () => {
      global.CustomEvent = class {};
      dummy.dispatchEventAndMethod('click', {}, target);
      const [event] = target.dispatchEvent.firstCall.args;

      expect(target.dispatchEvent).to.have.been.calledOnce;
      expect(event).to.be.an.instanceof(global.CustomEvent);
    });

    it('Should call a method named after the event if it exists', () => {
      target.onclick = sinon.spy();

      global.CustomEvent = class {};
      dummy.dispatchEventAndMethod('click', {}, target);
      const [event] = target.onclick.firstCall.args;

      expect(target.onclick).to.have.been.calledOnce;
      expect(event).to.be.an.instanceof(global.CustomEvent);
    });

    it('Should use this if target is not passed', () => {
      dummy.dispatchEvent = sinon.spy();

      global.CustomEvent = class {};
      dummy.dispatchEventAndMethod('click', {});
      const [event] = dummy.dispatchEvent.firstCall.args;

      expect(dummy.dispatchEvent).to.have.been.calledOnce;
      expect(event).to.be.an.instanceof(global.CustomEvent);
    });
  });

  describe('#bubbleEvent()', () => {
    it('Should call dispatchEvent receiving the event', () => {
      const EVENT = Symbol('EVENT');
      dummy.dispatchEvent = sinon.spy();
      dummy.bubbleEvent(EVENT);

      expect(dummy.dispatchEvent)
        .to.have.been.calledOnceWith(EVENT);
    });
  });
});
