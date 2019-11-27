import { flatten, unflatten } from '@stone-payments/emd-helpers';

export const formValues = {
  name: 'Leonardo',
  phone: '21983058503',
  old: true,
  games: ['Fez', 'Portal']
};

export const formFieldNames = [
  'name',
  'phone',
  'old',
  'games[0]',
  'games[1]'
];

export const formDom = {
  name: { value: 'Leonardo', unmaskedValue: 'Leonardo' },
  phone: { value: '(21) 98305-8503', unmaskedValue: '21983058503' },
  old: { value: true, unmaskedValue: true },
  'games[0]': { value: 'Fez', unmaskedValue: 'Fez' },
  'games[1]': { value: 'Portal', unmaskedValue: 'Portal' }
};

const valuesToDom = values => Object
  .entries(flatten(values))
  .reduce((result, [key, value]) => ({
    ...result,
    [key]: { unmaskedValue: value }
  }), {});

const domToValues = dom => unflatten(
  Object
    .entries(dom)
    .reduce((result, [key, value]) => ({
      ...result,
      [key]: value.unmaskedValue
    }), {})
);

valuesToDom(formValues); // ?

domToValues(formDom); // ?
