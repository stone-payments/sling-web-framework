
import { onlyForm, onlyFields, parseState } from './formSelectors.js';
import { FORM } from './constant.js';

describe('formSelectors', () => {
  const state = {
    [FORM]: {
      error: null,
      isValidating: false,
      validation: null,
    },
    username: {
      error: null,
      isValidating: false,
      validation: null,
      value: 'a',
      touched: false,
    },
  };

  it('Should return only Form values.', () => {
    expect(onlyForm(state)).to.eql({
      error: null,
      isValidating: false,
      validation: null,
    });
  });

  it('Should return only Form fields.', () => {
    expect(onlyFields(state)).to.eql({
      username: {
        error: null,
        isValidating: false,
        validation: null,
        value: 'a',
        touched: false,
      },
    });
  });

  it('Should correctly transform byId state into ' +
    'the format that is exposed to the user.', () => {
    const byIdState = {
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
      username: {
        error: null,
        isValidating: false,
        validation: null,
        value: 'stone',
        touched: true,
      },
      'phones[0]': {
        error: 'invalid phone',
        isValidating: false,
        validation: null,
        value: '3333-3333',
        touched: false,
      },
    };

    const userState = {
      dirty: true,
      errors: {
        username: null,
        phones: ['invalid phone'],
      },
      values: {
        username: 'stone',
        phones: ['3333-3333'],
      },
      touched: {
        username: true,
        phones: [false],
      },
      isValid: false,
      isValidField: {
        username: true,
        phones: [false],
      },
      isValidating: false,
      isValidatingField: {
        username: false,
        phones: [false],
      },
    };

    expect(parseState(byIdState)).to.eql(userState);
  });
});
