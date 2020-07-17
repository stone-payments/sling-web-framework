import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { stateNames } from '../constants/stateNames.js';

chai.use(sinonChai);
const { expect } = chai;

const win = global.window;
const HTMLElement = global.HTMLElement;
const Document = global.Document;
const customElements = global.customElements;

describe('stringToMethod', () => {
  let stringToMethod;

  beforeEach(async () => {
    global.window = {};
    global.HTMLElement = class {};
    global.Document = class {};
    global.customElements = {};

    ({ stringToMethod } = await import('./StateWrapperView.js'));
  });

  afterEach(() => {
    global.window = win;
    global.HTMLElement = HTMLElement;
    global.Document = Document;
    global.customElements = customElements;
    stringToMethod = null;
  });

  it('Should return the method of an element given its name', () => {
    const result = 'some str';

    const element = {
      add () { return result; }
    };

    expect(stringToMethod(element, 'add')()).to.equal(result);
  });

  it('Should return undefined if there is no element', () => {
    expect(stringToMethod(null, 'add')).to.be.undefined;
  });

  it('Should return undefined if the name is not an element\'s method', () => {
    const result = 'some str';

    const element = {
      add () { return result; }
    };

    expect(stringToMethod(element, 'multiply')).to.be.undefined;
  });

  it('Should return undefined if the name is an element\'s ' +
    'property but not a method', () => {
    const result = 'some str';

    const element = {
      add () { return result; },
      extra: 50
    };

    expect(stringToMethod(element, 'extra')).to.be.undefined;
  });

  it('Should bind the element to its method', () => {
    const element = {
      add () { return this.extra; },
      extra: 50
    };

    expect(stringToMethod(element, 'add')()).to.equal(50);
  });
});

describe('prepareView', () => {
  let prepareView;

  beforeEach(async () => {
    global.window = {};
    global.HTMLElement = class {};
    global.Document = class {};
    global.customElements = {};

    ({ prepareView } = await import('./StateWrapperView.js'));
  });

  afterEach(() => {
    global.window = win;
    global.HTMLElement = HTMLElement;
    global.Document = Document;
    global.customElements = customElements;
    prepareView = null;
  });

  it('Should send a function as the view\'s action', () => {
    const state = {
      name: stateNames.RECOVERY,
      action: 'buildSource',
      view: sinon.spy()
    };

    const wrapped = {
      buildInput: sinon.spy(),
      buildSource: sinon.spy()
    };

    const recovery = sinon.spy();

    prepareView(state, wrapped, recovery);

    const { args } = state.view.firstCall;

    expect(state.view).to.have.been.calledOnce;
    expect(args[0].wrapped).to.equal(wrapped);
    expect(args[0].view).to.be.undefined;

    args[0].action();
    expect(recovery).to.have.been.calledOnce;
  });

  it('Should send an element\'s method as the view\'s action', () => {
    const state = {
      name: stateNames.RECOVERY,
      action: 'buildSource',
      view: sinon.spy()
    };

    const wrapped = {
      buildInput: sinon.spy(),
      buildSource: sinon.spy()
    };

    prepareView(state, wrapped, 'buildInput');

    const { args } = state.view.firstCall;

    expect(state.view).to.have.been.calledOnce;
    expect(args[0].wrapped).to.equal(wrapped);
    expect(args[0].view).to.be.undefined;

    args[0].action();
    expect(wrapped.buildInput).to.have.been.calledOnce;
    expect(wrapped.buildInput.firstCall.thisValue).to.equal(wrapped);
  });

  it('Should send the state\'s default action ' +
    'as the view\'s action', () => {
    const state = {
      name: stateNames.RECOVERY,
      action: 'buildSource',
      view: sinon.spy()
    };

    const wrapped = {
      buildInput: sinon.spy(),
      buildSource: sinon.spy()
    };

    prepareView(state, wrapped);

    const { args } = state.view.firstCall;

    expect(state.view).to.have.been.calledOnce;
    expect(args[0].wrapped).to.equal(wrapped);
    expect(args[0].view).to.be.undefined;

    args[0].action();
    expect(wrapped.buildSource).to.have.been.calledOnce;
    expect(wrapped.buildSource.firstCall.thisValue).to.equal(wrapped);
  });

  it('Should not send an action to the view ' +
    'if the state is not recovery', () => {
    const state = {
      action: 'buildSource',
      view: sinon.spy()
    };

    const wrapped = {
      buildInput: sinon.spy(),
      buildSource: sinon.spy()
    };

    const recovery = sinon.spy();

    prepareView(state, wrapped, recovery);

    const { args } = state.view.firstCall;

    expect(state.view).to.have.been.calledOnce;
    expect(args[0].wrapped).to.equal(wrapped);
    expect(args[0].view).to.be.undefined;
    expect(args[0].action).to.be.undefined;
  });
});
