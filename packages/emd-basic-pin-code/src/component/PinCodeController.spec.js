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
    HTMLElement.prototype.shadowRoot = new HTMLElement();

    global.window = {};
    ({ PinCodeController } = await import('./PinCodeController.js'));
    Controller = PinCodeController(HTMLElement);

    element = new Controller();
    element.renderRoot = element.shadowRoot;
    element.updateComplete = Promise.resolve();
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

  describe('#casesArray', () => {
    it('Should be an array from zero to cases - 1', () => {
      element.cases = 4;
      expect(element.casesArray).to.deep.equal([0, 1, 2, 3]);
    });

    it('Should return [0] if cases is undefined', () => {
      expect(element.casesArray).to.deep.equal([0]);
    });
  });

  describe('#restrictions', () => {
    it('Should restrict to digits if type is number', () => {
      element.type = 'number';
      expect(element.restrictions).to.deep
        .equal(new RegExp('[ˆ0-9]', 'g'));
    });

    it('Should restrict to digits and characters if type is not number', () => {
      expect(element.restrictions).to.deep
        .equal(new RegExp('[^a-zA-Z0-9]', 'g'));
    });
  });

  describe('#inputElements', () => {
    it('Should be an array of all the input elements in the component', () => {
      const FIRST_INPUT = Symbol('FIRST_INPUT');
      const SECOND_INPUT = Symbol('SECOND_INPUT');

      element.renderRoot.querySelectorAll = sinon.stub().withArgs('input')
        .returns([FIRST_INPUT, SECOND_INPUT]);

      expect(element.inputElements).to.deep.equal([FIRST_INPUT, SECOND_INPUT]);
    });
  });

  describe('#firstEmptyInputElement', () => {
    it('Should return the first empty input element', () => {
      const INPUT_ELMENTS = [
        { value: 'D', id: '1' },
        { value: 'o', id: '2' },
        { value: '', id: '3' },
        { value: '', id: '4' }
      ];

      Object.defineProperty(element, 'inputElements', {
        get () { return INPUT_ELMENTS; }
      });

      expect(element.firstEmptyInputElement.id).to.equal('3');
    });

    it('Should return undefined if there are no empty input elements', () => {
      const INPUT_ELMENTS = [
        { value: 'D', id: '1' },
        { value: 'o', id: '2' },
        { value: '4', id: '3' },
        { value: '2', id: '4' }
      ];

      Object.defineProperty(element, 'inputElements', {
        get () { return INPUT_ELMENTS; }
      });

      expect(element.firstEmptyInputElement).to.be.undefined;
    });
  });

  describe('#isComplete', () => {
    it('Should return true if all input elements are filled', () => {
      Object.defineProperty(element, 'value', {
        get () { return this._value; },
        set (value) { this._value = value; }
      });

      element.cases = 4;
      element.value = 'Do42';

      expect(element.isComplete).to.be.true;
    });

    it('Should return false if not all input elements are filled', () => {
      Object.defineProperty(element, 'value', {
        get () { return this._value; },
        set (value) { this._value = value; }
      });

      element.cases = 4;
      element.value = 'Do';

      expect(element.isComplete).to.be.false;
    });
  });

  describe('#value', () => {
    it('Should compose value from DOM input elements\' values', () => {
      const INPUT_ELMENTS = [
        { value: 'D' },
        { value: 'o' },
        { value: '4' },
        { value: '2' }
      ];

      Object.defineProperty(element, 'inputElements', {
        get () { return INPUT_ELMENTS; }
      });

      expect(element.value).to.equal('Do42');
    });

    it('Should have restrictions applied to when set', () => {
      element.applyRestrictions = sinon.spy();
      element.value = 'LAC0';
      expect(element.applyRestrictions).to.have.been.calledOnceWith('LAC0');
    });

    it('Should actually set values to DOM input elements', () => {
      const INPUT_ELEMENTS = [{}, {}, {}, {}];

      Object.defineProperty(element, 'inputElements', {
        get () { return INPUT_ELEMENTS; }
      });

      element.cases = 4;
      element.value = 'LAC0';

      expect(INPUT_ELEMENTS[0].value).to.equal('L');
      expect(INPUT_ELEMENTS[1].value).to.equal('A');
      expect(INPUT_ELEMENTS[2].value).to.equal('C');
      expect(INPUT_ELEMENTS[3].value).to.equal('0');
    });

    it('Should be restricted to the number of DOM input elements', () => {
      const INPUT_ELEMENTS = [{}, {}, {}, {}];

      Object.defineProperty(element, 'inputElements', {
        get () { return INPUT_ELEMENTS; }
      });

      element.cases = 4;
      element.value = 'LAC042';

      expect(INPUT_ELEMENTS[0].value).to.equal('L');
      expect(INPUT_ELEMENTS[1].value).to.equal('A');
      expect(INPUT_ELEMENTS[2].value).to.equal('C');
      expect(INPUT_ELEMENTS[3].value).to.equal('0');
      expect(INPUT_ELEMENTS[4]).to.be.undefined;
      expect(INPUT_ELEMENTS[5]).to.be.undefined;
    });

    it('Should fill extra DOM input elements with an empty string', () => {
      const INPUT_ELEMENTS = [{}, {}, {}, {}];

      Object.defineProperty(element, 'inputElements', {
        get () { return INPUT_ELEMENTS; }
      });

      element.cases = 4;
      element.value = 'LA';

      expect(INPUT_ELEMENTS[0].value).to.equal('L');
      expect(INPUT_ELEMENTS[1].value).to.equal('A');
      expect(INPUT_ELEMENTS[2].value).to.equal('');
      expect(INPUT_ELEMENTS[3].value).to.equal('');
    });
  });

  describe('#applyRestrictions()', () => {
    it('Should convert an undefined entry to an empty string', () => {
      expect(element.applyRestrictions()).to.equal('');
    });

    it('Should convert entry to string', () => {
      expect(element.applyRestrictions(249)).to.equal('249');
    });

    it('Should remove all restricted charcters', () => {
      Object.defineProperty(element, 'restrictions', {
        get () { return new RegExp('[^a-zA-Z0-9]', 'g'); }
      });
      expect(element.applyRestrictions('[};"zd5%Yuçã')).to.equal('zd5Yu');
    });

    it('Should convert characters to upper case ' +
      'when forceuppercase is true', () => {
      element.forceuppercase = true;
      expect(element.applyRestrictions('l0ma')).to.equal('L0MA');
    });
  });

  describe('#handleKeyDown()', () => {
    it('Should delete the current input value and move to the previous one ' +
      'when the Backspace key is pressed', () => {
      const evt = {
        preventDefault: sinon.spy(),
        target: {
          value: '909',
          previousElementSibling: { focus: sinon.spy() }
        },
        code: 'Backspace'
      };

      element.handleKeyDown(evt);

      expect(evt.preventDefault).to.have.been.calledOnce;
      expect(evt.target.value).to.equal('');
      expect(evt.target.previousElementSibling.focus).to.have.been.calledOnce;
    });

    it('Should not break when the Backspace key is pressed ' +
      'but there is no previous input', () => {
      const evt = {
        preventDefault: sinon.spy(),
        target: {},
        code: 'Backspace'
      };

      element.handleKeyDown(evt);

      expect(evt.preventDefault).to.have.been.calledOnce;
      expect(evt.target.value).to.equal('');
    });

    it('Should present default behaviour if another key is pressed', () => {
      const evt = {
        preventDefault: sinon.spy(),
        target: { value: '909' },
        code: 'Key9'
      };

      element.handleKeyDown(evt);

      expect(evt.preventDefault).not.to.have.been.called;
      expect(evt.target.value).to.equal('909');
    });
  });

  describe('#handleInput()', () => {
    it('Should set the input value to the latest key stroke', () => {
      const evt = {
        target: { value: '9' },
        data: '8'
      };

      element.handleInput(evt);
      expect(evt.target.value).to.equal('8');
    });

    it('Should apply restrictions to the latest key stroke', () => {
      const evt = {
        target: { value: '9' },
        data: 'ç'
      };

      element.handleInput(evt);
      expect(evt.target.value).to.equal('');
    });

    it('Should focus the next input if it exists', () => {
      const evt = {
        target: {
          value: '9',
          nextElementSibling: { focus: sinon.spy() }
        },
        data: '8'
      };

      element.handleInput(evt);
      expect(evt.target.nextElementSibling.focus).to.have.been.calledOnce;
    });
  });

  describe('#handleFocus()', () => {
    it('Should move the cursor to the first empty ' +
      'input element when focusing any empty input element', () => {
      const INPUT_ELEMENTS = [
        { value: 'H' },
        { value: 'i' },
        { value: '', focus: sinon.spy() },
        { value: '' }
      ];

      Object.defineProperty(element, 'inputElements', {
        get () { return INPUT_ELEMENTS; }
      });

      const evt = {
        target: { value: '' }
      };

      element.handleFocus(evt);
      expect(INPUT_ELEMENTS[2].focus).to.have.been.calledOnce;
    });

    it('Should present default behaviour when focusing ' +
      'a filled input element', () => {
      const INPUT_ELEMENTS = [
        { value: 'H' },
        { value: 'i' },
        { value: '', focus: sinon.spy() },
        { value: '' }
      ];

      Object.defineProperty(element, 'inputElements', {
        get () { return INPUT_ELEMENTS; }
      });

      const evt = {
        target: { value: '8' }
      };

      element.handleFocus(evt);
      expect(INPUT_ELEMENTS[2].focus).not.to.have.been.called;
    });
  });

  describe('#handlePaste()', () => {
    beforeEach(() => {
      element.focus = sinon.spy();
      element.blur = sinon.spy();
    });

    it('Should distribute the pasted value between all input elements', () => {
      const INPUT_ELEMENTS = [
        { value: '8' },
        { value: '0' },
        { value: '8' },
        { value: '' }
      ];

      Object.defineProperty(element, 'inputElements', {
        get () { return INPUT_ELEMENTS; }
      });

      const evt = {
        target: INPUT_ELEMENTS[0],
        preventDefault: sinon.spy(),
        clipboardData: {
          getData: sinon.stub().withArgs('text').returns('ABC')
        }
      };

      element.cases = 4;
      element.handlePaste(evt);

      expect(evt.preventDefault).to.have.been.calledOnce;
      expect(evt.clipboardData.getData).to.have.been.calledOnceWith('text');
      expect(element.value).to.equal('ABC');
    });

    it('Should begin pasting in the currently selected input element', () => {
      const INPUT_ELEMENTS = [
        { value: '8' },
        { value: '0' },
        { value: '8' },
        { value: '' }
      ];

      Object.defineProperty(element, 'inputElements', {
        get () { return INPUT_ELEMENTS; }
      });

      const evt = {
        target: INPUT_ELEMENTS[2],
        preventDefault: sinon.spy(),
        clipboardData: {
          getData: sinon.stub().withArgs('text').returns('ABC')
        }
      };

      element.cases = 4;
      element.handlePaste(evt);

      expect(evt.preventDefault).to.have.been.calledOnce;
      expect(evt.clipboardData.getData).to.have.been.calledOnceWith('text');
      expect(element.value).to.equal('80AB');
    });

    it('Should focus after pasting if value is incomplete', () => {
      const INPUT_ELEMENTS = [
        { value: '8' },
        { value: '0' },
        { value: '8' },
        { value: '' }
      ];

      Object.defineProperty(element, 'inputElements', {
        get () { return INPUT_ELEMENTS; }
      });

      const evt = {
        target: INPUT_ELEMENTS[0],
        preventDefault: sinon.spy(),
        clipboardData: {
          getData: sinon.stub().withArgs('text').returns('ABC')
        }
      };

      element.cases = 4;
      element.handlePaste(evt);

      expect(element.focus).to.have.been.calledOnce;
      expect(element.blur).not.to.have.been.called;
    });

    it('Should blur after pasting if value is complete', () => {
      const INPUT_ELEMENTS = [
        { value: '8' },
        { value: '0' },
        { value: '8' },
        { value: '' }
      ];

      Object.defineProperty(element, 'inputElements', {
        get () { return INPUT_ELEMENTS; }
      });

      const evt = {
        target: INPUT_ELEMENTS[2],
        preventDefault: sinon.spy(),
        clipboardData: {
          getData: sinon.stub().withArgs('text').returns('ABC')
        }
      };

      element.cases = 4;
      element.handlePaste(evt);

      expect(element.focus).not.to.have.been.called;
      expect(element.blur).to.have.been.calledOnce;
    });
  });

  describe('#focus()', () => {
    it('Should focus on the first empty input element', async () => {
      const INPUT_ELMENTS = [
        { value: 'D' },
        { value: 'o' },
        { value: '', focus: sinon.spy() },
        { value: '' }
      ];

      Object.defineProperty(element, 'inputElements', {
        get () { return INPUT_ELMENTS; }
      });

      await element.focus();
      expect(INPUT_ELMENTS[2].focus).to.have.been.calledOnce;
    });

    it('Should do nothing if no input elements are empty', async () => {
      const INPUT_ELMENTS = [
        { value: 'D' },
        { value: 'o' },
        { value: '4' },
        { value: '2', focus: sinon.spy() }
      ];

      Object.defineProperty(element, 'inputElements', {
        get () { return INPUT_ELMENTS; }
      });

      await element.focus();
      expect(INPUT_ELMENTS[3].focus).not.to.have.been.called;
    });
  });

  describe('#blur()', () => {
    it('Should blur all input elements', async () => {
      const INPUT_ELMENTS = [
        { value: 'D', blur: sinon.spy() },
        { value: 'o', blur: sinon.spy() },
        { value: '4', blur: sinon.spy() },
        { value: '2', blur: sinon.spy() }
      ];

      Object.defineProperty(element, 'inputElements', {
        get () { return INPUT_ELMENTS; }
      });

      await element.blur();
      expect(INPUT_ELMENTS[0].blur).to.have.been.calledOnce;
      expect(INPUT_ELMENTS[1].blur).to.have.been.calledOnce;
      expect(INPUT_ELMENTS[2].blur).to.have.been.calledOnce;
      expect(INPUT_ELMENTS[3].blur).to.have.been.calledOnce;
    });
  });

  describe('#render()', () => {
    it('Should call currentView.use', () => {
      element.currentView = { use: sinon.spy() };
      element.render();
      expect(element.currentView.use).to.have.been.calledOnceWith(element);
    });
  });
});
