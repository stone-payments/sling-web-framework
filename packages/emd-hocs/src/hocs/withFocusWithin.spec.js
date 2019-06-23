import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { withFocusWithin } from './withFocusWithin.js';

chai.use(sinonChai);
const { expect } = chai;

class Dummy extends withFocusWithin() {}

describe('withFocusWithin', () => {
  let dummy;

  beforeEach(() => {
    dummy = new Dummy();
    dummy.addEventListener = sinon.spy();
    dummy.removeEventListener = sinon.spy();
    dummy.setAttribute = sinon.spy();
    dummy.removeAttribute = sinon.spy();
  });

  afterEach(() => {
    dummy = null;
  });

  describe('#connectedCallback()', () => {
    it('Should call addEventListener with focus and callback', () => {
      dummy.connectedCallback();
      expect(dummy.addEventListener).to.have.been
        .calledWith('focus', dummy._setFocusWithin);
    });

    it('Should call addEventListener with blur and callback', () => {
      dummy.connectedCallback();
      expect(dummy.addEventListener).to.have.been
        .calledWith('blur', dummy._unsetFocusWithin);
    });
  });

  describe('#disconnectedCallback()', () => {
    it('Should call removeEventListener with focus and callback', () => {
      dummy.disconnectedCallback();
      expect(dummy.removeEventListener).to.have.been
        .calledWith('focus', dummy._setFocusWithin);
    });

    it('Should call removeEventListener with blur and callback', () => {
      dummy.disconnectedCallback();
      expect(dummy.removeEventListener).to.have.been
        .calledWith('blur', dummy._unsetFocusWithin);
    });
  });

  describe('#_setFocusWithin()', () => {
    it('Should set focus-within attribute', () => {
      dummy._setFocusWithin();
      expect(dummy.setAttribute).to.have.been
        .calledOnceWith('focus-within', '');
    });
  });

  describe('#_unsetFocusWithin()', () => {
    it('Should remove focus-within attribute', () => {
      dummy._unsetFocusWithin();
      expect(dummy.removeAttribute).to.have.been
        .calledOnceWith('focus-within');
    });
  });
});
