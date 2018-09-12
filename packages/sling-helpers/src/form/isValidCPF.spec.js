import chai from 'chai';
import { isValidCPF } from './isValidCPF.js';

const { expect } = chai;

describe('isValidCPF', () => {
  it('Should return true for valid CPFs.', () => {
    expect(isValidCPF('07831957707')).to.equal(true);
    expect(isValidCPF('078.319.577-07')).to.equal(true);
    expect(isValidCPF('054.006.565-01')).to.equal(true);
    expect(isValidCPF('012.138.244-35')).to.equal(true);
    expect(isValidCPF('136.225.727-36')).to.equal(true);
    expect(isValidCPF('119.792.027-70')).to.equal(true);
    expect(isValidCPF('113.162.554-41')).to.equal(true);
    expect(isValidCPF('092.785.134-23')).to.equal(true);
    expect(isValidCPF('526.975.198-40')).to.equal(true);
    expect(isValidCPF('576.778.798-02')).to.equal(true);
    expect(isValidCPF('686.579.115-07')).to.equal(true);
    expect(isValidCPF('248.405.529-32')).to.equal(true);
    expect(isValidCPF('487.358.558-94')).to.equal(true);
    expect(isValidCPF('070.085.554-82')).to.equal(true);
    expect(isValidCPF('674.241.258-50')).to.equal(true);
    expect(isValidCPF('526.861.978-03')).to.equal(true);
    expect(isValidCPF('696.743.051-30')).to.equal(true);
    expect(isValidCPF('064.197.458-29')).to.equal(true);
    expect(isValidCPF('829.838.741-41')).to.equal(true);
    expect(isValidCPF('131.452.143-81')).to.equal(true);
    expect(isValidCPF('348.576.867-75')).to.equal(true);
    expect(isValidCPF('925.759.284-78')).to.equal(true);
    expect(isValidCPF('234.380.243-22')).to.equal(true);
    expect(isValidCPF('423.414.799-01')).to.equal(true);
  });

  it('Should return false to invalid CPFs.', () => {
    expect(isValidCPF('')).to.equal(false);
    expect(isValidCPF('423.414.799')).to.equal(false);
    expect(isValidCPF('123.345.456-78')).to.equal(false);
    expect(isValidCPF('000.000.000-00')).to.equal(false);
    expect(isValidCPF('111.111.111-11')).to.equal(false);
    expect(isValidCPF('222.222.222-22')).to.equal(false);
    expect(isValidCPF('333.333.333-33')).to.equal(false);
    expect(isValidCPF('444.444.444-44')).to.equal(false);
    expect(isValidCPF('555.555.555-55')).to.equal(false);
    expect(isValidCPF('666.666.666-66')).to.equal(false);
    expect(isValidCPF('777.777.777-77')).to.equal(false);
    expect(isValidCPF('888.888.888-88')).to.equal(false);
    expect(isValidCPF('999.999.999-99')).to.equal(false);
  });
});
