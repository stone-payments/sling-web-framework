import {
  INITIAL_STATE,
  formReducer,
  finishSubmission,
  startSubmission,
  addField,
} from './formReducer.js';

import { FORM } from './constant.js';

let state;

describe('formReducer', () => {
  beforeEach(() => {
    state = null;
  });

  it('Should return the initial state.', () => {
    state = formReducer();
    expect(state).to.eql(INITIAL_STATE);
  });

  it('Should change submitCount when starting submission.', () => {
    state = formReducer(INITIAL_STATE, startSubmission());

    expect(state).to.eql({
      byId: {
        [FORM]: {
          error: null,
          isValidating: false,
          validation: null,
        },
      },
      dirty: false,
      errors: {},
      values: {},
      touched: {},
      isValid: true,
      isValidField: {},
      isValidating: false,
      isValidatingField: {},
      submitCount: 1,
      isSubmitting: true,
    });
  });

  it('Should not start submission if isSubmitting is true.', () => {
    state = formReducer(INITIAL_STATE, startSubmission());
    const unchangedState = formReducer(state, startSubmission());
    expect(state).to.equal(unchangedState);
  });

  it('Should set isSubmitting to false after submitting.', () => {
    state = formReducer(INITIAL_STATE, startSubmission());
    state = formReducer(state, finishSubmission());

    expect(state).to.eql({
      byId: {
        [FORM]: {
          error: null,
          isValidating: false,
          validation: null,
        },
      },
      dirty: false,
      errors: {},
      values: {},
      touched: {},
      isValid: true,
      isValidField: {},
      isValidating: false,
      isValidatingField: {},
      submitCount: 1,
      isSubmitting: false,
    });
  });

  it('Should not finish submission if isSubmitting is false.', () => {
    state = formReducer(INITIAL_STATE, startSubmission());
    state = formReducer(state, finishSubmission());
    const unchangedState = formReducer(state, finishSubmission());
    expect(state).to.equal(unchangedState);
  });

  it('Should call byIdReducer implicitly.', () => {
    state = formReducer();
    const changedState = formReducer(state, addField('username'));
    expect(state).not.to.equal(changedState);
  });
});
