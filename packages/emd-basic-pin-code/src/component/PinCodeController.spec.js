import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const { expect } = chai;

const win = global.window;
let PinCodeController;
let Controller;
let element;
let HTMLElement;
let caseDOMElement;

describe('PinCodeController', () => {
  beforeEach(async () => {
    HTMLElement = class {};
    HTMLElement.prototype.connectedCallback = sinon.spy();
    HTMLElement.prototype.attributeChangedCallback = sinon.spy();
    HTMLElement.prototype.attachShadow = sinon.spy();
    HTMLElement.prototype.querySelector = sinon.stub().returns(undefined);
    HTMLElement.prototype.querySelectorAll = sinon.stub().returns([]);
    HTMLElement.prototype.getAttribute = sinon.spy();
    HTMLElement.prototype.setAttribute = sinon.spy();

    caseDOMElement = new HTMLElement();
    HTMLElement.prototype.shadowRoot = new HTMLElement();

    global.window = {};
    ({ PinCodeController } = await import('./PinCodeController.js'));
    Controller = PinCodeController(HTMLElement);

    element = new Controller();
    element.renderRoot = element.shadowRoot;
    element.updateComplete = Promise.resolve();
    element.querySelectorAll = sinon.stub()
      .withArgs('input').returns([caseDOMElement]);
  });

  afterEach(() => {
    HTMLElement = undefined;
    global.window = win;
    Controller = undefined;
    element = undefined;
  });

  describe('.properties', () => {
    it('Should expose properties correctly', () => {
      expect(Object.keys(Controller.properties).sort())
        .to.deep.equal([
          'cases',
          'forceuppercase',
          'type'
        ].sort());

      expect(Controller.properties.cases.type).to.equal(Number);
      expect(Controller.properties.forceuppercase.type).to.equal(Boolean);
      expect(Controller.properties.type.type).to.equal(String);
    });
  });

  describe('#connectedCallback()', () => {
    it('Should execute super.connectedCallback', async () => {
      await element.connectedCallback();
      expect(HTMLElement.prototype.connectedCallback)
        .to.have.been.calledOnce;
    });

    it('Should set the value property once when connected ' +
      'based on the attribute', async () => {
      await element.connectedCallback();
      expect(element.getAttribute).to.have.been.calledOnceWith('value');
    });
  });

  describe('#attributeChangedCallback()', () => {
    it('Should execute super.attributeChangedCallback', () => {
      element.attributeChangedCallback('name', 'zero', 'one');
      expect(HTMLElement.prototype.attributeChangedCallback)
        .to.have.been.calledOnceWith('name', 'zero', 'one');
    });

    it('Should set non-numeric cases to 1', () => {
      element.attributeChangedCallback('cases', null, '-5');
      expect(element.cases).to.equal(1);
    });

    it('Should set cases < 1 to 1', () => {
      element.attributeChangedCallback('cases', null, 'abc');
      expect(element.cases).to.equal(1);
    });

    it('Should round non-integer cases', () => {
      element.attributeChangedCallback('cases', null, '4.6');
      expect(element.cases).to.equal(5);
    });

    it('Should apply restrictions to value when forceuppercase ' +
      'is changed', () => {
      Object.defineProperty(element, 'value', {
        get () { return this._value; },
        set (value) { this._value = value; }
      });
      element.value = 'code';
      element.applyRestrictions = sinon.spy();
      element.attributeChangedCallback('forceuppercase', null, '');
      expect(element.applyRestrictions).to.have.been.calledWith('code');
    });
  });
});
