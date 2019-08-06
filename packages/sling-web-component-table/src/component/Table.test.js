import { registerComponent } from 'sling-helpers';
import { Table } from './Table.js';

registerComponent('sling-table', Table);

let $table;
describe('Table', () => {
  beforeEach(() => {
    $table = document.createElement('sling-table');
    document.body.appendChild($table);
  });

  afterEach(() => {
    document.body.removeChild($table);
    $table = undefined;
  });

  it('Should reflect "editable", ' +
    '"noheader" and clickablerows attribute to property ', () => {
    $table.setAttribute('editable', '');
    $table.setAttribute('noheader', '');
    $table.setAttribute('clickablerows', '');

    expect($table.editable).to.be.true;
    expect($table.noheader).to.be.true;
    expect($table.clickablerows).to.be.true;
  });

  it('Should reflect "editable", ' +
    '"noheader" and clickablerows attribute to property ', () => {
    $table.editable = '';
    $table.noheader = '';
    $table.clickablerows = '';

    expect($table.hasAttribute('editable')).to.be.true;
    expect($table.hasAttribute('noheader')).to.be.true;
    expect($table.hasAttribute('clickablerows')).to.be.true;
  });

  it('Should have sticky class without tooltip', (done) => {
    document.body.removeChild($table);
    $table = document.createElement('sling-table');
    $table.srccolumns = [
      {
        field: 'field',
        title: 'title',
      },
    ];
    document.body.appendChild($table);

    setTimeout(() => {
      expect($table.shadowRoot.innerHTML
        .includes('emd-table__title_sticky')).to.be.true;
      done();
    });
  });


  it('Should not have sticky class with tooltip', (done) => {
    document.body.removeChild($table);
    $table = document.createElement('sling-table');
    $table.srccolumns = [
      {
        field: 'field',
        title: 'title',
        tooltiptext: 'tooltip',
      },
    ];
    document.body.appendChild($table);

    setTimeout(() => {
      expect($table.shadowRoot.innerHTML
        .includes('emd-table__title_sticky')).to.be.false;
      done();
    });
  });


  it('Should render rates correctly', (done) => {
    document.body.removeChild($table);
    $table = document.createElement('sling-table');
    $table.srccolumns = [
      {
        field: 'rate',
        title: 'title',
        type: 'rate',
      },
    ];
    $table.srcdata = [
      {
        rate: 0.67,
      },
    ];
    document.body.appendChild($table);

    setTimeout(() => {
      expect($table.shadowRoot.innerHTML.includes('0,67%')).to.be.true;
      done();
    }, 30);
  });

  it('Should render the edit cell correctly', (done) => {
    setTimeout(() => {
      expect($table.constructor.getEditCell().trim()
        .startsWith('<td')).to.be.true;
      done();
    }, 30);
  });

  describe('.makeTitleSticky()', () => {
    it('Should not make title sticky if title has tooltips', () => {
      const columns = [{ tooltiptext: true }];
      expect($table.constructor.makeTitleSticky(columns)).to.equal('');
    });

    it('Should make title sticky if title does not have tooltips', () => {
      expect($table.constructor.makeTitleSticky([]))
        .to.equal(' emd-table__title_sticky');
    });
  });
});

