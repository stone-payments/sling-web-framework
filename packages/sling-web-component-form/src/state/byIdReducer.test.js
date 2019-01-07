import {
  INITIAL_STATE,
  byIdReducer,
  addField,
  updateFieldValue,
  updateFieldTouched,
  startValidation,
  finishValidation,
  setValues,
  removeFields,
  resetFields,
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

  it('Should not set validation and isValidating properties ' +
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

  it('Should set validation, isValidating and error properties.', () => {
    state = byIdReducer(INITIAL_STATE, addField('username'));
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
        value: '',
        touched: false,
      },
    });
  });

  it('Should not set validation, isValidating and error properties ' +
    'if the field was not added first.', () => {
    state = byIdReducer(INITIAL_STATE,
      finishValidation('username', 'test error'));

    expect(state).to.eql({
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
    });
  });

  it('Should add values to the state.', () => {
    state = byIdReducer(INITIAL_STATE, setValues({
      username: 'stone',
    }));

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
        value: 'stone',
        touched: false,
      },
    });
  });

  it('Should remove previous values when setting new values.', () => {
    state = byIdReducer(INITIAL_STATE, setValues({
      username: 'stone',
    }));

    state = byIdReducer(state, setValues({
      password: '**secret**',
    }));

    expect(state).to.eql({
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
      password: {
        error: null,
        isValidating: false,
        validation: null,
        value: '**secret**',
        touched: false,
      },
    });
  });

  it('Should flatten values in state when setting new values.', () => {
    state = byIdReducer(INITIAL_STATE, setValues({
      games: [
        { name: 'Portal' },
        { name: 'Fez' },
        { name: 'Braid' },
      ],
    }));

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
        value: 'Portal',
        touched: false,
      },
      'games[1].name': {
        error: null,
        isValidating: false,
        validation: null,
        value: 'Fez',
        touched: false,
      },
      'games[2].name': {
        error: null,
        isValidating: false,
        validation: null,
        value: 'Braid',
        touched: false,
      },
    });
  });

  it('Should remove a single field.', () => {
    state = byIdReducer(INITIAL_STATE, setValues({
      username: 'stone',
      password: '**secret**',
    }));

    state = byIdReducer(state, removeFields('username'));

    expect(state).to.eql({
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
      password: {
        error: null,
        isValidating: false,
        validation: null,
        value: '**secret**',
        touched: false,
      },
    });
  });

  it('Should remove many fields.', () => {
    state = byIdReducer(INITIAL_STATE, setValues({
      games: [
        { name: 'Portal 2', console: 'PS3' },
        { name: 'Fez', console: 'PC' },
      ],
    }));

    state = byIdReducer(state, removeFields('games[1]'));

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
        value: 'Portal 2',
        touched: false,
      },
      'games[0].console': {
        error: null,
        isValidating: false,
        validation: null,
        value: 'PS3',
        touched: false,
      },
    });
  });

  it('Should update ids that represent arrays when removing fields.', () => {
    state = byIdReducer(INITIAL_STATE, setValues({
      games: [
        { name: 'Portal 2', console: 'PS3' },
        { name: 'Fez', console: 'PC' },
      ],
    }));

    state = byIdReducer(state, removeFields('games[0]'));

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
        value: 'Fez',
        touched: false,
      },
      'games[0].console': {
        error: null,
        isValidating: false,
        validation: null,
        value: 'PC',
        touched: false,
      },
    });
  });

  it('Should remove a whole branch of fields.', () => {
    state = byIdReducer(INITIAL_STATE, setValues({
      games: [
        { name: 'Portal 2', console: 'PS3' },
        { name: 'Fez', console: 'PC' },
      ],
    }));

    state = byIdReducer(state, removeFields('games'));

    expect(state).to.eql({
      [FORM]: {
        error: null,
        isValidating: false,
        validation: null,
      },
    });
  });

  it('Should reset all fields to their initial values.', () => {
    state = byIdReducer(INITIAL_STATE, setValues({
      username: 'stone',
      games: [
        { name: 'Portal 2', console: 'PS3' },
      ],
    }));

    state = byIdReducer(state, resetFields());

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
      'games[0].name': {
        error: null,
        isValidating: false,
        validation: null,
        value: '',
        touched: false,
      },
      'games[0].console': {
        error: null,
        isValidating: false,
        validation: null,
        value: '',
        touched: false,
      },
    });
  });
});
