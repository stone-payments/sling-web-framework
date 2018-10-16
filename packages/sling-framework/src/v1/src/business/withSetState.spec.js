import { expect } from 'chai';
import { withSetState } from './withSetState.js';

class Dummy extends withSetState() {}

describe('withSetState', () => {
  describe('#setState()', () => {
    it('Should extend this.state with new properties ' +
      'if called with an object.', () => {
      const dummy = new Dummy();
      dummy.state = { level: 42 };
      dummy.setState({ ub: 40 });
      expect(dummy.state).to.deep.equal({ level: 42, ub: 40 });
    });

    it('Should override properties with the same name.', () => {
      const dummy = new Dummy();
      dummy.state = { level: 42 };
      dummy.setState({ level: 202 });
      expect(dummy.state).to.deep.equal({ level: 202 });
    });

    it('Should extend this.state with new properties ' +
      'if called with a function that returns an object.', () => {
      const dummy = new Dummy();
      dummy.state = { level: 42 };
      dummy.setState(() => ({ ub: 40 }));
      expect(dummy.state).to.deep.equal({ level: 42, ub: 40 });
    });

    it('Should expose this.state’s previous value ' +
      'if called with a function that returns an object.', () => {
      const dummy = new Dummy();
      dummy.state = { level: 42 };
      dummy.setState(prevState => ({ level: prevState.level + 1 }));
      expect(dummy.state).to.deep.equal({ level: 43 });
    });

    it('Should initialize this.state with an empty object ' +
      'if not set.', () => {
      const dummy = new Dummy();
      dummy.setState({ ub: 40 });
      expect(dummy.state).to.deep.equal({ ub: 40 });
    });
  });
});
