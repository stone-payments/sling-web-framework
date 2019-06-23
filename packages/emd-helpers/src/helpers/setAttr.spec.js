import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { setAttr } from './setAttr.js';

chai.use(sinonChai);
const { expect } = chai;

let domEl;

describe('setAttr', () => {
  beforeEach(() => {
    domEl = {
      removeAttribute: sinon.spy(),
      setAttribute: sinon.spy()
    };
  });

  afterEach(() => {
    domEl = undefined;
  });

  it('Should remove attribute if undefined', () => {
    setAttr(domEl, 'attr');
    expect(domEl.removeAttribute).to.have.been.calledOnceWith('attr');
  });

  it('Should remove attribute if null', () => {
    setAttr(domEl, 'attr', null);
    expect(domEl.removeAttribute).to.have.been.calledOnceWith('attr');
  });

  it('Should remove attribute if NaN', () => {
    setAttr(domEl, 'attr', NaN);
    expect(domEl.removeAttribute).to.have.been.calledOnceWith('attr');
  });

  it('Should remove attribute if false', () => {
    setAttr(domEl, 'attr', false);
    expect(domEl.removeAttribute).to.have.been.calledOnceWith('attr');
  });

  it('Should set attribute to an empty string if true', () => {
    setAttr(domEl, 'attr', true);
    expect(domEl.setAttribute).to.have.been.calledOnceWith('attr', '');
  });

  it('Should set attribute if string', () => {
    setAttr(domEl, 'attr', 'value');
    expect(domEl.setAttribute).to.have.been.calledOnceWith('attr', 'value');
  });
});
