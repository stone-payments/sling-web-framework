import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { withTabFocus } from './withTabFocus.js';

chai.use(sinonChai);
const { expect } = chai;

class Dummy extends withTabFocus() {}

describe('withTabFocus', () => {
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
    it('Should call addEventListener with keyup and callback', () => {
      dummy.connectedCallback();
      expect(dummy.addEventListener).to.have.been
        .calledWith('keyup', dummy._setTabPressed);
    });

    it('Should call addEventListener with focus and callback', () => {
      dummy.connectedCallback();
      expect(dummy.addEventListener).to.have.been
        .calledWith('focus', dummy._setTabFocus);
    });

    it('Should call addEventListener with blur and callback', () => {
      dummy.connectedCallback();
      expect(dummy.addEventListener).to.have.been
        .calledWith('blur', dummy._unsetTabFocus);
    });
  });

  describe('#disconnectedCallback()', () => {
    it('Should call removeEventListener with keyup and callback', () => {
      dummy.disconnectedCallback();
      expect(dummy.removeEventListener).to.have.been
        .calledWith('keyup', dummy._setTabPressed);
    });

    it('Should call removeEventListener with focus and callback', () => {
      dummy.disconnectedCallback();
      expect(dummy.removeEventListener).to.have.been
        .calledWith('focus', dummy._setTabFocus);
    });

    it('Should call removeEventListener with blur and callback', () => {
      dummy.disconnectedCallback();
      expect(dummy.removeEventListener).to.have.been
        .calledWith('blur', dummy._unsetTabFocus);
    });
  });

  describe('#_setTabPressed()', () => {
    it('Should set tab-focus attribute if focus happened', () => {
      dummy._gotFocused = true;
      dummy._setTabPressed();
      expect(dummy.setAttribute).to.have.been
        .calledOnceWith('tab-focus', '');
    });

    it('Should set tab-focus attribute if focus happened', () => {
      dummy._gotFocused = false;
      dummy._setTabPressed();
      expect(dummy.setAttribute).not.to.have.been.called;
    });
  });

  describe('#_setTabFocus()', () => {
    it('Should set _gotFocused to true', () => {
      dummy._setTabFocus();
      expect(dummy._gotFocused).to.be.true;
    });
  });

  describe('#_unsetTabFocus()', () => {
    it('Should remove tab-focus and set _gotFocused to false', () => {
      dummy._unsetTabFocus();
      expect(dummy._gotFocused).to.be.false;
      expect(dummy.removeAttribute).to.have.been
        .calledOnceWith('tab-focus');
    });
  });
});
