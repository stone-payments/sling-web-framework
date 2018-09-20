const { sep } = require('path');
const camelcase = require('camelcase');

module.exports = (pkg) => {
  const dirs = pkg.split(sep);
  return camelcase(`web-ecomm-${dirs[dirs.length - 1]}`);
};
