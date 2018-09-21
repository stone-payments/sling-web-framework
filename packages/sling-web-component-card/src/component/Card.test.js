import { registerComponent } from 'sling-helpers';
import { Card } from './Card.js';

registerComponent('sling-card', Card);

let $card;

describe('Card', () => {
  beforeEach(() => {
    $card = document.createElement('sling-card');
    document.body.appendChild($card);
  });

  afterEach(() => {
    document.body.removeChild($card);
    $card = undefined;
  });

  it('Should reflect "nopadding", "nopaddingheader", ' +
  '"nopaddingbody" and "nopaddingfooter" attribute to property ', () => {
    $card.setAttribute('nopadding', '');
    $card.setAttribute('nopaddingheader', '');
    $card.setAttribute('nopaddingbody', '');
    $card.setAttribute('nopaddingfooter', '');

    expect($card.nopadding).to.be.true;
    expect($card.nopaddingheader).to.be.true;
    expect($card.nopaddingbody).to.be.true;
    expect($card.nopaddingfooter).to.be.true;
  });

  it('Should reflect "nopadding", "nopaddingheader", ' +
  '"nopaddingbody" and "nopaddingfooter" property to attribute ', () => {
    $card.nopadding = false;
    $card.nopaddingheader = false;
    $card.nopaddingbody = false;
    $card.nopaddingfooter = false;

    expect($card.nopadding).to.be.false;
    expect($card.nopaddingheader).to.be.false;
    expect($card.nopaddingbody).to.be.false;
    expect($card.nopaddingfooter).to.be.false;
  });
});

