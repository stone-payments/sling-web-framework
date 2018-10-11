import { registerComponent } from 'sling-helpers';
import { Card, applySlotClass } from './Card.js';

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

describe('applySlotClass', () => {
  it('Should create properly className with card part ' +
  'visible and padding for Card after be called', () => {
    const area = 'cardPart';
    const isVisible = true;
    const hasPadding = true;
    const resultantClassName = applySlotClass(area, isVisible, hasPadding);

    expect(resultantClassName).to.be.equals('emd-card__slot ' +
    'emd-card__slot_cardPart emd-card__slot_visible');
  });

  it('Should create properly className with card part ' +
  'visible and no padding for Card after be called', () => {
    const area = 'cardPart';
    const isVisible = true;
    const hasPadding = false;
    const resultantClassName = applySlotClass(area, isVisible, hasPadding);

    expect(resultantClassName).to.be.equals('emd-card__slot ' +
    'emd-card__slot_cardPart emd-card__slot_visible emd-card__slot_nopadding');
  });

  it('Should create properly className with card part ' +
  'invisible and no padding for Card after be called', () => {
    const area = 'cardPart';
    const isVisible = false;
    const hasPadding = false;
    const resultantClassName = applySlotClass(area, isVisible, hasPadding);

    expect(resultantClassName).to.be.equals('emd-card__slot ' +
    'emd-card__slot_cardPart emd-card__slot_hidden emd-card__slot_nopadding');
  });
});
