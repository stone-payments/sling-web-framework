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
    setTimeout(() => {
      $table.setAttribute('editable', '');
      $table.setAttribute('noheader', '');
      $table.setAttribute('clickablerows', '');

      expect($table.editable).to.be.true;
      expect($table.noheader).to.be.true;
      expect($table.clickablerows).to.be.true;
    });
  });

  it('Should reflect "editable", ' +
  '"noheader" and clickablerows attribute to property ', () => {
    setTimeout(() => {
      $table.editable = '';
      $table.noheader = '';
      $table.clickablerows = '';

      expect($table.editable).to.be.true;
      expect($table.noheader).to.be.true;
      expect($table.clickablerows).to.be.true;
    });
  });
});

