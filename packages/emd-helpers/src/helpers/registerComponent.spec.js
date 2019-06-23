import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { registerComponent } from './registerComponent.js';

chai.use(sinonChai);
const { expect } = chai;

describe('registerComponent', () => {
  afterEach(() => {
    delete global.customElements;
  });

  it('Should not break if customElements does not exist', () => {
    global.customElements = undefined;
    expect(registerComponent('comp', class {})).to.be.undefined;
  });

  it('Should register a web component if not registered yet', () => {
    global.customElements = {
      get () {
        return true;
      },
      define: sinon.spy()
    };

    registerComponent('comp', class {});

    expect(global.customElements.define).not.to.have.been.called;
  });

  it('Should not register a web component if already registered', () => {
    global.customElements = {
      get () {
        return false;
      },
      define: sinon.spy()
    };

    class Component {}

    registerComponent('comp', Component);

    expect(global.customElements.define)
      .to.have.been.calledOnceWith('comp', Component);
  });
});
