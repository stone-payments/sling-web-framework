import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { isDeeplyEmpty } from 'sling-helpers/src';

import {
  formReducer,
  updateDirty,
  startSubmission,
  finishSubmission,
  addField,
  validateField,
  updatePropValue,
  updateValues,
} from './FormReducer.js';


// TESTS

const requiredField = value => (!value
  ? 'This field is required'
  : undefined);

const store = createStore(formReducer, applyMiddleware(thunk));

let previousState = {};

store.subscribe(() => {
  const nextState = store.getState();
  console.log(previousState !== nextState);
  console.log(store.getState());
  previousState = nextState;
});

store.dispatch(updateDirty(true));
store.dispatch(updateDirty(true));
store.dispatch(updateDirty(true));
store.dispatch(updateDirty(true));
store.dispatch(updateDirty(true));

store.dispatch(startSubmission());
store.dispatch(finishSubmission());

store.dispatch(addField('username'));
store.dispatch(validateField('username', requiredField, ''));

store.dispatch(addField('friends[0]'));
store.dispatch(validateField('friends[0]', requiredField, ''));

store.dispatch(updatePropValue('username', '100'));
store.dispatch(updatePropValue('username', '100'));
store.dispatch(updatePropValue('username', '100'));
store.dispatch(updatePropValue('username', '100'));
store.dispatch(validateField('username', requiredField, '100'));

setTimeout(() => {
  store.dispatch(updateValues({
    username: 'malamala',
    friends: ['lupalupa'],
  }));
}, 100);

isDeeplyEmpty({}); // ?
isDeeplyEmpty([]); // ?
isDeeplyEmpty(null); // ?
isDeeplyEmpty(undefined); // ?
isDeeplyEmpty({ a: { b: null }, c: [null, undefined] }); // ?
