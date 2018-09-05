import { isValidCNPJ } from './isValidCNPJ.js';

describe('isValidCNPJ', () => {
  it('Should return true for valid CNPJs.', () => {
    expect(isValidCNPJ('66360667000103')).to.equal(true);
    expect(isValidCNPJ('66.360.667/0001-03')).to.equal(true);
    expect(isValidCNPJ('21.273.361/0001-81')).to.equal(true);
    expect(isValidCNPJ('14.644.875/0001-30')).to.equal(true);
    expect(isValidCNPJ('83.233.787/0001-69')).to.equal(true);
    expect(isValidCNPJ('17.776.236/0001-17')).to.equal(true);
    expect(isValidCNPJ('84.366.944/0001-77')).to.equal(true);
    expect(isValidCNPJ('60.865.926/0001-71')).to.equal(true);
    expect(isValidCNPJ('53.216.736/0001-68')).to.equal(true);
    expect(isValidCNPJ('40.265.963/0001-31')).to.equal(true);
    expect(isValidCNPJ('10.427.157/0001-51')).to.equal(true);
    expect(isValidCNPJ('42.135.268/0001-80')).to.equal(true);
    expect(isValidCNPJ('25.518.671/0001-70')).to.equal(true);
    expect(isValidCNPJ('67.321.209/0001-28')).to.equal(true);
    expect(isValidCNPJ('46.327.666/0001-50')).to.equal(true);
    expect(isValidCNPJ('51.668.647/0001-27')).to.equal(true);
    expect(isValidCNPJ('88.834.604/0001-84')).to.equal(true);
    expect(isValidCNPJ('88.630.929/0001-45')).to.equal(true);
    expect(isValidCNPJ('80.918.831/0001-86')).to.equal(true);
    expect(isValidCNPJ('25.231.615/0001-50')).to.equal(true);
    expect(isValidCNPJ('74.638.642/0001-57')).to.equal(true);
    expect(isValidCNPJ('73.954.812/0001-40')).to.equal(true);
    expect(isValidCNPJ('47.465.580/0001-56')).to.equal(true);
    expect(isValidCNPJ('70.875.186/0001-08')).to.equal(true);
    expect(isValidCNPJ('86.876.818/0001-98')).to.equal(true);
  });

  it('Should return false to invalid CPFs.', () => {
    expect(isValidCNPJ('')).to.equal(false);
    expect(isValidCNPJ('86.876.818')).to.equal(false);
    expect(isValidCNPJ('86.876.818/0001')).to.equal(false);
    expect(isValidCNPJ('00.000.000/0000-00')).to.equal(false);
    expect(isValidCNPJ('11.111.111/1111-11')).to.equal(false);
    expect(isValidCNPJ('22.222.222/2222-22')).to.equal(false);
    expect(isValidCNPJ('33.333.333/3333-33')).to.equal(false);
    expect(isValidCNPJ('44.444.444/4444-44')).to.equal(false);
    expect(isValidCNPJ('55.555.555/5555-55')).to.equal(false);
    expect(isValidCNPJ('66.666.666/6666-66')).to.equal(false);
    expect(isValidCNPJ('77.777.777/7777-77')).to.equal(false);
    expect(isValidCNPJ('88.888.888/8888-88')).to.equal(false);
    expect(isValidCNPJ('99.999.999/9999-99')).to.equal(false);
  });
});
