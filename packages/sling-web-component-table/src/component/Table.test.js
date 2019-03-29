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
});

