import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const { expect } = chai;

const win = global.window;
let SelectController;
let Controller;
let element;

const HTMLElement = class {};
HTMLElement.prototype.connectedCallback = sinon.spy();
HTMLElement.prototype.attachShadow = sinon.spy();
HTMLElement.prototype.querySelector = sinon.spy();
HTMLElement.prototype.hasAttribute = sinon.spy();
HTMLElement.prototype.getAttribute = sinon.spy();
HTMLElement.prototype.setAttribute = sinon.spy();
HTMLElement.prototype.removeAttribute = sinon.spy();
HTMLElement.prototype.shadowRoot = new HTMLElement();

describe('SelectController', () => {
  beforeEach(async () => {
    global.window = {};
    ({ SelectController } = await import('./SelectController.js'));
    Controller = SelectController(HTMLElement);

    element = new Controller();
    element.dispatchEventAndMethod = sinon.spy();
    element._handleFieldValidation = sinon.spy();
  });

  afterEach(() => {
    global.window = win;
    Controller = undefined;
    element = undefined;
  });

  describe('#connectedCallback()', () => {
    it('Should upgrade properties before calling super', () => {
      element._upgradeProperty = sinon.spy();
      element.connectedCallback();

      expect(element._upgradeProperty).to.have.been.calledTwice;
      expect(element._upgradeProperty).to.have.been.calledWith('options');
      expect(element._upgradeProperty).to.have.been.calledWith('value');
      expect(HTMLElement.prototype.connectedCallback).to.have.been.calledOnce;
      expect(HTMLElement.prototype.connectedCallback)
        .to.have.been.calledAfter(element._upgradeProperty);
    });
  });

  describe('#autoselectsingle', () => {
    it('Should get autoselectsingle from attribute', () => {
      element.hasAttribute =
        sinon.stub().withArgs('autoselectsingle').returns(true);
      expect(element.autoselectsingle).to.be.true;
    });

    it('Should set autoselectsingle to attribute', () => {
      element.autoselectsingle = true;
      expect(element.setAttribute)
        .to.have.been.calledOnceWith('autoselectsingle', '');
    });
  });

  describe('#autoreadonly', () => {
    it('Should get autoreadonly from attribute', () => {
      element.hasAttribute =
        sinon.stub().withArgs('autoreadonly').returns(false);
      expect(element.autoreadonly).to.be.false;
    });

    it('Should set autoreadonly to attribute', () => {
      element.autoreadonly = false;
      expect(element.removeAttribute)
        .to.have.been.calledOnceWith('autoreadonly');
    });
  });

  describe('#field', () => {
    it('Should get the input DOM element', () => {
      const FAKE_DOM_INPUT = {};

      element.renderRoot = {
        querySelector: sinon.stub().withArgs('select').returns(FAKE_DOM_INPUT)
      };

      expect(element.field).to.equal(FAKE_DOM_INPUT);
    });
  });

  describe('#parsedOptions', () => {
    beforeEach(() => {
      Object.defineProperty(element, 'options', {
        get () { return this._options; },
        set (value) { this._options = value; }
      });
    });

    it('Should parse an array of strings', () => {
      element.options = ['Spring', 'Summer', 'Autumn', 'Winter'];

      expect(element.parsedOptions).to.deep.equal([
        { value: 'Spring', content: 'Spring' },
        { value: 'Summer', content: 'Summer' },
        { value: 'Autumn', content: 'Autumn' },
        { value: 'Winter', content: 'Winter' }
      ]);
    });

    it('Should parse an array of object', () => {
      element.options = [
        { value: 'Spring', content: 'Spring' },
        { value: 'Summer', content: 'Summer' },
        { value: 'Autumn', content: 'Autumn' },
        { value: 'Winter', content: 'Winter' }
      ];

      expect(element.parsedOptions).to.deep.equal(element.options);
    });
  });

  describe('#value', () => {
    beforeEach(() => {
      const FAKE_DOM_SELECT = { value: '' };

      element.renderRoot = {
        querySelector: sinon.stub().withArgs('select').returns(FAKE_DOM_SELECT)
      };

      Object.defineProperty(element, '_processedFieldValue', {
        get () {
          return element.field
            ? String(element.field.value)
            : '';
        }
      });

      element._updateView = sinon.spy();
    });

    it('Should keep a valid value when setting options', async () => {
      element.value = 'Summer';
      element.options = ['Spring', 'Summer', 'Autumn', 'Winter'];
      await Promise.resolve();
      expect(element.value).to.equal('Summer');
    });

    it('Should discard a previously valid value when setting ' +
      'options', async () => {
      element.value = 'Fall';
      element.options = ['Spring', 'Summer', 'Autumn', 'Winter'];
      await Promise.resolve();
      expect(element.value).to.equal('');
    });

    it('Should dispatch an update event', async () => {
      element.value = 'Summer';
      element.options = ['Spring', 'Summer', 'Autumn', 'Winter'];
      await Promise.resolve();
      expect(element.dispatchEventAndMethod.lastCall)
        .to.have.been.calledWith('update', 'Summer');
    });

    it('Should dispatch a validation event', async () => {
      element.value = 'Summer';
      element.options = ['Spring', 'Summer', 'Autumn', 'Winter'];
      await Promise.resolve();
      expect(element._handleFieldValidation.lastCall)
        .to.have.been.calledWith('Summer');
    });

    it('Should update the view', () => {
      element._isValidValue = () => true;
      element.value = 'Summer';
      expect(element._updateView).to.have.been.calledOnce;
    });

    it('Should only set the initial value if the DOM field ' +
      'is not available', () => {
      element.renderRoot = {
        querySelector: sinon.stub().withArgs('select').returns(undefined)
      };

      element.value = 'Summer';
      expect(element._initialValue).to.equal('Summer');
    });
  });

  describe('#options', () => {
    beforeEach(() => {
      const FAKE_DOM_SELECT = { value: '' };

      element.renderRoot = {
        querySelector: sinon.stub().withArgs('select').returns(FAKE_DOM_SELECT)
      };

      Object.defineProperty(element, '_processedFieldValue', {
        get () {
          return element.field
            ? String(element.field.value)
            : '';
        }
      });

      element._updateView = sinon.spy();
    });

    it('Should keep a valid value when setting options', async () => {
      element.options = ['Spring', 'Summer', 'Autumn', 'Winter'];
      element.value = 'Summer';
      await Promise.resolve();
      expect(element.value).to.equal('Summer');
    });

    it('Should discard a previously valid value when setting ' +
      'options', async () => {
      element.options = ['Spring', 'Summer', 'Autumn', 'Winter'];
      element.value = 'Fall';
      await Promise.resolve();
      expect(element.value).to.equal('');
    });

    it('Should force autoreadyonly if autoselectsingle is true' +
      'and there\'s only one option', () => {
      Object.defineProperty(element, 'autoselectsingle', {
        get () { return this._autoselectsingle; },
        set (value) { this._autoselectsingle = value; }
      });

      element.autoselectsingle = true;
      element.options = ['Seasons'];

      expect(element.autoselectsingle).to.be.true;
      expect(element.value).to.equal('Seasons');
    });

    it('Should update the view', () => {
      element.options = ['Spring', 'Summer', 'Autumn', 'Winter'];
      expect(element._updateView).to.have.been.calledOnce;
    });
  });

  describe('#selection', () => {
    beforeEach(() => {
      Object.defineProperty(element, 'field', {
        get () { return this._field; },
        set (value) { this._field = value; }
      });

      Object.defineProperty(element, 'parsedOptions', {
        get () { return this._parsedOptions; },
        set (value) { this._parsedOptions = value; }
      });
    });

    it('Should return the placeholder if the value is undefined', () => {
      element.field = { value: '' };
      element.parsedOptions = [
        { value: 'Spring', content: 'Spring' },
        { value: 'Summer', content: 'Summer' },
        { value: 'Autumn', content: 'Autumn' },
        { value: 'Winter', content: 'Winter' }
      ];
      element.placeholder = 'Select season';
      expect(element.selection).to.equal('Select season');
    });

    it('Should return the value instead of the placeholder', () => {
      element.field = { value: 'Spring' };
      element.parsedOptions = [
        { value: 'Spring', content: 'Spring' },
        { value: 'Summer', content: 'Summer' },
        { value: 'Autumn', content: 'Autumn' },
        { value: 'Winter', content: 'Winter' }
      ];
      element.placeholder = 'Select season';
      expect(element.selection).to.equal('Spring');
    });
  });
});
