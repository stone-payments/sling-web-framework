import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const { expect } = chai;

const win = global.window;
let SlideshowController;
let Controller;
let element;

const HTMLElement = class {};
HTMLElement.prototype.attributeChangedCallback = sinon.spy();

describe('SlideshowController', () => {
  beforeEach(async () => {
    global.window = {};
    ({ SlideshowController } = await import('./SlideshowController.js'));
    Controller = SlideshowController(HTMLElement);

    element = new Controller();
    element.setAttribute = sinon.spy();
  });

  afterEach(() => {
    global.window = win;
    Controller = undefined;
    element = undefined;
  });

  describe('.properties', () => {
    it('Should expose the correct properties', () => {
      expect(Object.keys(Controller.properties).sort())
        .to.deep.equal(['current', 'delay']);
    });
  });

  describe('#current', () => {
    beforeEach(() => {
      element.requestUpdate = sinon.spy();
      element._updateSlides = sinon.spy();
      element._dispatchSlideEvents = sinon.spy();
    });

    it('Should return zero when unset and there are no slides', () => {
      element.slideCount = undefined;
      expect(element.current).to.equal(0);

      element.slideCount = 0;
      expect(element.current).to.equal(0);
    });

    it('Should return one when unset and there are slides', () => {
      element.slideCount = 5;
      expect(element.current).to.equal(1);
    });

    it('Should get and set the value correctly', () => {
      element.current = 3;
      expect(element.current).to.equal(3);
    });

    it('Should parse the given value before setting it', () => {
      element._parseUserDefinedCurrent = sinon.stub().returnsArg(0);
      element.current = 3;
      expect(element._parseUserDefinedCurrent).to.have.been.calledWith(3);
    });

    it('Should return the previous value if ' +
      'received a bogus value', () => {
      element.current = 3;
      element.current = 'bogus';

      expect(element.current).to.equal(3);
    });

    it('Should set attribute if value is not undefined', () => {
      element.current = 3;
      expect(element.setAttribute).to.have.been.calledOnceWith('current', 3);
    });

    it('Should always call side effect methods', () => {
      element.current = 3;

      expect(element.requestUpdate)
        .to.have.been.calledOnceWith('current', 0);
      expect(element._updateSlides).to.have.been.calledOnce;
      expect(element._dispatchSlideEvents).to.have.been.calledOnceWith(0, 3);

      expect(element._updateSlides)
        .to.have.been.calledAfter(element.requestUpdate);
      expect(element._dispatchSlideEvents)
        .to.have.been.calledAfter(element._updateSlides);
    });

    it('Should correctly set to zero after it being one', () => {
      element.current = 1;
      element.current = 0;
      expect(element.current).to.equal(0);
    });
  });

  describe('#_parseUserDefinedCurrent()', () => {
    it('Should restrict input to the maximum number of slides', () => {
      element.slideCount = 5;
      expect(element._parseUserDefinedCurrent(20)).to.equal(5);
    });

    it('Should restrict input to the minimum number of slides', () => {
      element.slideCount = 5;
      expect(element._parseUserDefinedCurrent(-20)).to.equal(1);

      element.slideCount = 1;
      expect(element._parseUserDefinedCurrent(-20)).to.equal(1);

      element.slideCount = 0;
      expect(element._parseUserDefinedCurrent(-20)).to.equal(0);
    });

    it('Should round input', () => {
      element.slideCount = 5;
      expect(element._parseUserDefinedCurrent(1.33333)).to.equal(1);
      expect(element._parseUserDefinedCurrent(2.66666)).to.equal(3);
    });

    it('Should convert string to number', () => {
      element.slideCount = 5;
      expect(element._parseUserDefinedCurrent('3')).to.equal(3);
    });

    it('Should ignore non-numeric values', () => {
      element.slideCount = 5;
      expect(element._parseUserDefinedCurrent('bogus')).to.be.undefined;
    });
  });

  describe('#childrenUpdatedCallback()', () => {
    let setSpy;

    beforeEach(() => {
      element.children = [
        new HTMLElement(),
        new HTMLElement(),
        new HTMLElement()
      ];

      element._updateSlides = sinon.spy();
      setSpy = sinon.spy();

      Object.defineProperty(element, 'current', {
        get () { return this._current; },
        set (value) { this._current = value; setSpy(); }
      });
    });

    it('Should update slideCount', () => {
      element.childrenUpdatedCallback();
      expect(element.slideCount).to.equal(3);
    });

    it('Should update current according to the new number of slides', () => {
      element.childrenUpdatedCallback();
      expect(setSpy).to.have.been.calledOnce;
    });

    it('Should call _updateSlides', () => {
      element.childrenUpdatedCallback();
      expect(element._updateSlides).to.have.been.calledOnce;
    });
  });

  describe('#_updateSlides()', () => {
    beforeEach(() => {
      element.children = [
        { removeAttribute: sinon.spy(), setAttribute: sinon.spy() },
        { removeAttribute: sinon.spy(), setAttribute: sinon.spy() },
        { removeAttribute: sinon.spy(), setAttribute: sinon.spy() }
      ];

      Object.defineProperty(element, 'current', {
        get () { return this._current; },
        set (value) { this._current = value; }
      });
    });

    it('Should remove attributes from children', () => {
      element._updateSlides();

      for (let i = 0; i <= 2; i += 1) {
        expect(element.children[i].removeAttribute)
          .to.have.been.calledThrice;
        expect(element.children[i].removeAttribute)
          .to.have.been.calledWith('before');
        expect(element.children[i].removeAttribute)
          .to.have.been.calledWith('current');
        expect(element.children[i].removeAttribute)
          .to.have.been.calledWith('after');
      }
    });

    it('Should add attributes according to the ' +
      'current slide position (first)', () => {
      element.current = 1;
      element._updateSlides();

      expect(element.children[0].setAttribute)
        .to.have.been.calledOnceWith('current', '');
      expect(element.children[1].setAttribute)
        .to.have.been.calledOnceWith('after', '');
      expect(element.children[2].setAttribute)
        .to.have.been.calledOnceWith('after', '');
    });

    it('Should add attributes according to the ' +
      'current slide position (middle)', () => {
      element.current = 2;
      element._updateSlides();

      expect(element.children[0].setAttribute)
        .to.have.been.calledOnceWith('before', '');
      expect(element.children[1].setAttribute)
        .to.have.been.calledOnceWith('current', '');
      expect(element.children[2].setAttribute)
        .to.have.been.calledOnceWith('after', '');
    });

    it('Should add attributes according to the ' +
      'current slide position (last)', () => {
      element.current = 3;
      element._updateSlides();

      expect(element.children[0].setAttribute)
        .to.have.been.calledOnceWith('before', '');
      expect(element.children[1].setAttribute)
        .to.have.been.calledOnceWith('before', '');
      expect(element.children[2].setAttribute)
        .to.have.been.calledOnceWith('current', '');
    });
  });

  describe('#_dispatchSlideEvents()', () => {
    beforeEach(() => {
      element.renderRoot = { addEventListener: sinon.spy() };
      element.dispatchEventAndMethod = sinon.spy();
    });

    it('Should not do anything if past and next values are the same', () => {
      element._dispatchSlideEvents(3, 3);
      expect(element.dispatchEventAndMethod).not.to.have.been.called;
    });

    it('Should dispatch slidechange and slidechangestart events', () => {
      element._dispatchSlideEvents(1, 2);

      expect(element.dispatchEventAndMethod).to.have.been.calledTwice;

      expect(element.dispatchEventAndMethod)
        .to.have.been.calledWith('slidechange', {
          previous: 1,
          current: 2
        });

      expect(element.dispatchEventAndMethod)
        .to.have.been.calledWith('slidechangestart', {
          previous: 1,
          current: 2
        });
    });

    it('Should wait transition to dispatch slidechangeend event', () => {
      element.renderRoot.addEventListener = sinon.stub()
        .callsFake((evtName, callback) => callback());
      element.renderRoot.removeEventListener = sinon.spy();

      element._dispatchSlideEvents(3, 4);

      expect(element.dispatchEventAndMethod).to.have.been.calledThrice;

      expect(element.dispatchEventAndMethod)
        .to.have.been.calledWith('slidechangeend', {
          previous: 3,
          current: 4
        });

      expect(element.renderRoot.addEventListener)
        .to.have.been.calledOnceWith('transitionend');

      expect(element.renderRoot.removeEventListener)
        .to.have.been.calledOnceWith('transitionend');

      expect(element.renderRoot.addEventListener.firstCall.lastArg)
        .to.equal(element.renderRoot.removeEventListener.firstCall.lastArg);
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
