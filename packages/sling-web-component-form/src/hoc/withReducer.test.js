import { withReducer } from './withReducer.js';

describe('withReducer', () => {
  it('Should return a function that returns a class.', () => {
    const reducer = () => ({});
    expect(withReducer(reducer)).to.be.a('function');
    expect(withReducer(reducer)()).to.be.a('function');
  });

  describe('#constructor()', () => {
    it('Should initialize this.state with reducer().', () => {
      const initialState = { a: 50 };
      const reducer = () => initialState;

      class Laser extends withReducer(reducer)() {}
      const laser = new Laser();

      expect(laser.state).to.equal(initialState);
    });
  });

  const reducer = (state = { level: 0 }, action = {}) => {
    switch (action.type) {
      case 'UPGRADE':
        return { ...state, level: action.level };

      default:
        return state;
    }
  };

  class Dummy extends withReducer(reducer)() {}

  describe('#dispatchAction()', () => {
    it('Should change this.state if an object is passed as an action.', () => {
      const dummy = new Dummy();
      dummy.dispatchAction({ type: 'UPGRADE', level: 5 });
      expect(dummy.state.level).to.equal(5);
    });

    it('Should change this.state if an asynchronous function ' +
      'is passed as an action.', async () => {
      const dummy = new Dummy();
      const asyncUpgrade = Promise.resolve({ type: 'UPGRADE', level: 5 });
      const asyncDispatch = dummy.dispatchAction(asyncUpgrade);

      expect(dummy.state.level).to.equal(0);

      await asyncDispatch;
      expect(dummy.state.level).to.equal(5);
    });

    it('Should change this.state if a thunk receiving dispatch and ' +
      'getState is passed as an action.', () => {
      const dummy = new Dummy();
      dummy.dispatchAction({ type: 'UPGRADE', level: 5 });

      expect(dummy.state.level).to.equal(5);

      const thunkAction = (dispatch, getState) => {
        const level = getState().level * 2;
        dispatch({ type: 'UPGRADE', level });
      };

      dummy.dispatchAction(thunkAction);

      expect(dummy.state.level).to.equal(10);
    });
  });
});
