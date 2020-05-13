import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const { expect } = chai;

const win = global.window;
let BrandIconController;
let Controller;
let element;

let VW_BANESCARD;
let VW_HIPER;
let VW_HIPERCARD;
let VW_STONE;

const HTMLElement = class {};

describe('BrandIconController', () => {
  beforeEach(async () => {
    global.window = {};
    ({ BrandIconController } = await import('./BrandIconController.js'));
    Controller = BrandIconController(HTMLElement);

    VW_BANESCARD = Symbol('VW_BANESCARD');
    VW_HIPER = Symbol('VW_HIPER');
    VW_HIPERCARD = Symbol('VW_HIPERCARD');
    VW_STONE = Symbol('VW_STONE');

    Controller.icons = {
      BANESCARD: VW_BANESCARD,
      HIPER: VW_HIPER,
      HIPERCARD: VW_HIPERCARD,
      STONE: VW_STONE
    };

    element = new Controller();
  });

  afterEach(() => {
    VW_BANESCARD = undefined;
    VW_HIPER = undefined;
    VW_HIPERCARD = undefined;
    VW_STONE = undefined;

    global.window = win;
    Controller = undefined;
    element = undefined;
  });

  describe('.properties', () => {
    it('Should expose the correct properties', () => {
      expect(Controller.properties).to.include.keys('icon', 'nofallback');
    });
  });

  describe('.getPossibleKeys()', () => {
    it('Should return a sorted array with possible brand keys', () => {
      expect(Controller.getPossibleKeys('Hiper Card Débito')).to.deep.equal([
        'HIPER_CARD_DEBITO',
        'HIPERCARDDEBITO',
        'HIPER_CARD',
        'HIPERCARD',
        'HIPER'
      ]);

      expect(Controller.getPossibleKeys('Banco do Brasil S.A.')).to.deep.equal([
        'BANCO_DO_BRASIL_SA',
        'BANCODOBRASILSA',
        'BANCO_DO_BRASIL',
        'BANCODOBRASIL',
        'BANCO_DO',
        'BANCODO',
        'BANCO'
      ]);

      expect(Controller.getPossibleKeys('master-card')).to.deep.equal([
        'MASTER_CARD',
        'MASTERCARD',
        'MASTER'
      ]);

      expect(Controller.getPossibleKeys('HIPER')).to.deep.equal([
        'HIPER'
      ]);
    });

    it('Should return [] not given a parameter', () => {
      expect(Controller.getPossibleKeys()).to.deep.equal([]);
    });

    it('Should return [] given an empty string', () => {
      expect(Controller.getPossibleKeys()).to.deep.equal([]);
    });
  });

  describe('.getIconKey()', () => {
    it('Should return the existing key that matches a given name', () => {
      expect(Controller.getIconKey('Banescard')).to.equal('BANESCARD');
      expect(Controller.getIconKey('Hiper')).to.equal('HIPER');
      expect(Controller.getIconKey('Hiper Crédito')).to.equal('HIPER');
      expect(Controller.getIconKey('Hiper Card')).to.equal('HIPERCARD');
      expect(Controller.getIconKey('HiperCard')).to.equal('HIPERCARD');
      expect(Controller.getIconKey('Hiper Card Crédito')).to.equal('HIPERCARD');
      expect(Controller.getIconKey('HiperCard Crédito')).to.equal('HIPERCARD');
    });

    it('Should return undefined if there are no matches', () => {
      expect(Controller.getIconKey('Bogus')).to.be.undefined;
    });
  });

  describe('.getIconView()', () => {
    it('Should return the view that matches a given name', () => {
      expect(Controller.getIconView('Banescard')).to.equal(VW_BANESCARD);
      expect(Controller.getIconView('Hiper')).to.equal(VW_HIPER);
      expect(Controller.getIconView('Hiper Crédito')).to.equal(VW_HIPER);
      expect(Controller.getIconView('Hiper Card')).to.equal(VW_HIPERCARD);
      expect(Controller.getIconView('HiperCard')).to.equal(VW_HIPERCARD);
      expect(Controller.getIconView('Hiper Card Crédito'))
        .to.equal(VW_HIPERCARD);
      expect(Controller.getIconView('HiperCard Crédito'))
        .to.equal(VW_HIPERCARD);
    });

    it('Should return undefined if there are no matches', () => {
      expect(Controller.getIconView('Bogus')).to.be.undefined;
    });
  });

  describe('#iconKey', () => {
    it('Should return the current icon key when icon is set', () => {
      element.icon = 'Hiper Card Crédito';
      expect(element.iconKey).to.equal('HIPERCARD');
    });

    it('Should return the current icon key when iconid is set', () => {
      element.iconid = '9';
      expect(element.iconKey).to.equal('HIPERCARD');
    });

    it('Should undefined it there is no matching key', () => {
      element.icon = 'Bogus';
      expect(element.iconKey).to.be.undefined;
    });
  });

  describe('#iconView', () => {
    it('Should return the current icon view', () => {
      element.icon = 'Hiper Card Crédito';
      expect(element.iconView).to.equal(VW_HIPERCARD);
    });

    it('Should return the current icon view when iconid is set', () => {
      element.iconid = '9';
      expect(element.iconView).to.equal(VW_HIPERCARD);
    });

    it('Should undefined it there is no matching view', () => {
      element.icon = 'Bogus';
      expect(element.iconView).to.be.undefined;
    });
  });

  describe('#stoneIconView', () => {
    it('Should return Stone view', () => {
      expect(element.stoneIconView).to.equal(VW_STONE);
    });
  });

  describe('#isRenderable', () => {
    it('Should not render if nofallback is true and ' +
      'the brand is not found', () => {
      element.nofallback = true;
      element.icon = 'Bogus';
      expect(element.isRenderable).to.be.false;
    });

    it('Should render the Stone logo if nofallback is false and ' +
      'the brand is not found', () => {
      element.nofallback = false;
      element.icon = 'Bogus';
      expect(element.isRenderable).to.be.true;
    });

    it('Should render if the brand is found', () => {
      element.icon = 'Hiper Card';
      expect(element.isRenderable).to.be.true;
    });
  });

  describe('#render()', () => {
    it('Should call currentView.apply', () => {
      element.currentView = { apply: sinon.spy() };
      element.render();
      expect(element.currentView.apply).to.have.been.calledOnceWith(element);
    });
  });
});
