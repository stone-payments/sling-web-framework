import { registerComponent } from 'sling-helpers';
import { Paginator, CASES } from './Paginator.js';

registerComponent('sling-paginator', Paginator);

let $paginator;
const $docBody = document.body;

describe('Paginator', () => {
  beforeEach(() => {
    $paginator = document.createElement('sling-paginator');
    $docBody.appendChild($paginator);
  });

  afterEach(() => {
    $docBody.removeChild($paginator);
    $paginator = undefined;
  });

  it('Should remove total if it is zero.', (done) => {
    $paginator.total = 0;

    setTimeout(() => {
      expect($paginator.total).to.equal(undefined);
      done();
    });
  });

  it('Should remove total if it is null.', (done) => {
    $paginator.total = null;

    setTimeout(() => {
      expect($paginator.total).to.equal(undefined);
      done();
    });
  });

  it('Should remove selected if total is null.', (done) => {
    $paginator.selected = 5;
    $paginator.total = null;

    setTimeout(() => {
      expect($paginator.selected).to.equal(undefined);
      done();
    });
  });

  it('Should select first page if total becomes one.', (done) => {
    $paginator.total = 1;

    setTimeout(() => {
      expect($paginator.selected).to.equal(1);
      done();
    });
  });

  it('Should select first page if total becomes more than one.', (done) => {
    $paginator.total = 5;

    setTimeout(() => {
      expect($paginator.selected).to.equal(1);
      done();
    });
  });

  it('Should select first page if total is greater than one and ' +
    'selected is less than one.', (done) => {
    $paginator.total = 5;
    $paginator.selected = -2;

    setTimeout(() => {
      expect($paginator.selected).to.equal(1);
      done();
    });
  });

  it('Should select first page if total is greater than one and ' +
    'selected is null.', (done) => {
    $paginator.total = 5;
    $paginator.selected = null;

    setTimeout(() => {
      expect($paginator.selected).to.equal(1);
      done();
    });
  });

  it('Should select last page if total is greater than one and ' +
    'selected is greater than total.', (done) => {
    $paginator.total = 5;
    $paginator.selected = 8;

    setTimeout(() => {
      expect($paginator.selected).to.equal(5);
      done();
    });
  });

  it('Should move to the next page.', (done) => {
    $paginator.total = 5;
    $paginator.selected = 3;
    $paginator.paginate('next')();

    setTimeout(() => {
      expect($paginator.selected).to.equal(4);
      done();
    });
  });

  it('Should not move to the next page if already ' +
    'on the last.', (done) => {
    $paginator.total = 5;
    $paginator.selected = 5;
    $paginator.paginate('next')();

    setTimeout(() => {
      expect($paginator.selected).to.equal(5);
      done();
    });
  });

  it('Should move to the previous page.', (done) => {
    $paginator.total = 5;
    $paginator.selected = 3;
    $paginator.paginate('previous')();

    setTimeout(() => {
      expect($paginator.selected).to.equal(2);
      done();
    });
  });

  it('Should not move to the previous page if already ' +
    'on the first.', (done) => {
    $paginator.total = 5;
    $paginator.selected = 1;
    $paginator.paginate('previous')();

    setTimeout(() => {
      expect($paginator.selected).to.equal(1);
      done();
    });
  });

  it('Should trigger a pagination event if total is zero ' +
    'and the previous paginate method was called.', (done) => {
    const handlePaginate = (evt) => {
      expect(evt.detail.type).to.equal('previous');
      $docBody.removeEventListener('paginate', handlePaginate);
      done();
    };

    $docBody.addEventListener('paginate', handlePaginate);
    $paginator.total = 0;
    $paginator.paginate('previous')();
  });

  it('Should trigger a pagination event if total is zero ' +
    'and the next paginate method was called.', (done) => {
    const handlePaginate = (evt) => {
      expect(evt.detail.type).to.equal('next');
      $docBody.removeEventListener('paginate', handlePaginate);
      done();
    };

    $docBody.addEventListener('paginate', handlePaginate);
    $paginator.total = 0;
    $paginator.paginate('next')();
  });

  it('Should trigger a pagination event if total is greater than one ' +
    'and the index paginate method was called.', (done) => {
    const handlePaginate = (evt) => {
      expect(evt.detail.type).to.equal('index');
      expect(evt.detail.index).to.equal(3);
      expect($paginator.selected).to.equal(3);
      $docBody.removeEventListener('paginate', handlePaginate);
      done();
    };

    $docBody.addEventListener('paginate', handlePaginate);
    $paginator.total = 5;
    $paginator.paginate('index', 3)();
  });

  it('Should collapse the pagination if total is greater than ' +
    'the maximum number of cases.', () => {
    $paginator.total = CASES + 3;
    $paginator.selected = 1;
    expect($paginator.getRange().length).to.equal(CASES);
  });

  it('Should not collapse the pagination if total is less than ' +
    'the maximum number of cases.', () => {
    $paginator.total = CASES - 3;
    $paginator.selected = 1;
    expect($paginator.getRange().length).to.equal(CASES - 3);
  });

  it('Should have an ellipsis only on the right if the pagination ' +
    'is collapsed and the selected page is in the beginning.', () => {
    $paginator.total = CASES + 10;
    $paginator.selected = 2;
    const range = $paginator.getRange();

    const ellipsisLeft = range[1];
    const ellipsisRight = range[range.length - 2];

    expect(ellipsisLeft).to.equal(2);
    expect(ellipsisRight).to.equal(null);
  });

  it('Should have an ellipsis only on the left if the pagination ' +
    'is collapsed and the selected page is at the end.', () => {
    $paginator.total = CASES + 10;
    $paginator.selected = $paginator.total - 2;
    const range = $paginator.getRange();

    const ellipsisLeft = range[1];
    const ellipsisRight = range[range.length - 2];

    expect(ellipsisLeft).to.equal(null);
    expect(ellipsisRight).to.equal($paginator.total - 1);
  });

  it('Should have ellipsis on both sides if the pagination ' +
    'is collapsed and the selected page is in the middle.', () => {
    $paginator.total = CASES + 10;
    $paginator.selected = Math.round($paginator.total / 2);
    const range = $paginator.getRange();

    const ellipsisLeft = range[1];
    const ellipsisRight = range[range.length - 2];

    expect(ellipsisLeft).to.equal(null);
    expect(ellipsisRight).to.equal(null);
  });
});
