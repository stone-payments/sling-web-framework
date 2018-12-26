import {
  byIdReducer,
  INITIAL_STATE,
  addField,
  updateFieldValue,
  removeFields,
  updateFieldTouched,
  startValidation,
  finishValidation,
  setValues,
} from './byIdReducer.js';

import { FORM } from './constant.js';

describe('byIdReducer', () => {
  let state = byIdReducer();

  it('Should return the initial state', () => {
    expect(state).to.eql(INITIAL_STATE);
  });

  it('Should add field called username to the initial state', () => {
    state = byIdReducer(state, addField('username'));

    expect(state).to.eql({
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
      username: {
        error: null,
        isValidating: false,
        validation: null,
        value: '',
        touched: false,
      },
    });
  });

  it('Should update field username with test value', () => {
    state = byIdReducer(state, updateFieldValue('username', 'test'));

    expect(state).to.eql({
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
      username: {
        error: null,
        isValidating: false,
        validation: null,
        value: 'test',
        touched: false,
      },
    });
  });

  it('Should set username touched to true', () => {
    state = byIdReducer(state, updateFieldTouched('username', true));
    expect(state).to.eql({
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
      username: {
        error: null,
        isValidating: false,
        validation: null,
        value: 'test',
        touched: true,
      },
    });
  });

  it('Should set username validation and isValidating to true', () => {
    state = byIdReducer(state, startValidation('username', true));

    expect(state).to.eql({
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
      username: {
        error: null,
        isValidating: true,
        validation: true,
        value: 'test',
        touched: true,
      },
    });
  });

  it('Should end username validation with test error message', () => {
    state = byIdReducer(state, finishValidation('username', 'test error'));

    expect(state).to.eql({
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
      username: {
        error: 'test error',
        isValidating: false,
        validation: null,
        value: 'test',
        touched: true,
      },
    });
  });

  it('Should remove username field', () => {
    state = byIdReducer(state, removeFields('username'));
    expect(state).to.eql(INITIAL_STATE);
  });

  it('Should add set of values to initial state', () => {
    state = byIdReducer(state, setValues('a'));

    expect(state).to.eql({
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
      0: {
        error: null,
        isValidating: false,
        validation: null,
        value: 'a',
        touched: false,
      },
    });
  });
});
