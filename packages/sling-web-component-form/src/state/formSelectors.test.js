
import { onlyForm, onlyFields } from './formSelectors.js';
import { FORM } from './constant.js';

describe('formSelectors', () => {
  const state = {
    [FORM]: {
      error: null,
      isValidating: false,
      validation: null,
    },
    0: { error: null,
      isValidating: false,
      validation: null,
      value: 'a',
      touched: false,
      used: false },
  };
  it('Should return only Form values', () => {
    expect(onlyForm(state)).to.eql({
      error: null,
      isValidating: false,
      validation: null,
    });
  });
  it('Should return only Form fields', () => {
    expect(onlyFields(state)).to.eql({
      0: { error: null,
        isValidating: false,
        validation: null,
        value: 'a',
        touched: false,
        used: false },
    });
  });
});
