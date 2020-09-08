import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { MoneyController } from './MoneyController.js';

chai.use(sinonChai);
const { expect } = chai;

let Dummy;
let dummy;

describe('MoneyController', () => {
  beforeEach(() => {
    Dummy = class extends MoneyController() {};
    dummy = new Dummy();
  });

  afterEach(() => {
    Dummy = undefined;
    dummy = undefined;
  });

  describe('.properties', () => {
    it('Should have correct keys', () => {
      expect(Dummy.properties).to.have.keys(
        'currency',
        'value',
        'hidevalue',
        'hidepositivesign'
      );
    });
  });

  describe('#sign', () => {
    it('Should be a positive sign if value > 0', () => {
      dummy.value = 1;
      expect(dummy.sign).to.equal('+');
    });

    it('Should be undefined if value = 0', () => {
      dummy.value = 0;
      expect(dummy.sign).to.be.undefined;
    });

    it('Should be a negative sign if value < 0', () => {
      dummy.value = -1;
      expect(dummy.sign).to.equal('-');
    });
  });

  describe('#isPositive', () => {
    it('Should be true if value > 0', () => {
      dummy.value = 1;
      expect(dummy.isPositive).to.be.true;
    });
  });

  describe('#isNeutral', () => {
    it('Should be true if value = 0', () => {
      dummy.value = 0;
      expect(dummy.isNeutral).to.be.true;
    });
  });

  describe('#isNegative', () => {
    it('Should be true if value < 0', () => {
      dummy.value = -1;
      expect(dummy.isNegative).to.be.true;
    });
  });

  describe('#formattedCurrency', () => {
    it('Should be the currency symbol given a prefix', () => {
      dummy.currency = 'BRL';
      expect(dummy.formattedCurrency).to.equal('R$');

      dummy.currency = 'USD';
      expect(dummy.formattedCurrency).to.equal('$');

      dummy.currency = 'EUR';
      expect(dummy.formattedCurrency).to.equal('€');
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
