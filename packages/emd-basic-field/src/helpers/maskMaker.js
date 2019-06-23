import Cleave from 'cleave.js';
import 'cleave.js/dist/addons/cleave-phone.br';

const noop = () => {};

export const maskMaker = config => (domEl, onValueChanged = noop) =>
  new Cleave(domEl, { ...config, onValueChanged });
