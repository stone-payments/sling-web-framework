import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { ButtonController } from './ButtonController.js';

chai.use(sinonChai);
const { expect } = chai;

let Dummy;
let dummy;

describe('ButtonController', () => {
  beforeEach(() => {
    Dummy = class extends ButtonController() {};
    dummy = new Dummy();
    dummy.children = [];
    dummy.textContent = '';
  });

  afterEach(() => {
    Dummy = undefined;
    dummy = undefined;
  });

  describe('#constructor()', () => {
    it('Should set type to button', () => {
      expect(dummy.type).to.equal('button');
    });
  });

  describe('.properties', () => {
    it('Should declare all properties', () => {
      expect(Object.keys(Dummy.properties).sort())
        .to.deep.equal([
          'abc',
          'size',
          'rank',
          'type',
          'disabled',
          'loading',
          'href',
          'target',
          'multipleclicks',
          'hasText',
          'hasIcon'
        ].sort());
    });
  });

  describe('.childrenObserverOptions', () => {
    it('Should detect text mutations', () => {
      expect(Dummy.childrenObserverOptions.characterData).to.be.true;
    });

    it('Should deeply detect children mutations', () => {
      expect(Dummy.childrenObserverOptions.childList).to.be.true;
      expect(Dummy.childrenObserverOptions.subtree).to.be.true;
    });
  });

  describe('#childrenUpdatedCallback()', () => {
    it('Should detect if the component has an icon', () => {
      dummy.children = [{ slot: '' }, { slot: 'icon' }];
      dummy.childrenUpdatedCallback();
      expect(dummy.hasIcon).to.be.true;
    });

    it('Should detect if the component does not have an icon', () => {
      dummy.children = [{ slot: '' }];
      dummy.childrenUpdatedCallback();
      expect(dummy.hasIcon).to.be.false;
    });

    it('Should detect if the component has text', () => {
      dummy.textContent = 'Edit';
      dummy.childrenUpdatedCallback();
      expect(dummy.hasText).to.be.true;
    });

    it('Should detect if the component does not have text', () => {
      dummy.textContent = '';
      dummy.childrenUpdatedCallback();
      expect(dummy.hasText).to.be.false;
    });

    it('Should ignore empty spaces, tabs or return characters', () => {
      dummy.textContent = '\n\n\t            ';
      dummy.childrenUpdatedCallback();
      expect(dummy.hasText).to.be.false;
    });
  });

  describe('#handleClick()', () => {
    it('Should ignore click if the component is disabled', () => {
      dummy.disabled = true;

      const evt = {
        detail: 1,
        stopPropagation: sinon.spy()
      };

      dummy.handleClick(evt);
      expect(evt.stopPropagation).to.have.been.calledOnce;
    });

    it('Should ignore click if the component is loading', () => {
      dummy.loading = true;

      const evt = {
        detail: 1,
        stopPropagation: sinon.spy()
      };

      dummy.handleClick(evt);
      expect(evt.stopPropagation).to.have.been.calledOnce;
    });

    it('Should ignore multiples clicks if the component was set to', () => {
      dummy.multipleclicks = false;

      const evt = {
        detail: 3,
        stopPropagation: sinon.spy()
      };

      dummy.handleClick(evt);
      expect(evt.stopPropagation).to.have.been.calledOnce;
    });

    it('Should not ignore multiples clicks if the component was set to', () => {
      dummy.multipleclicks = true;

      const evt = {
        detail: 3,
        stopPropagation: sinon.spy()
      };

      dummy.handleClick(evt);
      expect(evt.stopPropagation).not.to.have.been.called;
    });
  });

  describe('#render()', () => {
    it('Should call currentView.use', () => {
      dummy.currentView = { use: sinon.spy() };
      dummy.render();
      expect(dummy.currentView.use).to.have.been.calledOnceWith(dummy);
    });
  });
});
