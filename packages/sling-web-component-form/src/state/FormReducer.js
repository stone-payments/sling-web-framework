import { byIdReducer } from './byIdReducer.js';
import { parseState } from './formSelectors.js';

export { validateField, validateForm } from './formValidation.js';

export {
  addField,
  removeField,
  updateFieldValue,
  updateFieldTouched,
  updateValues,
  startValidation,
  finishValidation,
} from './byIdReducer.js';

export { onlyForm, onlyFields } from './formSelectors.js';

const INITIAL_STATE = {
  dirty: false,
  submitCount: 0,
  isSubmitting: false,
  byId: byIdReducer(),
  ...parseState(byIdReducer()),
};

const START_SUBMISSION = Symbol('START_SUBMISSION');
const FINISH_SUBMISSION = Symbol('FINISH_SUBMISSION');

export const startSubmission = () => ({
  type: START_SUBMISSION,
});

export const finishSubmission = () => ({
  type: FINISH_SUBMISSION,
});

export const formReducer = (state = INITIAL_STATE, action = {}) => {
  const previousById = state.byId;
  const byId = byIdReducer(previousById, action);
  const parsed = parseState(byId);
  const nextState = { ...state, byId, ...parsed };
  const { submitCount } = nextState;

  switch (action.type) {
    case START_SUBMISSION:
      return (!state.isSubmitting)
        ? { ...nextState, submitCount: submitCount + 1, isSubmitting: true }
        : state;

    case FINISH_SUBMISSION:
      return (state.isSubmitting)
        ? { ...nextState, isSubmitting: false }
        : state;

    default:
      return (previousById !== byId) ? nextState : state;
  }
};
