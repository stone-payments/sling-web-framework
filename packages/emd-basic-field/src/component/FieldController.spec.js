// import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { FieldController } from './FieldController.js';

chai.use(sinonChai);

describe('FieldController', () => {
  it('Should not break when not passed a Base class', () => {
    FieldController();
  });
});
