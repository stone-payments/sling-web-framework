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
  });

  afterEach(() => {
    Dummy = undefined;
    dummy = undefined;
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
