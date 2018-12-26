import {
  formReducer,
  INITIAL_STATE,
  finishSubmission,
  startSubmission,
} from './formReducer.js';

import { FORM } from './constant.js';

describe('formReducer', () => {
  let state = formReducer();

  it('Should return the initial state', () => {
    expect(state).to.eql(INITIAL_STATE);
  });

  it('Should change submitCount when startSubmission', () => {
    state = formReducer(state, startSubmission());
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

  it('Should return to the initial state after finish submission', () => {
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
});
