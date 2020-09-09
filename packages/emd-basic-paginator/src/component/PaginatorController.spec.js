import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { PaginatorController, CASES } from './PaginatorController.js';

chai.use(sinonChai);
const { expect } = chai;

let Dummy;
let dummy;

describe('PaginatorController', () => {
  beforeEach(() => {
    Dummy = class extends PaginatorController() {};
    dummy = new Dummy();

    dummy.requestUpdate = sinon.spy();
    dummy.dispatchEventAndMethod = sinon.spy();
    dummy.setAttribute = sinon.spy();
    dummy.removeAttribute = sinon.spy();
  });

  afterEach(() => {
    Dummy = undefined;
    dummy = undefined;
  });

  describe('.properties', () => {
    it('Should declare all properties', () => {
      expect(Object.keys(Dummy.properties).sort())
        .to.deep.equal([
          'view',
          'total',
          'selected'
        ].sort());
    });
  });

  describe('#isFirstSelected', () => {
    it('Should return true if the first item is selected', () => {
      dummy.selected = 1;
      dummy.total = 5;
      expect(dummy.isFirstSelected).to.be.true;
    });

    it('Should return false if the first item is not selected', () => {
      dummy.selected = 3;
      dummy.total = 5;
      expect(dummy.isFirstSelected).to.be.false;
    });

    it('Should return false if total is undefined', () => {
      expect(dummy.isFirstSelected).to.be.false;
    });
  });

  describe('#isLastSelected', () => {
    it('Should return true if the last item is selected', () => {
      dummy.selected = 5;
      dummy.total = 5;
      expect(dummy.isLastSelected).to.be.true;
    });

    it('Should return false if the last item is not selected', () => {
      dummy.selected = 3;
      dummy.total = 5;
      expect(dummy.isLastSelected).to.be.false;
    });

    it('Should return false if total is undefined', () => {
      expect(dummy.isLastSelected).to.be.false;
    });
  });

  describe('#total', () => {
    it('Should set total', () => {
      dummy.total = 5;
      expect(dummy.total).to.equal(5);
    });

    it('Should allow setting total to null', () => {
      dummy.total = 5;
      dummy.total = null;
      expect(dummy.total).to.be.null;
    });

    it('Should allow setting total to undefined', () => {
      dummy.total = 5;
      dummy.total = undefined;
      expect(dummy.total).to.be.undefined;
    });

    it('Should disallow setting total to a string', () => {
      dummy.total = 5;
      dummy.total = 'bogus';
      expect(dummy.total).to.equal(5);
    });

    it('Should disallow setting total to a non-integer', () => {
      dummy.total = 5;
      dummy.total = 0.87354;
      expect(dummy.total).to.equal(5);
    });

    it('Should disallow setting total to an integer smaller than one', () => {
      dummy.total = 5;
      dummy.total = -20;
      expect(dummy.total).to.equal(5);
    });

    it('Should update the attribute if total is set', () => {
      dummy.total = 5;
      expect(dummy.setAttribute).to.have.been.calledWith('total', 5);
    });

    it('Should remove the attribute if total is not set', () => {
      dummy.total = 5;
      dummy.total = undefined;
      expect(dummy.removeAttribute).to.have.been.calledWith('total');
    });

    it('Should call requestUpdate with the previous value', () => {
      dummy.total = 23;
      expect(dummy.requestUpdate).to.have.been.calledWith('total', undefined);

      dummy.total = 25;
      expect(dummy.requestUpdate).to.have.been.calledWith('total', 23);
    });

    it('Should updated selected after total is set', () => {
      const setSpy = sinon.spy();

      Object.defineProperty(dummy, 'selected', {
        get () { return this._selected; },
        set (value) { this._selected = value; setSpy(); }
      });

      dummy.total = 15;
      expect(setSpy).to.have.been.calledOnce;
    });
  });

  describe('#selected', () => {
    it('Should set selected', () => {
      dummy.selected = 5;
      expect(dummy.selected).to.equal(5);
    });

    it('Should allow setting selected to null if total is not set', () => {
      dummy.selected = 5;
      dummy.selected = null;
      expect(dummy.selected).to.be.null;
    });

    it('Should allow setting selected to undefined if total is not set', () => {
      dummy.selected = 5;
      dummy.selected = undefined;
      expect(dummy.selected).to.be.undefined;
    });

    it('Should force selected to one if set to null ' +
      'when total is set', () => {
      dummy.total = 10;
      dummy.selected = 5;
      dummy.selected = null;
      expect(dummy.selected).to.equal(1);
    });

    it('Should force selected to one if set to undefined ' +
      'when total is set', () => {
      dummy.total = 10;
      dummy.selected = 5;
      dummy.selected = undefined;
      expect(dummy.selected).to.equal(1);
    });

    it('Should disallow setting selected to a string', () => {
      dummy.selected = 5;
      dummy.selected = 'bogus';
      expect(dummy.selected).to.equal(5);
    });

    it('Should disallow setting selected to a non-integer', () => {
      dummy.selected = 5;
      dummy.selected = 0.87354;
      expect(dummy.selected).to.equal(5);
    });

    it('Should restrict the minimum value of selected to one', () => {
      dummy.selected = 5;
      dummy.selected = -20;
      expect(dummy.selected).to.equal(1);
    });

    it('Should restrict the maximum value of selected ' +
      'to total if total is set', () => {
      dummy.total = 10;
      dummy.selected = 5000;
      expect(dummy.selected).to.equal(10);
    });

    it('Should restrict the maximum value of selected ' +
      'to total after total is set', () => {
      dummy.selected = 5000;
      expect(dummy.selected).to.equal(5000);

      dummy.total = 10;
      expect(dummy.selected).to.equal(10);
    });

    it('Should not restrict the maximum value of selected ' +
      'if total is not set', () => {
      dummy.selected = 5000;
      expect(dummy.selected).to.equal(5000);
    });

    it('Should update the attribute if selected is set', () => {
      dummy.selected = 5;
      expect(dummy.setAttribute).to.have.been.calledWith('selected', 5);
    });

    it('Should remove the attribute if selected is not set', () => {
      dummy.selected = 5;
      dummy.selected = undefined;
      expect(dummy.removeAttribute).to.have.been.calledWith('selected');
    });

    it('Should disptach paginate event', () => {
      dummy.total = 10;
      dummy.selected = 5;
      dummy.dispatchEventAndMethod = sinon.spy();
      dummy.selected = 6;

      expect(dummy.dispatchEventAndMethod).to.have.been
        .calledOnceWith('paginate', {
          type: 'index',
          index: 6
        });
    });

    it('Should not disptach paginate event if total is not set', () => {
      dummy.selected = 5;
      dummy.dispatchEventAndMethod = sinon.spy();
      dummy.selected = 6;

      expect(dummy.dispatchEventAndMethod).not.to.have.been.called;
    });

    it('Should not disptach paginate event if select does not change', () => {
      dummy.selected = 5;
      dummy.dispatchEventAndMethod = sinon.spy();
      dummy.selected = 5;

      expect(dummy.dispatchEventAndMethod).not.to.have.been.called;
    });

    it('Should not disptach paginate event if select is not set', () => {
      dummy.selected = 5;
      dummy.dispatchEventAndMethod = sinon.spy();
      dummy.selected = null;

      expect(dummy.dispatchEventAndMethod).not.to.have.been.called;
    });

    it('Should call requestUpdate with the previous value', () => {
      dummy.selected = 23;

      expect(dummy.requestUpdate).to.have.been
        .calledWith('selected', undefined);

      dummy.selected = 25;

      expect(dummy.requestUpdate).to.have.been
        .calledWith('selected', 23);
    });
  });

  describe('#currentRange', () => {
    it('Should collapse the pagination if total is greater than ' +
      'the maximum number of cases.', () => {
      dummy.total = CASES + 3;
      dummy.selected = 1;
      expect(dummy.currentRange.length).to.equal(CASES);
    });

    it('Should not collapse the pagination if total is less than ' +
      'the maximum number of cases.', () => {
      dummy.total = CASES - 3;
      dummy.selected = 1;
      expect(dummy.currentRange.length).to.equal(CASES - 3);
    });

    it('Should have an ellipsis only on the right if the pagination ' +
      'is collapsed and the selected page is in the beginning.', () => {
      dummy.total = CASES + 10;
      dummy.selected = 2;
      const range = dummy.currentRange;

      const ellipsisLeft = range[1];
      const ellipsisRight = range[range.length - 2];

      expect(ellipsisLeft).to.equal(2);
      expect(ellipsisRight).to.equal(null);
    });

    it('Should have an ellipsis only on the left if the pagination ' +
      'is collapsed and the selected page is at the end.', () => {
      dummy.total = CASES + 10;
      dummy.selected = dummy.total - 2;
      const range = dummy.currentRange;

      const ellipsisLeft = range[1];
      const ellipsisRight = range[range.length - 2];

      expect(ellipsisLeft).to.equal(null);
      expect(ellipsisRight).to.equal(dummy.total - 1);
    });

    it('Should have ellipsis on both sides if the pagination ' +
      'is collapsed and the selected page is in the middle.', () => {
      dummy.total = CASES + 10;
      dummy.selected = Math.round(dummy.total / 2);
      const range = dummy.currentRange;

      const ellipsisLeft = range[1];
      const ellipsisRight = range[range.length - 2];

      expect(ellipsisLeft).to.equal(null);
      expect(ellipsisRight).to.equal(null);
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
