import {
  INITIAL_STATE,
  byIdReducer,
  addField,
  updateFieldValue,
  updateFieldTouched,
  startValidation,
  // removeFields,
  // finishValidation,
  // setValues,
} from './byIdReducer.js';

import { FORM } from './constant.js';

let state;

describe('byIdReducer', () => {
  beforeEach(() => {
    state = null;
  });

  it('Should return the initial state.', () => {
    state = byIdReducer();
    expect(state).to.eql(INITIAL_STATE);
  });

  it('Should add a new field to the current state.', () => {
    state = byIdReducer(INITIAL_STATE, addField('username'));

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

  it('Should use the field name as property even if it ' +
    'represents a path to a nested object.', () => {
    state = byIdReducer(INITIAL_STATE, addField('games[0].name'));

    expect(state).to.eql({
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
      'games[0].name': {
        error: null,
        isValidating: false,
        validation: null,
        value: '',
        touched: false,
      },
    });
  });

  it('Should update a field\'s value property.', () => {
    state = byIdReducer(INITIAL_STATE, addField('username'));
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

  it('Should not update a field\'s value property ' +
    'if the field was not added first.', () => {
    state = byIdReducer(INITIAL_STATE, updateFieldValue('username', 'test'));

    expect(state).to.eql({
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
    });
  });

  it('Should not update state if the value has not changed.', () => {
    state = byIdReducer(INITIAL_STATE, addField('username'));
    state = byIdReducer(state, updateFieldValue('username', 'test'));

    const unchangedState =
      byIdReducer(state, updateFieldValue('username', 'test'));

    expect(state).to.equal(unchangedState);
  });

  it('Should update a field\'s touched property.', () => {
    state = byIdReducer(INITIAL_STATE, addField('username'));
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
        value: '',
        touched: true,
      },
    });
  });

  it('Should not update a field\'s touched property ' +
    'if the field was not added first.', () => {
    state = byIdReducer(INITIAL_STATE, updateFieldTouched('username', true));

    expect(state).to.eql({
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
    });
  });

  it('Should not update state if the touched has not changed.', () => {
    state = byIdReducer(INITIAL_STATE, addField('username'));
    state = byIdReducer(state, updateFieldTouched('username', true));

    const unchangedState =
      byIdReducer(state, updateFieldTouched('username', true));

    expect(state).to.equal(unchangedState);
  });

  it('Should set validation and isValidating properties.', () => {
    const validatorFn = value => value;

    state = byIdReducer(INITIAL_STATE, addField('username'));
    state = byIdReducer(state, startValidation('username', validatorFn));

    expect(state).to.eql({
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
      username: {
        error: null,
        isValidating: true,
        validation: validatorFn,
        value: '',
        touched: false,
      },
    });
  });

  it('Should not update validation and isValidating properties ' +
    'if the field was not added first.', () => {
    const validatorFn = value => value;

    state = byIdReducer(INITIAL_STATE,
      startValidation('username', validatorFn));

    expect(state).to.eql({
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
    });
  });

  /*

  it('Should end username validation with test error message', () => {
    state = byIdReducer(INITIAL_STATE,
      finishValidation('username', 'test error'));

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
        value: '',
        touched: false,
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
  */
});
